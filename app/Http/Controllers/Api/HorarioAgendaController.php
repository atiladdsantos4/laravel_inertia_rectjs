<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\HorarioAgenda;
use App\Models\DataAgenda;
use App\Http\Resources\HorarioAgendaResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class HorarioAgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $hora = new HorarioAgenda();
           $horarioagenda = $hora::groupBy('hoa_id_prt')
           ->select('hoa_id_prt',DB::raw('MIN(hoa_id_dat) as min_dat'),DB::raw('MAX(hoa_id_dat) as max_dat'))
           ->with('protratamento.profissional')
           ->with('protratamento.tratamento')
           ->get();
           foreach($horarioagenda as $item){
              $item->setValorIni($item->min_dat);
              $item->setValorFim($item->max_dat);
           }
           $result_horarioagenda = HorarioAgendaResource::collection($horarioagenda); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Section',
                'data'    => $result_horarioagenda
            ];

            return response()->json($response, 200);
        }

        if( isset($all["filtro"]) ){ //para renderizar as interfaces convencionais
           $horarioagenda = HorarioAgenda::all();
           //orderBy('tes_created_at');
           $result_horarioagenda = HorarioAgendaResource::collection($horarioagenda); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Section',
                'data'    => $result_horarioagenda
            ];

            return response()->json($response, 200);
        }

        if( isset($all["anos"]) ){ //para renderizar as interfaces convencionais
          $horarioagenda = DataAgenda::select('dat_ano','dat_mes')
          ->groupBy('dat_ano','dat_mes')
          ->orderBy('dat_ano')
          ->orderBy('dat_mes')
          ->get();

          $result_horarioagenda = HorarioAgendaResource::collection($horarioagenda); //only works for colection

          $response = [
                'status' => true,
                'message' => 'Dados Section',
                'data'    => $result_horarioagenda
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
        //hoa_id_hoa,hoa_id_prt,hoa_id_dat,hoa_ativo,hoa_agendado,hoa_confirmado,hoa_cancelado,hoa_finalizado,hoa_pago,hoa_created_at,hoa_updated_at,hoa_deleted_at
        $input = null;

        $request->merge(['hoa_id_dat' => null]);
        $request->merge(['hoa_ativo' => 1]);
        $request->merge(['hoa_agendado' => 'N']);
        $request->merge(['hoa_confirmado' => 'N']);
        $request->merge(['hoa_cancelado' => 'N']);
        $request->merge(['hoa_finalizado' => 'N']);
        $request->merge(['hoa_pago' => 'N']);
        $request->merge(['hoa_created_at' => date('Y-m-d H:i:s')]);
        $input = $request->all();

        $prtid = $input["hoa_id_prt"];
        if( $input["intervalo"] == 1){
            $int1 = $input["data_ini"].' '.'00:00:00';
            $int2 = $input["data_fim"].' '.'23:59:00';
            //insere apenas o que não existe no periodo evitando duplicidade
            $lista = DataAgenda::whereRaw("dat_data between '$int1' and '$int2'")
            ->select('dat_id_dat')
            ->whereRaw("not exists(select 1 from hoa_horario_agenda where hoa_id_prt = $prtid and hoa_id_dat = dat_id_dat)")
            ->orderBy('dat_id_dat')
            ->get();
        }
        if( $input["intervalo"] == 2){
           $ano = $input["ano"];
           $mes = $input["mes"];
           $lista = DataAgenda::whereRaw("dat_ano=$ano and dat_mes=$mes")
           ->select('dat_id_dat')
           ->whereRaw("not exists(select 1 from hoa_horario_agenda where hoa_id_prt = $prtid and hoa_id_dat = dat_id_dat)")
           ->orderBy('dat_id_dat')
           ->get();
        }
        //for($i=0; $i < count($lista); $i++){
        foreach ($lista as $item) {
           $input["hoa_id_dat"] = $item->dat_id_dat;
           HorarioAgenda::create($input);
        }
        $qtde_registros = count($lista);
        if( count($lista) > 0 ){
          $mensagem = 'Agenda Inserida com sucesso. Resgitros Inseridos:'.$qtde_registros;
          $color = 'success';
        } else {
          $mensagem = 'Não Houveram Resgitros Inseridos no Período Informado';
          $color = 'danger';
        }

        $arr_result = [
           "status" => true,
           "mensagem" => $mensagem,
           "color" => $color
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       //$section = HorarioAgenda::find($id);
       $sec = new SectionResource(HorarioAgenda::find($id));
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
       $horarioagenda = HorarioAgenda::find($id);
       $horarioagenda->prt_ativo = $input["prt_ativo"];
       $horarioagenda->update();

       $tes = new HorarioAgendaResource($horarioagenda);
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
        //verificar se tem agendas abertas//
        HorarioAgenda::where('hoa_id_prt',$id)->delete();
        $arr_result = [
            "status" => true,
            "mensagem" => "Dados Excluidos com sucesso!!!",
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }
}
