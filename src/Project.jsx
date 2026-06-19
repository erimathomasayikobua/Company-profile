import React from 'react'
import './Project.css'

const projects = [
    {
        id: 1,
        title: 'Dove Xpress',
        image: '/davi-express-logo.png',
        alt: 'Dove Xpress logo',
        category: 'Transport & Logistics Platform',
        status: 'Active',
        description:
            'Dove Express Integrated Transport & Logistics Platform is a comprehensive digital solution designed to modernize passenger transport, parcel delivery, and customer service operations across Uganda and South Sudan.',
        details:
            'The platform brings ticket booking, parcel management, customer support, financial reporting, and fleet administration into one centralized system for customers, ticket agents, parcel officers, customer care teams, terminal managers, and administrators.',
        features: [
            'Digital ticketing with seat management and QR-code verification',
            'Parcel booking and tracking with real-time delivery updates',
            'Mobile money payments for MTN MoMo and Airtel Money',
            'Customer care tools for support tickets, complaints, call logs, refunds, WhatsApp, and SMS',
            'Fleet and trip management for routes, buses, and drivers',
            'Reporting and analytics for revenue, occupancy, and operations',
            'Role-based security and audit logging',
        ],
    },
    {
        id: 2,
        title: 'AF-KICK: Rise of Champions',
        image: '/logo.png',
        alt: 'AF-KICK logo',
        category: 'Football Simulation Game',
        status: 'In Active Development',
        description:
            'AF-KICK: Rise of Champions is a football simulation game designed to celebrate African football culture, passion, talent, and storytelling.',
        details:
            'The game follows a player journey from grassroots community football and village pitches to professional leagues, continental tournaments, sponsorships, interviews, transfers, and international stardom.',
        features: [
            'Realistic football gameplay and ball physics',
            'Career mode from grassroots to global stardom',
            'African leagues, clubs, and stadiums',
            'Dynamic interviews and reputation system',
            'Player transfers and sponsorship management',
            'Community and street football modes',
            'Cross-platform roadmap for PC, mobile, and future console releases',
        ],
    },
    {
        id: 3,
        title: 'ERIM E-Commerce Platform',
        image: '/platform  logo-01.png',
        alt: 'ERIM Platform logo',
        category: 'Multi-Vendor Marketplace',
        status: 'Completed Modules',
        description:
            'ERIM is a modern multi-vendor e-commerce platform that connects merchants and customers through a secure, scalable, and user-friendly digital marketplace.',
        details:
            'The platform enables merchants to create storefronts, manage products, process orders, run campaigns, review analytics, and serve customers through a centralized marketplace for Uganda and East Africa.',
        features: [
            'Customer storefront design',
            'Merchant management system',
            'Administration dashboard architecture',
            'Customer care management system',
            'Subscription management framework',
            'Checkout and payment workflows',
            'Analytics and reporting structures',
        ],
    },
]

function Project() {
    return (
        <div className="projects-page">
            <section className="projects-hero">
                <div className="projects-hero-content">
                    <div className="projects-photo">
                        <img src="/work.jpg" alt="Revo Tech Uganda Projects" />
                    </div>
                    <span>Our work</span>
                    <h1>Projects by Revo Tech Uganda</h1>
                    <p>
                        A selection of platforms, products, and digital systems built to solve
                        practical business problems across transport, commerce, and entertainment.
                    </p>
                </div>
            </section>

            <section className="projects-list" aria-label="Project portfolio">
                {projects.map((project) => (
                    <article className="project-card" key={project.id}>
                        <div className="project-media">
                            <img src={project.image} alt={project.alt} />
                        </div>

                        <div className="project-content">
                            <div className="project-meta">
                                <span>{project.category}</span>
                                <span>{project.status}</span>
                            </div>

                            <h2>{project.title}</h2>
                            <p>{project.description}</p>
                            <p>{project.details}</p>

                            <div className="project-features">
                                <h3>Key Features</h3>
                                <ul>
                                    {project.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    )
}

export default Project
