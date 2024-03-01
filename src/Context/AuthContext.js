import React, { useEffect, useState } from 'react';
import functions from '../util/functions';
import ajaxUser from '../util/remote/ajaxUser';

const AuthContext = React.createContext();

export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider = (props)=> {

    
    const [userId, setUserId] = useState(functions.sessionGuard());
    const [permissionLists, setPermissionList] = useState([]);
    const [user,setUser] = useState(false)
    
    useEffect(()=>{
        getUserInfo();
    }, [userId])

    useEffect(()=>{
        getUserAccess();
    }, [user.role?.role_id])
    


    const getUserAccess=async()=>{
        
        const server_response = await ajaxUser.getRolePermissionCodes(user.role?.role_id); 
      
        if(server_response.status==="OK")
        {  
            setPermissionList(server_response.details);
        
        }else{
           // alert("Something went wrong loading YEXP, check your connection or contact system admin")
        }
    }

    const getUserInfo=async()=>{
       
        const server_response = await ajaxUser.fetchUserProfile(userId); 

        if(server_response.status==="OK")
        {  

            setUser(server_response.details);
        
        }else{
           // alert("Something went wrong loading YEXP, check your connection or contact system admin")
        }
    }
        
    
    return (
           <AuthContext.Provider value={
               {
                   user,
                   userId,
                   permissionLists,
                getUserInfo,
                getUserAccess
               }
               }>
               {props.children}
           </AuthContext.Provider>
        );
    
}

export default AuthContext;