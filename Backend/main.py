from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from pymongo import MongoClient

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient("mongodb://localhost:27017")
db = client["ecommerce"]
cart = db["cart"]

@app.get("/products")
def get_products():
    
    url = f"https://fakestoreapi.com/products"
    res = requests.get(url)
    if res.status_code != 200:
        raise HTTPException(status_code=502, detail="Failed to fetch from FakeStoreAPI")
    return res.json()

@app.get("/product/{item_id}")
def get_product(item_id: int):
    url = f"https://fakestoreapi.com/products/{item_id}"
    res = requests.get(url)
    if res.status_code != 200:
        raise HTTPException(status_code=404, detail="Product not found")
    return res.json()

@app.post("/cart/add")
def add_to_cart(item: dict):
    cart.insert_one(item)
    return {"message": "Item added to cart"}

@app.get("/cart")
def get_cart():
    return list(cart.find({}, {"_id": 0}))

@app.delete("/cart/remove/{item_id}")
def remove_from_cart(item_id: int):
    result = cart.delete_one({"id": item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    return {"message": "Item removed from cart"}

@app.delete("/cart/clear")
def clear_cart():
    cart.delete_many({})
    return {"message": "Cart cleared"}
