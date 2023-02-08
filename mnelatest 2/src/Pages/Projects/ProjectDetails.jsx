import React, { useEffect, useState } from 'react'
import image from "../../Assets/custom/4.png"
import image1 from "../../Assets/custom/user1.png"
import image2 from "../../Assets/custom/user2.png"
import image3 from "../../Assets/custom/user3.png"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import GetSingleProjectsAction from '../../Redux/Actions/Projects/GetSingleProject'
import moment from 'moment'
import { MoneyOffCsredOutlined } from '@mui/icons-material'
import ActivityLog from './Project Timeline'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import PropTypes from "prop-types";
import MilestonesTable from "./Milestones/MilestoneTable"
import TimeLine from './Actitvity'
import PieChartComponent from './PieChart'
import ProjectMembersTable from "./ProjectMembers/ProjectMembers"
import ProfileAvatar from '../../Utils/Components/Initials'
import MilestoneContext from '../../context/MilestonesContext'
import GetMilestonesAction from '../../Redux/Actions/Milestones/GetMilestone'
import CreateMarkup from '../../Utils/Components/ckeditorr'
import TabPanel from '../../Utils/Components/TabPanel'
import Map from './Locationn/Map2'
import a11yProps from '../../Utils/Components/TabPanelAllyProp'
import BreadCrumb from '../../Utils/Components/BreadCrumb'

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

export default function ProjectDetails() {
    const [value, setValue] = React.useState(0);
    const [milestones, setMilestones] = useState([])
    const dispatch = useDispatch()
    const project = useSelector(state => state.project.data)
    const ProjectMilestones = useSelector(state => state.milestones.data)
    const loading = useSelector(state => state.project.loading)
    const { id } = useParams()
    function handleChange(event, newValue) {
        setValue(newValue);
    }
    const ProjectMembers = [
        { name: "winfred Kagendo", role: "user" },
        { name: "John Craig", role: "user" },
        { name: "Angelo wood", role: "user" },
        { name: "User Seven", role: "Project Manager" },
        { name: "Test User", role: "supervisor" },
        { name: "Test Trainer", role: "Trainer" },
    ]
    function handleMilestones(child) {
        setMilestones(child)
    }
    console.log("milestonesss", ProjectMilestones)
    useEffect(() => {
        dispatch(GetSingleProjectsAction(id))
        dispatch(GetMilestonesAction(id))
    }, [])

    return (
        <MilestoneContext.Provider value={handleMilestones}>

            <div class="row">
                <div class="col-xl-12">
                    <BreadCrumb companyName={"Company A"} projectId={id} projectName={project.title} />
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                            <div class="card overflow-hidden">
                                <Box sx={{ bgcolor: 'background.paper' }}>
                                    <div class="card-body">
                                        <div class="row border-bottom pb-5">
                                            <div class="col-xl-12 col-lg-12">
                                                <div>
                                                    <h4 class="fs-32 font-w700">{project.title}</h4>
                                                    <span class="mb-2 d-block">Created  on {moment(project.created_at).format('MMMM DD YYYY')}</span>


                                                </div>
                                            </div>

                                        </div>
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            variant={"scrollable"}
                                            scrollButtons="auto"
                                            aria-label="scrollable auto tabs example"
                                        >
                                            <Tab label="OverView" {...a11yProps(0)} style={{ minWidth: "20%" }} />
                                            <Tab label="Milestones" {...a11yProps(1)} style={{ minWidth: "20%" }} />
                                            <Tab label="Project Members" {...a11yProps(2)} style={{ minWidth: "20%" }} />


                                        </Tabs>
                                        <TabPanel value={value} index={0}>
                                            <>

                                                <div class="project-description">
                                                    <span class="fs-18 font-w500 mb-3 d-block text-capitalize">Project DESCRIPTION</span>
                                                    <p dangerouslySetInnerHTML={CreateMarkup(project?.description)} />
                                                </div>


                                                {ProjectMilestones.length > 0 && (
                                                    <div class="project-description">
                                                        <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <div class="fs-18 font-w500 mb-3 d-block text-capitalize">Milestones</div>
                                                            <Typography style={{ color: "#00a15d" }} variant="paragraph">see More</Typography>
                                                        </Box>

                                                        <Grid container spacing={2}>
                                                            {ProjectMilestones.slice(0, 4).map((milestone, index) => (
                                                                <Grid item xs={12} sm={6} md={6} key={index}>
                                                                    <div class="card contact-bx item-content">
                                                                        <div class="card-body user-profile pb-0">
                                                                            <div class="d-flex align-items-center">
                                                                                <div class="image-bx">
                                                                                    <ProfileAvatar class="m-1" name={`${milestone.title} Milestone`} />
                                                                                    {/* <img src="images/pic1.jpg" data-src="images/contacts/Untitled-3.jpg" alt="" class="rounded-circle"/>
                                                  <span class="active"></span> */}
                                                                                </div>
                                                                                <div class="ms-3 text-start">
                                                                                    <h4 class="fs-18 font-w600">{milestone.title}</h4>
                                                                                    <span class="mb-2 d-block">{moment(milestone.due_date).format('MMMM DD YYYY')}</span>
                                                                                    <span class="text-primary d-block">{milestone.status}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="user-meta-info">
                                                                                <p dangerouslySetInnerHTML={CreateMarkup(milestone?.summary)} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Grid>
                                                            ))}

                                                        </Grid>


                                                    </div>
                                                )}


                                                {/* rem */}

                                            </>
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            {console.log("handleMilestones", handleMilestones)}
                                            <MilestonesTable milestoneFunction={"x"} projectName={project.title} />
                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                            <ProjectMembersTable />
                                        </TabPanel>
                                        <TabPanel value={value} index={3}>
                                            Item Four
                                        </TabPanel>
                                        <TabPanel value={value} index={4}>
                                            Item Five
                                        </TabPanel>
                                        <TabPanel value={value} index={5}>
                                            <ActivityLog />
                                        </TabPanel>
                                        <TabPanel value={value} index={6}>
                                            Item Seven
                                        </TabPanel>
                                    </div>

                                </Box>

                                <>

                                </>
                                {/* <div class="message1">
                                     <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="Type comment here..."></textarea>
                                    <div class="msg-button">
                                        <i class="fas fa-smile me-3 "></i>
                                        <i class="fas fa-paperclip me-3"></i>
                                        <a href="javascript:void(0);" class="btn btn-primary"><i class="fas fa-paper-plane me-2 text-white fs-18 btn-rounded"></i>SEND</a>
                                    </div>
                                </div>
                                <div class="comments">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="text-uppercase fs-18 font-w500">comment</span>
                                        <div>
                                            <select class="default-select dashboard-select">
                                              <option data-display="Newest Comment">Newest Comment</option>
                                              <option value="2">Oldest Comment</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="user-comment row border-bottom pb-3 align-items-center">
                                    <div class="col-lg-9">
                                        <div class="d-flex align-items-center">
                                            <img src={image2} alt=""/>
                                            <div class="ms-3">
                                                <h4 class="fs-18 font-w600">Kevin Sirait</h4>
                                                <span class="fs-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 d-flex justify-content-end">
                                        <div class="like-reply">
                                            <span class="fs-18 font-w600 me-2"><i class="far fa-thumbs-up text-primary me-2"></i>45 Like</span>
                                            <span class="fs-18 font-w600"><i class="fas fa-reply-all me-2 text-blue"></i>Reply</span>
                                        </div>
                                    </div>	
                                </div>
                                <div class="user-comment row border-bottom pb-3 align-items-center">
                                    <div class="col-lg-9">
                                        <div class="d-flex align-items-start">
                                            <img src={image2} alt=""/>
                                            <div class="ms-3">
                                                <h4 class="fs-18 font-w600">Hendric Suneo</h4>
                                                <span class="fs-16">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima ve </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 d-flex justify-content-end">
                                        <div class="like-reply">
                                            <span class="fs-18 font-w600 me-2"><i class="far fa-thumbs-up text-primary me-2"></i>45 Like</span>
                                            <span class="fs-18 font-w600"><i class="fas fa-reply-all me-2 text-blue"></i>Reply</span>
                                        </div>
                                    </div>	
                                </div>
                                <div class="user-comment row border-bottom pb-3 align-items-center">
                                    <div class="col-lg-9">
                                        <div class="d-flex align-items-start ms-5">
                                            <img src={image2} alt=""/>
                                            <div class="ms-3">
                                                <h4 class="fs-18 font-w600">Kesha Jean</h4>
                                                <span class="fs-16">m quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima ve </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 d-flex justify-content-end">
                                        <div class="like-reply">
                                            <span class="fs-18 font-w600 me-2"><i class="fas fa-star text-orange"></i></span>
                                            <span class="fs-18 font-w600"><i class="fas fa-star text-orange"></i></span>
                                        </div>
                                    </div>	
                                </div>
                                <div class="user-comment row border-bottom pb-3 align-items-center">
                                    <div class="col-lg-9">
                                        <div class="d-flex align-items-start ms-5">
                                            <img src={image2} alt=""/>
                                            <div class="ms-3">
                                                <h4 class="fs-18 font-w600">Kesha Jean</h4>
                                                <span class="fs-16">m quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima ve </span>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                            <PieChartComponent />
                            <TimeLine />
                            {/* <Map latitude={37.78} longitude={-122.43} /> */}
                        </div>
                    </div>

                </div>
            </div>
        </MilestoneContext.Provider>


    )
}
