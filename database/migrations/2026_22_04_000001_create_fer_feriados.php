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
        Schema::create('fer_feriados', function (Blueprint $table) {
            $table->Increments('fer_id_fer');
            $table->string('fer_descricao',500);
            $table->integer('fer_dia',1);
            $table->integer('fer_mes',1);
            $table->integer('fer_ano',1);
            $table->char('fer_ativo',1);
            $table->timestamp('fer_data');
            $table->timestamp('fer_created_at');
            $table->timestamp('fer_updated_at')->nullable();
            $table->timestamp('fer_deleted_at')->nullable();
            $table->primary(array('fer_id_fer'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fer_pacote');
    }
};
