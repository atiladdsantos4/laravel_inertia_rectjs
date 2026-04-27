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
        Schema::create('dat_data_agenda', function (Blueprint $table) {
            $table->Increments('dat_id_dat');
            $table->timestamp('dat_data');
            $table->integer('dat_ano');
            $table->integer('dat_mes');
            $table->integer('dat_dia');
            $table->integer('dat_diasemana');
            $table->char('dat_diaextenso',3);
            $table->integer('dat_hora');
            $table->char('dat_minuto',2);
            $table->char('dat_horainicial',5);
            $table->char('dat_horafinal',5);
            $table->timestamp('dat_created_at');
            $table->timestamp('dat_updated_at')->nullable();
            $table->timestamp('dat_deleted_at')->nullable();
            $table->primary(array('dat_id_dat'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dat_data_agenda');
    }
};
