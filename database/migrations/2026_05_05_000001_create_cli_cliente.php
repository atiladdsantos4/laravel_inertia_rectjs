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
        Schema::create('cli_cliente', function (Blueprint $table) {
            $table->Increments('cli_id_cli');
            $table->string('cli_name',400);
            $table->string('cli_cpf',14);
            $table->string('cli_email',14);
            $table->integer('cli_tipo_telefone');
            $table->string('cli_telefone',14);
            $table->char('cli_ativo',1);
            $table->timestamp('cli_created_at');
            $table->timestamp('cli_updated_at')->nullable();
            $table->timestamp('cli_deleted_at')->nullable();
            $table->primary(array('cli_id_cli'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('cli_cliente');
    }
};
