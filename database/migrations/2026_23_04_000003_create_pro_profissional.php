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
        Schema::create('pro_profissional', function (Blueprint $table) {
           $table->Increments('pro_id_pro');
           $table->string('pro_nome',400);
           $table->string('pro_apelido',400)->nullable();
           $table->char('pro_tipo',1);
           $table->string('pro_cpf_cnpj',20);
           $table->string('pro_path_image',300);
           $table->char('pro_ativo',1);
           $table->timestamp('pro_created_at');
           $table->timestamp('pro_updated_at')->nullable();
           $table->timestamp('pro_deleted_at')->nullable();
           $table->primary(array('pro_id_pro'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pro_profissional');
    }
};
