/* =========================================================
   CONTACT PAGE
   Multi-Vendor B2B E-Commerce Platform
========================================================= */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Contact({ setPage, currentUser, setCurrentUser, cart = [] }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [inquiryType, setInquiryType] = useState("Supplier Onboarding");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) {
            window.alert("Please fill in all required fields.");
            return;
        }

        window.alert(
            `Thank you, ${name}! Your B2B inquiry regarding "${inquiryType}" has been received. Our trade desk will contact ${email} within 24 business hours.`
        );

        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* ================= NAVBAR ================= */}
            <Navbar
                setPage={setPage}
                activePage="contact"
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                cartCount={cartCount}
            />

            {/* ================= CONTACT HERO ================= */}
            <section className="contact-hero">
                <div className="contact-hero-content">
                    <img
                        src="/images/logo.png"
                        className="logo"
                        alt="MultiVendor B2B Logo"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <h1>Get in Touch with Trade Support</h1>
                    <p>
                        We're here to assist manufacturers, corporate procurement teams, and suppliers.
                    </p>
                </div>
            </section>

            {/* ================= CONTACT INFORMATION CARDS ================= */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row g-4 mb-5">
                        {/* EMAIL */}
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 contact-card p-4 text-center">
                                <div className="stat-icon blue mx-auto mb-3">
                                    <i className="bi bi-envelope-fill"></i>
                                </div>
                                <h4 className="fw-bold">Email Support</h4>
                                <p className="text-secondary small mb-1">General Trade Inquiries:</p>
                                <a href="mailto:support@multivendorb2b.com" className="fw-bold text-primary text-decoration-none">
                                    support@bizhubb2b.in
                                </a>
                            </div>
                        </div>

                        {/* PHONE */}
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 contact-card p-4 text-center">
                                <div className="stat-icon green mx-auto mb-3">
                                    <i className="bi bi-telephone-fill"></i>
                                </div>
                                <h4 className="fw-bold">Trade Desk Phone</h4>
                                <p className="text-secondary small mb-1">Mon - Sat (9:00 AM - 6:00 PM):</p>
                                <div className="fw-bold text-success">+91 (0891) 255-8899</div>
                            </div>
                        </div>

                        {/* OFFICE */}
                        <div className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 contact-card p-4 text-center">
                                <div className="stat-icon amber mx-auto mb-3">
                                    <i className="bi bi-geo-alt-fill"></i>
                                </div>
                                <h4 className="fw-bold">Operations Hub</h4>
                                <p className="text-secondary small mb-0">
                                    Tech Hub Complex, MVP Colony,<br />
                                    Visakhapatnam, Andhra Pradesh, India - 530017
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CONTACT FORM */}
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card shadow-sm border-0 p-4 p-md-5 bg-white">
                                <h3 className="fw-bold text-dark mb-2 text-center">Submit a B2B Business Inquiry</h3>
                                <p className="text-secondary text-center small mb-4">
                                    Are you a manufacturer looking to sell wholesale or a business buyer with custom RFQ requirements?
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Your Full Name *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="e.g. S. Sai Surya Kiran"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Corporate Email ID *</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="name@company.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Enterprise / Company Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="e.g. Apex Industrial Supplies"
                                                value={company}
                                                onChange={(e) => setCompany(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Inquiry Category</label>
                                            <select
                                                className="form-select"
                                                value={inquiryType}
                                                onChange={(e) => setInquiryType(e.target.value)}
                                            >
                                                <option value="Supplier Onboarding">Supplier / Vendor Onboarding</option>
                                                <option value="Bulk Procurement">Bulk Wholesale Procurement</option>
                                                <option value="Custom RFQ Quotation">Custom Sourcing & RFQ Support</option>
                                                <option value="Net-30 Credit Facility">Net-30 / Credit Limit Request</option>
                                                <option value="Technical Support">Technical & Platform Help</option>
                                            </select>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-semibold">Detailed Message / Requirement *</label>
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                placeholder="Please specify your product categories, estimated annual order volume, or questions..."
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                required
                                            ></textarea>
                                        </div>

                                        <div className="col-12 text-center mt-4">
                                            <button type="submit" className="btn btn-primary px-5 py-2 fw-bold">
                                                <i className="bi bi-send me-1"></i> Submit Trade Inquiry
                                            </button>
                                        </div>
                                    </div>
                                </form>
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

export default Contact;