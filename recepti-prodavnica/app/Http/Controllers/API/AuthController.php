<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)  {
        $validator = Validator::make(request->all(),[
        'name'=>'required|string|max:255',
        'email'=>'required|string|max:255|email|unique:users',
        'password'=>'required|string|min:8'
    ]);

    if($validator->fails()){
        return response()->json($validator->errors());
    }
    $user = User::create([
        'name'=>$request->name,
        'password'=>$request->password,
        'email'=>$request->email,
    ]);
    $token = $user->createToken('auth_token')->plainTextToken;
    return response()->json(['data'=>$user, 'access_token'=>$token, 'token_type'=>'Bearer']);


    }
}
