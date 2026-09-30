import { VoiceAssistant } from "@/components/VoiceAssistant";

export default function Home() {
  return (
    <>
      <div className="papel-picado" aria-hidden />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <header className="mb-6">
          <p className="text-sm font-medium text-nopal">Cocina mexicana desde 2012 🌵</p>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">Taquería El Nopal</h1>
          <p className="mt-2 max-w-2xl text-ink-soft">
            ¿Tienes dudas? Habla con Lupita, nuestra anfitriona virtual. Te cuenta del menú, horarios,
            reservas y promociones, y te muestra los platillos en pantalla.
          </p>
        </header>
        <VoiceAssistant />
      </main>
    </>
  );
}
