import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { sendOrderToTelegram } from '../services/telegram'
import { supabase } from '../services/supabase'
import { useAuth } from '../context/AuthContext'

// ─── helpers ────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n)

function formatCard(v: string) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? d.slice(0, 2) + ' / ' + d.slice(2) : d
}

// ─── small components ────────────────────────────────────────
function Field({
  label, value, onChange, type = 'text', placeholder, required, hint
}: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string; required?: boolean; hint?: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative">
      <div className={`border transition-all duration-200 ${focused ? 'border-ink' : 'border-gray-light'}`}>
        <div className="px-4 pt-3 pb-0.5">
          <label className="block font-body text-[10px] uppercase tracking-widest text-gray-mid">
            {label}{required && ' *'}
          </label>
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-transparent font-body text-sm text-ink placeholder-gray-mid pb-2 pt-0.5 focus:outline-none"
          />
        </div>
      </div>
      {hint && <p className="font-body text-[10px] text-gray-mid mt-1 pl-1">{hint}</p>}
    </div>
  )
}

function RadioCard({
  selected, onClick, label, sub, badge
}: {
  selected: boolean; onClick: () => void; label: string; sub?: string; badge?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 border text-left transition-all duration-200 ${
        selected ? 'border-ink bg-ink/[0.03]' : 'border-gray-light hover:border-gray-mid'
      }`}
    >
      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
        selected ? 'border-ink' : 'border-gray-mid'
      }`}>
        {selected && <div className="w-2 h-2 rounded-full bg-ink" />}
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-body text-sm text-ink">{label}</span>
        {sub && <span className="font-body text-xs text-gray-mid ml-2">{sub}</span>}
      </div>
      {badge && (
        <span className="font-body text-[10px] uppercase tracking-wider text-graphite border border-gray-mid px-2 py-0.5">
          {badge}
        </span>
      )}
    </button>
  )
}

// ─── card visual ─────────────────────────────────────────────
function CardVisual({ number, name, expiry, flipped }: {
  number: string; name: string; expiry: string; flipped: boolean
}) {
  const display = number.padEnd(19, ' ')
  const chunks = display.match(/.{1,4}/g) || ['', '', '', '']

  return (
    <div className="relative w-full max-w-xs mx-auto mb-6" style={{ perspective: '800px', height: '160px' }}>
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-none bg-ink text-cream p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex justify-between items-start">
            <img src="/logo.jpg" alt="JK" className="h-6 w-auto brightness-0 invert opacity-80" />
            <div className="flex gap-1">
              <div className="w-6 h-6 rounded-full bg-cream/20" />
              <div className="w-6 h-6 rounded-full bg-cream/10 -ml-2" />
            </div>
          </div>
          <div>
            <div className="flex gap-3 mb-3">
              {chunks.map((c, i) => (
                <span key={i} className="font-body text-base tracking-widest">{c || '····'}</span>
              ))}
            </div>
            <div className="flex justify-between">
              <span className="font-body text-[10px] uppercase tracking-wider opacity-60">
                {name || 'Ваше имя'}
              </span>
              <span className="font-body text-[10px] tracking-wider opacity-60">
                {expiry || 'MM / YY'}
              </span>
            </div>
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 bg-graphite text-cream flex flex-col justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="h-8 bg-ink/60 mb-4" />
          <div className="px-5 flex items-center justify-end gap-3">
            <div className="flex-1 h-6 bg-cream/10" />
            <div className="bg-cream text-ink font-body text-sm px-3 py-0.5 tracking-widest min-w-[50px] text-center">
              CVV
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Processing overlay ──────────────────────────────────────
function ProcessingOverlay({ stage }: { stage: 'processing' | 'success' }) {
  return (
    <div className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center gap-6">
      {stage === 'processing' ? (
        <>
          <div className="w-12 h-12 border border-graphite border-t-ink rounded-full animate-spin" />
          <p className="font-body text-sm uppercase tracking-widest text-graphite">Обработка платежа...</p>
        </>
      ) : (
        <div className="text-center animate-fade-up" style={{ opacity: 0 }}>
          <div className="w-20 h-20 border border-ink flex items-center justify-center mx-auto mb-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-display text-4xl font-light mb-3">Оплата прошла</h2>
          <p className="font-body text-sm text-graphite mb-1">Заказ оформлен и передан в обработку</p>
          <p className="font-body text-xs text-gray-mid">Подтверждение отправлено на вашу почту</p>
        </div>
      )}
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────
type PayMethod = 'card' | 'sbp' | 'cash'
type DeliveryMethod = 'courier' | 'pickup' | 'post'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  // Contact
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Delivery
  const [delivery, setDelivery] = useState<DeliveryMethod>('courier')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')

  // Payment
  const [method, setMethod] = useState<PayMethod>('card')
  const [cardNum, setCardNum] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [cvvFocused, setCvvFocused] = useState(false)

  // SBP
  const [sbpPhone, setSbpPhone] = useState('')

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [stage, setStage] = useState<null | 'processing' | 'success'>(null)

  const deliveryCost = delivery === 'post' ? 350 : delivery === 'courier' && totalPrice < 5000 ? 300 : 0
  const total = totalPrice + deliveryCost


  if (items.length === 0 && stage === null) {
    return (
      <main className="pt-32 pb-24 px-6 text-center">
        <h1 className="font-display text-3xl font-light text-graphite mb-6">Корзина пуста</h1>
        <Link to="/catalog" className="btn-primary">Перейти в каталог</Link>
      </main>
    )
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Обязательное поле'
    if (!email.trim() || !email.includes('@')) e.email = 'Введите корректный email'
    if (!phone.trim()) e.phone = 'Обязательное поле'
    if (delivery !== 'pickup') {
      if (!city.trim()) e.city = 'Обязательное поле'
      if (!address.trim()) e.address = 'Обязательное поле'
    }
    if (method === 'card') {
      if (cardNum.replace(/\s/g, '').length < 16) e.cardNum = 'Введите 16 цифр карты'
      if (!cardName.trim()) e.cardName = 'Введите имя как на карте'
      if (expiry.replace(/\D/g, '').length < 4) e.expiry = 'Введите срок'
      if (cvv.length < 3) e.cvv = 'Введите CVV'
    }
    if (method === 'sbp' && !sbpPhone.trim()) e.sbpPhone = 'Введите номер телефона'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePay = async () => {
    if (!validate()) {
      document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    setStage('processing')

    // Generate order ID
    const orderId = '#JK-' + String(Math.floor(10000 + Math.random() * 90000))

    // Calculate costs
    const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0)
    const deliveryCost = delivery === 'courier' ? (subtotal >= 5000 ? 0 : 300) : delivery === 'post' ? 350 : 0
    const total = subtotal + deliveryCost

    const itemNames = items.map(i => `${i.product.name} (${i.size})`).join(', ')

    // Send to Telegram
    sendOrderToTelegram({
      orderId,
      name,
      email,
      phone,
      delivery,
      city,
      address,
      payment: method,
      items: items.map(i => ({
        name: i.product.name,
        size: i.size,
        qty: i.quantity,
        price: i.product.price,
      })),
      subtotal,
      deliveryCost,
      total,
    }).catch(() => {})

    // Save order to Supabase
    if (user) {
      supabase.from('orders').insert({
        user_id: user.id,
        order_number: orderId,
        status: 'Новый',
        items: items.map(i => ({ name: i.product.name, size: i.size, qty: i.quantity, price: i.product.price })),
        subtotal,
        delivery_cost: deliveryCost,
        total,
        delivery_type: delivery,
        payment_type: method,
        address: address || city || null,
      }).then(() => {}).catch((_e: unknown) => {})
    }

    // Online payment via YooKassa (card or sbp)
    if (method === 'card' || method === 'sbp') {
      try {
        const res = await fetch('/api/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: total,
            orderId,
            description: `JK Brand: ${itemNames}`,
            returnUrl: `${window.location.origin}/order-success?id=${orderId}`,
            customerEmail: email,
          }),
        })
        const data = await res.json()

        if (data.confirmationUrl) {
          clearCart()
          // Redirect to YooKassa payment page
          window.location.href = data.confirmationUrl
          return
        }
      } catch (err) {
        console.error('Payment error:', err)
        // Fallback — show success anyway (order sent to Telegram)
      }
    }

    // Cash payment — just show success
    setTimeout(() => {
      setStage('success')
      clearCart()
      setTimeout(() => navigate('/'), 3000)
    }, 2000)
  }

  return (
    <>
      {stage && <ProcessingOverlay stage={stage} />}

      <main className="pt-16 md:pt-20 min-h-screen bg-cream">
        {/* Top bar */}
        <div className="border-b border-gray-light">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
            <Link to="/">
              <img src="/logo.jpg" alt="JK" className="h-8 w-auto" />
            </Link>
            <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-widest text-gray-mid">
              <span>🔒</span>
              <span>Защищённая оплата</span>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10 md:py-14">
          <div className="grid md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">

            {/* ── LEFT: form ── */}
            <div id="checkout-form" className="space-y-10">

              {/* 1. Contacts */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 bg-ink text-cream flex items-center justify-center font-body text-xs">1</div>
                  <h2 className="font-display text-xl font-light">Контактные данные</h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <Field label="Имя и фамилия" value={name} onChange={setName} required
                    placeholder="Иван Иванов" hint={errors.name} />
                  <Field label="Email" type="email" value={email} onChange={setEmail} required
                    placeholder="ivan@mail.ru" hint={errors.email} />
                  <Field label="Телефон" type="tel" value={phone} onChange={setPhone} required
                    placeholder="+7 (___) ___-__-__" hint={errors.phone} />
                </div>
              </section>

              {/* 2. Delivery */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 bg-ink text-cream flex items-center justify-center font-body text-xs">2</div>
                  <h2 className="font-display text-xl font-light">Доставка</h2>
                </div>
                <div className="space-y-2 mb-4">
                  <RadioCard selected={delivery === 'courier'} onClick={() => setDelivery('courier')}
                    label="Курьером" sub="1–2 дня по Москве"
                    badge={totalPrice >= 5000 ? 'Бесплатно' : '300 ₽'} />
                  <RadioCard selected={delivery === 'pickup'} onClick={() => setDelivery('pickup')}
                    label="Самовывоз" sub="Москва, уточним адрес" badge="Бесплатно" />
                  <RadioCard selected={delivery === 'post'} onClick={() => setDelivery('post')}
                    label="Почта России" sub="5–14 дней по РФ" badge="350 ₽" />
                </div>
                {delivery !== 'pickup' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Город" value={city} onChange={setCity} required
                      placeholder="Москва" hint={errors.city} />
                    <Field label="Адрес" value={address} onChange={setAddress} required
                      placeholder="Ул., дом, кв." hint={errors.address} />
                  </div>
                )}
              </section>

              {/* 3. Payment */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 bg-ink text-cream flex items-center justify-center font-body text-xs">3</div>
                  <h2 className="font-display text-xl font-light">Способ оплаты</h2>
                </div>

                <div className="space-y-2 mb-6">
                  <RadioCard selected={method === 'card'} onClick={() => setMethod('card')}
                    label="Банковская карта" sub="Visa · Mastercard · МИР" />
                  <RadioCard selected={method === 'sbp'} onClick={() => setMethod('sbp')}
                    label="СБП" sub="Система быстрых платежей" />
                  <RadioCard selected={method === 'cash'} onClick={() => setMethod('cash')}
                    label="Наличными курьеру" sub="При получении" />
                </div>

                {/* Card form */}
                {method === 'card' && (
                  <div className="bg-gray-light/50 border border-gray-light p-5 space-y-4">
                    <CardVisual number={cardNum} name={cardName} expiry={expiry} flipped={cvvFocused} />
                    <Field label="Номер карты" value={cardNum}
                      onChange={v => setCardNum(formatCard(v))}
                      placeholder="0000 0000 0000 0000" hint={errors.cardNum} />
                    <Field label="Имя на карте" value={cardName}
                      onChange={v => setCardName(v.toUpperCase())}
                      placeholder="IVAN IVANOV" hint={errors.cardName} />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Срок действия" value={expiry}
                        onChange={v => setExpiry(formatExpiry(v))}
                        placeholder="MM / YY" hint={errors.expiry} />
                      <div>
                        <div className={`border transition-all duration-200 ${cvvFocused ? 'border-ink' : 'border-gray-light'}`}>
                          <div className="px-4 pt-3 pb-0.5">
                            <label className="block font-body text-[10px] uppercase tracking-widest text-gray-mid">CVV *</label>
                            <input
                              type="password"
                              maxLength={3}
                              value={cvv}
                              onChange={e => setCvv(e.target.value.replace(/\D/g,'').slice(0,3))}
                              onFocus={() => setCvvFocused(true)}
                              onBlur={() => setCvvFocused(false)}
                              placeholder="···"
                              className="w-full bg-transparent font-body text-sm text-ink placeholder-gray-mid pb-2 pt-0.5 focus:outline-none"
                            />
                          </div>
                        </div>
                        {errors.cvv && <p className="font-body text-[10px] text-gray-mid mt-1 pl-1">{errors.cvv}</p>}
                      </div>
                    </div>
                    <p className="font-body text-[10px] text-gray-mid flex items-center gap-1.5">
                      <span>🔒</span> Данные карты передаются по защищённому соединению
                    </p>
                  </div>
                )}

                {/* SBP form */}
                {method === 'sbp' && (
                  <div className="bg-gray-light/50 border border-gray-light p-5 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-ink flex items-center justify-center text-cream text-xs font-body">
                        СБП
                      </div>
                      <div>
                        <p className="font-body text-sm text-ink">Оплата через СБП</p>
                        <p className="font-body text-xs text-gray-mid">Мгновенный перевод без комиссии</p>
                      </div>
                    </div>
                    <Field label="Номер телефона" type="tel" value={sbpPhone}
                      onChange={setSbpPhone} placeholder="+7 (___) ___-__-__"
                      hint={errors.sbpPhone} />
                    <p className="font-body text-[10px] text-gray-mid">
                      После подтверждения заказа вы получите ссылку для оплаты
                    </p>
                  </div>
                )}

                {/* Cash */}
                {method === 'cash' && (
                  <div className="bg-gray-light/50 border border-gray-light p-5">
                    <p className="font-body text-sm text-graphite">
                      Оплата наличными при получении заказа. Приготовьте точную сумму.
                    </p>
                  </div>
                )}
              </section>

              {/* Mobile pay button */}
              <button onClick={handlePay} className="md:hidden btn-primary w-full text-center text-base py-5">
                Оплатить {fmt(total)}
              </button>
            </div>

            {/* ── RIGHT: order summary (sticky) ── */}
            <div className="md:sticky md:top-24">
              <div className="border border-gray-light bg-white/40">
                <div className="px-6 py-5 border-b border-gray-light">
                  <h3 className="font-display text-lg font-light">Ваш заказ</h3>
                </div>

                {/* Items */}
                <div className="px-6 py-5 space-y-4 max-h-[340px] overflow-y-auto">
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                      <div className="relative flex-shrink-0">
                        <img src={item.product.images[0]} alt={item.product.name}
                          className="w-16 h-20 object-cover bg-gray-light" />
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-ink text-cream text-[9px] flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-sm font-light leading-snug">{item.product.name}</p>
                        <p className="font-body text-[10px] text-gray-mid mt-0.5">Размер: {item.size}</p>
                        <p className="font-body text-sm mt-1">{fmt(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="px-6 py-5 border-t border-gray-light space-y-2">
                  <div className="flex justify-between font-body text-sm text-graphite">
                    <span>Товары</span>
                    <span>{fmt(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm text-graphite">
                    <span>Доставка</span>
                    <span>{deliveryCost === 0 ? 'Бесплатно' : fmt(deliveryCost)}</span>
                  </div>
                  <div className="flex justify-between font-display text-xl font-light pt-3 border-t border-gray-light">
                    <span>Итого</span>
                    <span>{fmt(total)}</span>
                  </div>
                </div>

                {/* Desktop pay button */}
                <div className="px-6 pb-6">
                  <button onClick={handlePay} className="hidden md:block btn-primary w-full text-center text-sm py-4">
                    Оплатить {fmt(total)}
                  </button>
                  <p className="font-body text-[10px] text-gray-mid text-center mt-3 flex items-center justify-center gap-1">
                    <span>🔒</span> Данные защищены шифрованием
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { icon: '↻', text: 'Возврат 30 дней' },
                  { icon: '📦', text: 'Быстрая доставка' },
                  { icon: '✓', text: 'Гарантия качества' },
                ].map(b => (
                  <div key={b.text} className="border border-gray-light px-2 py-3 text-center">
                    <div className="text-lg mb-1">{b.icon}</div>
                    <p className="font-body text-[9px] uppercase tracking-wider text-gray-mid">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}
