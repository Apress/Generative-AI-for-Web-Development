import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const testimonials = [
  {
    quote: "These carpets transformed our home! Absolutely stunning and high quality.",
    name: "Ashot",
  },
  {
    quote: "The craftsmanship is incredible. A true piece of art.",
    name: "Ani",
  },
  {
    quote: "A beautiful addition to our living room. We get compliments all the time.",
    name: "Arpine",
  },
];

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prevTestimonial) => (prevTestimonial + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

      <section className="hero">
        <div className="hero-content">
          <h1>Beautiful Hand-Woven Carpets</h1>
          <Link href="/list">
            <button>Shop Now</button>
          </Link>
        </div>
      </section>

      <section className="product-features">
        <div className="product">
          <div className="product-image product-image-1"></div>
          <h2>Harmony Carpet</h2>
          <p>
            The Harmony Carpet features a stunning blend of geometric motifs and floral patterns, hand-knotted with premium wool. Its deep, earthy tones and exceptional detail offer both luxury and a connection to Armenia's rich cultural tapestry.
          </p>
          <Link href="/product1">
            <button>View Product</button>
          </Link>
        </div>
        <div className="product">
          <div className="product-image product-image-2"></div>
          <h2>Elegance Carpet</h2>
          <p>
            The Elegance Armenian Rug features a stunning blend of geometric motifs and floral patterns, hand-knotted with premium wool. Its deep, earthy tones and exceptional detail offer both luxury and a connection to Armenia's rich cultural tapestry.
          </p>
          <Link href="/product2">
            <button>View Product</button>
          </Link>
        </div>
      </section>

      <section className="testimonials">
        <div className="testimonial-slider">
          <p className="quote">"{testimonials[currentTestimonial].quote}"</p>
          <p className="name">- {testimonials[currentTestimonial].name}</p>
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
        /* General styles */
        * {
          font-family: 'Roboto', sans-serif;
          border-radius: 8px;
          box-sizing: border-box;
        }

        /* Container */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Navbar */
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

        /* Hero section */
        .hero {
          text-align: center;
          padding: 50px 0;
          background-image: url('/images/hero.webp');
          background-size: cover;
          background-position: center;
          color: white;
          border-radius: 8px;
        }
        .hero-content {
          background-color: rgba(0, 0, 0, 0.5);
          padding: 20px;
          border-radius: 8px;
          display: inline-block;
          width: 100%;
          text-align: center;
        }
        .hero h1 {
          margin-bottom: 20px;
          font-size: 2.5rem;
        }
        .hero button {
          padding: 10px 20px;
          font-size: 1rem;
          background-color: #1e90ff;
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .hero button:hover {
          background-color: #1c86ee;
        }

        /* Product features */
        .product-features {
          display: flex;
          justify-content: space-between;
          padding: 50px 0;
          gap: 20px;
          flex-wrap: wrap;
        }
        .product {
          flex: 0 0 48%;
          max-width: 48%;
          text-align: center;
          border-radius: 8px;
        }
        .product-image {
          width: 100%;
          height: 200px;
          background-size: cover;
          background-position: center;
          margin-bottom: 20px;
          border-radius: 8px;
        }
        .product-image-1 {
          background-image: url('/images/product1.webp');
        }
        .product-image-2 {
          background-image: url('/images/product2.webp');
        }
        .product h2 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: #333;
        }
        .product p {
          font-size: 1rem;
          margin-bottom: 20px;
          color: #555;
        }
        .product button {
          padding: 10px 20px;
          font-size: 1rem;
          background-color: #1e90ff;
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          border-radius: 8px;
        }
        .product button:hover {
          background-color: #1c86ee;
        }

        /* Testimonials */
        .testimonials {
          text-align: center;
          padding: 50px 0;
          background-color: #fafafa;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }
        .testimonial-slider {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 1s ease-in-out;
          animation: slide-out 1s ease-in-out;
        }
        @keyframes slide-out {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .quote {
          font-size: 1.5rem;
          font-family: 'Caveat', cursive;
          margin-bottom: 10px;
          color: #555;
        }
        .name {
          font-size: 1.2rem;
          color: #777;
        }

        /* Footer */
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

export default HomePage;
