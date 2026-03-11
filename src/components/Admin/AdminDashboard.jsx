import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const navigate = useNavigate();

    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    // Load products on component mount
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/products', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error('Error loading categories:', error);
        }
        return [];
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const showMessage = (msg, type = 'success') => {
        setMessage({ text: msg, type });
        setTimeout(() => setMessage(''), 3000);
    };

    const renderProductsTab = () => (
        <div className="tab-content">
            <div className="content-header">
                <h2>Manage Products</h2>
                <button className="btn-primary" onClick={() => setActiveTab('add-product')}>
                    Add New Product
                </button>
            </div>
            
            {isLoading ? (
                <div className="loading">Loading products...</div>
            ) : (
                <div className="products-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category_name || 'Uncategorized'}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button 
                                            className="btn-edit"
                                            onClick={() => handleEditProduct(product)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="btn-delete"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    const renderAddProductTab = () => (
        <div className="tab-content">
            <div className="content-header">
                <h2>Add New Product</h2>
                <button className="btn-secondary" onClick={() => setActiveTab('products')}>
                    Back to Products
                </button>
            </div>
            
            <ProductForm onSubmit={handleProductSubmit} />
        </div>
    );

    const renderEditProductTab = () => (
        <div className="tab-content">
            <div className="content-header">
                <h2>Edit Product</h2>
                <button className="btn-secondary" onClick={() => {
                    setActiveTab('products');
                    setEditingProduct(null);
                }}>
                    Back to Products
                </button>
            </div>
            
            <ProductForm 
                onSubmit={handleUpdateProduct} 
                initialData={editingProduct}
                isEdit={true}
            />
        </div>
    );

    const handleProductSubmit = async (productData) => {
        try {
            const response = await fetch('/api/admin/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                showMessage('Product added successfully!');
                setActiveTab('products');
                loadProducts();
            } else {
                showMessage('Failed to add product', 'error');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            showMessage('Network error', 'error');
        }
    };

    const handleEditProduct = (product) => {
        setActiveTab('edit-product');
        setEditingProduct(product);
    };

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });

            if (response.ok) {
                showMessage('Product deleted successfully!');
                loadProducts();
            } else {
                showMessage('Failed to delete product', 'error');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            showMessage('Network error', 'error');
        }
    };

    const handleUpdateProduct = async (productData) => {
        try {
            const response = await fetch(`/api/admin/products/${editingProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                showMessage('Product updated successfully!');
                setActiveTab('products');
                setEditingProduct(null);
                loadProducts();
            } else {
                showMessage('Failed to update product', 'error');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            showMessage('Network error', 'error');
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <div className="header-actions">
                    <span className="welcome-text">Welcome, Admin</span>
                    <button className="btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="sidebar">
                    <nav className="admin-nav">
                        <button 
                            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
                            onClick={() => setActiveTab('products')}
                        >
                            📦 Products
                        </button>
                        <button 
                            className={`nav-item ${activeTab === 'add-product' ? 'active' : ''}`}
                            onClick={() => setActiveTab('add-product')}
                        >
                            ➕ Add Product
                        </button>
                        <button 
                            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                            onClick={() => setActiveTab('settings')}
                        >
                            ⚙️ Settings
                        </button>
                        <button 
                            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
                            onClick={() => setActiveTab('analytics')}
                        >
                            📊 Analytics
                        </button>
                    </nav>
                </div>

                <div className="main-content">
                    {message && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    {activeTab === 'products' && renderProductsTab()}
                    {activeTab === 'add-product' && renderAddProductTab()}
                    {activeTab === 'edit-product' && renderEditProductTab()}
                    {activeTab === 'settings' && <SettingsTab />}
                    {activeTab === 'analytics' && <AnalyticsTab />}
                </div>
            </div>
        </div>
    );
}

// Product Form Component
function ProductForm({ onSubmit, initialData = null, isEdit = false }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category_id: '',
        features: []
    });
    const [categories, setCategories] = useState([]);

    // Load categories
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        };
        loadCategories();
    }, []);

    // Initialize form with existing data when editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                price: initialData.price || '',
                category_id: initialData.category_id || '',
                features: initialData.features || []
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="name">Product Name *</label>
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
                    <label htmlFor="category_id">Category *</label>
                    <select
                        id="category_id"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Price *</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Starting from $2,500"
                />
            </div>

            <button type="submit" className="btn-primary">
                {isEdit ? 'Update Product' : 'Add Product'}
            </button>
        </form>
    );
}

// Settings Tab Component
function SettingsTab() {
    return (
        <div className="tab-content">
            <h2>Site Settings</h2>
            <div className="settings-grid">
                <div className="setting-card">
                    <h3>Site Information</h3>
                    <p>Update company name, description, and contact information</p>
                    <button className="btn-primary">Edit</button>
                </div>
                <div className="setting-card">
                    <h3>Homepage Content</h3>
                    <p>Manage hero section, features, and call-to-action content</p>
                    <button className="btn-primary">Edit</button>
                </div>
                <div className="setting-card">
                    <h3>About Us</h3>
                    <p>Update company story, mission, vision, and team information</p>
                    <button className="btn-primary">Edit</button>
                </div>
                <div className="setting-card">
                    <h3>Contact Information</h3>
                    <p>Manage contact details, addresses, and social media links</p>
                    <button className="btn-primary">Edit</button>
                </div>
            </div>
        </div>
    );
}

// Analytics Tab Component
function AnalyticsTab() {
    const [analytics, setAnalytics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                const response = await fetch('/api/admin/analytics', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setAnalytics(data);
                }
            } catch (error) {
                console.error('Error loading analytics:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadAnalytics();
    }, []);

    if (isLoading) {
        return (
            <div className="tab-content">
                <h2>Analytics Dashboard</h2>
                <div className="loading">Loading analytics...</div>
            </div>
        );
    }

    return (
        <div className="tab-content">
            <h2>Analytics Dashboard</h2>
            <div className="analytics-grid">
                <div className="stat-card">
                    <h3>Page Views (30 days)</h3>
                    <div className="stat-number">{analytics?.pageViews || 0}</div>
                    <div className="stat-change">Last 30 days</div>
                </div>
                <div className="stat-card">
                    <h3>Contact Submissions</h3>
                    <div className="stat-number">{analytics?.contactSubmissions || 0}</div>
                    <div className="stat-change">Last 30 days</div>
                </div>
                <div className="stat-card">
                    <h3>Newsletter Subscribers</h3>
                    <div className="stat-number">{analytics?.newsletterSubscribers || 0}</div>
                    <div className="stat-change">Last 30 days</div>
                </div>
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <div className="stat-number">{analytics?.totalProducts || 0}</div>
                    <div className="stat-change">Active products</div>
                </div>
                <div className="stat-card">
                    <h3>Total Contacts</h3>
                    <div className="stat-number">{analytics?.totalContacts || 0}</div>
                    <div className="stat-change">All time</div>
                </div>
                <div className="stat-card">
                    <h3>Total Subscribers</h3>
                    <div className="stat-number">{analytics?.totalNewsletterSubscribers || 0}</div>
                    <div className="stat-change">All time</div>
                </div>
            </div>
            
            {analytics?.topPages && analytics.topPages.length > 0 && (
                <div className="top-pages">
                    <h3>Top Pages (Last 30 days)</h3>
                    <div className="pages-list">
                        {analytics.topPages.map((page, index) => (
                            <div key={index} className="page-item">
                                <span className="page-name">{page.page}</span>
                                <span className="page-views">{page.views} views</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
