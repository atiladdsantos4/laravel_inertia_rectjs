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
        Schema::create('pac_pacote', function (Blueprint $table) {
            $table->Increments('pac_id_pac');
            $table->string('pac_nome',1000);
            $table->char('pac_ativo',1);
            $table->char('pac_display',1);
            $table->decimal('pac_desconto',12,2);
            $table->decimal('pac_valor',12,2);
            $table->decimal('pac_valor_final',12,2);
            $table->timestamp('pac_created_at');
            $table->timestamp('pac_updated_at')->nullable();
            $table->timestamp('pac_deleted_at')->nullable();
            $table->primary(array('pac_id_pac'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pac_pacote');
    }
};
