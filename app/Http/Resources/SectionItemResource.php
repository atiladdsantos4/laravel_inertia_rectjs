<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use \Carbon\Carbon;

class SectionItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string=>$this->sei_id_sei, mixed>
     */
    public function toArray(Request $request): array
    {
        $data =[
           'sei_id_sei' =>$this->sei_id_sei,
           'sei_nome' =>$this->sei_nome,
           'sei_valor' =>$this->sei_valor,
           'sei_display' =>$this->sei_display,
           'sei_link' =>$this->sei_link,
           'sei_tipo' =>$this->sei_tipo,
           'sei_id_sec' =>$this->sei_id_sec,
           'sei_id_emp' =>$this->sei_id_emp,
           'sei_created_at'=>Carbon::parse($this->sei_created_at)->format('d/m/Y H:i:s'),
           'sei_updated_at'=>$this->sei_updated_at != null ? Carbon::parse($this->sei_updated_at)->format('d/m/Y H:i:s') : null,
           'sei_deleted_at'=>$this->sei_deleted_at,
        ];
        
        return $data;
        //return parent::toArray($request);
    }
}
