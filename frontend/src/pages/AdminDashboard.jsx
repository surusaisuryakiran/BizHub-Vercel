/* =========================================================
   ADMIN DASHBOARD & PLATFORM MANAGEMENT
   Multi-Vendor B2B E-Commerce Platform
========================================================= */

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard({
    storeData,
    currentUser,
    setCurrentUser,
    setPage,
    verifyVendor,
    addCategory,
    deleteCategory,
    resetToDefault
}) {
    const [activeTab, setActiveTab] = useState("vendors"); // vendors, categories, orders, users

    // Add Category Form State
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [catName, setCatName] = useState("");
    const [catDesc, setCatDesc] = useState("");
    const [catIcon, setCatIcon] = useState("bi-boxes");

    // Metrics Calculation
    const totalVendors = storeData.vendors.length;
    const verifiedVendors = storeData.vendors.filter((v) => v.status === "verified").length;
    const totalProducts = storeData.products.length;
    const totalOrders = storeData.orders.length;
    const totalGmv = storeData.orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (!catName.trim()) {
            window.alert("Please provide a Category Name.");
            return;
        }

        const newCat = {
            categoryId: "CAT-" + Math.floor(100 + Math.random() * 900),
            name: catName,
            description: catDesc || "Wholesale commercial category.",
            icon: catIcon || "bi-boxes"
        };

        addCategory(newCat);
        window.alert(`Category "${catName}" added successfully!`);
        setShowCategoryModal(false);
        setCatName("");
        setCatDesc("");
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar
                setPage={setPage}
                activePage="admin-dashboard"
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
            />

            <div className="page-header-box">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h1>Platform Administration Portal</h1>
                            <p>Multi-Vendor marketplace governance, vendor verification & platform analytics</p>
                        </div>
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                                if (window.confirm("Reset all store data back to initial sample state?")) {
                                    resetToDefault();
                                    window.alert("Data reset to initial state.");
                                }
                            }}
                        >
                            <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Demo Database
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mb-5 flex-grow-1">
                {/* Platform Summary Metrics */}
                <div className="row g-3 mb-4">
                    <div className="col-lg-3 col-sm-6">
                        <div className="stat-card">
                            <div className="stat-icon blue">
                                <i className="bi bi-shop"></i>
                            </div>
                            <div className="stat-info">
                                <h3>{verifiedVendors} / {totalVendors}</h3>
                                <span>Verified Suppliers</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="stat-card">
                            <div className="stat-icon green">
                                <i className="bi bi-currency-rupee"></i>
                            </div>
                            <div className="stat-info">
                                <h3>₹{totalGmv.toLocaleString("en-IN")}</h3>
                                <span>Platform GMV</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="stat-card">
                            <div className="stat-icon amber">
                                <i className="bi bi-box-seam"></i>
                            </div>
                            <div className="stat-info">
                                <h3>{totalProducts}</h3>
                                <span>Listed Products</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="stat-card">
                            <div className="stat-icon purple">
                                <i className="bi bi-receipt"></i>
                            </div>
                            <div className="stat-info">
                                <h3>{totalOrders}</h3>
                                <span>Total Orders</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Tabs */}
                <div className="dashboard-tabs">
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'vendors' ? 'active' : ''}`}
                        onClick={() => setActiveTab("vendors")}
                    >
                        <i className="bi bi-shield-check"></i> Vendor Verification & Compliance ({storeData.vendors.length})
                    </button>
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
                        onClick={() => setActiveTab("categories")}
                    >
                        <i className="bi bi-folder"></i> Category Hierarchy ({storeData.categories.length})
                    </button>
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab("orders")}
                    >
                        <i className="bi bi-cart-check"></i> Global Orders Oversight ({storeData.orders.length})
                    </button>
                    <button
                        className={`dashboard-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab("users")}
                    >
                        <i className="bi bi-people"></i> User Roles & Access ({storeData.users.length})
                    </button>
                </div>

                {/* TAB 1: VENDORS */}
                {activeTab === "vendors" && (
                    <div className="b2b-table-card">
                        <div className="b2b-table-header">
                            <h4>Registered B2B Vendors & Suppliers</h4>
                        </div>
                        <div className="table-responsive">
                            <table className="table b2b-table">
                                <thead>
                                    <tr>
                                        <th>Vendor Business</th>
                                        <th>GSTIN & Escrow Bank</th>
                                        <th>Warehouse Hub</th>
                                        <th>Rating</th>
                                        <th>Verification Status</th>
                                        <th>Admin Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {storeData.vendors.map((v) => (
                                        <tr key={v.vendorId}>
                                            <td>
                                                <div className="fw-bold text-dark">{v.businessName}</div>
                                                <div className="small text-muted">{v.businessEmail} | {v.phone}</div>
                                            </td>
                                            <td>
                                                <div className="small fw-semibold">{v.gstNumber}</div>
                                                <div className="small text-muted text-truncate" style={{ maxWidth: "220px" }}>{v.bankDetails}</div>
                                            </td>
                                            <td className="small text-secondary">{v.address}</td>
                                            <td>
                                                <span className="fw-bold text-warning">★ {v.rating}</span>{" "}
                                                <span className="text-muted small">({v.reviewCount || 0})</span>
                                            </td>
                                            <td>
                                                <span className={`status-pill ${v.status}`}>
                                                    {v.status === "verified" ? "Verified" : v.status === "pending" ? "Pending Approval" : "Suspended"}
                                                </span>
                                            </td>
                                            <td>
                                                {v.status !== "verified" ? (
                                                    <button
                                                        className="btn btn-sm btn-success fw-bold"
                                                        onClick={() => {
                                                            verifyVendor(v.vendorId, "verified");
                                                            window.alert(`Vendor "${v.businessName}" has been verified and activated!`);
                                                        }}
                                                    >
                                                        <i className="bi bi-check-lg me-1"></i> Approve & Verify
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => {
                                                            verifyVendor(v.vendorId, "suspended");
                                                            window.alert(`Vendor "${v.businessName}" suspended.`);
                                                        }}
                                                    >
                                                        Suspend
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* TAB 2: CATEGORIES */}
                {activeTab === "categories" && (
                    <div className="b2b-table-card">
                        <div className="b2b-table-header">
                            <h4>B2B Marketplace Categories</h4>
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() => setShowCategoryModal(true)}
                            >
                                <i className="bi bi-plus-lg me-1"></i> Add Category
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table b2b-table">
                                <thead>
                                    <tr>
                                        <th>Category ID</th>
                                        <th>Category Name</th>
                                        <th>Description</th>
                                        <th>Products Count</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {storeData.categories.map((c) => {
                                        const count = storeData.products.filter((p) => p.categoryId === c.categoryId).length;
                                        return (
                                            <tr key={c.categoryId}>
                                                <td><code>{c.categoryId}</code></td>
                                                <td className="fw-bold text-dark">
                                                    <i className={`bi ${c.icon || 'bi-folder'} me-2 text-primary`}></i>
                                                    {c.name}
                                                </td>
                                                <td className="text-secondary small">{c.description}</td>
                                                <td><span className="badge bg-light text-dark border">{count} Items</span></td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => {
                                                            if (window.confirm(`Delete Category "${c.name}"?`)) {
                                                                deleteCategory(c.categoryId);
                                                            }
                                                        }}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* TAB 3: ALL ORDERS */}
                {activeTab === "orders" && (
                    <div className="b2b-table-card">
                        <div className="b2b-table-header">
                            <h4>All Platform Orders & Transactions</h4>
                        </div>
                        <div className="table-responsive">
                            <table className="table b2b-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Buyer Enterprise</th>
                                        <th>Supplier</th>
                                        <th>Line Items</th>
                                        <th>Order Amount</th>
                                        <th>Payment Term</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {storeData.orders.map((ord) => (
                                        <tr key={ord.orderId}>
                                            <td className="fw-bold">#{ord.orderId}</td>
                                            <td>{ord.buyerName}</td>
                                            <td className="text-primary fw-semibold">{ord.vendorName}</td>
                                            <td>{ord.items.length} Products</td>
                                            <td className="fw-bold text-success">₹{ord.totalAmount?.toLocaleString("en-IN")}</td>
                                            <td>
                                                <div className="small fw-semibold">{ord.paymentMethod}</div>
                                                <div className="small text-muted">{ord.paymentStatus}</div>
                                            </td>
                                            <td>
                                                <span className={`status-pill ${ord.status.toLowerCase()}`}>
                                                    {ord.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* TAB 4: USERS */}
                {activeTab === "users" && (
                    <div className="b2b-table-card">
                        <div className="b2b-table-header">
                            <h4>System Users & Role-Based Access Control</h4>
                        </div>
                        <div className="table-responsive">
                            <table className="table b2b-table">
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Full Name & Company</th>
                                        <th>Email Address</th>
                                        <th>Phone</th>
                                        <th>Assigned Role</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {storeData.users.map((u) => (
                                        <tr key={u.userId}>
                                            <td><code>{u.userId}</code></td>
                                            <td>
                                                <div className="fw-bold text-dark">{u.name}</div>
                                                <div className="small text-muted">{u.companyName}</div>
                                            </td>
                                            <td>{u.email}</td>
                                            <td>{u.phone}</td>
                                            <td>
                                                <span className="role-badge">{u.role}</span>
                                            </td>
                                            <td>
                                                <span className="status-pill active">{u.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* ADD CATEGORY MODAL */}
            {showCategoryModal && (
                <div className="b2b-modal-overlay" onClick={() => setShowCategoryModal(false)}>
                    <div className="b2b-modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="b2b-modal-header">
                            <h4>Add B2B Product Category</h4>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowCategoryModal(false)}
                            ></button>
                        </div>
                        <form onSubmit={handleCategorySubmit}>
                            <div className="b2b-modal-body">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Category Name *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. Heavy Machinery & Parts"
                                        value={catName}
                                        onChange={(e) => setCatName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Category Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Describe the type of products in this category..."
                                        value={catDesc}
                                        onChange={(e) => setCatDesc(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="b2b-modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowCategoryModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary fw-bold">
                                    Create Category
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

export default AdminDashboard;
