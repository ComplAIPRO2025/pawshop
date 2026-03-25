import { useState } from 'react'
import { ShoppingCart, X, Plus, Minus, Star, Search, Heart, Dog, Truck, Shield, RotateCcw, Package } from 'lucide-react'

const products = [
  { id: 1, name: "Collier cuir premium", price: 24.90, category: "Colliers", rating: 4.8, reviews: 128, image: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400&h=400&fit=crop", badge: "Bestseller" },
  { id: 2, name: "Laisse rétractable 5m", price: 19.90, category: "Laisses", rating: 4.6, reviews: 89, image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop", badge: null },
  { id: 3, name: "Harnais sport réglable", price: 34.90, category: "Harnais", rating: 4.9, reviews: 214, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop", badge: "Nouveau" },
  { id: 4, name: "Lit orthopédique luxe", price: 79.90, category: "Couchage", rating: 4.7, reviews: 67, image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop", badge: null },
  { id: 5, name: "Gamelle inox antidérapante", price: 14.90, category: "Gamelles", rating: 4.5, reviews: 156, image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&h=400&fit=crop", badge: null },
  { id: 6, name: "Jouet corde tressée", price: 9.90, category: "Jouets", rating: 4.4, reviews: 203, image: "https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=400&h=400&fit=crop", badge: "-20%" },
  { id: 7, name: "Manteau imperméable", price: 44.90, category: "Vêtements", rating: 4.6, reviews: 92, image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop", badge: "Nouveau" },
  { id: 8, name: "Sac de transport cabine", price: 59.90, category: "Transport", rating: 4.8, reviews: 178, image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop", badge: null },
]

type Product = typeof products[0]
type CartItem = { product: Product; qty: number }

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [wishlist, setWishlist] = useState<number[]>([])

  const categories = ['Tous', ...Array.from(new Set(products.map(p => p.category)))]

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'Tous' || p.category === activeCategory
    return matchSearch && matchCat
  })

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { product, qty: 1 }]
    })
  }

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.product.id !== id))
  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.product.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  }
  const toggleWishlist = (id: number) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const deliveryCost = total >= 49 ? 0 : 4.99
  const finalTotal = total + deliveryCost

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 p-2 rounded-xl">
              <Dog className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">PawShop</span>
              <div className="text-xs text-amber-500 font-medium">Premium Dog Store</div>
            </div>
          </div>
          <div className="flex-1 max-w-md hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un accessoire..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-amber-500 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="font-medium">{wishlist.length}</span>
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium text-sm"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Panier</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <span className="bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">
              🐾 Livraison gratuite dès 49€
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Tout pour votre<br />meilleur ami
            </h1>
            <p className="text-white/90 text-lg mb-6 max-w-lg">
              Accessoires premium sélectionnés avec soin pour le confort, le style et le bonheur de votre chien.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-amber-600 font-bold px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors shadow-lg"
              >
                Découvrir la boutique
              </button>
            </div>
          </div>
          <div className="text-9xl select-none hidden md:block">🐕</div>
        </div>
      </section>

      {/* GARANTIES */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Truck className="w-5 h-5 text-amber-500" />, title: "Livraison offerte", sub: "Dès 49€ d'achat" },
            { icon: <Shield className="w-5 h-5 text-amber-500" />, title: "Paiement sécurisé", sub: "Cryptage SSL" },
            { icon: <RotateCcw className="w-5 h-5 text-amber-500" />, title: "Retour 30 jours", sub: "Satisfait ou remboursé" },
            { icon: <Package className="w-5 h-5 text-amber-500" />, title: "Emballage soigné", sub: "Expédié sous 24h" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <div className="bg-amber-50 p-2 rounded-lg flex-shrink-0">{b.icon}</div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">{b.title}</div>
                <div className="text-gray-500 text-xs">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <main id="products" className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nos accessoires</h2>
            <p className="text-gray-500 text-sm">{filtered.length} produit{filtered.length > 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-600 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Dog className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">Aucun produit trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(product => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group border border-gray-100">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-lg ${
                      product.badge === 'Bestseller' ? 'bg-amber-500 text-white' :
                      product.badge === 'Nouveau' ? 'bg-green-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>
                <div className="p-4">
                  <span className="text-xs text-amber-600 font-semibold uppercase tracking-wide">{product.category}</span>
                  <h3 className="font-semibold text-gray-900 mt-1 text-sm leading-snug">{product.name}</h3>
                  <div className="flex items-center gap-1 mt-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-gray-900">{product.price.toFixed(2)} €</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 mt-16 py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-amber-500 p-1.5 rounded-lg"><Dog className="w-4 h-4 text-white" /></div>
              <span className="text-white font-bold">PawShop</span>
            </div>
            <p className="text-sm">La boutique premium pour les chiens heureux.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Catégories</h4>
            <ul className="space-y-1.5 text-sm">
              {['Colliers & Laisses', 'Couchage & Confort', 'Jouets', 'Vêtements', 'Transport'].map(c => (
                <li key={c}><a href="#products" className="hover:text-amber-400 transition-colors">{c}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Infos</h4>
            <ul className="space-y-1.5 text-sm">
              {['À propos', 'Livraison', 'Retours', 'Contact'].map(c => (
                <li key={c}><a href="#" className="hover:text-amber-400 transition-colors">{c}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          © 2025 PawShop · Fait avec ❤️ pour les chiens 🐾
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Mon panier</h2>
                <p className="text-sm text-gray-500">{cartCount} article{cartCount > 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <ShoppingCart className="w-14 h-14 mx-auto mb-4 opacity-30" />
                  <p className="font-medium">Votre panier est vide</p>
                  <button onClick={() => setCartOpen(false)} className="mt-4 text-amber-500 font-semibold text-sm hover:underline">
                    Continuer mes achats →
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex gap-4 bg-gray-50 rounded-xl p-3">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{item.product.name}</p>
                      <p className="text-amber-500 font-bold text-sm mt-0.5">{item.product.price.toFixed(2)} €</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQty(item.product.id, -1)} className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100">
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="w-6 text-center font-semibold text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item.product.id, 1)} className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center hover:bg-amber-600">
                          <Plus className="w-3 h-3 text-white" />
                        </button>
                        <button onClick={() => removeFromCart(item.product.id)} className="ml-auto p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-5 border-t border-gray-100 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Sous-total</span>
                  <span className="font-semibold text-gray-900">{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Livraison</span>
                  <span className={deliveryCost === 0 ? 'text-green-600 font-semibold' : 'font-semibold text-gray-900'}>
                    {deliveryCost === 0 ? 'Gratuite 🎉' : `${deliveryCost.toFixed(2)} €`}
                  </span>
                </div>
                {total < 49 && (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
                    🚀 Plus que <strong>{(49 - total).toFixed(2)} €</strong> pour la livraison gratuite !
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-900 text-base pt-1 border-t border-gray-100">
                  <span>Total</span>
                  <span>{finalTotal.toFixed(2)} €</span>
                </div>
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors text-sm shadow-lg">
                  Commander — {finalTotal.toFixed(2)} €
                </button>
                <button onClick={() => setCartOpen(false)} className="w-full text-center text-sm text-gray-500 hover:text-gray-700">
                  Continuer mes achats
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
