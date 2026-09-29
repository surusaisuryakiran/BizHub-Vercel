/* =========================================================
   BUYER DASHBOARD & PORTAL
   Multi-Vendor B2B E-Commerce Platform
========================================================= */

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function BuyerDashboard({
    storeData,
    currentUser,
    setCurrentUser,
    setPage,
    createRfq,
    acceptRfqQuote,
    addVendorReview
}) {
    const [activeTab, setActiveTab] = useState("orders"); // orders, rfq, reviews, profile
    const [selectedOrderForTrack, setSelectedOrderForTrack] = useState(null);

    // New RFQ Form State
    const [showRfqModal, setShowRfqModal] = useState(false);
    const [rfqTitle, setRfqTitle] = useState("");
    const [rfqCategory, setRfqCategory] = useState("Industrial Tools & Safety");
    const [rfqQty, setRfqQty] = useState("");
    const [rfqTargetPrice, setRfqTargetPrice] = useState("");
    const [rfqDate, setRfqDate] = useState("");
    const [rfqSpecs, setRfqSpecs] = useState("");

    // Review Form State
    const [reviewVendorId, setReviewVendorId] = useState("VEN-001");
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");

    // Filter orders and RFQs for current buyer
    const buyerOrders = storeData.orders.filter(
        (o) => o.buyerId === (currentUser?.userId || "USR-001") || o.buyerEmail === currentUser?.email
    );

    const buyerRfqs = storeData.rfqs.filter(
        (r) => r.buyerId === (currentUser?.userId || "USR-001")
    );

    const handleCreateRfqSubmit = (e) => {
        e.preventDefault();
        if (!rfqTitle.trim() || !rfqQty.trim()) {
            window.alert("Please provide Product Title and Required Quantity.");
            return;
        }

        const newRfq = {
            rfqId: "RFQ-2026-" + Math.floor(400 + Math.random() * 500),
            buyerId: currentUser?.userId || "USR-001",
            buyerName: currentUser?.name || "Rajesh Sharma",
            companyName: currentUser?.companyName || "Acme Industrial Enterprises",
            productTitle: rfqTitle,
            category: rfqCategory,
            targetQuantity: rfqQty,
            targetPrice: rfqTargetPrice ? `₹${rfqTargetPrice}` : "Open to quotes",
            requiredByDate: rfqDate || "2026-09-30",
            specifications: rfqSpecs || "Standard commercial B2B specifications.",
            status: "Open",
            createdDate: new Date().toISOString().split("T")[0],
            responses: []
        };

        createRfq(newRfq);
        window.alert(`RFQ #${newRfq.rfqId} submitted to all verified suppliers!`);
        setShowRfqModal(false);
        setRfqTitle("");
        setRfqQty("");
        setRfqTargetPrice("");
        setRfqSpecs("");
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!reviewComment.trim()) {
            window.alert("Please enter your review comments.");
            return;
        }

        const newReview = {
            reviewId: "REV-" + Math.floor(10 + Math.random() * 90),
            vendorId: reviewVendorId,
            buyerName: currentUser?.companyName || "Acme Industrial Enterprises",
            rating: parseInt(reviewRating),
            comment: reviewComment,
            date: new Date().toISOString().split("T")[0]
        };

        addVendorReview(newReview);
        window.alert("Thank you! Your vendor rating and review has been published.");
        setReviewComment("");
    };

    // Tracking Step Helper
    const trackingSteps = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"];

    const getStepClass = (stepName, currentStatus) => {
        const orderIndex = trackingSteps.indexOf(currentStatus);
        const stepIndex = trackingSteps.indexOf(stepName);
        if (currentStatus === "Cancelled") return "cancelled";
        if (stepIndex < orderIndex) return "completed";
        if (stepIndex === orderIndex) return "current";
        return "";
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar
                setPage={setPage}
                activePage="buyer-dashboard"
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
            />

            <div className="page-header-box">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h1>Buyer Procurement Portal</h1>
                            <p>
                                Welcome back, <strong>{currentUser?.name || "Rajesh Sharma"}</strong> ({currentUser?.companyName || "Acme Industrial Enterprises"})
                            </p>
                        </div>
                        <button
                            type="button"
                            className="btn btn-warning fw-bold"
                            onClick={() => setShowRfqModal(true)}
                        >
                            <i className="bi bi-plus-circle me-1"></i> Request Custom Quotation (RFQ)
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mb-5 flex-grow-1">
                {/* Dashboard Navigation Tabs */}
                <div className="dashboard-tabs">
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab("orders")}
                    >
                        <i className="bi bi-box-seam"></i> Order History & Tracking ({buyerOrders.length})
                    </button>
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'rfq' ? 'active' : ''}`}
                        onClick={() => setActiveTab("rfq")}
                    >
                        <i className="bi bi-file-earmark-text"></i> My RFQs & Supplier Quotes ({buyerRfqs.length})
                    </button>
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab("reviews")}
                    >
                        <i className="bi bi-star"></i> Vendor Ratings & Reviews
                    </button>
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab("profile")}
                    >
                        <i className="bi bi-building"></i> Company Profile & GSTIN
                    </button>
                </div>

                {/* TAB 1: ORDERS & TRACKING */}
                {activeTab === "orders" && (
                    <div>
                        {buyerOrders.length === 0 ? (
                            <div className="card text-center py-5 shadow-sm border-0">
                                <div className="card-body">
                                    <i className="bi bi-bag-x text-muted" style={{ fontSize: "48px" }}></i>
                                    <h5 className="mt-3">No Orders Placed Yet</h5>
                                    <p className="text-muted">Explore wholesale catalog to place your first bulk order.</p>
                                    <button className="btn btn-primary" onClick={() => setPage("catalog")}>
                                        Explore Catalog
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="row g-4">
                                {buyerOrders.map((ord) => (
                                    <div className="col-12" key={ord.orderId}>
                                        <div className="card shadow-sm border-0">
                                            <div className="card-header bg-light d-flex justify-content-between align-items-center flex-wrap gap-2 py-3">
                                                <div>
                                                    <span className="fw-bold text-dark fs-6 me-2">
                                                        Order #{ord.orderId}
                                                    </span>
                                                    <span className="text-muted small">Placed on {ord.orderDate}</span>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className={`status-pill ${ord.status.toLowerCase()}`}>
                                                        {ord.status}
                                                    </span>
                                                    <span className="badge bg-secondary">
                                                        {ord.paymentStatus}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="card-body p-4">
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <h6 className="fw-bold text-muted small text-uppercase">Supplier & Items:</h6>
                                                        <div className="fw-bold text-primary mb-2">
                                                            <i className="bi bi-shop me-1"></i> {ord.vendorName}
                                                        </div>
                                                        <ul className="list-group list-group-flush small mb-0">
                                                            {ord.items.map((item, idx) => (
                                                                <li key={idx} className="list-group-item px-0 d-flex justify-content-between">
                                                                    <span>{item.quantity}x {item.name}</span>
                                                                    <span className="fw-semibold">₹{item.subtotal?.toLocaleString("en-IN")}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div className="col-md-6 border-start-md">
                                                        <h6 className="fw-bold text-muted small text-uppercase">Payment & Shipping:</h6>
                                                        <div className="small mb-1">
                                                            <strong>Payment Term:</strong> {ord.paymentMethod}
                                                        </div>
                                                        <div className="small mb-1">
                                                            <strong>Grand Total (incl. 18% GST):</strong>{" "}
                                                            <span className="fs-6 fw-bold text-success">
                                                                ₹{ord.totalAmount?.toLocaleString("en-IN")}
                                                            </span>
                                                        </div>
                                                        <div className="small mb-2">
                                                            <strong>Delivery Address:</strong> {ord.shippingAddress}
                                                        </div>
                                                        <div className="d-flex gap-2 mt-3">
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-primary btn-sm"
                                                                onClick={() => setSelectedOrderForTrack(selectedOrderForTrack?.orderId === ord.orderId ? null : ord)}
                                                            >
                                                                <i className="bi bi-truck me-1"></i>
                                                                {selectedOrderForTrack?.orderId === ord.orderId ? "Hide Tracking" : "Live Shipment Tracker"}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary btn-sm"
                                                                onClick={() => window.alert(`Tax Invoice for Order ${ord.orderId} downloaded in PDF format.`)}
                                                            >
                                                                <i className="bi bi-file-earmark-pdf me-1"></i> GST Invoice
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* VISUAL ORDER TRACKER TIMELINE */}
                                                {selectedOrderForTrack?.orderId === ord.orderId && (
                                                    <div className="mt-4 p-3 bg-light rounded border">
                                                        <h6 className="fw-bold text-dark mb-2">
                                                            <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                                                            Real-Time Logistics Status & Courier Dispatch
                                                        </h6>
                                                        <div className="small text-muted mb-3">
                                                            Courier: <strong>{ord.courier || "Road Freight"}</strong> | Tracking AWB: <strong>{ord.trackingNumber || "Pending"}</strong>
                                                        </div>

                                                        <div className="timeline-tracker">
                                                            {trackingSteps.map((step, idx) => (
                                                                <div className={`timeline-step ${getStepClass(step, ord.status)}`} key={step}>
                                                                    <div className="timeline-step-dot">
                                                                        {idx + 1}
                                                                    </div>
                                                                    <div className="timeline-step-label">{step}</div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Status History Log */}
                                                        <div className="mt-3 bg-white p-3 rounded border">
                                                            <div className="fw-bold small text-muted mb-2">Order Activity Log:</div>
                                                            {ord.history?.map((h, i) => (
                                                                <div key={i} className="small text-secondary mb-1">
                                                                    <span className="text-dark fw-semibold">• [{h.time}]</span> {h.status}: {h.note}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 2: RFQS & SUPPLIER QUOTES */}
                {activeTab === "rfq" && (
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold mb-0">My Custom Sourcing Inquiries (RFQ)</h5>
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() => setShowRfqModal(true)}
                            >
                                <i className="bi bi-plus-lg me-1"></i> Submit New RFQ
                            </button>
                        </div>

                        {buyerRfqs.length === 0 ? (
                            <div className="card text-center py-5 shadow-sm border-0">
                                <div className="card-body">
                                    <i className="bi bi-file-earmark-text text-muted" style={{ fontSize: "48px" }}></i>
                                    <h5 className="mt-3">No Quotation Requests Created</h5>
                                    <p className="text-muted">Need custom specifications, custom printing, or large volume bulk quotes?</p>
                                    <button className="btn btn-primary" onClick={() => setShowRfqModal(true)}>
                                        Create First RFQ
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="row g-4">
                                {buyerRfqs.map((rfq) => (
                                    <div className="col-12" key={rfq.rfqId}>
                                        <div className="card shadow-sm border-0">
                                            <div className="card-header bg-light d-flex justify-content-between align-items-center flex-wrap py-3">
                                                <div>
                                                    <span className="fw-bold fs-6 text-dark me-2">{rfq.productTitle}</span>
                                                    <span className="badge bg-secondary">{rfq.category}</span>
                                                </div>
                                                <span className={`status-pill ${rfq.status.toLowerCase()}`}>
                                                    {rfq.status}
                                                </span>
                                            </div>
                                            <div className="card-body p-4">
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-3">
                                                        <div className="small text-muted">Target Quantity:</div>
                                                        <div className="fw-bold">{rfq.targetQuantity}</div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="small text-muted">Target Price:</div>
                                                        <div className="fw-bold">{rfq.targetPrice}</div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="small text-muted">Required Delivery By:</div>
                                                        <div className="fw-bold">{rfq.requiredByDate}</div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="small text-muted">RFQ Ref ID:</div>
                                                        <div className="fw-bold">{rfq.rfqId}</div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="small text-muted">Technical Specifications:</div>
                                                        <div className="small text-secondary">{rfq.specifications}</div>
                                                    </div>
                                                </div>

                                                {/* Supplier Responses */}
                                                <div className="border-top pt-3">
                                                    <h6 className="fw-bold text-dark mb-2">
                                                        <i className="bi bi-chat-quote-fill text-primary me-1"></i>
                                                        Supplier Quotation Responses ({rfq.responses?.length || 0})
                                                    </h6>
                                                    {(!rfq.responses || rfq.responses.length === 0) ? (
                                                        <div className="small text-muted p-2 bg-light rounded">
                                                            Awaiting quotes from suppliers. Verified vendors have been notified.
                                                        </div>
                                                    ) : (
                                                        rfq.responses.map((resp, rIdx) => (
                                                            <div className="p-3 bg-light rounded border mb-2" key={rIdx}>
                                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-1">
                                                                    <div className="fw-bold text-primary">
                                                                        <i className="bi bi-shop me-1"></i> {resp.vendorName}
                                                                    </div>
                                                                    <div className="fw-bold text-success fs-6">
                                                                        Quoted: {resp.quotedPrice}
                                                                    </div>
                                                                </div>
                                                                <div className="small text-secondary mb-2">
                                                                    Lead Time: <strong>{resp.leadTime}</strong> | Response Date: {resp.responseDate}
                                                                </div>
                                                                <div className="small text-muted mb-2">
                                                                    <strong>Remarks:</strong> {resp.remarks}
                                                                </div>
                                                                {rfq.status !== "Accepted" && (
                                                                    <button
                                                                        className="btn btn-sm btn-success"
                                                                        onClick={() => {
                                                                            acceptRfqQuote(rfq.rfqId, resp.vendorId);
                                                                            window.alert(`Accepted quotation from ${resp.vendorName}! A formal commercial purchase contract has been initiated.`);
                                                                        }}
                                                                    >
                                                                        <i className="bi bi-check2-circle me-1"></i> Accept Quotation & Issue Contract
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 3: VENDOR REVIEWS */}
                {activeTab === "reviews" && (
                    <div className="row g-4">
                        <div className="col-lg-5">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0 fw-bold">Submit Vendor Feedback</h5>
                                </div>
                                <div className="card-body p-4">
                                    <form onSubmit={handleReviewSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Select Supplier / Vendor:</label>
                                            <select
                                                className="form-select"
                                                value={reviewVendorId}
                                                onChange={(e) => setReviewVendorId(e.target.value)}
                                            >
                                                {storeData.vendors.map((v) => (
                                                    <option key={v.vendorId} value={v.vendorId}>
                                                        {v.businessName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Rating (1 to 5 Stars):</label>
                                            <select
                                                className="form-select"
                                                value={reviewRating}
                                                onChange={(e) => setReviewRating(e.target.value)}
                                            >
                                                <option value="5">★★★★★ - 5 Stars (Excellent Quality & Fast Delivery)</option>
                                                <option value="4">★★★★☆ - 4 Stars (Good Performance)</option>
                                                <option value="3">★★★☆☆ - 3 Stars (Average Service)</option>
                                                <option value="2">★★☆☆☆ - 2 Stars (Needs Improvement)</option>
                                                <option value="1">★☆☆☆☆ - 1 Star (Poor Quality)</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Review Comments:</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                placeholder="Describe product quality, packing, and dispatch speed..."
                                                value={reviewComment}
                                                onChange={(e) => setReviewComment(e.target.value)}
                                                required
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100 fw-bold">
                                            Publish Review
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0 fw-bold">Recent Verified B2B Reviews</h5>
                                </div>
                                <div className="card-body p-4">
                                    {storeData.reviews.map((rev) => {
                                        const vendor = storeData.vendors.find((v) => v.vendorId === rev.vendorId);
                                        return (
                                            <div key={rev.reviewId} className="p-3 bg-light rounded border mb-3">
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <span className="fw-bold text-dark">{vendor?.businessName || "Vendor"}</span>
                                                    <span className="text-warning">{"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}</span>
                                                </div>
                                                <p className="small text-secondary mb-2">{rev.comment}</p>
                                                <div className="small text-muted">
                                                    Reviewed by <strong>{rev.buyerName}</strong> on {rev.date}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 4: COMPANY PROFILE */}
                {activeTab === "profile" && (
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0 fw-bold">Buyer Company & Compliance Details</h5>
                        </div>
                        <div className="card-body p-4">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label text-muted small">Registered Entity Name:</label>
                                    <div className="fw-bold">{currentUser?.companyName || "Acme Industrial Enterprises"}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small">GSTIN Number:</label>
                                    <div className="fw-bold">{currentUser?.gstNumber || "37AAACA1234A1Z5"}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small">Primary Procurement Officer:</label>
                                    <div className="fw-bold">{currentUser?.name || "Rajesh Sharma"}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small">Official Email:</label>
                                    <div className="fw-bold">{currentUser?.email || "buyer@acme.com"}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small">Contact Phone:</label>
                                    <div className="fw-bold">{currentUser?.phone || "+91 98765 11223"}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small">Credit Rating / Account Status:</label>
                                    <div><span className="badge bg-success">Tier 1 Approved (Net-30 Eligible)</span></div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-muted small">Registered Dock Delivery Address:</label>
                                    <div className="p-3 bg-light rounded border">
                                        {currentUser?.address || "Plot 45, Auto Nagar, Gajuwaka, Visakhapatnam, Andhra Pradesh - 530026"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* CREATE RFQ MODAL */}
            {showRfqModal && (
                <div className="b2b-modal-overlay" onClick={() => setShowRfqModal(false)}>
                    <div className="b2b-modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="b2b-modal-header">
                            <h4>Create Sourcing Request (RFQ)</h4>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowRfqModal(false)}
                            ></button>
                        </div>
                        <form onSubmit={handleCreateRfqSubmit}>
                            <div className="b2b-modal-body">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Product Title / Material Required *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g., Heavy Industrial Fasteners Grade 8.8 (50,000 pcs)"
                                        value={rfqTitle}
                                        onChange={(e) => setRfqTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="row g-2 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Category</label>
                                        <select
                                            className="form-select"
                                            value={rfqCategory}
                                            onChange={(e) => setRfqCategory(e.target.value)}
                                        >
                                            {storeData.categories.map((c) => (
                                                <option key={c.categoryId} value={c.name}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Required Quantity *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g., 5,000 Boxes / 500 Meters"
                                            value={rfqQty}
                                            onChange={(e) => setRfqQty(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row g-2 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Target Price per Unit</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g., 250 per box"
                                            value={rfqTargetPrice}
                                            onChange={(e) => setRfqTargetPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Required Delivery Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={rfqDate}
                                            onChange={(e) => setRfqDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Technical Specifications & Custom Requirements</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Specify material grade, tolerances, custom branding, certifications required..."
                                        value={rfqSpecs}
                                        onChange={(e) => setRfqSpecs(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="b2b-modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowRfqModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary fw-bold">
                                    Broadcast RFQ to Suppliers
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default BuyerDashboard;
