import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import { Link } from "react-router-dom";

function ProductList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchProducts().then((res) => {
      setItems(res.data);
    });
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        Products
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              width: 220,
              padding: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 8px 30px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: 180,
                height: 180,
                objectFit: "contain",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            />
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#222",
                height: 48,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                textAlign: "center",
                marginBottom: "10px",
              }}
              title={item.title}
            >
              {item.title}
            </h4>
            <p
              style={{
                fontWeight: "700",
                fontSize: "1rem",
                color: "#007bff",
                marginBottom: "12px",
              }}
            >
              ${item.price.toFixed(2)}
            </p>
            <Link
              to={`/product/${item.id}`}
              style={{
                textDecoration: "none",
                color: "#fff",
                backgroundColor: "#007bff",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "0.9rem",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#0056b3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#007bff";
              }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
