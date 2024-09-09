import React, { useContext} from 'react'
import { Toaster, toast } from 'react-hot-toast'
import AuthContext from '../Context/AuthContext';
import useStateCallback from '../util/customHooks/useStateCallback';
import AppContainer from '../Components/Structure/AppContainer';
import Loader from '../Components/Common/Loader';
import ChangePassword from './ChangePassword';

const Profile = props => {
    const [modal, setModal] = useStateCallback(false);
    const {user, userId} = useContext(AuthContext);

    const changePassword=()=>{
        setModal(false, ()=>setModal(<ChangePassword accountID={userId} isOpen={true}/>))
    }
 
    return (
        <AppContainer title={"My Profile"} >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            {modal}
            <div className="row">
                <div className="col-12 col-xl-12">
                    <div className="box user-pro-list overflow-hidden mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                        {user && <div className="box-body" style={{position:"relative"}}>
                            <div className="user-pic text-center" >
                                <div class="main-profile-overview widget-user-image text-center">
							        <div class="main-img-user">
                                        <img alt="avatar" style={{height:"90px"}} src={process.env.PUBLIC_URL + "/assets/img/figure/user55.png"}/>
                                    </div>
						        </div>
                                <div className="pro-user mt-3" style={{marginTop: "1rem !important"}}>
                                    <h5 className="pro-user-username text-dark mb-2 fs-15 mt-42 color-span" style={{lineHeight: "1.5"}}>{user.full_name}</h5>
                                    <h6 className="pro-user-desc text-muted fs-14">{user.role_name}</h6>
                                </div>
                            </div>
                        </div>}

                        <div className="box-footer pt-41" style={{paddingTop: "41px !important"}}>
                            <div className="btn-list text-center">
                                <a href="#" onClick={changePassword} className="btn ripple btn-info btn-md mr-2"><i className="far fa-edit mr-1"></i>Change Password</a>
                            </div>
                        </div>
                    </div>
                    <div className="box left-dot mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                        <div className="box-header  border-0 pd-0">
                            <div className="box-title fs-20 font-w600">Personal Information</div>
                        </div>
                        <div className="box-body pt-20 user-profile">
                            <div className="table-responsive">
                                <table className="table mb-0 mw-100 color-span">
                                    {user && <tbody>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Names </span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{user.full_name}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Role Name</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{user.role_name}</span> </td>
                                        </tr>
                                        {user.role_id ==="3"?<tr>
                                            <td className="py-2 px-0"> <span className="w-50">School</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{user.school_name}</span> </td>
                                        </tr>:""} 
                                    </tbody>}
                                </table>
                                {!user && <Loader/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AppContainer>
    )
}

export default Profile;