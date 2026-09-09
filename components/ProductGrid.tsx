/**
 * ProductGrid — ряд карточек-продуктов. Инверсия цвета — по наведению курсора
 * (см. `ProductCard`). Макетный отступ между карточками — 24px.
 */

import ProductCard from "./ProductCard";
import { PRODUCT_CARDS } from "./hero.data";

export default function ProductGrid() {
  return (
    <ul className="flex gap-6">
      {PRODUCT_CARDS.map((card) => (
        <ProductCard key={card.id} card={card} />
      ))}
    </ul>
  );
}
