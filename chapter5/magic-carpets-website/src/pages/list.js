import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const ProductListPage = () => {
  return (
    <div className="container">
      <header className="navbar">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/list">Products</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <h1 className="page-title">Products</h1>

      <section className="product-list">
        <div className="product">
          <Link href="/product1">
            <div className="product-image product-image-1"></div>
          </Link>
          <Link href="/product1">
            <h2 className="product-title">Harmony Carpet</h2>
          </Link>
        </div>
        
        <div className="product">
          <Link href="/product2">
            <div className="product-image product-image-2"></div>
          </Link>
          <Link href="/product2">
            <h2 className="product-title">Elegance Carpet</h2>
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="links">
          <Link href="/">Home</Link> | <Link href="/list">Products</Link> | <Link href="/contact">Contact</Link>
        </div>
        <div className="social-media">
          <a href="#"><FaFacebookF /></a> <a href="#"><FaTwitter /></a> <a href="#"><FaInstagram /></a>
        </div>
      </footer>

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

        .page-title {
          text-align: center;
          font-size: 2.5rem;
          margin-top: 50px;
          margin-bottom: 30px;
          color: #333;
        }

        .product-list {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          padding-bottom: 50px;
        }

        .product {
          flex: 0 0 48%;
          max-width: 48%;
          text-align: center;
        }

        .product-image {
          width: 100%;
          height: 300px;
          background-size: cover;
          background-position: center;
          border-radius: 8px;
          cursor: pointer;
        }

        .product-image-1 {
          background-image: url('/images/product1.webp');
        }

        .product-image-2 {
          background-image: url('/images/product2.webp');
        }

        .product-title {
          font-size: 1.5rem;
          margin-top: 15px;
          color: #333;
          cursor: pointer;
        }

        .product-title:hover {
          color: #1e90ff;
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

export default ProductListPage;
