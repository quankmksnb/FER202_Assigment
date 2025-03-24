import { BrowserRouter as Router } from "react-router-dom";
import "./assets/App.css";
import CategoryProvider from "./context/CategoryContext";
import CartProvider from "./context/CartContext";
import { SalerProvider } from "./context/SalerContext";
import { ProductProvider } from "./context/ProductContext";
import AppRoutes from "./components/routes/AppRoutes";

const App = () => {
  return (
    <ProductProvider>
      <CategoryProvider>
        <CartProvider>
          <SalerProvider>
            <Router>
              <AppRoutes />
            </Router>
          </SalerProvider>
        </CartProvider>
      </CategoryProvider>
    </ProductProvider>
  );
};

export default App;
