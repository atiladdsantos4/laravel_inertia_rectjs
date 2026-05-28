<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Cliente;
use App\Models\Service;
use App\Models\Tratamento;
use App\Http\Resources\EmpresaResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;


class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();
        if( $all["relatorio"] == 'listaagendas' ){
            $valor = $request->input('valor');
            $cli = Cliente::where('cli_id_cli',$valor)
            ->with('agendamentos')
            ->with('agendamentos.horario.dataagenda')
            ->with('agendamentos.horario.protratamento.tratamento')
            ->with('agendamentos.horario.protratamento.profissional')
            ->get();
            $dados = $cli[0]["agendamentos"];
            $cliente = [
                "name" => $cli[0]["cli_name"],
                "cpf"  => $cli[0]["cli_cpf"],
                "email"  => $cli[0]["cli_email"]
            ];
            $pdf = Pdf::loadView('relatorios.listaagendacliente', [
                "valor"=> $valor,
                "dados"=>$dados,
                "cliente"=>$cliente,
                "textohead"=>"HAIR SALON",
                "textofooter"=>"Relatório de Atendimentos Realizados  -  Hair Sallon Copyright",
            ]);
            $pdf->setPaper('A4', 'landscape');
            //$pdf->render();

            // 3. Add Page Numbers (x, y, text, font, size, color)
            // $canvas = $pdf->getCanvas();
            // $canvas->page_text(
            //     520,                // X position
            //     320,                // Y position
            //     "Page {PAGE_NUM} of {PAGE_COUNT}",
            //     $pdf->getFontMetrics()->get_font("helvetica", "bold"),
            //     10,                 // Font size
            //     array(0, 0, 0)      // RGB color
            // );

            return $pdf->stream('lista-agendas.pdf');
        }

        if( $all["relatorio"] == 'listaclientes' ){
           $dados = Cliente::orderBy('cli_name')->get();

           $pdf = Pdf::loadView('relatorios.listacliente', [
                "dados"=>$dados,
                "textohead"=>"HAIR SALON",
                "textofooter"=>"Relatório Lista de Clientes  -  Hair Sallon Copyright",
            ]);
            $pdf->setPaper('A4', 'landscape');
            return $pdf->stream('lista-clientes.pdf');

        }
        //serviços
        if( $all["relatorio"] == 'listaservicos' ){
           $dados = Service::orderBy('ser_titulo')->get();

           $pdf = Pdf::loadView('relatorios.listaservicos', [
                "dados"=>$dados,
                "textohead"=>"HAIR SALON",
                "textofooter"=>"Relatório Lista de Serviços  -  Hair Sallon Copyright",
            ]);
            $pdf->setPaper('A4', 'landscape');
            return $pdf->stream('lista-serviços.pdf');

        }

        //serviços
        if( $all["relatorio"] == 'listatratamentos' ){
           $dados = Tratamento::with('servico_api')
           ->with('valor_atual')
           ->orderBy('tra_id_tra')->get();

           $pdf = Pdf::loadView('relatorios.listatratamentos', [
                "dados"=>$dados,
                "textohead"=>"HAIR SALON",
                "textofooter"=>"Relatório Lista de Tratamentos  -  Hair Sallon Copyright",
            ]);
            $pdf->setPaper('A4', 'landscape');
            return $pdf->stream('lista-tratamentos.pdf');

        }

        //$tratamento = Tratamento::orderBy('tra_id_tra')->get();

        try {
           $empresa = Empresa::orderBy('emp_nome')->get();
        } catch (\Exception $e) {
           $teste = $e;
        }

        $result =  EmpresaResource::collection($empresa); //only works for colection

        $response = [
            'success' => true,
            'message' => 'Lista de Empresas',
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
            'emp_nome' => 'required',
            'emp_tipo_empresa' => 'required',
            'emp_cnpj_cpf' => 'required',
            'emp_ativo' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $empresa = Empresa::create($input);
        $emp = Empresa::find($empresa->emp_id_emp);
        $emp->emp_hash = md5($emp->emp_hash.$emp->emp_id_emp);
        $emp->update();
        $empresa = new EmpresaResource(Empresa::findOrFail($emp->emp_id_emp));


        if( $request->has('has_image') ) {
           $file = $request->file('file');
           $fileName  = $file->getClientOriginalName();
           $emp = Empresa::find($empresa->emp_id_emp);
           $emp->emp_logo = $emp->emp_id_emp.'/'.$fileName;
           $emp->update();
           $path = 'images/medical/empresa/'.$id.'/'.$fileName;
           //Adiciona a nova imagem e atualiza o conteudo
           Storage::disk('public')->put($path, file_get_contents($file));
        }

        $arr_result = [
            "status" => true,
            "mensagem" => "Empresa Inserida com sucesso!!!",
            "data" => $empresa
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function storeApi(Request $request)
    {
       $input = $request->all();

        $validator = Validator::make($input, [
            'emp_nome' => 'required',
            'emp_tipo_empresa' => 'required',
            'emp_cnpj_cpf' => 'required',
            'emp_ativo' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $empresa = Empresa::create($input);
        $emp = Empresa::find($empresa->emp_id_emp);
        $emp->emp_hash = md5($emp->emp_hash.$emp->emp_id_emp);
        $emp->update();
        $empresa = new EmpresaResource(Empresa::findOrFail($emp->emp_id_emp));


        if( $request->has('has_image') ) {
           $file = $request->file('file');
           $fileName  = $file->getClientOriginalName();
           $emp = Empresa::find($empresa->emp_id_emp);
           $emp->emp_logo = $emp->emp_id_emp.'/'.$fileName;
           $emp->update();
           $path = 'images/medical/empresa/'.$id.'/'.$fileName;
           //Adiciona a nova imagem e atualiza o conteudo
           Storage::disk('public')->put($path, file_get_contents($file));
        }

        $arr_result = [
            "status" => true,
            "mensagem" => "Empresa Inserida com sucesso!!!",
            "data" => $empresa
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
