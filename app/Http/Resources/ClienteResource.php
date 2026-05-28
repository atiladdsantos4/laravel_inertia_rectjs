<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ClienteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

       ////cli_id_cli,cli_name,cli_cpf,cli_email,cli_tipo_telefone,cli_telefone,cli_ativo,cli_created_at,cli_updated_at,cli_deleted_at
       if( $request->has('listagem') && $request->has('init') ){
            $data =  [
               'cli_id_fer' => $this->cli_id_fer,
               'cli_descricao' => $this->cli_titulo
            ];
        }  else if( $request->has('listagem') ){
            $data =  [
                'cli_id_cli' => $this->cli_id_cli,
                'cli_name' => $this->cli_name,
                'cli_cpf' => $this->cli_cpf,
                'cli_email' => $this->cli_email,
                'cli_tipo_telefone' => $this->cli_tipo_telefone,
                'cli_telefone' => $this->cli_telefone,
                'cli_ativo' => $this->cli_ativo,
                'cli_agendamentos' => $this->agendamentos,
                'cli_load' => false,
                'cli_created_at' => Carbon::parse($this->cli_created_at)->format('d/m/Y H:i:s'),
                'cli_updated_at' => $this->cli_updated_at != null ? Carbon::parse($this->cli_updated_at)->format('d/m/Y H:i:s') : null,
            ];

         } else {
            $data =  [
                'cli_id_cli' => $this->cli_id_cli,
                'cli_name' => $this->cli_name,
                'cli_cpf' => $this->cli_cpf,
                'cli_email' => $this->cli_email,
                'cli_tipo_telefone' => $this->cli_tipo_telefone,
                'cli_telefone' => $this->cli_telefone,
                'cli_ativo' => $this->cli_ativo,
                'cli_agendamentos' => $this->agendamentos,//->makeHidden(['dataini', 'datafim']),
                'cli_load' => false,
                'cli_created_at' => Carbon::parse($this->cli_created_at)->format('d/m/Y H:i:s'),
                'cli_updated_at' => $this->cli_updated_at != null ? Carbon::parse($this->cli_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        }

         return $data;
    }
}
