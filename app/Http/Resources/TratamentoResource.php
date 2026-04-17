<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TratamentoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

       //tra_id_tra,tra_titulo,tra_texto,tra_display,tra_id_ser,tra_created_at,tra_updated_at,tra_deleted_at
       if( $request->has('listagem') ){
            $data =  [
                'tra_id_tra' => $this->tra_id_tra,
                'tra_titulo' => $this->tra_titulo,
                'tra_texto' => $this->tra_texto,
                'tra_display' => $this->tra_display,
                'tra_id_ser' => $this->tra_id_ser,
                'tra_load' => false,
                'tra_valor_atual' => $this->valor_atual,
                'tra_servico' => $this->servico,
                'tra_valores' => $this->valores,
                'tra_created_at' => Carbon::parse($this->tra_created_at)->format('d/m/Y H:i:s'),
                'tra_updated_at' => $this->tra_updated_at != null ? Carbon::parse($this->tra_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }  else if($request->has('init')){
          $data =  [
                'tip_id_tip' => $this->tip_id_tip,
                'tip_nome' => $this->tip_nome,
          ];
         } else {
            $data =  [
               'tra_id_ser' => $this->tra_id_ser,
               'tra_titulo' => $this->tra_titulo,
               'tra_texto' => $this->tra_texto,
               'tra_display' => $this->tra_display,
               'tra_id_ser' => $this->tra_id_ser,
               'tra_load' => false,
               'tra_servico' => $this->servico,
               'tra_created_at' => Carbon::parse($this->tra_created_at)->format('d/m/Y H:i:s'),
               'tra_updated_at' => $this->tra_updated_at != null ? Carbon::parse($this->tra_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
