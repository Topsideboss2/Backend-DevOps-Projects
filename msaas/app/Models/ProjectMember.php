<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectMember extends Model
{
    use HasFactory, Uuid;

    public $incrementing = false;

    protected $keyType = 'uuid';

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function project() {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public static function byProject($id) {
        return ProjectMember::join('users', 'user_id', '=', '_project_members.user_id')
            ->where('_project_members.project_id', $id)
            ->get();
    }

    public static function checkIsMember($projectId, $userId) {
        return ProjectMember::where('project_id', $projectId)
            ->where('user_id', $userId)
            ->first();
    }
}
