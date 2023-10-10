<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Search;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Log;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        try {

            $query = $request->input('query');
            $APIKEY = 'H9smWXn1PDcdDmAUwc1AFcUjM8VAtVNM';
            $from = 'database';

            $search = Search::where('query', $query)->first();

            if(!$search){
                
                $from = 'api';
                $response = Http::get("https://api.giphy.com/v1/gifs/search", [
                    'api_key' => $APIKEY,
                    'q' => $query,
                ]);

                $content = $response->json();
                $search = new Search();
                $search->query = $query;
                $search->json = json_encode($response->json());
                $search->save();
            }
            
            return response()->json(['status' => true, 'message' => 'List from '.$from, 'data' => $search->json], 200);

        } catch (\Exception $e) {
            Log::info('$search->save() | ' . $e->getMessage() . " | " . $e->getLine());
            return response()->json(['status' => false, 'message' => $e->getMessage(), 'data' => null], 500);
        }
    }

    public function history()
    {
        $searches = Search::all();
        return response()->json($searches, 200);
    }

    public function deleteHistory()
    {
        try {
            $task = Search::truncate();
            return response()->json(['status' => true, 'message' => 'History cleared.'], 200);
        } catch (\Exception $e) {
            Log::info('Search::truncate() | ' . $e->getMessage() . " | " . $e->getLine());
            return response()->json(['status' => false, 'message' => $e->getMessage(), 'data' => null], 500);
        }
    }
}