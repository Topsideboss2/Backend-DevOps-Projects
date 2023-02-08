<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    use HasFactory, Uuid;

    public $incrementing = false;

    protected $keyType = 'uuid';

    protected $casts = ['option' => 'array'];
    protected $fillable = ['name', 'type', 'option'];

    public function company () {
        return $this->belongsTo(Company::class);
    }

    public function project () {
        return $this->belongsToMany(Project::class);
    }
}
