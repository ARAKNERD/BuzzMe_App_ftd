import React from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { SchoolProvider } from './SchoolContext';
import { DistrictProvider } from './DistrictContext';
import { RegionProvider } from './RegionContext';
import { AdminProvider } from './AdminContext';
import { RateProvider } from './RateContext';
import { RelationshipProvider } from './RelationshipContext';
import { LanguageProvider } from './LanguageContext';
import { StudentProvider } from './StudentContext';
import { ContactProvider } from './ContactContext';
import { StationProvider } from './StationContext';
import { CardProvider } from './CardContext';
import { StatisticsProvider } from './StatisticsContext';
import { TransactionsProvider } from './TransactionsContext';
import { CallProvider } from './CallContext';


const SuperProvider=(props)=>{
  
        return (
            <ThemeProvider>
              <AuthProvider>
                      <SchoolProvider>
                        <DistrictProvider>
                          <RegionProvider>
                            <AdminProvider>
                              <RateProvider>
                                  <RelationshipProvider>
                                    <LanguageProvider>
                                      <StudentProvider>
                                        <ContactProvider>
                                          <StationProvider>
                                            <CardProvider>
                                              <StatisticsProvider>
                                                <TransactionsProvider>
                                                  <CallProvider>
                 
                                                {props.children}
                                                </CallProvider>
                                                </TransactionsProvider>
                                              </StatisticsProvider>
                                            </CardProvider>
                                          </StationProvider>
                                          </ContactProvider>
                                          </StudentProvider>
                                          </LanguageProvider>
                                          </RelationshipProvider>
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