import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { supabase, Order } from '../services/supabase'
import ProductCard from '../components/ProductCard'

type Tab = 'orders' | 'wishlist' | 'profile'

const statusColor: Record<string, string> = {
  'Новый': 'border-blue-300 text-blue-700 bg-blue-50',
  'В обработке': 'border-amber-300 text-amber-700 bg-amber-50',
  'В пути': 'border-purple-300 text-purple-700 bg-purple-50',
  'Доставлен': 'border-ink/30 text-ink bg-ink/5',
  'Отменён': 'border-red-300 text-red-500 bg-red-50',
}

export default function Account() {
  const { user, profile, signOut, updateProfile, loading: authLoading } = useAuth()
  const { items: wishItems } = useWishlist()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('orders')
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [profileForm, setProfileForm] = useState({ full_name: '', phone: '', city: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const fmt = (n: number) =>
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n)

  useEffect(() => {
    if (!authLoading && !user) navigate('/login')
  }, [user, authLoading, navigate])

  useEffect(() => {
    if (profile) {
      setProfileForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        city: profile.city || '',
      })
    }
  }, [profile])

  useEffect(() => {
    if (user) fetchOrders()
  }, [user])

  async function fetchOrders() {
    setOrdersLoading(true)
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
    setOrders(data || [])
    setOrdersLoading(false)
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await updateProfile(profileForm)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'orders', label: 'Мои заказы' },
    { key: 'wishlist', label: `Избранное (${wishItems.length})` },
    { key: 'profile', label: 'Профиль' },
  ]

  if (authLoading) {
    return (
      <main className="pt-8 pb-24 min-h-[60vh] flex items-center justify-center">
        <p className="font-body text-sm text-gray-mid">Загрузка...</p>
      </main>
    )
  }

  return (
    <main className="pt-8 pb-24 min-h-[60vh]">
      <div className="border-b border-gray-light px-6 md:px-10 max-w-screen-2xl mx-auto pb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-2">Личный кабинет</p>
            <h1 className="section-title">{profile?.full_name || user?.email}</h1>
            <p className="font-body text-xs text-gray-mid mt-1">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="font-body text-[11px] uppercase tracking-widest text-gray-mid hover:text-red-500 transition-colors border-b border-gray-mid hover:border-red-400 pb-0.5 mb-2"
          >
            Выйти
          </button>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
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

        {tab === 'orders' && (
          <div className="max-w-screen-md">
            {ordersLoading ? (
              <p className="font-body text-sm text-gray-mid py-8">Загрузка заказов...</p>
            ) : orders.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-display text-2xl font-light text-graphite mb-4">Заказов пока нет</p>
                <Link to="/catalog" className="btn-primary">Перейти в каталог</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border border-gray-light p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="font-body text-sm text-ink font-medium">{order.order_number}</p>
                        <p className="font-body text-xs text-gray-mid mt-0.5">
                          {new Date(order.created_at).toLocaleDateString('ru-RU', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className={`font-body text-[10px] uppercase tracking-wider px-3 py-1 border ${statusColor[order.status] || 'border-gray-light text-graphite'}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="space-y-1 mb-4">
                      {order.items.map((item, i) => (
                        <p key={i} className="font-body text-sm text-graphite">
                          {item.name} · {item.size} × {item.qty}
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-light">
                      <span className="font-display text-lg font-light">{fmt(order.total)}</span>
                      <div className="flex items-center gap-4 text-[11px] font-body uppercase tracking-widest text-gray-mid">
                        <span>{order.delivery_type === 'courier' ? '🚚 Курьер' : order.delivery_type === 'pickup' ? '🏪 Самовывоз' : '📦 Почта'}</span>
                        <span>{order.payment_type === 'card' ? '💳 Карта' : order.payment_type === 'sbp' ? '⚡ СБП' : '💵 Наличные'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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

        {tab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="max-w-sm space-y-3">
            <p className="font-body text-sm text-gray-mid mb-6">
              Ваши данные используются для быстрого оформления заказа
            </p>
            {[
              { key: 'full_name', label: 'Имя', placeholder: 'Иван Иванов', type: 'text' },
              { key: 'phone', label: 'Телефон', placeholder: '+7 (___) ___-__-__', type: 'tel' },
              { key: 'city', label: 'Город', placeholder: 'Москва', type: 'text' },
            ].map(f => (
              <div key={f.key} className="border border-gray-light">
                <div className="px-4 pt-2.5 pb-2">
                  <label className="block font-body text-[9px] uppercase tracking-widest text-gray-mid mb-0.5">{f.label}</label>
                  <input
                    type={f.type}
                    value={profileForm[f.key as keyof typeof profileForm]}
                    onChange={e => setProfileForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full bg-transparent font-body text-sm text-ink placeholder-gray-mid focus:outline-none"
                  />
                </div>
              </div>
            ))}
            <div className="border border-gray-light opacity-60">
              <div className="px-4 pt-2.5 pb-2">
                <label className="block font-body text-[9px] uppercase tracking-widests text-gray-mid mb-0.5">Email</label>
                <input type="email" value={user?.email || ''} disabled className="w-full bg-transparent font-body text-sm text-ink focus:outline-none cursor-not-allowed" />
              </div>
            </div>
            {saved && <p className="font-body text-xs text-green-600">✓ Данные сохранены</p>}
            <button type="submit" disabled={saving} className="btn-primary w-full text-center mt-4 disabled:opacity-50">
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
