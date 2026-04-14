<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

       //ser_id_ser,ser_titulo,ser_texto,ser_display,ser_created_at,ser_updated_at,ser_deleted_at
       if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'ser_id_ser' => $this->ser_id_ser,
               'ser_titulo' => $this->ser_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'ser_id_ser' => $this->ser_id_ser,
                'ser_titulo' => $this->ser_titulo,
                'ser_texto' => $this->ser_texto,
                'ser_display' => $this->ser_display,
                'ser_load' => false,
                'ser_created_at' => Carbon::parse($this->ser_created_at)->format('d/m/Y H:i:s'),
                'ser_updated_at' => $this->ser_updated_at != null ? Carbon::parse($this->ser_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
               'ser_id_ser' => $this->ser_id_ser,
               'ser_titulo' => $this->ser_titulo,
               'ser_texto' => $this->ser_texto,
               'ser_display' => $this->ser_display,
               'ser_load' => false,
               'ser_created_at' => Carbon::parse($this->ser_created_at)->format('d/m/Y H:i:s'),
               'ser_updated_at' => $this->ser_updated_at != null ? Carbon::parse($this->ser_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
