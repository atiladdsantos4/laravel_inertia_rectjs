<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class TagCampoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
           $data =  [
                'tag_id_tag' => $this->tag_id_tag,
                'tag_nome' => $this->tag_nome,
                'tag_created_at' => Carbon::parse($this->tag_created_at)->format('d/m/Y H:i:s'),
                'tag_updated_at' => $this->tag_updated_at != null ? Carbon::parse($this->tag_updated_at)->format('d/m/Y H:i:s') : null,
           ];
         }  else if($request->has('init')){
          $data =  [ 
                'tag_id_tag' => $this->tag_id_tag,
                'tag_nome' => $this->tag_nome,
          ];
         } else {  
            $data =  [
                'tag_id_tag' => $this->tag_id_tag,
                'tag_nome' => $this->tag_nome,
                'tag_created_at' => Carbon::parse($this->tag_created_at)->format('d/m/Y H:i:s'),
                'tag_updated_at' => $this->tag_updated_at != null ? Carbon::parse($this->tag_updated_at)->format('d/m/Y H:i:s') : null,
            ];
        } 
        
        return $data;
    }
}

