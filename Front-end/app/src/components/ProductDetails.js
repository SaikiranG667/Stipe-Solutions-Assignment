import React, { useEffect, useState } from "react";
import { fetchProduct, addToCart } from "../api";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [addedMessage, setAddedMessage] = useState("");

  useEffect(() => {
    fetchProduct(id).then((res) => setProduct(res.data));
  }, [id]);

  if (!product)
    return <div style={{ textAlign: "center", marginTop: 50 }}>Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setAddedMessage("Added to cart!");
    setTimeout(() => setAddedMessage(""), 3000);
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: 30,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        borderRadius: 16,
        backgroundColor: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: 28,
          fontWeight: "700",
          color: "#222",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        {product.title}
      </h2>

      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: 320,
            height: 320,
            objectFit: "contain",
            borderRadius: 16,
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          }}
        />

        <div style={{ flex: 1, minWidth: 280 }}>
          <p
            style={{
              fontSize: 22,
              fontWeight: "600",
              color: "#007bff",
              marginBottom: 15,
            }}
          >
            Price: ${product.price.toFixed(2)}
          </p>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              color: "#444",
              marginBottom: 15,
            }}
          >
            {product.description}
          </p>

          <p
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#555",
              marginBottom: 15,
            }}
          >
            Category:{" "}
            <span style={{ textTransform: "capitalize" }}>
              {product.category}
            </span>
          </p>

          {product.rating && (
            <p
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#333",
                marginBottom: 25,
              }}
            >
              ⭐ Rating:{" "}
              <span style={{ color: "#ffb400" }}>
                {product.rating.rate} / 5
              </span>{" "}
              ({product.rating.count} reviews)
            </p>
          )}

          <button
            onClick={handleAddToCart}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px 24px",
              fontSize: 16,
              fontWeight: "700",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              boxShadow: "0 6px 12px rgba(0, 123, 255, 0.4)",
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0056b3";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0, 86, 179, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#007bff";
              e.currentTarget.style.boxShadow =
                "0 6px 12px rgba(0, 123, 255, 0.4)";
            }}
          >
            Add to Cart
          </button>

          {addedMessage && (
            <p
              style={{
                color: "green",
                marginTop: 20,
                fontWeight: "600",
                fontSize: 16,
                animation: "fadeInOut 3s forwards",
              }}
            >
              {addedMessage}
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInOut {
          0% {opacity: 0;}
          10% {opacity: 1;}
          90% {opacity: 1;}
          100% {opacity: 0;}
        }
      `}</style>
    </div>
  );
}

export default ProductDetails;
