<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ProfissionalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

       ////pro_id_pro,pro_nome,pro_apelido,pro_tipo,pro_cpf_cnpj,pro_path_image,pro_ativo,pro_created_at,pro_updated_at,pro_deleted_at
       if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'pro_id_fer' => $this->pro_id_fer,
               'pro_descricao' => $this->pro_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'pro_id_pro' => $this->pro_id_pro,
                'pro_nome' => $this->pro_nome,
                'pro_apelido' => $this->pro_apelido,
                'pro_tipo' => $this->pro_tipo,
                'pro_cpf_cnpj' => $this->pro_cpf_cnpj,
                'pro_path_image' => $this->pro_path_image,
                'pro_ativo' => $this->pro_ativo,
                'pro_tratamentos' => $this->tratamentos,
                'pro_load' => false,
                'pro_created_at' => Carbon::parse($this->pro_created_at)->format('d/m/Y H:i:s'),
                'pro_updated_at' => $this->pro_updated_at != null ? Carbon::parse($this->pro_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'pro_id_pro' => $this->pro_id_pro,
                'pro_nome' => $this->pro_nome,
                'pro_apelido' => $this->pro_apelido,
                'pro_tipo' => $this->pro_tipo,
                'pro_cpf_cnpj' => $this->pro_cpf_cnpj,
                'pro_path_image' => $this->pro_path_image,
                'pro_ativo' => $this->pro_ativo,
                'pro_load' => false,
                'pro_created_at' => Carbon::parse($this->pro_created_at)->format('d/m/Y H:i:s'),
                'pro_updated_at' => $this->pro_updated_at != null ? Carbon::parse($this->pro_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

        return $data;
    }
}
