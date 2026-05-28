<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\SectionItemController;
use App\Http\Controllers\Api\TestemunhoController;
use App\Http\Controllers\Api\ServicesController;
use App\Http\Controllers\Api\TratamentosController;
use App\Http\Controllers\Api\TratamentosValorController;
use App\Http\Controllers\Api\PacoteController;
use App\Http\Controllers\Api\FeriadosController;
use App\Http\Controllers\Api\ProfissionalController;
use App\Http\Controllers\Api\ProTratamentoController;
use App\Http\Controllers\Api\HorarioAgendaController;
use App\Http\Controllers\Api\PagamentosController;
use App\Http\Controllers\Api\PixController;
use App\Http\Controllers\Api\BancosController;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\ClienteAgendadoController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource('section',SectionController::class)->middleware('auth:sanctum');
Route::apiResource('sectionitem',SectionItemController::class)->middleware('auth:sanctum');
Route::apiResource('testemunho',TestemunhoController::class)->middleware('auth:sanctum');
Route::apiResource('services',ServicesController::class)->middleware('auth:sanctum');
Route::apiResource('tratamentos',TratamentosController::class)->middleware('auth:sanctum');
Route::apiResource('tratamentosvalor',TratamentosValorController::class)->middleware('auth:sanctum');
Route::apiResource('pacote',PacoteController::class)->middleware('auth:sanctum');
Route::apiResource('feriado',FeriadosController::class)->middleware('auth:sanctum');
Route::apiResource('profissional',ProfissionalController::class)->middleware('auth:sanctum');
Route::apiResource('protratamento',ProTratamentoController::class)->middleware('auth:sanctum');
Route::apiResource('horarioagenda',HorarioAgendaController::class)->middleware('auth:sanctum');
Route::apiResource('pagamentos',PagamentosController::class)->middleware('auth:sanctum');
Route::apiResource('pix',PixController::class)->middleware('auth:sanctum');
Route::apiResource('bancos',BancosController::class)->middleware('auth:sanctum');
Route::apiResource('cliente',ClienteController::class)->middleware('auth:sanctum');
Route::apiResource('clienteagendado',ClienteAgendadoController::class)->middleware('auth:sanctum');
