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
           $data =  [
                'pac_id_pac' => $this->pac_id_pac,
                'pac_nome' => $this->pac_nome,
                'pac_ativo' => $this->pac_ativo,
                'pac_display' => $this->pac_display,
                'pac_desconto' => $this->pac_desconto,
                'pac_valor' => $this->pac_valor,
                'pac_valor_final' => $this->pac_valor_final,
                'pac_itens'=> $this->itens,
                'pac_created_at' => Carbon::parse($this->pac_created_at)->format('d/m/Y H:i:s'),
                'pac_updated_at' => $this->pac_updated_at != null ? Carbon::parse($this->pac_updated_at)->format('d/m/Y H:i:s') : null,
           ];
         }  else if($request->has('init')){
          $data =  [
                'pac_id_tag' => $this->pac_id_tag,
                'pac_nome' => $this->pac_nome,
          ];
         } else {
            $data =  [
                'pac_id_pac' => $this->pac_id_pac,
                'pac_nome' => $this->pac_nome,
                'pac_ativo' => $this->pac_ativo,
                'pac_display' => $this->pac_display,
                'pac_desconto' => $this->pac_desconto,
                'pac_valor' => $this->pac_valor,
                'pac_valor_final' => $this->pac_valor_final,
                'pac_itens'=> $this->itens,
                'pac_created_at' => Carbon::parse($this->pac_created_at)->format('d/m/Y H:i:s'),
                'pac_updated_at' => $this->pac_updated_at != null ? Carbon::parse($this->pac_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

        return $data;
    }
}

