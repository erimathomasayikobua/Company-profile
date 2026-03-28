import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to Revo Tech Uganda</h1>
                    <p className="hero-subtitle">Innovating financial and technology solutions for Africa and beyond</p>
                    <div className="hero-buttons">
                        <Link to="/products" className="btn-primary">Explore Our Services</Link>
                        <Link to="/contact" className="btn-secondary">Get In Touch</Link>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="hero-placeholder">
                        <span>🚀 Technology Innovation</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <h2>Why Choose Revo Technologies?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">💡</div>
                            <h3>Innovation</h3>
                            <p>Cutting-edge technology solutions tailored for African markets</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Security</h3>
                            <p>Bank-grade security for all our financial technology solutions</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🌍</div>
                            <h3>Global Reach</h3>
                            <p>Connecting Africa to the world through technology</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Fast & Reliable</h3>
                            <p>High-performance systems designed for efficiency</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h3>500+</h3>
                            <p>Projects Completed</p>
                        </div>
                        <div className="stat-item">
                            <h3>50+</h3>
                            <p>Happy Clients</p>
                        </div>
                        <div className="stat-item">
                            <h3>5+</h3>
                            <p>Years Experience</p>
                        </div>
                        <div className="stat-item">
                            <h3>24/7</h3>
                            <p>Support Available</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <h2>Ready to Transform Your Business?</h2>
                    <p>Join hundreds of businesses that trust Revo Technologies for their digital transformation</p>
                    <Link to="/project" className="btn-primary">Start Your Project Today</Link>
                </div>
            </section>
        </div>
    )
}

export default Home