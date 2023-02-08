<?php

namespace App\Http\Controllers;

use App\Models\Field;
use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class FieldController extends Controller
{
    use ApiResponser;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $fields = Field::all();
        return $this->successResponse($fields);
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
            'data' => 'required',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        try {
            foreach ($request->data as $key => $value) {
                $field = new Field();
                $field->company_id = User::company_id();
                $field->name = $value['name'];
                $field->type = $value['type'];
                $field->option = $value['option'];
                $field->save();
            }

            return $this->successResponse("Successfully added fields");
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Field  $field
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $field = Field::find($id);
            if(!$field) {
                return $this->notFound();
            }

            return $this->successResponse($field);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_show($id)
    {
        try {
            $field = Field::find($id);
            if(!$field) {
                return $this->notFound();
            }
            if($field->company->id != User::company_id()) {
                return $this->forbidden();
            }

            return $this->successResponse($field);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Field  $field
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $validator = Validator::make($request->all(), [
            'data' => 'required',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $field = Field::find($id);
            if(!$field) {
                return $this->notFound();
            }

            $field->company_id = User::company_id();
            $field->name = $request->name;
            $field->type = $request->type;
            $field->option = $request->option;
            $field->save();

            return $this->successResponse($field);;
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_update(Request $request,$id)
    {
        $validator = Validator::make($request->all(), [
            'data' => 'required',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $field = Field::find($id);
            if(!$field) {
                return $this->notFound();
            }

            if($field->company->id != User::company_id()) {
                return $this->forbidden();
            }

            $field->company_id = User::company_id();
            $field->name = $request->name;
            $field->type = $request->type;
            $field->option = $request->option;
            $field->save();

            return $this->successResponse($field);;
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Field  $field
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $field = Field::find($id);
            if(!$field) {
                return $this->notFound();
            }
            $field->delete();
            return $this->deleteMessage('Field', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
    public function company_destroy($id)
    {
        try {
            $field = Field::find($id);
            if(!$field) {
                return $this->notFound();
            }
            if($field->company->id != User::company_id()) {
                return $this->forbidden();
            }
            $field->delete();
            return $this->deleteMessage('Field', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
}
