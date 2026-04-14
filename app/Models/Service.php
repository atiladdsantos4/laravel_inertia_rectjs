<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Service extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    //ser_id_ser,ser_titulo,ser_texto,ser_display,ser_created_at,ser_updated_at,ser_deleted_at
    const CREATED_AT = 'ser_created_at';
    const UPDATED_AT = 'ser_updated_at';
    const DELETED_AT = 'ser_deleted_at';
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'ser_servico';
    protected $primaryKey = 'ser_id_ser';
    protected $fillable = [
      'ser_titulo','ser_texto','ser_display','ser_created_at','ser_updated_at','ser_deleted_at'
    ];
    protected $dates = ['ser_deleted_at']; //campo obrigatório pra o SoftDeletes


    protected $casts = [
       'ser_created_at' => 'datetime:Y-m-d H:i:s',
       'ser_updated_at' => 'datetime:Y-m-d H:i:s',
       'ser_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function tratamentos()
    // {
    //   return $this->hasMany(Tratamento::class, 'tra_id_esp', 'ser_id_esp')->select('tra_id_tra','tra_descritivo','tra_id_esp');
    // }

    // public function empresa()
    // {
    //   return $this->hasOne(Empresa::class, 'emp_id_emp', 'ser_emp')->select('emp_id_emp','emp_nome');
    // }


        //boot events
   public static function boot()
   {
       parent::boot();

       self::creating(function($model){//before create
            $model->ser_created_at = date("Y-m-d H:i:s.u");
            $model->ser_updated_at = date("Y-m-d H:i:s.u");
            $model->ser_display = 1;
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
