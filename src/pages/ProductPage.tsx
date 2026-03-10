import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById, products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = id ? getProductById(id) : undefined
  const { addItem } = useCart()
  const { toggle, has } = useWishlist()

  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })

  const fmt = (n: number) =>
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n)

  if (!product) {
    return (
      <main className="pt-24 text-center px-6 pb-24">
        <h1 className="font-display text-3xl text-graphite mb-6">Товар не найден</h1>
        <Link to="/catalog" className="btn-primary">Вернуться в каталог</Link>
      </main>
    )
  }

  const wished = has(product.id)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    if (!selectedSize) { setSizeError(true); return }
    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  return (
    <main className="pb-20">
      {/* Breadcrumb */}
      <nav className="px-6 md:px-10 max-w-screen-2xl mx-auto py-4 border-b border-gray-light">
        <ol className="flex items-center gap-2 font-body text-[10px] text-gray-mid uppercase tracking-wider">
          <li><Link to="/" className="hover:text-graphite transition-colors">JK</Link></li>
          <li className="text-gray-light">/</li>
          <li><Link to="/catalog" className="hover:text-graphite transition-colors">Каталог</Link></li>
          <li className="text-gray-light">/</li>
          <li className="text-graphite">{product.name}</li>
        </ol>
      </nav>

      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto py-10">
        <div className="grid md:grid-cols-[1fr_420px] lg:grid-cols-[1fr_480px] gap-10 md:gap-16">

          {/* Gallery */}
          <div className="flex gap-3 md:gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-2 w-[72px] flex-shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-[3/4] overflow-hidden bg-gray-light transition-all duration-200 ${
                    activeImg === i ? 'ring-1 ring-ink' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image with zoom */}
            <div className="flex-1 relative">
              <div
                className={`aspect-[3/4] overflow-hidden bg-gray-light relative cursor-zoom-in ${zoomed ? 'cursor-zoom-out' : ''}`}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setZoomed(true)}
                onMouseLeave={() => setZoomed(false)}
              >
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-300 ${zoomed ? 'scale-150' : 'scale-100'}`}
                  style={zoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                  draggable={false}
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-ink text-cream font-body text-[9px] uppercase tracking-widest px-2 py-0.5 z-10">
                    Новинка
                  </span>
                )}
              </div>

              {/* Mobile dots */}
              <div className="flex justify-center gap-1.5 mt-4 md:hidden">
                {product.images.map((_, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${activeImg === i ? 'bg-ink' : 'bg-gray-mid'}`} />
                ))}
              </div>

              <p className="font-body text-[9px] text-gray-mid mt-2 hidden md:block">Наведите для увеличения</p>
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-0">
            {/* Category + name */}
            <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-2">
              {product.category === 'jackets' ? 'Куртка' : 'Свитшот'} · JK
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-ink leading-tight mb-5">
              {product.name}
            </h1>

            {/* Price */}
            <p className="font-display text-3xl font-light mb-6">{fmt(product.price)}</p>

            {/* Transform badge */}
            {product.transformNote && (
              <div className="flex items-center gap-3 bg-gray-light px-4 py-3 mb-6">
                <span className="text-ink text-base">↻</span>
                <span className="font-body text-[11px] uppercase tracking-wider text-graphite">
                  {product.transformNote}
                </span>
              </div>
            )}

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-[11px] uppercase tracking-wider text-graphite">
                  Размер {selectedSize && `— ${selectedSize}`}
                </span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="font-body text-[10px] uppercase tracking-wider text-gray-mid hover:text-graphite border-b border-gray-mid pb-0.5 transition-colors"
                >
                  Таблица размеров
                </button>
              </div>
              {sizeError && <p className="font-body text-xs text-red-500 mb-2">Выберите размер</p>}
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => { setSelectedSize(s); setSizeError(false) }}
                    className={`w-12 h-12 font-body text-sm transition-all duration-200 border ${
                      selectedSize === s
                        ? 'bg-ink text-cream border-ink'
                        : 'border-gray-mid text-graphite hover:border-ink hover:text-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAdd}
                className={`flex-1 font-body text-[11px] uppercase tracking-widest py-4 transition-all duration-300 ${
                  added
                    ? 'bg-graphite text-cream'
                    : 'bg-ink text-cream hover:bg-graphite'
                }`}
              >
                {added ? '✓ Добавлено в корзину' : 'Добавить в корзину'}
              </button>
              <button
                onClick={() => toggle(product)}
                className="w-14 h-14 border border-gray-light flex items-center justify-center hover:border-ink transition-colors"
                aria-label="Избранное"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5"
                  className={wished ? 'text-ink' : 'text-graphite'}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Description accordion */}
            <div className="border-t border-gray-light">
              {[
                {
                  title: 'Описание',
                  content: product.description,
                },
                {
                  title: 'Состав и уход',
                  content: 'Состав: 80% хлопок, 20% полиэстер. Стирать при 30°C, деликатный режим. Снять съёмные элементы перед стиркой. Не отбеливать. Гладить при низкой температуре.',
                },
                {
                  title: 'Доставка и возврат',
                  content: 'Бесплатная доставка курьером по Москве при заказе от 5 000 ₽. Доставка по России от 350 ₽. Возврат в течение 30 дней при сохранении товарного вида.',
                },
              ].map(item => (
                <AccordionItem key={item.title} title={item.title} content={item.content} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-6 md:px-10 max-w-screen-2xl mx-auto py-16 border-t border-gray-light">
          <h2 className="font-display text-3xl font-light mb-10">Похожие товары</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6" onClick={() => setShowSizeGuide(false)}>
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" />
          <div className="relative bg-cream max-w-lg w-full p-8 animate-fade-up" style={{ opacity: 0 }} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-2xl font-light">Таблица размеров</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-graphite hover:text-ink">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <table className="w-full font-body text-sm">
              <thead>
                <tr className="border-b border-gray-light">
                  {['Размер', 'Грудь', 'Талия', 'Рост'].map(h => (
                    <th key={h} className="text-left font-normal text-[10px] uppercase tracking-wider text-gray-mid py-2 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-light">
                {[
                  ['XS', '84–88', '68–72', '164–168'],
                  ['S', '88–92', '72–76', '168–172'],
                  ['M', '92–96', '76–80', '172–176'],
                  ['L', '96–100', '80–84', '176–180'],
                  ['XL', '100–108', '84–92', '180–186'],
                  ['XXL', '108–116', '92–100', '186–192'],
                ].map(row => (
                  <tr key={row[0]} className={selectedSize === row[0] ? 'bg-ink/5' : ''}>
                    {row.map((cell, i) => (
                      <td key={i} className={`py-3 pr-4 ${i === 0 ? 'font-medium text-ink' : 'text-graphite'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="font-body text-xs text-gray-mid mt-4">Размеры указаны в сантиметрах</p>
          </div>
        </div>
      )}
    </main>
  )
}

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-light">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-body text-[11px] uppercase tracking-widest text-ink">{title}</span>
        <span className={`text-graphite text-xl font-light transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-4' : 'max-h-0'}`}>
        <p className="font-body text-sm text-graphite leading-relaxed">{content}</p>
      </div>
    </div>
  )
}
