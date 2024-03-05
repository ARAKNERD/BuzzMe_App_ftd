import React from "react";
import Select from "react-select";

function ViewSchoolStudents() {
  return (
    <div>
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>All Students Data</h3>
            </div>
            <div className="dropdown">
              <a
                className="dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false">
                ...
              </a>
            </div>
          </div>
          <form className="mg-b-20">
            <div className="row gutters-8">
              <div className="col-4-xxxl col-xl-4 col-lg-3 col-12 form-group">
                {/* <Select
                  onChange={(e) => setParent(e.parent_id)}
                  getOptionLabel={(option) => option.parent_name}
                  getOptionValue={(option) => option.parent_id}
                  isSearchable
                  options={Array.isArray(parentList) ? parentList : []}
                  value={
                    Array.isArray(parentList) &&
                    parentList.find((value) => value.parent_id === parent)
                  }
                /> */}
              </div>

              <div className="col-1-xxxl col-xl-2 col-lg-3 col-12 form-group">
                <button
                  type="submit"
                  className="fw-btn-fill btn-gradient-yellow">
                  SEARCH
                </button>
              </div>
            </div>
          </form>
          <div className="table-responsive">
            <table className="table display data-table text-nowrap">
              <thead>
                <tr>
                  <th>StudentsID</th>
                  <th>Name</th>
                  <th>Student's code</th>
                  <th>reG_no</th>
                  <th>Date of birh</th>
                  <th>Parents</th>
                  <th>contacts</th>
                  <th>
                    student code <br /> slip
                  </th>
                  <th>student Profile</th>
                  <th>Update</th>
                  <th>status</th>
                  <th>change status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#223</td>
                  <td>mumbere Andrew</td>
                  <td className=" text-center text-primary">cd4252</td>
                  <td>38939635</td>
                  <td>12/12/1967 </td>
                  <td>
                    <button className="btn btn-info">view parents</button>
                  </td>
                  <td>
                    <button className="btn btn-info">view contacts</button>
                  </td>
                  <td>
                    <button className="btn btn-info">code slip</button>
                  </td>
                  <td>
                    <button className="btn btn-secondary">
                      student Profile
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-warning">Update student</button>
                  </td>
                  <td>
                    <button className="btn btn-warning"> status</button>
                  </td>
                  <td>
                    <button className="btn btn-warning"> change status</button>
                  </td>
                </tr>
                <tr>
                  <td>#223</td>
                  <td>mumbere Andrew</td>
                  <td className=" text-center text-primary">cd4252</td>
                  <td>38939635</td>
                  <td>12/12/1967 </td>
                  <td>
                    <button className="btn btn-info">view parents</button>
                  </td>
                  <td>
                    <button className="btn btn-info">view contacts</button>
                  </td>
                  <td>
                    <button className="btn btn-info">code slip</button>
                  </td>
                  <td>
                    <button className="btn btn-secondary">
                      student Profile
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-warning">Update student</button>
                  </td>
                  <td>
                    <button className="btn btn-warning"> status</button>
                  </td>
                  <td>
                    <button className="btn btn-warning"> change status</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSchoolStudents;
