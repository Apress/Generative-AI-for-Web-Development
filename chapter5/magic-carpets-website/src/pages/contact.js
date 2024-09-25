import React, { useState } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send formData to backend)
    console.log('Form data:', formData);
  };

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

      <section className="contact-form">
        <h1>Send us a message</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit">Send</button>
        </form>
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

        /* Contact Form */
        .contact-form {
          text-align: center;
          padding: 50px 0;
        }
        .contact-form h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #333;
        }
        .contact-form form {
          max-width: 600px;
          margin: 0 auto;
          text-align: left;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-size: 1rem;
          color: #555;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
        }
        .form-group textarea {
          height: 150px;
        }
        .contact-form button {
          padding: 10px 20px;
          font-size: 1rem;
          background-color: #1e90ff;
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          border-radius: 8px;
        }
        .contact-form button:hover {
          background-color: #1c86ee;
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

export default ContactPage;
