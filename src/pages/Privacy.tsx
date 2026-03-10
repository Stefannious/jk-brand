import React from 'react'

export default function Privacy() {
  return (
    <main className="max-w-screen-md mx-auto px-6 md:px-10 py-16 pb-24">
      <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-3">Документы</p>
      <h1 className="font-display text-4xl font-light mb-10">Политика конфиденциальности</h1>

      <div className="space-y-8 font-body text-sm text-graphite leading-relaxed">
        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widest text-ink mb-3">1. Общие положения</h2>
          <p>Настоящая политика конфиденциальности (далее — «Политика») действует в отношении всей информации, которую интернет-магазин JK Brand, расположенный на доменном имени <strong>jk-brand.ru</strong>, может получить о пользователе во время использования сайта, его сервисов, программ и продуктов.</p>
        </section>

        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widest text-ink mb-3">2. Персональные данные</h2>
          <p>Мы собираем следующие персональные данные при оформлении заказа: имя и фамилия, адрес электронной почты, номер телефона, адрес доставки. Данные используются исключительно для обработки и доставки заказов, а также для связи с покупателем.</p>
        </section>

        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widest text-ink mb-3">3. Использование данных</h2>
          <p>Персональные данные не передаются третьим лицам, за исключением случаев, необходимых для выполнения заказа (службы доставки). Мы не продаём и не обмениваем ваши данные.</p>
        </section>

        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widest text-ink mb-3">4. Cookie</h2>
          <p>Сайт использует файлы cookie для улучшения работы. Продолжая использовать сайт, вы соглашаетесь с использованием cookie-файлов в соответствии с данной политикой.</p>
        </section>

        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widest text-ink mb-3">5. Безопасность</h2>
          <p>Мы принимаем необходимые меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
        </section>

        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widest text-ink mb-3">6. Контакты</h2>
          <p>По вопросам, связанным с персональными данными, обращайтесь: <a href="mailto:Jjjako@mail.ru" className="text-ink border-b border-ink/30">Jjjako@mail.ru</a> или по телефону <a href="tel:+79256337619" className="text-ink border-b border-ink/30">+7 (925) 633-76-19</a>.</p>
        </section>

        <section>
          <h2 className="font-body text-[11px] uppercase tracking-widest text-ink mb-3">7. Изменения политики</h2>
          <p>Мы оставляем за собой право изменять данную политику. Актуальная версия всегда доступна на данной странице.</p>
        </section>
      </div>

      <p className="font-body text-xs text-gray-mid mt-12">Последнее обновление: март 2025</p>
    </main>
  )
}
