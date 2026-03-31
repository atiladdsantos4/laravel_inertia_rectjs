<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TipoParametroResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =  [
                'tip_id_tip' => $this->tip_id_tip,
                'tip_nome' => $this->tip_nome,
                'tip_created_at' => Carbon::parse($this->tip_created_at)->format('d/m/Y H:i:s'),
                'tip_updated_at' => $this->tip_updated_at != null ? Carbon::parse($this->updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }  else if($request->has('init')){
          $data =  [ 
                'tip_id_tip' => $this->tip_id_tip,
                'tip_nome' => $this->tip_nome,
          ];
         } else {  
            $data =  [
                'tip_id_tip' => $this->tip_id_tip,
                'tip_nome' => $this->tip_nome,
                'tip_created_at' => Carbon::parse($this->tip_created_at)->format('d/m/Y H:i:s'),
                'tip_updated_at' => $this->tip_updated_at != null ? Carbon::parse($this->updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }
        
         return $data;
    }
}
