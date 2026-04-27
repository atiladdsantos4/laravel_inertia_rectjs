<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Pacote extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    const CREATED_AT = 'pac_created_at';
    const UPDATED_AT = 'pac_updated_at';
    const DELETED_AT = 'pac_deleted_at';
    public $timestamps = true; //--> update automarically by laravel <--//
    ////pac_id_pac,pac_ativo,pac_display,pac_desconto,pac_valor,pac_created_at,pac_updated_at,pac_deleted_at
    protected $table = 'pac_pacote';
    protected $primaryKey = 'pac_id_pac';
    //protected $appends = ['esp_especialidades'];
    protected $fillable = [
       'pac_nome','pac_ativo','pac_display','pac_desconto','pac_valor','pac_valor_final','pac_created_at','pac_updated_at','pac_deleted_at'
    ];
    protected $dates = ['pac_deleted_at'];//campo obrigatório pra o SoftDeletes

    //protected $dateFormat = 'U';
    //pac_id_esp,pac_name,pac_descritivo,pac_position,pac_id_sec,pac_display,pac_dat_created,pac_dat_updated,pac_dat_deleted

    protected $casts = [
       'pac_created_at' => 'datetime:Y-m-d H:i:s',
       'pac_updated_at' => 'datetime:Y-m-d H:i:s',
       'pac_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];


    public function itens()
    {
       return $this->hasMany(PacoteItem::class, 'pai_id_pac', 'pac_id_pac');
    }

    public function itens_api()
    {
       return $this->hasMany(PacoteItem::class, 'pai_id_pac', 'pac_id_pac')
       ->select('pai_id_pai','pai_display','pai_id_pac','pai_id_tra','pai_qtde','pai_desconto','pai_valor','pai_created_at') ;
    }


    // protected function getEspEspecialidadesAttribute(){ //--> especilidade
    //    $esp = Especialidade::select('esp_id_esp','esp_titulo')->orderBy('esp_id_esp','asc')
    //    ->where('esp_emp',$this->pac_emp)
    //    ->get();
    //    return $esp;
    // }

        //boot events
    public static function boot()
    {
       parent::boot();

       self::creating(function($model){//before create
            //TratamentoValor::where(["pac_id_tra"=>$model->pac_id_tra])->update(['pac_version_atual' => 0]);
            $model->pac_created_at = date("Y-m-d H:i:s.u");
            $model->pac_updated_at = date("Y-m-d H:i:s.u");
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
