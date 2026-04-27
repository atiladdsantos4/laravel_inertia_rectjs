<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Profissional;
use App\Models\ProTratamento;
use App\Http\Resources\ProfissionalResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ProfissionalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $profissional = Profissional::orderBy('pro_nome')
           ->with('tratamentos.profissional')
           ->with('tratamentos.tratamento')
           ->with('tratamentos.tratamento.servico_api')
           ->get();
           $result_profissional = ProfissionalResource::collection($profissional); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Profissional',
                'data'    => $result_profissional
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
        $request->merge(['pro_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'pro_nome' => 'required',
            'pro_apelido' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $profissional = Profissional::create($input);

        $file = $request->file('file');
        $fileName  = $file->getClientOriginalName();
        $path = $input["pro_path_image"];
        //Adiciona a nova imagem e atualiza o conteudo
        Storage::disk('inertia_public')->put($path, file_get_contents($file));

        // salva os tratmentos associados //
        $postjson = json_decode($input["prt_itens"], true);
        for($i = 0;$i < count($postjson["meta"]); $i++){
            $valor = $postjson["meta"][$i];
            if( $postjson["meta"][$i]["prt_exclui"] == 'N'){
                $valor+=["prt_id_pro"=>$profissional->pro_id_pro];
                $teste =  $valor;
                ProTratamento::create($valor);
            }
        }

        $fer = new ProfissionalResource(Profissional::findOrFail($profissional->pro_id_pro));


        $arr_result = [
            "status" => true,
            "mensagem" => "Profissional Inserido com sucesso!!!",
            "data" => $fer
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       //$section = services::find($id);
       $fer = new ProfissionalResource(Profissional::find($id));
       $arr_result = [
            "status" => true,
            "mensagem" => "Dados listados com sucesso!!!",
            "data" => $fer
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
       $profissional = Profissional::find($id);
       $profissional->update($input);

       if( isset($input["has_image"]) ){

          Storage::disk('inertia_public')->delete($profissional->pro_path_image);
          $file = $request->file('file');
          $fileName  = $file->getClientOriginalName();
          $path = $input["pro_path_image"];

          //Adiciona a nova imagem e atualiza o conteudo
          Storage::disk('inertia_public')->put($path, file_get_contents($file));

        }

       $postjson = json_decode($input["prt_itens"], true);
       for($i = 0;$i < count($postjson["meta"]); $i++){
            $valor = $postjson["meta"][$i];
            $existe_item = $postjson["meta"][$i]["prt_id_prt"] ?? null;
            if( $existe_item != null ){
               if( $postjson["meta"][$i]["prt_exclui"] == 'N'){
                  $pac = ProTratamento::find($existe_item);
                  $pac->update($valor);
               } else {
                  $pac = ProTratamento::find($existe_item)->delete();
               }
            } else {
               if( $postjson["meta"][$i]["prt_exclui"] == 'N'){
                  $valor+=["prt_id_pro"=>$profissional->pro_id_pro];
                  ProTratamento::create($valor);
               }
            }
       }

       $fer = new ProfissionalResource($profissional);
       $arr_result = [
            "status" => true,
            "mensagem" => "Profissional Atualizado com Sucesso!!!",
            "data" => $fer
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
