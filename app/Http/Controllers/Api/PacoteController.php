<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Pacote;
use App\Models\PacoteItem;
use App\Models\TipoParametro;
use App\Models\Service;
use App\Http\Resources\PacoteResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\TipoParametroResource;
use App\Http\Resources\TagCampoResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class PacoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais

           $pacote = Pacote::orderBy('pac_id_pac')
           ->with('itens.tratamento')
           ->with('itens.tratamento.servico_api')
           ->with('itens.tratamento.valor_atual')
           ->get();//brings relation

           $result_pacote = PacoteResource::collection($pacote); //only works for colection
        //    $ser = Service::orderBy('ser_titulo')->get();
        //    $servicos= ServiceResource::collection($ser);
           $response = [
               'status' => true,
               'message' => 'Dados Pacote',
               'data'    => $result_pacote
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
        $request->merge(['pac_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'pac_nome' => 'required',
            'pac_ativo' => 'required',
            'pac_display' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $pacote = Pacote::create($input);
        //salvando os itens do pacote //
        $postjson = json_decode($input["pac_itens"], true);
        for($i = 0;$i < count($postjson["meta"]); $i++){
            $valor = $postjson["meta"][$i];
            if( $postjson["meta"][$i]["pai_exclui"] == 'N'){
                $valor+=["pai_id_pac"=>$pacote->pac_id_pac];
                $teste =  $valor;
                PacoteItem::create($valor);
            }
        }

        $pac = new PacoteResource(Pacote::findOrFail($pacote->pac_id_pac));


       $arr_result = [
           "status" => true,
           "mensagem" => "Pacote Inserido com sucesso!!!",
           "data" => $pac
       ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       //$section = Tratamentos::find($id);
       $pac = new PacoteResource(Pacote::find($id));
       $arr_result = [
            "status" => true,
            "mensagem" => "Dados listados com sucesso!!!",
            "data" => $pac
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
       $pacote = Pacote::find($id);

    //    $arr_result = [
    //         "status" => true,
    //         "mensagem" => "Pacote Atualizado com Sucesso!!!",
    //         "data" => $pac
    //    ];

    //     return json_encode($arr_result,JSON_PRETTY_PRINT);
       //$Pacote->tes_exibir = $input["tes_exibir"];
       $pacote->update($input);

       $postjson = json_decode($input["pac_itens"], true);
       for($i = 0;$i < count($postjson["meta"]); $i++){
            $valor = $postjson["meta"][$i];
            $existe_item = $postjson["meta"][$i]["pai_id_pai"] ?? null;
            if( $existe_item != null ){
               if( $postjson["meta"][$i]["pai_exclui"] == 'N'){
                  $pac = PacoteItem::find($existe_item);
                  $pac->update($valor);
               } else {
                  $pac = PacoteItem::find($existe_item)->delete();
               }
            } else {
               if( $postjson["meta"][$i]["pai_exclui"] == 'N'){
                  $valor+=["pai_id_pac"=>$pacote->pac_id_pac];
                  PacoteItem::create($valor);
               }
            }
       }

       $pac = new PacoteResource($pacote);
       $arr_result = [
            "status" => true,
            "mensagem" => "Pacote Atualizado com Sucesso!!!",
            "data" => $pac
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
