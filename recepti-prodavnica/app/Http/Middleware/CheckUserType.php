<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $requiredType)
    {
        $user = auth()->user();

        if (!$user || $user->tipKorisnika !== $requiredType) {
            return response()->json(['message' => 'Nemate ovlašćenje za ovu operaciju'], 403);
        }

        return $next($request);
    }
}
