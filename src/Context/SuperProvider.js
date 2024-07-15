import React from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { SchoolProvider } from './SchoolContext';
import { DistrictProvider } from './DistrictContext';
import { RegionProvider } from './RegionContext';
import { AdminProvider } from './AdminContext';
import { RateProvider } from './RateContext';
import { WalletAccountProvider } from './WalletAccountContext';
import { RelationshipProvider } from './RelationshipContext';
import { LanguageProvider } from './LanguageContext';
import { StudentProvider } from './StudentContext';
import ContactContext from './ContactContext';
import { ContactProvider } from './ContactContext';
import { StationProvider } from './StationContext';


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
                                  <RelationshipProvider>
                                    <LanguageProvider>
                                      <StudentProvider>
                                        <ContactProvider>
                                          <StationProvider>
                 
                                  {props.children}
                                  </StationProvider>
                                  </ContactProvider>
                                  </StudentProvider>
                                  </LanguageProvider>
                                  </RelationshipProvider>
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