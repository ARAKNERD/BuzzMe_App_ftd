import React, {useContext} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import RegionContext from "../../Context/RegionContext";
import AddRegion from "../../Components/DistrictRegion/AddRegion";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";

function Regions() {
  const {regionList} = useContext(RegionContext);

  return (
    <AppContainer title="Regions">
      <div className="row">
        <div className="col-lg-4">
          <AddRegion />
        </div>
        <div className="col-lg-8">
          <div className="card custom-card">
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Regions List"
                  subtitle="List of all the regions sorted in ascending order"
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
                      <th>Region Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(regionList) && regionList.length > 0 ? (
                      regionList.map((item, key) => (
                        <tr>
                          <td>{key + 1}</td>
                          <td>{item.region_name} </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" style={{textAlign: "center"}}>
                          No regions registered yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {!regionList && <Loader />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default Regions;
