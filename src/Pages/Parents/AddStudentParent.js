import { useContext, useEffect, useState } from "react"
import { toast } from 'react-hot-toast';
import ajaxStudent from "../../util/remote/ajaxStudent";
import ajaxParent from "../../util/remote/ajaxParent";
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import Select from "react-select";
import AuthContext from "../../Context/AuthContext";


const AddStudentParent=(props)=>{
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [student,setStudent] =useState("")
    const [relationship,setRelationship] =useState("")
    const [studentList,setStudentList] =useState(false)

    const data={
        student_id: student,
        parent_id: props.parentID,
        relationship: relationship
    }

    const relationshipList = [
        {
            relationship: 'Mother',
        },
        {
            relationship: 'Father',
        },
        {
            relationship: 'Guardian',
        }
    ];

    const getStudentList = async () => {
        var data = {
            school_id: user.school_user? props.schoolID :"",
            student_id:"",
            group_id:""
            
        };
        setLoading2(true)
        const server_response = await ajaxStudent.fetchStudentCardList(data);
        setLoading2(false)
        if (server_response.status === "OK") {
          setStudentList(server_response.details);
        }
    };

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
      
    }, [])
    

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
            id="model-new-stu-guardian"
            size="md"
            footer={RenderFooter}
        >

            <div className="mb-4">
                <label htmlFor="">Select Student</label>
                <Select
                      onChange={(e) => setStudent(e.id)}
                      getOptionLabel={(option) => `${option.first_name} ${option.last_name} - ${option.school.school_name}`}
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
                <label htmlFor="">Relationship</label>
                <Select
                      onChange={(e) => setRelationship(e.relationship)}
                      getOptionLabel={(option) => option.relationship}
                      getOptionValue={(option) => option.relationship}
                      isSearchable
                      options={Array.isArray(relationshipList) ? relationshipList : []}
                      value={
                        Array.isArray(relationshipList) &&
                        relationshipList.find((value) => value.relationship === relationship)
                      }
                    />
            </div>
       
        </SystemModal>
    )
}

export default AddStudentParent
