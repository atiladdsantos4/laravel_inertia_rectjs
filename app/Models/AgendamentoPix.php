<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class AgendamentoPix extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    //cap_id_cap,cap_id_cla,cap_id_pix,cap_qrcode,cap_copy_qrcode,cap_valor_qrcode,cap_created_at,cap_updated_at,cap_deleted_at
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'cap_agendamento_pix';
    protected $primaryKey = 'cap_id_cap';
    protected $appends = ['acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
        'cap_id_cla','cap_id_pix','cap_qrcode','cap_copy_qrcode','cap_valor_qrcode','cap_created_at', 'cap_updated_at', 'cap_deleted_at'
    ];
    protected $dates = ['cap_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'cap_created_at';
    const UPDATED_AT  = 'cap_updated_at';
    const DELETED_AT  = 'cap_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'cap_created_at' => 'datetime:Y-m-d H:i:s',
        'cap_updated_at' => 'datetime:Y-m-d H:i:s',
        'cap_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];
    /*
    protected function getPacPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->pac_id_pla) ){
          $esp = PlanoSaude::find($this->pac_id_pla);
          return $esp->pla_nome;
       }
    }

    protected function getPlaPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->pac_id_pla) ){
          $esp = PlanoSaude::select('pla_id_pla','pla_nome')->orderBy('pla_nome','asc')->get();
          return $esp;
       }
    }

    public function planosaude()
    {
        return $this->hasOne(PlanoSaude::class, 'pla_id_pla', 'pac_id_pla');
    }
    */

    protected function getacaoAttribute(){ //--> qtde_escopos
        return 1;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->cap_created_at = date("Y-m-d H:i:s.u");
            $model->cap_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->cap_updated_at = date("Y-m-d H:i:s.u");
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
