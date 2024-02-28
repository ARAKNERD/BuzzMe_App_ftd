import React from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { UserProvider } from './UserContext';
import { ParentProvider } from './ParentContext';
import { StudentProvider } from './StudentContext';
import { SchoolProvider } from './SchoolContext';
import { StudentGroupProvider } from './StudentGroupContext';


const SuperProvider=(props)=>{
  
        return (
            <ThemeProvider>
               <AuthProvider>
                 <UserProvider>
                  <ParentProvider>
                    <StudentProvider>
                      <SchoolProvider>
                      <StudentGroupProvider>
                 
                     {props.children}
                     </StudentGroupProvider>
                     </SchoolProvider>
                     </StudentProvider>
                     </ParentProvider>
                 </UserProvider>
             </AuthProvider>
          </ThemeProvider>                         
        )
}

export default SuperProvider;