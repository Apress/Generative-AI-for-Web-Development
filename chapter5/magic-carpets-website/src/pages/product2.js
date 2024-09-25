import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const ProductPage = () => {
  const [open, setOpen] = useState(false);

  const handleLightbox = () => {
    setOpen(true);
  };

  return (
    <div className="container">
      <header className="navbar">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/list">Products</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="product-details">
        <div className="product-container">
          <div className="product-image" onClick={handleLightbox}></div>
          <div className="product-info">
            <h1>Elegance Carpet</h1>
            <p>
              The Elegance Armenian Rug features a stunning blend of geometric motifs and floral patterns, hand-knotted with premium wool. Its deep, earthy tones and exceptional detail offer both luxury and a connection to Armenia's rich cultural tapestry.
            </p>
            <div className="price"><strong>$599.99</strong></div>
            <button className="buy-button">Buy</button>
          </div>
        </div>

        <table className="product-specs">
          <tbody>
            <tr>
              <th>Material</th>
              <td>Wool</td>
            </tr>
            <tr>
              <th>Size</th>
              <td>4m x 6m</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>15kg</td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer className="footer">
        <div className="links">
          <a href="/">Home</a> | <a href="/list">Products</a> | <a href="/contact">Contact</a>
        </div>
        <div className="social-media">
          <a href="#"><FaFacebookF /></a> <a href="#"><FaTwitter /></a> <a href="#"><FaInstagram /></a>
        </div>
      </footer>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: '/images/product2.webp' }]}
        />
      )}

      <style jsx>{`
        * {
          font-family: 'Roboto', sans-serif;
          border-radius: 8px;
          box-sizing: border-box;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .navbar {
          display: flex;
          justify-content: center;
          padding: 10px 0;
          background-color: #f8f8f8;
          border-radius: 8px;
        }
        .navbar nav ul {
          display: flex;
          list-style: none;
          gap: 20px;
        }
        .navbar nav ul li a {
          text-decoration: none;
          color: #333;
          transition: color 0.3s ease;
        }
        .navbar nav ul li a:hover {
          color: #1e90ff;
        }

        .product-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 50px 0;
        }

        .product-container {
          display: flex;
          justify-content: space-between;
          gap: 40px;
          width: 100%;
        }

        .product-image {
          flex: 1;
          background-image: url('/images/product2.webp');
          background-size: cover;
          background-position: center;
          height: 400px;
          border-radius: 8px;
          cursor: pointer;
        }

        .product-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        h1 {
          font-size: 2rem;
          color: #333;
        }

        p {
          font-size: 1.2rem;
          color: #555;
        }

        .price {
          font-size: 1.5rem;
          color: #000;
          font-weight: bold;
        }

        .buy-button {
          padding: 10px 20px;
          font-size: 1rem;
          background-color: #1e90ff;
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          border-radius: 8px;
        }

        .buy-button:hover {
          background-color: #1c86ee;
        }

        .product-specs {
          width: 100%;
          max-width: 600px;
          margin-top: 40px;
          border-collapse: collapse;
          text-align: left;
        }

        .product-specs th, .product-specs td {
          border-bottom: 1px solid #ddd;
          padding: 10px;
        }

        th {
          font-weight: bold;
          color: #333;
        }

        td {
          color: #555;
        }

        .footer {
          text-align: center;
          padding: 20px 0;
          background-color: #f8f8f8;
          border-radius: 8px;
        }

        .footer .links a {
          text-decoration: none;
          color: #333;
          margin: 0 10px;
          transition: color 0.3s ease;
        }
        .footer .links a:hover {
          color: #1e90ff;
        }

        .footer .social-media {
          margin-top: 20px;
        }

        .footer .social-media a {
          margin: 0 5px;
          font-size: 1.5rem;
          color: #555;
          transition: color 0.3s ease;
        }

        .footer .social-media a:hover {
          color: #1e90ff;
        }
      `}</style>
    </div>
  );
};

export default ProductPage;
