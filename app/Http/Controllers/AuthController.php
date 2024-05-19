<?php

namespace App\Http\Controllers;

use App\Models\LoginToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|alpha|min:2|max:20',
            'last_name' => 'required|alpha|min:2|max:20',
            'username' => 'required|min:5|max:12|alpha_dash|unique:users,username',
            'password' => 'required|min:5|max:12'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'invalid field', 'errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'password' => bcrypt($request->password)
        ]);

        Auth::login($user);

        $token = LoginToken::create([
            'user_id' => $user->id,
            'token' => bcrypt($user->id)
        ]);

        return response()->json($token->token);
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'invalid field'], 422);
        }

        if (!Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            return response()->json(['message' => 'invalid field'], 401);
        }

        $user = Auth::user();
        $token = LoginToken::create([
            'user_id' => $user->id,
            'token' => bcrypt($user->id)
        ]);

        return response()->json($token);
    }

    public function logout(){
        $user = Auth::user();
        $token = LoginToken::where('user_id', $user->id)->latest()->first();

        if (!$token) {
            return response()->json(['message' => 'unauthorized user'], 401);
        }

        $token->delete();

        return response()->json(['message' => 'logout success']);
    }

    public function me(){
        return response()->json(Auth::user());
    }
}
