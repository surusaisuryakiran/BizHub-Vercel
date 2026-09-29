/* =========================================================
   ABOUT PAGE
   Multi-Vendor B2B E-Commerce Platform
========================================================= */

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function About({ setPage, currentUser, setCurrentUser, cart = [] }) {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* ================= NAVBAR ================= */}
            <Navbar
                setPage={setPage}
                activePage="about"
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                cartCount={cartCount}
            />

            {/* ================= ABOUT HERO ================= */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <img
                        src="/images/logo.png"
                        className="logo"
                        alt="MultiVendor B2B Logo"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <h1>About Our B2B Platform</h1>
                    <p>
                        A unified digital marketplace connecting manufacturers, wholesalers,
                        distributors, and corporate buyers for streamlined bulk procurement.
                    </p>
                </div>
            </section>

            {/* ================= PROBLEM & SOLUTION ================= */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <span className="badge bg-primary px-3 py-2 mb-3">Project Background</span>
                            <h2 className="fw-bold text-dark">Why Multi-Vendor B2B?</h2>
                            <p className="text-secondary">
                                In traditional business-to-business (B2B) purchasing, organizations heavily depend on offline suppliers, manual phone calls, fragmented emails, and disparate paper invoices to compare prices, verify supplier credentials, and manage orders.
                            </p>
                            <p className="text-secondary">
                                These traditional methods are time-consuming, opaque in pricing, and prone to logistical bottlenecks when coordinating across dozens of industrial vendors.
                            </p>
                            <p className="text-secondary">
                                <strong>BizHub B2B Platform</strong> overcomes these industry hurdles by offering a secure, centralized digital trading hub with real-time stock visibility, Minimum Order Quantity (MOQ) rules, custom RFQ bidding, Net-30 credit terms, and GST invoicing.
                            </p>
                        </div>

                        <div className="col-lg-6">
                            <div className="p-4 bg-light rounded border">
                                <h4 className="fw-bold mb-3 text-primary">
                                    <i className="bi bi-gear-wide-connected me-2"></i> Key Project Highlights
                                </h4>
                                <ul className="list-unstyled mb-0">
                                    <li className="mb-3 d-flex align-items-start gap-2">
                                        <i className="bi bi-check-circle-fill text-success mt-1"></i>
                                        <div>
                                            <strong>Role-Based Access Control (RBAC):</strong>
                                            <div className="text-muted small">Dedicated tailored portals for Buyers, Suppliers/Vendors, and Platform Administrators.</div>
                                        </div>
                                    </li>
                                    <li className="mb-3 d-flex align-items-start gap-2">
                                        <i className="bi bi-check-circle-fill text-success mt-1"></i>
                                        <div>
                                            <strong>Tiered Wholesale Pricing & MOQ:</strong>
                                            <div className="text-muted small">Automatic quantity slabs, volume discount calculation, and MOQ validation.</div>
                                        </div>
                                    </li>
                                    <li className="mb-3 d-flex align-items-start gap-2">
                                        <i className="bi bi-check-circle-fill text-success mt-1"></i>
                                        <div>
                                            <strong>Request for Quotation (RFQ) System:</strong>
                                            <div className="text-muted small">Buyers can request custom manufacturing quotes and receive competitive supplier bids.</div>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-start gap-2">
                                        <i className="bi bi-check-circle-fill text-success mt-1"></i>
                                        <div>
                                            <strong>Full Order Lifecycle Tracking:</strong>
                                            <div className="text-muted small">Visual 5-step status progression from Pending → Confirmed → Processing → Shipped → Delivered.</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= ARCHITECTURE & DESIGN ================= */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="badge bg-secondary px-3 py-2 mb-2">OOAD Architecture</span>
                        <h2 className="fw-bold text-dark">System Architecture & Layering</h2>
                        <p className="text-secondary">Designed adhering to Object-Oriented Analysis & Design principles</p>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 p-4">
                                <div className="stat-icon blue mb-3">
                                    <i className="bi bi-display"></i>
                                </div>
                                <h5 className="fw-bold">1. Presentation Layer</h5>
                                <p className="text-secondary small">
                                    Modular React components with responsive Bootstrap 5 styling, state hooks, interactive modals, and real-time client-side calculation of GST taxes, freight, and volume discounts.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 p-4">
                                <div className="stat-icon amber mb-3">
                                    <i className="bi bi-cpu"></i>
                                </div>
                                <h5 className="fw-bold">2. Application & Business Logic</h5>
                                <p className="text-secondary small">
                                    Encapsulates validation rules: verifying minimum order thresholds, inventory stock reservation, RFQ state machine transitions, and vendor verification workflows.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 p-4">
                                <div className="stat-icon green mb-3">
                                    <i className="bi bi-database-check"></i>
                                </div>
                                <h5 className="fw-bold">3. Data Layer & Storage</h5>
                                <p className="text-secondary small">
                                    Normalized relational data models for Users, Vendors, Products, Categories, RFQs, Orders, and Reviews with persistent browser localStorage synchronization.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= TEAM MEMBERS ================= */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="badge bg-info text-dark px-3 py-2 mb-2">Academic Project</span>
                        <h2 className="fw-bold text-dark">OOAD & WT Lab Project Team - 1</h2>
                        <p className="text-secondary">Developed as part of Object Oriented Analysis and Design / Web Technologies Laboratory</p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-2 col-md-4 col-sm-6 text-center">
                            <div className="p-3 bg-light rounded border h-100">
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "50px", height: "50px", fontSize: "20px" }}>
                                    <i className="bi bi-person-fill"></i>
                                </div>
                                <h6 className="fw-bold mb-1">S. Sai Surya Kiran</h6>
                                <div className="text-muted small">a24126511048</div>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-4 col-sm-6 text-center">
                            <div className="p-3 bg-light rounded border h-100">
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "50px", height: "50px", fontSize: "20px" }}>
                                    <i className="bi bi-person-fill"></i>
                                </div>
                                <h6 className="fw-bold mb-1">B. Bhargavi</h6>
                                <div className="text-muted small">a24126511006</div>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-4 col-sm-6 text-center">
                            <div className="p-3 bg-light rounded border h-100">
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "50px", height: "50px", fontSize: "20px" }}>
                                    <i className="bi bi-person-fill"></i>
                                </div>
                                <h6 className="fw-bold mb-1">Sk. Basheera</h6>
                                <div className="text-muted small">a24126511046</div>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-4 col-sm-6 text-center">
                            <div className="p-3 bg-light rounded border h-100">
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "50px", height: "50px", fontSize: "20px" }}>
                                    <i className="bi bi-person-fill"></i>
                                </div>
                                <h6 className="fw-bold mb-1">P. Sai Kumar</h6>
                                <div className="text-muted small">a24126511037</div>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-4 col-sm-6 text-center">
                            <div className="p-3 bg-light rounded border h-100">
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "50px", height: "50px", fontSize: "20px" }}>
                                    <i className="bi bi-person-fill"></i>
                                </div>
                                <h6 className="fw-bold mb-1">G. Hemanth Kumar</h6>
                                <div className="text-muted small">a24126511017</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <Footer />
        </div>
    );
}

export default About;