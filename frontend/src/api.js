const API_BASE_URL = import.meta.env.VITE_API_URL || "https://your-backend.vercel.app/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("bizhub_token");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }
  return data;
}

export const api = {
  health: () => fetch(`${API_BASE_URL.replace(/\/api$/, "")}/`).then((r) => r.json()),
  login: (email, password) => request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  }),
  register: (payload) => request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  }),
  products: () => request("/products"),
  categories: () => request("/categories"),
  vendors: () => request("/vendors"),
  createProduct: (payload) => request("/products", {
    method: "POST",
    body: JSON.stringify(payload)
  }),
  updateProduct: (id, payload) => request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  }),
  deleteProduct: (id) => request(`/products/${id}`, { method: "DELETE" })
};

export function normalizeProduct(product) {
  return {
    ...product,
    productId: product._id,
    name: product.productName,
    unitPrice: product.price,
    stock: product.stockQuantity,
    unit: "Unit",
    moq: 1,
    status: product.status === "available" ? "active" : product.status,
    vendorId: product.vendor?._id || product.vendor || "",
    vendorName: product.vendor?.vendorName || product.vendor?.companyName || "Vendor",
    categoryId: product.category?._id || product.category || "",
    categoryName: product.category?.categoryName || "Category",
    sku: product._id
  };
}

export function normalizeCategory(category) {
  return {
    ...category,
    categoryId: category._id,
    name: category.categoryName
  };
}

export function normalizeVendor(vendor) {
  return {
    ...vendor,
    vendorId: vendor._id,
    businessName: vendor.companyName || vendor.vendorName,
    vendorName: vendor.vendorName
  };
}
