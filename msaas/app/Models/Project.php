<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory, Uuid;

    public $incrementing = false;

    protected $keyType = 'uuid';

    public function company () {
        return $this->belongsTo(Company::class);
    }

    public function fields () {
        return $this->belongsToMany(Field::class);
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

    public function documents () {
        return $this->hasMany(Document::class);
    }

    public function members_many() {
        return $this->belongsToMany(User::class, 'project_members');
    }
}
