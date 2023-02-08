<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
// use Spatie\Permission\Models\Permission;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Fields Permissions
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-fields'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-fields'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-company-fields'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-fields'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-field'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-single-field'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-fields'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-company-fields'
        ]);

        //Projects Permissions
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-projects'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-projects'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-company-projects'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-projects'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-projects'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-company-projects'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-project'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-single-project'
        ]);

        //Objectives Permissions
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-objectives'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-objectives'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-company-objectives'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-objectives'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-objectives'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-company-objectives'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-objective'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-single-objective'
        ]);

        //Milestones Permissions
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-milestones'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-milestones'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-company-milestones'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-milestones'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-milestones'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-company-milestones'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-milestone'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-single-milestone'
        ]);

        //Tasks Permissions
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-tasks'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-tasks'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-company-tasks'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-tasks'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-tasks'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-company-tasks'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-task'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-single-task'
        ]);


        //Activities Permissions
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-activities'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-activities'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-company-activities'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-activities'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-activities'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-company-activities'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-activity'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-single-activity'
        ]);

        //Activity Responses Permissions
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-activityresponses'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-activityresponses'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-company-activityresponses'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-activityresponses'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-activityresponses'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-company-activityresponses'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-activityresponse'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-single-activityresponse'
        ]);

        //Documents Permissions
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-documents'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-documents'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-company-documents'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-documents'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-documents'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-company-documents'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-document'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-single-document'
        ]);

        //CompanySettings Permissions
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-companysettings'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-companysettings'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-company-companysettings'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-companysettings'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-companysettings'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-company-companysettings'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-companysetting'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-single-companysetting'
        ]);

        //ProjectMembers Permissions
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-projectmembers'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-projectmembers'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-projectmembers'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-projectmembers'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-company-projectmembers'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-projectmember'
        ]);

        //Roles Permissions
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-roles'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-roles'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-roles'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-roles'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-role'
        ]);

        //Permission Permissions
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-permissions'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-permissions'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-permissions'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-permissions'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-permission'
        ]);

        //Approve Activity Permission
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'approve-activity'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'company-approve-activity'
        ]);

        //Member Invitation Permission
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'member-invitation'
        ]);

        //Add Permissions To Roles
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'permission-to-roles'
        ]);

        //Assign Roles To Users
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'assign-roles'
        ]);

        //View Reports
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'reports'
        ]);

        //Company Details View
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-projects'
        ]);
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-users'
        ]);
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-fields'
        ]);
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-objectives'
        ]);
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-milestones'
        ]);
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-tasks'
        ]);
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-activities'
        ]);
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-documents'
        ]);
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-settings'
        ]);
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-reports'
        ]);

        //Project Details View
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-project-timelines'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-project-objectives'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-project-milestones'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-project-tasks'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-project-activities'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-project-documents'
        ]);

         //Report Type Permissions
         Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-reporttypes'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-reporttypes'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-reporttypes'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-reporttypes'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-reporttype'
        ]);

        //Reports Permissions
        Permission::create([
            'guard_name'=> 'web',
            'name' => 'add-reports'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-reports'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'edit-company-reports'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-reports'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-reports'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'delete-company-reports'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-single-report'
        ]);

        Permission::create([
            'guard_name'=> 'web',
            'name' => 'view-company-single-report'
        ]);
    }
}
