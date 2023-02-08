<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('company_id');
            $table->uuid('project_id');
            $table->uuid('milestone_id');
            $table->uuid('user_id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('start_date');
            $table->date('due_date');
            $table->date('completed_on')->nullable();
            $table->enum('priority', ['high', 'medium', 'low'])->default('low')->nullable();
            $table->enum('status', ['complete', 'incomplete'])->default('incomplete');
            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->foreign('milestone_id')->references('id')->on('milestones')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
