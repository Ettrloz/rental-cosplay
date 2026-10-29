<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
            'title' => ['required', 'string', 'min:5', 'max:150'],
            'starts_on' => ['required', 'date'],
            'organizer' => ['required', 'string', 'max:150'],
            'location' => ['required', 'string', 'max:150'],
            'venue' => ['nullable', 'string', 'max:150'],
            'time_label' => ['nullable', 'string', 'max:100'],
            'price_label' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:10000'],
            'image' => ['nullable', 'image', 'max:4096'],
        ];
    }
}
