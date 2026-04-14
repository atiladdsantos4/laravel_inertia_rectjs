<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class TratamentoValor extends Model
{
    //tva_id_esp,tva_titulo,tva_texto,tva_display,tva_dat_created,tva_dat_updated,tva_dat_deleted
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    const CREATED_AT = 'tva_created_at';
    const UPDATED_AT = 'tva_updated_at';
    const DELETED_AT = 'tva_deleted_at';
    public $timestamps = true; //--> update automarically by laravel <--//
    //tva_id_tva,tva_valor,tva_version_atual,tva_id_tra,tva_json,tva_created_at,tva_updated_at,tva_deleted_at
    protected $table = 'tva_tratamento_valor';
    protected $primaryKey = 'tva_id_tva';
    //protected $appends = ['esp_especialidades'];
    protected $fillable = [
      'tva_valor','tva_version_atual','tva_max_desconto','tva_id_tra','tva_created_at','tva_updated_at','tva_deleted_at'
    ];
    protected $dates = ['tva_deleted_at'];//campo obrigatório pra o SoftDeletes

    //protected $dateFormat = 'U';
    //tva_id_esp,tva_name,tva_descritivo,tva_position,tva_id_sec,tva_display,tva_dat_created,tva_dat_updated,tva_dat_deleted

    protected $casts = [
        'tva_created_at' => 'datetime:Y-m-d H:i:s',
        'tva_updated_at' => 'datetime:Y-m-d H:i:s',
        'tva_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];


    public function tratamento()
    {
       return $this->hasOne(Tratamento::class, 'tra_id_tra', 'tva_id_tra');
    }

    // public function especialidade_filtro()
    // {
    //     return $this->hasOne(Especialidade::class, 'esp_id_esp', 'tva_id_esp')->select('esp_id_esp','esp_titulo') ;
    // }

    // public function itens()
    // {
    //     return $this->hasMany(TratamentoItens::class, 'tri_id_tra', 'tva_id_tra');
    // }

    // public function itens_api()
    // {
    //     return $this->hasMany(TratamentoItens::class, 'tri_id_tra', 'tva_id_tra')->select('tri_id_tri','tri_descritivo');
    // }

    // protected function getEspEspecialidadesAttribute(){ //--> especilidade
    //    $esp = Especialidade::select('esp_id_esp','esp_titulo')->orderBy('esp_id_esp','asc')
    //    ->where('esp_emp',$this->tva_emp)
    //    ->get();
    //    return $esp;
    // }

        //boot events
    public static function boot()
    {
       parent::boot();

       self::creating(function($model){//before create
            TratamentoValor::where(["tva_id_tra"=>$model->tva_id_tra])->update(['tva_version_atual' => 0]);
            $model->tva_created_at = date("Y-m-d H:i:s.u");
            $model->tva_updated_at = date("Y-m-d H:i:s.u");
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
