/* =========================================================
   VENDOR DASHBOARD & STOREFRONT PORTAL
   Multi-Vendor B2B E-Commerce Platform
========================================================= */

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function VendorDashboard({
    storeData,
    currentUser,
    setCurrentUser,
    setPage,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    submitRfqQuote
}) {
    const [activeTab, setActiveTab] = useState("products"); // products, inventory, orders, rfqs, profile

    // Add / Edit Product Modal State
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [prodName, setProdName] = useState("");
    const [prodCategory, setProdCategory] = useState("CAT-001");
    const [prodSku, setProdSku] = useState("");
    const [prodPrice, setProdPrice] = useState("");
    const [prodUnit, setProdUnit] = useState("Pack (50 pcs)");
    const [prodMoq, setProdMoq] = useState(1);
    const [prodStock, setProdStock] = useState(50);
    const [prodDesc, setProdDesc] = useState("");
    const [prodBadge, setProdBadge] = useState("Wholesale");

    // Order Fulfillment Modal
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState("Confirmed");
    const [courierName, setCourierName] = useState("VRL Logistics Cargo");
    const [trackingNumber, setTrackingNumber] = useState("");
    const [statusNote, setStatusNote] = useState("");

    // RFQ Quote Modal
    const [selectedRfq, setSelectedRfq] = useState(null);
    const [quotePrice, setQuotePrice] = useState("");
    const [leadTime, setLeadTime] = useState("10 Working Days");
    const [quoteRemarks, setQuoteRemarks] = useState("");

    // Filter current vendor's products, orders, and relevant RFQs
    const vendorId = currentUser?.vendorId || "VEN-001";
    const vendorProfile = storeData.vendors.find((v) => v.vendorId === vendorId) || {
        businessName: currentUser?.companyName || "Apex Industrial Supplies Ltd",
        gstNumber: currentUser?.gstNumber || "37AAAPX5678B1Z2",
        rating: 4.8
    };

    const vendorProducts = storeData.products.filter((p) => p.vendorId === vendorId);
    const vendorOrders = storeData.orders.filter((o) => o.vendorId === vendorId);
    const pendingRfqs = storeData.rfqs.filter((r) => r.status === "Open" || r.status === "Quoted");

    // Metrics Calculation
    const totalRevenue = vendorOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const activeOrdersCount = vendorOrders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length;

    // Reset & Open Product Modal
    const handleOpenAddProduct = () => {
        setEditingProductId(null);
        setProdName("");
        setProdCategory("CAT-001");
        setProdSku("SKU-" + Math.floor(100 + Math.random() * 900));
        setProdPrice("");
        setProdUnit("Pack (50 pcs)");
        setProdMoq(2);
        setProdStock(50);
        setProdDesc("");
        setProdBadge("New Arrival");
        setShowProductModal(true);
    };

    const handleOpenEditProduct = (p) => {
        setEditingProductId(p.productId);
        setProdName(p.name);
        setProdCategory(p.categoryId);
        setProdSku(p.sku);
        setProdPrice(p.unitPrice);
        setProdUnit(p.unit);
        setProdMoq(p.moq);
        setProdStock(p.stock);
        setProdDesc(p.description);
        setProdBadge(p.badge || "Standard");
        setShowProductModal(true);
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        if (!prodName.trim() || !prodPrice || !prodSku.trim()) {
            window.alert("Please fill in mandatory product fields.");
            return;
        }

        const productData = {
            productId: editingProductId || "PRD-" + Math.floor(200 + Math.random() * 800),
            vendorId,
            vendorName: vendorProfile.businessName,
            categoryId: prodCategory,
            name: prodName,
            sku: prodSku,
            description: prodDesc || "High quality commercial grade B2B inventory.",
            unitPrice: parseFloat(prodPrice),
            unit: prodUnit,
            moq: parseInt(prodMoq) || 1,
            stock: parseInt(prodStock) || 0,
            status: "active",
            badge: prodBadge,
            tiers: [
                { minQty: parseInt(prodMoq) || 1, price: parseFloat(prodPrice) },
                { minQty: (parseInt(prodMoq) || 1) * 5, price: Math.round(parseFloat(prodPrice) * 0.92) },
                { minQty: (parseInt(prodMoq) || 1) * 15, price: Math.round(parseFloat(prodPrice) * 0.85) }
            ]
        };

        if (editingProductId) {
            updateProduct(productData);
            window.alert(`Product "${prodName}" updated successfully!`);
        } else {
            addProduct(productData);
            window.alert(`New B2B Product "${prodName}" published to Wholesale Catalog!`);
        }
        setShowProductModal(false);
    };

    const handleSaveOrderStatus = (e) => {
        e.preventDefault();
        if (!selectedOrder) return;

        updateOrderStatus(selectedOrder.orderId, newStatus, courierName, trackingNumber, statusNote);
        window.alert(`Order #${selectedOrder.orderId} updated to "${newStatus}"!`);
        setSelectedOrder(null);
    };

    const handleSubmitQuote = (e) => {
        e.preventDefault();
        if (!selectedRfq || !quotePrice.trim()) {
            window.alert("Please provide a valid quoted price.");
            return;
        }

        const quote = {
            vendorId,
            vendorName: vendorProfile.businessName,
            quotedPrice: quotePrice,
            leadTime: leadTime || "7-10 Days",
            remarks: quoteRemarks || "Standard commercial wholesale quotation with manufacturer warranty.",
            responseDate: new Date().toISOString().split("T")[0]
        };

        submitRfqQuote(selectedRfq.rfqId, quote);
        window.alert(`Quotation submitted successfully for RFQ #${selectedRfq.rfqId}!`);
        setSelectedRfq(null);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar
                setPage={setPage}
                activePage="vendor-dashboard"
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
            />

            <div className="page-header-box">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h1>Vendor Supplier Portal</h1>
                            <p>
                                <strong>{vendorProfile.businessName}</strong> | GST: {vendorProfile.gstNumber} | Rating: ★ {vendorProfile.rating}
                            </p>
                        </div>
                        <button
                            type="button"
                            className="btn btn-success fw-bold px-3"
                            onClick={handleOpenAddProduct}
                        >
                            <i className="bi bi-plus-circle me-1"></i> Add New B2B Product
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mb-5 flex-grow-1">
                {/* Metric Summary Cards */}
                <div className="row g-3 mb-4">
                    <div className="col-lg-3 col-sm-6">
                        <div className="stat-card">
                            <div className="stat-icon blue">
                                <i className="bi bi-box-seam"></i>
                            </div>
                            <div className="stat-info">
                                <h3>{vendorProducts.length}</h3>
                                <span>Listed Products</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="stat-card">
                            <div className="stat-icon amber">
                                <i className="bi bi-clock-history"></i>
                            </div>
                            <div className="stat-info">
                                <h3>{activeOrdersCount}</h3>
                                <span>Active Orders</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="stat-card">
                            <div className="stat-icon green">
                                <i className="bi bi-currency-rupee"></i>
                            </div>
                            <div className="stat-info">
                                <h3>₹{totalRevenue.toLocaleString("en-IN")}</h3>
                                <span>Total Revenue</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="stat-card">
                            <div className="stat-icon purple">
                                <i className="bi bi-file-earmark-text"></i>
                            </div>
                            <div className="stat-info">
                                <h3>{pendingRfqs.length}</h3>
                                <span>Open RFQ Leads</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Tabs */}
                <div className="dashboard-tabs">
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab("products")}
                    >
                        <i className="bi bi-grid"></i> Product Management ({vendorProducts.length})
                    </button>
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
                        onClick={() => setActiveTab("inventory")}
                    >
                        <i className="bi bi-layers"></i> Stock & Reorder Levels
                    </button>
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab("orders")}
                    >
                        <i className="bi bi-truck"></i> Order Fulfillment ({vendorOrders.length})
                    </button>
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'rfqs' ? 'active' : ''}`}
                        onClick={() => setActiveTab("rfqs")}
                    >
                        <i className="bi bi-chat-quote"></i> Buyer RFQ Leads ({pendingRfqs.length})
                    </button>
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab("profile")}
                    >
                        <i className="bi bi-shop"></i> Storefront & Bank Details
                    </button>
                </div>

                {/* TAB 1: PRODUCT MANAGEMENT */}
                {activeTab === "products" && (
                    <div className="b2b-table-card">
                        <div className="b2b-table-header">
                            <h4>My Wholesale Listings</h4>
                            <button className="btn btn-sm btn-primary" onClick={handleOpenAddProduct}>
                                <i className="bi bi-plus-lg me-1"></i> Add Product
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table b2b-table">
                                <thead>
                                    <tr>
                                        <th>Product Name & SKU</th>
                                        <th>Unit Price</th>
                                        <th>Unit Type</th>
                                        <th>MOQ</th>
                                        <th>Stock</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendorProducts.map((prod) => (
                                        <tr key={prod.productId}>
                                            <td>
                                                <div className="fw-bold text-dark">{prod.name}</div>
                                                <div className="small text-muted">SKU: {prod.sku}</div>
                                            </td>
                                            <td className="fw-bold">₹{prod.unitPrice.toLocaleString("en-IN")}</td>
                                            <td>{prod.unit}</td>
                                            <td><span className="badge bg-light text-dark border">{prod.moq}</span></td>
                                            <td>
                                                <span className={prod.stock < 30 ? "text-danger fw-bold" : "text-success fw-bold"}>
                                                    {prod.stock}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="status-pill active">{prod.status}</span>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary me-1"
                                                    onClick={() => handleOpenEditProduct(prod)}
                                                    title="Edit Product"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => {
                                                        if (window.confirm(`Delete "${prod.name}"?`)) {
                                                            deleteProduct(prod.productId);
                                                        }
                                                    }}
                                                    title="Delete Product"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* TAB 2: INVENTORY & STOCK */}
                {activeTab === "inventory" && (
                    <div className="b2b-table-card">
                        <div className="b2b-table-header">
                            <h4>Real-Time Inventory Stock Control</h4>
                            <span className="badge bg-info text-dark">Automated MOQ Reservation Enabled</span>
                        </div>
                        <div className="table-responsive">
                            <table className="table b2b-table">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Current Stock</th>
                                        <th>Reorder Level</th>
                                        <th>Stock Health</th>
                                        <th>Quick Adjust Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendorProducts.map((prod) => (
                                        <tr key={prod.productId}>
                                            <td className="fw-bold">{prod.name}</td>
                                            <td className="fs-6 fw-bold">{prod.stock} {prod.unit}</td>
                                            <td>25 {prod.unit}</td>
                                            <td>
                                                {prod.stock < 25 ? (
                                                    <span className="badge bg-danger">Low Stock - Reorder Now</span>
                                                ) : (
                                                    <span className="badge bg-success">Adequate Stock</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="btn-group btn-group-sm">
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => updateProduct({ ...prod, stock: Math.max(0, prod.stock - 10) })}
                                                    >
                                                        -10
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => updateProduct({ ...prod, stock: prod.stock + 10 })}
                                                    >
                                                        +10
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={() => updateProduct({ ...prod, stock: prod.stock + 50 })}
                                                    >
                                                        +50 (Restock Batch)
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* TAB 3: ORDER FULFILLMENT */}
                {activeTab === "orders" && (
                    <div>
                        {vendorOrders.length === 0 ? (
                            <div className="card text-center py-5 shadow-sm border-0">
                                <div className="card-body">
                                    <i className="bi bi-box text-muted" style={{ fontSize: "48px" }}></i>
                                    <h5 className="mt-3">No Orders Received Yet</h5>
                                    <p className="text-muted">Orders placed by buyers will appear here for processing.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="b2b-table-card">
                                <div className="b2b-table-header">
                                    <h4>Incoming Customer Orders ({vendorOrders.length})</h4>
                                </div>
                                <div className="table-responsive">
                                    <table className="table b2b-table">
                                        <thead>
                                            <tr>
                                                <th>Order ID & Date</th>
                                                <th>Buyer Company</th>
                                                <th>Ordered Items</th>
                                                <th>Total Value</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vendorOrders.map((ord) => (
                                                <tr key={ord.orderId}>
                                                    <td>
                                                        <div className="fw-bold text-dark">#{ord.orderId}</div>
                                                        <div className="small text-muted">{ord.orderDate}</div>
                                                    </td>
                                                    <td>
                                                        <div className="fw-bold">{ord.buyerName}</div>
                                                        <div className="small text-muted">{ord.buyerEmail}</div>
                                                    </td>
                                                    <td>
                                                        <div className="small">
                                                            {ord.items.map((it, i) => (
                                                                <div key={i}>• {it.quantity}x {it.name}</div>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="fw-bold text-primary">
                                                        ₹{ord.totalAmount?.toLocaleString("en-IN")}
                                                    </td>
                                                    <td>
                                                        <span className={`status-pill ${ord.status.toLowerCase()}`}>
                                                            {ord.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() => {
                                                                setSelectedOrder(ord);
                                                                setNewStatus(ord.status);
                                                                setCourierName(ord.courier || "VRL Logistics");
                                                                setTrackingNumber(ord.trackingNumber || "");
                                                                setStatusNote("");
                                                            }}
                                                        >
                                                            <i className="bi bi-arrow-repeat me-1"></i> Fulfill / Update
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 4: RFQ LEADS */}
                {activeTab === "rfqs" && (
                    <div className="row g-4">
                        {pendingRfqs.map((rfq) => (
                            <div className="col-12" key={rfq.rfqId}>
                                <div className="card shadow-sm border-0">
                                    <div className="card-header bg-light d-flex justify-content-between align-items-center py-3">
                                        <div>
                                            <span className="fw-bold fs-6 text-dark me-2">{rfq.productTitle}</span>
                                            <span className="badge bg-secondary">{rfq.category}</span>
                                        </div>
                                        <span className={`status-pill ${rfq.status.toLowerCase()}`}>{rfq.status}</span>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-3">
                                                <div className="small text-muted">Buyer / Enterprise:</div>
                                                <div className="fw-bold">{rfq.companyName}</div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="small text-muted">Requested Quantity:</div>
                                                <div className="fw-bold">{rfq.targetQuantity}</div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="small text-muted">Target Price:</div>
                                                <div className="fw-bold text-success">{rfq.targetPrice}</div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="small text-muted">Delivery Required By:</div>
                                                <div className="fw-bold">{rfq.requiredByDate}</div>
                                            </div>
                                            <div className="col-12">
                                                <div className="small text-muted">Custom Specifications:</div>
                                                <div className="small text-secondary">{rfq.specifications}</div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <button
                                                className="btn btn-primary btn-sm fw-bold"
                                                onClick={() => {
                                                    setSelectedRfq(rfq);
                                                    setQuotePrice(rfq.targetPrice || "₹500 per unit");
                                                    setLeadTime("10 Working Days");
                                                    setQuoteRemarks("");
                                                }}
                                            >
                                                <i className="bi bi-pencil-square me-1"></i> Submit Quotation Response
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* TAB 5: VENDOR PROFILE */}
                {activeTab === "profile" && (
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0 fw-bold">Supplier Profile & Verified Escrow Details</h5>
                        </div>
                        <div className="card-body p-4">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label text-muted small">Registered Business Name:</label>
                                    <div className="fw-bold">{vendorProfile.businessName}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small">GSTIN Number:</label>
                                    <div className="fw-bold">{vendorProfile.gstNumber}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small">Business Email:</label>
                                    <div className="fw-bold">{vendorProfile.businessEmail || "sales@apexsupplies.com"}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small">Official Dispatch Phone:</label>
                                    <div className="fw-bold">{vendorProfile.phone || "+91 98480 22334"}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small">Bank Escrow Account:</label>
                                    <div className="fw-bold">{vendorProfile.bankDetails || "HDFC Bank - Acc: 50200012345678 - IFSC: HDFC0001234"}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small">Verification Status:</label>
                                    <div><span className="status-pill verified">Admin Verified Supplier</span></div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-muted small">Warehouse Logistics Dispatch Center:</label>
                                    <div className="p-3 bg-light rounded border">
                                        {vendorProfile.address || "Industrial Estate, Phase II, Visakhapatnam, AP"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ADD / EDIT PRODUCT MODAL */}
            {showProductModal && (
                <div className="b2b-modal-overlay" onClick={() => setShowProductModal(false)}>
                    <div className="b2b-modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="b2b-modal-header">
                            <h4>{editingProductId ? "Edit B2B Product" : "Add Wholesale B2B Product"}</h4>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowProductModal(false)}
                            ></button>
                        </div>
                        <form onSubmit={handleProductSubmit}>
                            <div className="b2b-modal-body">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Product Name *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={prodName}
                                        onChange={(e) => setProdName(e.target.value)}
                                        placeholder="e.g., Heavy Duty Safety Helmets (Pack of 50)"
                                        required
                                    />
                                </div>

                                <div className="row g-2 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Category</label>
                                        <select
                                            className="form-select"
                                            value={prodCategory}
                                            onChange={(e) => setProdCategory(e.target.value)}
                                        >
                                            {storeData.categories.map((c) => (
                                                <option key={c.categoryId} value={c.categoryId}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">SKU Code *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={prodSku}
                                            onChange={(e) => setProdSku(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row g-2 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Wholesale Price (₹) *</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={prodPrice}
                                            onChange={(e) => setProdPrice(e.target.value)}
                                            placeholder="e.g. 4500"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Unit Type</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={prodUnit}
                                            onChange={(e) => setProdUnit(e.target.value)}
                                            placeholder="e.g., Pack (50 pcs), Drum (305m)"
                                        />
                                    </div>
                                </div>

                                <div className="row g-2 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Min Order Qty (MOQ) *</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            min="1"
                                            value={prodMoq}
                                            onChange={(e) => setProdMoq(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Initial In-Stock Count *</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            min="0"
                                            value={prodStock}
                                            onChange={(e) => setProdStock(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Product Description & Technical Specs</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={prodDesc}
                                        onChange={(e) => setProdDesc(e.target.value)}
                                        placeholder="Enter materials, certifications, dimensions, warranty..."
                                    ></textarea>
                                </div>
                            </div>
                            <div className="b2b-modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowProductModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary fw-bold">
                                    {editingProductId ? "Save Changes" : "Publish Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ORDER FULFILLMENT MODAL */}
            {selectedOrder && (
                <div className="b2b-modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="b2b-modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="b2b-modal-header">
                            <h4>Fulfill Order #{selectedOrder.orderId}</h4>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setSelectedOrder(null)}
                            ></button>
                        </div>
                        <form onSubmit={handleSaveOrderStatus}>
                            <div className="b2b-modal-body">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Update Order Status</label>
                                    <select
                                        className="form-select"
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Processing">Processing / Manufacturing</option>
                                        <option value="Shipped">Shipped / Dispatched</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>

                                <div className="row g-2 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Logistics Courier</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={courierName}
                                            onChange={(e) => setCourierName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Tracking AWB #</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g. VRL-VIZ-8890214"
                                            value={trackingNumber}
                                            onChange={(e) => setTrackingNumber(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Status Update Note for Buyer</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. Dispatched from Visakhapatnam central depot"
                                        value={statusNote}
                                        onChange={(e) => setStatusNote(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="b2b-modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedOrder(null)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary fw-bold">
                                    Update Order Status
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* SUBMIT RFQ QUOTE MODAL */}
            {selectedRfq && (
                <div className="b2b-modal-overlay" onClick={() => setSelectedRfq(null)}>
                    <div className="b2b-modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="b2b-modal-header">
                            <h4>Submit Quote for RFQ #{selectedRfq.rfqId}</h4>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setSelectedRfq(null)}
                            ></button>
                        </div>
                        <form onSubmit={handleSubmitQuote}>
                            <div className="b2b-modal-body">
                                <div className="p-3 bg-light rounded border mb-3">
                                    <div className="fw-bold">{selectedRfq.productTitle}</div>
                                    <div className="small text-muted">Buyer: {selectedRfq.companyName} | Qty: {selectedRfq.targetQuantity}</div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Quoted Unit & Total Price *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. ₹42 per unit (Total ₹4,20,000 + 18% GST)"
                                        value={quotePrice}
                                        onChange={(e) => setQuotePrice(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Manufacturing / Dispatch Lead Time</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. 10 Working Days"
                                        value={leadTime}
                                        onChange={(e) => setLeadTime(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Commercial Remarks & Payment Terms</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Enter logistics terms, warranty, sample approval conditions..."
                                        value={quoteRemarks}
                                        onChange={(e) => setQuoteRemarks(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="b2b-modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedRfq(null)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary fw-bold">
                                    Submit Commercial Quote
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

export default VendorDashboard;
