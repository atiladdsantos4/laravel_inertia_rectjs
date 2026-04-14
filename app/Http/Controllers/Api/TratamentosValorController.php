<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\TratamentoValor;
use App\Models\Service;
use App\Http\Resources\TratamentoValorResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\TipoParametroResource;
use App\Http\Resources\TagCampoResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class TratamentosValorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais

           $tratamentovalor = TratamentoValor::all();

           $result_tratamento = TratamentoValorResource::collection($tratamentovalor); //only works for colection
           $response = [
               'status' => true,
               'message' => 'Dados Serviços',
               'data'    => $result_tratamento
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
        $request->merge(['tva_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();


        $validator = Validator::make($input, [
            'tva_valor' => 'required',
            'tva_max_desconto' => 'required',
            'tva_id_tra' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $tratamentovalor = TratamentoValor::create($input);
        $tra = new TratamentoValorResource(TratamentoValor::findOrFail($tratamentovalor->tva_id_tva));


       $arr_result = [
           "status" => true,
           "mensagem" => "Valor Tratamento Inserido com sucesso!!!",
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
       $tra = new TratamentoValorResource(TratamentoValor::find($id));
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
       $tratamentovalor = TratamentoValor::find($id);
        //$TratamentoValor->tes_exibir = $input["tes_exibir"];
       $tratamentovalor->update($input);

       $tra = new TratamentoValorResource($tratamentovalor);
       $arr_result = [
            "status" => true,
            "mensagem" => "TratamentoValor Atualizado com Sucesso!!!",
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
