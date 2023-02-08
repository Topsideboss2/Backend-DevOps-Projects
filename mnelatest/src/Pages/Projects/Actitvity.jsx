

import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Moment from 'moment';
import { requests } from '../../Utils/Services/Api';
import { LocalStorage } from '../../Utils/Hooks/useLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import GetActivityLogAction from '../../Redux/Actions/Projects/ActivityLog';

function TimeLine() {
   const dispatch=useDispatch()

    const {id} = useParams()
    const timelines=useSelector(state=>state.activityLog.data)??[]
    

    const getTimelineData=async()=>{
       dispatch(GetActivityLogAction(id))
    }
    useEffect(() => {
        getTimelineData()
                
    }, [])
  return (
    <div class="col-xl-12 col-xxl-12 col-lg-12">
    <div class=" "  >
        <div class="card-header border-0 pb-0">
            <h4 class="card-title">Timeline</h4>
        </div>
        <div class="card-body" style={{overflow:"scroll"}}>
            <div id="DZ_W_TimeLine" class="widget-timeline dlab-scroll height600">
                {timelines?.length>0 && timelines?.map((timeline,index)=>(
                        <ul class="timeline" key={index}>
                        <li>
                            <div class="timeline-badge primary col-xl-7"></div>
                            <a class="timeline-panel text-muted" href="#">
                                <span>{timeline.title}</span>
                                <h6 class="mb-0">{timeline.description}</h6>
                                <p class="d-flex justify-content-end mb-0">{Moment(timeline.created_at).format('DD-MM-YYY hh:mm')}</p>
                            </a>
                        </li>
                        </ul>
                ))}
               
            </div>
        </div>
    </div>
</div>
  )
}

export default TimeLine
