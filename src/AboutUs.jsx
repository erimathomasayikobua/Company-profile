import React from 'react'
import { Link } from 'react-router-dom'
import './AboutUs.css'

function AboutUs() {
    return (
        <div className='about-us'>
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <h1>About Revo Technologies Uganda</h1>
                    <p>Digitally Africa</p>
                </div>
            </section>

            {/* Company Story */}
            <section className="company-story">
                <div className="container">
                    <div className="story-content">
                        <div className="story-text">
                            <h2>Our Story</h2>
                            <p>
                                Founded in 2025, Revo Technologies Uganda emerged from a vision to bridge the digital divide 
                                in Africa. We recognized the immense potential of technology to transform businesses and 
                                communities across the continent, and set out to make that vision a reality.
                            </p>
                            <p>
                                Starting as a small team of passionate developers and technology enthusiasts, we have grown 
                                into a leading technology company serving clients across East Africa and beyond. Our journey 
                                has been marked by innovation, dedication, and an unwavering commitment to excellence.
                            </p>
                            <p>
                                Today, we are proud to be at the forefront of Africa's digital revolution, providing 
                                cutting-edge solutions that empower businesses to thrive in the digital age.
                            </p>
                            <p>
                                At Revo Technologies Uganda, we believe in the power of technology to create positive change.
                                Our mission is to deliver innovate solutions that drive growth, efficiency, and digital 
                                transformation for businesses across africa.
                            </p>
                        </div>
                        <div className="story-image">
                            <div className="image-placeholder">
                                <span>🏢 Our Office</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="mission-vision">
                <div className="container">
                    <div className="mv-grid">
                        <div className="mv-card">
                            <div className="mv-icon">🎯</div>
                            <h3>Our Mission</h3>
                            <p>
                                To empower African businesses with innovative technology solutions that drive growth, 
                                efficiency, and digital transformation across all sectors.
                            </p>
                        </div>
                        <div className="mv-card">
                            <div className="mv-icon">👁️</div>
                            <h3>Our Vision</h3>
                            <p>
                                To be the leading technology partner in Africa, creating a digitally connected continent 
                                where every business can leverage technology to achieve its full potential.
                            </p>
                        </div>
                        <div className="mv-card">
                            <div className="mv-icon">💎</div>
                            <h3>Our Values</h3>
                            <p>
                                Innovation, Integrity, Excellence, and Community. These core values guide everything we do 
                                and shape our relationships with clients, partners, and team members.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="container">
                    <h2>Meet Our Team</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <div className="member-photo">
                                <span><img src='Erima.png' alt="Erima Thomas Ayikobua" /></span>
                            </div>
                            <h4>Erima Thomas Ayikobua</h4>
                            <p className="role">CEO & Founder</p>
                            <p className="bio">Visionary leader with 5+ years in technology and business development.</p>
                        </div>
                        <div className="team-member">
                            <div className="member-photo">
                                <span>👩‍💻</span>
                            </div>
                            <h4>Tumwebaze Tonny</h4>
                            <p className="role">Chief Technical Officer</p>
                            <p className="bio">Technical expert specializing in scalable architecture and cloud solutions.</p>
                        </div>

                        <div className="team-member">
                            <div className="member-photo">
                                <span><img src='Austin.png' alt="Ezamati Ronald Austine"/></span>
                            </div>
                            <h4>Ezamati Ronald Austine</h4>
                            <p className="role">Senior Developer</p>
                            <p className="bio">Full-stack developer with expertise in mobile and web applications, IoT.</p>
                        </div>
                        
                        <div className="team-member">
                            <div className="member-photo">
                                <span><img src='Aita.png' alt="Aita Dan" /></span>
                            </div>
                            <h4>Aita Dan</h4>
                            <p className="role">Chief Financial Officer</p>
                            <p className="bio">Expert in the finance department.</p>
                        </div>
                        <div className="team-member">
                            <div className="member-photo">
                                <span><img src='Kwoji.png' alt="Kwoji Jomo David" /></span>
                            </div>
                            <h4>Kwoji Jomo David</h4>
                            <p className="role">Head of Sales & Marketing</p>
                            <p className="bio">Logistics and Procurement personnel with experience in the field for over 4+ years.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="achievements">
                <div className="container">
                    <h2>Our Achievements</h2>
                    <div className="achievements-grid">
                        <div className="achievement-item">
                            <div className="achievement-number">20+</div>
                            <div className="achievement-text">Projects Completed</div>
                        </div>
                        <div className="achievement-item">
                            <div className="achievement-number">10+</div>
                            <div className="achievement-text">Happy Clients</div>
                        </div>
                        <div className="achievement-item">
                            <div className="achievement-number">2+</div>
                            <div className="achievement-text">Years Experience</div>
                        </div>
                        <div className="achievement-item">
                            <div className="achievement-number">10+</div>
                            <div className="achievement-text">Team Members</div>
                        </div>
                        <div className="achievement-item">
                            <div className="achievement-number">99%</div>
                            <div className="achievement-text">Client Satisfaction</div>
                        </div>
                        <div className="achievement-item">
                            <div className="achievement-number">24/7</div>
                            <div className="achievement-text">Support Available</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="tech-stack">
                <div className="container">
                    <h2>Technologies We Use</h2>
                    <div className="tech-categories">
                        <div className="tech-category">
                            <h3>Frontend</h3>
                            <div className="tech-items">
                                <span className="tech-item">React</span>
                                <span className="tech-item">Vue.js</span>
                                <span className="tech-item">Angular</span>
                                <span className="tech-item">TypeScript</span>
                            </div>
                        </div>
                        <div className="tech-category">
                            <h3>Backend</h3>
                            <div className="tech-items">
                                <span className="tech-item">Node.js</span>
                                <span className="tech-item">Python</span>
                                <span className="tech-item">Java</span>
                                <span className="tech-item">PHP</span>
                            </div>
                        </div>
                        <div className="tech-category">
                            <h3>Mobile</h3>
                            <div className="tech-items">
                                <span className="tech-item">React Native</span>
                                <span className="tech-item">Flutter</span>
                                <span className="tech-item">iOS</span>
                                <span className="tech-item">Android</span>
                            </div>
                        </div>
                        <div className="tech-category">
                            <h3>Cloud & DevOps</h3>
                            <div className="tech-items">
                                <span className="tech-item">AWS</span>
                                <span className="tech-item">Azure</span>
                                <span className="tech-item">Docker</span>
                                <span className="tech-item">Kubernetes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="about-cta">
                <div className="container">
                    <h2>Ready to Work With Us?</h2>
                    <p>Let's discuss how we can help transform your business with innovative technology solutions.</p>
                    <Link to="/contact" className="contact-btn">Get in Touch</Link>
                </div>
            </section>
        </div>
    )
}

export default AboutUs