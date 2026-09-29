/* =========================================================
   B2B SHOPPING CART PAGE
   Multi-Vendor B2B E-Commerce Platform
========================================================= */

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cart({
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    currentUser,
    setCurrentUser,
    setPage
}) {
    const subtotal = cart.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
    );
    const gstAmount = Math.round(subtotal * 0.18); // 18% GST
    const shippingFee = cart.length > 0 ? 1200 : 0; // Standard B2B road freight fee
    const grandTotal = subtotal + gstAmount + shippingFee;

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar
                setPage={setPage}
                activePage="cart"
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                cartCount={cartCount}
            />

            {/* Page Header */}
            <div className="page-header-box">
                <div className="container">
                    <h1>Procurement Cart</h1>
                    <p>Review bulk line items, apply B2B tier pricing, and calculate GST invoices</p>
                </div>
            </div>

            <div className="container mb-5 flex-grow-1">
                {cart.length === 0 ? (
                    <div className="card shadow-sm border-0 text-center py-5">
                        <div className="card-body">
                            <i className="bi bi-cart-x text-muted" style={{ fontSize: "54px" }}></i>
                            <h4 className="mt-3 text-dark">Your B2B Cart is Currently Empty</h4>
                            <p className="text-secondary">
                                Browse our wholesale catalog to add bulk materials, equipment, and supplies.
                            </p>
                            <button
                                type="button"
                                className="btn btn-primary px-4 py-2 mt-2"
                                onClick={() => setPage("catalog")}
                            >
                                <i className="bi bi-grid me-1"></i> Browse Wholesale Catalog
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="row g-4">
                        {/* Cart Items Table */}
                        <div className="col-lg-8">
                            <div className="b2b-table-card">
                                <div className="b2b-table-header">
                                    <h4>Order Line Items ({cart.length})</h4>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={clearCart}
                                    >
                                        <i className="bi bi-trash me-1"></i> Clear Cart
                                    </button>
                                </div>

                                <div className="table-responsive">
                                    <table className="table b2b-table">
                                        <thead>
                                            <tr>
                                                <th>Product Details</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>Subtotal</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item) => (
                                                <tr key={item.productId}>
                                                    <td>
                                                        <div className="fw-bold text-dark">{item.name}</div>
                                                        <div className="small text-muted">
                                                            Vendor: <span className="text-primary">{item.vendorName}</span> | MOQ: {item.moq} {item.unit}
                                                        </div>
                                                    </td>
                                                    <td>₹{item.unitPrice.toLocaleString("en-IN")}</td>
                                                    <td>
                                                        <div className="input-group input-group-sm" style={{ width: "120px" }}>
                                                            <button
                                                                className="btn btn-outline-secondary"
                                                                type="button"
                                                                onClick={() => {
                                                                    if (item.quantity > item.moq) {
                                                                        updateCartQty(item.productId, item.quantity - 1);
                                                                    } else {
                                                                        window.alert(`Minimum Order Quantity is ${item.moq} ${item.unit}.`);
                                                                    }
                                                                }}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="number"
                                                                className="form-control text-center p-0"
                                                                value={item.quantity}
                                                                min={item.moq}
                                                                max={item.stock}
                                                                onChange={(e) => {
                                                                    const val = parseInt(e.target.value) || item.moq;
                                                                    if (val >= item.moq && val <= item.stock) {
                                                                        updateCartQty(item.productId, val);
                                                                    }
                                                                }}
                                                            />
                                                            <button
                                                                className="btn btn-outline-secondary"
                                                                type="button"
                                                                onClick={() => {
                                                                    if (item.quantity < item.stock) {
                                                                        updateCartQty(item.productId, item.quantity + 1);
                                                                    } else {
                                                                        window.alert(`Maximum available stock is ${item.stock}.`);
                                                                    }
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="fw-bold text-primary">
                                                        ₹{(item.unitPrice * item.quantity).toLocaleString("en-IN")}
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => removeFromCart(item.productId)}
                                                            title="Remove item"
                                                        >
                                                            <i className="bi bi-x-lg"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setPage("catalog")}
                            >
                                <i className="bi bi-arrow-left me-1"></i> Continue Shopping
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="col-lg-4">
                            <div className="cart-summary-box">
                                <h4 className="fw-bold mb-3 pb-2 border-bottom text-dark">Invoice Summary</h4>
                                <div className="cart-summary-row">
                                    <span>Subtotal (Excl. Tax):</span>
                                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="cart-summary-row">
                                    <span>GST (18% B2B Tax):</span>
                                    <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="cart-summary-row">
                                    <span>Industrial Road Freight:</span>
                                    <span>₹{shippingFee.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="cart-summary-row total">
                                    <span>Grand Total:</span>
                                    <span className="text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
                                </div>

                                <div className="p-2 my-3 bg-light rounded text-muted small border">
                                    <i className="bi bi-info-circle me-1 text-primary"></i>
                                    Official GST tax invoice will be generated and dispatched with the order.
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-success w-100 py-2 fw-bold"
                                    onClick={() => setPage("checkout")}
                                >
                                    <i className="bi bi-credit-card me-1"></i> Proceed to B2B Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default Cart;
