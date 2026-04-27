<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ProTratamentoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {   //'prt_id_tra', 'prt_id_pro', 'prt_tempo_experiencia', 'prt_ativo','prt_created_at', 'prt_updated_at'
        if( $request->has('listagem') ){
           $data =  [
                'prt_id_prt' => $this->prt_id_prt,
                'prt_id_tra' => $this->prt_id_tra,
                'prt_id_pro' => $this->prt_id_pro,
                'prt_tempo_experiencia' => $this->prt_tempo_experiencia,
                'prt_tratamento' => $this->tratamento,
                'prt_profissional' => $this->profissional,
                'prt_created_at' => Carbon::parse($this->prt_created_at)->format('d/m/Y H:i:s'),
                'prt_updated_at' => $this->prt_updated_at != null ? Carbon::parse($this->prt_updated_at)->format('d/m/Y H:i:s') : null,
           ];
         }  else if($request->has('filtro')){
          $data =  [
                'prt_id_prt' => $this->prt_id_prt,
                'prt_id_tra' => $this->prt_id_tra,
                'prt_id_pro' => $this->prt_id_pro,
                'prt_profissional' => $this->profissional->pro_nome
          ];
         } else {
            $data =  [
                'prt_id_prt' => $this->prt_id_prt,
                'prt_id_tra' => $this->prt_id_tra,
                'prt_id_pro' => $this->prt_id_pro,
                'prt_tempo_experiencia' => $this->prt_tempo_experiencia,
                'prt_created_at' => Carbon::parse($this->prt_created_at)->format('d/m/Y H:i:s'),
                'prt_updated_at' => $this->prt_updated_at != null ? Carbon::parse($this->prt_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

        return $data;
    }
}

