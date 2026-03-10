import { Link } from 'react-router-dom'

export default function Concept() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="/bomber-navy-2.jpg"
          alt="Концепция JK"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-16">
          <p className="font-body text-[10px] uppercase tracking-widest text-cream/50 mb-3 animate-fade-up" style={{ opacity: 0, animationDelay: '0.1s' }}>
            О бренде
          </p>
          <h1 className="font-display text-6xl md:text-8xl font-light text-cream animate-fade-up" style={{ opacity: 0, animationDelay: '0.25s' }}>
            Концепция
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-screen-md mx-auto px-6 md:px-10 py-20 md:py-28">
        <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-6">Манифест</p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-ink leading-tight mb-10">
          Мы верим, что у каждой вещи должно быть несколько жизней
        </h2>
        <div className="space-y-5 font-body text-sm text-graphite leading-relaxed">
          <p>
            JK — это бренд трансформируемой одежды, рождённый из простой идеи:
            настоящая вещь не должна быть ограничена одним образом.
          </p>
          <p>
            Каждая деталь наших изделий продумана как часть системы. Рукава,
            капюшоны, воротники и панели крепятся на кнопках и могут быть
            сняты или заменены за считанные секунды.
          </p>
          <p>
            Один бомбер становится жилетом. Свитшот меняет силуэт одним
            движением. Это не просто удобство — это философия осознанного
            потребления: покупай меньше, носи больше.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-light py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-screen-xl mx-auto">
          <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-6 text-center">Как это работает</p>
          <h2 className="section-title text-center mb-16">Система трансформации</h2>
          <div className="grid md:grid-cols-3 gap-px bg-gray-mid">
            {[
              { step: '01', title: 'Снимите рукава', desc: 'Рукава крепятся на кнопках по всей длине. Одно движение — и куртка превращается в жилет.', icon: '↻' },
              { step: '02', title: 'Снимите капюшон', desc: 'Капюшон съёмный. Меняйте силуэт в зависимости от настроения и погоды.', icon: '◈' },
              { step: '03', title: 'Меняйте образы', desc: 'Комбинируйте детали разных изделий. Каждый JK-предмет совместим между собой.', icon: '⊕' },
            ].map(s => (
              <div key={s.step} className="bg-gray-light p-10 md:p-12">
                <span className="font-display text-5xl text-gray-mid block mb-6">{s.icon}</span>
                <span className="font-body text-[10px] tracking-widest text-gray-mid block mb-3">{s.step}</span>
                <h3 className="font-display text-2xl font-light mb-4">{s.title}</h3>
                <p className="font-body text-sm text-graphite leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="font-display text-4xl font-light mb-4">Готовы трансформироваться?</h2>
        <p className="font-body text-sm text-graphite mb-10">Изучите коллекцию и найдите свою систему образов</p>
        <Link to="/catalog" className="btn-primary">Перейти в каталог</Link>
      </section>
    </main>
  )
}
