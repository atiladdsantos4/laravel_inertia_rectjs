<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class DataAgenda extends Model
{
    //dat_id_dat,dat_data,dat_ano,dat_mes,dat_dia,dat_diasemana,dat_diaextenso,dat_hora,dat_minuto,dat_horainicial,dat_horafinal,dat_created_at,dat_updated_at,dat_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'dat_data_agenda';
    protected $primaryKey = 'dat_id_dat';
    //protected $appends = ['acao','pla_planosaude','dat_planosaude'];
    protected $fillable = [
        'dat_data','dat_ano','dat_mes','dat_dia','dat_diasemana','dat_diaextenso','dat_hora','dat_minuto','dat_horainicial','dat_horafinal,dat_created_at','dat_updated_at'
    ];
    protected $dates = ['dat_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'dat_created_at';
    const UPDATED_AT  = 'dat_updated_at';
    const DELETED_AT  = 'dat_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'dat_created_at' => 'datetime:Y-m-d H:i:s',
        'dat_updated_at' => 'datetime:Y-m-d H:i:s',
        'dat_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    /*
    protected function getPacPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->dat_id_pla) ){
          $esp = PlanoSaude::find($this->dat_id_pla);
          return $esp->pla_nome;
       }
    }

    protected function getPlaPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->dat_id_pla) ){
          $esp = PlanoSaude::select('pla_id_pla','pla_nome')->orderBy('pla_nome','asc')->get();
          return $esp;
       }
    }

    public function planosaude()
    {
        return $this->hasOne(PlanoSaude::class, 'pla_id_pla', 'dat_id_pla');
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
            $model->dat_created_at = date("Y-m-d H:i:s.u");
            $model->dat_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->dat_updated_at = date("Y-m-d H:i:s.u");
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
