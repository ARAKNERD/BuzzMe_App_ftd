import React, {useState, useEffect} from "react";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxStudent from "../../util/remote/ajaxStudent";
import toast from "react-hot-toast";

function ChangeStatus() {
  const [status, setStatus] = useState("Male"); // Initial state for status
  const getStudentList = () => {
    // Define your getStudentList function
  };

  const RenderFooter = (props) => {
    // Receive props as an argument
    const handleAdd = async (e) => {
      e.preventDefault();

      if (status.length > 0) {
        // Correct the syntax error here
        var data = {
          status: status,
        };

        const server_response = await ajaxStudent.updateStudent(data);
        if (server_response.status === "OK") {
          toast.success(server_response.message);
          getStudentList();
        } else {
          toast.error(server_response.message);
        }
      } else {
        toast.error("Complete all fields and try again");
      }
    };

    return (
      <>
        <button
          type="submit"
          className="btn-fill-lmd  radius-30 text-light shadow-dark-pastel-green bg-dark-pastel-green"
          onClick={handleAdd} // Call handleAdd function on button click
        >
          Save
        </button>
        <button
          type="button"
          className="btn-fill-lmd radius-30 text-light shadow-red bg-red"
          onClick={props.controls.close}>
          Close
        </button>
      </>
    );
  };

  useEffect(() => {
    getStudentList(); // Fetch student list when the component mounts
  }, []);

  return (
    <div>
      <SystemModal
        title="Change student Status"
        id="model-update-cross"
        size="lg "
        footer={RenderFooter}>
        <div className="" id="printablediv">
          <form className="new-added-form">
            <div className="row">
              <div className=" col-lg-12 col-lg-12 form-group">
                <label>Select status</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}>
                  <option value="0">Please Select</option>
                  <option value="1">activate</option>
                  <option value="2">Inactivate</option>
                </select>
              </div>
              <div className="col-12 form-group mg-t-8"></div>
            </div>
          </form>
        </div>
      </SystemModal>
    </div>
  );
}

export default ChangeStatus;
