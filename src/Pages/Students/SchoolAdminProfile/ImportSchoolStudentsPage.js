import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SchoolContext from "../../../Context/SchoolContext";
import ajaxStudent from "../../../util/remote/ajaxStudent";
import ajaxStudentGroup from "../../../util/remote/ajaxStudentGroup";
import Loader from "../../../Components/Common/Loader";
import AppContainer from "../../../Components/Structure/AppContainer";

const ImportSchoolStudentsPage = () => {
  const [excelData, setExcelData] = useState([]);
  const [excelCols, setExcelCols] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [groupList, setGroupList] = useState(false);
  const [group, setGroup] = useState("");
  const { schoolDetails } = useContext(SchoolContext);

  const navigation = useNavigate();


  useEffect(() => {
    getGroups();
  }, [schoolDetails.school_id]);
  
  const AddGroupOption = {
    group_id: "add_new",
    group_name: "- - - Register New Student Group - - -",
  };

  const schoolData = {
    school_id: schoolDetails.school_id,
    excel_data: excelData,
    group: group,
  };

  const onDrop = (acceptedFiles) => {
    setLoading(true);
    // Assuming only one file is selected; you can handle multiple files if needed.
    const file = acceptedFiles[0];

    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, {
        type: rABS ? "binary" : "array",
      });
      const sheetName = workbook.SheetNames[0]; // Assuming the first sheet in the Excel file.
      const worksheet = workbook.Sheets[sheetName];
      //   console.log(rABS, workbook);
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const filteredData = data.filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== ""));
      setExcelData(filteredData);
      setExcelCols(make_cols(worksheet["!ref"]));
      setLoading(false);
    };

    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
    
  };

  const make_cols = (refstr) => {
    let o = [],
      C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i)
      o[i] = { name: XLSX.utils.encode_col(i), key: i };
    return o;
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx, .xls", // Specify accepted file types
  });

  const saveData = async () => {
    let confirm = window.confirm(
      "Are you sure you want to the save the students list above?"
    );
    if (!confirm) {
      return;
    }
    setLoading(true);
    const server_response = await ajaxStudent.importStudents(schoolData);
    if (server_response.status === "OK") {
      toast.success(server_response.message);
      setSaved(true);
      setTimeout(() => {
        navigation(-1);
      }, 1000);
    } else {
      toast.error(server_response.message);
    }
  };

  const getGroups = async () => {
    const server_response = await ajaxStudentGroup.fetchGroupList(
      schoolDetails.school_id
    );

    if (server_response.status === "OK") {
      setGroupList(server_response.details);
    }
  };

  

  return (
    <AppContainer title="Import Students">
      <div className="col-12 col-xl-12">
        <Toaster position="top-center" reverseOrder={false} />
        <div
          className="box user-pro-list overflow-hidden mb-30"
          style={{
            marginBottom: "30px",
            backgroundColor: "white",
            padding: "25px",
            boxShadow: "10px",
            borderRadius: "10px",
          }}
        >
          <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            <p>
              Note: To import an Excel file successfully, it should contain
              students of the same group with only<b> 4 </b>columns in this
              order; First Name, Last Name, Registration Number and Gender.{" "}
            </p>
            <p>Drag & drop an Excel file here, or click to select one</p>
          </div>
          {loading && <Loader />}
          {excelData.length > 0 && (
            <div>
              <h3
                style={{ marginTop: 20, marginBottom: 20, textAlign: "center" }}
              >
                Excel Data To Be Imported:
              </h3>

              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody>
                    {excelData.map((r, i) => (
                      <tr key={i}>
                        <td>{i === 0 ? "#NO" : i}</td>
                        {excelCols.map((c) => (
                          <td key={c.key}>{r[c.key]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {excelData[0].some((header) => !header) && (
                  <div className="empty-header-row">
                    <table className="table">
                      <thead>
                        <tr>
                          {excelData[0].map((header, index) => (
                            <th key={index}>&nbsp;</th>
                          ))}
                        </tr>
                      </thead>
                    </table>
                  </div>
                )}
              </div>
              {!loading && !saved && (
                <>
                  <div className="col-lg-6 col-md-6">
                    <label htmlFor="">
                      Student Group
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="refresh-tooltip">
                            Refresh Student Groups
                          </Tooltip>
                        }
                      >
                        <FontAwesomeIcon
                          icon={faRefresh}
                          onClick={getGroups}
                          style={{ marginLeft: "4px" }}
                        />
                      </OverlayTrigger>
                    </label>
                    <Select
                      onChange={(selectedOption) => {
                        if (selectedOption.group_id === "add_new") {
                          window.open("/class-groups", "_blank");
                        } else {
                          setGroup(selectedOption.group_id);
                        }
                      }}
                      getOptionLabel={(option) => option.group_name}
                      getOptionValue={(option) => option.group_id}
                      isSearchable
                      options={
                        Array.isArray(groupList)
                          ? [...groupList, AddGroupOption]
                          : []
                      }
                      value={
                        Array.isArray(groupList) &&
                        groupList.find((value) => value.group_id === group)
                      }
                    />
                  </div>
                  <button
                    style={{ width: "100%" }}
                    onClick={() => saveData()}
                    className="btn btn-primary"
                  >
                    Save Student List
                  </button>
                </>
              )}

              {!loading && saved && (
                <button
                  style={{ width: "100%" }}
                  // onClick={() => saveData()}
                  className="btn btn-primary"
                >
                  List Already Saved
                </button>
              )}

              {loading && (
                <button
                  style={{ width: "100%" }}
                  // onClick={() => saveData()}
                  className="btn btn-primary"
                >
                  Loading .......
                </button>
              )}

              
            </div>
          )}
        </div>
      </div>
    </AppContainer>
  );
};

const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default ImportSchoolStudentsPage;
