<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Empresa;
use App\Models\TipoParametro;
use App\Models\TagCampo;
use App\Models\Testemunhos;
use App\Http\Resources\TestemunhoResource;
use App\Http\Resources\TipoParametroResource;
use App\Http\Resources\TagCampoResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class TestemunhoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $testemunho = Testemunhos::all();
           //orderBy('tes_created_at');
           $result_testemunho = TestemunhoResource::collection($testemunho); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Section',
                'data'    => $result_testemunho
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
            'tes_nome' => 'required',
            'tes_profissao' => 'required',
            'tes_valor_rate' => 'required',
            'tes_sexo' => 'required',
            'tes_email'=> 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
            //return json_encode(['error'=>$validator->errors()]);
            //return $this->sendError('Validation Error.', $validator->errors());
        }

        $testemunho = Testemunhos::create($input);
        $tes = new TestemunhoResource(Testemunhos::findOrFail($testemunho->tes_id_tes));


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
       //$section = Testemunhos::find($id);
       $sec = new SectionResource(Testemunhos::find($id));
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
       $testemunho = Testemunhos::find($id);
       $testemunho->tes_exibir = $input["tes_exibir"];
       $testemunho->update();

       $tes = new TestemunhoResource($testemunho);
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
