import React, {useContext, useState} from "react";
import {Toaster, toast} from "react-hot-toast";
import RegionContext from "../../Context/RegionContext";
import ajaxRegion from "../../util/remote/ajaxRegion";

function AddRegion() {
  const {getRegionList} = useContext(RegionContext);
  const [regionName, setRegionName] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (regionName.length > 0) {
      const data = {
        region_name: regionName,
      };
      const server_response = await ajaxRegion.createRegion(data);
      if (server_response.status === "OK") {
        toast.success(server_response.message);
        getRegionList();
        resetForm();
      } else {
        toast.error(server_response.message);
      }
    } else {
      toast.error("Complete all fields and try again");
    }
  };

  const resetForm = () => {
    setRegionName("");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <br />
        <br />
        <br />
        <div className="col-lg-12 col-md-12">
          <div className="card custom-card" style={{borderRadius: "10px"}}>
            <div className="card-body">
              <div>
                <h5 className="card-title">Add New Region</h5>
              </div>

              <form
                onSubmit={(e) => handleAdd(e)}
                method="post"
                class="new-added-form">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 form-group mt-4 radius-30">
                    <label htmlFor="">Region Name <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={regionName}
                      placeholder="Enter name of region..."
                      style={{border: "1px solid grey"}}
                      onChange={(e) => setRegionName(e.target.value)}
                      className=" colo-12 form-control"
                    />
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 form-group mt-5 ">
                  <button
                    type="submit"
                    className="col-xl-12 col-lg-12 col-12 btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                    Save Region
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRegion;
