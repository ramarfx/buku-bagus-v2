<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use App\Models\Rating;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::orderBy('created_at', 'desc')->get();
        $bookMap =  $books->map(function ($book) {
            $ratings = Rating::where('book_id', $book->id)->get()->pluck('rating');

            return [
                'id' => $book->id,
                'title' => $book->title,
                'authors' => json_decode($book->authors),
                'ratings' => collect($ratings)->average()
            ];
        });

        return response()->json($bookMap);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'pages' => 'required|numeric',
            'isbn' => 'required',
            'authors' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'invalid field', 'errors' => $validator->errors()], 422);
        }

        if (!$this->checkIsbn($request->isbn)) {
            return response()->json(['message' => 'invalid field', 'errors' => $validator->errors()], 422);
        }

        $book = Book::create([
            'title' => $request->title,
            'pages' => $request->pages,
            'isbn' => $request->isbn,
            'authors' => json_encode($request->authors),
            'added_by' => $request->user()->id
        ]);

        return response()->json($book);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $book = Book::find($id);
        $ratings = Rating::where('book_id', $book->id)->get()->pluck('rating');
        $reviews = Review::where('book_id', $book->id)->orderBy('updated_at', 'desc')->get();

        $reviewsMap = $reviews->map(function($review){
            $user = User::where('id', $review->user_id)->first();
            $rating = Rating::where('user_id', $user->id)->where('book_id', $review->book_id)->first();

            return [
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'review' => $review->review,
                'rating' => $rating->rating
            ];
        });

        return response()->json([
            'title' => $book->title,
            'authors' => json_decode($book->authors),
            'isbn' => $book->isbn,
            'pages' => $book->pages,
            'ratings' => collect($ratings)->average(),
            'ratings_total' => collect($ratings)->count(),
            'reviews_total' => $reviews->count(),
            'reviews' => $reviewsMap
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    function checkIsbn($isbn)
    {
        $isbnExploded = str_split($isbn);

        if (count($isbnExploded) == 10) {

            $data = [];
            for ($i = 10, $j = 0; $i >= 1; $i--, $j++) {
                $data[] = $isbnExploded[$j] * $i;
            }

            $sum = array_sum($data);

            if ($sum % 11 === 0) {
                return true;
            }

            return 0;
        }

        return 0;
    }
}
