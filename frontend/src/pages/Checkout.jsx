/* =========================================================
   B2B CHECKOUT PAGE
   Multi-Vendor B2B E-Commerce Platform
========================================================= */

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Checkout({
    cart,
    currentUser,
    setCurrentUser,
    setPage,
    placeOrder
}) {
    const [companyName, setCompanyName] = useState(currentUser?.companyName || "Acme Industrial Enterprises");
    const [gstNumber, setGstNumber] = useState(currentUser?.gstNumber || "37AAACA1234A1Z5");
    const [contactPerson, setContactPerson] = useState(currentUser?.name || "Rajesh Sharma");
    const [phone, setPhone] = useState(currentUser?.phone || "+91 98765 11223");
    const [shippingAddress, setShippingAddress] = useState(
        currentUser?.address || "Plot 45, Auto Nagar, Gajuwaka, Visakhapatnam, AP - 530026"
    );
    const [paymentMethod, setPaymentMethod] = useState("Purchase Order (Net 30)");
    const [poNumber, setPoNumber] = useState("PO-2026-" + Math.floor(1000 + Math.random() * 9000));
    const [notes, setNotes] = useState("");

    const subtotal = cart.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
    );
    const gstAmount = Math.round(subtotal * 0.18);
    const shippingFee = cart.length > 0 ? 1200 : 0;
    const grandTotal = subtotal + gstAmount + shippingFee;

    function handlePlaceOrder(e) {
        e.preventDefault();

        if (cart.length === 0) {
            window.alert("Your cart is empty.");
            setPage("catalog");
            return;
        }

        if (!companyName.trim() || !gstNumber.trim() || !shippingAddress.trim()) {
            window.alert("Please provide complete Company, GSTIN, and Delivery address details.");
            return;
        }

        const newOrder = {
            orderId: "ORD-2026-" + Math.floor(1000 + Math.random() * 9000),
            buyerId: currentUser?.userId || "USR-001",
            buyerName: `${contactPerson} (${companyName})`,
            buyerEmail: currentUser?.email || "buyer@acme.com",
            vendorId: cart[0]?.vendorId || "VEN-001",
            vendorName: cart[0]?.vendorName || "Apex Industrial Supplies Ltd",
            orderDate: new Date().toISOString().split("T")[0],
            items: cart.map((item) => ({
                productId: item.productId,
                name: item.name,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                subtotal: item.quantity * item.unitPrice
            })),
            subtotal,
            gstAmount,
            shippingFee,
            totalAmount: grandTotal,
            paymentMethod: paymentMethod === "Purchase Order (Net 30)" ? `Purchase Order (${poNumber})` : paymentMethod,
            paymentStatus: paymentMethod === "Bank NEFT / RTGS" ? "Paid" : "Invoice Sent",
            shippingAddress,
            status: "Pending",
            courier: "Assigned upon dispatch",
            trackingNumber: "Pending",
            notes: notes || "Standard warehouse dock delivery.",
            history: [
                {
                    status: "Pending",
                    time: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    note: "Order placed by buyer"
                }
            ]
        };

        placeOrder(newOrder);
        window.alert(`B2B Order #${newOrder.orderId} has been successfully submitted!`);
        setPage("buyer-dashboard");
    }

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar
                setPage={setPage}
                activePage="checkout"
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                cartCount={cartCount}
            />

            <div className="page-header-box">
                <div className="container">
                    <h1>B2B Order Checkout</h1>
                    <p>Enter billing information, GST verification, and choose payment terms</p>
                </div>
            </div>

            <div className="container mb-5 flex-grow-1">
                <form onSubmit={handlePlaceOrder}>
                    <div className="row g-4">
                        {/* Billing and Shipping Form */}
                        <div className="col-lg-8">
                            <div className="card shadow-sm border-0 mb-4">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0 fw-bold text-dark">
                                        <i className="bi bi-building me-2 text-primary"></i>
                                        1. Company & GST Information
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Company / Entity Name *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">GSTIN Number (Tax Invoice) *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={gstNumber}
                                                onChange={(e) => setGstNumber(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Authorized Contact Person</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={contactPerson}
                                                onChange={(e) => setContactPerson(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-semibold">Warehouse / Delivery Address *</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={shippingAddress}
                                                onChange={(e) => setShippingAddress(e.target.value)}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Options */}
                            <div className="card shadow-sm border-0 mb-4">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0 fw-bold text-dark">
                                        <i className="bi bi-wallet2 me-2 text-primary"></i>
                                        2. B2B Payment Method
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className={`p-3 border rounded ${paymentMethod === 'Purchase Order (Net 30)' ? 'border-primary bg-light' : ''}`}>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="paymentRadio"
                                                        id="payPO"
                                                        checked={paymentMethod === "Purchase Order (Net 30)"}
                                                        onChange={() => setPaymentMethod("Purchase Order (Net 30)")}
                                                    />
                                                    <label className="form-check-label fw-bold" htmlFor="payPO">
                                                        Purchase Order (Net-30 Credit)
                                                    </label>
                                                </div>
                                                <small className="text-muted d-block mt-1">
                                                    For verified corporate accounts. Pay within 30 days of invoice receipt.
                                                </small>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className={`p-3 border rounded ${paymentMethod === 'Bank NEFT / RTGS' ? 'border-primary bg-light' : ''}`}>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="paymentRadio"
                                                        id="payNEFT"
                                                        checked={paymentMethod === "Bank NEFT / RTGS"}
                                                        onChange={() => setPaymentMethod("Bank NEFT / RTGS")}
                                                    />
                                                    <label className="form-check-label fw-bold" htmlFor="payNEFT">
                                                        Bank NEFT / RTGS Transfer
                                                    </label>
                                                </div>
                                                <small className="text-muted d-block mt-1">
                                                    Direct wire transfer to supplier verified escrow bank account.
                                                </small>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className={`p-3 border rounded ${paymentMethod === 'Credit / Debit Card' ? 'border-primary bg-light' : ''}`}>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="paymentRadio"
                                                        id="payCard"
                                                        checked={paymentMethod === "Credit / Debit Card"}
                                                        onChange={() => setPaymentMethod("Credit / Debit Card")}
                                                    />
                                                    <label className="form-check-label fw-bold" htmlFor="payCard">
                                                        Corporate Credit / Debit Card
                                                    </label>
                                                </div>
                                                <small className="text-muted d-block mt-1">
                                                    Instant payment gateway processing via Visa, MasterCard, Rupay.
                                                </small>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className={`p-3 border rounded ${paymentMethod === 'Cash on Delivery' ? 'border-primary bg-light' : ''}`}>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="paymentRadio"
                                                        id="payCOD"
                                                        checked={paymentMethod === "Cash on Delivery"}
                                                        onChange={() => setPaymentMethod("Cash on Delivery")}
                                                    />
                                                    <label className="form-check-label fw-bold" htmlFor="payCOD">
                                                        Cheque / Cash on Delivery
                                                    </label>
                                                </div>
                                                <small className="text-muted d-block mt-1">
                                                    Pay upon physical verification of goods at warehouse gate.
                                                </small>
                                            </div>
                                        </div>
                                    </div>

                                    {paymentMethod === "Purchase Order (Net 30)" && (
                                        <div className="mt-3 p-3 bg-light rounded border">
                                            <label className="form-label fw-bold small">Buyer PO Reference Number:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={poNumber}
                                                onChange={(e) => setPoNumber(e.target.value)}
                                                placeholder="e.g. PO-2026-ACME-001"
                                            />
                                        </div>
                                    )}

                                    <div className="mt-3">
                                        <label className="form-label fw-semibold">Special Delivery Instructions / Unloading Notes</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="e.g., Unloading dock gate 2, crane required, forklift available on site."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary & Confirm */}
                        <div className="col-lg-4">
                            <div className="cart-summary-box mb-4">
                                <h5 className="fw-bold mb-3 pb-2 border-bottom text-dark">Order Items ({cart.length})</h5>
                                <div className="mb-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
                                    {cart.map((item) => (
                                        <div key={item.productId} className="d-flex justify-content-between mb-2 small">
                                            <div>
                                                <div className="fw-bold text-truncate" style={{ maxWidth: "180px" }}>
                                                    {item.name}
                                                </div>
                                                <span className="text-muted">
                                                    {item.quantity} x ₹{item.unitPrice.toLocaleString("en-IN")}
                                                </span>
                                            </div>
                                            <div className="fw-bold">
                                                ₹{(item.quantity * item.unitPrice).toLocaleString("en-IN")}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="cart-summary-row">
                                    <span>Subtotal:</span>
                                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="cart-summary-row">
                                    <span>GST (18%):</span>
                                    <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="cart-summary-row">
                                    <span>Logistics Freight:</span>
                                    <span>₹{shippingFee.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="cart-summary-row total">
                                    <span>Total Payable:</span>
                                    <span className="text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-3 mt-3 fw-bold fs-6"
                                >
                                    <i className="bi bi-check-circle me-1"></i> Place Official B2B Order
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary w-100 mt-2"
                                    onClick={() => setPage("cart")}
                                >
                                    Back to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}

export default Checkout;
