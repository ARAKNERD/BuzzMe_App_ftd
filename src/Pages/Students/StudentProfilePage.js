import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import AppContainer from "../../Components/Structure/AppContainer";
import ajaxStudent from "../../util/remote/ajaxStudent";
import useStateCallback from "../../util/customHooks/useStateCallback";
import TableHeader from "../../Components/Common/TableHeader";
import { RenderSecure } from "../../util/script/RenderSecure";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import AdminRefund from "../../Components/Transactions/AdminRefund";
import StudentContext from "../../Context/StudentContext";
import SummaryCount from "../../Components/Students/SummaryCount";
import RemoteLogOut from "../RemoteLogOut";
import ActivateAccount from "../ActivateAccount";
import AssignCard from "../../Components/Students/AssignCard";
import SchoolsAttended from "../../Components/Students/SchoolsAttended";
import StudentBioData from "../../Components/Students/StudentBioData";
import StudentContacts from "../../Components/Students/StudentContacts";
import StudentCallLogs from "../../Components/Students/AdminProfile/StudentCallLogs";
import Pagination from "../../Components/Common/Pagination";
import StudentTransactions from "../../Components/Students/AdminProfile/StudentTransactions";
import AddStudentContact from "../../Components/Students/AddStudentContact";

const StudentProfilePage = (props) => {
  const {studentProfile, studentWalletBalance, studentContactCount, studentLogCount, setStudentId, setStudentUserId, logsMeta, transactionMeta, logsPage,
    transactionPage, logsLoading, setLogsPage, transactionLoading, setTransactionPage, studentLogs, studentTransactions,
    studentTransfers, studentContacts, getStudentContacts, getStudentWalletBalance, countStudentContacts, getStudentProfile, getStudentTransactions} = useContext(StudentContext);
  const [modal, setModal] = useStateCallback(false);
  const { student_id, user_id } = useParams();
  const [activationLoader, setActivationLoader] = useState(false);

  useEffect(() => {
    setStudentId(student_id);
  }, [student_id, setStudentId]);

  useEffect(() => {
    setStudentUserId(user_id);
  }, [user_id, setStudentUserId]);

  
  const handleModal3 = () => {
    setModal(false, () =>
      setModal(
        <AddStudentContact
          userID={user_id}
          h={getStudentContacts}
          j={countStudentContacts}
          isOpen={true}
        />
      )
    );
  };

  const remoteLogout = (e, item) => {
    setModal(false, () =>
      setModal(
        <RemoteLogOut
          userID={user_id}
          isOpen={true}
        />
      )
    );
  };

  const payActivationFee = () => {
    setModal(false, () =>
      setModal(
        <ActivateAccount
          userID={user_id}
          schoolID={studentProfile.school_id}
          g={getStudentProfile}
          isOpen={true}
        />
      )
    );
  };

  const freeActivation = async () => {
    setActivationLoader(true);
    const server_response = await ajaxStudent.activateUnpaidAccount(user_id);
    setActivationLoader(false);

    if (server_response.status === "OK") {
      toast.success(server_response.message);
      getStudentProfile();
    } else {
      toast.error(server_response.message);
    }
  };

  const assignCard = () => {
    setModal(false, () =>
      setModal(
        <AssignCard
          studentID={student_id}
          fullName={studentProfile.full_name}
          g={getStudentProfile}
          isOpen={true}
        />
      )
    );
  };

  const adminRefund = () => {
    setModal(false, () =>
      setModal(
        <AdminRefund
          userID={user_id}
          fullName={studentProfile.full_name}
          g={getStudentWalletBalance}
          h={getStudentTransactions}
          page={transactionPage}
          isOpen={true}
        />
      )
    );
  };

  const handleLogsPagination = (newPage) => {
    if (newPage > 0 && newPage <= logsMeta.length) {
      setLogsPage(newPage);
    }
  };

  const handleTransactionPagination = (newPage) => {
    if (newPage > 0 && newPage <= transactionMeta.length) {
      setTransactionPage(newPage);
    }
  };

  return (
    <AppContainer title={"Student Profile"}>
      <Toaster position="top-center" reverseOrder={false} />
      {modal}
      <section class="section profile">
        <div class="row">
          <div class="col-xl-4">
            <div className="row">
              <div class="col-lg-12">
                <div class="cards">
                  <div class="card-body profile-card pt-4 d-flex flex-column gradient-my-blue">
                    <div class="main-img-user mb-2">
                      <img
                        alt="avatar"
                        style={{ height: "90px" }}
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/img/figure/user55.png"
                        }
                      />
                    </div>
                    <h3 style={{ color: "white" }}>
                      {studentProfile.full_name}
                    </h3>
                    <h5 style={{ color: "white" }}>{studentProfile.group}</h5>
                    <div class="social-links mt-2 align-items-center ">
                    <a href="#" onClick={payActivationFee} className="btn btn-success mr-2"><i className="fa fa-toggle-on mr-1"></i>Activate Account</a>
                    <a href="#" onClick={freeActivation} className="btn btn-success mr-2"><i className="fa fa-toggle-on mr-1"></i>{activationLoader ? "Activating ..." : "Activate Without Payment"}</a>
                    <a href="#" onClick={assignCard} className="btn btn-info mr-2"><i className="fa fa-id-badge mr-1"></i>Assign Card</a>
                        <a href="#" onClick={remoteLogout} className="btn btn-danger mr-2"><i className="fa fa-arrow-right-from-bracket mr-1"></i>Log Out User</a>
                        <RenderSecure code="ADMIN-VIEW"><a href="#" onClick={adminRefund} className="btn btn-warning mr-2 mt-3"><i className="fa fa-rotate-right mr-1"></i>Admin Refund</a> </RenderSecure>
              </div>
                  </div>
                </div>
              </div>
              <SchoolsAttended studentProfile={studentProfile} studentTransfers={studentTransfers}/>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="row">
              <SummaryCount contactCount={studentContactCount} logsCount={studentLogCount} walletBalance={studentWalletBalance}/>

              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body pt-3">
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="first"
                    >
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills" className="flex-row mb-1">
                            <Nav.Item>
                              <Nav.Link size="sm" eventKey="first">
                                Student Bio-Data{" "}
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link size="sm" eventKey="second">
                                Student Contacts{" "}
                              </Nav.Link>
                            </Nav.Item>
                            <RenderSecure code="ADMIN-VIEW"> <Nav.Item>
                              <Nav.Link size="sm" eventKey="third">
                                Call Logs{" "}
                              </Nav.Link>
                            </Nav.Item></RenderSecure>
                            <RenderSecure code="ADMIN-VIEW"><Nav.Item>
                              <Nav.Link size="sm" eventKey="fourth">
                                Student Transactions{" "}
                              </Nav.Link>
                            </Nav.Item> </RenderSecure>
                          </Nav>
                        </Col>

                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <StudentBioData studentProfile={studentProfile}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <TableHeader
                                subtitle="List of all the student's contacts"
                                viewButton={
                                  <a href="#" onClick={handleModal3}className="btn btn-info"style={{ float: "right" }}>
                                    Add Contact
                                  </a>
                                }
                              />

                              <StudentContacts studentContacts={studentContacts}/>

                            </Tab.Pane>

                            <Tab.Pane eventKey="third">
                              <StudentCallLogs studentLogs={studentLogs} loading2={logsLoading}/>
                              <Pagination currentPage={logsPage} totalPages={logsMeta.length} onPageChange={handleLogsPagination}/>
                              
                            </Tab.Pane>


                            <Tab.Pane eventKey="fourth">
                              <StudentTransactions loading4={transactionLoading} walletTransactions={studentTransactions}/>
                              <Pagination currentPage={transactionPage} totalPages={transactionMeta.length} onPageChange={handleTransactionPagination}/>
                              
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppContainer>
  );
};

export default StudentProfilePage;
