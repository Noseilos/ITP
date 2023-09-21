<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();
        return response()->json($posts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $post = new Post();
        $post->title = $request->title;
        $post->content = $request->content;
        $post->slug = $request->title;
        $post->user_id = 1;
        $post->save();
        return response()->json($post);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::find($id);
        return response()->json($post);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $post = Post::with('user')->where('id',$id)->first();
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($request->userId);
        $user->name = $request->user;
        $user->save();
        $post = Post::find($id);
        $post->title = $request->title;
        $post->content = $request->content;
        $post->slug = $request->title;
        $post->user_id = $user->id;
        $post->save();
        return response()->json(['message'=>'post updated', 'code'=>200]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Post::destroy($id);
        return response()->json(['message' => 'post deleted', 'code' => 201]);
    }
}
