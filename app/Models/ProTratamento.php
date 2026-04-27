<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ProTratamento extends Model
{
    //prt_id_prt,prt_id_tra,prt_id_pro,prt_tempo_experiencia,prt_ativo,prt_created_at,prt_updated_at,prt_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'prt_pro_tratamento';
    protected $primaryKey = 'prt_id_prt';
    //protected $appends = ['acao','pla_planosaude','prt_planosaude'];
    protected $fillable = [
        'prt_id_tra', 'prt_id_pro', 'prt_tempo_experiencia', 'prt_ativo','prt_created_at', 'prt_updated_at', 'prt_deleted_at'
    ];
    protected $dates = ['prt_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'prt_created_at';
    const UPDATED_AT  = 'prt_updated_at';
    const DELETED_AT  = 'prt_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'prt_created_at' => 'datetime:Y-m-d H:i:s',
        'prt_updated_at' => 'datetime:Y-m-d H:i:s',
        'prt_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function tratamento()
    {
        return $this->hasOne(Tratamento::class, 'tra_id_tra', 'prt_id_tra')
        ->select('tra_id_tra','tra_titulo','tra_texto','tra_id_ser','tra_display')->with('servico_api');
    }

    public function profissional()
    {
        return $this->hasOne(Profissional::class, 'pro_id_pro', 'prt_id_pro')
        ->select('pro_id_pro','pro_nome','pro_apelido','pro_tipo','pro_cpf_cnpj','pro_path_image','pro_ativo','pro_created_at');
    }

    public function tratamento_filtro()
    {
        return $this->hasOne(Tratamento::class, 'tra_id_tra', 'prt_id_tra')
        ->select('tra_id_tra','tra_titulo');
    }

    public function profissional_filtro()
    {
        return $this->hasOne(Profissional::class, 'pro_id_pro', 'prt_id_pro')
       ->select('pro_id_pro','pro_nome');
    }
    /*
    protected function getPacPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->prt_id_pla) ){
          $esp = PlanoSaude::find($this->prt_id_pla);
          return $esp->pla_nome;
       }
    }

    protected function getPlaPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->prt_id_pla) ){
          $esp = PlanoSaude::select('pla_id_pla','pla_nome')->orderBy('pla_nome','asc')->get();
          return $esp;
       }
    }

    public function planosaude()
    {
        return $this->hasOne(PlanoSaude::class, 'pla_id_pla', 'prt_id_pla');
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
            $model->prt_created_at = date("Y-m-d H:i:s.u");
            $model->prt_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->prt_updated_at = date("Y-m-d H:i:s.u");
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
