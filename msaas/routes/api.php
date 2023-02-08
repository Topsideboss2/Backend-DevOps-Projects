<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\ActivityResponseController;
use App\Http\Controllers\ApproveController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyDetailsController;
use App\Http\Controllers\CompanySettingController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DynamicReportController;
use App\Http\Controllers\FieldController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\MemberInviteController;
use App\Http\Controllers\MilestoneController;
use App\Http\Controllers\MilestoneDetailsController;
use App\Http\Controllers\ObjectivesController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectDetailsController;
use App\Http\Controllers\ProjectMemberController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ReportTypeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskDetailsController;
use App\Http\Controllers\ActivityDetailsController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActiveCompanyController;
use App\Http\Controllers\MobileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['prefix' => 'auth', 'as' => 'auth.'], function () {
    Route::post('login', [AuthController::class, 'login'])->withoutMiddleware('auth:sanctum');
    Route::post('register', [AuthController::class, 'register'])->withoutMiddleware('auth:sanctum');
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::group(['prefix' => 'mobile', 'as' => 'mobile', 'middleware' => 'auth:sanctum'], function () {
    Route::get('projects', [MobileController::class, 'userProjects']);
    Route::get('project-tasks/{project}', [MobileController::class, 'projectTasks']);
    Route::get('task-activities/{task}', [MobileController::class, 'taskActivities']);
    Route::get('activities', [MobileController::class, 'userActivities']);
    Route::get('activity-fields/{activity}', [MobileController::class, 'fields']);
    Route::post('activityresponses', [ActivityResponseController::class, 'store']);
});

Route::post('password/email', [ForgotPasswordController::class, 'forgot'])->withoutMiddleware('auth:sanctum');
Route::post('password/reset', [ForgotPasswordController::class, 'reset'])->withoutMiddleware('auth:sanctum');
Route::get('email/verify/{id}', [AuthController::class, 'verify'])->name('verification.verify');
Route::get('email/resend', [AuthController::class, 'resend'])->name('verification.resend');
Route::get('registration/{token}/{company}/{email}', [MemberInviteController::class, 'registration_action'])->name('registration')->withoutMiddleware('auth:sanctum');
Route::post('registration', [MemberInviteController::class, 'userRegistration'])->withoutMiddleware('auth:sanctum');

Route::group(['prefix' => 'company', 'as' => 'company.', 'middleware' => 'auth:sanctum'], function () {
    Route::get('active', [ActiveCompanyController::class, 'checkActiveCompany']);
    Route::post('activate', [ActiveCompanyController::class, 'activateCompany']);
    Route::post('switch', [ActiveCompanyController::class, 'switchCompany']);
    Route::post('logout', [ActiveCompanyController::class, 'logoutCompany']);
    Route::get('roles', [CompanyDetailsController::class, 'roles']);
    Route::get('users', [CompanyDetailsController::class, 'users']);
    Route::get('projects', [CompanyDetailsController::class, 'projects'])->middleware(['role_or_permission:view-company-projects']);
    Route::get('fields', [CompanyDetailsController::class, 'fields'])->middleware(['role_or_permission:view-company-fields']);
    Route::get('objectives', [CompanyDetailsController::class, 'objectives'])->middleware(['role_or_permission:view-company-objectives']);
    Route::get('milestones', [CompanyDetailsController::class, 'milestones'])->middleware(['role_or_permission:view-company-milestones']);
    Route::get('tasks', [CompanyDetailsController::class, 'tasks'])->middleware(['role_or_permission:view-company-tasks']);
    Route::get('activities', [CompanyDetailsController::class, 'activities'])->middleware(['role_or_permission:view-company-activities']);
    Route::get('documents', [CompanyDetailsController::class, 'documents'])->middleware(['role_or_permission:view-company-documents']);
    Route::get('companysettings', [CompanyDetailsController::class, 'companysettings'])->middleware(['role_or_permission:view-company-settings']);
    Route::get('reports', [CompanyDetailsController::class, 'reports'])->middleware(['role_or_permission:view-company-reports']);
    Route::get('profile', [CompanyDetailsController::class, 'profile']);
});

Route::group(['prefix' => 'reports', 'as' => 'reports.', 'middleware' => 'auth:sanctum'], function () {
    Route::get('tasks', [DataController::class, 'tasksReport']);
    Route::get('dashboard', [DataController::class, 'dashboard']);
    Route::get('project/{id}', [DataController::class, 'project']);
    Route::get('user', [DataController::class, 'userReport']);
    Route::get('dynamic/{reportId}', [DynamicReportController::class, 'getReport']);
});

Route::group(['prefix' => 'project', 'as' => 'project.', 'middleware' => 'auth:sanctum'], function () {
    Route::get('activitylog/{projectId}', [ActivityLogController::class, 'projectLogs'])->middleware(['role_or_permission:view-project-timelines']);
    Route::get('objectives/{projectId}', [ProjectDetailsController::class, 'objectives'])->middleware(['role_or_permission:view-project-objectives']);
    Route::get('milestones/{projectId}', [ProjectDetailsController::class, 'milestones'])->middleware(['role_or_permission:view-project-milestones']);
    Route::get('tasks/{projectId}', [ProjectDetailsController::class, 'tasks'])->middleware(['role_or_permission:view-project-tasks']);
    Route::get('activities/{projectId}', [ProjectDetailsController::class, 'activities'])->middleware(['role_or_permission:view-project-activities']);
    Route::get('documents/{projectId}', [ProjectDetailsController::class, 'documents'])->middleware(['role_or_permission:view-project-documents']);
});

Route::group(['prefix' => 'milestone', 'as' => 'milestone.', 'middleware' => 'auth:sanctum'], function () {
    Route::get('tasks/{milestoneId}', [MilestoneDetailsController::class, 'tasks']);
    Route::get('activities/{milestoneId}', [MilestoneDetailsController::class, 'activities']);
});

Route::group(['prefix' => 'task', 'as' => 'task.', 'middleware' => 'auth:sanctum'], function () {
    Route::get('activities/{taskId}', [TaskDetailsController::class, 'activities']);
});

Route::group(['prefix' => 'activity', 'as' => 'activity.', 'middleware' => 'auth:sanctum'], function () {
    Route::get('fields/{taskId}', [ActivityDetailsController::class, 'fields']);
});


Route::group(['prefix' => 'users', 'as' => 'users.', 'middleware' => 'auth:sanctum'], function () {
    Route::get('profile', [UserController::class, 'profile']);
    Route::get('project', [ProjectController::class, 'userProjects']);
    Route::get('activities', [ActivityController::class, 'userActivities']);
    Route::get('companies', [UserController::class, 'userCompanies']);
    Route::put('update/{user}', [UserController::class, 'update']);
    Route::get('{user}', [UserController::class, 'show']);
});


Route::group([ 'middleware' => 'auth:sanctum'], function () {
    Route::get('test', [TestController::class, 'test']);
    Route::post('approve/{activity}', [ApproveController::class, 'approve_activity'])->middleware(['role_or_permission:approve-activity']);
    Route::post('company-approve/{activity}', [ApproveController::class, 'company_approve_activity'])->middleware(['role_or_permission:company-approve-activity']);
    // Route::post('member/invitation', [MemberInviteController::class, 'invite'])->middleware(['role_or_permission:member-invitation']);
    Route::post('member/invitation', [MemberInviteController::class, 'invite']);
    Route::post('syncRoles', [RoleController::class, 'syncPermissions']);
    Route::post('roles/assign', [RoleController::class, 'assignRoleToUser']);

    //FieldController
    Route::get('fields', [FieldController::class, 'index'])->middleware(['role_or_permission:view-fields']);
    Route::post('fields', [FieldController::class, 'store'])->middleware(['role_or_permission:add-fields']);
    Route::get('fields/{field}', [FieldController::class, 'show'])->middleware(['role_or_permission:view-single-field']);
    Route::get('company-fields/{field}', [FieldController::class, 'company_show'])->middleware(['role_or_permission:view-company-single-field']);
    Route::put('fields/{field}', [FieldController::class, 'update'])->middleware(['role_or_permission:edit-fields']);
    Route::put('company-fields/{field}', [FieldController::class, 'company_update'])->middleware(['role_or_permission:edit-company-fields']);
    Route::delete('fields/{field}', [FieldController::class, 'destroy'])->middleware(['role_or_permission:delete-fields']);
    Route::delete('company-fields/{field}', [FieldController::class, 'company_destroy'])->middleware(['role_or_permission:delete-company-fields']);

    //ProjectController
    Route::get('projects', [ProjectController::class, 'index'])->middleware(['role_or_permission:view-projects']);
    // Route::post('projects', [ProjectController::class, 'store'])->middleware(['role_or_permission:add-projects']);
    Route::post('projects', [ProjectController::class, 'store']);
    Route::get('projects/{project}', [ProjectController::class, 'show'])->middleware(['role_or_permission:view-single-project']);
    Route::get('company-projects/{project}', [ProjectController::class, 'company_show'])->middleware(['role_or_permission:view-company-single-project']);
    Route::put('projects/{project}', [ProjectController::class, 'update'])->middleware(['role_or_permission:edit-projects']);
    Route::put('company-projects/{project}', [ProjectController::class, 'company_update'])->middleware(['role_or_permission:edit-company-projects']);
    Route::delete('projects/{project}', [ProjectController::class, 'destroy'])->middleware(['role_or_permission:delete-projects']);
    Route::delete('company-projects/{project}', [ProjectController::class, 'company_destroy'])->middleware(['role_or_permission:delete-company-projects']);

    //ObjectivesController
    Route::get('objectives', [ObjectivesController::class, 'index'])->middleware(['role_or_permission:view-objectives']);
    Route::post('objectives', [ObjectivesController::class, 'store'])->middleware(['role_or_permission:add-objectives']);
    Route::get('objectives/{objective}', [ObjectivesController::class, 'show'])->middleware(['role_or_permission:view-single-objective']);
    Route::get('company-objectives/{objective}', [ObjectivesController::class, 'company_show'])->middleware(['role_or_permission:view-company-single-objective']);
    Route::put('objectives/{objective}', [ObjectivesController::class, 'update'])->middleware(['role_or_permission:edit-objectives']);
    Route::put('company-objectives/{objective}', [ObjectivesController::class, 'company_update'])->middleware(['role_or_permission:edit-company_objectives']);
    Route::delete('objectives/{objective}', [ObjectivesController::class, 'destroy'])->middleware(['role_or_permission:delete-objectives']);
    Route::delete('company-objectives/{objective}', [ObjectivesController::class, 'company_destroy'])->middleware(['role_or_permission:delete-company-objectives']);

    //MilestoneController
    Route::get('milestones', [MilestoneController::class, 'index'])->middleware(['role_or_permission:view-milestones']);
    // Route::post('milestones', [MilestoneController::class, 'store'])->middleware(['role_or_permission:add-milestones']);
    Route::post('milestones', [MilestoneController::class, 'store']);
    Route::get('milestones/{milestone}', [MilestoneController::class, 'show'])->middleware(['role_or_permission:view-single-milestone']);
    Route::get('company-milestones/{milestone}', [MilestoneController::class, 'company_show'])->middleware(['role_or_permission:view-company-single-milestone']);
    Route::put('milestones/{milestone}', [MilestoneController::class, 'update'])->middleware(['role_or_permission:edit-milestones']);
    Route::put('company-milestones/{milestone}', [MilestoneController::class, 'company_update'])->middleware(['role_or_permission:edit-company-milestones']);
    Route::delete('milestones/{milestone}', [MilestoneController::class, 'destroy'])->middleware(['role_or_permission:delete-milestones']);
    Route::delete('company-milestones/{milestone}', [MilestoneController::class, 'destroy'])->middleware(['role_or_permission:delete-company-milestones']);

    //TaskController
    Route::get('tasks', [TaskController::class, 'index'])->middleware(['role_or_permission:view-tasks']);
    // Route::post('tasks', [TaskController::class, 'store'])->middleware(['role_or_permission:add-tasks']);
    Route::post('tasks', [TaskController::class, 'store']);
    Route::get('tasks/{task}', [TaskController::class, 'show'])->middleware(['role_or_permission:view-single-task']);
    Route::get('company-tasks/{task}', [TaskController::class, 'company_show'])->middleware(['role_or_permission:view-company-single-task']);
    Route::put('tasks/{task}', [TaskController::class, 'update'])->middleware(['role_or_permission:edit-tasks']);
    Route::put('company-tasks/{task}', [TaskController::class, 'company_update'])->middleware(['role_or_permission:edit-company-tasks']);
    Route::delete('tasks/{task}', [TaskController::class, 'destroy'])->middleware(['role_or_permission:delete-tasks']);
    Route::delete('company-tasks/{task}', [TaskController::class, 'company_destroy'])->middleware(['role_or_permission:delete-company-tasks']);

    //ActivityController
    Route::get('activities', [ActivityController::class, 'index'])->middleware(['role_or_permission:view-activities']);
    // Route::post('activities', [ActivityController::class, 'store'])->middleware(['role_or_permission:add-activities']);
    Route::post('activities', [ActivityController::class, 'store']);
    Route::get('activities/{activity}', [ActivityController::class, 'show'])->middleware(['role_or_permission:view-single-activity']);
    Route::get('company-activities/{activity}', [ActivityController::class, 'company_show'])->middleware(['role_or_permission:view-company-single-activity']);
    Route::put('activities/{activity}', [ActivityController::class, 'update'])->middleware(['role_or_permission:edit-activities']);
    Route::put('company-activities/{activity}', [ActivityController::class, 'company_update'])->middleware(['role_or_permission:edit-company-activities']);
    Route::delete('activities/{activity}', [ActivityController::class, 'destroy'])->middleware(['role_or_permission:delete-activities']);
    Route::delete('company-activities/{activity}', [ActivityController::class, 'company_destroy'])->middleware(['role_or_permission:delete-company-activities']);

    //ActivityResponseController
    Route::get('activityresponses', [ActivityResponseController::class, 'index'])->middleware(['role_or_permission:view-activityresponses']);
    // Route::post('activityresponses', [ActivityResponseController::class, 'store'])->middleware(['role_or_permission:add-activityresponses']);
    Route::get('activityresponses/{activityresponse}', [ActivityResponseController::class, 'show'])->middleware(['role_or_permission:view-single-activityresponse']);
    Route::get('company-activityresponses/{activityresponse}', [ActivityResponseController::class, 'company_show'])->middleware(['role_or_permission:view-company-single-activityresponse']);
    Route::put('activityresponses/{activityresponse}', [ActivityResponseController::class, 'update'])->middleware(['role_or_permission:edit-activityresponses']);
    Route::delete('activityresponses/{activityresponse}', [ActivityResponseController::class, 'destroy'])->middleware(['role_or_permission:delete-activityresponses']);

    //DocumentController
    Route::get('documents', [DocumentController::class, 'index'])->middleware(['role_or_permission:view-documents']);
    Route::post('documents', [DocumentController::class, 'store'])->middleware(['role_or_permission:add-documents']);
    Route::get('documents/{document}', [DocumentController::class, 'show'])->middleware(['role_or_permission:view-single-document']);
    Route::get('company-documents/{document}', [DocumentController::class, 'company_show'])->middleware(['role_or_permission:view-company-single-document']);
    Route::put('documents/{document}', [DocumentController::class, 'update'])->middleware(['role_or_permission:edit-documents']);
    Route::put('company-documents/{document}', [DocumentController::class, 'company_update'])->middleware(['role_or_permission:edit-company-documents']);
    Route::delete('documents/{document}', [DocumentController::class, 'destroy'])->middleware(['role_or_permission:delete-documents']);
    Route::delete('company-documents/{document}', [DocumentController::class, 'company_destroy'])->middleware(['role_or_permission:delete-company-documents']);

    //CompanySettingController
    Route::get('companysettings', [CompanySettingController::class, 'index'])->middleware(['role_or_permission:view-companysettings']);
    Route::post('companysettings', [CompanySettingController::class, 'store'])->middleware(['role_or_permission:add-companysettings']);
    Route::get('companysettings/{companysetting}', [CompanySettingController::class, 'show'])->middleware(['role_or_permission:view-single-companysetting']);
    Route::get('company-companysettings/{companysetting}', [CompanySettingController::class, 'company_show'])->middleware(['role_or_permission:view-company-single-companysetting']);
    Route::put('companysettings/{companysetting}', [CompanySettingController::class, 'update'])->middleware(['role_or_permission:edit-companysettings']);
    Route::put('company-companysettings/{companysetting}', [CompanySettingController::class, 'company_update'])->middleware(['role_or_permission:edit-company-companysettings']);
    Route::delete('companysettings/{companysetting}', [CompanySettingController::class, 'destroy'])->middleware(['role_or_permission:delete-companysettings']);
    Route::delete('company-companysettings/{companysetting}', [CompanySettingController::class, 'company_destroy'])->middleware(['role_or_permission:delete-company-companysettings']);

    //ProjectMemberController
    Route::get('projectmembers', [ProjectMemberController::class, 'index'])->middleware(['role_or_permission:view-projectmembers']);
    // Route::post('projectmembers', [ProjectMemberController::class, 'store'])->middleware(['role_or_permission:add-projectmembers']);
    Route::post('projectmembers', [ProjectMemberController::class, 'store']);
    Route::get('projectmembers/{projectmember}', [ProjectMemberController::class, 'show'])->middleware(['role_or_permission:view-single-projectmember']);
    Route::put('projectmembers/{projectmember}', [ProjectMemberController::class, 'update'])->middleware(['role_or_permission:edit-projectmembers']);
    Route::delete('projectmembers/{projectmember}', [ProjectMemberController::class, 'destroy'])->middleware(['role_or_permission:delete-projectmembers']);
    Route::delete('company-projectmembers/{projectmember}', [ProjectMemberController::class, 'company_destroy'])->middleware(['role_or_permission:delete-company-projectmembers']);

    //RoleController
    // Route::get('roles', [RoleController::class, 'index'])->middleware(['role_or_permission:view-roles']);
    // Route::post('roles', [RoleController::class, 'store'])->middleware(['role_or_permission:add-roles']);
    // Route::get('roles/{role}', [RoleController::class, 'show'])->middleware(['role_or_permission:view-single-role']);
    // Route::put('roles/{role}', [RoleController::class, 'update'])->middleware(['role_or_permission:edit-roles']);
    // Route::delete('roles/{role}', [RoleController::class, 'destroy'])->middleware(['role_or_permission:delete-roles']);
    Route::get('roles', [RoleController::class, 'index']);
    Route::post('roles', [RoleController::class, 'store']);
    Route::get('roles/{role}', [RoleController::class, 'show']);
    Route::put('roles/{role}', [RoleController::class, 'update']);
    Route::delete('roles/{role}', [RoleController::class, 'destroy']);


    //PermissionController
    // Route::get('permissions', [PermissionController::class, 'index'])->middleware(['permission:view-permissions']);
    // Route::post('permissions', [PermissionController::class, 'store'])->middleware(['permission:add-permissions']);
    // Route::get('permissions/{permission}', [PermissionController::class, 'show'])->middleware(['permission:view-single-permission']);
    // Route::put('permissions/{permission}', [PermissionController::class, 'update'])->middleware(['permission:edit-permissions']);
    // Route::delete('permissions/{permission}', [PermissionController::class, 'destroy'])->middleware(['permission:delete-permissions']);
    Route::get('permissions', [PermissionController::class, 'index']);
    Route::post('permissions', [PermissionController::class, 'store']);
    Route::get('permissions/{permission}', [PermissionController::class, 'show']);
    Route::put('permissions/{permission}', [PermissionController::class, 'update']);
    Route::delete('permissions/{permission}', [PermissionController::class, 'destroy']);

    //ReportTypeController
    Route::get('reporttypes', [ReportTypeController::class, 'index'])->middleware(['role_or_permission:view-reporttypes']);
    Route::post('reporttypes', [ReportTypeController::class, 'store'])->middleware(['role_or_permission:add-reporttypes']);
    Route::get('reporttypes/{reporttype}', [ReportTypeController::class, 'show'])->middleware(['role_or_permission:view-single-reporttype']);
    Route::put('reporttypes/{reporttype}', [ReportTypeController::class, 'update'])->middleware(['role_or_permission:edit-reporttypes']);
    Route::delete('reporttypes/{reporttype}', [ReportTypeController::class, 'destroy'])->middleware(['role_or_permission:delete-reporttypes']);

    //Report Controller
    Route::get('reports', [ReportController::class, 'index'])->middleware(['role_or_permission:view-reports']);
    Route::post('reports', [ReportController::class, 'store'])->middleware(['role_or_permission:add-reports']);
    Route::get('reports/{report}', [ReportController::class, 'show'])->middleware(['role_or_permission:view-single-report']);
    Route::get('company-reports/{report}', [ReportController::class, 'company_show'])->middleware(['role_or_permission:view-company-single-report']);
    Route::put('reports/{report}', [ReportController::class, 'update'])->middleware(['role_or_permission:edit-reports']);
    Route::put('company-reports/{report}', [ReportController::class, 'company_update'])->middleware(['role_or_permission:edit-company-reports']);
    Route::delete('reports/{report}', [ReportController::class, 'destroy'])->middleware(['role_or_permission:delete-reports']);
    Route::delete('company-reports/{report}', [ReportController::class, 'company_destroy'])->middleware(['role_or_permission:delete-company-reports']);
});
