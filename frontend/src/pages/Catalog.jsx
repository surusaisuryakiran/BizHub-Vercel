/* =========================================================
   WHOLESALE CATALOG PAGE
   Multi-Vendor B2B E-Commerce Platform
========================================================= */

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Catalog({
    storeData,
    currentUser,
    setCurrentUser,
    cart,
    addToCart,
    setPage,
    setSelectedProductForRfq
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedVendor, setSelectedVendor] = useState("all");
    const [activeDetailProduct, setActiveDetailProduct] = useState(null);
    const [orderQty, setOrderQty] = useState(1);

    // Filter products
    const filteredProducts = storeData.products.filter((prod) => {
        if (prod.status !== "active") return false;
        
        const matchSearch =
            prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prod.sku.toLowerCase().includes(searchQuery.toLowerCase());

        const matchCat =
            selectedCategory === "all" || prod.categoryId === selectedCategory;

        const matchVen =
            selectedVendor === "all" || prod.vendorId === selectedVendor;

        return matchSearch && matchCat && matchVen;
    });

    function handleOpenDetails(prod) {
        setActiveDetailProduct(prod);
        setOrderQty(prod.moq || 1);
    }

    function handleAddToCart(prod, qty) {
        if (!currentUser) {
            window.alert("Please log in as a Buyer to add items to your cart.");
            setPage("home");
            return;
        }
        if (currentUser.role !== "buyer") {
            window.alert("Only registered Buyers can add products to cart. Switch role to Buyer in the top bar.");
            return;
        }
        if (qty < (prod.moq || 1)) {
            window.alert(`Minimum Order Quantity for this product is ${prod.moq} ${prod.unit}.`);
            return;
        }
        if (qty > prod.stock) {
            window.alert(`Only ${prod.stock} units currently available in stock.`);
            return;
        }

        addToCart(prod, qty);
        window.alert(`Added ${qty} ${prod.unit} of "${prod.name}" to cart!`);
        setActiveDetailProduct(null);
    }

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar
                setPage={setPage}
                activePage="catalog"
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                cartCount={cartCount}
            />

            {/* Page Header */}
            <div className="page-header-box">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h1>B2B Wholesale Catalog</h1>
                            <p>Direct wholesale pricing from verified manufacturers & industrial distributors</p>
                        </div>
                        {currentUser?.role === "buyer" && (
                            <button
                                type="button"
                                className="btn btn-warning fw-bold px-3 py-2"
                                onClick={() => setPage("cart")}
                            >
                                <i className="bi bi-cart3 me-1"></i> View Cart ({cartCount} items)
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Catalog Main Content */}
            <div className="container mb-5 flex-grow-1">
                {/* Search & Filter Bar */}
                <div className="card shadow-sm border-0 mb-4 bg-light">
                    <div className="card-body p-3">
                        <div className="row g-3">
                            <div className="col-md-5">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-search text-muted"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0"
                                        placeholder="Search by product name, SKU or specifications..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-3">
                                <select
                                    className="form-select"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="all">All B2B Categories</option>
                                    {storeData.categories.map((c) => (
                                        <option key={c.categoryId} value={c.categoryId}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-3">
                                <select
                                    className="form-select"
                                    value={selectedVendor}
                                    onChange={(e) => setSelectedVendor(e.target.value)}
                                >
                                    <option value="all">All Verified Vendors</option>
                                    {storeData.vendors.map((v) => (
                                        <option key={v.vendorId} value={v.vendorId}>
                                            {v.businessName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-1 d-flex align-items-center justify-content-end">
                                <button
                                    className="btn btn-outline-secondary w-100"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("all");
                                        setSelectedVendor("all");
                                    }}
                                    title="Reset Filters"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="row g-4">
                    {filteredProducts.length === 0 ? (
                        <div className="col-12 text-center py-5">
                            <i className="bi bi-inbox text-muted" style={{ fontSize: "48px" }}></i>
                            <h4 className="text-muted mt-3">No products match your search criteria.</h4>
                            <p className="text-secondary">Try searching for other keywords or reset your filters.</p>
                        </div>
                    ) : (
                        filteredProducts.map((prod) => (
                            <div className="col-lg-3 col-md-6" key={prod.productId}>
                                <div className="product-grid-card">
                                    <div className="product-card-top">
                                        <div className="product-icon-holder">
                                            <i className="bi bi-box-seam"></i>
                                        </div>
                                        {prod.badge && (
                                            <span className="product-badge-tag">{prod.badge}</span>
                                        )}
                                    </div>

                                    <div className="product-card-body">
                                        <div className="product-vendor-info">
                                            <i className="bi bi-shop text-primary"></i>
                                            <span className="text-truncate">{prod.vendorName}</span>
                                        </div>
                                        <div className="product-title" title={prod.name}>
                                            {prod.name}
                                        </div>
                                        <div className="product-desc">
                                            {prod.description}
                                        </div>

                                        <div className="product-pricing-box">
                                            <div className="d-flex justify-content-between align-items-baseline">
                                                <span className="product-unit-price">
                                                    ₹{prod.unitPrice.toLocaleString("en-IN")}
                                                </span>
                                                <span className="text-muted small">per {prod.unit}</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-1">
                                                <span className="product-moq-label">
                                                    <i className="bi bi-layers me-1"></i>
                                                    MOQ: {prod.moq} {prod.unit}
                                                </span>
                                                <span className="badge bg-light text-dark border">
                                                    Stock: {prod.stock}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="product-card-footer">
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary btn-sm flex-fill"
                                                onClick={() => handleOpenDetails(prod)}
                                            >
                                                Details & Tiers
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm flex-fill"
                                                onClick={() => handleAddToCart(prod, prod.moq)}
                                            >
                                                <i className="bi bi-cart-plus me-1"></i> Quick Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Product Details & Tier Pricing Modal */}
            {activeDetailProduct && (
                <div className="b2b-modal-overlay" onClick={() => setActiveDetailProduct(null)}>
                    <div className="b2b-modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="b2b-modal-header">
                            <h4>{activeDetailProduct.name}</h4>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setActiveDetailProduct(null)}
                            ></button>
                        </div>
                        <div className="b2b-modal-body">
                            <div className="mb-3">
                                <span className="badge bg-secondary me-2">SKU: {activeDetailProduct.sku}</span>
                                <span className="badge bg-primary">Supplier: {activeDetailProduct.vendorName}</span>
                            </div>

                            <p className="text-secondary">{activeDetailProduct.description}</p>

                            {/* Wholesale Tier Pricing Table */}
                            <h6 className="fw-bold mt-4 mb-2 text-dark">
                                <i className="bi bi-tag-fill text-success me-1"></i> Wholesale Bulk Tier Pricing
                            </h6>
                            <table className="table table-bordered table-sm text-center mb-3">
                                <thead className="table-light">
                                    <tr>
                                        <th>Order Quantity</th>
                                        <th>Price per {activeDetailProduct.unit}</th>
                                        <th>Savings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeDetailProduct.tiers?.map((tier, idx) => (
                                        <tr key={idx} className={orderQty >= tier.minQty ? "table-success fw-bold" : ""}>
                                            <td>{tier.minQty}+ {activeDetailProduct.unit}</td>
                                            <td>₹{tier.price.toLocaleString("en-IN")}</td>
                                            <td>
                                                {idx === 0 ? "Standard" : `${Math.round(((activeDetailProduct.tiers[0].price - tier.price) / activeDetailProduct.tiers[0].price) * 100)}% Off`}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Quantity Selector with MOQ validation */}
                            <div className="p-3 bg-light rounded border mb-3">
                                <div className="row align-items-center">
                                    <div className="col-sm-6">
                                        <label className="form-label fw-bold small text-muted">
                                            Select Quantity (Min {activeDetailProduct.moq} {activeDetailProduct.unit}):
                                        </label>
                                        <div className="input-group">
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => setOrderQty(Math.max(activeDetailProduct.moq, orderQty - 1))}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="form-control text-center fw-bold"
                                                min={activeDetailProduct.moq}
                                                max={activeDetailProduct.stock}
                                                value={orderQty}
                                                onChange={(e) => setOrderQty(Math.max(activeDetailProduct.moq, parseInt(e.target.value) || activeDetailProduct.moq))}
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => setOrderQty(Math.min(activeDetailProduct.stock, orderQty + 1))}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 text-end mt-3 mt-sm-0">
                                        <div className="text-muted small">Estimated Subtotal:</div>
                                        <div className="fs-4 fw-bold text-primary">
                                            ₹{(orderQty * activeDetailProduct.unitPrice).toLocaleString("en-IN")}
                                        </div>
                                        <div className="small text-muted">+ 18% GST at checkout</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="b2b-modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setActiveDetailProduct(null)}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleAddToCart(activeDetailProduct, orderQty)}
                            >
                                <i className="bi bi-cart-plus me-1"></i> Add {orderQty} {activeDetailProduct.unit} to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Catalog;
