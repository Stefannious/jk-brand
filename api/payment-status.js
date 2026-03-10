// Проверка статуса платежа после возврата с ЮКассы
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const { paymentId } = req.query
  if (!paymentId) return res.status(400).json({ error: 'Missing paymentId' })

  const SHOP_ID = process.env.YOOKASSA_SHOP_ID
  const SECRET_KEY = process.env.YOOKASSA_SECRET_KEY

  try {
    const response = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${SHOP_ID}:${SECRET_KEY}`).toString('base64'),
      },
    })
    const data = await response.json()
    return res.status(200).json({ status: data.status, paid: data.paid })
  } catch (err) {
    return res.status(500).json({ error: 'Failed to check payment' })
  }
}
