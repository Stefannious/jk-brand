import React from 'react'

export default function Oferta() {
  return (
    <main className="max-w-screen-md mx-auto px-6 md:px-10 py-16 pb-24">
      <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-3">Документы</p>
      <h1 className="font-display text-4xl font-light mb-10">Публичная оферта</h1>

      <div className="space-y-8 font-body text-sm text-graphite leading-relaxed">
        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widest text-ink mb-3">1. Предмет оферты</h2>
          <p>Настоящий документ является публичной офертой JK Brand (далее — «Продавец») и содержит все существенные условия договора розничной купли-продажи товаров дистанционным способом. Оформление заказа на сайте означает полное и безоговорочное принятие условий данной оферты.</p>
        </section>

        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widest text-ink mb-3">2. Товары и цены</h2>
          <p>Продавец предлагает к продаже одежду, представленную на сайте. Цены указаны в рублях РФ и включают НДС. Продавец оставляет за собой право изменять цены без предварительного уведомления. Цена заказа фиксируется на момент его оформления.</p>
        </section>

        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widest text-ink mb-3">3. Оформление заказа</h2>
          <p>Заказ считается оформленным с момента получения Покупателем подтверждения по телефону или email. Продавец вправе отказать в оформлении заказа без объяснения причин.</p>
        </section>

        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widest text-ink mb-3">4. Оплата</h2>
          <p>Оплата производится наличными при получении, банковской картой онлайн или через СБП. Товар передаётся Покупателю после полной оплаты.</p>
        </section>

        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widests text-ink mb-3">5. Доставка</h2>
          <p>Доставка осуществляется по Москве курьером (бесплатно при заказе от 5 000 ₽, иначе 300 ₽), самовывозом (бесплатно) и Почтой России по всей России (от 350 ₽). Сроки доставки: по Москве 1–2 дня, по России 5–14 дней.</p>
        </section>

        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widests text-ink mb-3">6. Возврат и обмен</h2>
          <p>Покупатель вправе вернуть или обменять товар надлежащего качества в течение 30 дней с момента получения при условии сохранения товарного вида, потребительских свойств, пломб, фабричных ярлыков. Расходы на обратную доставку несёт Покупатель.</p>
        </section>

        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widests text-ink mb-3">7. Контакты</h2>
          <p>Email: <a href="mailto:Jjjako@mail.ru" className="text-ink border-b border-ink/30">Jjjako@mail.ru</a> · Телефон: <a href="tel:+79256337619" className="text-ink border-b border-ink/30">+7 (925) 633-76-19</a> · Москва, Россия</p>
          <p className="mt-3">ИП Кавали Джамила Зурабовна · ИНН: 504417517321 · ОГРНИП: 321774600138780</p>
        </section>
      </div>

      <p className="font-body text-xs text-gray-mid mt-12">Последнее обновление: март 2025</p>
    </main>
  )
}
