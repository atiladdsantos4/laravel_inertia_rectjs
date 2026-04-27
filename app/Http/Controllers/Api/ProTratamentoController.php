<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\ProTratamento;
use App\Http\Resources\ProTratamentoResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ProTratamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $protratamento = ProTratamento::all();
           //orderBy('tes_created_at');
           $result_protratamento = ProTratamentoResource::collection($protratamento); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Section',
                'data'    => $result_protratamento
            ];

            return response()->json($response, 200);
        }

        if( isset($all["filtro"]) ){ //para renderizar as interfaces convencionais
           $protratamento = ProTratamento::all();
           //orderBy('tes_created_at');
           $result_protratamento = ProTratamentoResource::collection($protratamento); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Section',
                'data'    => $result_protratamento
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
        $input = $request->all();

        $validator = Validator::make($input, [
            'prt_id_pro' => 'required',
            'prt_id_tra' => 'required',
            'prt_tempo_experiencia' => 'required',
            'prt_ativo' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
            //return json_encode(['error'=>$validator->errors()]);
            //return $this->sendError('Validation Error.', $validator->errors());
        }

        $protratamento = ProTratamento::create($input);
        $tes = new ProTratamentoResource(ProTratamento::findOrFail($protratamento->tes_id_tes));


        $arr_result = [
            "status" => true,
            "mensagem" => "Testemunho Inserido com sucesso!!!",
            "data" => $tes
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       //$section = ProTratamento::find($id);
       $sec = new SectionResource(ProTratamento::find($id));
       $arr_result = [
            "status" => true,
            "mensagem" => "Dados listados com sucesso!!!",
            "data" => $sec
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
       $protratamento = ProTratamento::find($id);
       $protratamento->prt_ativo = $input["prt_ativo"];
       $protratamento->update();

       $tes = new ProTratamentoResource($protratamento);
       $arr_result = [
            "status" => true,
            "mensagem" => "Testemunho Atualizada com Sucesso!!!",
            "data" => $tes
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
