<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Especialidade extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    const CREATED_AT = 'esp_dat_created';
    const UPDATED_AT = 'esp_dat_updated';
    const DELETED_AT = 'esp_dat_deleted';
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'esp_especialidade';
    protected $primaryKey = 'esp_id_esp';
    protected $fillable = [
      'esp_titulo','esp_texto','esp_display','esp_dat_created','esp_dat_updated','esp_dat_deleted','esp_emp'
    ];
    protected $dates = ['esp_dat_deleted'];//campo obrigatório pra o SoftDeletes

    //protected $dateFormat = 'U';
    //esp_id_esp,esp_name,esp_descritivo,esp_position,esp_id_sec,esp_display,esp_dat_created,esp_dat_updated,esp_dat_deleted

    protected $casts = [
       'esp_dat_created' => 'datetime:Y-m-d H:i:s',
       'esp_dat_updated' => 'datetime:Y-m-d H:i:s',
       'esp_dat_deleted' => 'datetime:Y-m-d H:i:s',
    ];

    public function tratamentos()
    {
      return $this->hasMany(Tratamento::class, 'tra_id_esp', 'esp_id_esp')->select('tra_id_tra','tra_descritivo','tra_id_esp');
    }

    public function empresa()
    {
      return $this->hasOne(Empresa::class, 'emp_id_emp', 'esp_emp')->select('emp_id_emp','emp_nome');
    }


        //boot events
   public static function boot()
   {
       parent::boot();

       self::creating(function($model){//before create
            $model->esp_dat_created = date("Y-m-d H:i:s.u");
            $model->esp_dat_updated = date("Y-m-d H:i:s.u");
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
