import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import Login from './Login';

// Initial Product Data
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    description: "Industry-leading noise cancellation with two processors controlling 8 microphones for unprecedented noise cancellation.",
    price: 398.00,
    rating: 4.8,
    reviews: 12453,
    image: "https://picsum.photos/seed/headphones/600/600",
    category: "Eletrônicos",
    amazonLink: "https://amazon.com",
    badge: "Mais Vendido"
  },
  {
    id: 2,
    title: "Apple 2023 MacBook Pro Laptop M3 Pro chip",
    description: "With an 11-core CPU, 14-core GPU, 18GB Unified Memory, and 512GB SSD Storage. Works seamlessly with Apple devices.",
    price: 1999.00,
    rating: 4.9,
    reviews: 3421,
    image: "https://picsum.photos/seed/macbook/600/600",
    category: "Eletrônicos",
    amazonLink: "https://amazon.com"
  },
  {
    id: 3,
    title: "Ninja AF101 Air Fryer that Crisps, Roasts, Reheats",
    description: "Now enjoy guilt-free food. Air fry with up to 75% less fat than traditional frying methods.",
    price: 89.99,
    rating: 4.7,
    reviews: 45210,
    image: "https://picsum.photos/seed/airfryer/600/600",
    category: "Casa & Cozinha",
    amazonLink: "https://amazon.com",
    badge: "Amazon Indica"
  },
  {
    id: 4,
    title: "Kindle Paperwhite (8 GB) – Tela de 6.8\"",
    description: "Purpose-built for reading – With a flush-front design and 300 ppi glare-free display that reads like real paper.",
    price: 139.99,
    rating: 4.8,
    reviews: 8932,
    image: "https://picsum.photos/seed/kindle/600/600",
    category: "Eletrônicos",
    amazonLink: "https://amazon.com"
  },
  {
    id: 5,
    title: "Copo Térmico YETI Rambler 20 oz, Aço Inoxidável",
    description: "These Ramblers come standard with our YETI MagSlider Lid, the only drink lid that uses the power of magnets.",
    price: 35.00,
    rating: 4.9,
    reviews: 112040,
    image: "https://picsum.photos/seed/yeti/600/600",
    category: "Casa & Cozinha",
    amazonLink: "https://amazon.com"
  },
  {
    id: 6,
    title: "Logitech MX Master 3S - Mouse Sem Fio",
    description: "Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks.",
    price: 99.99,
    rating: 4.7,
    reviews: 18432,
    image: "https://picsum.photos/seed/mouse/600/600",
    category: "Eletrônicos",
    amazonLink: "https://amazon.com"
  }
];

export default function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('amazon_affiliate_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_authenticated') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('admin_authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  useEffect(() => {
    localStorage.setItem('amazon_affiliate_products', JSON.stringify(products));
  }, [products]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route 
          path="/admin" 
          element={
            isAuthenticated 
              ? <Admin products={products} setProducts={setProducts} onLogout={handleLogout} /> 
              : <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </Router>
  );
}
