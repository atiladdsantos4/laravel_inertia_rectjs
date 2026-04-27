<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Carbon\Carbon;

class HorarioAgenda extends Model
{
    //hoa_id_dat,hoa_data,hoa_ano,hoa_mes,hoa_dia,hoa_diasemana,hoa_diaextenso,hoa_hora,hoa_minuto,hoa_horainicial,hoa_horafinal,hoa_created_at,hoa_updated_at,hoa_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'hoa_horario_agenda';
    protected $primaryKey = 'hoa_id_hoa';
    //protected $appends = ['acao','pla_planosaude','hoa_planosaude'];
    protected $appends = ['dataini','datafim'];
    protected $fillable = [
        'hoa_id_prt','hoa_id_dat','hoa_ativo','hoa_agendado','hoa_confirmado','hoa_cancelado','hoa_finalizado','hoa_pago','hoa_created_at','hoa_updated_at'
    ];
    protected $dates = ['hoa_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'hoa_created_at';
    const UPDATED_AT  = 'hoa_updated_at';
    const DELETED_AT  = 'hoa_deleted_at';

    private $mindata;
    private $maxdata;
    //protected $dateFormat = 'U';

    protected $casts = [//output
        'hoa_created_at' => 'datetime:Y-m-d H:i:s',
        'hoa_updated_at' => 'datetime:Y-m-d H:i:s',
        'hoa_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function protratamento()
    {
       return $this->hasOne(ProTratamento::class, 'prt_id_prt', 'hoa_id_prt');
    }

    public function dataagenda()
    {
       return $this->hasOne(DataAgenda::class, 'dat_id_dat', 'hoa_id_dat');
    }

    public function dataagendafiltro($valor)
    {
       return $this->hasOne(DataAgenda::class, 'dat_id_dat', 'hoa_id_dat')
       ->select('dat_data')->where('dat_id_dat',$valor);

    }

    public function setValorIni($valor)
    {
       $this->mindata = $valor;
    }

    public function setValorFim($valor)
    {
       $this->maxdata = $valor;
    }

    public function getDatainiAttribute($valor){ //--> qtde_escopos
        $data =  DataAgenda::select('dat_data')->where('dat_id_dat',$this->mindata)->first();
        return Carbon::parse($data->dat_data)->format('d/m/Y H:i:s');

    }

    public function getDatafimAttribute($valor){ //--> qtde_escopos
        $data =  DataAgenda::select('dat_data')->where('dat_id_dat',$this->maxdata)->first();
        return Carbon::parse($data->dat_data)->format('d/m/Y H:i:s');
    }

    /*
    protected function getPacPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->hoa_id_pla) ){
          $esp = PlanoSaude::find($this->hoa_id_pla);
          return $esp->pla_nome;
       }
    }

    protected function getPlaPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->hoa_id_pla) ){
          $esp = PlanoSaude::select('pla_id_pla','pla_nome')->orderBy('pla_nome','asc')->get();
          return $esp;
       }
    }

    public function planosaude()
    {
        return $this->hasOne(PlanoSaude::class, 'pla_id_pla', 'hoa_id_pla');
    }


    */

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->hoa_created_at = date("Y-m-d H:i:s.u");
            $model->hoa_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->hoa_updated_at = date("Y-m-d H:i:s.u");
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
