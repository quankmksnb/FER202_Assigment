import { BrowserRouter as Router } from "react-router-dom";
import "./assets/App.css";
import CategoryProvider from "./context/CategoryContext";
import CartProvider from "./context/CartContext";
import AppRoutes from "./components/routes/AppRoutes";

const App = () => {
  return (
    <CategoryProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </CategoryProvider>
  );
};

export default App;
