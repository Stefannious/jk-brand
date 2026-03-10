// Vercel Serverless Function — создаёт платёж в ЮКасса
// Секретный ключ хранится только на сервере (безопасно)

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const SHOP_ID = process.env.YOOKASSA_SHOP_ID
  const SECRET_KEY = process.env.YOOKASSA_SECRET_KEY

  if (!SHOP_ID || !SECRET_KEY) {
    return res.status(500).json({ error: 'Payment service not configured' })
  }

  const { amount, orderId, description, returnUrl, customerEmail } = req.body

  if (!amount || !orderId) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Уникальный idempotency key
    const idempotenceKey = `${orderId}-${Date.now()}`

    const paymentBody = {
      amount: {
        value: String(Number(amount).toFixed(2)),
        currency: 'RUB',
      },
      confirmation: {
        type: 'redirect',
        return_url: returnUrl || `${req.headers.origin}/order-success?id=${orderId}`,
      },
      capture: true,
      description: description || `Заказ ${orderId} — JK Brand`,
      metadata: {
        order_id: orderId,
      },
    }

    // Добавляем email если есть (для чека)
    if (customerEmail) {
      paymentBody.receipt = {
        customer: { email: customerEmail },
        items: [
          {
            description: description || `Заказ ${orderId}`,
            quantity: '1',
            amount: {
              value: String(Number(amount).toFixed(2)),
              currency: 'RUB',
            },
            vat_code: 1, // без НДС
            payment_mode: 'full_prepayment',
            payment_subject: 'commodity',
          },
        ],
      }
    }

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': idempotenceKey,
        Authorization:
          'Basic ' + Buffer.from(`${SHOP_ID}:${SECRET_KEY}`).toString('base64'),
      },
      body: JSON.stringify(paymentBody),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('YooKassa error:', data)
      return res.status(response.status).json({ error: data.description || 'Payment error' })
    }

    return res.status(200).json({
      paymentId: data.id,
      confirmationUrl: data.confirmation.confirmation_url,
      status: data.status,
    })
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
