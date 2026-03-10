const BOT_TOKEN = '8665396732:AAFUOZu31FwKwu8YM5jGvZOyojWONwanUD0'
const CHAT_ID = '1632225241'

export interface OrderData {
  orderId: string
  name: string
  email: string
  phone: string
  delivery: string
  city?: string
  address?: string
  payment: string
  items: { name: string; size: string; qty: number; price: number }[]
  subtotal: number
  deliveryCost: number
  total: number
}

export async function sendOrderToTelegram(order: OrderData): Promise<boolean> {
  const deliveryLabel: Record<string, string> = {
    courier: '🚚 Курьер',
    pickup: '🏪 Самовывоз',
    post: '📦 Почта России',
  }

  const paymentLabel: Record<string, string> = {
    card: '💳 Карта онлайн',
    sbp: '⚡ СБП',
    cash: '💵 Наличные',
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n)

  const itemsText = order.items
    .map(i => `  • ${i.name} / ${i.size} × ${i.qty} — ${fmt(i.price * i.qty)}`)
    .join('\n')

  const addressLine = order.delivery === 'courier' || order.delivery === 'post'
    ? `\n📍 Адрес: ${order.city || ''}${order.address ? ', ' + order.address : ''}`
    : ''

  const message = `🛍 <b>НОВЫЙ ЗАКАЗ ${order.orderId}</b>

👤 <b>Покупатель:</b>
  Имя: ${order.name}
  Телефон: ${order.phone}
  Email: ${order.email}

📦 <b>Товары:</b>
${itemsText}

💰 <b>Итого:</b>
  Товары: ${fmt(order.subtotal)}
  Доставка: ${order.deliveryCost === 0 ? 'Бесплатно' : fmt(order.deliveryCost)}
  <b>К оплате: ${fmt(order.total)}</b>

🚀 <b>Доставка:</b> ${deliveryLabel[order.delivery] || order.delivery}${addressLine}

💳 <b>Оплата:</b> ${paymentLabel[order.payment] || order.payment}`

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    })
    const data = await res.json()
    console.log('Telegram response:', data)
    return data.ok === true
  } catch (e) {
    console.error('Telegram send error:', e)
    return false
  }
}
