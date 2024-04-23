import { useEffect, useState } from "react"
import { toast } from 'react-hot-toast';
import ajaxStudent from "../../util/remote/ajaxStudent";
import ajaxParent from "../../util/remote/ajaxParent";
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import Select from "react-select";
import TableHeader from "../../Components/Common/TableHeader";


const AttachParent=(props)=>{

    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [parent,setParent] =useState("")
    const [parentName,setParentName] =useState("")
    const [relationship,setRelationship] =useState("")
    const [query, setQuery] = useState("");
    const [querySearch, setQuerySearch] = useState(null);

    const [active1,setActive1] = useState(false)
    const handleActive1 = ()=> setActive1(true)
    const handleInActive1 = ()=> setActive1(false)


    const data={
        student_id: props.studentID,
        parent_id: parent,
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

    const setDetails = (e,item) =>{
        e.preventDefault()
        handleActive1()
        setParent(item.parent_id)
        setParentName(item.parent_name)
    }

    const searchParent =async(e)=>{
        e.preventDefault();  
        if (query.length > 0) {
        var data = {
          search: query
        };
        setLoading2(true)
        const server_response = await ajaxParent.searchTerms(data);
        setLoading2(false)
        if(server_response.status==="OK"){
            //store results
            setQuerySearch(server_response.details);
        }else{
            toast.error(server_response.message);
            setQuerySearch(false);
        }
    } else {
        toast.error("Please enter a NIN or phone number!");
      }
    }

    const handleAdd = async(e) =>{
        e.preventDefault()
        if (relationship.length > 0) {
            setLoading(true)
            const server_response = await ajaxParent.addGuardianStudent(data);
            setLoading(false);
            if(server_response.status==="OK"){
                toast.success(server_response.message);
                props.g();
                props.h();
            }
            else{
                toast.error(server_response.message); 
            }
        } else {
            toast.error("Please select the relationship to the student!");
          } 
    }
    

    const RenderFooter=(controls)=>{

        if(loading){
            return <Loader/>
        }else{

            return <> 
                    <button className="btn-fill-md text-light bg-martini shadow-martini" type="button" onClick={controls.close}>Close</button>
                    {active1 && <button 
                        type="button" 
                        className={`btn-fill-md text-light bg-dodger-blue`} 
                        onClick={handleAdd}>Attach Parent<i class="fas fa-check mg-l-15"></i></button>}
                    </>
        }
    }

    return(
        <SystemModal
            title="Attach Parent / Guardian"
            id="model-attach-guardian"
            size="lg"
            footer={RenderFooter}
        >

{active1?<><div className="box-header  border-0 pd-0">
                <div className="box-title fs-20 font-w600">Parent / Guardian Information</div>
              </div>
              <div className="box-body pt-20 user-profile">
                <div className="table-responsive">
                  <table className="table mb-5 mw-100 color-span">
                      <tbody>
                        <tr>
                          <td className="py-2 px-0">
                            {" "}
                            <span className="w-50">Names </span>{" "}
                          </td>
                          <td>:</td>
                          <td className="py-2 px-0">
                            {" "}
                            <span className="">{parentName}</span>{" "}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-0">
                            {" "}
                            <span className="w-50">Relationship </span>{" "}
                          </td>
                          <td>:</td>
                          <td className="py-2 px-0">
                            {" "}
                            <span className="">
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
                    /></span>{" "}
                          </td>
                        </tr>
                      </tbody>
                  </table>
                </div>
              </div></>:<><div className="row gutters-8">
                  <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter NIN or phone number of parent / guardian..."
                      className="form-control"
                    />
                  </div>
                  <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <button
                      type="submit"
                      onClick={(e) => searchParent(e)}
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                      SEARCH
                    </button>
                  </div>
                </div>
                
                <div className="card-body map-card">
                        <TableHeader
                            title="Search Result(s)"
                                
                        />
                        <div className="border-top mt-3"></div>                    
                        <div className="table-responsive">
                            <table className="table table-hover text-nowrap mg-b-0">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col"> Names</th>
                                        <th scope="col"> Contact Number</th>
                                        <th scope="col"> NIN</th>
                                        <th scope="col"> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(querySearch) && querySearch.map((item, key) => (
                                            
                                             <tr key={key} >
                                                <th scope="row">{key+1}</th>
                                                <td>{item.parent_name}</td>
                                                <td>{item.main_contact}</td>
                                                <td>{item.nin}</td>
                                                <td><button type="button" onClick={(e)=>setDetails(e,item)} className={`btn-fill-md text-light bg-dodger-blue`} 
                                                ><i class="fas fa-check"></i></button></td>
                                            </tr>
                                        ))}
                                        
                                </tbody>
                            </table>
                            {loading2 && <Loader/>}
                        </div>
                              
                    </div></>}
       
        </SystemModal>
    )
}

export default AttachParent
