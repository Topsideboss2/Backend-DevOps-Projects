import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Forgot from './Pages/Auth/Forgot';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Reset from './Pages/Auth/Reset';
// import Dashboard from './Pages/DashBoard';
import VerifyAccount from './Pages/GlobalPages/VerifyAccount';
import Layout from './Layout';
import Company from './Pages/Companies';
import NoSideBarLayout from './Layout/WithoutSidebar';
import { PrivateRoute } from './Utils/Services/PrivateRoute';
import GeneralSettings from './Pages/GeneralSettings';
import FileInput from './Utils/Components/FileInput';
// import AddProject from './Pages/Projects/AddProject';
import ProjectDetails from './Pages/Projects/ProjectDetails';
import ProjectsTable from './Pages/Projects/ProjectsTable';
import AddProject from './Pages/Projects/AddProject2';
import MilestoneDetails from './Pages/Projects/Milestones/MilestoneDetails';
import TaskDetails from './Pages/Projects/Tasks/TaskDetails';
import NewMemberRegister from './Pages/InviteMember/NewMember';
import CombineChart from './Pages/AllReport/CombineChart';
// import CombineChart from './Pages/Reports';
import Dashboard from "./Pages/dashboard/index"
import AddActivity from './Pages/Projects/Activities/CreateActivity.js/Add Activity';
import ActivityDetails from './Pages/Projects/Activities/SingleActivity';
import UserProfile from "./Pages/Profiles/Profile/UserProfile"
import CompanyProfile from './Pages/Profiles/Profile/CompanyProfile';
import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import ReportSetting from './Pages/GeneralSettings/Report';
import ViewRoles from './Pages/GeneralSettings/Roles/ViewRoles';



function App() {
  let [online, isOnline] = useState(navigator.onLine);
  const [loading, setLoading] = useState(true)
  const rowSkeletons = 6

  const setOnline = () => {
    console.log('We are online!');
    isOnline(true);
  };
  const setOffline = () => {
    console.log('We are offline!');
    isOnline(false);
  };
  useEffect(() => {
    setLoading(false)
    window.addEventListener('offline', setOffline);
    window.addEventListener('online', setOnline);

    // cleanup if we unmount
    return () => {
      window.removeEventListener('offline', setOffline);
      window.removeEventListener('online', setOnline);
    }
  }, []);
  if (loading) {

    let rows = []
    for (let index = 0; index < rowSkeletons; index++) {
      rows.push(
        <section>
          <article className='item'>
            <div className='item-img'>
              <Skeleton width={140} height={140} />
            </div>
            <h3 className='item-title'><Skeleton count={4} /></h3>
            <div className='item-info'>
              <Skeleton width={160} height={20} />
              <Skeleton width={30} height={20} />
              <Skeleton width={22} height={22} circle={true} />
            </div>
            <Skeleton height={48} count={2} className='skeleton' />
          </article>
        </section>
      )
    }
    return (
      <SkeletonTheme color='#F5F5F5' highlightColor='#ffffff'>
        <GalleryStyles className='gallery__grid'>
          <h2 className='gallery__title'><Skeleton /></h2>
          <div className='gallery__grid'>
            {rows}
          </div>
        </GalleryStyles>
      </SkeletonTheme>
    )

  }

  return (
    <div className="App" >

      <Routes>
        {/* auth */}
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<Forgot />} />
        <Route exact path="/resetpassword/:token/:email" element={<Reset />} />
        {/* pages */}
        <Route exact path="file" element={FileInput} />
        <Route exact path="/verifyemail" element={<VerifyAccount />} />
        {/* layout Pages */}
        <Route exact path="/" element={<PrivateRoute><Layout>

          <Dashboard />

        </Layout>  </ PrivateRoute>} />

        <Route exact path="/general-settings" element={<Layout>
          <PrivateRoute>
            <GeneralSettings />
          </ PrivateRoute>
        </Layout>} />
        <Route exact path="/add-projects" element={<Layout>
          <PrivateRoute>
            <AddProject />
          </ PrivateRoute>
        </Layout>} />
        <Route exact path="/Project-details/:id" element={<Layout>
          <PrivateRoute>
            <ProjectDetails />
          </ PrivateRoute>
        </Layout>} />
        <Route exact path="/milestone-details/:id/:milestoneId" element={<Layout>
          <PrivateRoute>
            <MilestoneDetails />
          </ PrivateRoute>
        </Layout>} />
        <Route exact path="/task-details/:id/:milestoneId/:taskId" element={<Layout>
          <PrivateRoute>
            <TaskDetails />
          </ PrivateRoute>
        </Layout>} />
        <Route exact path="/activity-details/:id/:milestoneId/:taskId/:activityId" element={<Layout>
          <PrivateRoute>
            <ActivityDetails />
          </ PrivateRoute>
        </Layout>} />
        <Route exact path="/Projects" element={<Layout>
          <PrivateRoute>
            <ProjectsTable />
          </ PrivateRoute>
        </Layout>} />

        <Route
          path="/new-member-register/:token/:company_id/:email"
          element={
            <NewMemberRegister />
          }
        />
        <Route
          path="/reports/:reportId"
          element={
            <PrivateRoute>
              <Layout>
                <CombineChart />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route exact
          path="/user-profile"
          element={
            <PrivateRoute>
              <Layout>
                <UserProfile />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route exact
          path="/user-profile"
          element={
            <PrivateRoute>
              <Layout>
                <UserProfile />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route exact
          path="/reporttable"
          element={
            <PrivateRoute>
              <Layout>
                <ReportSetting />
              </Layout>
            </PrivateRoute>
          }
        />
         <Route exact
          path="/myroles"
          element={
            <PrivateRoute>
              <Layout>
              <ViewRoles/>
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/company-profile"
          element={
            <PrivateRoute>
              <Layout>
                <CompanyProfile />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/add-activity/:id/:milestoneId/:taskId"
          element={
            <PrivateRoute>
              <Layout>
                <AddActivity />
              </Layout>
            </PrivateRoute>
          }
        />
        {/* <Route
              path="/reports/:reportId"
              element={
                <PrivateRoute>
                  <Layout>
                    <CombineChart />
                  </Layout>
                </PrivateRoute>
              }
            /> */}
        <Route exact path="/my-companies" element={<NoSideBarLayout>
          <PrivateRoute>
            <Company />
          </PrivateRoute>
        </NoSideBarLayout>} />

      </Routes>


    </div>
  );
}

export default App;


const GalleryStyles = styled.div`
    .gallery__grid {
        display: grid;
        gap: 2rem;
        grid-auto-flow: dense;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
        justify-content: center;
    }
    .gallery__title {
        font-size: 2rem;
        padding: 1rem;
        text-align: center;
    }
    .item {
        min-width: 200px;
        width: 260px;
        margin: auto;
        border: 3px solid var(--gray-1);
        padding: 1rem;
    }
    .item__btns {
        display: flex;
        justify-content: space-between;
        button {
            font-size: 1.125rem;
            background-color: var(--gray-1);
            padding: 0.2rem 0.5rem;
            height: 3rem;
            border-radius: 8px;
            font-weight: bolder;
        }
    }
    .item-img {
        width: 140px;
        height: 140px;
        margin: auto;
        margin-bottom: 1rem;
        img {
            object-fit: contain;
        }
    }
    .item-title {
        font-size: 1rem;
        height: 82px;
        text-align: center;
        margin-bottom: 1rem;
    }
    .item-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
    .item-rating {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        width: 60px;
    }
    .item__btnadd {
        border: 2px solid var(--red-1);
        color: var(--red-1)
    }
    .item-price{
        font-size: 2.5rem;
        color: var(--blue-1);
        text-align: center;
        margin-bottom: 1rem;
    }
    .item__btnbuy {
        border: 2px solid var(--red-1);
        background-color: var(--red-1)!important;
        color: var(--gray-1);
    }
    .item-start{
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 1px solid yellow;
        svg {
        font-size: 1rem;
        }
    }
    .skeleton {
        margin-bottom: 1rem;
    }
`