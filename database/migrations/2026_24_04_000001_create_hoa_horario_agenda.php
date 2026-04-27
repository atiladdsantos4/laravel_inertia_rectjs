<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * //pac_id_esp,pac_titulo,pac_texto,pac_display,pac_dat_created,pac_dat_updated,pac_dat_deleted
     */
    public function up(): void
    {
        Schema::create('hoa_horario_agenda', function (Blueprint $table) {
            $table->Increments('hoa_id_hoa');
            $table->unsignedBigInteger('hoa_id_prt');
            $table->unsignedBigInteger('hoa_id_dat');
            $table->char('hoa_ativo',1);
            $table->char('hoa_agendado',1);
            $table->char('hoa_confirmado',1);
            $table->char('hoa_cancelado',1);
            $table->char('hoa_finalizado',1);
            $table->char('hoa_pago',1);
            $table->timestamp('hoa_created_at');
            $table->timestamp('hoa_updated_at')->nullable();
            $table->timestamp('hoa_deleted_at')->nullable();
            $table->primary(array('hoa_id_hoa'));
            $table->foreign('hoa_id_prt')->references('prt_id_prt')->on('prt_pro_tratamento');
            $table->foreign('hoa_id_dat')->references('dat_id_dat')->on('dat_data_agenda');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('hoa_horario_agenda');
    }
};
