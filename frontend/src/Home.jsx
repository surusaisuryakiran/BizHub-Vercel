/* =========================================================
   HOME PAGE
   Multi-Vendor B2B E-Commerce Platform
========================================================= */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Home({
    setPage,
    currentUser,
    setCurrentUser,
    cart,
    addToCart,
    storeData,
    registerUser,
    loginUser,
    registerUserWithBackend,
    backendConnected
}) {
    const [activeTab, setActiveTab] = useState("login"); // login, signup

    // Login Form State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("buyer"); // buyer, vendor, admin

    // Signup Form State
    const [signupRole, setSignupRole] = useState("buyer");
    const [companyName, setCompanyName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [gstNumber, setGstNumber] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPhone, setSignupPhone] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    /* =====================================================
       LOGIN HANDLER
    ===================================================== */
    async function handleLogin(event) {
        event.preventDefault();

        if (email.trim() === "" || password.trim() === "") {
            window.alert("Please enter your Email ID and Password.");
            return;
        }

        try {
            const loggedInUser = await loginUser(email.trim(), password);
            window.alert(`Login successful! Welcome back, ${loggedInUser.name}.`);

            if (loggedInUser.role === "buyer") setPage("catalog");
            else if (loggedInUser.role === "vendor") setPage("vendor-dashboard");
            else if (loggedInUser.role === "admin") setPage("admin-dashboard");

            setEmail("");
            setPassword("");
        } catch (error) {
            window.alert(error.message || "Login failed. Please check your backend and credentials.");
        }
    }

    /* =====================================================
       SIGN UP HANDLER
    ===================================================== */
    async function handleSignup(event) {
        event.preventDefault();

        if (
            companyName.trim() === "" ||
            ownerName.trim() === "" ||
            signupEmail.trim() === "" ||
            signupPassword.trim() === ""
        ) {
            window.alert("Please fill in all mandatory Sign Up fields.");
            return;
        }

        try {
            const newUser = await registerUserWithBackend({
                name: ownerName.trim(),
                email: signupEmail.trim(),
                password: signupPassword,
                phone: signupPhone.trim() || "+91 98765 00000",
                role: signupRole,
                address: "Visakhapatnam, AP"
            });

            window.alert(`Account created successfully for ${companyName}!`);

            setCompanyName("");
            setOwnerName("");
            setGstNumber("");
            setSignupEmail("");
            setSignupPhone("");
            setSignupPassword("");

            if (newUser.role === "buyer") setPage("catalog");
            else if (newUser.role === "vendor") setPage("vendor-dashboard");
        } catch (error) {
            window.alert(error.message || "Registration failed. Please check the backend.");
        }
    }

    /* =====================================================
       DEMO ONE-CLICK LOGINS
    ===================================================== */
    function loginDemo(roleType) {
        if (roleType === "buyer") {
            const buyer = storeData.users.find((u) => u.role === "buyer");
            setCurrentUser(buyer);
            setPage("catalog");
        } else if (roleType === "vendor") {
            const vendor = storeData.users.find((u) => u.role === "vendor");
            setCurrentUser(vendor);
            setPage("vendor-dashboard");
        } else if (roleType === "admin") {
            const admin = storeData.users.find((u) => u.role === "admin");
            setCurrentUser(admin);
            setPage("admin-dashboard");
        }
    }

    function handleExplore() {
        setPage("catalog");
    }

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {/* Navbar */}
            <Navbar
                setPage={setPage}
                activePage="home"
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                cartCount={cartCount}
            />

            {/* ================= HERO SECTION ================= */}
            <section className="home-hero">
                <div className="home-hero-background"></div>

                <div className="home-container">
                    {/* LEFT CONTENT */}
                    <div className="home-content">
                        <div className="small-label">
                            <i className="bi bi-diagram-3-fill me-1"></i> MULTI-VENDOR B2B DIGITAL MARKETPLACE
                        </div>

                        <h1>
                            Connecting
                            <br />
                            Businesses.
                            <br />
                            <span>Empowering Wholesale Trade.</span>
                        </h1>

                        <p>
                            A centralized digital marketplace connecting manufacturers, verified suppliers,
                            and corporate buyers for bulk purchasing, RFQs, Net-30 credit terms, and GST invoicing.
                        </p>

                        <div className="d-flex gap-3 flex-wrap">
                            <button
                                type="button"
                                className="explore-button"
                                onClick={handleExplore}
                            >
                                <i className="bi bi-grid me-1"></i> Explore Wholesale Catalog
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-light px-4 py-2 fw-semibold"
                                onClick={() => {
                                    const loginSec = document.getElementById("login-section");
                                    if (loginSec) loginSec.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                <i className="bi bi-person-circle me-1"></i> Portal Login
                            </button>
                        </div>

                        {/* Quick Demo Credentials Help */}
                        <div className="mt-4 p-3 bg-dark bg-opacity-75 rounded border border-light border-opacity-25" style={{ maxWidth: "480px" }}>
                            <div className="text-warning small fw-bold mb-2">
                                <i className="bi bi-lightning-charge-fill me-1"></i> Quick Demo Logins (Click to Auto-Login):
                            </div>
                            <div className="d-flex gap-2 flex-wrap">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-info"
                                    onClick={() => loginDemo("buyer")}
                                >
                                    Buyer (Acme Ind)
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => loginDemo("vendor")}
                                >
                                    Vendor (Apex Supplies)
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-warning"
                                    onClick={() => loginDemo("admin")}
                                >
                                    Platform Admin
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: LOGIN / SIGNUP CARD */}
                    <div className="login-section" id="login-section">
                        <div className="login-card">
                            {/* TABS */}
                            <div className="login-tabs">
                                <button
                                    type="button"
                                    className={activeTab === "login" ? "login-tab active" : "login-tab"}
                                    onClick={() => setActiveTab("login")}
                                >
                                    Login
                                </button>

                                <button
                                    type="button"
                                    className={activeTab === "signup" ? "login-tab active" : "login-tab"}
                                    onClick={() => setActiveTab("signup")}
                                >
                                    Register Business
                                </button>
                            </div>

                            {/* LOGIN FORM */}
                            {activeTab === "login" && (
                                <div className="form-container">
                                    <h2>Business Portal Login</h2>
                                    <p style={{ fontSize: "0.85rem", color: backendConnected ? "green" : "#888" }}>Backend: {backendConnected ? "Connected" : "Not connected / demo mode"}</p>

                                    <form onSubmit={handleLogin}>
                                        <div className="form-group">
                                            <label>Select Role</label>
                                            <select
                                                className="form-select"
                                                value={selectedRole}
                                                onChange={(e) => setSelectedRole(e.target.value)}
                                            >
                                                <option value="buyer">Corporate Buyer / Procurement</option>
                                                <option value="vendor">Verified Vendor / Supplier</option>
                                                <option value="admin">Platform Administrator</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Official Email ID</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="e.g. buyer@acme.com or vendor@apex.com"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter Password"
                                                required
                                            />
                                        </div>

                                        <button type="submit" className="login-submit">
                                            Sign In to Portal
                                        </button>

                                        <button
                                            type="button"
                                            className="forgot-button"
                                            onClick={() => window.alert("Default demo credentials: buyer@acme.com / vendor@apex.com / admin@bizhub.com")}
                                        >
                                            Need Demo Credentials? Click Here
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* SIGNUP FORM */}
                            {activeTab === "signup" && (
                                <div className="form-container">
                                    <h2>Register New Enterprise</h2>

                                    <form onSubmit={handleSignup}>
                                        <div className="form-group">
                                            <label>Account Type</label>
                                            <select
                                                className="form-select"
                                                value={signupRole}
                                                onChange={(e) => setSignupRole(e.target.value)}
                                            >
                                                <option value="buyer">Business Buyer (Procurement)</option>
                                                <option value="vendor">Supplier / Wholesaler (Vendor)</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Company / Firm Name *</label>
                                            <input
                                                type="text"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                placeholder="e.g. Coastal Enterprises Ltd"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>GSTIN Number</label>
                                            <input
                                                type="text"
                                                value={gstNumber}
                                                onChange={(e) => setGstNumber(e.target.value)}
                                                placeholder="e.g. 37AAACA1234A1Z5"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Authorized Contact Person *</label>
                                            <input
                                                type="text"
                                                value={ownerName}
                                                onChange={(e) => setOwnerName(e.target.value)}
                                                placeholder="Full Name"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Corporate Email ID *</label>
                                            <input
                                                type="email"
                                                value={signupEmail}
                                                onChange={(e) => setSignupEmail(e.target.value)}
                                                placeholder="company@domain.com"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Password *</label>
                                            <input
                                                type="password"
                                                value={signupPassword}
                                                onChange={(e) => setSignupPassword(e.target.value)}
                                                placeholder="Create Password"
                                                required
                                            />
                                        </div>

                                        <button type="submit" className="signup-submit">
                                            Register & Open Account
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= PLATFORM STATS BANNER ================= */}
            <section className="py-4 bg-primary text-white">
                <div className="container">
                    <div className="row text-center g-3">
                        <div className="col-md-3 col-6">
                            <h2 className="fw-bold mb-0">500+</h2>
                            <div className="small text-white-50">Verified Industrial Suppliers</div>
                        </div>
                        <div className="col-md-3 col-6">
                            <h2 className="fw-bold mb-0">10,000+</h2>
                            <div className="small text-white-50">Active Corporate Buyers</div>
                        </div>
                        <div className="col-md-3 col-6">
                            <h2 className="fw-bold mb-0">₹50 Cr+</h2>
                            <div className="small text-white-50">Annual Trade Volume</div>
                        </div>
                        <div className="col-md-3 col-6">
                            <h2 className="fw-bold mb-0">100%</h2>
                            <div className="small text-white-50">GST & Escrow Protected</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FEATURED WHOLESALE CATEGORIES ================= */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-dark">Wholesale Sourcing Categories</h2>
                        <p className="text-secondary">Procure directly from certified manufacturers across key industrial sectors</p>
                    </div>

                    <div className="row g-4">
                        {storeData.categories.map((cat) => {
                            const count = storeData.products.filter((p) => p.categoryId === cat.categoryId).length;
                            return (
                                <div className="col-lg-4 col-md-6" key={cat.categoryId}>
                                    <div
                                        className="card h-100 shadow-sm border-0 p-4 text-center cursor-pointer"
                                        style={{ cursor: "pointer", transition: "transform 0.2s" }}
                                        onClick={() => setPage("catalog")}
                                    >
                                        <div
                                            className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle"
                                            style={{ width: "60px", height: "60px", fontSize: "28px" }}
                                        >
                                            <i className={`bi ${cat.icon || 'bi-boxes'}`}></i>
                                        </div>
                                        <h5 className="fw-bold text-dark mb-2">{cat.name}</h5>
                                        <p className="text-secondary small mb-3">{cat.description}</p>
                                        <div className="mt-auto">
                                            <span className="badge bg-light text-primary border">
                                                {count} Products Available →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================= POPULAR WHOLESALE PRODUCTS SHOWCASE ================= */}
            <section className="py-5">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                        <div>
                            <h2 className="fw-bold text-dark mb-1">Featured Wholesale Deals</h2>
                            <p className="text-secondary mb-0">High-demand commercial inventory ready for immediate pallet dispatch</p>
                        </div>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => setPage("catalog")}
                        >
                            View All Products ({storeData.products.length}) →
                        </button>
                    </div>

                    <div className="row g-4">
                        {storeData.products.slice(0, 4).map((prod) => (
                            <div className="col-lg-3 col-md-6" key={prod.productId}>
                                <div className="product-grid-card">
                                    <div className="product-card-top">
                                        <div className="product-icon-holder">
                                            <i className="bi bi-box-seam"></i>
                                        </div>
                                        {prod.badge && <span className="product-badge-tag">{prod.badge}</span>}
                                    </div>
                                    <div className="product-card-body">
                                        <div className="product-vendor-info">
                                            <i className="bi bi-shop text-primary"></i>
                                            <span className="text-truncate">{prod.vendorName}</span>
                                        </div>
                                        <div className="product-title">{prod.name}</div>
                                        <div className="product-desc">{prod.description}</div>

                                        <div className="product-pricing-box">
                                            <div className="d-flex justify-content-between align-items-baseline">
                                                <span className="product-unit-price">
                                                    ₹{prod.unitPrice.toLocaleString("en-IN")}
                                                </span>
                                                <span className="text-muted small">per {prod.unit}</span>
                                            </div>
                                            <div className="product-moq-label mt-1">
                                                <i className="bi bi-layers me-1"></i> MOQ: {prod.moq} {prod.unit}
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm w-100"
                                            onClick={() => {
                                                addToCart(prod, prod.moq);
                                                window.alert(`Added ${prod.moq} ${prod.unit} of "${prod.name}" to cart!`);
                                            }}
                                        >
                                            <i className="bi bi-cart-plus me-1"></i> Quick Add MOQ ({prod.moq})
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= PLATFORM PILLARS / WHY CHOOSE ================= */}
            <section className="features-section">
                <div className="features-container">
                    <h2>Why Choose Our Multi-Vendor B2B Platform?</h2>
                    <p className="section-subtitle">
                        Built from ground up to solve offline procurement inefficiencies, opaque pricing, and fragmented logistics.
                    </p>

                    <div className="feature-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="bi bi-shop"></i>
                            </div>
                            <h3>Verified Vendors</h3>
                            <p>Connect with GST-verified suppliers, manufacturers, and OEM distributors.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="bi bi-box-seam"></i>
                            </div>
                            <h3>Bulk Tier Pricing</h3>
                            <p>Transparent wholesale volume slabs with automated MOQ validation and tax invoices.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="bi bi-file-earmark-text"></i>
                            </div>
                            <h3>Request for Quote (RFQ)</h3>
                            <p>Broadcast custom sourcing requirements and receive competitive quotes from multiple suppliers.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="bi bi-credit-card-2-front"></i>
                            </div>
                            <h3>Flexible Net-30 Terms</h3>
                            <p>Support for Purchase Orders, Net 30/60 day credit terms, NEFT wire transfers, and escrow protection.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default Home;