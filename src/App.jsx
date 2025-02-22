import Products from "./components/Products";
import Header from "./components/Header";
import { ProductsContextProvider } from "./store/products-context";

function App() {
  return (
    <>
      <Header />
      <ProductsContextProvider>
        <Products />
      </ProductsContextProvider>
    </>
  );
}

export default App;
