import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import ajaxStudent from "../../util/remote/ajaxStudent";
import { useContext } from "react";
import Loader from "../../Components/Common/Loader";
import AppContainer from "../../Components/Structure/AppContainer";
import ajaxStudentGroup from "../../util/remote/ajaxStudentGroup";
import Select from "react-select";
import SchoolContext from "../../Context/SchoolContext";
import Alert from "../../Components/Common/Alert";



const AdminImportStudentsandContacts = () => {
  const [excelData, setExcelData] = useState([]);
  const [excelCols, setExcelCols] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [groupList, setGroupList] = useState(false);
  const [group, setGroup] = useState("");
  const [school, setSchool] = useState("");
  const {schoolList} = useContext(SchoolContext);
  const [showButton, setShowButton] = useState(false);

  const [info, setInfo] = useState("");

  const schoolData = {
    school_id: school,
    excel_data: excelData,
    group: group
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
    setLoading(false);
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
      "Are you sure you want to the save the list above"
    );
    if (!confirm) {
      return;
    }
    setLoading(true);
    const server_response = await ajaxStudent.importStudentsandContacts(schoolData);
    setLoading(false);
    if (server_response.status === "OK") {
      
      setSaved(true);
      setInfo(<Alert message={server_response.details.message} type="success"/>);
      server_response.details.results.forEach(result => {
        setInfo(prevInfo => (
            <>
                {prevInfo}
                <Alert
                    message={`Excel sheet row ${result.row}: ${result.message}`}
                    type={result.status === "success" ? "success" : "danger"}
                />
            </>
        ));
    });
    setShowButton(true);
    } else {
      setInfo(<Alert message={server_response.message} type="danger"/>);
      
    }
  };

  const handleButton = () => {
    setInfo(false);
    setSaved(false);
    setSchool("");
    setGroup("");
    setExcelData([]);
    setShowButton(false);
    
  };

  const getGroups = async () => {
    const server_response = await ajaxStudentGroup.fetchGroupList(school);
    if (server_response.status === "OK") {
        setGroupList(server_response.details);
    }
    else {
        setGroupList([]);
    }
  };

  useEffect(() => {
    getGroups();
  }, [school]);

  return (
    <AppContainer title="Import Students and Contacts">
      <div className="row">
      <div className="col-lg-12 col-md-12">
          <div className="pl-20" style={{float: "right"}}>
              {showButton?<button
                type="button"
                onClick={handleButton}
                className="btn-fill-lmd radius-30 mb-5 text-light shadow-dodger-blue bg-dodger-blue">
                <i className="fa-solid fa-plus" /> Import New List
              </button>:""}
          </div>
        </div>
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
          <p>Note: To import an Excel file successfully, it should contain students of the same group with only<b> 8 </b>columns in this order;</p>
          <p> First Name, Last Name, Registration Number, Gender, Fathers Name, Fathers Contact, Mothers Name, Mothers Contact. </p>
          <p>Drag & drop an Excel file here, or click to select one</p>
         

        </div>
        {loading && <Loader />}
        {info}
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
                <div className="col-lg-6 col-md-6 mb-2" >
                    <label htmlFor="">School <span style={{color:"red"}}>*</span></label>
                    <Select
                      onChange={(e) => setSchool(e.school_id)}
                      getOptionLabel={(option) => option.school_name}
                      getOptionValue={(option) => option.school_id}
                      isSearchable
                      options={Array.isArray(schoolList) ? schoolList : []}
                      value={
                        Array.isArray(schoolList) &&
                        schoolList.find((value) => value.school_id === school)
                      }
                    />
                </div>
                <div className="col-lg-6 col-md-6 mb-2">
                <label htmlFor="">Student Group <span style={{color:"red"}}>*</span> </label>
                     <Select
                      onChange={(e) => setGroup(e.group_id)}
                      getOptionLabel={(option) => option.group_name}
                      getOptionValue={(option) => option.group_id}
                      isSearchable
                      options={Array.isArray(groupList) ? groupList : []}
                      value={
                        Array.isArray(groupList) &&
                        groupList.find((value) => value.group_id === group)
                      }
                    />
              </div>
              <button
                style={{ width: "100%" }}
                onClick={() => saveData()}
                className="btn-fill-md text-light bg-dodger-blue"
              >
                Save List
              </button></>
            )}

            {!loading && saved && (
              <button
                style={{ width: "100%" }}
                disabled
                className="btn-fill-md text-light bg-dodger-blue"
              >
                List Already Saved
              </button>
            )}

            {loading && (
              <button
                style={{ width: "100%" }}
                disabled
                className="btn-fill-md text-light bg-dodger-blue"
              >
                Loading .......
              </button>
            )}

            {/* <pre>{JSON.stringify(excelCols, null, 2)}</pre>
            <pre>{JSON.stringify(excelData, null, 2)}</pre> */}
            {/* You can now send 'excelData' to your PHP backend via an API. */}
          </div>
        )}
      </div>
    </div></div>
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

export default AdminImportStudentsandContacts;
