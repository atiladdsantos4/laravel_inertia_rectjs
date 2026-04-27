<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Feriados extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'fer_feriados';
    protected $primaryKey = 'fer_id_fer';
    //protected $appends = ['acao','pla_planosaude','fer_planosaude'];
    protected $fillable = [
        'fer_descricao', 'fer_dia', 'fer_mes', 'fer_ano', 'fer_data', 'fer_ativo', 'fer_created_at', 'fer_updated_at', 'fer_deleted_at'
    ];
    protected $dates = ['fer_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'fer_created_at';
    const UPDATED_AT  = 'fer_updated_at';
    const DELETED_AT  = 'fer_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'fer_created_at' => 'datetime:Y-m-d H:i:s',
        'fer_updated_at' => 'datetime:Y-m-d H:i:s',
        'fer_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    /*
    protected function getPacPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->fer_id_pla) ){
          $esp = PlanoSaude::find($this->fer_id_pla);
          return $esp->pla_nome;
       }
    }

    protected function getPlaPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->fer_id_pla) ){
          $esp = PlanoSaude::select('pla_id_pla','pla_nome')->orderBy('pla_nome','asc')->get();
          return $esp;
       }
    }

    public function planosaude()
    {
        return $this->hasOne(PlanoSaude::class, 'pla_id_pla', 'fer_id_pla');
    }

    protected function getacaoAttribute(){ //--> qtde_escopos
        return 1;
    }
    */

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->fer_created_at = date("Y-m-d H:i:s.u");
            $model->fer_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->fer_updated_at = date("Y-m-d H:i:s.u");
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
