<?php

namespace App\Models;

use App\Http\Resources\TratamentoResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Profissional extends Model
{
    //pro_id_pro,pro_nome,pro_apelido,pro_tipo,pro_cpf_cnpj,pro_path_image,pro_ativo,pro_created_at,pro_updated_at,pro_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'pro_profissional';
    protected $primaryKey = 'pro_id_pro';
    //protected $appends = ['acao','pla_planosaude','pro_planosaude'];
    protected $fillable = [
        'pro_nome', 'pro_apelido', 'pro_tipo', 'pro_cpf_cnpj', 'pro_path_image', 'pro_ativo', 'pro_created_at', 'pro_updated_at', 'pro_deleted_at'
    ];
    protected $dates = ['pro_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'pro_created_at';
    const UPDATED_AT  = 'pro_updated_at';
    const DELETED_AT  = 'pro_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'pro_created_at' => 'datetime:Y-m-d H:i:s',
        'pro_updated_at' => 'datetime:Y-m-d H:i:s',
        'pro_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function tratamentos()
    {
        return $this->hasMany(ProTratamento::class, 'prt_id_pro', 'pro_id_pro');
    }

    public function tratamentos_api()
    {
        return $this->hasMany(ProTratamento::class, 'prt_id_pro', 'pro_id_pro')
        ->select('prt_id_prt','prt_id_tra','prt_ativo','prt_created_at');
    }

    /*
    protected function getPacPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->pro_id_pla) ){
          $esp = PlanoSaude::find($this->pro_id_pla);
          return $esp->pla_nome;
       }
    }

    protected function getPlaPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->pro_id_pla) ){
          $esp = PlanoSaude::select('pla_id_pla','pla_nome')->orderBy('pla_nome','asc')->get();
          return $esp;
       }
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
            $model->pro_created_at = date("Y-m-d H:i:s.u");
            $model->pro_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->pro_updated_at = date("Y-m-d H:i:s.u");
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
