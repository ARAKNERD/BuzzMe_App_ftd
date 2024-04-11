import React, { useContext} from 'react'
import AppContainer from '../Components/Structure/AppContainer';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'

const Settings = props => {

    return (
        <AppContainer title={"Settings"} >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <div class="row gutters-20">
                    <div class="col-lg-4 col-sm-6 col-12">
                        <div class="card dashboard-card-seven">
                            <Link to="/districts"><div class="social-media bg-fb hover-fb">
                                
                                <div class="social-like">Districts</div>
                            </div></Link>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-12">
                    <div class="card dashboard-card-seven">
                    <Link to="/regions"><div class="social-media bg-fb hover-fb">
                                
                                <div class="social-like">Regions</div>
                            </div></Link>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-12">
                    <div class="card dashboard-card-seven">
                    <Link to="/rates">  <div class="social-media bg-fb hover-fb">
                                
                                <div class="social-like">Charge Rates</div>
                            </div></Link>
                        </div>
                    </div>
                </div>

        </AppContainer>
    )
}

export default Settings;