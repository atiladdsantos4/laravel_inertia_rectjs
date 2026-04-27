<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class PacoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     * ////pac_id_pac,pac_ativo,pac_display,pac_desconto,pac_valor,pac_created_at,pac_updated_at,pac_deleted_at
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            //pai_id_pai,pai_display,pai_id_pac,pai_id_tra,pai_qtde,pai_desconto,pai_valor,pai_created_at,pai_updated_at,pai_deleted_at
           $data =  [
                'pai_id_pai' => $this->pai_id_pai,
                'pai_display' => $this->pai_display,
                'pai_id_pac' => $this->pai_id_pac,
                'pai_id_tra' => $this->pai_id_tra,
                'pai_qtde' => $this->pai_qtde,
                'pai_desconto' => $this->pai_desconto,
                'pai_valor' => $this->pai_valor,
                'pai_tratamento'=>$this->tratamento,
                'pai_created_at' => Carbon::parse($this->pai_created_at)->format('d/m/Y H:i:s'),
                'pai_updated_at' => $this->pai_updated_at != null ? Carbon::parse($this->pai_updated_at)->format('d/m/Y H:i:s') : null,
           ];
         }  else if($request->has('init')){
          $data =  [
                'pac_id_tag' => $this->pac_id_tag,
                'pac_nome' => $this->pac_nome,
          ];
         } else {
            $data =  [
                'pai_id_pai' => $this->pai_id_pai,
                'pai_display' => $this->pai_display,
                'pai_id_pac' => $this->pai_id_pac,
                'pai_id_tra' => $this->pai_id_tra,
                'pai_qtde' => $this->pai_qtde,
                'pai_desconto' => $this->pai_desconto,
                'pai_valor' => $this->pai_valor,
                //'pai_tratamento'=>$this->tratamento,
                'pai_created_at' => Carbon::parse($this->pai_created_at)->format('d/m/Y H:i:s'),
                'pai_updated_at' => $this->pai_updated_at != null ? Carbon::parse($this->pai_updated_at)->format('d/m/Y H:i:s') : null,
           ];
        }

        return $data;
    }
}

