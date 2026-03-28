import React, { useState } from 'react'
import './Contact.css'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        newsletter: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                subject: '',
                message: '',
                newsletter: false
            });
        } catch (error) {
            console.error(error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='contact-page'>
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container">
                    <h1>Get In Touch</h1>
                    <p>Ready to transform your business? Let's start the conversation.</p>
                </div>
            </section>

            <div className="contact-content">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="contact-form-section">
                            <h2>Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+256 XXX XXX XXX"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="company">Company</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Your company name"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject *</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="services">Services Information</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                        <option value="support">Technical Support</option>
                                        <option value="quote">Request Quote</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        placeholder="Tell us about your project or inquiry..."
                                    />
                                </div>

                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="newsletter"
                                            checked={formData.newsletter}
                                            onChange={handleChange}
                                        />
                                        <span className="checkmark"></span>
                                        Subscribe to our newsletter for updates and insights
                                    </label>
                                </div>

                                {submitStatus === 'success' && (
                                    <div className="success-message">
                                        ✅ Thank you! Your message has been sent successfully.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="error-message">
                                        ❌ Sorry, there was an error sending your message. Please try again.
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    className="submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="contact-info-section">
                            <h2>Contact Information</h2>
                            
                            <div className="contact-info">
                                <div className="info-item">
                                    <div className="info-icon">📍</div>
                                    <div className="info-content">
                                        <h3>Office Address</h3>
                                        <p>
                                            to be Updated<br />
                                            Kampala, Uganda<br />
                                            P.O. Box #
                                        </p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">📞</div>
                                    <div className="info-content">
                                        <h3>Phone Numbers</h3>
                                        <p>
                                            +256 726 137 083<br />
                                            +256 793 843 648
                                        </p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">✉️</div>
                                    <div className="info-content">
                                        <h3>Email Addresses</h3>
                                        <p>
                                            info@revotech.com<br />
                                            support@revotech.com<br />
                                            sales@revotech.com
                                        </p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">🕒</div>
                                    <div className="info-content">
                                        <h3>Business Hours</h3>
                                        <p>
                                            Monday - Friday: 8:00 AM - 5:00 PM<br />
                                            Saturday: 9:00 AM - 2:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="social-links">
                                <h3>Follow Us</h3>
                                <div className="social-icons">
                                    <a href="#" className="social-link">📘 Facebook</a>
                                    <a href="#" className="social-link"> X</a>
                                    <a href="#" className="social-link">💼 LinkedIn</a>
                                    <a href="#" className="social-link">📷 Instagram</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <section className="map-section">
                <div className="container">
                    <h2>Find Us</h2>
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Nakawa+Industrial+Area+Kampala+Uganda"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-placeholder"
                        aria-label="Open Nakawa Industrial Area on Google Maps"
                    >
                        <span>🗺️ Interactive Map</span>
                        <p>Nakawa Industrial Area, Kampala, Uganda</p>
                    </a>
                </div>
            </section>
        </div>
    )
}

export default Contact