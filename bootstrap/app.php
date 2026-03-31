<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use \App\Http\Middleware\HandleInertiaRequests;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
         $middleware->append(HandleInertiaRequests::class);
         $middleware->validateCsrfTokens(except: [
            'http://jemosistemas-domain.com/inertia-react/auth/register',
            'http://jemosistemas-domain.com/inertia-react/login/register',
            'http://jemosistemas-domain.com/inertia-react/empresa/*',
            'http://jemosistemas-domain.com/college/landio/deleteimg',
            'http://jemosistemas-domain.com/college/landio/deleteimg/*',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
