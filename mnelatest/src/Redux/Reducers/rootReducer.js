
import { combineReducers } from "redux";
import CreateRoleAction from "../Actions/UserManagement/createRole";
import ForgotPasswordReducer from "./Auth/ForgotPasswordReducer";
import LoginReducer from './Auth/LoginReducer';
import RegisterReducer from "./Auth/RegisteReducer";
import ResetPasswordReducer from "./Auth/ResetPasswordReducer";
import GetActiveReducer from "./Companies/GetActiveReducer";
import GetAllReducer from "./Companies/GetAllReducer";
import SwitchActiveReducer from "./Companies/SwitchActiveReducer";
import CreateDynamicFieldReducer from "./settings/CreateDynamicFields";
import CreateDynamicReportReducer from "./settings/createDynamicRepors";
import DeleteDynamicFieldReducer from "./settings/DeleteDynamicField";
import DeleteDynamicReportReducer from "./settings/DeleteDynamicReport";
import GetDynamicFieldReducer from "./settings/GetDynamicFields";
import GetDynamicReportReducer from "./settings/GetDynamicReports";
import GetReportTypeReducer from "./settings/GetReportType";
import SystemSettingReducer from "./settings/SystemSettingReducer";
import UpdateDynamicFieldReducer from "./settings/UpdateDynamicField";
import UpdateDynamicReportReducer from "./settings/UpdateDynamicReport";
import SetUpRoleReducer from "./UserManagement/CreateRole";
import GetPermissionsReducer from "./UserManagement/GetPermissionsReducers";
import GetRoleReducer from "./UserManagement/GetRolesReducer";
import GetSingleRoleReducer from "./UserManagement/GetSingleRoleReducer";
import InviteMemberReducer from "./UserManagement/InviteMemberReducer";
import CreateRoleReducer from "./UserManagement/SetupRole";
import GetCompanyUsersReducer from "./Users/GetCompanyUsers";
import CreateProjectReducer from "./Projects/AddProject";
import GetProjectReducer from "./Projects/GetProjects";
import UpdateProjectReducer from "./Projects/updateProject";
import DeleteProjectReducer from "./Projects/DeleteProjects";
import GetSingleProjectReducer from "./Projects/GetSingleProject";
import DeleteMilestoneReducer from "./Milestones/DeleteMilestone";
import CreateMilestoneReducer from "./Milestones/AddMilestone";
import GetMilestoneReducer from "./Milestones/GetMilestones";
import GetSingleMilestoneReducer from "./Milestones/GetSingleMilestone";
import UpdateMilestoneReducer from "./Milestones/UpdateMilestone";
import GetActivityLogReducer from "./Projects/GetTimeline";
import UpdateProjectMemberReducer from "./Projects/UpdateProjectMember";
import AddProjectMemberReducer from "./Projects/AddProjectMembers";
import DeleteProjectMemberReducer from "./Projects/DeleteProjectMembers";
import GetProjectMemberReducer from "./Projects/GetProjectMember";
import CreateTaskReducer from "./Taks/AddTaskReducer";
import GetTasksReducer from "./Taks/GetTasks";
import GetSingleTaskReducer from "./Taks/GetSingleTask";
import UpdateTaskReducer from "./Taks/UpdateTask";
import DeleteTaskReducer from "./Taks/DeleteTask";
import GetMilestoneTasksReducer from "./Milestones/GetMilestoneTasks";
import RegisterInvitedMemberReducer from "./RegisterInvited/registerInvited";
import GetActivitiesReducer from "./Activities/GetAllActivities";
import CreateActivityReducer from "./Activities/CreateActivity";
import DeleteActivitiesReducer from "./Activities/DeleteActivities";
import GetSingleActivityReducer from "./Activities/GetSingleActivity";
import GetMilestoneReportReducer from "./Reports/GetMilestoneReports";
import GetTaskReportReducer from "./Reports/GetTaskReport";
import GetRoleUpdatableReducer from "./UserManagement/GerRolesUpdatable";

const appReducer = combineReducers({
login:LoginReducer,
register:RegisterReducer,
forgot:ForgotPasswordReducer,
reset:ResetPasswordReducer,
activeCompany:GetActiveReducer,
switchActive:SwitchActiveReducer,
allCompanies:GetAllReducer,
systemSetting:SystemSettingReducer,
companyUsers:GetCompanyUsersReducer,
permissions:GetPermissionsReducer,
singleRole:GetSingleRoleReducer,
userRoles:GetRoleReducer,
// userUpdatableRoles:GetRoleUpdatableReducer,
invitedMember:InviteMemberReducer,
dynamicReport:GetDynamicReportReducer,
dynamicField:GetDynamicFieldReducer,
createDynamicReport:CreateDynamicReportReducer,
createDynamicField:CreateDynamicFieldReducer,
deletedDynamicField:DeleteDynamicFieldReducer,
deletedDynamicReport:DeleteDynamicReportReducer,
updatedDynamicField:UpdateDynamicFieldReducer,
updatedDynamicReport:UpdateDynamicReportReducer,
reportType:GetReportTypeReducer,
syncrole:SetUpRoleReducer,
createRole:CreateRoleReducer,
createdProject:CreateProjectReducer,
projects:GetProjectReducer,
updatedProject:UpdateProjectReducer,
deleteProject:DeleteProjectReducer,
project:GetSingleProjectReducer,
addMilestone:CreateMilestoneReducer,
milestones:GetMilestoneReducer,
milestone:GetSingleMilestoneReducer,
updateMilestone:UpdateMilestoneReducer,
deleteMilestone:DeleteMilestoneReducer,
activityLog:GetActivityLogReducer,
updateProjectMember:UpdateProjectMemberReducer,
addProjectMember:AddProjectMemberReducer,
deleteProjectMember:DeleteProjectMemberReducer,
getProjectMember:GetProjectMemberReducer,
createTask:CreateTaskReducer,
tasks:GetTasksReducer,
task:GetSingleTaskReducer,
updateTask:UpdateTaskReducer,
deleteTask:DeleteTaskReducer,
milestoneTasks:GetMilestoneTasksReducer,
registerInvited:RegisterInvitedMemberReducer,
activities:GetActivitiesReducer,
createdActivity:CreateActivityReducer,
deletedActivity:DeleteActivitiesReducer,
singleActivity:GetSingleActivityReducer,
milestoneReport:GetMilestoneReportReducer,
taskReport:GetTaskReportReducer,

})
const rootReducer=(state,action)=>{
    // if (action.type === LOGOUT_REQUEST) {
    //     return appReducer(undefined, action);
    //   }
    
    return appReducer(state, action);
}
export default rootReducer;
