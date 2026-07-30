import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header, AuthForm, Footer, ScrollToTop } from "./components";
import { Home, Menu, About, Blog, NotFound, Orders } from "./pages";
import OrdersStatusPage from "./pages/OrdersStatusPage.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";

function App() {
  return (
    <AnimatePresence>
      <div className="flex flex-col  text-textColor">
        <ScrollToTop />
        <Header />
        <main className="mt-[60px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/track-order/:orderId"
              element={<OrdersStatusPage />}
            />

            <Route path="/admin/orders" element={<AdminOrders />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  );
}

export default App;
