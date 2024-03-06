import React, {useContext} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import AddDistrict from "../../Components/DistrictRegion/AddDistrict";
import DistrictContext from "../../Context/DistrictContext";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";

function District() {
  const {districtList} = useContext(DistrictContext);

  return (
    <AppContainer title="Districts">
      <div className="row">
        <div className="col-lg-4">
          <AddDistrict />
        </div>
        <div className="col-lg-8">
          <div className="card custom-card">
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Districts List"
                  subtitle="List of all the districts sorted in ascending order"
                />
                <div class="dropdown">
                  <a
                    class="dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false">
                    ...
                  </a>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>District Name</th>
                      <th>Region</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(districtList) && districtList.length > 0 ? (
                      districtList.map((item, key) => (
                        <tr>
                          <td>{key + 1}</td>
                          <td>{item.district_name} </td>
                          <td>{item.region.region_name} </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" style={{textAlign: "center"}}>
                          No districts registered yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {!districtList && <Loader />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default District;
