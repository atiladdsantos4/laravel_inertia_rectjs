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
        Schema::create('tes_testemunhos', function (Blueprint $table) {
            $table->Increments('tes_id_tes');
            $table->string('tes_nome',100);
            $table->string('tes_profissao',100);
            $table->string('tes_comentario',2000)->nullable();
            $table->char('tes_sexo');
            $table->integer('tes_valor_rate');
            $table->timestamp('tes_created_at');
            $table->timestamp('tes_updated_at')->nullable();
            $table->timestamp('tes_deleted_at')->nullable();
            $table->primary(array('tes_id_tes'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tes_testemunhos');
    }
};
