<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function store(Request $request, string $book){
        $book = Book::find($book);

        $validator = Validator::make($request->all(), [
            'review' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'invalid field', 'errors' => $validator->errors()], 422);
        }

        Review::create([
            'book_id' => $book->id,
            'user_id' => auth()->user()->id,
            'review' => $request->review
        ]);

        return response()->json('', 204);
    }
}
