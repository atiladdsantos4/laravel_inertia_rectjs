<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Tratamento extends Model
{
    //tra_id_esp,tra_titulo,tra_texto,tra_display,tra_dat_created,tra_dat_updated,tra_dat_deleted
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    const CREATED_AT = 'tra_created_at';
    const UPDATED_AT = 'tra_updated_at';
    const DELETED_AT = 'tra_deleted_at';
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'tra_tratamento';
    protected $primaryKey = 'tra_id_tra';
    //protected $appends = ['esp_especialidades'];
    protected $fillable = [
      'tra_id_tra','tra_titulo','tra_texto','tra_display','tra_id_ser','tra_created_at','tra_updated_at','tra_deleted_at'
    ];
    protected $dates = ['tra_dat_deleted'];//campo obrigatório pra o SoftDeletes

    //protected $dateFormat = 'U';
    //tra_id_tra,tra_titulo,tra_texto,tra_display,tra_id_ser,tra_created_at,tra_updated_at,tra_deleted_at
    //tra_id_esp,tra_name,tra_descritivo,tra_position,tra_id_sec,tra_display,tra_dat_created,tra_dat_updated,tra_dat_deleted

    protected $casts = [
       'tra_created_at' => 'datetime:Y-m-d H:i:s',
       'tra_updated_at' => 'datetime:Y-m-d H:i:s',
       'tra_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];


    public function servico()
    {
        return $this->hasOne(Service::class, 'ser_id_ser', 'tra_id_ser');
    }

    public function especialidade_filtro()
    {
        return $this->hasOne(Especialidade::class, 'esp_id_esp', 'tra_id_esp')->select('esp_id_esp','esp_titulo') ;
    }

    public function itens()
    {
        return $this->hasMany(TratamentoItens::class, 'tri_id_tra', 'tra_id_tra');
    }

    public function itens_api()
    {
        return $this->hasMany(TratamentoItens::class, 'tri_id_tra', 'tra_id_tra')->select('tri_id_tri','tri_descritivo');
    }

    protected function getEspEspecialidadesAttribute(){ //--> especilidade
       $esp = Especialidade::select('esp_id_esp','esp_titulo')->orderBy('esp_id_esp','asc')
       ->where('esp_emp',$this->tra_emp)
       ->get();
       return $esp;
    }

        //boot events
    public static function boot()
    {
       parent::boot();

       self::creating(function($model){//before create
            $model->tra_created_at = date("Y-m-d H:i:s.u");
            $model->tra_updated_at = date("Y-m-d H:i:s.u");
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
