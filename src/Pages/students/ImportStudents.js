import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { useNavigate} from "react-router-dom";
import ajaxStudent from "../../util/remote/ajaxStudent";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import Loader from "../../Components/Common/Loader";
import AppContainer from "../../Components/Structure/AppContainer";
import ajaxStudentGroup from "../../util/remote/ajaxStudentGroup";
import Select from "react-select";


const ImportStudents = () => {
  const [excelData, setExcelData] = useState([]);
  const [excelCols, setExcelCols] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [groupList, setGroupList] = useState(false);
  const [group, setGroup] = useState("");
  const {user} = useContext(AuthContext);
  const navigation = useNavigate();

  const schoolData = {
    school_id: user.school_user?.school?.school_id,
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

      setExcelData(data);
      setExcelCols(make_cols(worksheet["!ref"]));
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
      "Are you sure you want to the save the students List Above"
    );
    if (!confirm) {
      return;
    }
    setLoading(true);
    const server_response = await ajaxStudent.importStudents(schoolData);
    setLoading(false);
    // console.log(server_response);
    if (server_response.status === "OK") {
      toast.success(server_response.message);
      setSaved(true);
      setTimeout(() => {
        navigation('/students');
      }, 1000);
    } else {
      toast.error(server_response.message);
    }
  };

  const getGroups = async () => {
    const server_response = await ajaxStudentGroup.fetchGroupList(
      user.school_user?.school?.school_id
    );

    if (server_response.status === "OK") {
      setGroupList(server_response.details);
    }
  };

  useEffect(() => {
    getGroups();
  }, [user.school_user?.school?.school_id]);

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
                <><div className="col-lg-6 col-md-6">
                <label htmlFor="">Student Group</label>
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
                className="btn btn-primary"
              >
                Save Student List
              </button></>
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

            {/* <pre>{JSON.stringify(excelCols, null, 2)}</pre>
            <pre>{JSON.stringify(excelData, null, 2)}</pre> */}
            {/* You can now send 'excelData' to your PHP backend via an API. */}
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

export default ImportStudents;
