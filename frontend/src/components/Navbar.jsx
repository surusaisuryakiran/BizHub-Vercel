/* =========================================================
   NAVBAR COMPONENT
   Multi-Vendor B2B E-Commerce Platform
========================================================= */

function Navbar({
    setPage,
    activePage,
    currentUser,
    setCurrentUser,
    cartCount = 0
}) {
    return (
        <header>
            {/* Top Student/Demo Role Switcher Bar */}
            <div className="demo-role-banner">
                <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-primary text-white">OOAD Lab</span>
                    <span><strong>Active Profile:</strong> {currentUser ? `${currentUser.name} (${currentUser.role.toUpperCase()})` : "Guest"}</span>
                </div>
                <div className="role-btn-group">
                    <span className="text-secondary me-1">Switch Role:</span>
                    <button
                        type="button"
                        className={`demo-role-btn ${currentUser?.role === 'buyer' ? 'active' : ''}`}
                        onClick={() => {
                            setCurrentUser({
                                userId: "USR-001",
                                name: "Rajesh Sharma",
                                email: "buyer@acme.com",
                                role: "buyer",
                                companyName: "Acme Industrial Enterprises"
                            });
                            setPage("catalog");
                        }}
                    >
                        <i className="bi bi-person me-1"></i> Buyer (Acme)
                    </button>
                    <button
                        type="button"
                        className={`demo-role-btn ${currentUser?.role === 'vendor' ? 'active' : ''}`}
                        onClick={() => {
                            setCurrentUser({
                                userId: "USR-002",
                                name: "Suresh Reddy",
                                email: "vendor@apex.com",
                                role: "vendor",
                                vendorId: "VEN-001",
                                companyName: "Apex Industrial Supplies Ltd"
                            });
                            setPage("vendor-dashboard");
                        }}
                    >
                        <i className="bi bi-shop me-1"></i> Vendor (Apex)
                    </button>
                    <button
                        type="button"
                        className={`demo-role-btn ${currentUser?.role === 'admin' ? 'active' : ''}`}
                        onClick={() => {
                            setCurrentUser({
                                userId: "USR-004",
                                name: "System Admin",
                                email: "admin@bizhub.com",
                                role: "admin",
                                companyName: "BizHub Platform Admin"
                            });
                            setPage("admin-dashboard");
                        }}
                    >
                        <i className="bi bi-shield-lock me-1"></i> Admin
                    </button>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <nav className="main-navbar">
                <div className="navbar-inner">
                    {/* Brand Logo */}
                    <button
                        type="button"
                        className="navbar-brand"
                        onClick={() => setPage("home")}
                    >
                        <img
                            src="/images/logo.png"
                            alt="MultiVendor B2B Logo"
                            onError={(e) => {
                                e.target.style.display = "none";
                            }}
                        />
                        <span>BizHub B2B</span>
                    </button>

                    {/* Nav Links */}
                    <div className="navbar-links">
                        <button
                            type="button"
                            className={activePage === "home" ? "nav-button active" : "nav-button"}
                            onClick={() => setPage("home")}
                        >
                            Home
                        </button>

                        <button
                            type="button"
                            className={activePage === "catalog" ? "nav-button active" : "nav-button"}
                            onClick={() => setPage("catalog")}
                        >
                            <i className="bi bi-grid me-1"></i> Wholesale Catalog
                        </button>

                        {/* Role Based Quick Links */}
                        {currentUser?.role === "buyer" && (
                            <>
                                <button
                                    type="button"
                                    className={activePage === "buyer-dashboard" ? "nav-button active" : "nav-button"}
                                    onClick={() => setPage("buyer-dashboard")}
                                >
                                    <i className="bi bi-box me-1"></i> My Orders & RFQ
                                </button>
                                <button
                                    type="button"
                                    className={activePage === "cart" ? "nav-button active" : "nav-button"}
                                    onClick={() => setPage("cart")}
                                >
                                    <i className="bi bi-cart3 me-1"></i> Cart
                                    {cartCount > 0 && (
                                        <span className="badge bg-warning text-dark ms-1 rounded-pill">{cartCount}</span>
                                    )}
                                </button>
                            </>
                        )}

                        {currentUser?.role === "vendor" && (
                            <button
                                type="button"
                                className={activePage === "vendor-dashboard" ? "nav-button active" : "nav-button"}
                                onClick={() => setPage("vendor-dashboard")}
                            >
                                <i className="bi bi-speedometer2 me-1"></i> Vendor Portal
                            </button>
                        )}

                        {currentUser?.role === "admin" && (
                            <button
                                type="button"
                                className={activePage === "admin-dashboard" ? "nav-button active" : "nav-button"}
                                onClick={() => setPage("admin-dashboard")}
                            >
                                <i className="bi bi-gear me-1"></i> Admin Panel
                            </button>
                        )}

                        <button
                            type="button"
                            className={activePage === "about" ? "nav-button active" : "nav-button"}
                            onClick={() => setPage("about")}
                        >
                            About
                        </button>

                        <button
                            type="button"
                            className={activePage === "contact" ? "nav-button active" : "nav-button"}
                            onClick={() => setPage("contact")}
                        >
                            Contact
                        </button>

                        {/* Login/Logout Button */}
                        {currentUser ? (
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-light ms-2 px-3"
                                onClick={() => {
                                    setCurrentUser(null);
                                    setPage("home");
                                    window.alert("Logged out successfully.");
                                }}
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-sm btn-primary ms-2 px-3"
                                onClick={() => setPage("home")}
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;