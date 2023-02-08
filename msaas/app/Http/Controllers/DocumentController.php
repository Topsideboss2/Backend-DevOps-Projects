<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\User;
use App\Models\Project;
use App\Traits\ApiResponser;
use App\Traits\LogProjectActivity;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DocumentController extends Controller
{
    use ApiResponser, LogProjectActivity;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $documents = Document::all();
        return $this->successResponse($documents);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id',
            'document' => 'required|mimes:png,jpg,jpeg,pdf,doc,docx,xls,xlsx,ppt,pptx,txt',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        DB::beginTransaction();

        $project = Project::find($request->project_id);
        if(!$project) {
            return $this->notFound();
            DB::rollBack();
        }
        if($project->company->id != User::company_id()) {
            return $this->forbidden();
            DB::rollBack();
        }

        try {
            $document = new Document();
            $document->company_id = User::company_id();
            $document->project_id = $request->project_id;
            if($request->hasfile('document'))
             {
                 $name = time().rand(1,100).'.'.$request->document->extension();
                 $request->document->storeAs('documents', $name);
                 $url = Storage::url($name);
                 $document->document = $url;
             }
            $document->save();

            try {
                $this->logActivity(
                    User::company_id(),
                    $document->project->id,
                    $this->logDescription('Document', ' ', 'added to the project'),
                    auth()->user(),
                    $document
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->successResponse($document, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $document = Document::find($id);
            if(!$document) {
                return $this->notFound();
            }

            return $this->successResponse($document);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_show($id)
    {
        try {
            $document = Document::find($id);
            if(!$document) {
                return $this->notFound();
            }

            if($document->company->id != User::company_id()) {
                return $this->forbidden();
            }

            return $this->successResponse($document);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required',
            'document' => 'required',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $document = Document::find($id);
        if(!$document) {
            return $this->notFound();
        }
        if($document->company->id != User::company_id()) {
            return $this->forbidden();
        }
        DB::beginTransaction();
        try {

            $document->project_id = $request->project_id;
            if($request->hasfile('document'))
             {
                 $name = time().rand(1,100).'.'.$request->document->extension();
                 $request->upload->storeAs('documents', $name);
                 $url = Storage::url($name);
                 $document->document = $url;
             }
            $document->save();

            try {
                $this->logActivity(
                    User::company_id(),
                    $document->project->id,
                    $this->logDescription('Document', ' ', 'has been updated'),
                    auth()->user(),
                    $document
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->successResponse($document, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    public function company_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id',
            'document' => 'required',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $document = Document::find($id);
        if(!$document) {
            return $this->notFound();
        }
        if($document->company->id != User::company_id()) {
            return $this->forbidden();
        }
        DB::beginTransaction();
        try {

            $document->project_id = $request->project_id;
            if($request->hasfile('document'))
             {
                 $name = time().rand(1,100).'.'.$request->document->extension();
                 $request->upload->storeAs('documents', $name);
                 $url = Storage::url($name);
                 $document->document = $url;
             }
            $document->save();

            try {
                $this->logActivity(
                    User::company_id(),
                    $document->project->id,
                    $this->logDescription('Document', ' ', 'has been updated'),
                    auth()->user(),
                    $document
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->successResponse($document, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $document = Document::find($id);
            if(!$document) {
                return $this->notFound();
            }
            DB::beginTransaction();
            $document->delete();

            try {
                $this->logActivity(
                    User::company_id(),
                    $document->project->id,
                    $this->logDescription('Document', ' ', 'has been updated'),
                    auth()->user(),
                    $document
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->deleteMessage('Document', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_destroy($id)
    {
        try {
            $document = Document::find($id);
            if(!$document) {
                return $this->notFound();
            }
            if($document->company->id != User::company_id()) {
                return $this->forbidden();
            }
            DB::beginTransaction();
            $document->delete();

            try {
                $this->logActivity(
                    User::company_id(),
                    $document->project->id,
                    $this->logDescription('Document', ' ', 'has been updated'),
                    auth()->user(),
                    $document
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->deleteMessage('Document', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
