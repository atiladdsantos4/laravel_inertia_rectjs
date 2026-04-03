<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Sections;
use App\Models\Empresa;
use App\Models\TipoParametro;
use App\Models\TagCampo;
use App\Http\Resources\SectionResource;
use App\Http\Resources\TipoParametroResource;
use App\Http\Resources\TagCampoResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["init_section"]) ){ //para renderizar as interfaces convencionais
           $emp = Empresa::where('emp_hash',$all["empresa"])->first();
           $section = Sections::where('sec_id_emp',$emp->emp_id_emp)
           ->where('sec_nome',$all["section_nome"])
           ->get();
           $result_section = SectionResource::collection($section); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Section',
                'data'    => [
                   'sections'=>$result_section,
                ]
            ];

            return response()->json($response, 200);
        }

        if( isset($all["init"]) ){

            $emp = Empresa::where('emp_hash',$all["empresa"])->first();
            $tipo = TipoParametro::all();
            $tag = TagCampo::all();
            $result_tipo = TipoParametroResource::collection($tipo);
            $result_tag = TagCampoResource::collection($tag);
            $section = Sections::where('sec_id_emp',$emp->emp_id_emp)->get();
            $result_section = SectionResource::collection($section); //only works for colection
            $response = [
                'status' => true,
                'message' => 'Dados Section',
                'data'    => [
                'emp_id_emp'=>$emp->emp_id_emp,
                'sections'=>$result_section,
                'tipos'=>$result_tipo,
                'tags'=>$result_tag,
                ]
            ];

            return response()->json($response, 200);
        }
        try {
           $section = Sections::orderBy('sec_nome')->get();
        } catch (\Exception $e) {
           $teste = $e;
        }

        $result =  SectionResource::collection($section); //only works for colection

        $response = [
            'success' => true,
            'message' => 'Lista de Sections',
            'data'    => $result
        ];

        return response()->json($response, 200);
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
            'sec_nome' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
            //return json_encode(['error'=>$validator->errors()]);
            //return $this->sendError('Validation Error.', $validator->errors());
        }

        $section = Sections::create($input);
        $sec = new SectionResource(Sections::findOrFail($section->sec_id_sec));


        $arr_result = [
            "status" => true,
            "mensagem" => "Section Inserido com sucesso!!!",
            "data" => $sec
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       //$section = Sections::find($id);
       $sec = new SectionResource(Sections::find($id));
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
       $section = Sections::find($id);
       $section->sec_nome = $input["sec_nome"];
       $section->update();

       $sec = new SectionResource(Sections::find($id));
       $arr_result = [
            "status" => true,
            "mensagem" => "Seção Atualizada com Sucesso!!!",
            "data" => $sec
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
