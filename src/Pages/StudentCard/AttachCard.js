import { useContext, useEffect, useState } from "react"
import { toast } from 'react-hot-toast';
import ajaxStudent from "../../util/remote/ajaxStudent";
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import TableHeader from "../../Components/Common/TableHeader";
import ajaxCard from "../../util/remote/ajaxCard";
import {Link} from "react-router-dom";


const AttachCard=(props)=>{
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [student,setStudent] =useState("")
    const [fullName,setFullName] =useState("")
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [querySearch, setQuerySearch] = useState(null);

    const [active1,setActive1] = useState(false)
    const handleActive1 = ()=> setActive1(true)
    const handleInActive1 = ()=> setActive1(false)

    const data={
        student_id: student,
        card_id: props.cardID,
    }

    const setDetails = (e,item) =>{
        e.preventDefault()
        handleActive1()
        setStudent(item.id)
        setFullName(item.full_name)
    }

    const backPage = (e) =>{
        e.preventDefault()
        handleInActive1()
    }

    const setStudents = (e) => {
        e.preventDefault();
        setQuerySearch(false);
        setQuery("");
      };

    const searchStudent =async(e)=>{
        e.preventDefault();  
        if (query.length > 0) {
        setLoading2(true)
        const server_response = await ajaxStudent.searchAllStudents(query,page);
        setLoading2(false)
        if(server_response.status==="OK"){
            //store results
            setQuerySearch(server_response.details.list);
        }else{
            setQuerySearch("404");
        }
    } else {
        toast.error("Please enter student name!");
      }
    }

    const handleAdd = async(e) =>{
        e.preventDefault()
        if (student.length > 0) {
            setLoading(true)
            const server_response = await ajaxCard.attachCard(data);
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
            toast.error("Please select a student!");
          } 
    }
    

    const RenderFooter=(controls)=>{

        if(loading){
            return <Loader/>
        }else{

            return <> 
                    <button className="btn-fill-md text-light bg-martini shadow-martini" type="button" onClick={controls.close}>Close</button>
                    {active1 &&<button 
                        type="button" 
                        className={`btn-fill-md text-light bg-dodger-blue`} 
                        onClick={handleAdd}>Assign Card<i class="fas fa-check mg-l-15"></i></button>}
                    </>
        }
    }

    return(
        <SystemModal
            title="Assign Card"
            id="model-assign-card"
            size="lg"
            footer={RenderFooter}
        >

{active1?<><div className="pl-20">
    <a href="#" onClick={backPage}  className="btn btn-info mr-2"><i className="far fa-circle-left mr-1"></i>Student Search</a>
          </div>
              <div className="rfid_card_body">
              
                <div class="rfid_card">
	                <div class="rfid_card__info">
		                <div class="rfid_card__logo">Buzz Time Card</div>
		                    <div class="rfid_card__number">
			                    <span class="rfid_card__digit-group">{props.cardNumber}</span>
		                    </div>
		                    <div class="rfid_card__name">{fullName}</div>
		                    {/* <div class="rfid_card__vendor" role="img" aria-labelledby="card-vendor">
			                    <span id="card-vendor" class="card__vendor-sr">Mastercard</span>
		                    </div> */}
	</div>
	
</div>
              </div></>:<><div className="row gutters-8">
                  <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <input
                      type="text"
                      value={query}
                      style={{border: "1px solid grey"}}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value === '') {
                          setStudents(e);
                        }
                      }}
                      placeholder="Search for name of student..."
                      className="form-control"
                    />
                  </div>
                  <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <button
                      type="submit"
                      onClick={(e) => searchStudent(e)}
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
                                        <th scope="col"> School</th>
                                        <th scope="col"> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(querySearch) && querySearch.map((item, key) => (
                                            
                                             <tr key={key} >
                                                <th scope="row">{key+1}</th>
                                                <td>{item.full_name}</td>
                                                <td>{item.school}</td>
                                                <td><button type="button" onClick={(e)=>setDetails(e,item)} className={`btn-fill-md text-light bg-dodger-blue`} 
                                                ><i class="fas fa-check"></i></button></td>
                                            </tr>
                                        ))}
                                        {querySearch === "404" && (<tr>
                          <td colSpan="5" style={{textAlign: "center"}}>
                            No search result(s) found.
                          </td>
                        </tr>)}
                                </tbody>
                            </table>
                            {loading2 && <Loader/>}
                        </div>
                              
                    </div></>}
       
        </SystemModal>
    )
}

export default AttachCard
