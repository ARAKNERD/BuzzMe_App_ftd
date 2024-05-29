import { useContext, useEffect, useState } from "react"
import { toast } from 'react-hot-toast';
import ajaxStudent from "../../util/remote/ajaxStudent";
import ajaxParent from "../../util/remote/ajaxParent";
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import Select from "react-select";
import AuthContext from "../../Context/AuthContext";
import RelationshipContext from "../../Context/RelationshipContext";


const SchoolAddStudentParent=(props)=>{
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [student,setStudent] =useState("")
    const [relationship,setRelationship] =useState("")
    const [studentList,setStudentList] =useState(false)
    const {relationList} = useContext(RelationshipContext);

    const getStudentList = async () => {
        setLoading2(true)
        const server_response = await ajaxStudent.fetchSchoolStudents(props.schoolID);
        console.log(server_response)
        setLoading2(false)
        if (server_response.status === "OK") {
          setStudentList(server_response.details);
        }
    };

    const data={
        student_id: student,
        parent_id: props.parentID,
        relationship_id: relationship
    }
    const handleAdd = async(e) =>{
        e.preventDefault()
            setLoading(true)
            const server_response = await ajaxParent.addGuardianStudent(data);
            setLoading(false);
            if(server_response.status==="OK"){
                toast.success(server_response.message);
                props.g();
            }
            else{
                toast.error(server_response.message); 
            } 
    }

    useEffect(()=>{
        getStudentList()
      
    }, [props.schoolID])
    

    const RenderFooter=(controls)=>{

        if(loading){
            return <Loader/>
        }else{

            return <> 
                    <button className="btn-fill-md text-light bg-martini shadow-martini" type="button" onClick={controls.close}>Close</button>
                    <button 
                        type="button" 
                        className={`btn-fill-md text-light bg-dodger-blue`} 
                        onClick={handleAdd}>Attach Student<i class="fas fa-check mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Attach Student"
            id="model-new-studd-guardian"
            size="md"
            footer={RenderFooter}
        >

            <div className="mb-4">
                <label htmlFor="">Select Student</label>
                <Select
                      onChange={(e) => setStudent(e.id)}
                      getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                      getOptionValue={(option) => option.id}
                      isSearchable
                      options={Array.isArray(studentList) ? studentList : []}
                      value={
                        Array.isArray(studentList) &&
                        studentList.find((value) => value.id === student)
                      }
                      isLoading={loading2} // Pass loading state to isLoading prop
                    loadingMessage={() => "Loading..."} // Custom loading message
                    />
            </div>
            <div className="mb-4">
                <label htmlFor="">Relationship to Student</label>
                <Select
                      onChange={(e) => setRelationship(e.id)}
                      getOptionLabel={(option) => option.relationship}
                      getOptionValue={(option) => option.id}
                      isSearchable
                      options={Array.isArray(relationList) ? relationList : []}
                      value={
                        Array.isArray(relationList) &&
                        relationList.find((value) => value.id === relationship)
                      }
                    />
            </div>
       
        </SystemModal>
    )
}

export default SchoolAddStudentParent
