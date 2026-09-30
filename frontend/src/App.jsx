/* =========================================================
   MAIN APP ROUTER & STATE ROOT
   Multi-Vendor B2B E-Commerce Platform
========================================================= */

import { useState, useEffect } from "react";

// Public Pages
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

// B2B Marketplace & Portal Pages
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BuyerDashboard from "./pages/BuyerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Mock Data & Storage
import { getStoreData, saveStoreData, resetStoreData } from "./data/mockData";
import { api, normalizeProduct, normalizeCategory, normalizeVendor } from "./api";

// Styles
import "./styles/style.css";
import "./styles/about.css";
import "./styles/contact.css";
import "./styles/dashboard.css";

function App() {
    // Current Active Route / View
    const [page, setPage] = useState("home");

    // Persistent Store Data
    const [storeData, setStoreData] = useState(() => getStoreData());

    // Current User Session. Authentication now comes from the Express backend.
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem("bizhub_user");
        return saved ? JSON.parse(saved) : null;
    });

    const [backendConnected, setBackendConnected] = useState(false);

    // Load products/categories/vendors from Express + MongoDB.
    useEffect(() => {
        async function loadBackendData() {
            try {
                const [products, categories, vendors] = await Promise.all([
                    api.products(),
                    api.categories(),
                    api.vendors()
                ]);

                setStoreData((prev) => ({
                    ...prev,
                    products: products.map(normalizeProduct),
                    categories: categories.map(normalizeCategory),
                    vendors: vendors.map(normalizeVendor)
                }));
                setBackendConnected(true);
            } catch (error) {
                console.warn("Backend not available. Keeping local demo data:", error.message);
                setBackendConnected(false);
            }
        }
        loadBackendData();
    }, []);

    // B2B Shopping Cart State
    const [cart, setCart] = useState([]);

    // Save to localStorage whenever storeData changes
    useEffect(() => {
        saveStoreData(storeData);
    }, [storeData]);

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    /* =====================================================
       CART MANAGEMENT
    ===================================================== */
    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex((item) => item.productId === product.productId);
            if (existingIndex > -1) {
                const updated = [...prevCart];
                updated[existingIndex].quantity = Math.min(
                    product.stock,
                    updated[existingIndex].quantity + quantity
                );
                return updated;
            } else {
                return [
                    ...prevCart,
                    {
                        productId: product.productId,
                        name: product.name,
                        unitPrice: product.unitPrice,
                        unit: product.unit,
                        moq: product.moq,
                        stock: product.stock,
                        vendorId: product.vendorId,
                        vendorName: product.vendorName,
                        quantity: Math.max(product.moq || 1, quantity)
                    }
                ];
            }
        });
    };

    const updateCartQty = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    /* =====================================================
       ORDER ACTIONS
    ===================================================== */
    const placeOrder = (newOrder) => {
        setStoreData((prev) => {
            // Deduct product stock
            const updatedProducts = prev.products.map((p) => {
                const orderedItem = newOrder.items.find((i) => i.productId === p.productId);
                if (orderedItem) {
                    return {
                        ...p,
                        stock: Math.max(0, p.stock - orderedItem.quantity)
                    };
                }
                return p;
            });

            return {
                ...prev,
                products: updatedProducts,
                orders: [newOrder, ...prev.orders]
            };
        });

        clearCart();
    };

    const updateOrderStatus = (orderId, newStatus, courier, trackingNumber, note) => {
        setStoreData((prev) => {
            const updatedOrders = prev.orders.map((ord) => {
                if (ord.orderId === orderId) {
                    const historyEntry = {
                        status: newStatus,
                        time: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        note: note || `Status updated to ${newStatus}`
                    };
                    return {
                        ...ord,
                        status: newStatus,
                        courier: courier || ord.courier,
                        trackingNumber: trackingNumber || ord.trackingNumber,
                        history: [...(ord.history || []), historyEntry]
                    };
                }
                return ord;
            });

            return {
                ...prev,
                orders: updatedOrders
            };
        });
    };

    /* =====================================================
       VENDOR PRODUCT CRUD
    ===================================================== */
    const addProduct = async (newProduct) => {
        try {
            const payload = {
                productName: newProduct.name,
                price: newProduct.unitPrice,
                stockQuantity: newProduct.stock,
                description: newProduct.description || "",
                category: newProduct.categoryId,
                vendor: newProduct.vendorId,
                status: "available"
            };

            const createdProduct = await api.createProduct(payload);
            const normalizedProduct = normalizeProduct(createdProduct);

            setStoreData((prev) => ({
                ...prev,
                products: [normalizedProduct, ...prev.products]
            }));

            alert("Product added successfully!");
        } catch (error) {
            console.error("Create product error:", error);
            alert(`Failed to add product: ${error.message}`);
        }
    };

    const updateProduct = async (updatedProduct) => {
        try {
            const payload = {
                productName: updatedProduct.name,
                price: updatedProduct.unitPrice,
                stockQuantity: updatedProduct.stock,
                description: updatedProduct.description || "",
                category: updatedProduct.categoryId,
                vendor: updatedProduct.vendorId,
                status: updatedProduct.status === "active"
                    ? "available"
                    : updatedProduct.status
            };

            const updated = await api.updateProduct(
                updatedProduct.productId,
                payload
            );

            const normalizedProduct = normalizeProduct(updated);

            setStoreData((prev) => ({
                ...prev,
                products: prev.products.map((p) =>
                    p.productId === updatedProduct.productId
                        ? normalizedProduct
                        : p
                )
            }));

            alert("Product updated successfully!");
        } catch (error) {
            console.error("Update product error:", error);
            alert(`Failed to update product: ${error.message}`);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await api.deleteProduct(productId);

            setStoreData((prev) => ({
                ...prev,
                products: prev.products.filter(
                    (p) => p.productId !== productId
                )
            }));

            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Delete product error:", error);
            alert(`Failed to delete product: ${error.message}`);
        }
    };

    /* =====================================================
       RFQ MANAGEMENT
    ===================================================== */
    const createRfq = (newRfq) => {
        setStoreData((prev) => ({
            ...prev,
            rfqs: [newRfq, ...prev.rfqs]
        }));
    };

    const submitRfqQuote = (rfqId, quote) => {
        setStoreData((prev) => ({
            ...prev,
            rfqs: prev.rfqs.map((rfq) => {
                if (rfq.rfqId === rfqId) {
                    return {
                        ...rfq,
                        status: "Quoted",
                        responses: [...(rfq.responses || []), quote]
                    };
                }
                return rfq;
            })
        }));
    };

    const acceptRfqQuote = (rfqId, vendorId) => {
        setStoreData((prev) => ({
            ...prev,
            rfqs: prev.rfqs.map((rfq) =>
                rfq.rfqId === rfqId ? { ...rfq, status: "Accepted" } : rfq
            )
        }));
    };

    /* =====================================================
       REVIEWS, VENDORS, CATEGORIES & USERS
    ===================================================== */
    const addVendorReview = (newReview) => {
        setStoreData((prev) => ({
            ...prev,
            reviews: [newReview, ...prev.reviews]
        }));
    };

    const verifyVendor = (vendorId, status) => {
        setStoreData((prev) => ({
            ...prev,
            vendors: prev.vendors.map((v) =>
                v.vendorId === vendorId ? { ...v, status } : v
            )
        }));
    };

    const addCategory = (newCategory) => {
        setStoreData((prev) => ({
            ...prev,
            categories: [...prev.categories, newCategory]
        }));
    };

    const deleteCategory = (categoryId) => {
        setStoreData((prev) => ({
            ...prev,
            categories: prev.categories.filter((c) => c.categoryId !== categoryId)
        }));
    };

    const registerUser = (newUser) => {
        setStoreData((prev) => {
            const next = { ...prev, users: [...prev.users, newUser] };
            if (newUser.role === "vendor") {
                const newVendor = {
                    vendorId: "VEN-" + Math.floor(100 + Math.random() * 900),
                    userId: newUser.userId,
                    businessName: newUser.companyName,
                    businessEmail: newUser.email,
                    phone: newUser.phone,
                    gstNumber: newUser.gstNumber,
                    address: newUser.address,
                    bankDetails: "State Bank of India - Acc: 39988221100 - IFSC: SBIN0001234",
                    rating: 5.0,
                    reviewCount: 0,
                    status: "verified",
                    joinedDate: new Date().toISOString().split("T")[0]
                };
                next.vendors = [...next.vendors, newVendor];
            }
            return next;
        });
    };

    const loginUser = async (email, password) => {
        const result = await api.login(email, password);
        localStorage.setItem("bizhub_token", result.token);
        localStorage.setItem("bizhub_user", JSON.stringify(result.user));
        setCurrentUser(result.user);
        return result.user;
    };

    const registerUserWithBackend = async (payload) => {
        const result = await api.register(payload);
        localStorage.setItem("bizhub_token", result.token);
        localStorage.setItem("bizhub_user", JSON.stringify(result.user));
        setCurrentUser(result.user);
        return result.user;
    };

    const resetToDefault = () => {
        const fresh = resetStoreData();
        setStoreData(fresh);
        setCart([]);
    };

    /* =====================================================
       PAGE ROUTING
    ===================================================== */
    if (page === "about") {
        return (
            <About
                setPage={setPage}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                cart={cart}
            />
        );
    }

    if (page === "contact") {
        return (
            <Contact
                setPage={setPage}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                cart={cart}
            />
        );
    }

    if (page === "catalog") {
        return (
            <Catalog
                storeData={storeData}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                cart={cart}
                addToCart={addToCart}
                setPage={setPage}
            />
        );
    }

    if (page === "cart") {
        return (
            <Cart
                cart={cart}
                updateCartQty={updateCartQty}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setPage={setPage}
            />
        );
    }

    if (page === "checkout") {
        return (
            <Checkout
                cart={cart}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setPage={setPage}
                placeOrder={placeOrder}
            />
        );
    }

    if (page === "buyer-dashboard") {
        return (
            <BuyerDashboard
                storeData={storeData}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setPage={setPage}
                createRfq={createRfq}
                acceptRfqQuote={acceptRfqQuote}
                addVendorReview={addVendorReview}
            />
        );
    }

    if (page === "vendor-dashboard") {
        return (
            <VendorDashboard
                storeData={storeData}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setPage={setPage}
                addProduct={addProduct}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct}
                updateOrderStatus={updateOrderStatus}
                submitRfqQuote={submitRfqQuote}
            />
        );
    }

    if (page === "admin-dashboard") {
        return (
            <AdminDashboard
                storeData={storeData}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setPage={setPage}
                verifyVendor={verifyVendor}
                addCategory={addCategory}
                deleteCategory={deleteCategory}
                resetToDefault={resetToDefault}
            />
        );
    }

    // Default: Home Page
    return (
        <Home
            setPage={setPage}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            cart={cart}
            addToCart={addToCart}
            storeData={storeData}
            registerUser={registerUser}
            loginUser={loginUser}
            registerUserWithBackend={registerUserWithBackend}
            backendConnected={backendConnected}
        />
    );
}

export default App;