import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import AppContainer from "../../Components/Structure/AppContainer";
import ajaxStudent from "../../util/remote/ajaxStudent";
import Loader from "../../Components/Common/Loader";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ajaxStudentGroup from "../../util/remote/ajaxStudentGroup";
import AuthContext from "../../Context/AuthContext";
import TableHeader from "../../Components/Common/TableHeader";
import { RenderSecure } from "../../util/script/RenderSecure";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import ajaxCallStation from "../../util/remote/ajaxCallStation";
import ajaxBank from "../../util/remote/ajaxBank";
import TurnOnStudentRestrictions from "./TurnOnStudentRestrictions";
import TurnOffStudentRestrictions from "./TurnOffStudentRestrictions";
import SchoolContext from "../../Context/SchoolContext";
import RemoteLogOut from "../RemoteLogOut";
import ActivateAccount from "./ActivateAccount";
import AssignCard from "./AssignCard";
import AddStudentContact from "./AddStudentContact";
import AdminRefund from "../../Components/Transactions/AdminRefund";

const StudentProfile = (props) => {
  const [studentProfile, setStudentProfile] = useState(false);
  const [studentTransfers, setStudentTransfers] = useState(false);
  const [modal, setModal] = useStateCallback(false);
  const { student_id, user_id } = useParams();
  const [studentLogs, setStudentLogs] = useState([]);
  const [studentContacts, setStudentContacts] = useState(false);
  const [contactCount, setContactCount] = useState(false);
  const [logsCount, setLogsCount] = useState(false);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [walletBalance, setWalletBalance] = useState(false);
  const [activationLoader, setActivationLoader] = useState(false);

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState([]);
  const [page1, setPage1] = useState(1);
  const [meta1, setMeta1] = useState([]);
  const { schoolDetails } = useContext(SchoolContext);

  const [groupList, setGroupList] = useState(false);
  const [group, setGroup] = useState("");
  const [regNo, setRegNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [studentID, setStudentID] = useState("");

  const [active, setActive] = useState(false);
  const handleActive = () => setActive(true);
  const handleInActive = () => setActive(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);

  const data2 = {
    student_user_id: user_id
  };

  useEffect(() => {
    getStudentContacts();
    getStudentProfile();
  }, []);
  useEffect(() => {
    getStudentBalance();
  }, [user_id]);

  const getGroups = async () => {
    const server_response = await ajaxStudentGroup.fetchGroupList(
      schoolDetails.school_id
    );
    if (server_response.status === "OK") {
      setGroupList(server_response.details);
    }
  };

  const setUserUpdate = () => {
    handleActive();
    setFirstName(studentProfile.first_name);
    setLastName(studentProfile.last_name);
    setGroup(studentProfile.group_id);
    setGender(studentProfile.gender);
    setRegNo(studentProfile.reg_no);
    setStudentID(studentProfile.student_id);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    var data = {
      student_id: student_id,
      first_name: firstName,
      last_name: lastName,
      reg_no: regNo,
      gender: gender,
      group_id: group,
    };
    setLoading5(true);
    const server_response = await ajaxStudent.updateStudent(data);
    setLoading5(false);
    if (server_response.status === "OK") {
      toast.success(server_response.message);
      getStudentProfile(student_id);
      handleInActive();
    } else {
      //communicate error
      toast.error(server_response.message);
    }
  };

  const getStudentProfile = async () => {
    setLoading(true);
    const server_response = await ajaxStudent.fetchStudentData(student_id);
    setLoading(false);
    if (server_response.status === "OK") {
      //store results
      setStudentProfile(server_response.details);
    } else {
      //communicate error
      setStudentProfile("404");
    }
  };
  const getStudentBalance = async () => {
    const server_response = await ajaxBank.fetchStudentWalletBalance(user_id);
    if (server_response.status === "OK") {
      //store results
      setWalletBalance(server_response.details);
    } else {
      //communicate error
      setWalletBalance('0');
    }
  };

  const getStudentLogs = async (currentPage) => {
    setLoading2(true);

    const server_response = await ajaxCallStation.listStudentCallLogs(
      currentPage,
      user_id
    );
    setLoading2(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setStudentLogs(server_response.details.list|| []);
    } else {
      //communicate error
      setStudentLogs([]);
    }
  };
  const getWalletTransactions = async (currentPage) => {
    setLoading4(true);
    const server_response = await ajaxBank.fetchUserWalletTransactions(currentPage, user_id);
    setLoading4(false);
    
    if (server_response.status === "OK") {
      setMeta1(server_response.details.meta.list_of_pages);
      setWalletTransactions(server_response.details.list);
    } else {
      //communicate error
      setWalletTransactions([]);
    }
  };
 

  const getStudentContacts = async () => {
    setLoading3(true);
    const server_response = await ajaxStudent.fetchStudentContacts(data2);

    setLoading3(false);
    if (server_response.status === "OK") {
      setStudentContacts(server_response.details);
    } else {
      //communicate error
      setStudentContacts("404");
    }
  };

  const getStudentTransfers = async () => {
    setLoading6(true);
    const server_response = await ajaxStudent.listStudentTransfers(student_id);
    setLoading6(false);
    if (server_response.status === "OK") {
      setStudentTransfers(server_response.details);
    } else {
      //communicate error
      setStudentTransfers("404");
    }
  };

  const countContacts = async () => {
    const server_response = await ajaxStudent.countStudentContacts(user_id);
    console.log(server_response)
    if (server_response.status === "OK") {
      setContactCount(server_response.details);
    } else {
      //communicate error
      setContactCount("404");
    }
  };
  const countLogs = async () => {
    const server_response = await ajaxCallStation.countStudentLogs(user_id);
    if (server_response.status === "OK") {
      setLogsCount(server_response.details);
    } else {
      //communicate error
      setLogsCount("404");
    }
  };


  const handleModal3 = () => {
    setModal(false, () =>
      setModal(
        <AddStudentContact
          userID={user_id}
          h={getStudentContacts}
          j={countContacts}
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

  const restrictionsOn = () => {
    setModal(false, () =>
      setModal(
        <TurnOnStudentRestrictions
          studentID={student_id}
          g={getStudentProfile}
          isOpen={true}
        />
      )
    );
  };
  const restrictionsOff = () => {
    setModal(false, () =>
      setModal(
        <TurnOffStudentRestrictions
          studentID={student_id}
          g={getStudentProfile}
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
      //communicate error
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
          g={getStudentBalance}
          h={getWalletTransactions}
          page={page}
          isOpen={true}
        />
      )
    );
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= meta.length) {
      setPage(newPage);
    }
  };

  const handlePagination1 = (newPage) => {
    if (newPage > 0 && newPage <= meta1.length) {
      setPage1(newPage);
    }
  };
  

  useEffect(() => {
    getGroups();
  }, [schoolDetails.school_id]);

  useEffect(() => {
    
    getStudentTransfers();
  }, [student_id]);

  useEffect(() => {
    countContacts();
    countLogs();
  }, [user_id]);

  useEffect(() => {
    getStudentLogs(page, user_id);
  }, [page, user_id]);
  useEffect(() => {
    getWalletTransactions(page1, user_id);
  }, [page1, user_id]);
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
                    <a href="#" onClick={freeActivation} className="btn btn-success mr-2"><i className="fa fa-toggle-on mr-1"></i>{activationLoader ? "activating ..." : "Activate Without Payment"}</a>
                    <a href="#" onClick={assignCard} className="btn btn-info mr-2"><i className="fa fa-id-badge mr-1"></i>Assign Card</a>
                        <a href="#" onClick={remoteLogout} className="btn btn-danger mr-2"><i className="fa fa-arrow-right-from-bracket mr-1"></i>Log Out User</a>
                        <RenderSecure code="ADMIN-VIEW"><a href="#" onClick={adminRefund} className="btn btn-warning mr-2 mt-3"><i className="fa fa-rotate-right mr-1"></i>Admin Refund</a> </RenderSecure>
              </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="cards pt-3">
                  <div class="card-body profile-card pt-4 d-flex flex-column">
                    <div className="box-header  border-0 pd-0">
                      <div className="box-title fs-20 font-w600">
                        Schools Attended
                      </div>
                    </div>
                    <div class="activity-block">
                      <ul
                        className="task-list"
                        style={{
                          listStyle: "none",
                          position: "relative",
                          margin: "0",
                          paddingTop: "10px",
                          paddingLeft: "10px",
                        }}
                      >
                        <li
                          style={{
                            position: "relative",
                            paddingLeft: "25px",
                            marginBottom: "40px",
                          }}
                        >
                          <i
                            className="task-icon"
                            style={{
                              top: 0,
                              left: 0,
                              width: "13px",
                              height: "13px",
                              position: "absolute",
                              borderRadius: "50%",
                              padding: "2px",
                              zIndex: "2",
                              backgroundColor: "#ff7200",
                            }}
                          ></i>
                          <h6 style={{ marginBottom: "5px" }}>
                            {studentProfile.school}
                            <small className="float-right text-muted tx-11">
                              CURRENT
                            </small>
                          </h6>
                          <span
                            className="text-muted tx-12"
                            style={{ fontSize: "12px" }}
                          >
                            School
                          </span>

                          <div
                            className="vertical-line"
                            style={{
                              position: "absolute",
                              left: "5px",
                              top: "0",
                              height: "120px",
                              width: "1px",
                              backgroundColor: "#ccc",
                              zIndex: "1",
                            }}
                          ></div>
                        </li>
                        {Array.isArray(studentTransfers) &&
                          studentTransfers.map((item, key) => (
                            <li
                              style={{
                                position: "relative",
                                paddingLeft: "25px",
                                marginBottom: "40px",
                              }}
                            >
                              <i
                                className="task-icon"
                                style={{
                                  top: 0,
                                  left: 0,
                                  width: "12px",
                                  height: "12px",
                                  position: "absolute",
                                  borderRadius: "50%",
                                  padding: "2px",
                                  zIndex: "2",
                                  backgroundColor: "#ff7200",
                                }}
                              ></i>
                              <h6 style={{ marginBottom: "5px" }}>
                                {item.school_from}
                                {/* <small className="float-right text-muted tx-11">29 Oct 2019</small> */}
                              </h6>
                              <span
                                className="text-muted tx-12"
                                style={{ fontSize: "12px" }}
                              >
                                {item.school_from_district}
                              </span>

                              <div
                                className="vertical-line"
                                style={{
                                  position: "absolute",
                                  left: "5px",
                                  top: "0",
                                  height: "120px",
                                  width: "1px",
                                  backgroundColor: "#ccc",
                                  zIndex: "1",
                                }}
                              ></div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="row">
              <div class="col-lg-12">
                <div
                  class="card custom-card "
                  style={{ paddingBottom: "10px" }}
                >
                  <div className="card-body map-card gradient-orange-peel">
                    <div class="item-title mb-2" style={{ color: "white" }}>
                      <b>SUMMARY</b>
                    </div>
                    <div class="row">
                      <div class="col-xl-4 col-lg-12 col-sm-6 pr-0 pl-0 border-right">
                        <div class="text-center">
                          <h2
                            class="mb-1 number-font"
                            style={{ color: "white" }}
                          >
                            <span class="counter">
                              {contactCount ? contactCount.total_p : "..."}
                            </span>
                          </h2>
                          <p class="mb-0 text-light"> Contacts</p>
                        </div>
                      </div>
                      <div class="col-xl-4 col-lg-12 col-sm-6 pr-0 pl-0 border-right">
                        <div class="text-center">
                          <h2
                            class="mb-1 number-font"
                            style={{ color: "white" }}
                          >
                            <span class="counter">
                              {logsCount ? logsCount.total_p : "..."}
                            </span>
                          </h2>
                          <p class="mb-0 text-light"> Calls Made</p>
                        </div>
                      </div>
                      <div class="col-xl-4 col-lg-12 col-sm-6 pr-0 pl-0">
                        <div class="text-center">
                          <h2
                            class="mb-1 number-font"
                            style={{ color: "white" }}
                          >
                            <span class="counter">
                              <small>UGX. </small>
                              {walletBalance? walletBalance:"..."}
                            </span>
                          </h2>
                          <p class="mb-0 text-light"> Wallet Balance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                              {active ? (
                                <>
                                  {/* <div className="box-header  border-0 pd-0">
                            <div className="box-title fs-20 font-w600"> Update Student Information</div>
                        </div>
                        <br/> */}
                                  <form onSubmit={handleUpdate}>
                                    <div className="form-group">
                                      <div className="row row-sm">
                                        <div className="col-sm-6">
                                          <label htmlFor="">
                                            First Name:
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <input
                                            type="text"
                                            value={firstName}
                                            style={{ border: "1px solid grey" }}
                                            onChange={(e) =>
                                              setFirstName(e.target.value)
                                            }
                                            className="form-control"
                                          />
                                        </div>
                                        <div className="col-sm-6">
                                          <label htmlFor="">
                                            Last Name:
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <input
                                            type="text"
                                            value={lastName}
                                            style={{ border: "1px solid grey" }}
                                            onChange={(e) =>
                                              setLastName(e.target.value)
                                            }
                                            className="form-control"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <div className="row row-sm">
                                        <div className="col-sm-12">
                                          <label htmlFor="">
                                            Group:
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <Select
                                            onChange={(e) =>
                                              setGroup(e.group_id)
                                            }
                                            getOptionLabel={(option) =>
                                              option.group_name
                                            }
                                            getOptionValue={(option) =>
                                              option.group_id
                                            }
                                            isSearchable
                                            options={
                                              Array.isArray(groupList)
                                                ? groupList
                                                : []
                                            }
                                            defaultValue={
                                              Array.isArray(groupList) &&
                                              groupList.find(
                                                (value) =>
                                                  value.group_id === group
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <div className="row row-sm">
                                        <div className="col-sm-12">
                                          <label htmlFor="">
                                            Gender:
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <select
                                            className="col-12 form-control"
                                            defaultValue={gender}
                                            style={{ border: "1px solid grey" }}
                                            onChange={(e) =>
                                              setGender(e.target.value)
                                            }
                                          >
                                            <option value={true}>
                                              Select..
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">
                                              Female
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <div className="row row-sm">
                                        <div className="col-sm-12">
                                          <label htmlFor="">
                                            Registration Number:
                                          </label>
                                          <input
                                            type="text"
                                            value={regNo}
                                            style={{ border: "1px solid grey" }}
                                            onChange={(e) =>
                                              setRegNo(e.target.value)
                                            }
                                            className="form-control"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    {loading5 && (
                                      <button
                                        style={{ width: "100%" }}
                                        className="btn-fill-md text-light bg-dodger-blue"
                                        disabled
                                      >
                                        <i class="fa fa-spinner fa-spin mr-2"></i>
                                        Updating...
                                      </button>
                                    )}
                                    {!loading5 && (
                                      <button
                                        style={{ width: "100%" }}
                                        className="btn-fill-md text-light bg-dodger-blue"
                                      >
                                        Update Student Details
                                      </button>
                                    )}
                                  </form>
                                </>
                              ) : (
                                <>
                                  <table className="table mb-0 mw-100 color-span">
                                    {studentProfile && (
                                      <tbody>
                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              Names{" "}
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                              {studentProfile.full_name}
                                            </span>{" "}
                                          </td>
                                        </tr>

                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              Student Code
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                              {studentProfile.username}
                                            </span>{" "}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              Group Name
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                              {studentProfile.group}
                                            </span>{" "}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              School Name
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                              {studentProfile.school}
                                            </span>{" "}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              Gender
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                              {studentProfile.gender}
                                            </span>{" "}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              Registration No.
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                              {studentProfile.reg_no
                                                ? studentProfile.reg_no
                                                : "Not recorded"}
                                            </span>{" "}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              Account Status | Default Pin
                                            </span>
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                            {studentProfile.is_activated ==="0"
                                                ? <span class="badge badge-danger">INACTIVE </span>
                                                : <span class="badge badge-success">ACTIVE </span>} {" "}
                                                | {studentProfile.is_secure=== 1? <span class="badge badge-success">SECURED</span>: <span class="badge badge-danger">{studentProfile.default_pin}</span>}
                                            </span> 
                                            
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              Card Status
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                            {studentProfile.card_status ==="2"? <span class="badge badge-danger">DEACTIVATED</span>
                                                :studentProfile.card_status ==="1"? <span class="badge badge-success">ASSIGNED - {studentProfile.card_number}</span>
                                                : <span class="badge badge-warning">UNASSIGNED</span>}{" "}
                                            </span>{" "}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              Restricted By Parent
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                            {studentProfile.student_restrictions ==="1"
                                                ? <span class="badge badge-danger">RESTRICTED</span>
                                                : <span class="badge badge-success">UNRESTRICTED</span>}
                                            </span>{" "}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              Restricted By School
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                              {studentProfile.school_restrictions ==="1"
                                                ? <span class="badge badge-danger">RESTRICTED</span>
                                                : <span class="badge badge-success">UNRESTRICTED</span>}
                                            </span>{" "}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              Call Restrictions
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                            {studentProfile.is_restricted ==="Restricted"
                                                ? <span class="badge badge-danger">RESTRICTED</span>
                                                : <span class="badge badge-success">UNRESTRICTED</span>}
                                            </span>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    )}
                                  </table>
                                  {loading && <Loader />}
                                </>
                              )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <TableHeader
                                subtitle="List of all the student's contacts"
                                viewButton={
                                  <a
                                    href="#"
                                    onClick={handleModal3}
                                    className="btn btn-info"
                                    style={{ float: "right" }}
                                  >
                                    Add Contact
                                  </a>
                                }
                              />
                              {/* <div className="border-top mt-1"></div> */}

                              <div className="table-responsive">
                                <table
                                  className="table table-hover text-nowrap mg-b-0"
                                  id="second"
                                >
                                  <thead>
                                    <tr>
                                      <th scope="col">No.</th>
                                      <th scope="col"> Names</th>
                                      <th scope="col"> Contact Number</th>
                                      <th scope="col"> Relationship</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Array.isArray(studentContacts) &&
                                      studentContacts.map((item, key) => (
                                        <tr key={key}>
                                          <th scope="row">{key + 1}</th>
                                          <td>{item.contact_name}</td>
                                          <td>{item.parent?.username}</td>
                                          <td>{item.relationship}</td>
                                        </tr>
                                      ))}
                                    {studentContacts === "404" && (
                                      <tr>
                                        <td
                                          colSpan="4"
                                          style={{ textAlign: "center" }}
                                        >
                                          No contacts added to this student yet.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                                {loading3 && <Loader />}
                              </div>
                            </Tab.Pane>

                            <Tab.Pane eventKey="third">
                              <div className="border-top mt-1"></div>
                              <div className="table-responsive">
        {loading2 ? (
          <Loader /> // Show loader when loading or searching
        ) : (
          <table className="table display data-table text-nowrap">
            <thead>
              <tr>
              <th scope="col">Date</th>
              <th scope="col">Contact</th>
              <th scope="col"> Duration</th>
              <th scope="col"> Calling Station</th>
              </tr>
            </thead>
            <tbody>
              {studentLogs.length > 0 ? (
                studentLogs.map((item, index) => (
                  <tr key={index}>
                    <td>
                                            {item.duration_format ===
                                            "00:00" ? (
                                              <i
                                                className="fe fe-phone-missed"
                                                style={{
                                                  color: "red",
                                                  paddingRight: "10px",
                                                }}
                                              ></i>
                                            ) : (
                                              <i
                                                className="fe fe-phone-outgoing"
                                                style={{
                                                  color: "green",
                                                  paddingRight: "10px",
                                                }}
                                              ></i>
                                            )}{" "}
                                            {item.call_time}
                                          </td>

                                          <td className="text-dark">
                                            {item.callee_name}
                                            <br />
                                            <small>{item.callee_number}</small>
                                          </td>
                                          <td>{item.duration_format}</td>
                                          <td>
                                            {item.station_name}
                                            <br />
                                            <small>{item.school}</small>
                                          </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No student call logs yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className="pagination">
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} onClick={() => handlePagination(page - 1)}>
          <i className="fa fa-angle-left mr-2"></i> Prev
        </button>
        {Array.isArray(meta) && meta.map((item) => (
          <button
            key={item}
            style={{borderRight: "1px solid yellow"}}
            className={`btn ${page === item ? "btn-primary" : "btn-dark"}`}
            onClick={() => handlePagination(item)}
          >
            {item}
          </button>
        ))}
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} onClick={() => handlePagination(page+ 1)}>
          Next <i className="fa fa-angle-right ml-2"></i>
        </button>
      </div>
                              
                            </Tab.Pane>


                            <Tab.Pane eventKey="fourth">
                              <div className="border-top mt-1"></div>
                              <div className="table-responsive">
        {loading4 ? (
          <Loader /> // Show loader when loading or searching
        ) : (
          <table className="table display data-table text-nowrap">
            <thead>
              <tr>
              <th>
              Transaction Date
            </th>
            <th>Amount</th>
            <th>Cost Details</th>
              </tr>
            </thead>
            <tbody>
              {walletTransactions.length > 0 ? (
                walletTransactions.map((item, index) => (
                  <tr key={index}>
                    <td>
                                            {item.created_at?.short_date}
                                            <br />
                                            <small>
                                              {item.created_at?.time}
                                            </small>
                                          </td>
                                         
                                          <td>
                                            <span class="badge bg-teal">
                                            {item.account === "BUZZTIME LOAD" || item.account === "ADMIN REFUND" || item.account === "ACTIVATION BUZZ TIME"?<i
                                                class="fa fa-circle-arrow-up text-teal fs-9px fa-fw me-5px"
                                                style={{ color: "#28a745" }}
                                              ></i>:<i
                                              class="fa fa-circle-arrow-down text-teal fs-9px fa-fw me-5px"
                                              style={{ color: "#dc3545" }}
                                            ></i>}</span>
                                              UGX.{" "}
                                              {item.account === "BUZZTIME LOAD" || item.account === "ADMIN REFUND" || item.account === "ACTIVATION BUZZ TIME"
                                                ? item.cash_in
                                                : item.cash_out}
                                            
                                          </td>
                                          <td>
                                            <span class="badge badge-primary">
                                              {item.account}
                                            </span>
                                          </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No student transactions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className="pagination">
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} onClick={() => handlePagination1(page1 - 1)}>
          <i className="fa fa-angle-left mr-2"></i> Prev
        </button>
        {Array.isArray(meta1) && meta1.map((item) => (
          <button
            key={item}
            style={{borderRight: "1px solid yellow"}}
            className={`btn ${page1 === item ? "btn-primary" : "btn-dark"}`}
            onClick={() => handlePagination1(item)}
          >
            {item}
          </button>
        ))}
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} onClick={() => handlePagination1(page1 + 1)}>
          Next <i className="fa fa-angle-right ml-2"></i>
        </button>
      </div>
                              {/* <div className="table-responsive">
                                <table
                                  className="table table-hover text-nowrap mg-b-0"
                                  id="seventh"
                                >
                                  <thead>
                                    <tr>
                                      <th>
                                        Transaction Date
                                      </th>
                                      <th>Amount</th>
                                      <th>Cost Details</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Array.isArray(walletTransactions) &&
                                      walletTransactions.map((item, key) => (
                                        <tr key={key}>
                                          <td>
                                            {item.created_at?.short_date}
                                            <br />
                                            <small>
                                              {item.created_at?.time}
                                            </small>
                                          </td>
                                         
                                          <td>
                                            <span class="badge bg-teal">
                                            {item.account === "BUZZTIME LOAD" || item.account === "ADMIN REFUND" || item.account === "ACTIVATION BUZZ TIME"?<i
                                                class="fa fa-circle-arrow-up text-teal fs-9px fa-fw me-5px"
                                                style={{ color: "#28a745" }}
                                              ></i>:<i
                                              class="fa fa-circle-arrow-down text-teal fs-9px fa-fw me-5px"
                                              style={{ color: "#dc3545" }}
                                            ></i>}</span>
                                              UGX.{" "}
                                              {item.account === "BUZZTIME LOAD" || item.account === "ADMIN REFUND" || item.account === "ACTIVATION BUZZ TIME"
                                                ? item.cash_in
                                                : item.cash_out}
                                            
                                          </td>
                                          <td>
                                            <span class="badge badge-primary">
                                              {item.account}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    {walletTransactions === "404" && (
                                      <tr>
                                        <td
                                          colSpan="3"
                                          style={{ textAlign: "center" }}
                                        >
                                          No transactions involving this student
                                          yet.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                  <div
                                    className="align-items-center justify-content-center pos-absolute"
                                    style={{ left: "50%" }}
                                  >
                                    <button
                                      className="btn btn-dark"
                                      style={{
                                        borderRight: "1px solid yellow",
                                      }}
                                      onClick={setPreviousPageNumber}
                                    >
                                      <i className="fa fa-angle-left mr-2"></i>{" "}
                                      Prev
                                    </button>
                                    {Array.isArray(meta) &&
                                      meta.map((item) =>
                                        page === item ? (
                                          <button
                                            style={{
                                              borderRight: "1px solid yellow",
                                            }}
                                            className="btn btn-primary"
                                          >
                                            {item}
                                          </button>
                                        ) : (
                                          <button
                                            onClick={(e) =>
                                              setPageNumber(e, item)
                                            }
                                            style={{
                                              borderRight: "1px solid yellow",
                                            }}
                                            className="btn btn-dark"
                                          >
                                            {item}
                                          </button>
                                        )
                                      )}

                                    <button
                                      style={{
                                        borderRight: "1px solid yellow",
                                      }}
                                      className="btn btn-dark"
                                      onClick={setNextPageNumber}
                                    >
                                      Next
                                      <i className="fa fa-angle-right ml-2"></i>
                                    </button>
                                  </div>
                                </table>
                                {loading4 && <Loader />}
                              </div> */}
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

export default StudentProfile;
