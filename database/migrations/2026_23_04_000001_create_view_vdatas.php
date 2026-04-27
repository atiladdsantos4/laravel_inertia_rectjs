<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("
           create view v_data_agenda as
           SELECT generate_series('2026-01-01'::timestamp, '2029-01-01'::timestamp, '30 minutes'::interval) as data_dia
        ");
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS v_data_agenda");
    }
};
