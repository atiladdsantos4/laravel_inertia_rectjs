<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\SectionItem;
use App\Models\Empresa;
use App\Http\Resources\SectionItemResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class SectionItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $section = SectionItem::all();
           $result_section = SectionItemResource::collection($section); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Section Item',
                'data'    => [
                   'sections'=>$result_section,
                ]
            ];

            return response()->json($response, 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = $request->all();
        if( ($input["sei_id_sec"] == 8 ) && ( $input["sei_nome"] == 'lista-post') ){
            $postjson = json_decode($input["sei_valor"], true);
            $arrayimg = [];
            $arrayimglink = [];

            for($i = 0;$i < count($postjson["listapost"]); $i++){
                array_push($arrayimg,$postjson["listapost"][$i]["imagem"]);
                array_push($arrayimglink,$postjson["listapost"][$i]["imglink"]);
            }

            $ok = false;
            for($i=0; $i < count($request->file('files')); $i++ ){
                $file = $request->file('files')[$i];
                $fileName  = $file->getClientOriginalName();
                $link = $this->procuraFile($arrayimg, $arrayimglink, $fileName);
                $path = 'images/'.$link;
                //Adiciona a nova imagem e atualiza o conteudo
                Storage::disk('public')->put($path, file_get_contents($file));
                $ok = true;
            }

            if($ok){
               $sectionitem = SectionItem::create($input);
               $secitem = new SectionItemResource(SectionItem::findOrFail($sectionitem->sei_id_sei));
               $arr_result = [
                   "status" => true,
                   "mensagem" => "Section Inserido com sucesso!!!",
                   "data" => $secitem
               ];

               return json_encode($arr_result,JSON_PRETTY_PRINT);
            }

        }

        if( ($input["sei_id_sec"] == 8 ) && ( $input["sei_nome"] == 'lista-cardimg') ){
            $postjson = json_decode($input["sei_valor"], true);
            $arrayimg = [];
            $arrayimglink = [];
            $arrayimgavatar = [];
            $arrayimgavatarlink = [];
            $vetor = $postjson;
            for($i = 0;$i < count($vetor["listacardimg"]); $i++){
                    //array_push($arraypost,$postjson["listateam"][$i]["imagem"]);
                array_push($arrayimg,$vetor["listacardimg"][$i]["imagem"]);
                array_push($arrayimglink,$vetor["listacardimg"][$i]["imglink"]);
                array_push($arrayimgavatar,$vetor["listacardimg"][$i]["imagemavatar"]);
                array_push($arrayimgavatarlink,$vetor["listacardimg"][$i]["imgavatarlink"]);
            }
            $ok = false;
            for($i=0; $i < count($request->file('files')); $i++ ){
                $file = $request->file('files')[$i];
                $fileName  = $file->getClientOriginalName();
                $link = $this->procuraFile($arrayimg, $arrayimglink, $fileName);
                if( $link != null ){
                   $path = 'images/'.$link;
                } else {
                   $link = $this->procuraFile($arrayimgavatar, $arrayimgavatarlink, $fileName);
                }
                $path = 'images/'.$link;
                //Adiciona a nova imagem e atualiza o conteudo
                Storage::disk('public')->put($path, file_get_contents($file));
                $ok = true;
            }

            if($ok){
               $sectionitem = SectionItem::create($input);
               $secitem = new SectionItemResource(SectionItem::findOrFail($sectionitem->sei_id_sei));
                $arr_result = [
                    "status" => true,
                    "mensagem" => "Section Inserido com sucesso!!!",
                    "data" => $secitem
                ];

                return json_encode($arr_result,JSON_PRETTY_PRINT);
            }
        }



        $validator = Validator::make($input, [
           'sei_nome' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }


        if( $request->has('has_image') ) {
           if( $request->has('has_multiple') ){//multiples images
              for($i=0; $i < count($request->file('files')); $i++ ){
                  $file = $request->file('files')[$i];
                  $fileName  = $file->getClientOriginalName();
                  $path = 'images/'.$input["sei_link"].$fileName;
                  //Adiciona a nova imagem e atualiza o conteudo
                  Storage::disk('public')->put($path, file_get_contents($file));
              }
           } else {
              //$file = $request->file('file');
              $file = $request->file('file');
              $fileName  = $file->getClientOriginalName();
              $path = 'about/'.$fileName;
              //Adiciona a nova imagem e atualiza o conteudo
              Storage::disk('inertia_public')->put($path, file_get_contents($file));
           }
        }

        // if( $request->has('has_image') ) {
        //     $file = $request->file('file');
        //     $fileName  = $file->getClientOriginalName();
        //     $path = 'images/'.$input["sei_link"];
        //     //Adiciona a nova imagem e atualiza o conteudo
        //     Storage::disk('public')->put($path, file_get_contents($file));
        //  }

        $sectionitem = SectionItem::create($input);
        $secitem = new SectionItemResource(SectionItem::findOrFail($sectionitem->sei_id_sei));


        $arr_result = [
            "status" => true,
            "mensagem" => "Section Item Inserido com sucesso!!!",
            "data" => $secitem
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
       $secitem = new SectionItemResource(SectionItem::findOrFail($id));
       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Section Item !!!",
            "data" => $secitem
        ];
        return json_encode($arr_result,JSON_PRETTY_PRINT);
       //$input = $request->all();

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $input = $request->all();
        $sectionitem = SectionItem::find($id);
        //nova rotina//
        //simple imagens//
        if( $request->has('has_image') ){

           //delete old image//
           $postjson = json_decode($input["sei_json"], true);
           $path_delete = $postjson["meta"][0]["path"].$sectionitem->sei_valor;
           Storage::disk('inertia_public')->delete($path_delete);

           //add new image//
            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = $postjson["meta"][0]["path"].$input["sei_valor"];
            Storage::disk('inertia_public')->put($path, file_get_contents($file));
        }

        $validator = Validator::make($input, [
           'sei_nome' => 'required',
           'sei_valor' => 'required',
           'sei_display' => 'required',
           'sei_id_tip' => 'required',
           'sei_id_tag' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $sectionitem->sei_nome = $input["sei_nome"];
        $sectionitem->sei_valor = $input["sei_valor"];
        $sectionitem->sei_json = $input["sei_json"];
        $sectionitem->sei_placeholder = $input["sei_placeholder"];
        $sectionitem->sei_display = $input["sei_display"];
        $sectionitem->sei_id_tip = $input["sei_id_tip"];
        $sectionitem->sei_id_tag = $input["sei_id_tag"];
        $sectionitem->update();
        $secitem = new SectionItemResource(SectionItem::findOrFail($sectionitem->sei_id_sei));

        $arr_result = [
            "status" => true,
            "mensagem" => "Section Item Alterado com sucesso!!!",
            "data" => $secitem
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
        //fim nova rotina//

        /*
         teste --> remocao pra multifiles
        */

        if( ($input["sei_id_sec"] == 8 ) && ( $input["sei_nome"] == 'lista-cardimg') ){
            $postjson = json_decode($input["sei_valor"], true);
            //--> Eliminado imagens atualizadas <--//
            $updjson = json_decode($sectionitem->sei_valor, true);

            //post
            $arrayimg = [];
            $arrayimglink = [];
            $arrayimgavatar = [];
            $arrayimgavatarlink = [];

            //update
            $arrayupdimg = [];
            $arrayupdimgavatar = [];

            $vetor = $postjson;
            for($i = 0;$i < count($vetor["listacardimg"]); $i++){
                //update
                array_push($arrayupdimg,$updjson["listacardimg"][$i]["imagem"]);
                array_push($arrayupdimgavatar,$updjson["listacardimg"][$i]["imagemavatar"]);
                //post
                array_push($arrayimg,$vetor["listacardimg"][$i]["imagem"]);
                array_push($arrayimglink,$vetor["listacardimg"][$i]["imglink"]);
                array_push($arrayimgavatar,$vetor["listacardimg"][$i]["imagemavatar"]);
                array_push($arrayimgavatarlink,$vetor["listacardimg"][$i]["imgavatarlink"]);
            }
            $link = $sectionitem->sei_link.'card/';
            $lista = 'listacardimg';
            $this->retornaFileToRemove($arrayimg, $arrayupdimg, $link, $lista);
            $link = $sectionitem->sei_link.'avatar/';
            $this->retornaFileToRemove($arrayimgavatar, $arrayupdimgavatar, $link, $lista);
            //$this->retornaFileToRemove($postjson, $updjson, $sectionitem->sei_link);

            // $arr_result = [
            //     "status" => true,
            //     "mensagem" => "Section Item Alterado com sucesso!!!",
            // ];

            // return json_encode($arr_result,JSON_PRETTY_PRINT);

            $ok = false;
            for($i=0; $i < count($request->file('files')); $i++ ){
                $file = $request->file('files')[$i];
                $fileName  = $file->getClientOriginalName();
                $link = $this->procuraFile($arrayimg, $arrayimglink, $fileName);
                if( $link != null ){
                   $path = 'images/'.$link;
                } else {
                   $link = $this->procuraFile($arrayimgavatar, $arrayimgavatarlink, $fileName);
                }
                $path = 'images/'.$link;
                //Adiciona a nova imagem e atualiza o conteudo
                Storage::disk('public')->put($path, file_get_contents($file));
                $ok = true;
            }

            if($ok){

                $sectionitem->sei_nome = $input["sei_nome"];
                $sectionitem->sei_valor = $input["sei_valor"];
                $sectionitem->sei_display = $input["sei_display"];
                $sectionitem->sei_id_tip = $input["sei_id_tip"];
                $sectionitem->sei_id_tag = $input["sei_id_tag"];
                $sectionitem->update();
                $sectionitem = SectionItem::create($input);
                $secitem = new SectionItemResource(SectionItem::findOrFail($sectionitem->sei_id_sei));
                $arr_result = [
                    "status" => true,
                    "mensagem" => "Section Inserido com sucesso!!!",
                    "data" => $secitem
                ];

                return json_encode($arr_result,JSON_PRETTY_PRINT);
            }
        }

        $validator = Validator::make($input, [
           'sei_nome' => 'required',
           'sei_valor' => 'required',
           'sei_display' => 'required',
           'sei_id_tip' => 'required',
           'sei_id_tag' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }





        if( isset($input["sei_link"]) ){

          //altera a imagem da section
          if( $request->has('has_image') && $request->has('has_multiple') ) {

            $upd = json_decode($sectionitem->sei_valor, true);
            $postjson = json_decode($input["sei_valor"], true);
            switch($input["sei_nome"]){

               case 'lista-team':
                 $vetor = $postjson["listateam"];
                 $updvetor = $upd["listateam"];
                 break;

               case 'lista-card-img':
                 $vetor = $postjson["listacardimg"];
                 $updvetor = $upd["listacardimg"];
                 break;

               case 'lista-images':
                 $vetor = $postjson["listaimages"];
                 $updvetor = $upd["listaimages"];
                 break;

               case 'lista-slide':
                 $vetor = $postjson["listaslide"];
                 $updvetor = $upd["listaslide"];
                 break;

               case 'lista-recr':
                 $vetor = $postjson["listarecr"];
                 $updvetor = $upd["listarecr"];
                 break;

               case 'lista-cardmain':
                 $vetor = $postjson["listacardmain"];
                 $updvetor = $upd["listacardmain"];
                 break;

               case 'lista-post':
                 $vetor = $postjson["listapost"];
                 $updvetor = $upd["listapost"];
                 break;
            }
            $postjson =  $vetor;
            $updjson = $updvetor;
            $this->retornaFileToRemove($postjson, $updjson, $sectionitem->sei_link,null);

            //new images are added into storage link path//
            for($i=0; $i < count($request->file('files')); $i++ ){
                 $file = $request->file('files')[$i];
                 $fileName  = $file->getClientOriginalName();
                 $link = $this->procuraLink($postjson,$fileName);
                 $path = 'images/'.$link;
                 //A new image is addd and updates its contents
                 Storage::disk('public')->put($path, file_get_contents($file));
            }
        } else if( $request->has('has_image') ) {
            //teste aws//

            //--> armazena a imagem no bucket com o mnome orginal <--//
            // $file = $request->file('file');
            // $originalName = $file->getClientOriginalName();
            // $directory = 'college';
            // $path = Storage::disk('s3')->putFileAs(
            //    $directory,
            //    $file,
            //    $originalName
            // );

            //funciona
            //--> funciona $path = Storage::disk('s3')->put('college/', $request->file('file'));
            //--> endpoint aws --> https://jemo-spend-budget.s3.sa-east-1.amazonaws.com/college/activities-1.webp //

            // $arr_result = [
            //     "status" => true,
            //     "mensagem" => "File uploaded successfully to AWS S3 at path",
            //     "data" => $path
            // ];

            //return json_encode($arr_result,JSON_PRETTY_PRINT);


            //teste aws//

             //deleta a imagem antiga
              $path_delete = 'images/'.$sectionitem->sei_link;
              Storage::disk('public')->delete($path_delete);

              //Adiciona a nova imagem e atualiza o conteudo
              $file = $request->file('file');
              $fileName  = $file->getClientOriginalName();
              $path = 'images/'.$input["sei_link"];
              Storage::disk('public')->put($path, file_get_contents($file));
        }
          //Atualiza o novo path da imagem
          $sectionitem->sei_link = $input["sei_link"];
        }
        $sectionitem->sei_nome = $input["sei_nome"];
        $sectionitem->sei_valor = $input["sei_valor"];
        $sectionitem->sei_json = $input["sei_json"];
        $sectionitem->sei_placeholder = $input["sei_placeholder"];
        $sectionitem->sei_display = $input["sei_display"];
        $sectionitem->sei_id_tip = $input["sei_id_tip"];
        $sectionitem->sei_id_tag = $input["sei_id_tag"];
        $sectionitem->update();
        $secitem = new SectionItemResource(SectionItem::findOrFail($sectionitem->sei_id_sei));

        $arr_result = [
            "status" => true,
            "mensagem" => "Section Item Alterado com sucesso!!!",
            "data" => $secitem
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

    }

    public function getItem(string $id)
    {

    }

    //array busca contens all post elements with flag is "imgsaved  = false"
    public function procuraLink($arraybusca, $chave)
    {
    //    function isSaved($var){
    //        return $var["imgsaved"] == false;
    //    }

    //    $arraycompare = array_filter($arraybusca,"isSaved");

       for($i = 0;$i < count($arraybusca); $i++){
           if(  strpos($arraybusca[$i]["imglink"],$chave) > 0 && $arraybusca[$i]["imgsaved"] == false){
              return $arraybusca[$i]["imglink"];
           }
       }
    }

    public function procuraFile($arrayimg, $arraylink, $chave)
    {
      for($i = 0;$i < count($arrayimg); $i++){
           if(  $arrayimg[$i] == $chave ){
               return $arraylink[$i];
           }
      }
      return null;
    }

    public function retornaFileToRemove($arraypost, $arrayupdate, $pathlink,$lista  = null)
    {
       //building arrays for check equivalence//
       //tga image must exist the be used and compare
       //the equivalence is made by image link since the images has not a especific id
       $vetor_post =[];
       $vetor_upd =[];
       $array_remove = [];
       for( $i = 0 ; $i < count($arraypost); $i++ ){
          array_push($vetor_post,$arraypost[$i]["imglink"]);
       }

       //since the post array of image's link could have less lenght than the updated one
       //each array must be filled separetelly
       for( $i = 0 ; $i < count($arrayupdate); $i++ ){
          array_push($vetor_upd,$arrayupdate[$i]["imglink"]);
       }

       //exclusion flga starts false
       $tem_exclusao = false;
       for($i = 0;$i < count($vetor_upd); $i++){
            if( in_array($vetor_upd[$i], $vetor_post) ){
               continue;
            } else {
                //not in array
                array_push($array_remove,$vetor_upd[$i]);
            }
       }

       //if exclusion flags is true finally emve imagem from storage link
       if($tem_exclusao){
          for($i = 0;$i < count($array_remove); $i++){
              $path_delete = 'images/'.$array_remove[$i];
              Storage::disk('public')->delete($path_delete);
           }
       }

       /*

       $array_remove = [];
       $tem_exclusao = false;
       for($i = 0;$i < count($arrayupdate); $i++){
             if( in_array($arrayupdate[$i], $arraypost) ){
                continue;
             } else {
                if( $lista == 'listacardimg'){
                   array_push($array_remove,$arrayupdate[$i]);
                } else {
                   array_push($array_remove,$arrayupdate[$i]["imagem"]);
                }
                $tem_exclusao = true;
             }
        }

        if( $tem_exclusao ){
            if( $lista == 'listacardimg'){
                 for($i = 0;$i < count($array_remove); $i++){
                    $path_delete = 'images/'.$pathlink.$array_remove[$i];
                    Storage::disk('public')->delete($path_delete);
                 }
            } else {
                for($i = 0;$i < count($array_remove); $i++){
                    $path_delete = 'images/'.$pathlink.$array_remove[$i];
                    Storage::disk('public')->delete($path_delete);
                 }
            }
        }
            */
    }
}
