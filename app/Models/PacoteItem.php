<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class PacoteItem extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    const CREATED_AT = 'pai_created_at';
    const UPDATED_AT = 'pai_updated_at';
    const DELETED_AT = 'pai_deleted_at';
    public $timestamps = true; //--> update automarically by laravel <--//
    ////pai_id_pai,pai_display,pai_id_pac,pai_id_tra,pai_qtde,pai_desconto,pai_valor,pai_created_at,pai_updated_at,pai_deleted_at
    protected $table = 'pai_pacote_item';
    protected $primaryKey = 'pai_id_pai';
    //protected $appends = ['esp_especialidades'];
    protected $fillable = [
      'pai_id_pac','pai_display','pai_id_tra','pai_qtde','pai_desconto','pai_valor','pai_created_at','pai_updated_at','pai_deleted_at'
    ];
    protected $dates = ['pai_deleted_at'];//campo obrigatório pra o SoftDeletes

    //protected $dateFormat = 'U';
    //pai_id_esp,pai_name,pai_descritivo,pai_position,pai_id_sec,pai_display,pai_dat_created,pai_dat_updated,pai_dat_deleted

    protected $casts = [
        'pai_created_at' => 'datetime:Y-m-d H:i:s',
        'pai_updated_at' => 'datetime:Y-m-d H:i:s',
        'pai_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];


    public function pacote()
    {
       return $this->hasOne(Pacote::class, 'pac_id_pac', 'pai_id_pac');
    }

    public function tratamento()
    {
       return $this->hasOne(Tratamento::class, 'tra_id_tra', 'pai_id_tra');
    }

    public function tratamento_api()
    {
       return $this->hasOne(Tratamento::class, 'tra_id_tra', 'pai_id_tra')
       ->select('tra_id_tra','tra_titulo','tra_texto','tra_display');
    }


    // protected function getEspEspecialidadesAttribute(){ //--> especilidade
    //    $esp = Especialidade::select('esp_id_esp','esp_titulo')->orderBy('esp_id_esp','asc')
    //    ->where('esp_emp',$this->pai_emp)
    //    ->get();
    //    return $esp;
    // }

        //boot events
    public static function boot()
    {
       parent::boot();

       self::creating(function($model){//before create
            //TratamentoValor::where(["pai_id_tra"=>$model->pai_id_tra])->update(['pai_version_atual' => 0]);
            $model->pai_created_at = date("Y-m-d H:i:s.u");
            $model->pai_updated_at = date("Y-m-d H:i:s.u");
       });

       self::updating(function($model){
        //   $destaque = strpos($model->par_nome,'destaque');
        //   if( $destaque !== false ){
        //      $param = 'destaque';
        //      $lista = Parametros::select('par_id_par')
        //      ->where('par_id_sec',6)
        //      ->where('par_id_par','<>',$model->par_id_par)
        //      ->where('par_nome','LIKE','%'.$param.'%')->get();
        //      foreach( $lista as $tem){
        //        $teste = $tem->par_id_par;
        //      }
        //   }
          //$lista// ... code here
       });
   }

}
