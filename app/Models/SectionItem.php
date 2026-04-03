<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class SectionItem extends Model
{
    //protected $connection = 'pgsqlmedical';
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    const CREATED_AT = 'sei_created_at';
    const UPDATED_AT  = 'sei_updated_at';
    const DELETED_AT = 'sei_deleted_at';
    public $timestamps = true; //--> update automatically by laravel <--//
    protected $table = 'sei_section_item';
    protected $primaryKey = 'sei_id_sei';
    //protected $appends = ['acao'];
    protected $fillable = [
       'sei_nome','sei_valor','sei_json','sei_display','sei_link','sei_placeholder','sei_id_tip','sei_id_sec','sei_id_emp','sei_created_at','sei_id_tag','sei_updated_at','sei_deleted_at'
    ];
    protected $dates = ['sei_deleted_at'];//campo obrigatório pra o SoftDeletes

    //protected $dateFormat = 'U';

    protected $casts = [
        'sei_created_at' => 'datetime:Y-m-d H:i:s',
        'sei_updated_at' => 'datetime:Y-m-d H:i:s',
        'sei_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function empresa(){
        return $this->hasOne(Empresa::class, 'emp_id_emp', 'sei_id_emp');
    }

    public function tipo(){
        return $this->hasOne(TipoParametro::class, 'tip_id_tip', 'sei_id_tip');
    }

    public function tag(){
        return $this->hasOne(TagCampo::class, 'tag_id_tag', 'sei_id_tag');
    }

}
