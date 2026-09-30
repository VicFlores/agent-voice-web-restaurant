# Taquería El Nopal · Asistente de voz

Agente de voz (FAQ) para un restaurante mexicano ficticio, hecho con **Next.js** y **ElevenLabs Agents**.
Lupita responde por voz preguntas sobre el menú, horarios, reservas y promociones, y resalta en pantalla los platillos de los que habla.

## Cómo funciona

```
Navegador ──(pide token)──► /api/token (Next.js) ──(API key)──► ElevenLabs
    │                                                                │
    └──────────────── voz por WebRTC ◄──────────────────────────────┘
```

- `app/api/token/route.ts`: backend. Obtiene un token temporal de conversación; la API key nunca llega al navegador.
- `components/VoiceAssistant.tsx`: botón de hablar, estado, transcripción y la client tool `mostrar_platillo`.
- `components/DishCard.tsx` y `data/menu.ts`: tarjetas y datos del menú.
- `agent/`: prompt, base de conocimiento y guía para configurar el agente en el panel de ElevenLabs.

## Puesta en marcha

1. Configura el agente siguiendo [`agent/SETUP.md`](agent/SETUP.md).
2. Copia `.env.example` como `.env.local` y completa `ELEVENLABS_API_KEY` y `ELEVENLABS_AGENT_ID`.
3. `npm install` y luego `npm run dev`.
4. Abre http://localhost:3000 y permite el micrófono.

> Si cambias el menú en `data/menu.ts`, actualiza también `agent/knowledge-base.md` y súbelo de nuevo a ElevenLabs.
