import Image from "next/image";

interface Product {
  name: string;
  price: number;
  image: string;
  url: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-[250px] h-[250px] lg:w-[20vw] 2xl:w-[18vw] lg:h-[20vw] 2xl:h-[18vw] bg-grunge70 rounded-2xl overflow-hidden relative"
      >
        <Image src={product.image} alt={product.name} fill />
      </a>
      <div className="flex flex-col">
        <p className="fluid-text--sm">{product.name}</p>
        <p className="fluid-text--sm text-neutral-400  polysans-neutral-mono">
          ${product.price}
        </p>
      </div>
    </div>
  );
}
