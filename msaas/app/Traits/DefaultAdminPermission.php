<?php

namespace App\Traits;

use App\Models\User;
use App\Models\Role;
use App\Models\Company;
use App\Models\CompanyUser;
use App\Models\CompanyRoles;

trait DefaultAdminPermission {
    use ApiResponser;
    public function givePermission ($id, $company_id) {
        $company = Company::find($company_id);
        if(!$company) {
            return $this->notFound();
        }
        $user = User::find($id);
        if(!$user) {
            return $this->notFound();
        }
        


        $role = Role::create([
            'guard_name' => 'web',
            'name' => $company->name.'-admin'
        ]);

        $companyrole = new CompanyRoles();
        $companyrole->company_id = $company->id;
        $companyrole->role_id = $role->id;
        $company->save();

        $companyuser = new CompanyUser();
        $companyuser->company_id = $company->id;
        $companyuser->user_id = $user->id;
        $companyuser->role_id = $role->id;
        $companyuser->save();

        $role->syncPermissions([
            'add-fields',
            'edit-company-fields',
            'delete-company-fields',
            'view-company-single-field',
            'add-projects',
            'edit-company-projects',
            'delete-company-projects',
            'view-company-single-project',
            'add-objectives',
            'edit-company-objectives',
            'delete-company-objectives',
            'view-company-single-objective',
            'add-milestones',
            'edit-company-milestones',
            'delete-company-milestones',
            'view-company-single-milestone',
            'add-tasks',
            'edit-company-tasks',
            'delete-company-tasks',
            'view-company-single-task',
            'add-activities',
            'edit-company-activities',
            'delete-company-activities',
            'view-company-single-activity',
            'add-activityresponses',
            'edit-company-activityresponses',
            'delete-company-activityresponses',
            'view-company-single-activityresponse',
            'add-companysettings',
            'edit-company-companysettings',
            'delete-company-companysettings',
            'view-company-single-companysetting',
            'add-projectmembers',
            'delete-company-projectmembers',
            'view-single-projectmember',
            'add-documents',
            'edit-company-documents',
            'delete-company-documents',
            'view-company-single-document',
            'view-company-users',
            'view-company-projects',
            'view-company-fields',
            'view-company-objectives',
            'view-company-milestones',
            'view-company-tasks',
            'view-company-activities',
            'view-company-documents',
            'view-company-settings',
            'view-company-reports',
            'company-approve-activity',
            'member-invitation',
            'assign-roles',
            'view-project-timelines',
            'view-project-objectives',
            'view-project-milestones',
            'view-project-tasks',
            'view-project-activities',
            'view-project-documents',
            'add-reports',
            'edit-company-reports',
            'delete-company-reports',
            'view-company-single-report',
            'view-roles',
            'add-roles',
            'view-single-role',
            'edit-roles',
            'delete-roles',
            'view-permissions',
            'view-single-permission',
            'view-reporttypes',
            'view-single-reporttype'
        ]);

        $user->assignRole($role->name);
    }
}
