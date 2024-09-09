import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import AppContainer from "../../Components/Structure/AppContainer";
import Loader from "../../Components/Common/Loader";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import TableHeader from "../../Components/Common/TableHeader";
import { RenderSecure } from "../../util/script/RenderSecure";
import ajaxStudent from "../../util/remote/ajaxStudent";
import CreateTransfer from "./CreateTransfer";
import useStateCallback from "../../util/customHooks/useStateCallback";
import SchoolContext from "../../Context/SchoolContext";

function TransferStudent() {
  const [searchedBuzzNo, setSearchedBuzzNo] = useState("");
  const [numberSearch, setNumberSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { schoolDetails } = useContext(SchoolContext);

  const [modal, setModal] = useStateCallback(false);

  const searchNumber = async (e) => {
    e.preventDefault();
    if (searchedBuzzNo.length > 0) {
      setLoading(true);
      const server_response = await ajaxStudent.searchStudentByNumber(
        searchedBuzzNo
      );
      setLoading(false);
      if (server_response.status === "OK") {
        //store results
        setNumberSearch(server_response.details);
      } else {
        toast.error(server_response.message);
        setNumberSearch(false);
      }
    } else {
      toast.error("Please enter a buzz number of a student!");
    }
  };

  const handleModal = () => {
    setModal(false, () =>
      setModal(
        <CreateTransfer
          studentID={numberSearch.id}
          roleID={user.role_id}
          schoolName={user.school_name}
          schoolID={schoolDetails}
          g={searchNumber}
          isOpen={true}
        />
      )
    );
  };

  return (
    <AppContainer title="Transfer Student">
      <Toaster position="top-center" reverseOrder={false} />
      {modal}
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card custom-card" style={{ borderRadius: "10px" }}>
            <div className="card-body">
              <div>
                <h5 style={{ marginBottom: 0 }} className="card-title">
                  Student Search
                </h5>
                <p style={{ color: "#042954" }}>
                  <small>Search for student to be transferred.</small>
                </p>
              </div>

              <form className="mg-b-20">
                <div className="row gutters-8">
                  <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <input
                      type="text"
                      value={searchedBuzzNo}
                      onChange={(e) => setSearchedBuzzNo(e.target.value)}
                      placeholder="Enter the buzz number of student..."
                      className="form-control"
                    />
                  </div>
                  <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <button
                      type="submit"
                      onClick={(e) => searchNumber(e)}
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue"
                    >
                      SEARCH
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          {numberSearch === false && (
            <div className="card custom-card" style={{ borderRadius: "10px" }}>
              <div className="card-body">
                <div>
                  <p style={{ textAlign: "center" }}>
                    No search results found.
                  </p>
                </div>
              </div>
            </div>
          )}
          {numberSearch && ( // Show the student info if numberSearch is true
            <div
              className="box left-dot mb-30"
              style={{
                marginBottom: "30px",
                backgroundColor: "white",
                padding: "25px",
                boxShadow: "10px",
                borderRadius: "10px",
              }}
            >
              <div className="box-header  border-0 pd-0">
                <div className="box-title fs-20 font-w600">
                  Student Information
                </div>
              </div>
              <div className="box-body pt-20 user-profile">
                <div className="table-responsive">
                  <table className="table mb-0 mw-100 color-span">
                    {numberSearch && (
                      <tbody>
                        <tr>
                          <td className="py-2 px-0">
                            {" "}
                            <span className="w-50">Student Names </span>{" "}
                          </td>
                          <td>:</td>
                          <td className="py-2 px-0">
                            {" "}
                            <span className="">
                              {numberSearch.full_name}
                            </span>{" "}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-0">
                            {" "}
                            <span className="w-50">School</span>{" "}
                          </td>
                          <td>:</td>
                          <td className="py-2 px-0">
                            {" "}
                            <span className="">{numberSearch.school}</span>{" "}
                          </td>
                        </tr>

                        <tr>
                          <td className="py-2 px-0">
                            {" "}
                            <span className="w-50">Student Group</span>{" "}
                          </td>
                          <td>:</td>
                          <td className="py-2 px-0">
                            {" "}
                            <span className="">{numberSearch.group}</span>{" "}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-0">
                            {" "}
                            <span className="w-50">Gender</span>{" "}
                          </td>
                          <td>:</td>
                          <td className="py-2 px-0">
                            {" "}
                            <span className="">{numberSearch.gender}</span>{" "}
                          </td>
                        </tr>
                        <Link
                          className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue"
                          style={{ float: "right" }}
                          onClick={handleModal}
                        >
                          Transfer Student
                        </Link>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          )}
          {loading && <Loader />}
        </div>
      </div>
    </AppContainer>
  );
}

export default TransferStudent;
