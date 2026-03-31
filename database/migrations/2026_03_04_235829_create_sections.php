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
        Schema::create('sec_sections', function (Blueprint $table) {
            $table->Increments('sec_id_sec');
            $table->string('sec_nome',300);
            $table->unsignedBigInteger('sec_id_emp'); 
            $table->timestamp('sec_created_at');
            $table->timestamp('sec_updated_at')->nullable();
            $table->timestamp('sec_deleted_at')->nullable();
            $table->primary(array('sec_id_sec'));
            $table->foreign('sec_id_emp')->references('emp_id_emp')->on('emp_empresa');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emp_empresa');
    }
};
