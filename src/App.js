import { BrowserRouter as Router } from "react-router-dom";
import "./assets/App.css";
import CategoryProvider from "./context/CategoryContext";
import CartProvider from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import AppRoutes from "./components/routes/AppRoutes";

const App = () => {
  return (
    <ProductProvider>
      <CategoryProvider>
        <CartProvider>
          <Router>
            <AppRoutes />
          </Router>
        </CartProvider>
      </CategoryProvider>
    </ProductProvider>
  );
};

export default App;
