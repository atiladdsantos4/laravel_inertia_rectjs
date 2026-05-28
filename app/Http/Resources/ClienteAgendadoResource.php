<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ClienteAgendadoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

       //'cla_id_cli','cla_id_hoa','cla_tipo_agenda','cla_created_at', 'cla_updated_at', 'cla_deleted_at'
       if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'cla_id_fer' => $this->cla_id_fer,
               'cla_descricao' => $this->cla_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'cla_id_cli' => $this->cla_id_cli,
                'cla_id_hoa' => $this->cla_id_hoa,
                'cla_tipo_agenda' => $this->cla_tipo_agenda,
                'cla_horario' => $this->horario->makeHidden(['dataini', 'datafim']),
                'cla_created_at' => Carbon::parse($this->cla_created_at)->format('d/m/Y H:i:s'),
                'cla_updated_at' => $this->cla_updated_at != null ? Carbon::parse($this->cla_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'cla_id_cli' => $this->cla_id_cli,
                'cla_id_hoa' => $this->cla_id_hoa,
                'cla_tipo_agenda' => $this->cla_tipo_agenda,
                'cla_horario' => $this->horario,
                'cla_created_at' => Carbon::parse($this->cla_created_at)->format('d/m/Y H:i:s'),
                'cla_updated_at' => $this->cla_updated_at != null ? Carbon::parse($this->cla_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
