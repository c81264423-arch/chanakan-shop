'use client';

import { useState } from 'react';

// รายการสินค้า
const PRODUCTS = [
  {
    id: '1',
    name: 'เสื้อเชิ้ตผ้าลินิน Minimal',
    price: 450,
    category: 'เสื้อผ้า',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80',
  },
  {
    id: '2',
    name: 'กระเป๋าถือหนังแท้ Tote Bag',
    price: 1290,
    category: 'กระเป๋า',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80',
  },
  {
    id: '3',
    name: 'รองเท้าสลิปออน Canvas',
    price: 890,
    category: 'รองเท้า',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80',
  },
  {
    id: '4',
    name: 'แว่นตากันแดดทรงวินเทจ',
    price: 390,
    category: 'แอคเซสเซอรี่',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
  },
];

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // ข้อมูลผู้ซื้อในฟอร์ม
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'qr',
  });

  // ฟังก์ชันเพิ่มสินค้าลงตะกร้า
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // ฟังก์ชันปรับจำนวนสินค้า
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  // ฟังก์ชันลบสินค้าออกจากตะกร้า
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // คำนวณจำนวนชิ้นรวม และราคารวม
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ฟังก์ชันยืนยันการสั่งซื้อ
  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) {
      alert('กรุณากรอกข้อมูลจัดส่งให้ครบถ้วน');
      return;
    }

    const newOrder = {
      orderId: 'CNS-' + Math.floor(100000 + Math.random() * 900000),
      items: [...cart],
      totalPrice: totalPrice,
      customer: { ...customer },
    };

    setCompletedOrder(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="text-xl font-bold text-blue-600 cursor-pointer"
            onClick={() => {
              setCompletedOrder(null);
              setIsCheckoutOpen(false);
            }}
          >
            chanakan<span className="text-slate-900">shop</span>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl text-sm transition flex items-center gap-2"
          >
            <span>ตะกร้าสินค้า</span>
            {totalItems > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-10 px-4 text-center">
        <h1 className="text-3xl font-extrabold mb-2">ยินดีต้อนรับสู่ chanakanshop</h1>
        <p className="text-blue-100 text-sm">เลือกช้อปสินค้าราคาพิเศษ จัดส่งฟรีทั่วประเทศ</p>
      </section>

      {/* Main Area */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        {completedOrder ? (
          <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
              ✓
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">การสั่งซื้อสำเร็จ!</h2>
              <p className="text-sm text-slate-500">
                หมายเลขคำสั่งซื้อ: <span className="font-bold text-slate-700">{completedOrder.orderId}</span>
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl text-left text-xs space-y-2 border border-slate-100">
              <p className="font-semibold text-slate-700 text-sm mb-2">ข้อมูลการจัดส่ง</p>
              <p><span className="text-slate-400">ชื่อผู้รับ:</span> {completedOrder.customer.name}</p>
              <p><span className="text-slate-400">เบอร์โทร:</span> {completedOrder.customer.phone}</p>
              <p><span className="text-slate-400">ที่อยู่:</span> {completedOrder.customer.address}</p>
              <p>
                <span className="text-slate-400">การชำระเงิน:</span>{' '}
                {completedOrder.customer.paymentMethod === 'qr' ? 'สแกน QR / โอนเงิน' : 'เก็บเงินปลายทาง'}
              </p>
            </div>

            <div className="text-left">
              <p className="font-semibold text-sm mb-2">รายการสินค้า</p>
              <div className="space-y-2 border-t pt-2">
                {completedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-slate-600">
                    <span>{item.name} (x{item.quantity})</span>
                    <span className="font-semibold">฿{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 border-t pt-2 mt-2">
                <span>ราคารวมทั้งหมด:</span>
                <span className="text-blue-600">฿{completedOrder.totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setCompletedOrder(null)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition text-sm"
            >
              กลับไปเลือกซื้อสินค้าเพิ่ม
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">สินค้าแนะนำ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <p className="text-xs text-blue-600 font-semibold mb-1">{product.category}</p>
                      <h3 className="font-semibold text-slate-800 mb-2">{product.name}</h3>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900">฿{product.price.toLocaleString()}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-slate-900 hover:bg-blue-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition active:scale-95"
                    >
                      + ใส่ตะกร้า
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">ตะกร้าสินค้า ({totalItems})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 p-2 text-xl">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <p className="text-4xl mb-2">🛒</p>
                  <p className="text-sm">ยังไม่มีสินค้าในตะกร้า</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500">ลบ</button>
                      </div>
                      <p className="text-xs font-bold text-slate-900">฿{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded bg-white border text-xs">-</button>
                        <span className="text-xs font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded bg-white border text-xs">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">ราคารวมทั้งหมด:</span>
                  <span className="text-xl font-bold text-blue-600">฿{totalPrice.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                >
                  ไปที่หน้าชำระเงิน
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCheckoutOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">ชำระเงินและกรอกข้อมูลจัดส่ง</h3>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 p-1">✕</button>
            </div>

            <form onSubmit={handleConfirmOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ชื่อ-นามสกุล ผู้รับ *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น สมชาย ใจดี"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">เบอร์โทรศัพท์ *</label>
                <input
                  type="tel"
                  required
                  placeholder="08X-XXX-XXXX"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ที่อยู่จัดส่ง *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="บ้านเลขที่, ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, รหัสไปรษณีย์"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">ช่องทางชำระเงิน</label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`p-3 border rounded-xl flex items-center gap-2 cursor-pointer text-xs font-semibold ${
                      customer.paymentMethod === 'qr' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="qr"
                      checked={customer.paymentMethod === 'qr'}
                      onChange={() => setCustomer({ ...customer, paymentMethod: 'qr' })}
                    />
                    สแกน QR / โอนเงิน
                  </label>
                  <label
                    className={`p-3 border rounded-xl flex items-center gap-2 cursor-pointer text-xs font-semibold ${
                      customer.paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={customer.paymentMethod === 'cod'}
                      onChange={() => setCustomer({ ...customer, paymentMethod: 'cod' })}
                    />
                    เก็บเงินปลายทาง
                  </label>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-sm font-bold mb-4">
                  <span>ยอดชำระสุทธิ:</span>
                  <span className="text-blue-600 text-lg">฿{totalPrice.toLocaleString()}</span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition text-sm shadow-md"
                >
                  ยืนยันการสั่งซื้อ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-12">
        © 2026 chanakanshop. All rights reserved.
      </footer>
    </div>
  );
}
