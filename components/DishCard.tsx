import type { Platillo } from "@/data/menu";

const precioMXN = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

export function Picante({ nivel }: { nivel: Platillo["picante"] }) {
  if (nivel === 0) return <span className="text-xs text-ink-soft">No pica</span>;
  return (
    <span className="text-xs" aria-label={`Picante nivel ${nivel} de 3`}>
      {"🌶️".repeat(nivel)}
    </span>
  );
}

export function DishCard({ platillo, destacado }: { platillo: Platillo; destacado?: boolean }) {
  return (
    <article
      id={`platillo-${platillo.id}`}
      className={`relative flex gap-3 rounded-2xl border bg-surface p-4 transition-all duration-500 ${
        destacado
          ? "border-rosa shadow-[0_0_0_3px_var(--color-rosa)] scale-[1.02]"
          : "border-line"
      }`}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-crema text-3xl">
        {platillo.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-tight text-ink">{platillo.nombre}</h3>
          <span className="shrink-0 font-semibold text-terracota">
            {precioMXN.format(platillo.precio)}
          </span>
        </div>
        <p className="mt-1 text-sm text-ink-soft">{platillo.descripcion}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Picante nivel={platillo.picante} />
          {platillo.vegetariano && (
            <span className="rounded-full bg-nopal/15 px-2 py-0.5 text-xs text-nopal">Vegetariano</span>
          )}
          {platillo.alergenos.map((a) => (
            <span key={a} className="rounded-full bg-line px-2 py-0.5 text-xs text-ink-soft">
              {a}
            </span>
          ))}
        </div>
      </div>
      {destacado && (
        <span className="absolute -top-2.5 right-4 rounded-full bg-rosa px-2 py-0.5 text-xs font-medium text-white">
          Lupita te lo muestra
        </span>
      )}
    </article>
  );
}
