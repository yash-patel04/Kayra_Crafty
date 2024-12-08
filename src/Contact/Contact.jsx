import React, { useState } from "react";
import "./CSS/Contact.css";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <>
    <div className="contact-us-container">
      {/* Left Column */}
      <div className="left-column">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>Instagram: kayra.krafty</p>
          <p>Email: kayrakrafty@gmail.com</p>
        </div>

        <div className="recent-blogs">
          <h3>Recent Blog Posts</h3>
          <ul>
            <li>
              <a href="/blog/post-1">How to Improve Your Skills</a>
            </li>
            <li>
              <a href="/blog/post-2">Latest Trends in Industry</a>
            </li>
            <li>
              <a href="/blog/post-3">Tips for Success</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="right-column">
        <div className="contact-form-container">
          <h3>Feedback</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="f-btn">
              <button class="feedback-btn">
                <div class="feedback-text-container">
                  <span class="feedback-text">Send Message</span>
                  <span class="feedback-text">Send Message</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="footer">
        <p>
          &copy; {new Date().getFullYear()} Kayra Krafty. All rights reserved.
        </p>
      </div>
    </div>
    
    </>
  );
};

export default Contact;
