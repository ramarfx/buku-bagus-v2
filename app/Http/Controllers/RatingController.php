<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
    public function store(Request $request, string $book){
        $book = Book::find($book);

        $validator = Validator::make($request->all(), [
            'rating' => 'required|between:0,5'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'invalid field', 'errors' => $validator->errors()], 422);
        }

        Rating::create([
            'book_id' => $book->id,
            'user_id' => auth()->user()->id,
            'rating' => $request->rating
        ]);

        return response()->json('', 204);
    }
}
