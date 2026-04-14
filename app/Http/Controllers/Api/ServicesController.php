<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Service;
use App\Models\TipoParametro;
use App\Models\TagCampo;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\TipoParametroResource;
use App\Http\Resources\TagCampoResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $service = Service::all();
           //orderBy('tes_created_at');
           $result_service = ServiceResource::collection($service); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Serviços',
                'data'    => $result_service
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
        $request->merge(['ser_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();


        $validator = Validator::make($input, [
            'ser_titulo' => 'required',
            'ser_texto' => 'required',
            'ser_display' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $service = Service::create($input);
        $ser = new ServiceResource(Service::findOrFail($service->ser_id_ser));


        $arr_result = [
            "status" => true,
            "mensagem" => "Serviço Inserido com sucesso!!!",
            "data" => $ser
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       //$section = services::find($id);
       $ser = new ServiceResource(Service::find($id));
       $arr_result = [
            "status" => true,
            "mensagem" => "Dados listados com sucesso!!!",
            "data" => $ser
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
       $service = Service::find($id);
       //$service->tes_exibir = $input["tes_exibir"];
       $service->update($input);

       $ser = new ServiceResource($service);
       $arr_result = [
            "status" => true,
            "mensagem" => "Serviçoe Atualizado com Sucesso!!!",
            "data" => $ser
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
