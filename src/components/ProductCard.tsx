import { Link } from 'react-router-dom'
import { Product } from '../types'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

interface Props {
  product: Product
  variant?: 'default' | 'large' | 'horizontal'
}

export default function ProductCard({ product, variant = 'default' }: Props) {
  const { toggle, has } = useWishlist()
  const { addItem } = useCart()
  const wished = has(product.id)

  const fmt = (n: number) =>
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n)

  if (variant === 'horizontal') {
    return (
      <div className="flex gap-4 items-start py-4 border-b border-gray-light">
        <Link to={`/product/${product.id}`} className="flex-shrink-0">
          <img src={product.images[0]} alt={product.name} className="w-24 h-28 object-cover bg-gray-light" />
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-display text-lg font-light leading-snug hover:opacity-60 transition-opacity">{product.name}</h3>
          </Link>
          <p className="font-body text-xs text-gray-mid uppercase tracking-wider mt-0.5">
            {product.category === 'jackets' ? 'Куртка' : 'Свитшот'}
          </p>
          <p className="font-body text-sm mt-2">{fmt(product.price)}</p>
        </div>
        <button onClick={() => toggle(product)} className="p-1 flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className={wished ? 'text-ink' : 'text-gray-mid'}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="group">
      {/* Image */}
      <div className={`relative overflow-hidden bg-gray-light ${variant === 'large' ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              loading="lazy"
            />
          )}
        </Link>

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-ink text-cream font-body text-[9px] uppercase tracking-widest px-2 py-0.5">Новинка</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => toggle(product)}
          className="absolute top-3 right-3 w-8 h-8 bg-cream/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cream"
          aria-label="Добавить в избранное"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className={wished ? 'text-ink' : 'text-graphite'}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
          <div className="bg-cream/95 backdrop-blur-sm px-3 py-2">
            <p className="font-body text-[9px] uppercase tracking-widest text-graphite mb-1.5">Быстрый выбор размера</p>
            <div className="flex gap-1.5 flex-wrap">
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => addItem(product, s)}
                  className="text-[10px] font-body border border-gray-light w-8 h-7 flex items-center justify-center hover:bg-ink hover:text-cream hover:border-ink transition-all duration-150"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transform badge */}
        {product.transformNote && (
          <div className="absolute bottom-0 left-0 right-0 bg-ink/80 text-cream font-body text-[10px] tracking-wider px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 delay-75">
            ↻ {product.transformNote}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-display text-[17px] font-light text-ink leading-tight hover:opacity-60 transition-opacity">{product.name}</h3>
          </Link>
          <span className="font-body text-sm text-graphite whitespace-nowrap">{fmt(product.price)}</span>
        </div>
        <p className="font-body text-[10px] text-gray-mid uppercase tracking-wider mt-0.5">
          {product.category === 'jackets' ? 'Куртка' : 'Свитшот'}
        </p>
      </div>
    </div>
  )
}
