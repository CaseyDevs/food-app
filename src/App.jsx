import Products from "./components/Products";
import Header from "./components/Header";
import { ProductsContextProvider } from "./store/products-context";
import { CartContextProvider } from "./store/cart-context";

function App() {
  return (
    <ProductsContextProvider>
      <CartContextProvider>
        <Header />
        <Products />
      </CartContextProvider>
    </ProductsContextProvider>
  );
}

export default App;
