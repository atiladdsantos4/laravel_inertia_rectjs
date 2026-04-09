<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class SectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if($request->has('listagem')){
            $data =  [
                'sec_id_sec' => $this->sec_id_sec,
                'sec_nome' => $this->sec_nome,
                'sec_id_emp' => $this->sec_id_emp,
                'sec_empresa' => $this->empresa->emp_nome,
                'sec_created_at' => Carbon::parse($this->sec_created_at)->format('d/m/Y H:i:s'),
                'sec_updated_at' => $this->sec_updated_at != null ? Carbon::parse($this->updated_at)->format('d/m/Y H:i:s') : null,
                'sec_itens'=> $this->itens,
                'sec_testemunhos' => $this->sec_id_sec == 6 ? $this->itens_testemunho: null,
            ];
      }  else if($request->has('init')){
          $data =  [
            'sec_id_sec' => $this->sec_id_sec,
            'sec_nome' => $this->sec_nome,
          ];
      }  else if($request->has('init_section')){
          $data =  [
            'sec_id_sec' => $this->sec_id_sec,
            'sec_nome' => $this->sec_nome,
            'sec_itens' => $this->itens,
          ];
      } else if($request->has('section_gallery')){
            $data =  [
                'sec_id_sec' => $this->sec_id_sec,
                'sec_nome' => $this->sec_nome,
                'sec_id_emp' => $this->sec_id_emp,
                'sec_empresa' => $this->empresa->emp_nome,
                'sec_created_at' => Carbon::parse($this->sec_created_at)->format('d/m/Y H:i:s'),
                'sec_updated_at' => $this->sec_updated_at != null ? Carbon::parse($this->updated_at)->format('d/m/Y H:i:s') : null,
                'sec_itens' => $this->itens,
                'sec_gallery' => $this->gallery_api_all,
            ];
        } else if($request->has('section_man')){
            $data =  [
                'sec_id_sec' => $this->sec_id_sec,
                'sec_nome' => $this->sec_nome,
                'sec_id_emp' => $this->sec_id_emp,
                'sec_empresa' => $this->empresa->emp_nome,
                'sec_created_at' => Carbon::parse($this->sec_created_at)->format('d/m/Y H:i:s'),
                'sec_updated_at' => $this->sec_updated_at != null ? Carbon::parse($this->updated_at)->format('d/m/Y H:i:s') : null,
                'sec_itens' => $this->itens,
                'sec_testemunhos' => $this->sec_id_sec == 6 ? $this->itens_testemunho: null,
                //$this->tratamentos->makeHidden('esp_especialidades'),
            ];
        } else {
             $data =  [
                'sec_id_sec' => $this->sec_id_sec,
                'sec_nome' => $this->sec_nome,
                'sec_id_emp' => $this->sec_id_emp,
                'sec_empresa' => $this->empresa->emp_nome,
                'sec_created_at' => Carbon::parse($this->sec_created_at)->format('d/m/Y H:i:s'),
                'sec_updated_at' => $this->sec_updated_at != null ? Carbon::parse($this->updated_at)->format('d/m/Y H:i:s') : null,
            ];
            /*$data =  [
                'sec_id_sec' => $this->sec_id_sec,
                'sec_nome' => $this->sec_nome,
                'sec_id_emp' => $this->sec_id_emp,
                'sec_empresa_logo' => $this->empresa->emp_logo,
                'sec_empresa' => $this->empresa->emp_nome,
                'sec_created_at' => Carbon::parse($this->sec_created_at)->format('d/m/Y H:i:s'),
                'sec_updated_at' => $this->sec_updated_at != null ? Carbon::parse($this->updated_at)->format('d/m/Y H:i:s') : null,
                'sec_itens' => $this->itens,
                'sec_doctors' => $this->doctors_api,
                'sec_gallery' => $this->gallery_api,
                'sec_hero' => $this->hero_api,
                'sec_testimonial' => $this->testimonial_api,
                //'deleted_at' => $this->deleted_at != null ? Carbon::parse($this->deleted_at)->format('d/m/Y H:i:s') : null,
                //'action' => null //--> para o datatbes não quebrar <--//
                //'deleted_at' => $this->updated_at->format('d/m/Y H:i:s')
            ];*/
        }
        return $data;
        //return parent::toArray($request);
    }
}
