import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'

type Tab = 'orders' | 'wishlist' | 'profile'

const mockOrders = [
  { id: '#JK-00421', date: '10 марта 2025', status: 'Доставлен', items: ['Бомбер Чёрный · M'], total: 24900 },
  { id: '#JK-00389', date: '22 февраля 2025', status: 'В пути', items: ['Свитшот Молочный · S', 'Свитшот Серый · S'], total: 25800 },
]

export default function Account() {
  const [tab, setTab] = useState<Tab>('orders')
  const { items: wishItems } = useWishlist()

  const fmt = (n: number) =>
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'orders', label: 'Мои заказы' },
    { key: 'wishlist', label: `Избранное (${wishItems.length})` },
    { key: 'profile', label: 'Профиль' },
  ]

  return (
    <main className="pt-8 pb-24 min-h-[60vh]">
      {/* Title */}
      <div className="border-b border-gray-light px-6 md:px-10 max-w-screen-2xl mx-auto pb-10">
        <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-2">Личный кабинет</p>
        <h1 className="section-title">Мой аккаунт</h1>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
        {/* Tabs */}
        <div className="flex gap-0 border-b border-gray-light mt-0 mb-10">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`font-body text-[11px] uppercase tracking-widest px-6 py-4 border-b-2 transition-all duration-200 ${
                tab === t.key ? 'border-ink text-ink' : 'border-transparent text-gray-mid hover:text-graphite'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Orders */}
        {tab === 'orders' && (
          <div className="max-w-screen-md">
            {mockOrders.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-display text-2xl font-light text-graphite mb-4">Заказов пока нет</p>
                <Link to="/catalog" className="btn-primary">Перейти в каталог</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {mockOrders.map(order => (
                  <div key={order.id} className="border border-gray-light p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="font-body text-sm text-ink font-medium">{order.id}</p>
                        <p className="font-body text-xs text-gray-mid mt-0.5">{order.date}</p>
                      </div>
                      <span className={`font-body text-[10px] uppercase tracking-wider px-3 py-1 border ${
                        order.status === 'Доставлен'
                          ? 'border-ink/30 text-ink bg-ink/5'
                          : 'border-amber-300 text-amber-700 bg-amber-50'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="space-y-1 mb-4">
                      {order.items.map(item => (
                        <p key={item} className="font-body text-sm text-graphite">{item}</p>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-light">
                      <span className="font-display text-lg font-light">{fmt(order.total)}</span>
                      <button className="font-body text-[11px] uppercase tracking-widest text-graphite hover:text-ink transition-colors border-b border-graphite pb-0.5">
                        Повторить заказ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Wishlist */}
        {tab === 'wishlist' && (
          wishItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-display text-2xl font-light text-graphite mb-4">Список пуст</p>
              <p className="font-body text-sm text-gray-mid mb-6">Добавляйте товары нажав на сердечко</p>
              <Link to="/catalog" className="btn-primary">В каталог</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {wishItems.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )
        )}

        {/* Profile */}
        {tab === 'profile' && (
          <div className="max-w-sm space-y-4">
            <p className="font-body text-sm text-gray-mid mb-6">
              Сохраните данные для быстрого оформления заказа
            </p>
            {[
              { label: 'Имя', placeholder: 'Иван Иванов' },
              { label: 'Email', placeholder: 'ivan@mail.ru', type: 'email' },
              { label: 'Телефон', placeholder: '+7 (___) ___-__-__', type: 'tel' },
              { label: 'Город', placeholder: 'Москва' },
            ].map(f => (
              <div key={f.label} className="border border-gray-light">
                <div className="px-4 pt-2.5 pb-2">
                  <label className="block font-body text-[9px] uppercase tracking-widest text-gray-mid mb-0.5">{f.label}</label>
                  <input
                    type={f.type || 'text'}
                    placeholder={f.placeholder}
                    className="w-full bg-transparent font-body text-sm text-ink placeholder-gray-mid focus:outline-none"
                  />
                </div>
              </div>
            ))}
            <button className="btn-primary w-full text-center mt-4">Сохранить</button>
          </div>
        )}
      </div>
    </main>
  )
}
