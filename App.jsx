import React, { useState } from "react";

const productsData = [
  { id: 1, name: "iPhone 15", category: "Mobile", price: 80000 },
  { id: 2, name: "Samsung S24", category: "Mobile", price: 70000 },
  { id: 3, name: "HP Laptop", category: "Laptop", price: 60000 },
  { id: 4, name: "Dell Laptop", category: "Laptop", price: 55000 },
  { id: 5, name: "Boat Headphones", category: "Accessories", price: 2500 },
];

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [categories, setCategories] = useState([]);

  const handleCategory = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const filteredProducts = productsData.filter((product) => {
    const keywordMatch = product.name
      .toLowerCase()
      .includes(keyword.toLowerCase());

    const priceMatch = product.price <= maxPrice;

    const categoryMatch =
      categories.length === 0 ||
      categories.includes(product.category);

    return keywordMatch && priceMatch && categoryMatch;
  });

  return (
    <div style={styles.container}>
      <h1>Product Catalog Search Matrix</h1>

      <input
        type="text"
        placeholder="Search Product..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={styles.input}
      />

      <div style={styles.filterBox}>
        <h3>Categories</h3>

        <label>
          <input
            type="checkbox"
            onChange={() => handleCategory("Mobile")}
          />
          Mobile
        </label>

        <label>
          <input
            type="checkbox"
            onChange={() => handleCategory("Laptop")}
          />
          Laptop
        </label>

        <label>
          <input
            type="checkbox"
            onChange={() => handleCategory("Accessories")}
          />
          Accessories
        </label>

        <h3>Max Price: ₹{maxPrice}</h3>

        <input
          type="range"
          min="1000"
          max="100000"
          step="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <div style={styles.grid}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={styles.card}>
            <img
              src={`https://picsum.photos/250/180?random=${product.id}`}
              alt={product.name}
              style={styles.image}
            />

            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "20px auto",
    fontFamily: "Arial",
    padding: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  filterBox: {
    background: "#f4f4f4",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  image: {
    width: "100%",
    borderRadius: "10px",
  },
};