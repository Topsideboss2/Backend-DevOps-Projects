<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FieldProject extends Model
{
    use HasFactory, Uuid;

    public $incrementing = false;

    protected $keyType = 'uuid';

    protected $table = 'field_project';

    protected $fillable = ['company_id', 'field_id', 'project_id', 'value'];

    public function project () {
        return $this->belongsTo(Project::class);
    }
}
