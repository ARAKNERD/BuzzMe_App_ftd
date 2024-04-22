import React from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
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
              </AuthProvider>
            </ThemeProvider>                         
        )
}

export default SuperProvider;