<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;

class Activity extends Model
{
    use HasFactory, Uuid;

    public $incrementing = false;

    protected $keyType = 'uuid';

    public function company () {
        return $this->belongsTo(Company::class);
    }

    public function project () {
        return $this->belongsTo(Project::class);
    }

    public function milestone () {
        return $this->belongsTo(Milestone::class);
    }

    public function task () {
        return $this->belongsTo(Task::class);
    }

    public function activity_response () {
        return $this->hasOne(ActivityResponse::class);
    }

    public function activity_fields () {
        return $this->hasMany(ActivityField::class);
    }
}
