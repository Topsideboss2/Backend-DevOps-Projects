<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
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

    public function user () {
        return $this->belongsTo(User::class);
    }

    public function activities () {
        return $this->hasMany(Activity::class);
    }
}
