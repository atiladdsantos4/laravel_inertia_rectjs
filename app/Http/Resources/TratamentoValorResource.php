<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TratamentoValorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    //tva_id_tva,tva_valor,tva_max_desconto,tva_version_atual,tva_id_tra,tva_created_at,tva_updated_at,tva_deleted_at
    public function toArray(Request $request): array
    {

       if( $request->has('listagem') ){
            $data =  [
                'tva_id_tva' => $this->tva_id_tva,
                'tva_valor' => $this->tva_valor,
                'tva_max_desconto' => $this->tva_max_desconto,
                'tva_version_atual' => $this->tva_version_atual,
                'tva_tratamento' => $this->tratamento,
                'tva_load' => false,
                'tva_created_at' => Carbon::parse($this->tva_created_at)->format('d/m/Y H:i:s'),
                'tva_updated_at' => $this->tva_updated_at != null ? Carbon::parse($this->tva_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }  else if($request->has('init')){
          $data =  [
                'tip_id_tip' => $this->tip_id_tip,
                'tip_nome' => $this->tip_nome,
          ];
         } else {
            $data =  [
               'tva_id_tva' => $this->tva_id_tva,
               'tva_valor' => $this->tva_valor,
               'tva_max_desconto' => $this->tva_max_desconto,
               'tva_version_atual' => $this->tva_version_atual,
               'tva_tratamento' => $this->tratamento,
               'tva_load' => false,
               'tva_created_at' => Carbon::parse($this->tva_created_at)->format('d/m/Y H:i:s'),
               'tva_updated_at' => $this->tva_updated_at != null ? Carbon::parse($this->tva_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
