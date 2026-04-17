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
        Schema::create('pai_pacote_item', function (Blueprint $table) {
            $table->Increments('pai_id_pai');
            $table->char('pai_display',1);
            $table->unsignedBigInteger('pai_id_pac');
            $table->unsignedBigInteger('pai_id_tra');
            $table->integer('pai_qtde');
            $table->decimal('pai_desconto',12,2);
            $table->decimal('pai_valor',12,2);
            $table->timestamp('pai_created_at');
            $table->timestamp('pai_updated_at')->nullable();
            $table->timestamp('pai_deleted_at')->nullable();
            $table->primary(array('pai_id_pai'));
            $table->foreign('pai_id_pac')->references('pac_id_pac')->on('pac_pacote');
            $table->foreign('pai_id_tra')->references('tra_id_tra')->on('tra_tratamento');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pai_pacote_item');
    }
};
