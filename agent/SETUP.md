# Configurar a "Lupita" en ElevenLabs

Es una guía paso a paso para el panel de ElevenLabs. Los nombres de los menús pueden variar un poco entre versiones del panel.

## 1. Cuenta y API key
1. Crea una cuenta en https://elevenlabs.io (el plan Free incluye 15 min de agente al mes).
2. Ve a **Settings → API Keys → Create API key**.
   - Si te deja elegir permisos, activa al menos los de **ElevenAgents / Conversational AI**.
3. Copia la key. La usarás en `.env.local`.

## 2. Crear el agente
1. Ve a **Agents** (ElevenAgents) → **Create agent** → **Blank agent**.
2. Nómbralo `Lupita - El Nopal`.

### Pestaña Agent
- **Agent language:** Spanish.
- **First message:**
  `¡Hola, bienvenido a Taquería El Nopal! Soy Lupita. ¿En qué te puedo ayudar?`
- **System prompt:** copia todo el contenido de [`prompt.md`](./prompt.md).
- **LLM:** uno rápido y económico (por ejemplo, un modelo "flash" o "mini"). Para un FAQ es suficiente y reduce la latencia.

### Voz
- Elige una voz femenina y cálida que suene bien en español. En la **Voice Library** puedes filtrar por idioma **Spanish** y acento **Mexican**.
- Usa un modelo de TTS **multilingüe** (por ejemplo, Flash v2.5 o Turbo v2.5). Los modelos solo-inglés no sirven para español.

### Knowledge Base
1. **Add document → Upload file** y sube [`knowledge-base.md`](./knowledge-base.md). También puedes pegar el texto con **Create text**.
2. Asócialo al agente.

## 3. Crear la client tool `mostrar_platillo`
Esta tool permite que Lupita resalte platillos en la página.

En la pestaña **Tools** del agente → **Add tool** → tipo **Client**:

| Campo | Valor |
|---|---|
| **Name** | `mostrar_platillo` (exactamente así) |
| **Description** | `Muestra en la pantalla del cliente la tarjeta de un platillo del menú. Úsala cada vez que hables de un platillo concreto.` |
| **Wait for response** | ✅ Activado |

**Parameters** → Add parameter:

| Campo | Valor |
|---|---|
| **Name** | `platillo_id` |
| **Type** | String |
| **Required** | ✅ |
| **Description** | `Id del platillo. Uno de: tacos-pastor, tacos-hongos, tacos-cochinita, tacos-pescado, mole-poblano, enchiladas-verdes, chile-relleno, guacamole, esquites, churros, flan, agua-horchata, agua-jamaica, margarita` |

Guarda el agente.

## 4. Seguridad (recomendado)
En la pestaña **Security** (o **Advanced**) del agente activa **Enable authentication**. Así solo tu backend, con la API key, puede abrir conversaciones. Nadie más puede usar tus minutos conociendo el Agent ID.

## 5. Conectar con el proyecto
1. Copia el **Agent ID** (aparece en la URL o en la configuración del agente, empieza con `agent_`).
2. En la raíz del proyecto, copia `.env.example` como `.env.local` y completa:
   ```
   ELEVENLABS_API_KEY=tu_api_key
   ELEVENLABS_AGENT_ID=agent_xxxxxxxx
   ```
3. Ejecuta `npm run dev` y abre http://localhost:3000.

## Probar sin gastar la vista
El panel de ElevenLabs tiene un botón **Test AI agent** para hablar con Lupita directamente. Úsalo para ajustar el prompt antes de probar la web.
