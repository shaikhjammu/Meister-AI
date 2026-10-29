import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CartItemPage from "./pages/CartItemPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex gap-6 items-center">
        <span className="font-bold text-lg text-gray-800">E-Commerce Store & Marketplace</span>
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <Link to="/categorys" className="hover:text-blue-600">Categorys</Link>
          <Link to="/cartItems" className="hover:text-blue-600">CartItems</Link>
          <Link to="/orders" className="hover:text-blue-600">Orders</Link>
          <Link to="/reviews" className="hover:text-blue-600">Reviews</Link>
          <Link to="/payments" className="hover:text-blue-600">Payments</Link>
        <Link to="/login" className="ml-auto hover:text-blue-600">Login</Link>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/categorys" element={<CategoryPage />} />
        <Route path="/cartItems" element={<CartItemPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/payments" element={<PaymentPage />} />
        </Routes>
      </main>
    </div>
  );
}
