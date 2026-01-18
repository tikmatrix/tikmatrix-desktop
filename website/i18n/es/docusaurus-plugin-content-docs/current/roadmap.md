---
sidebar_position: 1
title: Posicionamiento y Hoja de Ruta de TikMatrix/IgMatrix
sidebar_label: Hoja de Ruta
description: Hoja de ruta de la versión oficial, describe el posicionamiento de TikMatrix/IgMatrix en el ecosistema de operaciones automatizadas, límites de capacidad y sugerencias de implementación.
slug: roadmap
---

## Mapa del Flujo Completo

![Hoja de ruta de TikMatrix/IgMatrix](/img/roadmap-zh.svg)

---

## Para Quién Creamos Valor

- **Equipos pequeños y medianos/MCN/Marcas/Equipos de prueba A/B**: Necesitan ejecutar de manera estable "acciones operativas diarias repetitivas pero que requieren humanización" en una escala de 5 a 100 dispositivos.
- **Crecimiento y operaciones de contenido**: Necesitan orquestación de comportamiento "masivo pero no mecánico" altamente controlable, equilibrando estrategias de seguridad y eficiencia.

---

## Propuesta de Valor Central (Por Qué Elegir TikMatrix/IgMatrix)

1. **Automatización masiva orquestable**: Construye pipelines reutilizables con el modelo "tarea → script → fuente de datos", cubriendo toda la cadena de acciones de calentamiento, publicación, interacción y recopilación.
2. **Humanización y estrategia de control de riesgos**: El motor cuenta con mecanismos de temporización aleatoria, control de ritmo, simulación de gestos humano-máquina y recuperación de interrupciones anormales, aproximándose lo más posible a las características de comportamiento humano real.
3. **Escalabilidad y estabilidad**: Compatible con combinaciones de dispositivos reales/nube, conexiones USB/TCP ADB, garantiza expansión lineal y programación estable de 5→20→50→100 dispositivos.
4. **Observabilidad de datos**: Registros de tareas, proyección de pantalla de dispositivos, estadísticas de cuentas y exportación de datos de resultados.

---

## Mapa de Funcionalidades (Límites de Capacidad del Paso 4)

### 1) Orquestación y Programación de Tareas

- Estrategia de concurrencia de múltiples cuentas/múltiples dispositivos, orden de ejecución aleatorio
- Reintentos ante fallos, reanudación desde punto de interrupción, gestión de ocupación de recursos (materiales/cuentas/proxies)

### 2) Centro de Scripts

- **Script de Super Marketing**: Ya integra capacidades de impulso de usuarios/publicaciones, mensajes directos masivos, comentarios masivos, etc.
- Script de calentamiento de cuentas: Navegación diaria, permanencia, interacción ligera
- Script de publicación de contenido: Gestión de videos/textos/etiquetas/temas, publicación programada
- Script de recopilación de datos: Extrae información de nombres de usuario, construye lista de objetivos para la próxima ronda

### 3) Humano-Máquina y Control de Riesgos

- Aleatorización de toques/deslizamientos/pausas/duración de visualización
- Detección de anomalías y limitación de velocidad, evita comportamiento de alta frecuencia único

> **Declaración de límites**: TikMatrix/IgMatrix no proporciona dispositivos, cuentas ni proxies; nos enfocamos en la **automatización de acciones operativas**.

---

## Sugerencias de Implementación (De 0 a Escala)

1. **Período de validación (1-5 dispositivos)**: Conecte dispositivo→cuenta→proxy→script único en un bucle cerrado mínimo
2. **Período piloto (10-20 dispositivos)**: Introduzca script de Super Marketing + bucle cerrado de recopilación de datos; observe umbrales de control de riesgos
3. **Período de expansión (20-50 dispositivos)**: Limitación de velocidad por grupos, estrategia de aleatorización, rotación de múltiples fuentes de datos
4. **Período de escala (50-100 dispositivos)**: Programación por lotes, ejecución escalonada

---

## Aviso de Riesgos y Cumplimiento

- El uso de herramientas de automatización puede violar los términos de servicio de la plataforma; por favor **asuma los riesgos** y controle razonablemente la frecuencia y los patrones de comportamiento
- El entorno de hardware del teléfono, proxies, calidad de cuentas y estrategia operativa afectarán significativamente la estabilidad y los resultados

---

## Preguntas Frecuentes

**P: ¿TikMatrix proporciona cuentas/proxies?**  
R: No. Nos enfocamos en el motor de automatización y la ejecución de scripts.

**P: ¿Proporcionan teléfonos en la nube?**  
R: No. Los usuarios deben preparar su propio entorno de dispositivos.

**P: ¿Compatible con teléfonos en la nube?**  
R: Siempre que pueda conectarse de manera estable a través de ADB (USB/TCP), puede ser programado.

---

## Llamado a la Acción

- Pruebe inmediatamente el plan Starter, construya su bucle cerrado mínimo viable de "Paso 4"
- Lea la documentación de scripts, comience rápidamente con operaciones masivas
