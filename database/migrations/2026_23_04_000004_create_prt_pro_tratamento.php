<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prt_pro_tratamento', function (Blueprint $table) {
           $table->Increments('prt_id_prt');
           $table->unsignedBigInteger('prt_id_tra');
           $table->unsignedBigInteger('prt_id_pro');
           $table->integer('prt_tempo_experiencia');
           $table->char('prt_ativo',1);
           $table->timestamp('prt_created_at');
           $table->timestamp('prt_updated_at')->nullable();
           $table->timestamp('prt_deleted_at')->nullable();
           $table->primary(array('prt_id_prt'));
           $table->foreign('prt_id_pro')->references('pro_id_pro')->on('pro_profissional');
           $table->foreign('prt_id_tra')->references('tra_id_tra')->on('tra_tratamento');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prt_pro_tratamento');
    }
};
