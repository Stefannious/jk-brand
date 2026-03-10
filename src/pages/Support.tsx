export default function Support() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-screen-md mx-auto">
        <p className="font-body text-xs uppercase tracking-widest2 text-gray-mid mb-3">
          Помощь
        </p>
        <h1 className="section-title mb-16">Поддержка</h1>

        <div className="space-y-0 border-t border-gray-light">
          {[
            {
              q: 'Как работает система трансформации?',
              a: 'Все съёмные элементы крепятся на кнопках. В каждое изделие вложена инструкция по трансформации.',
            },
            {
              q: 'Какой размер выбрать?',
              a: 'Мы рекомендуем ориентироваться на стандартную таблицу размеров. Куртки сшиты в классическом крое, свитшоты — оверсайз.',
            },
            {
              q: 'Как ухаживать за одеждой?',
              a: 'Перед стиркой снимите все съёмные элементы. Стирка при 30°, деликатный режим. Не используйте отбеливатель.',
            },
            {
              q: 'Как вернуть или обменять товар?',
              a: 'Возврат и обмен принимаются в течение 30 дней с момента получения при сохранении товарного вида и этикеток.',
            },
            {
              q: 'Как отследить заказ?',
              a: 'После отправки вы получите трек-номер на email. Доставка по Москве 1–2 дня, по России 3–7 дней.',
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group border-b border-gray-light py-6 cursor-pointer"
            >
              <summary className="font-display text-xl font-light list-none flex justify-between items-center gap-4">
                {item.q}
                <span className="text-gray-mid group-open:rotate-45 transition-transform duration-300 text-2xl font-light flex-shrink-0">
                  +
                </span>
              </summary>
              <p className="font-body text-sm text-graphite leading-relaxed mt-4 max-w-xl">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-16 bg-gray-light p-8 md:p-12">
          <h2 className="font-display text-2xl font-light mb-2">
            Не нашли ответ?
          </h2>
          <p className="font-body text-sm text-graphite mb-6">
            Напишите нам — ответим в течение нескольких часов.
          </p>
          <a href="mailto:info@jk-brand.ru" className="btn-primary">
            Написать нам
          </a>
        </div>
      </div>
    </main>
  )
}
