<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * //tva_id_esp,tva_titulo,tva_texto,tva_display,tva_dat_created,tva_dat_updated,tva_dat_deleted
     */
    public function up(): void
    {
        Schema::create('tva_tratamento_valor', function (Blueprint $table) {
            $table->Increments('tva_id_tva');
            $table->decimal('tva_valor',12,2);
            $table->decimal('tva_max_desconto',12,2);
            $table->char('tva_version_atual',1);
            $table->unsignedBigInteger('tva_id_tra',1);
            $table->timestamp('tva_created_at');
            $table->timestamp('tva_updated_at')->nullable();
            $table->timestamp('tva_deleted_at')->nullable();
            $table->primary(array('tva_id_tva'));
            $table->foreign('tva_id_tra')->references('tra_id_tra')->on('tra_tratamento');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tva_tratamento');
    }
};
