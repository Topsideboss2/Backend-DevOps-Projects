<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory, Uuid;

    public $incrementing = false;

    protected $keyType = 'uuid';

    public function company_roles () {
        return $this->hasMany(CompanyRoles::class);
    }

    public function users () {
        return $this->hasMany(User::class);
    }

    public function projects () {
        return $this->hasMany(Project::class);
    }

    public function fields () {
        return $this->hasMany(Field::class);
    }

    public function objectives () {
        return $this->hasMany(Objectives::class);
    }

    public function milestones () {
        return $this->hasMany(Milestone::class);
    }

    public function tasks () {
        return $this->hasMany(Task::class);
    }

    public function activities () {
        return $this->hasMany(Activity::class);
    }

    public function activity_response () {
        return $this->hasMany(ActivityResponse::class);
    }

    public function documents () {
        return $this->hasMany(Document::class);
    }

    public function companysettings () {
        return $this->hasOne(CompanySetting::class);
    }

    public function reports () {
      return $this->hasMany(Report::class);
    }

    public function company_users () {
        return $this->hasMany(CompanyUser::class);
    }
}
