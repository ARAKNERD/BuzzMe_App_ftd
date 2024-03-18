import React from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { UserProvider } from './UserContext';
import { ParentProvider } from './ParentContext';
import { StudentProvider } from './StudentContext';
import { SchoolProvider } from './SchoolContext';
import { DistrictProvider } from './DistrictContext';
import { RegionProvider } from './RegionContext';
import { AdminProvider } from './AdminContext';
import { RateProvider } from './RateContext';
import { WalletAccountProvider } from './WalletAccountContext';


const SuperProvider=(props)=>{
  
        return (
            <ThemeProvider>
              <AuthProvider>
                <UserProvider>
                  <ParentProvider>
                    <StudentProvider>
                      <SchoolProvider>
                        <DistrictProvider>
                          <RegionProvider>
                            <AdminProvider>
                              <RateProvider>
                                <WalletAccountProvider>
                 
                                  {props.children}
                                </WalletAccountProvider>
                              </RateProvider>
                            </AdminProvider>
                          </RegionProvider>
                        </DistrictProvider>
                      </SchoolProvider>
                    </StudentProvider>
                  </ParentProvider>
                </UserProvider>
              </AuthProvider>
            </ThemeProvider>                         
        )
}

export default SuperProvider;