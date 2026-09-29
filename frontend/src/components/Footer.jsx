/* =========================================================
   FOOTER COMPONENT
   Multi-Vendor B2B E-Commerce Platform
========================================================= */

function Footer() {
    return (
        <footer className="bg-dark text-light pt-5 pb-3 border-top border-secondary">
            <div className="container">
                <div className="row g-4 mb-4">
                    {/* Brand & Mission */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
                            <i className="bi bi-diagram-3-fill text-primary"></i>
                            BizHub B2B Platform
                        </h5>
                        <p className="text-secondary small">
                            A specialized Multi-Vendor Business-to-Business (B2B) digital marketplace connecting verified manufacturers, wholesalers, and corporate buyers for bulk purchasing, RFQs, and procurement management.
                        </p>
                        <div className="d-flex gap-3 text-secondary">
                            <span><i className="bi bi-shield-check text-success me-1"></i> GST Verified</span>
                            <span><i className="bi bi-truck text-info me-1"></i> Pan-India Logistics</span>
                        </div>
                    </div>

                    {/* Quick Wholesale Categories */}
                    <div className="col-lg-2 col-md-6">
                        <h6 className="text-uppercase text-white fw-bold mb-3 small">Categories</h6>
                        <ul className="list-unstyled text-secondary small mb-0">
                            <li className="mb-2">Industrial Safety</li>
                            <li className="mb-2">Packaging & Shipping</li>
                            <li className="mb-2">IT & Server Hardware</li>
                            <li className="mb-2">Fasteners & Raw Materials</li>
                            <li className="mb-2">Commercial Electricals</li>
                        </ul>
                    </div>

                    {/* Platform Roles */}
                    <div className="col-lg-2 col-md-6">
                        <h6 className="text-uppercase text-white fw-bold mb-3 small">Platform Modules</h6>
                        <ul className="list-unstyled text-secondary small mb-0">
                            <li className="mb-2">Bulk Product Catalog</li>
                            <li className="mb-2">RFQ Quotation System</li>
                            <li className="mb-2">Vendor Storefront & Stock</li>
                            <li className="mb-2">Order Tracking (Net-30/PO)</li>
                            <li className="mb-2">Admin Governance</li>
                        </ul>
                    </div>

                    {/* Project Team Credits */}
                    <div className="col-lg-4 col-md-6">
                        <h6 className="text-uppercase text-white fw-bold mb-3 small">OOAD & WT Lab Project</h6>
                        <p className="text-secondary small mb-2">
                            <strong>Project Title:</strong> Multi-Vendor B2B E-Commerce Platform
                        </p>
                        <div className="p-3 bg-black bg-opacity-50 rounded border border-secondary border-opacity-25 small text-secondary">
                            <div className="fw-bold text-white mb-1">Developed By Team - 1:</div>
                            <div>• S. Sai Surya Kiran (a24126511048)</div>
                            <div>• B. Bhargavi (a24126511006)</div>
                            <div>• Sk. Basheera (a24126511046)</div>
                            <div>• P. Sai Kumar (a24126511037)</div>
                            <div>• G. Hemanth Kumar (a24126511017)</div>
                        </div>
                    </div>
                </div>

                <div className="border-top border-secondary border-opacity-50 pt-3 text-center text-secondary small">
                    © {new Date().getFullYear()} BizHub Multi-Vendor B2B E-Commerce Platform. All Rights Reserved. Built for OOAD / WT Laboratory.
                </div>
            </div>
        </footer>
    );
}

export default Footer;