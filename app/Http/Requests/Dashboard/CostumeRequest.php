<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class CostumeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:0', 'max:100000000'],
            'rental_days' => ['required', 'integer', 'min:1', 'max:30'],
            'brand' => ['nullable', 'string', 'max:255'],
            'series' => ['nullable', 'string', 'max:255'],
            'character' => ['nullable', 'string', 'max:255'],
            'gender' => ['required', 'in:pria,wanita,unisex'],
            'size' => ['nullable', 'string', 'max:255'],
            'chest' => ['nullable', 'string', 'max:255'],
            'waist' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'city_id' => ['nullable', 'integer', 'exists:cities,id'],
            'status' => ['required', 'in:available,unavailable'],
            'images' => ['nullable', 'array', 'max:8'],
            'images.*' => ['image', 'max:5120'],
            'deleted_images' => ['nullable', 'array'],
            'deleted_images.*' => ['string', 'max:2048'],
        ];
    }
}
