<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Testemunhos extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'tes_testemunhos';
    protected $primaryKey = 'tes_id_tes';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
        'tes_nome','tes_profissao','tes_comentario','tes_sexo','tes_valor_rate','tes_created_at', 'tes_updated_at', 'tes_deleted_at'
    ];
    //tes_id_emp,tes_email,tes_tipo_empresa,tes_cnpj_cpf,tes_tipo_telefone,tes_telefone,tes_created_at,tes_updated_at,tes_deleted_at
    protected $dates = ['tes_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'tes_created_at';
    const UPDATED_AT  = 'tes_updated_at';
    const DELETED_AT  = 'tes_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'tes_created_at' => 'datetime:Y-m-d H:i:s',
        'tes_updated_at' => 'datetime:Y-m-d H:i:s',
        'tes_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected function getacaoAttribute(){ //--> qtde_escopos
        return 1;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->tes_created_at = date("Y-m-d H:i:s.u");
            $model->tes_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->tes_updated_at = date("Y-m-d H:i:s.u");
        });
        /*
        self::created(function($model){
            // ... code here
        });


        self::updated(function($model){
            // ... code here
        });

        self::deleting(function($model){
            // ... code here
        });

        self::deleted(function($model){
            // ... code here
        });
        */
    }
}
