import React from 'react';

const HomePage = () => {
  const popularProducts = [
    { id: 1, name: "Product 1", price: "$5.99" },
    { id: 2, name: "Product 2", price: "$9.99" },
    { id: 3, name: "Product 3", price: "$3.49" },
    { id: 4, name: "Product 4", price: "$7.29" }
  ];

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="app-title">COOKMATE</h1>
      </header>

      <section className="popular-products">
        <h2 className="section-title">Popular Products</h2>
        <div className="products-list">
          {popularProducts.map(product => (
            <div className="product-card" key={product.id}>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
