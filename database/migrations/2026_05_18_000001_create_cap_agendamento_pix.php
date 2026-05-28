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
        Schema::create('cap_agendamento_pix', function (Blueprint $table) {
            $table->Increments('cap_id_cap');
            $table->unsignedBigInteger('cap_id_cla');
            $table->unsignedBigInteger('cap_id_pix');
            $table->longText('cap_qrcode');
            $table->string('cap_copy_qrcode',1500);
            $table->decimal('cap_valor_qrcode',10,2);
            $table->timestamp('cap_created_at')->nullable();
            $table->timestamp('cap_updated_at')->nullable();
            $table->timestamp('cap_deleted_at')->nullable();
            $table->primary(array('cap_id_cap'));
            $table->foreign('cap_id_cla')->references('cla_id_cla')->on('cla_cliente_agendado');
            $table->foreign('cap_id_pix')->references('pix_id_pix')->on('pix_dados_pix');
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
