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
        Schema::create('sei_section_item', function (Blueprint $table) {
            $table->Increments('sei_id_sei');
            $table->string('sei_nome',300);
            $table->string('sei_valor',4000);
            $table->char('sei_display',1);
            $table->string('sei_link',40)->nullable();
            $table->string('sei_placeholder',1000)->nullable();
            $table->unsignedBigInteger('sei_id_tip'); //1 texto 2 lista 3 imagem 4 icon
            $table->unsignedBigInteger('sei_id_sec'); 
            $table->unsignedBigInteger('sei_id_emp'); 
            $table->unsignedBigInteger('sei_id_tag'); 
            $table->timestamp('sei_created_at');
            $table->timestamp('sei_updated_at')->nullable();
            $table->timestamp('sei_deleted_at')->nullable();
            $table->primary(array('sei_id_sei'));
            $table->foreign('sei_id_sec')->references('sec_id_sec')->on('sec_sections');
            $table->foreign('sei_id_emp')->references('emp_id_emp')->on('emp_empresa');
            $table->foreign('sei_id_tip')->references('tip_id_tip')->on('tipo_parametro');
            $table->foreign('sei_id_tag')->references('tag_id_tag')->on('tag_campo');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sei_section_item');
    }
};
