<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Models\CosrentProfile;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $data = Validator::make($input, [
            'username' => [
                'required',
                'string',
                'max:30',
                'alpha_dash',
                'lowercase',
                Rule::unique(User::class),
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'jenis_akun' => ['required', Rule::in(['user', 'cosrent'])],
            'shop_name' => ['required_if:jenis_akun,cosrent', 'nullable', 'string', 'max:255'],
            'whatsapp' => ['required_if:jenis_akun,cosrent', 'nullable', 'string', 'max:30'],
            'instagram' => ['nullable', 'string', 'max:255'],
            'city_id' => ['required_if:jenis_akun,cosrent', 'nullable', 'integer', 'exists:cities,id'],
            'bio' => ['nullable', 'string', 'max:1000'],
            'avatar' => ['nullable', 'image', 'max:2048'],
        ])->validate();

        $user = User::create([
            'name' => $data['username'],
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => $data['jenis_akun'],
        ]);

        if (! empty($data['avatar'])) {
            $user->update(['avatar' => $data['avatar']->store('avatars', 'public')]);
        }

        if ($data['jenis_akun'] === 'cosrent') {
            CosrentProfile::create([
                'user_id' => $user->id,
                'shop_name' => $data['shop_name'],
                'whatsapp' => $data['whatsapp'],
                'instagram' => $data['instagram'] ?? null,
                'city_id' => $data['city_id'],
                'bio' => $data['bio'] ?? null,
            ]);
        }

        return $user;
    }
}
