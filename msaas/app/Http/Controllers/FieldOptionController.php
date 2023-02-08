<?php

namespace App\Http\Controllers;

use App\Models\FieldOption;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class FieldOptionController extends Controller
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
            $fieldOptions = FieldOption::all();
            return $this->successResponse($fieldOptions);
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
        try {
            $validator = Validator::make($request->all(), [

            ]);

            if($validator->fails()) {
                return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $fieldoption = new FieldOption();
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FieldOption  $fieldOption
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $fieldoption = FieldOption::find($id);
            if(! $fieldoption) {
                return $this->notFound();
            }

            return $this->successResponse($fieldoption);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FieldOption  $fieldOption
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FieldOption $fieldOption)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FieldOption  $fieldOption
     * @return \Illuminate\Http\Response
     */
    public function destroy(FieldOption $fieldOption)
    {
        //
    }
}
