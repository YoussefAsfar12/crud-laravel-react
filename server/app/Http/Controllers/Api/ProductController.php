<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $products = Product::all();
            
            if ($products->isEmpty()) {
                return response()->json(['message' => 'No products found.'], 404);
            }
            
            return response()->json($products, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch products.'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $validated= $validator->validated();
        try {
            if($request->hasFile('image')){
                $validated['image']=$request->file('image')->store('images','public');
             }else{
                 $validated['image']=null;
             }
             
            $product = Product::create([
                'name'=>$validated['name'],
                'description'=>$validated['description'],
                'price'=>$validated['price'],
                'quantity'=>$validated['quantity'],
                'image'=>$validated['image'],
            ]);

            return response()->json(['message' => 'Product created successfully.', 'product' => $product], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create product.'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id)
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return response()->json(['message' => 'Product not found.'], 404);
            }
            return response()->json($product, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve product.'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {   


        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'image' => 'nullable|image',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);      
        }
        
        $validated = $validator->validated();




        try {
            $product = Product::find($id);
            if (!$product) {
                return response()->json(['message' => 'Product not found.'], 404);
            }



            if($request->hasFile('image')){
                if($product->image){
                    Storage::disk("public")->delete($product->image);
                }
                $validated['image']=$request->file('image')->store("images","public");
            }else{
                $validated['image']=$product->image;
            }

            $product->update([
                'name'=>$validated['name'],
                'description'=>$validated['description'],
                'price'=>$validated['price'],
                'quantity'=>$validated['quantity'],
                'image'=>$validated['image'],
            ]);

            return response()->json(['message' => 'Product updated successfully.', 'product' => $product], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update product.'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                return response()->json(['message' => 'Product not found.'], 404);
            }
            $product->delete();
            Storage::disk("public")->delete($product->image);
            return response()->json(['message' => 'Product deleted successfully.'], 204);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete product.'], 500);
        }
    }


    // public function test(Request $request,String $id){

    //     if ($request->hasFile('image')) {
    //         return response()->json(['success' => true]);

    //         // $newImage = $request->file('image');
    //         // $newImageName = time() . '.' . $newImage->getClientOriginalExtension();
    //         // $newImage->move(public_path('images'), $newImageName);
    
    //         // Delete the old image
    //         // File::delete(public_path('images') . '/' . $imageName);

    //         // return response()->json(['success' => true, 'image_url' => $newImageName]);
    //     }else{
    //         return response()->json(['error' => false]);

    //     }
    //     // if($request->hasFile('image')){
    //     //     $request->file('image')->store("images","public");
    //     //     return response()->json([ "image"=>"true"]);
            
    //     // }
        
    //     // return response()->json([ "image"=>"false"]);
    // }
    public function updateImage(Request $request, $imageName)
{
    return response()->json(['success' => true]);

//     if ($request->hasFile('image')) {
//         $newImage = $request->file('image');
//         $newImageName = time() . '.' . $newImage->getClientOriginalExtension();
//         $newImage->move(public_path('images'), $newImageName);

//         // Delete the old image
//         // File::delete(public_path('images') . '/' . $imageName);

//         return response()->json(['success' => true, 'image_url' => $newImageName]);
//     }

//     return response()->json(['success' => false, 'message' => 'No image uploaded']);
// }



}
