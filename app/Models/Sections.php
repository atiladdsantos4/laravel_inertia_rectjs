<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Sections extends Model
{
    //protected $connection = 'pgsqlmedical';
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
  
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    const CREATED_AT = 'sec_created_at';
    const UPDATED_AT  = 'sec_updated_at';
    const DELETED_AT = 'sec_deleted_at';
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'sec_sections';
    protected $primaryKey = 'sec_id_sec';
    //protected $appends = ['acao'];
    protected $fillable = [
        'sec_nome','sec_emp','sec_id_emp','sec_created_at','sec_updated_at','sec_deleted_at'
    ];
    protected $dates = ['sec_deleted_at'];//campo obrigatório pra o SoftDeletes
    
    //protected $dateFormat = 'U';

    protected $casts = [
        'sec_created_at' => 'datetime:Y-m-d H:i:s',
        'sec_updated_at' => 'datetime:Y-m-d H:i:s',
        'sec_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];
    
    public function empresa(){
        return $this->hasOne(Empresa::class, 'emp_id_emp', 'sec_id_emp');
    }

    
    public function itens(){
       return $this->hasMany(SectionItem::class, 'sei_id_sec', 'sec_id_sec')
       ->select('sei_id_sei','sei_nome','sei_valor','sei_display','sei_link','tip_nome as sei_tipo','sei_id_tip','sei_id_sec','sei_id_emp','sei_id_tag','tag_nome as sei_tag')
       ->join('tipo_parametro','sei_id_tip','tip_id_tip')
       ->join('tag_campo','sei_id_tag','tag_id_tag')
       ->orderBy('sei_id_sei');
    }
    /*
    public function doctors(){
        return $this->hasMany(Doctors::class, 'doc_id_sec', 'sec_id_sec');
    }

    public function doctors_api(){
        return $this->hasMany(Doctors::class, 'doc_id_sec', 'sec_id_sec')
        ->select('doc_id_doc','doc_name','doc_position','doc_img','doc_display','esp_titulo as especilidade','doc_id_esp')
        ->join('esp_especialidade','doc_id_esp','=','esp_id_esp')
        ->where('doc_display',true);
    }

    public function doctors_api_all(){
        return $this->hasMany(Doctors::class, 'doc_id_sec', 'sec_id_sec')
        ->select('doc_id_doc','doc_name','doc_position','doc_img','doc_display','esp_titulo as especilidade','doc_id_esp')
        ->join('esp_especialidade','doc_id_esp','=','esp_id_esp');
    }

    public function gallery_api(){
        return $this->hasMany(Gallery::class, 'gal_id_sec', 'sec_id_sec')
        ->select('gal_id_gal','gal_name','gal_img','gal_descritivo','gal_position','gal_id_sec','gal_display','gal_texto')
        ->where('gal_display',true);
    }

    public function gallery_api_all(){
        return $this->hasMany(Gallery::class, 'gal_id_sec', 'sec_id_sec')
        ->select('gal_id_gal','gal_name','gal_img','gal_descritivo','gal_position','gal_id_sec','gal_display','gal_texto');
    }

    public function hero_api(){
        return $this->hasMany(Hero::class, 'her_id_sec', 'sec_id_sec')
        ->select('her_id_her','her_titulo','her_texto','her_button','her_img','her_img_path','her_display')
        ->where('her_display',true);
        //'her_id_her','her_titulo','her_texto','her_button','her_img','her_img_path','her_id_sec','her_display','her_dat_created','her_dat_updated','her_dat_deleted'
    }

    public function hero_api_all(){
        return $this->hasMany(Hero::class, 'her_id_sec', 'sec_id_sec')
        ->select('her_id_her','her_titulo','her_texto','her_button','her_img','her_img_path','her_display');
    }

    public function testimonial_api(){
        return $this->hasMany(Testemonial::class, 'tes_id_sec', 'sec_id_sec')
        ->select('tes_id_tes','tes_name','tes_position','tes_texto','tes_img','tes_img_path','tes_display','tes_rate')
        ->where('tes_display',true);
        //'her_id_her','her_titulo','her_texto','her_button','her_img','her_img_path','her_id_sec','her_display','her_dat_created','her_dat_updated','her_dat_deleted'
    }

    public function testimonial_api_all(){
        return $this->hasMany(Testemonial::class, 'tes_id_sec', 'sec_id_sec')
        ->select('tes_id_tes','tes_name','tes_position','tes_texto','tes_img','tes_img_path','tes_display','tes_rate');
    }
    */
}
