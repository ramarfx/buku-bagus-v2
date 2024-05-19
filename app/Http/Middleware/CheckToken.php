<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use App\Models\LoginToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('Authorization');
        if (!$token) {
            return response()->json(['message' => 'unauthorized user'], 401);
        }

        $token = explode(' ', $token)[1];
        $loginToken = LoginToken::where('token', $token)->first();

        if (!$loginToken) {
            return response()->json(['message' => 'unauthorized user'], 401);
        }

        $user = User::where('id', $loginToken->user_id)->first();
        Auth::login($user);

        return $next($request);
    }
}
