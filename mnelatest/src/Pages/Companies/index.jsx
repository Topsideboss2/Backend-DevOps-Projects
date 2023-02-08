import React, { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {  useNavigate} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { LocalStorage } from '../../Utils/Hooks/useLocalStorage';
import GetAllAction from '../../Redux/Actions/Companies/GetAll';
import GetActiveAction from '../../Redux/Actions/Companies/GetActive.action';
import ActivateAction from '../../Redux/Actions/Companies/ActivateAction';
import ImageAvatars from '../../Utils/Components/ImageAvatar';
import ProfileAvatar from '../../Utils/Components/Initials';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Company() {
    const dispatch=useDispatch()
    const company=useSelector(state=>state.allCompanies.data)
    const [filteredData,setFilteredData]=useState([ ])
    const navigate=useNavigate()

console.log("company",company)


  const getcompany=()=>{
    console.log('code reaches here')
    dispatch(GetAllAction())
  }

  const checkActive = async () => {
    dispatch(GetActiveAction())
  }

  const CompanyActivate=async(data)=>{
    dispatch(ActivateAction(data,navigate))

  }
  const handleFilter=(event)=>{
    event.preventDefault()
    const searchword=event.target.value
    console.log("searchword",searchword)
    console.log("data",company)
    const searchCompany = company.filter(value => {
      return value.company_name.toLowerCase().includes(searchword.toLowerCase())
    })
    {searchword === ""?setFilteredData(""): setFilteredData(searchCompany)}


}


  useEffect(() => {
    checkActive()
    dispatch(GetAllAction())

  }, [])
  return (
    <div class="col-xl-12">
        <h4 style={{display:"grid",placeItems:"center"}}>Select an Active Company </h4>
        <div class="">
          
            <div class="col-xl-12">
               {filteredData.length == 0 &&
                  <div class="row" >
                  {company.length>0 && company.map((d,index)=>(
                      <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 card shadow  m-5 mt-1" key={index}  onClick={()=>{
                        const data={
                        company_id:d.company_id
                        }
                        CompanyActivate(data)
                  
                      }}>

                                  <Card sx={{ minWidth: 275 }} key={index} class="hoverme ">
                                  <CardContent>
                                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                  <Typography class="text-center" style={{color:"#00a15d"}} variant='h6'> {d.company_name}</Typography>
                                  <Box style={{display:"flex",justifyContent:"center"}}>
                                    <ProfileAvatar class="text-center" name={d.company_name} width={62} height={62}/>
                                  </Box>
                                  <Typography style={{display:"flex",justifyContent:"center"}} class="text-center" variant='caption'> {d.company_role}</Typography>
                                        </Typography>
                                  </CardContent>
                               
                                      </Card>


                      </div>
                        ))}
                  </div>
                }

            {filteredData.length > 0 &&
                  <div class="row" >
                  {filteredData.map((d,index)=>(

                      <div class="col-xl-4 card m-2" key={index} >

                                  <Card sx={{ minWidth: 275 }} key={index} class="hoverme" onClick={()=>{
                                    const data={
                                    company_id:d.company_id
                                    }
                                    CompanyActivate(data)
                              
                                  }}>
                                  <CardContent>
                                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

                                  <div class="text-center mb-3">
                                  
                                    <ImageAvatars height={24} width={24}/>
                                  </div>
                                        </Typography>
                                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

                                      <h3>name</h3> : {d.company_name}
                                      <h3>my role</h3>:{d.company_role}
                                      </Typography>


                                  </CardContent>
                                  <CardActions>
                                  <Button size="small" >Open Company</Button>
                                      
                                  </CardActions>
                                      </Card>


                      </div>
                        ))}
                  </div>
                }
            </div>
    </div>
    </div>
  );
}
