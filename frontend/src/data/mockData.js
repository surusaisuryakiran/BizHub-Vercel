/* =========================================================
   MOCK DATA & LOCAL STORAGE HELPER FOR B2B PLATFORM
   OOAD Lab Project - Multi-Vendor B2B E-Commerce
========================================================= */

// Default sample data matching OOAD Lab requirements
const INITIAL_DATA = {
    // 1. SYSTEM USERS
    users: [
        {
            userId: "USR-001",
            name: "Rajesh Sharma",
            email: "buyer@acme.com",
            phone: "+91 98765 11223",
            role: "buyer",
            companyName: "Acme Industrial Enterprises",
            gstNumber: "37AAACA1234A1Z5",
            address: "Plot 45, Auto Nagar, Gajuwaka, Visakhapatnam, AP",
            status: "active"
        },
        {
            userId: "USR-002",
            name: "Suresh Reddy",
            email: "vendor@apex.com",
            phone: "+91 98480 22334",
            role: "vendor",
            vendorId: "VEN-001",
            companyName: "Apex Industrial Supplies Ltd",
            gstNumber: "37AAAPX5678B1Z2",
            address: "Industrial Estate, Phase II, Visakhapatnam, AP",
            status: "active"
        },
        {
            userId: "USR-003",
            name: "Vikram Mehta",
            email: "vendor@globalpack.com",
            phone: "+91 97000 33445",
            role: "vendor",
            vendorId: "VEN-002",
            companyName: "Global Packaging Solutions",
            gstNumber: "37AABGP9012C1Z8",
            address: "Harbour Park Road, Visakhapatnam, AP",
            status: "active"
        },
        {
            userId: "USR-004",
            name: "System Admin",
            email: "admin@bizhub.com",
            phone: "+91 99887 76655",
            role: "admin",
            companyName: "BizHub B2B Platform Management",
            gstNumber: "37AAABZ0000D1Z1",
            address: "Tech Hub, MVP Colony, Visakhapatnam, AP",
            status: "active"
        }
    ],

    // 2. VENDORS / SUPPLIERS
    vendors: [
        {
            vendorId: "VEN-001",
            userId: "USR-002",
            businessName: "Apex Industrial Supplies Ltd",
            businessEmail: "sales@apexsupplies.com",
            phone: "+91 98480 22334",
            gstNumber: "37AAAPX5678B1Z2",
            address: "Industrial Estate, Phase II, Visakhapatnam, AP",
            bankDetails: "HDFC Bank - Acc: 50200012345678 - IFSC: HDFC0001234",
            rating: 4.8,
            reviewCount: 24,
            status: "verified", // verified, pending, suspended
            joinedDate: "2026-01-15"
        },
        {
            vendorId: "VEN-002",
            userId: "USR-003",
            businessName: "Global Packaging Solutions",
            businessEmail: "orders@globalpackaging.in",
            phone: "+91 97000 33445",
            gstNumber: "37AABGP9012C1Z8",
            address: "Harbour Park Road, Visakhapatnam, AP",
            bankDetails: "SBI Bank - Acc: 30123456789 - IFSC: SBIN0004567",
            rating: 4.6,
            reviewCount: 18,
            status: "verified",
            joinedDate: "2026-02-10"
        },
        {
            vendorId: "VEN-003",
            userId: "USR-005",
            businessName: "Techtronics Wholesale Hub",
            businessEmail: "b2b@techtronics.com",
            phone: "+91 91234 56780",
            gstNumber: "37AABTT3456E1Z9",
            address: "Dwaraka Nagar 3rd Lane, Visakhapatnam, AP",
            bankDetails: "ICICI Bank - Acc: 001105009988 - IFSC: ICIC0000011",
            rating: 4.9,
            reviewCount: 31,
            status: "verified",
            joinedDate: "2026-03-01"
        },
        {
            vendorId: "VEN-004",
            userId: "USR-006",
            businessName: "Nova Safety & Textiles",
            businessEmail: "supply@novasafety.in",
            phone: "+91 98855 44332",
            gstNumber: "37AAACN7890F1Z4",
            address: "Steel Plant Road, Kurmannapalem, Visakhapatnam",
            bankDetails: "Axis Bank - Acc: 9180200334455 - IFSC: UTIB0000234",
            rating: 4.5,
            reviewCount: 12,
            status: "pending", // waiting admin verification
            joinedDate: "2026-08-20"
        }
    ],

    // 3. CATEGORIES
    categories: [
        {
            categoryId: "CAT-001",
            name: "Industrial Tools & Safety",
            description: "Safety helmets, protective gear, power tools and heavy duty equipment",
            icon: "bi-shield-check"
        },
        {
            categoryId: "CAT-002",
            name: "Packaging & Shipping",
            description: "Corrugated boxes, bubble wraps, tapes and industrial packaging materials",
            icon: "bi-box-seam"
        },
        {
            categoryId: "CAT-003",
            name: "IT & Office Hardware",
            description: "Commercial networking cables, bulk toner cartridges, office electronics",
            icon: "bi-laptop"
        },
        {
            categoryId: "CAT-004",
            name: "Raw Materials & Fasteners",
            description: "Stainless steel bolts, industrial fasteners, sheet metal and fittings",
            icon: "bi-nut"
        },
        {
            categoryId: "CAT-005",
            name: "Commercial Electricals",
            description: "Industrial LED panels, heavy wiring, circuit breakers, and switches",
            icon: "bi-lightning-charge"
        }
    ],

    // 4. B2B PRODUCTS (With Minimum Order Quantity & Bulk Tier Pricing)
    products: [
        {
            productId: "PRD-101",
            vendorId: "VEN-001",
            vendorName: "Apex Industrial Supplies Ltd",
            categoryId: "CAT-001",
            name: "Industrial Heavy Duty Safety Helmets (Pack of 50)",
            sku: "APX-HLM-050",
            description: "ISI certified high-density polyethylene safety helmets with adjustable ratchet suspension. Ideal for construction and manufacturing units.",
            unitPrice: 4500, // Price per pack of 50 (i.e. Rs 90 / helmet)
            unit: "Pack (50 pcs)",
            moq: 2, // Min 2 packs (100 helmets)
            stock: 65,
            status: "active",
            tiers: [
                { minQty: 2, price: 4500 },
                { minQty: 10, price: 4100 },
                { minQty: 25, price: 3800 }
            ],
            badge: "Top Seller"
        },
        {
            productId: "PRD-102",
            vendorId: "VEN-001",
            vendorName: "Apex Industrial Supplies Ltd",
            categoryId: "CAT-001",
            name: "High-Visibility Reflective Safety Vests (Bundle of 100)",
            sku: "APX-VST-100",
            description: "Class 2 fluorescent neon safety jackets with 2-inch reflective strips and zipper closure. Durable polyester fabric.",
            unitPrice: 8500, // Rs 85 each
            unit: "Bundle (100 pcs)",
            moq: 1,
            stock: 40,
            status: "active",
            tiers: [
                { minQty: 1, price: 8500 },
                { minQty: 5, price: 7900 },
                { minQty: 15, price: 7300 }
            ],
            badge: "Bulk Stock"
        },
        {
            productId: "PRD-103",
            vendorId: "VEN-002",
            vendorName: "Global Packaging Solutions",
            categoryId: "CAT-002",
            name: "3-Ply Corrugated Shipping Boxes 12x10x8 inch (Bundle of 100)",
            sku: "GPS-BOX-100",
            description: "Heavy-duty kraft paper corrugated boxes with high bursting strength. Ideal for e-commerce dispatch, warehousing, and shipping.",
            unitPrice: 2200,
            unit: "Bundle (100 boxes)",
            moq: 5,
            stock: 120,
            status: "active",
            tiers: [
                { minQty: 5, price: 2200 },
                { minQty: 20, price: 1950 },
                { minQty: 50, price: 1750 }
            ],
            badge: "Wholesale Rate"
        },
        {
            productId: "PRD-104",
            vendorId: "VEN-002",
            vendorName: "Global Packaging Solutions",
            categoryId: "CAT-002",
            name: "Industrial Stretch Wrap Film Rolls 500mm x 300m (Box of 6 Rolls)",
            sku: "GPS-STR-006",
            description: "23-micron cast stretch film for pallet wrapping and bulk carton bundling. High puncture resistance and strong cling.",
            unitPrice: 3100,
            unit: "Box (6 Rolls)",
            moq: 3,
            stock: 85,
            status: "active",
            tiers: [
                { minQty: 3, price: 3100 },
                { minQty: 10, price: 2800 },
                { minQty: 25, price: 2550 }
            ],
            badge: "Factory Direct"
        },
        {
            productId: "PRD-105",
            vendorId: "VEN-003",
            vendorName: "Techtronics Wholesale Hub",
            categoryId: "CAT-003",
            name: "CAT6 Pure Copper UTP Ethernet Cable Drum (305 Meters)",
            sku: "TCH-CAT6-305",
            description: "Gigabit high-speed 550MHz solid bare copper networking cable drum. RoHS compliant, certified for commercial IT infrastructure.",
            unitPrice: 6200,
            unit: "Drum (305m)",
            moq: 2,
            stock: 35,
            status: "active",
            tiers: [
                { minQty: 2, price: 6200 },
                { minQty: 5, price: 5800 },
                { minQty: 10, price: 5400 }
            ],
            badge: "Certified"
        },
        {
            productId: "PRD-106",
            vendorId: "VEN-003",
            vendorName: "Techtronics Wholesale Hub",
            categoryId: "CAT-003",
            name: "Heavy Duty 8-Way Rackmount PDU Power Distribution Unit",
            sku: "TCH-PDU-008",
            description: "19-inch 1U server rack power strip with 16A overload protection, LED indicator, and 3-meter heavy gauge input cord.",
            unitPrice: 2800,
            unit: "Piece",
            moq: 4,
            stock: 50,
            status: "active",
            tiers: [
                { minQty: 4, price: 2800 },
                { minQty: 10, price: 2500 },
                { minQty: 20, price: 2250 }
            ],
            badge: "Standard"
        },
        {
            productId: "PRD-107",
            vendorId: "VEN-001",
            vendorName: "Apex Industrial Supplies Ltd",
            categoryId: "CAT-004",
            name: "Stainless Steel 304 Hex Bolts M8 x 50mm (Box of 500 pcs)",
            sku: "APX-BLT-500",
            description: "Corrosion-resistant grade A2-70 stainless steel full thread hex head bolts with matching nuts and spring washers included.",
            unitPrice: 3750,
            unit: "Box (500 pcs)",
            moq: 2,
            stock: 90,
            status: "active",
            tiers: [
                { minQty: 2, price: 3750 },
                { minQty: 8, price: 3400 },
                { minQty: 20, price: 3100 }
            ],
            badge: "ISO 9001"
        },
        {
            productId: "PRD-108",
            vendorId: "VEN-003",
            vendorName: "Techtronics Wholesale Hub",
            categoryId: "CAT-005",
            name: "Commercial 2x2 ft 40W Recessed LED Panel Lights (Carton of 10)",
            sku: "TCH-LED-010",
            description: "Cool daylight 6500K slim edge-lit LED ceiling panel for commercial offices, warehouses, and hospitals. Energy-saving driver included.",
            unitPrice: 9500,
            unit: "Carton (10 units)",
            moq: 2,
            stock: 28,
            status: "active",
            tiers: [
                { minQty: 2, price: 9500 },
                { minQty: 6, price: 8900 },
                { minQty: 15, price: 8200 }
            ],
            badge: "2-Yr Warranty"
        }
    ],

    // 5. B2B ORDERS
    orders: [
        {
            orderId: "ORD-2026-8801",
            buyerId: "USR-001",
            buyerName: "Rajesh Sharma (Acme Industrial Enterprises)",
            buyerEmail: "buyer@acme.com",
            vendorId: "VEN-001",
            vendorName: "Apex Industrial Supplies Ltd",
            orderDate: "2026-08-25",
            items: [
                {
                    productId: "PRD-101",
                    name: "Industrial Heavy Duty Safety Helmets (Pack of 50)",
                    quantity: 4,
                    unitPrice: 4500,
                    subtotal: 18000
                },
                {
                    productId: "PRD-102",
                    name: "High-Visibility Reflective Safety Vests (Bundle of 100)",
                    quantity: 2,
                    unitPrice: 8500,
                    subtotal: 17000
                }
            ],
            subtotal: 35000,
            gstAmount: 6300, // 18% GST
            shippingFee: 1200,
            totalAmount: 42500,
            paymentMethod: "Purchase Order (Net 30)",
            paymentStatus: "Invoice Sent",
            shippingAddress: "Plot 45, Auto Nagar, Gajuwaka, Visakhapatnam, AP - 530026",
            status: "Shipped", // Pending, Confirmed, Processing, Shipped, Delivered, Cancelled
            courier: "VRL Logistics Road Cargo",
            trackingNumber: "VRL-VIZ-8890214",
            notes: "Please deliver between 9 AM - 5 PM at Gate No. 2 warehouse.",
            history: [
                { status: "Pending", time: "2026-08-25 10:15 AM", note: "Order placed by buyer" },
                { status: "Confirmed", time: "2026-08-25 02:30 PM", note: "Confirmed by Apex Industrial" },
                { status: "Processing", time: "2026-08-26 11:00 AM", note: "Packed & awaiting logistics pickup" },
                { status: "Shipped", time: "2026-08-27 04:45 PM", note: "Dispatched via VRL Cargo" }
            ]
        },
        {
            orderId: "ORD-2026-8802",
            buyerId: "USR-001",
            buyerName: "Rajesh Sharma (Acme Industrial Enterprises)",
            buyerEmail: "buyer@acme.com",
            vendorId: "VEN-002",
            vendorName: "Global Packaging Solutions",
            orderDate: "2026-08-28",
            items: [
                {
                    productId: "PRD-103",
                    name: "3-Ply Corrugated Shipping Boxes 12x10x8 inch (Bundle of 100)",
                    quantity: 10,
                    unitPrice: 2200,
                    subtotal: 22000
                }
            ],
            subtotal: 22000,
            gstAmount: 3960,
            shippingFee: 800,
            totalAmount: 26760,
            paymentMethod: "Bank NEFT / RTGS",
            paymentStatus: "Paid",
            shippingAddress: "Plot 45, Auto Nagar, Gajuwaka, Visakhapatnam, AP - 530026",
            status: "Processing",
            courier: "Pending assignment",
            trackingNumber: "N/A",
            notes: "Urgent dispatch requested for month-end shipment.",
            history: [
                { status: "Pending", time: "2026-08-28 09:30 AM", note: "Order placed by buyer" },
                { status: "Confirmed", time: "2026-08-28 11:45 AM", note: "Payment verified by Accounts" },
                { status: "Processing", time: "2026-08-29 01:20 PM", note: "Manufacturing & bundling in progress" }
            ]
        }
    ],

    // 6. REQUEST FOR QUOTATION (RFQ) / CUSTOM CONTRACTS
    rfqs: [
        {
            rfqId: "RFQ-2026-401",
            buyerId: "USR-001",
            buyerName: "Rajesh Sharma",
            companyName: "Acme Industrial Enterprises",
            productTitle: "Custom Sized 5-Ply Heavy Export Cartons (10,000 pcs)",
            category: "Packaging & Shipping",
            targetQuantity: "10,000 units",
            targetPrice: "₹45 per box (Total ₹4,50,000)",
            requiredByDate: "2026-09-20",
            specifications: "Double wall 5-ply corrugated board with waterproof exterior wax coating and 2-color brand logo printing.",
            status: "Quoted", // Open, Quoted, Accepted, Closed
            createdDate: "2026-08-26",
            responses: [
                {
                    vendorId: "VEN-002",
                    vendorName: "Global Packaging Solutions",
                    quotedPrice: "₹42 per box (Total ₹4,20,000 + 18% GST)",
                    leadTime: "12 Working Days",
                    remarks: "We can manufacture these 5-ply export grade cartons with flexographic custom printing. Free delivery within AP.",
                    responseDate: "2026-08-27"
                }
            ]
        },
        {
            rfqId: "RFQ-2026-402",
            buyerId: "USR-001",
            buyerName: "Rajesh Sharma",
            companyName: "Acme Industrial Enterprises",
            productTitle: "Industrial Grade Stainless Steel Flange Bolts (20,000 pcs)",
            category: "Raw Materials & Fasteners",
            targetQuantity: "20,000 pcs",
            targetPrice: "₹8 per bolt",
            requiredByDate: "2026-09-30",
            specifications: "SS 316 Grade high tensile M10 flange bolts for chemical plant pipeline mounting.",
            status: "Open",
            createdDate: "2026-08-29",
            responses: []
        }
    ],

    // 7. VENDOR REVIEWS & RATINGS
    reviews: [
        {
            reviewId: "REV-01",
            vendorId: "VEN-001",
            buyerName: "Acme Industrial Enterprises",
            rating: 5,
            comment: "Excellent quality safety helmets and fast pallet dispatch. The ISI certificates were provided promptly with the invoice.",
            date: "2026-08-20"
        },
        {
            reviewId: "REV-02",
            vendorId: "VEN-002",
            buyerName: "Coastal Logistics Corp",
            rating: 4,
            comment: "Corrugated boxes are sturdy and accurate to dimensions. Good supplier for bulk e-commerce packaging.",
            date: "2026-08-18"
        }
    ],

    // 8. NOTIFICATIONS
    notifications: [
        {
            id: "NOTIF-01",
            targetRole: "buyer",
            title: "Order Shipped",
            message: "Your Order ORD-2026-8801 has been dispatched via VRL Logistics.",
            time: "2026-08-27 04:45 PM",
            read: false
        },
        {
            id: "NOTIF-02",
            targetRole: "buyer",
            title: "New Quotation Received",
            message: "Global Packaging Solutions submitted a quote for RFQ-2026-401.",
            time: "2026-08-27 02:15 PM",
            read: true
        },
        {
            id: "NOTIF-03",
            targetRole: "vendor",
            title: "New Order Received",
            message: "Acme Industrial placed order ORD-2026-8802 worth ₹26,760.",
            time: "2026-08-28 09:30 AM",
            read: false
        }
    ]
};

const STORAGE_KEY = "b2b_multivendor_data_v1";

// Helper function to load data from localStorage or initialize with defaults
export function getStoreData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error("Failed to parse localStorage data", e);
    }
    // Initialize
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
}

// Helper function to save changes to localStorage
export function saveStoreData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error("Failed to save to localStorage", e);
    }
}

// Reset store back to initial sample state
export function resetStoreData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
}
