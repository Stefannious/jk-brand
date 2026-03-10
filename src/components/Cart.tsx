import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, removeItem, updateQty, totalPrice, totalCount, isOpen, closeCart } = useCart()
  const navigate = useNavigate()

  const fmt = (n: number) =>
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-cream flex flex-col transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-light">
          <div>
            <h2 className="font-display text-2xl font-light">Корзина</h2>
            {totalCount > 0 && (
              <p className="font-body text-xs text-gray-mid mt-0.5">
                {totalCount} {totalCount === 1 ? 'товар' : totalCount < 5 ? 'товара' : 'товаров'}
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center text-graphite hover:text-ink transition-colors"
            aria-label="Закрыть"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-mid">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="font-display text-xl font-light text-graphite">Корзина пуста</p>
              <p className="font-body text-xs text-gray-mid">Добавьте товары из каталога</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.size}`} className="flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover flex-shrink-0 bg-gray-light"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-display text-base font-light leading-snug">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-gray-mid hover:text-ink transition-colors flex-shrink-0"
                        aria-label="Удалить"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <p className="font-body text-xs text-gray-mid mt-1">
                      Размер: {item.size}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty */}
                      <div className="flex items-center border border-gray-light">
                        <button
                          onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-graphite hover:text-ink transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-body text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-graphite hover:text-ink transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-body text-sm font-light">
                        {fmt(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-light px-8 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-body text-sm uppercase tracking-wider text-graphite">Итого</span>
              <span className="font-display text-2xl font-light">{fmt(totalPrice)}</span>
            </div>
            <button
              onClick={() => { closeCart(); navigate('/checkout') }}
              className="btn-primary w-full text-center block"
            >
              Оформить заказ
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
