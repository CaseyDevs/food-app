import Products from "./components/Products";
import Header from "./components/Header";
import { ProductsContextProvider } from "./store/products-context";
import { CartContextProvider } from "./store/cart-context";
import CartModal from "./components/CartModal";

function App() {
  return (
    <ProductsContextProvider>
      <CartContextProvider>
        <CartModal />
        <Header />
        <Products />
      </CartContextProvider>
    </ProductsContextProvider>
  );
}

export default App;
