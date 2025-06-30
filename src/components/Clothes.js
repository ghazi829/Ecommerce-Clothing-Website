    import React, { useState } from 'react';
    import { ShoppingCart, Search, Menu, X, Heart, Star, Filter, Grid, List, ChevronDown, User, MapPin, Phone, Mail } from 'lucide-react';
    import './Clothes.css';

    const ClothingEcommerce = () => {
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
        const [selectedCategory, setSelectedCategory] = useState('all');
        const [viewMode, setViewMode] = useState('grid');
        const [cartItems, setCartItems] = useState([]);
        const [wishlistItems, setWishlistItems] = useState([]);
        const [searchQuery, setSearchQuery] = useState('');
        const [isFilterOpen, setIsFilterOpen] = useState(false);

        const products = [
            {
                id: 1,
                name: "Premium Cotton T-Shirt",
                price: 29.99,
                originalPrice: 39.99,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
                category: "shirts",
                rating: 4.5,
                reviews: 128,
                colors: ["#000", "#fff", "#3b82f6"],
                sizes: ["XS", "S", "M", "L", "XL"]
            },
            {
                id: 2,
                name: "Slim Fit Denim Jeans",
                price: 79.99,
                originalPrice: 99.99,
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
                category: "jeans",
                rating: 4.8,
                reviews: 89,
                colors: ["#1e40af", "#374151", "#000"],
                sizes: ["28", "30", "32", "34", "36"]
            },
            {
                id: 3,
                name: "Elegant Summer Dress",
                price: 89.99,
                originalPrice: 120.00,
                image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
                category: "dresses",
                rating: 4.7,
                reviews: 156,
                colors: ["#fbbf24", "#ec4899", "#06b6d4"],
                sizes: ["XS", "S", "M", "L", "XL"]
            },
            {
                id: 4,
                name: "Casual Hoodie",
                price: 59.99,
                originalPrice: 79.99,
                image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
                category: "hoodies",
                rating: 4.6,
                reviews: 94,
                colors: ["#374151", "#059669", "#dc2626"],
                sizes: ["S", "M", "L", "XL", "XXL"]
            },
            {
                id: 5,
                name: "Formal Blazer",
                price: 149.99,
                originalPrice: 199.99,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
                category: "blazers",
                rating: 4.9,
                reviews: 67,
                colors: ["#000", "#374151", "#1e40af"],
                sizes: ["S", "M", "L", "XL"]
            },
            {
                id: 6,
                name: "Sporty Tank Top",
                price: 24.99,
                originalPrice: 34.99,
                image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
                category: "shirts",
                rating: 4.4,
                reviews: 203,
                colors: ["#000", "#fff", "#059669"],
                sizes: ["XS", "S", "M", "L", "XL"]
            }
        ];

        const categories = [
            { id: 'all', name: 'All Items', count: products.length },
            { id: 'shirts', name: 'Shirts', count: products.filter(p => p.category === 'shirts').length },
            { id: 'jeans', name: 'Jeans', count: products.filter(p => p.category === 'jeans').length },
            { id: 'dresses', name: 'Dresses', count: products.filter(p => p.category === 'dresses').length },
            { id: 'hoodies', name: 'Hoodies', count: products.filter(p => p.category === 'hoodies').length },
            { id: 'blazers', name: 'Blazers', count: products.filter(p => p.category === 'blazers').length }
        ];

        const filteredProducts = products.filter(product => {
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        const addToCart = (product) => {
            setCartItems(prev => {
                const existing = prev.find(item => item.id === product.id);
                if (existing) {
                    return prev.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return [...prev, { ...product, quantity: 1 }];
            });
        };

        const toggleWishlist = (productId) => {
            setWishlistItems(prev =>
                prev.includes(productId)
                    ? prev.filter(id => id !== productId)
                    : [...prev, productId]
            );
        };

        const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        return (
            <div className="ce-root">
                {/* Header */}
                <header className="ce-header">
                    <div className="ce-header-container">
                        {/* Top bar */}
                        <div className="ce-header-topbar">
                            <div className="ce-header-topbar-left">
                                <span className="ce-header-contact"><Phone className="ce-icon" />+1 (555) 123-4567</span>
                                <span className="ce-header-contact"><Mail className="ce-icon" />info@clothingstore.com</span>
                            </div>
                            <div className="ce-header-topbar-right">
                                <span className="ce-header-shipping"><MapPin className="ce-icon" />Free shipping on orders $50+</span>
                                <span className="ce-header-divider">|</span>
                                <button className="ce-header-track-btn">Track Order</button>
                            </div>
                        </div>

                        {/* Main header */}
                        <div className="ce-header-main">
                            {/* Logo and mobile menu */}
                            <div className="ce-header-logo-wrap">
                                <button
                                    className="ce-header-mobile-menu-btn"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    {isMobileMenuOpen ? <X className="ce-icon-lg" /> : <Menu className="ce-icon-lg" />}
                                </button>
                                <h1 className="ce-logo">
                                    StyleHub
                                </h1>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="ce-header-nav">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`ce-header-nav-btn${selectedCategory === category.id ? ' ce-header-nav-btn-active' : ''}`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </nav>

                            {/* Search and Actions */}
                            <div className="ce-header-actions">
                                {/* Search */}
                                <div className="ce-header-search">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="ce-header-search-input"
                                    />
                                    <Search className="ce-header-search-icon" />
                                </div>

                                {/* Actions */}
                                <button className="ce-header-action-btn">
                                    <User className="ce-icon-lg" />
                                </button>
                                <button className="ce-header-action-btn ce-header-action-btn-relative">
                                    <Heart className="ce-icon-lg" />
                                    {wishlistItems.length > 0 && (
                                        <span className="ce-header-badge ce-header-badge-wishlist">
                                            {wishlistItems.length}
                                        </span>
                                    )}
                                </button>
                                <button className="ce-header-action-btn ce-header-action-btn-relative">
                                    <ShoppingCart className="ce-icon-lg" />
                                    {totalCartItems > 0 && (
                                        <span className="ce-header-badge ce-header-badge-cart">
                                            {totalCartItems}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Search */}
                        <div className="ce-header-mobile-search">
                            <div className="ce-header-search">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="ce-header-search-input"
                                />
                                <Search className="ce-header-search-icon" />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="ce-mobile-menu">
                            <nav className="ce-mobile-menu-nav">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setSelectedCategory(category.id);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`ce-mobile-menu-btn${selectedCategory === category.id ? ' ce-mobile-menu-btn-active' : ''}`}
                                    >
                                        {category.name} ({category.count})
                                    </button>
                                ))}
                            </nav>
                        </div>
                    )}
                </header>

                {/* Hero Section */}
                <section className="ce-hero">
                    <div className="ce-hero-content">
                        <h2 className="ce-hero-title">
                            Discover Your Style
                        </h2>
                        <p className="ce-hero-desc">
                            Premium clothing collection for every occasion. From casual wear to formal attire, find your perfect fit.
                        </p>
                        <button className="ce-hero-btn">
                            Shop Now
                        </button>
                    </div>
                </section>

                {/* Filters and Controls */}
                <div className="ce-main-container">
                    <div className="ce-controls">
                        <div className="ce-controls-left">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="ce-filter-btn"
                            >
                                <Filter className="ce-icon" />
                                Filters
                                <ChevronDown className={`ce-icon${isFilterOpen ? ' ce-chevron-rotated' : ''}`} />
                            </button>
                            <span className="ce-products-found">
                                {filteredProducts.length} products found
                            </span>
                        </div>

                        <div className="ce-controls-right">
                            <span className="ce-view-label">View:</span>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`ce-view-btn${viewMode === 'grid' ? ' ce-view-btn-active' : ''}`}
                            >
                                <Grid className="ce-icon" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`ce-view-btn${viewMode === 'list' ? ' ce-view-btn-active' : ''}`}
                            >
                                <List className="ce-icon" />
                            </button>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    {isFilterOpen && (
                        <div className="ce-filter-panel">
                            <div className="ce-filter-grid">
                                <div>
                                    <h3 className="ce-filter-title">Price Range</h3>
                                    <div className="ce-filter-options">
                                        <label className="ce-filter-option">
                                            <input type="checkbox" className="ce-checkbox" />
                                            Under $25
                                        </label>
                                        <label className="ce-filter-option">
                                            <input type="checkbox" className="ce-checkbox" />
                                            $25 - $50
                                        </label>
                                        <label className="ce-filter-option">
                                            <input type="checkbox" className="ce-checkbox" />
                                            $50 - $100
                                        </label>
                                        <label className="ce-filter-option">
                                            <input type="checkbox" className="ce-checkbox" />
                                            Over $100
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="ce-filter-title">Size</h3>
                                    <div className="ce-filter-options">
                                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                            <label key={size} className="ce-filter-option">
                                                <input type="checkbox" className="ce-checkbox" />
                                                {size}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="ce-filter-title">Color</h3>
                                    <div className="ce-filter-colors">
                                        {['#000', '#fff', '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'].map(color => (
                                            <button
                                                key={color}
                                                className="ce-filter-color-btn"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="ce-filter-title">Rating</h3>
                                    <div className="ce-filter-options">
                                        {[4, 3, 2, 1].map(rating => (
                                            <label key={rating} className="ce-filter-option">
                                                <input type="checkbox" className="ce-checkbox" />
                                                <div className="ce-filter-stars">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`ce-star${i < rating ? ' ce-star-filled' : ''}`}
                                                        />
                                                    ))}
                                                    <span className="ce-filter-rating-label">& up</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className={`ce-products${viewMode === 'list' ? ' ce-products-list' : ''}`}>
                        {filteredProducts.map(product => (
                            <div key={product.id} className={`ce-product-card${viewMode === 'list' ? ' ce-product-card-list' : ''}`}>
                                <div className={`ce-product-img-wrap${viewMode === 'list' ? ' ce-product-img-list' : ''}`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className={`ce-product-img${viewMode === 'list' ? ' ce-product-img-list' : ''}`}
                                    />
                                    <button
                                        onClick={() => toggleWishlist(product.id)}
                                        className="ce-product-wishlist-btn"
                                    >
                                        <Heart className={`ce-icon${wishlistItems.includes(product.id) ? ' ce-heart-filled' : ''}`} />
                                    </button>
                                    {product.originalPrice > product.price && (
                                        <div className="ce-product-save">
                                            Save ${(product.originalPrice - product.price).toFixed(2)}
                                        </div>
                                    )}
                                </div>

                                <div className={`ce-product-info${viewMode === 'list' ? ' ce-product-info-list' : ''}`}>
                                    <h3 className="ce-product-title">
                                        {product.name}
                                    </h3>

                                    <div className="ce-product-rating">
                                        <div className="ce-product-stars">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`ce-star${i < Math.floor(product.rating) ? ' ce-star-filled' : ''}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="ce-product-rating-text">
                                            {product.rating} ({product.reviews} reviews)
                                        </span>
                                    </div>

                                    <div className="ce-product-price-wrap">
                                        <span className="ce-product-price">
                                            ${product.price}
                                        </span>
                                        {product.originalPrice > product.price && (
                                            <span className="ce-product-original-price">
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                    </div>

                                    {/* Colors */}
                                    <div className="ce-product-colors">
                                        <span className="ce-product-colors-label">Colors:</span>
                                        {product.colors.map((color, index) => (
                                            <button
                                                key={index}
                                                className="ce-product-color-btn"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>

                                    {/* Sizes */}
                                    <div className="ce-product-sizes">
                                        <span className="ce-product-sizes-label">Sizes:</span>
                                        <div className="ce-product-sizes-list">
                                            {product.sizes.slice(0, 3).map(size => (
                                                <span key={size} className="ce-product-size">
                                                    {size}
                                                </span>
                                            ))}
                                            {product.sizes.length > 3 && (
                                                <span className="ce-product-size-more">+{product.sizes.length - 3} more</span>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => addToCart(product)}
                                        className="ce-product-cart-btn"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <footer className="ce-footer">
                    <div className="ce-footer-container">
                        <div className="ce-footer-grid">
                            <div>
                                <h3 className="ce-footer-logo">
                                    StyleHub
                                </h3>
                                <p className="ce-footer-desc">
                                    Your ultimate destination for premium fashion and style. Discover the latest trends and timeless classics.
                                </p>
                                <div className="ce-footer-socials">
                                    <button className="ce-footer-social-btn ce-footer-social-facebook">
                                        <span className="sr-only">Facebook</span>
                                        <svg className="ce-footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </button>
                                    <button className="ce-footer-social-btn ce-footer-social-instagram">
                                        <span className="sr-only">Instagram</span>
                                        <svg className="ce-footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.620 5.367 11.987 11.987 11.987c6.620 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.347-1.051-2.347-2.347s1.051-2.347 2.347-2.347 2.347 1.051 2.347 2.347-1.051 2.347-2.347 2.347zm7.718 0c-1.297 0-2.347-1.051-2.347-2.347s1.051-2.347 2.347-2.347 2.347 1.051 2.347 2.347-1.051 2.347-2.347 2.347z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h4 className="ce-footer-title">Quick Links</h4>
                                <ul className="ce-footer-links">
                                    <li><a href="#" className="ce-footer-link">About Us</a></li>
                                    <li><a href="#" className="ce-footer-link">Contact</a></li>
                                    <li><a href="#" className="ce-footer-link">Size Guide</a></li>
                                    <li><a href="#" className="ce-footer-link">Shipping Info</a></li>
                                    <li><a href="#" className="ce-footer-link">Returns</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="ce-footer-title">Categories</h4>
                                <ul className="ce-footer-links">
                                    <li><a href="#" className="ce-footer-link">New Arrivals</a></li>
                                    <li><a href="#" className="ce-footer-link">Men's Clothing</a></li>
                                    <li><a href="#" className="ce-footer-link">Women's Clothing</a></li>
                                    <li><a href="#" className="ce-footer-link">Accessories</a></li>
                                    <li><a href="#" className="ce-footer-link">Sale</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="ce-footer-title">Newsletter</h4>
                                <p className="ce-footer-newsletter-desc">Subscribe to get special offers and updates.</p>
                                <div className="ce-footer-newsletter">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="ce-footer-newsletter-input"
                                    />
                                    <button className="ce-footer-newsletter-btn">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="ce-footer-bottom">
                            <p>&copy; 2024 StyleHub. All rights reserved. | Privacy Policy | Terms of Service</p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    };

    export default ClothingEcommerce;
