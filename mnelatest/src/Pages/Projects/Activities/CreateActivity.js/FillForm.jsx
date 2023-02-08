import React,{useEffect, useState} from 'react'

import * as Yup from "yup";
import {Form,Formik} from "formik"
import { Oval } from 'react-loader-spinner';
import AutoComplete from "../../../lotties/Autocomplete"
import { useNavigate } from 'react-router-dom';
import Select from "react-select"
import {useParams} from "react-router-dom"
import { requests } from '../../../services/Api';
import { getToken } from '../../../services/useToken';
import { BsTrashFill } from 'react-icons/bs';

function CreateActivity() {
  const [member,setMember]=useState([])
    const [loading, setLoading] = useState(false)
    const [members,setMembers]=useState([])
    const [serverError, setServerError] = useState("")
    const [successResponse, setSuccessResponse] = useState("")
    const token=getToken()
    const yesterday = new Date(Date.now() -86400000)
    const navigate=useNavigate()
   const {projectId,taskId,activityId,ParentCallback,milestoneId}=useParams()
    const [fields,setFields]=useState([])
    const [fieldarr,setFieldarr]=useState([])
    const [inputFields, setInputFields] = useState([])
    const [address,setAddress]=useState([])
 console.log("project id create activity",projectId)
    const fetchFields = async () => {
        
      try {
          setLoading(true)
          const response = await requests.get('/company/fields', {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          setLoading(false);   
         

          
          setFields(response.data)
      } catch (error) {
          
          setLoading(false);
          console.log('error',error)
         
      }
      
  }
  const addArray = () => {
    let temp = {...inputFields}
    temp.push({})
    setInputFields(temp)
}

 //close modal
 const handleCloseModal = () => {
  document.getElementById('AddActivity').classList.remove('show', 'd-block');
  document.querySelectorAll('.modal-backdrop').forEach(el => el.classList.remove('modal-backdrop'))
}

const CreateActivityfunc=async(values)=>{
  const data={
    latitude:address.lat,
    longitude:address.lng,
    project_id:projectId,
    milestone_id:milestoneId,
    task_id:taskId,
    title:values.title,
    user_id:member,
    description:values.description,
    start_date:values.start_date,
    due_date:values.due_date,
    estimated_budget:values.estimated_budget,
    activity_type:values.activity_type,
   
    taskId:values.taskId,
    data:inputFields
  }
    try {
        setLoading(true);
        const response = await requests.post(`activities`, data,{
          headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        ParentCallback(response.data)
        setLoading(false);   
        setSuccessResponse("activity has been successfully added")
         
        setTimeout(() => {
          setSuccessResponse("")
        }, 5000);
        handleCloseModal()
    } catch (error) {
        setLoading(false);
        console.log('error',error)
        setServerError(error.response.data.message)
        setTimeout(()=>{
          setServerError("")
        },5000) 
        
    }
}
   
const getMembersData=async()=>{
  await requests.get("/company/users",{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then((response)=>{ 
      console.log("actiitymembers",response)    
      response.data.map((membermap)=>{
        setMembers(oldarray=>[...oldarray,{value:membermap.user_id,label:membermap.user_name}])
  
      })       
      
      
  }).catch((error)=>{
      console.log("or",error)
  })
}


useEffect(() => {

  getMembersData()
  fetchFields()        
}, [])

const handleChangeFields = (e, index) => {
  console.log('event', e.target.name)
  console.log('value', e.target.value)
  console.log('index',index)

  let temp = {...inputFields}
  temp[index][e.target.name] = e.target.value
  setInputFields(temp)
  
  console.log('inputFields', inputFields)
}

function debounce(func, timeout = 500){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
function saveInput(event, index){
  console.log('event', event.target.value);
  console.log('index', index)
}
const processChange = debounce((event, index) => saveInput(event, index));

const handleMapsData=(childData)=>{
  setAddress(childData)
}
console.log("activity address",address)

  return (
    <div class="col-xl-12">
        <div >
        <div class="row">
          <div class="col-xl-8">
            <Formik
                initialValues={{
                    "title":"",
                    "start_date":"",
                    "due_date":"",
                    "description":"",
                    "estimated_budget":"",
                    "activity_type":"",
                    "task_id":"",
                    "user_id":"",
                    "milestone_id":"",
                    "project_id":""
                    
                }}
                validationSchema={Yup.object({
                    title: Yup.string().required('Required'),
                    due_date:Yup.date().required("required"),
                    start_date:Yup.date().required("required")
         
                    
                  })}
                  onSubmit={(values,{resetForm}) => {
                    CreateActivityfunc(values);
                    resetForm({values:""})
                    console.log("submit values",values)
                  }}
            >
                 {({values, isSubmitting, errors, handleSubmit, handleChange,dirty,isValid}) => (
                    <Form>
                        
                        <div class="modal-content">
                        <div class="modal-header">
                 
                            <h5 class="modal-title">Fill in the details below </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal">
                            </button>
                        </div>
                        {serverError && (
                            <div style={{padding:"10px",margin:"20px",color:"red",fontSize:"15px"}}>
                            {serverError && (<p>{serverError}</p>)}
                            </div>

                            )}
                            {successResponse && (
                                <div style={{padding:"10px",margin:"20px",color:"green",fontSize:"15px"}}>
                                {successResponse}
                                </div>
                                    
                            )}
                        <div class="modal-body">
                            <div class="">
                            <div class="mb-3">
                                <label class="mb-1"><strong>Title</strong></label>
                                <input type="text"
                                 class="form-control"                         
                                 name = 'title'
                                id = 'title'
                                onChange={handleChange}
                                value={values.text}
                                
                                 />
                                 <div style={{color:"red"}}>
                                    {errors.title}
                                </div> 
                            </div>
                            <div class="mb-3">
                                <label class="mb-1"><strong> SubTask Start Date</strong></label>
                                <input type="date"
                                 class="form-control"                         
                                 name = 'start_date'
                                id = 'start_date'
                                onChange={handleChange}
                                value={values.start_date}
                                
                                 />
                                 <div style={{color:"red"}}>
                                    {errors.start_date}
                                </div> 
                            </div>

                            <div class="mb-3">
                                <label class="mb-1"><strong> SubTask Deadline</strong></label>
                                <input type="date"
                                 class="form-control"                         
                                 name = 'due_date'
                                id = 'due_date'
                                onChange={handleChange}
                                value={values.due_date}
                                
                                 />
                                 <div style={{color:"red"}}>
                                    {errors.due_date}
                                </div> 
                            </div>
                            <div class="mb-3">
                                <label class="mb-1"><strong>Estimated Amount</strong></label>
                                <input type="number"
                                 class="form-control"                         
                                 name = 'estimated_budget'
                                id = 'estimated_budget'
                                onChange={handleChange}
                                value={values.estimated_budget}
                                
                                 />
                                
                            </div>
                            <AutoComplete addressData={handleMapsData}/>
                            <div class="mb-3">
                                <label class="mb-1"><strong> SubTask Description</strong></label>
                                <textarea type="text"
                                style={{minHeight:"200px"}}
                                rows="15"
                                 class="form-control"                         
                                 name = 'description'
                                id = 'description'
                                onChange={handleChange}
                                value={values.description}
                                
                                 />
                                
                            </div>
                         
                            <div class="mb-3">
                                <label class="mb-1"><strong>SubTask Type</strong></label>
                                <textarea type="text"
                                rows="5"
                                 class="form-control"                         
                                 name = 'activity_type'
                                id = 'activity_type'
                                onChange={handleChange}
                                value={values.activity_type}
                                
                                 />
                                
                            </div>
                            <div class="col-lg-6 mb-2">
                                <div class="mb-3 "  >
                                    <label class="col-lg-4 col-form-label" for="validationCustom04">Assign Member
                                    </label>
                                    <Select
                                      onChange={(e) => setMember(e.value)}
                                      options={members}
                                    />                                                                              
                                </div>
                            </div>
                            {fieldarr && fieldarr.map((field, index) => (
                            <div class="mb-3" key={index}>
                            <label class="text-label form-label" for="validationCustomUsername">{field.name}</label>
                            <div class="input-group">
                                <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                                <input type={field.type}
                                    class="form-control"
                                    placeholder={`enter a ${field.type}`}
                                    name={`${field.id}`}
                                    id={`${field.id}`}
                                    // name={`field_id[${field.id}]`}
                                    // id={`field_id[${field.id}]`}
                                    onChange={(event) => handleChangeFields(event, index)}
                                    // value={values.field_id[$field.id]}                                                  
                                    required/>

                                        <BsTrashFill class="btn-danger light" onClick={() =>{
                                                                //  setInputFields((old) => [...old, {}])   
                                                                 fieldarr.splice(index,1)   
                                                                 setFields((oldArray)=>[...oldArray,field])
                                        }
                                                                
                                                                // setFieldarr((oldArray) => [...oldArray, field])
                                                                // fieldarr.splice(index,1)

                                                     }   
                                        style={{right:"0",width:"20px",marginLeft:"85%"}}/>
                                <div style={{color:"red"}}>
                                    {errors.title}
                                    </div>
                            </div>
                            </div>
                        ))}    
                            </div>
                        </div>
                        <div class="modal-footer" style={{display:"flex"}}>
                          <div className="text-center mt-4">
                            <button type="button" class="btn btn-danger light" data-bs-dismiss="modal" >Close</button>
                          </div>
                          <div className="text-center mt-4">
                            {loading && (
                              <button type="submit" className="btn btn-primary "  >
                                <div style={{display:"flex",flexDirection:"row",paddingLeft:"30px"}}>

                                <Oval  height="20"
                                  width="20"
                                  color='white'
                                  disabled
                                  ariaLabel='loading'/>
                                  <p style={{marginLeft:"30px"}}>adding...</p>
                                </div>
                                  
                              </button>
                              
                            )}
                            {!loading && (
                              <button type="submit"  
                              className="btn btn-primary"
                              > add activity</button>
                              )}
                            
                              
                          </div>
                        </div>
                        </div>
                    </Form>
                 )}
            </Formik>
          </div>
          <div class="col-xl-4">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Dynamic fields</h4>
                </div>
                    <div class="card-body">
                    {fields.map((fieldss, index)=>(
                                <div class="list-group">
                                <ul><li onClick={() => {
                                    setInputFields((old) => [...old, {}])
                                    setFieldarr((oldArray) => [...oldArray, fieldss])
                                    fields.splice(index,1)
                                }}><a 
                                href="javascript:void()" class="list-group-item list-group-item-action ">{fieldss.name}</a>
                                </li>
                                </ul>
                                    
                            </div>
                            ))}
                        {/* {fields.map((fieldss, index)=>(
                            <ul>
                                <li onClick={() => {
                                    setInputFields((old) => [...old, {}])
                                    setFieldarr((oldArray) => [...oldArray, fieldss])
                                }}><button className='mb-3'>{fieldss.name}</button></li>
                            </ul>
                        ))}  */}
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
          </div>

        </div>
    </div>

    
  )
}

export default CreateActivity