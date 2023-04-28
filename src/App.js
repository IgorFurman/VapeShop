import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact/contact";
import { Cart } from "./pages/cart/cart";
import { Footer} from './components/footer'
import { ShopContextProvider } from "./context/shop-context.js";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
     <Router>
      <Navbar />
      <Routes>
        <Route path= "/" element={<Shop />} />
        <Route path= "/cart" element={<Cart />} />
        <Route path= "/contact" element={<Contact />} />
      </Routes>
      <Footer />
     </Router>
     </ShopContextProvider>
    </div>
  );
}

export default App;
