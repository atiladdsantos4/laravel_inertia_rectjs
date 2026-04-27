<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class FeriadosResource extends JsonResource
{
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
               'fer_id_fer' => $this->fer_id_fer,
               'fer_descricao' => $this->fer_titulo
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
