import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Order } from '../types';
import { 
  TrendingUp, ShoppingBag, Users, DollarSign, Plus, Edit2, Trash2, 
  Search, ClipboardList, CheckCircle2, ShieldAlert, X, Eye, RefreshCw 
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateOrderPaymentStatus,
    setSelectedOrderId,
    setCurrentView,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'kpis' | 'products' | 'orders'>('kpis');
  const [orderFilter, setOrderFilter] = useState<'All' | 'Pending' | 'Paid' | 'Processing' | 'Delivered' | 'Cancelled'>('All');
  
  // Product Form states
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState(0);
  const [prodCategory, setProdCategory] = useState('Fresh Produce');
  const [prodImage, setProdImage] = useState('');
  const [prodStock, setProdStock] = useState(10);
  const [prodUnit, setProdUnit] = useState('1kg Pack');

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // KPI calculations
  const paidOrders = orders.filter(o => o.paymentStatus === 'Paid');
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.grandTotal, 0);
  const totalOrdersCount = orders.length;
  const averageOrderValue = totalOrdersCount > 0 ? (totalRevenue / totalOrdersCount) : 0;
  const uniqueCustomers = Array.from(new Set(orders.map(o => o.customerInfo.email.toLowerCase()))).length;

  // Products CRUD handlers
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdDesc('');
    setProdPrice(0);
    setProdCategory('Fresh Produce');
    setProdImage('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400');
    setProdStock(20);
    setProdUnit('1kg Pack');
    setProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProdName(product.name);
    setProdDesc(product.description);
    setProdPrice(product.price);
    setProdCategory(product.category);
    setProdImage(product.image);
    setProdStock(product.stock);
    setProdUnit(product.unit);
    setProductModalOpen(true);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: prodName,
        description: prodDesc,
        price: Number(prodPrice),
        category: prodCategory,
        image: prodImage || editingProduct.image,
        stock: Number(prodStock),
        unit: prodUnit
      };
      updateProduct(updated);
    } else {
      const newProd = {
        name: prodName,
        description: prodDesc,
        price: Number(prodPrice),
        category: prodCategory,
        image: prodImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400',
        stock: Number(prodStock),
        unit: prodUnit,
        rating: 4.5
      };
      addProduct(newProd);
    }
    setProductModalOpen(false);
  };

  // Filters for orders
  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'All') return true;
    if (orderFilter === 'Paid') return o.paymentStatus === 'Paid';
    return o.status === orderFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-6.5 h-6.5 text-amber-500 fill-amber-50" />
            <span>NaijaMart Enterprise Dashboard</span>
          </h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">Real-Time Operational Controls & Stock Fulfilments</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setActiveTab('kpis');
              showToast('Refreshed operational indexes', 'info');
            }}
            className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-slate-500 hover:text-slate-800"
            title="Force refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer hover:bg-slate-800"
          >
            Preview Shop Front
          </button>
        </div>
      </div>

      {/* Admin Tab Selectors */}
      <div className="flex gap-2 border-b border-slate-100 pb-px">
        {['kpis', 'products', 'orders'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4.5 py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === tab
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {tab === 'kpis' ? 'Overview Analytics' : tab === 'products' ? 'Product Stock (CRUD)' : 'Customer Orders'}
          </button>
        ))}
      </div>

      {/* 1. OVERVIEW KPIS SECTION */}
      {activeTab === 'kpis' && (
        <div className="space-y-8">
          {/* Bento analytics grids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center justify-between shadow-xs">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Sales Revenue</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">{formatNaira(totalRevenue)}</h3>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Paid transactions on Paystack</span>
                </span>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center justify-between shadow-xs">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Operational Orders</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">{totalOrdersCount}</h3>
                <span className="text-[10px] text-slate-500 font-semibold">Total checkout conversions</span>
              </div>
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center justify-between shadow-xs">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Average Order Value</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">{formatNaira(averageOrderValue)}</h3>
                <span className="text-[10px] text-slate-500 font-semibold">Average Basket size</span>
              </div>
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center justify-between shadow-xs">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Customer Base</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">{uniqueCustomers}</h3>
                <span className="text-[10px] text-slate-500 font-semibold">Unique email receipts logged</span>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Quick fulfillment highlights list */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 shadow-xs">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-emerald-600" />
              <span>Real-Time Pending Dispatch list ({orders.filter(o => o.status === 'Pending').length})</span>
            </h3>

            {orders.filter(o => o.status === 'Pending').length === 0 ? (
              <p className="text-xs text-slate-400 font-medium py-4 text-center">🎉 All orders are fully processed! No pending dispatches at this hour.</p>
            ) : (
              <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto pr-1">
                {orders.filter(o => o.status === 'Pending').map((order) => (
                  <div key={order.id} className="py-3 flex items-center justify-between text-xs gap-4 first:pt-0">
                    <div>
                      <p className="font-bold text-slate-800">{order.orderId} — {order.customerInfo.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{order.deliveryZone} • {order.items.length} items • {formatNaira(order.grandTotal)}</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('orders');
                        setOrderFilter('Pending');
                      }}
                      className="px-3 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 font-bold rounded-lg"
                    >
                      Process Fulfillment
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. PRODUCT MANAGEMENT CRUD */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              Active Store Stock Catalog ({products.length} Items)
            </h3>
            <button
              onClick={openAddProductModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              id="admin-add-product-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Catalog grid inside admin panel */}
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-4 px-6">Product Details</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Price / Unit</th>
                    <th className="py-4 px-4">Stock Levels</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-100 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate max-w-[180px]">{product.name}</p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[180px] mt-0.5">{product.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold">{product.category}</td>
                      <td className="py-4 px-4 font-extrabold text-slate-900">
                        {formatNaira(product.price)} <br />
                        <span className="text-[10px] text-slate-400 font-normal">{product.unit}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-bold ${product.stock === 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full ${
                          product.stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {product.stock > 0 ? 'Available' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => openEditProductModal(product)}
                          className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all cursor-pointer inline-flex"
                          title="Edit product info"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer inline-flex"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. ORDER MANAGEMENT & LIVE STATUS TRIGGERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              Live Customer Orders Fulfillment Manager
            </h3>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1 sm:pb-0">
              {['All', 'Pending', 'Paid', 'Processing', 'Delivered', 'Cancelled'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setOrderFilter(filter as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    orderFilter === filter
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs">
            {filteredOrders.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-12 font-medium">No orders matched the selected filter: {orderFilter}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-4 px-6">Order ID & Date</th>
                      <th className="py-4 px-4">Customer Info</th>
                      <th className="py-4 px-4">Logistics Zone</th>
                      <th className="py-4 px-4">Fulfillment Status</th>
                      <th className="py-4 px-4">Payment status</th>
                      <th className="py-4 px-4">Grand Total</th>
                      <th className="py-4 px-6 text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <p className="font-extrabold text-slate-900 font-mono text-sm">{order.orderId}</p>
                          <p className="text-[10px] text-slate-400 mt-1 font-semibold">
                            {new Date(order.createdAt).toLocaleDateString('en-NG', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-slate-800">{order.customerInfo.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{order.customerInfo.phone}</p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[150px] mt-0.5" title={order.customerInfo.address}>{order.customerInfo.address}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-slate-800">{order.deliveryZone}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{order.estimatedDelivery}</p>
                        </td>
                        <td className="py-4 px-4">
                          {/* Live fulfillment dropdown */}
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 cursor-pointer outline-hidden"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-4 px-4">
                          {/* Live payment status toggles */}
                          <select
                            value={order.paymentStatus}
                            onChange={(e) => updateOrderPaymentStatus(order.id, e.target.value as any)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 cursor-pointer outline-hidden"
                          >
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Failed">Failed</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 font-black text-slate-900 text-sm">
                          {formatNaira(order.grandTotal)}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => {
                              setSelectedOrderId(order.id);
                              setCurrentView('receipt');
                            }}
                            className="p-1.5 border border-slate-200 hover:border-emerald-500 rounded-lg hover:bg-emerald-50/20 text-slate-400 hover:text-emerald-700 transition-all inline-flex cursor-pointer"
                            title="Print invoice sheet"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CRUD Add/Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                {editingProduct ? `Edit "${editingProduct.name}"` : 'Add New Grocery Product'}
              </h3>
              <button
                onClick={() => setProductModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-750"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-6 space-y-4 max-h-[450px] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Product Title / Name</label>
                  <input
                    type="text"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="e.g. Premium White Garri"
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:border-emerald-500 outline-hidden text-slate-700 font-medium"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
                  <textarea
                    rows={2}
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    placeholder="Enter short marketing description for supermarket customers..."
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:border-emerald-500 outline-hidden text-slate-700 leading-normal"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:border-emerald-500 outline-hidden text-slate-700 cursor-pointer"
                  >
                    {['Fresh Produce', 'Grocery Staples', 'Bakery & Breakfast', 'Meat & Seafood', 'Drinks & Beverages', 'Personal & Home Care'].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Stock Quantity</label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:border-emerald-500 outline-hidden text-slate-700"
                    min={0}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Unit size (unit descriptor)</label>
                  <input
                    type="text"
                    value={prodUnit}
                    onChange={(e) => setProdUnit(e.target.value)}
                    placeholder="e.g. 5kg Bag or 1 Tuber"
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:border-emerald-500 outline-hidden text-slate-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Price (₦ Naira)</label>
                  <input
                    type="number"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:border-emerald-500 outline-hidden text-slate-700"
                    min={0}
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Product Image URL</label>
                  <input
                    type="url"
                    value={prodImage}
                    onChange={(e) => setProdImage(e.target.value)}
                    placeholder="Enter Unsplash image URL..."
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:border-emerald-500 outline-hidden text-slate-700"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  id="admin-submit-product-form"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminPortal;
