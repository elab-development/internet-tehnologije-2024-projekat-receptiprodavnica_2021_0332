<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Korisnik;    
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)  {
        $validator = Validator::make($request->all(),[
        'korisnickoIme'=>'required|string|max:255|unique:korisnici',
        'lozinka'=>'required|string|min:8',
    ]);

    if($validator->fails()){
        return response()->json($validator->errors(), 422);
    }
    $user = Korisnik::create([
        'korisnickoIme'=>$request->korisnickoIme,
        'lozinka'=>Hash::make($request->lozinka),
        'tipKorisnika'=>'registrovani'
       
    ]);
    $token = $user->createToken('auth_token')->plainTextToken;
    return response()->json(['message' => 'Uspešno ste se registrovali.','data' => $user, 'access_token' => $token, 'token_type' => 'Bearer', ]);



    }

    public function login(Request $request)
    {
        // Validacija inputa
        $validator = Validator::make($request->all(),[
            'korisnickoIme' => 'required|string',
            'lozinka' => 'required|string|min:8',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        // Proverite da li korisnik postoji i da li je lozinka ispravna
        $user = Korisnik::where('korisnickoIme', $request->korisnickoIme)->first();

        if (!$user || !Hash::check($request->lozinka, $user->lozinka)) {
            return response()->json(['success' => false,'error' => 'Neispravno korisničko ime ili lozinka.', 401]);
        }

        // Generišemo token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['success' => true,
            'message' => 'Uspešno ste se prijavili.',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(){
        auth()->korisnici()->tokens()->delete();
        return response()->json(['message' => 'Uspešno ste se odjavili.']);
    }
}
