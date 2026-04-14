<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Tratamento;
use App\Models\TipoParametro;
use App\Models\Service;
use App\Http\Resources\TratamentoResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\TipoParametroResource;
use App\Http\Resources\TagCampoResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class TratamentosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais

           $tratamento = Tratamento::all();

           $result_tratamento = TratamentoResource::collection($tratamento); //only works for colection
           $ser = Service::orderBy('ser_titulo')->get();
           $servicos= ServiceResource::collection($ser);
           $response = [
               'status' => true,
               'message' => 'Dados Serviços',
               'data'    => [
                 'tratamentos'=>$result_tratamento,
                 'servicos'=>$servicos
               ]
           ];

           return response()->json($response, 200);
        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = null;
        $request->merge(['tra_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();


        $validator = Validator::make($input, [
            'tra_titulo' => 'required',
            'tra_texto' => 'required',
            'tra_display' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $tratamento = Tratamento::create($input);
        $tra = new TratamentoResource(Tratamento::findOrFail($tratamento->tra_id_tra));


       $arr_result = [
           "status" => true,
           "mensagem" => "Tratamento Inserido com sucesso!!!",
           "data" => $tra
       ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       //$section = Tratamentos::find($id);
       $tra = new TratamentoResource(Tratamento::find($id));
       $arr_result = [
            "status" => true,
            "mensagem" => "Dados listados com sucesso!!!",
            "data" => $tra
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

       $input = $request->all();
       $tratamento = Tratamento::find($id);
        //$Tratamento->tes_exibir = $input["tes_exibir"];
       $tratamento->update($input);

       $tra = new TratamentoResource($tratamento);
       $arr_result = [
            "status" => true,
            "mensagem" => "Tratamento Atualizado com Sucesso!!!",
            "data" => $tra
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
