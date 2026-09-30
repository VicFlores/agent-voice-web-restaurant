// Menú de Taquería El Nopal (restaurante ficticio).
// Si cambias algo aquí, actualiza también agent/knowledge-base.md,
// que es lo que el agente de ElevenLabs conoce.

export type Categoria = "Tacos" | "Platos fuertes" | "Antojitos" | "Postres" | "Bebidas";

export type Platillo = {
  id: string;
  nombre: string;
  categoria: Categoria;
  descripcion: string;
  precio: number; // MXN
  picante: 0 | 1 | 2 | 3;
  vegetariano: boolean;
  alergenos: string[];
  emoji: string;
};

export const MENU: Platillo[] = [
  {
    id: "tacos-pastor",
    nombre: "Tacos al pastor",
    categoria: "Tacos",
    descripcion: "Cerdo marinado en achiote al trompo, con piña, cebolla y cilantro. Orden de 4.",
    precio: 95,
    picante: 1,
    vegetariano: false,
    alergenos: [],
    emoji: "🌮",
  },
  {
    id: "tacos-hongos",
    nombre: "Tacos de hongos al epazote",
    categoria: "Tacos",
    descripcion: "Hongos salteados con ajo, epazote y queso fresco. Orden de 4.",
    precio: 90,
    picante: 0,
    vegetariano: true,
    alergenos: ["lácteos"],
    emoji: "🍄",
  },
  {
    id: "tacos-cochinita",
    nombre: "Tacos de cochinita pibil",
    categoria: "Tacos",
    descripcion: "Cerdo cocido lento en achiote y naranja agria, con cebolla morada encurtida y habanero aparte.",
    precio: 105,
    picante: 2,
    vegetariano: false,
    alergenos: [],
    emoji: "🐷",
  },
  {
    id: "tacos-pescado",
    nombre: "Tacos de pescado estilo Baja",
    categoria: "Tacos",
    descripcion: "Pescado capeado con col morada, pico de gallo y aderezo de chipotle. Orden de 3.",
    precio: 120,
    picante: 1,
    vegetariano: false,
    alergenos: ["pescado", "gluten", "huevo"],
    emoji: "🐟",
  },
  {
    id: "mole-poblano",
    nombre: "Mole poblano con pollo",
    categoria: "Platos fuertes",
    descripcion: "Pieza de pollo bañada en mole poblano de la casa, con arroz rojo y tortillas.",
    precio: 185,
    picante: 1,
    vegetariano: false,
    alergenos: ["cacahuate", "ajonjolí", "frutos secos"],
    emoji: "🍗",
  },
  {
    id: "enchiladas-verdes",
    nombre: "Enchiladas verdes de queso",
    categoria: "Platos fuertes",
    descripcion: "Tres enchiladas rellenas de queso, con salsa verde de tomatillo, crema y cebolla.",
    precio: 145,
    picante: 1,
    vegetariano: true,
    alergenos: ["lácteos"],
    emoji: "🫔",
  },
  {
    id: "chile-relleno",
    nombre: "Chile relleno",
    categoria: "Platos fuertes",
    descripcion: "Chile poblano relleno de queso Oaxaca, capeado, en caldillo de jitomate.",
    precio: 155,
    picante: 1,
    vegetariano: true,
    alergenos: ["lácteos", "huevo", "gluten"],
    emoji: "🌶️",
  },
  {
    id: "guacamole",
    nombre: "Guacamole con totopos",
    categoria: "Antojitos",
    descripcion: "Aguacate machacado al momento con jitomate, cebolla, cilantro y limón.",
    precio: 110,
    picante: 0,
    vegetariano: true,
    alergenos: [],
    emoji: "🥑",
  },
  {
    id: "esquites",
    nombre: "Esquites",
    categoria: "Antojitos",
    descripcion: "Granos de elote con mayonesa, queso cotija, limón y chile piquín.",
    precio: 65,
    picante: 1,
    vegetariano: true,
    alergenos: ["lácteos", "huevo"],
    emoji: "🌽",
  },
  {
    id: "churros",
    nombre: "Churros con chocolate",
    categoria: "Postres",
    descripcion: "Cinco churros con azúcar y canela, con chocolate caliente para remojar.",
    precio: 75,
    picante: 0,
    vegetariano: true,
    alergenos: ["gluten", "lácteos", "huevo"],
    emoji: "🥖",
  },
  {
    id: "flan",
    nombre: "Flan napolitano",
    categoria: "Postres",
    descripcion: "Flan casero con caramelo.",
    precio: 60,
    picante: 0,
    vegetariano: true,
    alergenos: ["lácteos", "huevo"],
    emoji: "🍮",
  },
  {
    id: "agua-horchata",
    nombre: "Agua de horchata",
    categoria: "Bebidas",
    descripcion: "Agua fresca de arroz con canela. Vaso de 500 ml.",
    precio: 40,
    picante: 0,
    vegetariano: true,
    alergenos: ["lácteos"],
    emoji: "🥛",
  },
  {
    id: "agua-jamaica",
    nombre: "Agua de jamaica",
    categoria: "Bebidas",
    descripcion: "Agua fresca de flor de jamaica. Vaso de 500 ml.",
    precio: 40,
    picante: 0,
    vegetariano: true,
    alergenos: [],
    emoji: "🌺",
  },
  {
    id: "margarita",
    nombre: "Margarita clásica",
    categoria: "Bebidas",
    descripcion: "Tequila blanco, licor de naranja y limón, con escarchado de sal. Solo mayores de 18.",
    precio: 130,
    picante: 0,
    vegetariano: true,
    alergenos: [],
    emoji: "🍹",
  },
];

const normalizar = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();

// El agente debería enviar el id exacto, pero aceptamos también el nombre
// por si el LLM se equivoca ligeramente.
export function buscarPlatillo(consulta: string): Platillo | undefined {
  const q = normalizar(consulta);
  return (
    MENU.find((p) => p.id === q) ??
    MENU.find((p) => normalizar(p.nombre) === q) ??
    MENU.find((p) => normalizar(p.nombre).includes(q) || q.includes(normalizar(p.nombre)))
  );
}
