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
        Schema::create('cla_cliente_agendado', function (Blueprint $table) {
            $table->Increments('cla_id_cla');
            $table->unsignedBigInteger('cla_id_cli');
            $table->unsignedBigInteger('cla_id_hoa');
            $table->char('cla_tipo_agenda',1);
            $table->timestamp('cla_created_at');
            $table->timestamp('cla_updated_at')->nullable();
            $table->timestamp('cla_deleted_at')->nullable();
            $table->primary(array('cla_id_cla'));
            $table->foreign('cla_id_cli')->references('cli_id_cli')->on('cli_cliente');
            $table->foreign('cla_id_hoa')->references('hoa_id_hoa')->on('hoa_horario_agenda');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('cla_cliente_agendado');
    }
};
