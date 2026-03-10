import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background image */}
      <img
        src="/hero.jpg"
        alt="JK Collection"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay — darkens bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 pb-16 md:pb-24 px-8 md:px-16">
        <div className="animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <p className="font-body text-xs uppercase tracking-widest2 text-cream/60 mb-4">
            Новая коллекция
          </p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.25s', opacity: 0 }}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-cream leading-none mb-4">
            JK
          </h1>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <p className="font-display text-xl md:text-2xl font-light italic text-cream/80 mb-10 max-w-md">
            One Piece. Endless Forms.
          </p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.55s', opacity: 0 }}>
          <Link to="/catalog" className="btn-primary bg-cream text-ink hover:bg-gray-light">
            Смотреть каталог
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 opacity-40">
        <span className="font-body text-xs tracking-widest text-cream rotate-90 origin-center">
          SCROLL
        </span>
        <div className="h-12 w-px bg-cream/40" />
      </div>
    </section>
  )
}
