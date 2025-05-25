import React, { useEffect, useState } from "react";
import { getCart, clearCart, removeFromCart } from "../api";

function Cart() {
  const [items, setItems] = useState([]);

  const loadCart = () => {
    getCart().then((res) => setItems(res.data));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id).then(() => loadCart());
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "0 20px",
      }}
    >
      <h2
        style={{
          fontSize: 32,
          fontWeight: "700",
          color: "#333",
          marginBottom: 30,
        }}
      >
        🛒 Your Cart
      </h2>

      {items.length === 0 ? (
        <p style={{ fontSize: 18, color: "#666", textAlign: "center" }}>
          Your cart is empty.
        </p>
      ) : (
        <>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginBottom: 80,
              display: "flex",
              flexDirection: "column",
              gap: 15,
            }}
          >
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  padding: 15,
                  borderRadius: 14,
                  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                  gap: 15,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "contain",
                    borderRadius: 12,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    backgroundColor: "#f9f9f9",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      marginBottom: 6,
                      color: "#222",
                    }}
                  >
                    {item.title}
                  </p>
                  <p style={{ color: "#666", fontSize: 15 }}>
                    ${item.price.toFixed(2)} × {item.quantity || 1}
                  </p>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  style={{
                    backgroundColor: "#ff4d4f",
                    border: "none",
                    color: "white",
                    padding: "8px 16px",
                    fontWeight: "600",
                    borderRadius: 8,
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(255,77,79,0.4)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d9363e")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ff4d4f")
                  }
                  aria-label={`Remove ${item.title} from cart`}
                >
                  Remove ❌
                </button>
              </li>
            ))}
          </ul>

          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              boxShadow: "0 -5px 15px rgba(0,0,0,0.1)",
              padding: "15px 30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: 700,
              margin: "0 auto",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <strong style={{ fontSize: 20, color: "#333" }}>
              Total: ${totalPrice.toFixed(2)}
            </strong>

            <button
              onClick={() => clearCart().then(loadCart())}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                padding: "10px 25px",
                fontWeight: "700",
                borderRadius: 12,
                cursor: "pointer",
                boxShadow: "0 6px 12px rgba(0, 123, 255, 0.6)",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
