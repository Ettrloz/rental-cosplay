<?php

namespace App\Console\Commands;

use App\Models\Costume;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class UploadCostumePhotos extends Command
{
    protected $signature = 'costume:upload-photos {folder : Folder berisi foto}';

    protected $description = 'Unggah foto kostum ke B2 dan hubungkan ke tabel costume_images';

    /** Nama file (tanpa ekstensi) => slug kostum */
    private const MAP = [
        'silver-wolf' => 'silver-wolf-lv999-honkai-star-rail',
        'ren-amamiya' => 'rental-cosplay-ren-amamiya-persona-5',
        'anaxagoras' => 'anaxagoras-honkai-star-rail',
        'black-cat' => 'kostum-black-cat-marvel-felicia-hardy',
        'silk-spider' => 'kostum-silk-spider-marvel',
        'dazai' => 'rental-kostum-dazai-osamu',
        'selena' => 'selena-gothic-cursed-ver-elite-skin',
        'flins' => 'flins',

    public function handle(): int
    {
        $folder = rtrim($this->argument('folder'), '\\/');

        if (! is_dir($folder)) {
            $this->error("Folder tidak ditemukan: {$folder}");

            return self::FAILURE;
        }

        foreach (self::MAP as $name => $slug) {
            $file = collect(['jpg', 'jpeg', 'png', 'webp'])
                ->map(fn ($ext) => "{$folder}/{$name}.{$ext}")
                ->first(fn ($path) => is_file($path));

            if (! $file) {
                $this->warn("Lewati {$name}: file tidak ada");

                continue;
            }

            $costume = Costume::where('slug', $slug)->first();

            if (! $costume) {
                $this->warn("Lewati {$name}: kostum dengan slug {$slug} tidak ada");

                continue;
            }

            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            $path = "costumes/{$slug}-1.{$ext}";

            Storage::disk('b2')->put($path, file_get_contents($file));

            $costume->images()->delete();
            $costume->images()->create(['path' => $path, 'sort_order' => 0]);

            $this->info("OK {$name} -> {$path}");
        }

        return self::SUCCESS;
    }
}
