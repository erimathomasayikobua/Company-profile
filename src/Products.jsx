import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Products.css'

const defaultProducts = [
    {
        id: 1,
        name: "Mobile Banking Solutions",
        description: "Complete mobile banking platform with secure transactions, bill payments, and account management.",
        price: "Contact for Pricing",
        category: "Financial Technology",
        features: ["Secure Transactions", "Bill Payments", "Account Management", "Multi-language Support"]
    },
    {
        id: 2,
        name: "E-Commerce Platform",
        description: "Comprehensive e-commerce solution with payment integration, inventory management, and analytics.",
        price: "Starting from $2,500",
        category: "E-Commerce",
        features: ["Payment Integration", "Inventory Management", "Analytics Dashboard", "Mobile Responsive"]
    },
    {
        id: 3,
        name: "Digital Wallet System",
        description: "Secure digital wallet for storing and transferring digital currencies with advanced security features.",
        price: "Contact for Pricing",
        category: "Financial Technology",
        features: ["Multi-currency Support", "Advanced Security", "Instant Transfers", "Transaction History"]
    },
    {
        id: 4,
        name: "POS Management System",
        description: "Point of sale system for retail businesses with inventory tracking and sales analytics.",
        price: "Starting from $1,200",
        category: "Retail Technology",
        features: ["Inventory Tracking", "Sales Analytics", "Receipt Management", "Multi-location Support"]
    },
    {
        id: 5,
        name: "Cloud Infrastructure",
        description: "Scalable cloud infrastructure solutions for businesses of all sizes with 99.9% uptime guarantee.",
        price: "Starting from $500/month",
        category: "Cloud Services",
        features: ["Scalable Infrastructure", "99.9% Uptime", "24/7 Support", "Data Backup"]
    },
    {
        id: 6,
        name: "Mobile App Development",
        description: "Custom mobile applications for iOS and Android with modern UI/UX design.",
        price: "Starting from $5,000",
        category: "Mobile Development",
        features: ["iOS & Android", "Modern UI/UX", "API Integration", "App Store Deployment"]
    },
    {
        id: 7,
        name: "Web Development",
        description: "Responsive web applications with modern frameworks and optimal performance.",
        price: "Starting from $3,000",
        category: "Web Development",
        features: ["Responsive Design", "Modern Frameworks", "SEO Optimized", "Fast Loading"]
    },
    {
        id: 8,
        name: "Data Analytics Platform",
        description: "Advanced analytics platform for business intelligence and data-driven decision making.",
        price: "Starting from $2,000",
        category: "Data Analytics",
        features: ["Business Intelligence", "Real-time Analytics", "Custom Dashboards", "Data Visualization"]
    }
];

function Products() {
    const [products, setProducts] = useState(defaultProducts);
    const [filteredProducts, setFilteredProducts] = useState(defaultProducts);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['All', ...new Set(products.map(product => product.category))];

    useEffect(() => {
        let filtered = products;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [products, selectedCategory, searchTerm]);

    return (
        <div className='products-page'>
            <div className="products-header">
                <h2>Our Services & Products</h2>
                <p>Comprehensive technology solutions for modern businesses</p>
            </div>

            <div className="products-filters">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="products-grid">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-header">
                            <h3>{product.name}</h3>
                            <span className="product-category">{product.category}</span>
                        </div>
                        <p className="product-description">{product.description}</p>
                        <div className="product-features">
                            <h4>Key Features:</h4>
                            <ul>
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="product-footer">
                            <span className="product-price">{product.price}</span>
                            <Link to="/contact" className="contact-btn">Contact Us</Link>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="no-products">
                    <p>No products found matching your criteria.</p>
                </div>
            )}
        </div>
    )
}

export default Products