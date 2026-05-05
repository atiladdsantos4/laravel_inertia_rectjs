<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class HorarioAgendaResource extends JsonResource
{
    private $meses =['','Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro', 'Dezembro'];
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

       //fer_id_fer,fer_titulo,fer_texto,fer_display,fer_created_at,fer_updated_at,fer_deleted_at
       if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'hoa_id_prt' => $this->hoa_id_prt,
               'hoa_profissional' => $this->protratamento->profissional->pro_nome,
               'hoa_min' => $this->min_dat,
               'hoa_max' => $this->max_dat,
               'hoa_tratamento' => $this->protratamento,
               'hoa_dataini' => $this->dataini,
               'hoa_datafim' => $this->datafim,
               'hoa_load' => false
            ];//filtros_agenda
        }  else if( $request->has('filtros_agenda') ){
              $data =  [
                'dat_ano' => $this->dat_ano,
                'dat_mes' => $this->dat_mes,
                'dat_mes_extenso' => $this->meses[$this->dat_mes],
                'dat_semana_mes' => $this->dat_semana_mes,
             ];
        } else if( $request->has('consultaagendadia') ){
            $data =  [
                'hoa_id_hoa'  => $this->hoa_id_hoa,
                'hoa_id_prt' => $this->hoa_id_prt,
                'hoa_ativo'=> (int)$this->hoa_ativo,
                'hoa_agendado' => $this->hoa_agendado,
                'hoa_confirmado' => $this->hoa_confirmado,
                'hoa_cancelado' => $this->hoa_cancelado,
                'hoa_finalizado' => $this->hoa_finalizado,
                'hoa_pago' => $this->hoa_pago,
                'hoa_status_atual'  => $this->hoa_status_atual,
                'hoa_profissional' => $this->protratamento->profissional->pro_nome,
                'hoa_tratamento' => $this->protratamento->tratamento_filtro,
                'hoa_tratamento_desconto' => $this->protratamento->tratamento_filtro->valor_atual->tva_max_desconto,
                'hoa_tratamento_valor' => $this->protratamento->tratamento_filtro->valor_atual->tva_valor,
                'hoa_load' => false,
                //'hoa_tratamento' => $this->protratamento,
                'hoa_agendas'=> $this->dataagendaconsulta
            ];


        }  else if( $request->has('listagem') ){
            $data =  [
                'fer_id_fer' => $this->fer_id_fer,
                'fer_descricao' => $this->fer_descricao,
                'fer_dia' => $this->fer_dia,
                'fer_mes' => $this->fer_mes,
                'fer_ano' => $this->fer_ano,
                'fer_ativo' => $this->fer_ativo,
                'fer_data' => Carbon::parse($this->fer_data)->format('d/m/Y'),
                'fer_anomesdia' => $this->fer_ano.$this->fer_mes.$this->fer_dia,
                'fer_load' => false,
                'fer_created_at' => Carbon::parse($this->fer_created_at)->format('d/m/Y H:i:s'),
                'fer_updated_at' => $this->fer_updated_at != null ? Carbon::parse($this->fer_updated_at)->format('d/m/Y H:i:s') : null,
            ];
         }  else if( $request->has('anos') ){
              $data =  [
                'dat_ano' => $this->dat_ano,
                'dat_mes' => $this->dat_mes,
                'dat_mes_extenso' => $this->meses[$this->dat_mes]
              ];
         } else {
            $data =  [
                'fer_id_fer' => $this->fer_id_fer,
                'fer_descricao' => $this->fer_descricao,
                'fer_dia' => $this->fer_dia,
                'fer_mes' => $this->fer_mes,
                'fer_ano' => $this->fer_ano,
                'fer_ativo' => $this->fer_ativo,
                'fer_data' => Carbon::parse($this->fer_data)->format('d/m/Y'),
                'fer_load' => false,
                'fer_created_at' => Carbon::parse($this->fer_created_at)->format('d/m/Y H:i:s'),
                'fer_updated_at' => $this->fer_updated_at != null ? Carbon::parse($this->fer_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
