<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * //tra_id_esp,tra_titulo,tra_texto,tra_display,tra_dat_created,tra_dat_updated,tra_dat_deleted
     */
    public function up(): void
    {
        Schema::create('tra_tratamento', function (Blueprint $table) {
            $table->Increments('tra_id_tra');
            $table->string('tra_titulo',500);
            $table->string('tra_texto',1500);
            $table->char('tra_display',1);
            $table->unsignedBigInteger('tra_id_ser',1);
            $table->timestamp('tra_created_at');
            $table->timestamp('tra_updated_at')->nullable();
            $table->timestamp('tra_deleted_at')->nullable();
            $table->primary(array('tra_id_tra'));
            $table->foreign('tra_id_ser')->references('ser_id_ser')->on('ser_servico');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tra_tratamento');
    }
};
