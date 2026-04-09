<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class TestemunhoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            //'tes_nome','tes_profissao','tes_comentario','tes_valor_rate','tes_created_at', 'tes_updated_at', 'tes_deleted_at'
           $data =  [
                'tes_id_tes' => $this->tes_id_tes,
                'tes_nome' => $this->tes_nome,
                'tes_email'  => $this->tes_email,
                'tes_sexo' => $this->tes_sexo,
                'tes_profissao' => $this->tes_profissao,
                'tes_comentario' => $this->tes_comentario,
                'tes_valor_rate' => $this->tes_valor_rate,
                'tes_id_sec' => $this->tes_id_sec,
                'tes_exibir' => $this->tes_exibir,
                'tes_load' => false,
                'tes_created_at' => Carbon::parse($this->tes_created_at)->format('d/m/Y H:i:s'),
                'tes_updated_at' => $this->tes_updated_at != null ? Carbon::parse($this->tes_updated_at)->format('d/m/Y H:i:s') : null,
           ];
        } else {
           $data =  [
                'tes_id_tes' => $this->tes_id_tes,
                'tes_nome' => $this->tes_nome,
                'tes_email'  => $this->tes_email,
                'tes_sexo' => $this->tes_sexo,
                'tes_profissao' => $this->tes_profissao,
                'tes_comentario' => $this->tes_comentario,
                'tes_valor_rate' => $this->tes_valor_rate,
                'tes_id_sec' => $this->tes_id_sec,
                'tes_exibir' => $this->tes_exibir,
                'tes_load' => false,
                'tes_created_at' => Carbon::parse($this->tes_created_at)->format('d/m/Y H:i:s'),
                'tes_updated_at' => $this->tes_updated_at != null ? Carbon::parse($this->tes_updated_at)->format('d/m/Y H:i:s') : null,
           ];
        }

        return $data;
    }
}

