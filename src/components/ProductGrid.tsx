import { Product } from '../types'
import ProductCard from './ProductCard'

interface Props {
  products: Product[]
  title?: string
  subtitle?: string
}

export default function ProductGrid({ products, title, subtitle }: Props) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-10 max-w-screen-xl mx-auto">
      {(title || subtitle) && (
        <div className="mb-12 md:mb-16">
          {subtitle && (
            <p className="font-body text-xs uppercase tracking-widest2 text-gray-mid mb-3">
              {subtitle}
            </p>
          )}
          {title && <h2 className="section-title">{title}</h2>}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
