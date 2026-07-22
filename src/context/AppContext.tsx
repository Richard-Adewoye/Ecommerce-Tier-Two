import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, DeliveryZone } from '../types';
import { INITIAL_PRODUCTS, DELIVERY_ZONES } from '../data';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  currentUser: User | null;
  orders: Order[];
  deliveryZones: DeliveryZone[];
  selectedZone: DeliveryZone | null;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  currentView: 'shop' | 'checkout' | 'receipt' | 'account' | 'admin' | 'auth';
  setCurrentView: (view: 'shop' | 'checkout' | 'receipt' | 'account' | 'admin' | 'auth') => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Auth Actions
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, phone: string, address: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (name: string, phone: string, address: string) => void;
  
  // Checkout & Order Actions
  setSelectedZone: (zone: DeliveryZone | null) => void;
  placeOrder: (customerInfo: { name: string; email: string; phone: string; address: string }, zoneId: string, reference: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateOrderPaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;
  
  // Admin Product Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  
  // Toast notifications
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample initial historical orders for beautiful visual charts and records
const getInitialOrders = (products: Product[]): Order[] => {
  return [
    {
      id: 'order-1',
      orderId: 'NG-49102',
      items: [
        { product: products[0] || INITIAL_PRODUCTS[0], quantity: 2, subtotal: (products[0]?.price || 4500) * 2 },
        { product: products[1] || INITIAL_PRODUCTS[1], quantity: 1, subtotal: (products[1]?.price || 2800) * 1 },
      ],
      subtotal: (products[0]?.price || 4500) * 2 + (products[1]?.price || 2800) * 1,
      deliveryZone: 'Ibadan Central',
      deliveryFee: 1500,
      tax: 250,
      grandTotal: (products[0]?.price || 4500) * 2 + (products[1]?.price || 2800) * 1 + 1500 + 250,
      customerInfo: {
        name: 'Ayo David',
        email: 'customer@naijamart.com',
        phone: '08031234567',
        address: '15 Agbowo Shopping Complex, UI, Ibadan, Oyo State'
      },
      status: 'Delivered',
      paymentStatus: 'Paid',
      paymentDetails: {
        reference: 'T739218392109',
        channel: 'Paystack Card',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: 'Completed'
    },
    {
      id: 'order-2',
      orderId: 'NG-81203',
      items: [
        { product: products[3] || INITIAL_PRODUCTS[3], quantity: 1, subtotal: (products[3]?.price || 9200) * 1 },
        { product: products[6] || INITIAL_PRODUCTS[6], quantity: 3, subtotal: (products[6]?.price || 1200) * 3 },
      ],
      subtotal: (products[3]?.price || 9200) * 1 + (products[6]?.price || 1200) * 3,
      deliveryZone: 'Ibadan Metro North & South',
      deliveryFee: 2500,
      tax: 450,
      grandTotal: (products[3]?.price || 9200) * 1 + (products[6]?.price || 1200) * 3 + 2500 + 450,
      customerInfo: {
        name: 'Ayo David',
        email: 'ayo.david@example.com',
        phone: '08129876543',
        address: 'Flat 4B, Emerald Heights, Bodija Estate, Ibadan, Oyo State'
      },
      status: 'Processing',
      paymentStatus: 'Paid',
      paymentDetails: {
        reference: 'T529012839102',
        channel: 'Paystack Bank Transfer',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: 'Today, 4:00 PM'
    },
    {
      id: 'order-3',
      orderId: 'NG-11209',
      items: [
        { product: products[11] || INITIAL_PRODUCTS[11], quantity: 1, subtotal: (products[11]?.price || 6000) * 1 },
      ],
      subtotal: (products[11]?.price || 6000) * 1,
      deliveryZone: 'Ibadan Outskirts & Suburbs',
      deliveryFee: 3500,
      tax: 150,
      grandTotal: (products[11]?.price || 6000) * 1 + 3500 + 150,
      customerInfo: {
        name: 'Ayo David',
        email: 'ayo.david.outskirts@example.com',
        phone: '09055556666',
        address: '5 Ring Road, Opposite Shoprite, Ibadan, Oyo State'
      },
      status: 'Pending',
      paymentStatus: 'Unpaid',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: 'Tomorrow, 12:00 PM'
    }
  ];
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state (stored in localStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nm_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nm_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Auth User state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nm_currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Registered Users database state (for simulation)
  const [users, setUsers] = useState<any[]>(() => {
    const saved = localStorage.getItem('nm_users');
    const defaultUsers = [
      {
        id: 'user-admin',
        name: 'Ayo David (Admin)',
        email: 'admin@naijamart.com',
        password: 'admin123',
        phone: '08099998888',
        address: 'NaijaMart HQ, Dugbe Commercial Area, Ibadan, Oyo State',
        savedAddresses: ['NaijaMart HQ, Dugbe Commercial Area, Ibadan, Oyo State'],
        isAdmin: true
      },
      {
        id: 'user-customer',
        name: 'Ayo David',
        email: 'customer@naijamart.com',
        password: 'customer123',
        phone: '08031234567',
        address: '15 Agbowo Shopping Complex, UI, Ibadan, Oyo State',
        savedAddresses: ['15 Agbowo Shopping Complex, UI, Ibadan, Oyo State', 'Plot 52, Bodija Housing Estate, Ibadan, Oyo State'],
        isAdmin: false
      }
    ];
    if (!saved) {
      localStorage.setItem('nm_users', JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(saved);
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nm_orders');
    return saved ? JSON.parse(saved) : getInitialOrders(products);
  });

  // Other UI States
  const [selectedZone, setSelectedZone] = useState<DeliveryZone | null>(DELIVERY_ZONES[0]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'shop' | 'checkout' | 'receipt' | 'account' | 'admin' | 'auth'>('shop');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Synchronize states with localStorage
  useEffect(() => {
    localStorage.setItem('nm_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nm_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nm_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nm_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nm_users', JSON.stringify(users));
  }, [users]);

  // Toast handler
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Cart actions
  const addToCart = (product: Product, quantity: number = 1) => {
    if (product.stock <= 0) {
      showToast('Product is currently out of stock!', 'error');
      return;
    }
    
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQuantity = existing.quantity + quantity;
        if (newQuantity > product.stock) {
          showToast(`Cannot add more. Only ${product.stock} units available in stock!`, 'error');
          return prev;
        }
        showToast(`Updated ${product.name} quantity in cart!`, 'success');
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      showToast(`Added ${product.name} to cart!`, 'success');
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const removedItem = prev.find(item => item.product.id === productId);
      if (removedItem) {
        showToast(`Removed ${removedItem.product.name} from cart`, 'info');
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const item = cart.find((c) => c.product.id === productId);
    if (item && quantity > item.product.stock) {
      showToast(`Only ${item.product.stock} units available in stock!`, 'error');
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Shopping cart cleared', 'info');
  };

  // Auth actions
  const login = (email: string, password: string) => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      const loggedInUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        savedAddresses: user.savedAddresses || [],
        isAdmin: !!user.isAdmin
      };
      setCurrentUser(loggedInUser);
      showToast(`Welcome back, ${loggedInUser.name}!`, 'success');
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password combination' };
  };

  const register = (name: string, email: string, phone: string, address: string, password: string) => {
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'An account with this email already exists' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      phone,
      address,
      savedAddresses: [address],
      isAdmin: false
    };

    setUsers((prev) => [...prev, newUser]);
    const loggedInUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
      savedAddresses: newUser.savedAddresses,
      isAdmin: false
    };

    setCurrentUser(loggedInUser);
    showToast('Account created successfully!', 'success');
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('shop');
    showToast('Logged out successfully', 'info');
  };

  const updateProfile = (name: string, phone: string, address: string) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      name,
      phone,
      address,
      savedAddresses: Array.from(new Set([...currentUser.savedAddresses, address]))
    };

    setCurrentUser(updatedUser);
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, name, phone, address, savedAddresses: updatedUser.savedAddresses } : u))
    );
    showToast('Profile updated successfully', 'success');
  };

  // Checkout and orders
  const placeOrder = (
    customerInfo: { name: string; email: string; phone: string; address: string },
    zoneId: string,
    reference: string
  ) => {
    const zone = DELIVERY_ZONES.find((z) => z.id === zoneId) || DELIVERY_ZONES[0];
    const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.05); // 5% VAT
    const grandTotal = subtotal + zone.fee + tax;

    const orderItems = cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity
    }));

    const uniqueNum = Math.floor(10000 + Math.random() * 90000);
    const orderIdCode = `NG-${uniqueNum}`;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderId: orderIdCode,
      items: orderItems,
      subtotal,
      deliveryZone: zone.name,
      deliveryFee: zone.fee,
      tax,
      grandTotal,
      customerInfo,
      status: 'Pending',
      paymentStatus: 'Paid',
      paymentDetails: {
        reference,
        channel: 'Paystack Card Checkout',
        date: new Date().toISOString()
      },
      createdAt: new Date().toISOString(),
      estimatedDelivery: zone.timeline
    };

    // Deduct stock levels live!
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const cartItem = cart.find((item) => item.product.id === p.id);
        if (cartItem) {
          return {
            ...p,
            stock: Math.max(0, p.stock - cartItem.quantity)
          };
        }
        return p;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart
    setSelectedOrderId(newOrder.id);
    setCurrentView('receipt');
    showToast(`Order ${orderIdCode} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    showToast(`Order status updated to: ${status}`, 'success');
  };

  const updateOrderPaymentStatus = (orderId: string, status: Order['paymentStatus']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, paymentStatus: status } : order
      )
    );
    showToast(`Payment status updated to: ${status}`, 'success');
  };

  // Admin Product Actions
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
    showToast(`Product "${product.name}" added to catalog`, 'success');
  };

  const updateProduct = (updatedProd: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProd.id ? updatedProd : p))
    );
    showToast(`Product "${updatedProd.name}" updated successfully`, 'success');
  };

  const deleteProduct = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast(`Product "${prod?.name || productId}" deleted`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        currentUser,
        orders,
        deliveryZones: DELIVERY_ZONES,
        selectedZone,
        isCartOpen,
        setCartOpen,
        currentView,
        setCurrentView,
        selectedOrderId,
        setSelectedOrderId,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        login,
        register,
        logout,
        updateProfile,
        setSelectedZone,
        placeOrder,
        updateOrderStatus,
        updateOrderPaymentStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
