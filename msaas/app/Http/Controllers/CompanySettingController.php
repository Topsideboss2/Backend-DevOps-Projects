<?php

namespace App\Http\Controllers;

use App\Models\CompanySetting;
use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CompanySettingController extends Controller
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
            $companysetting = CompanySetting::all();
            return $this->successResponse($companysetting);
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
            'primary_email' => 'required',
            'primary_phone' => 'required',
            'primary_address' => 'required',
            'logo' => 'required',
            // 'logo' => 'nullable|mimes:jpeg,jpg,png,gif,JPG,JPEG,PNG,GIF|max:2048',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        try {
            // check if company setting already exist if yes update else create
            $companysetting = CompanySetting::where('company_id', User::company_id())->first();
            if($companysetting) {
                $companysetting->company_name = $request->primary_name;
                $companysetting->primary_email = $request->primary_email;
                $companysetting->primary_phone = $request->primary_phone;
                $companysetting->primary_address = $request->primary_address;
                if($request->hasfile('logo'))
                 {
                     $name = time().rand(1,100).'.'.$request->logo->extension();
                     $request->logo->storeAs('company', $name);
                     $url = Storage::url($name);
                     $companysetting->logo = $url;
                 }
                $companysetting->save();
                return $this->successResponse($companysetting, Response::HTTP_CREATED);
            }
            $companysetting = new CompanySetting();
            $companysetting->company_id = User::company_id();
            $companysetting->company_name = $request->primary_name;
            $companysetting->primary_email = $request->primary_email;
            $companysetting->primary_phone = $request->primary_phone;
            $companysetting->primary_address = $request->primary_address;
            if($request->hasfile('logo'))
             {
                 $name = time().rand(1,100).'.'.$request->logo->extension();
                 $request->logo->storeAs('company', $name);
                 $url = Storage::url($name);
                 $companysetting->logo = $url;
             }
            $companysetting->save();

            return $this->successResponse($companysetting, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CompanySetting  $companySetting
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $companysetting = CompanySetting::find($id);
            if(!$companysetting) {
                return $this->notFound();
            }

            return $this->successResponse($companysetting);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_show($id)
    {
        try {
            $companysetting = CompanySetting::find($id);
            if(!$companysetting) {
                return $this->notFound();
            }
            if($companysetting->company->id != User::company_id()) {
                return $this->forbidden();
            }

            return $this->successResponse($companysetting);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CompanySetting  $companySetting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'primary_email' => 'required',
            'primary_phone' => 'required',
            'primary_address' => 'required',
            'logo' => 'nullable',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $companysetting = CompanySetting::find($id);
        if(!$companysetting) {
            return $this->notFound();
        }

        try {
            $companysetting->company_name = $request->primary_name;
            $companysetting->primary_email = $request->email;
            $companysetting->primary_phone = $request->phone;
            $companysetting->primary_address = $request->address;
            if($request->hasfile('logo'))
             {
                 $name = time().rand(1,100).'.'.$request->logo->extension();
                 $request->logo->storeAs('company', $name);
                 $url = Storage::url($name);
                 $companysetting->logo = $url;
             }
            $companysetting->save();

            return $this->successResponse($companysetting, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function company_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'primary_name' => 'required',
            'primary_email' => 'required',
            'primary_phone' => 'required',
            'primary_address' => 'required',
            'logo' => 'nullable',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $companysetting = CompanySetting::find($id);
        if(!$companysetting) {
            return $this->notFound();
        }
        if($companysetting->company->id != User::company_id()) {
            return $this->forbidden();
        }

        try {
            $companysetting->company_name = $request->primary_name;
            $companysetting->primary_email = $request->email;
            $companysetting->primary_phone = $request->phone;
            $companysetting->primary_address = $request->address;
            if($request->hasfile('logo'))
             {
                 $name = time().rand(1,100).'.'.$request->logo->extension();
                 $request->logo->storeAs('company', $name);
                 $url = Storage::url($name);
                 $companysetting->logo = $url;
             }
            $companysetting->save();

            return $this->successResponse($companysetting, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CompanySetting  $companySetting
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $companysetting = CompanySetting::find($id);
            if(!$companysetting) {
                return $this->notFound();
            }
            $companysetting->delete();

            return $this->deleteMessage('Company Setting', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_destroy($id)
    {
        try {
            $companysetting = CompanySetting::find($id);
            if(!$companysetting) {
                return $this->notFound();
            }
            if($companysetting->company->id != User::company_id()) {
                return $this->forbidden();
            }
            $companysetting->delete();

            return $this->deleteMessage('Company Setting', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
