<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileDeleteRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /**
     * Tampilkan halaman pengaturan akun.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $profile = $user->cosrentProfile()->first();

        return Inertia::render('dashboard/akun', [
            'jenisAktif' => $user->isPerental() ? 'cosrent' : 'user',
            'punyaKostum' => $profile ? $profile->costumes()->exists() : false,
        ]);
    }

    /**
     * Ubah jenis akun (User Biasa / Perental).
     */
    public function updateJenis(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'jenis_akun' => ['required', Rule::in(['user', 'cosrent'])],
        ]);

        $user = $request->user();
        $profile = $user->cosrentProfile()->first();

        if ($data['jenis_akun'] === 'user') {
            if ($profile && $profile->costumes()->exists()) {
                return back()->withErrors([
                    'jenis_akun' => 'Kamu masih punya kostum terdaftar. Hapus semua kostum dulu sebelum beralih ke User Biasa.',
                ]);
            }

            if ($profile) {
                $profile->delete();
            }
        }

        if ($user->role !== $data['jenis_akun']) {
            $user->role = $data['jenis_akun'];
            $user->save();
        }

        Inertia::flash(
            'success',
            $data['jenis_akun'] === 'cosrent'
                ? 'Jenis akun berhasil diubah menjadi Perental.'
                : 'Jenis akun berhasil diubah menjadi User Biasa.'
        );

        return back();
    }

    /**
     * Upload / ganti foto profil (avatar).
     */
    public function updateAvatar(Request $request): RedirectResponse
    {
        $request->validate([
            'avatar' => ['required', 'image', 'max:2048'],
        ]);

        $user = $request->user();

        // Hapus file lama dari storage jika ada
        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $path = $request->file('avatar')->store('avatars', 'public');

        $user->update(['avatar' => $path]);

        Inertia::flash('success', 'Foto profil berhasil diperbarui.');

        return back();
    }

    /**
     * Hapus foto profil (avatar).
     */
    public function destroyAvatar(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $user->update(['avatar' => null]);

        Inertia::flash('success', 'Foto profil berhasil dihapus.');

        return back();
    }

    /**
     * Hapus akun pengguna beserta seluruh datanya.
     */
    public function destroy(ProfileDeleteRequest $request): RedirectResponse
    {
        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
