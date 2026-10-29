<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreForumThreadRequest extends FormRequest
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
            'category' => [
                'required',
                'string',
                Rule::in(['Want to Rent', 'Want to Sell', 'Diskon', 'Open Commission', 'Lainnya']),
            ],
            'title' => ['required', 'string', 'min:5', 'max:150'],
            'body' => ['required', 'string', 'min:10', 'max:10000'],
            'image' => ['nullable', 'image', 'max:4096'],
        ];
    }
}
