"use client";

import { useEffect, useRef, useState } from "react";
import {
  ConversationProvider,
  useConversation,
  useConversationClientTool,
  type Role,
} from "@elevenlabs/react";
import { MENU, buscarPlatillo, type Categoria } from "@/data/menu";
import { DishCard } from "@/components/DishCard";

type Linea = { role: Role; texto: string };

const CATEGORIAS: Categoria[] = ["Tacos", "Platos fuertes", "Antojitos", "Postres", "Bebidas"];

export function VoiceAssistant() {
  return (
    <ConversationProvider>
      <Experiencia />
    </ConversationProvider>
  );
}

function Experiencia() {
  const [transcripcion, setTranscripcion] = useState<Linea[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [destacado, setDestacado] = useState<string | null>(null);
  const [pidiendoToken, setPidiendoToken] = useState(false);
  const finTranscripcion = useRef<HTMLDivElement>(null);

  const { startSession, endSession, status, isSpeaking } = useConversation({
    onMessage: ({ message, role }) => setTranscripcion((t) => [...t, { role, texto: message }]),
    onError: (message) => setError(message),
  });

  // El nombre debe coincidir con la client tool configurada en el panel de ElevenLabs.
  useConversationClientTool("mostrar_platillo", ({ platillo_id }) => {
    const platillo = typeof platillo_id === "string" ? buscarPlatillo(platillo_id) : undefined;
    if (!platillo) return `No encontré el platillo "${String(platillo_id)}" en el menú.`;
    setDestacado(platillo.id);
    document
      .getElementById(`platillo-${platillo.id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    return `Mostrando ${platillo.nombre} en pantalla.`;
  });

  useEffect(() => {
    finTranscripcion.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [transcripcion]);

  const conectado = status === "connected";
  const conectando = status === "connecting" || pidiendoToken;

  async function iniciar() {
    setError(null);
    setPidiendoToken(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const res = await fetch("/api/token");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo obtener el token");
      setTranscripcion([]);
      setDestacado(null);
      startSession({ conversationToken: data.token, connectionType: "webrtc" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(
        e instanceof DOMException && e.name === "NotAllowedError"
          ? "Necesitamos permiso para usar tu micrófono."
          : msg,
      );
    } finally {
      setPidiendoToken(false);
    }
  }

  const estado = conectando
    ? "Conectando con Lupita…"
    : conectado
      ? isSpeaking
        ? "Lupita está hablando"
        : "Te escucho…"
      : "Toca el botón para hablar con Lupita";

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      {/* Panel del asistente */}
      <section className="flex flex-col rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-6 lg:h-[calc(100dvh-3rem)]">
        <div className="flex flex-col items-center text-center">
          <button
            onClick={conectado ? endSession : iniciar}
            disabled={conectando}
            aria-label={conectado ? "Terminar conversación" : "Hablar con Lupita"}
            className={`relative flex h-28 w-28 items-center justify-center rounded-full text-5xl text-white transition-colors disabled:opacity-60 ${
              conectado ? "bg-nopal" : "bg-terracota hover:bg-terracota-dark"
            }`}
          >
            {conectado && (
              <span
                className={`absolute inset-0 rounded-full ${isSpeaking ? "bg-rosa/40" : "bg-nopal/40"} animate-ping`}
              />
            )}
            <span className="relative">{conectado ? "■" : "🎤"}</span>
          </button>
          <p className="mt-4 font-display text-xl text-ink">{estado}</p>
          <p className="mt-1 text-sm text-ink-soft">
            {conectado ? "Toca de nuevo para colgar" : "Pregúntale por el menú, horarios o promociones"}
          </p>
          {error && (
            <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 min-h-40 flex-1 overflow-y-auto rounded-2xl bg-crema p-4">
          {transcripcion.length === 0 ? (
            <ul className="space-y-2 text-sm text-ink-soft">
              <li className="font-medium text-ink">Prueba preguntar:</li>
              <li>“¿Qué tienen vegetariano?”</li>
              <li>“¿El mole lleva cacahuate?”</li>
              <li>“¿Abren los domingos?”</li>
              <li>“¿Qué promociones tienen hoy?”</li>
            </ul>
          ) : (
            <div className="space-y-3">
              {transcripcion.map((l, i) => (
                <div key={i} className={`flex ${l.role === "user" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      l.role === "user" ? "bg-terracota text-white" : "bg-surface text-ink"
                    }`}
                  >
                    {l.texto}
                  </p>
                </div>
              ))}
              <div ref={finTranscripcion} />
            </div>
          )}
        </div>
      </section>

      {/* Menú */}
      <section aria-labelledby="menu-titulo">
        <h2 id="menu-titulo" className="font-display text-3xl text-ink">
          Nuestro menú
        </h2>
        {CATEGORIAS.map((cat) => (
          <div key={cat} className="mt-6">
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-terracota uppercase">{cat}</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {MENU.filter((p) => p.categoria === cat).map((p) => (
                <DishCard key={p.id} platillo={p} destacado={p.id === destacado} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
