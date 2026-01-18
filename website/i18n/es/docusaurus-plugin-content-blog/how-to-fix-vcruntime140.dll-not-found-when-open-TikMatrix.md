---
slug: How-to-fix-vcruntime140.dll-not-found-when-open-TikMatrix
title: Cómo solucionar el error "vcruntime140.dll no encontrado"
authors: tikMatrix
tags: [vcruntime140.ddl not found,fixed,tikmatrix]
---
El error "vcruntime140.dll no encontrado" generalmente se debe a que el paquete redistribuible de Microsoft Visual C++ no está instalado o está dañado. Aquí están los pasos para solucionar este problema:
<!--truncate-->
---

1. **Descargar el paquete redistribuible de Microsoft Visual C++**:
   - Ve a la [página de descarga de Microsoft Visual C++ Redistributable](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads).
   - Descarga la versión adecuada para tu sistema (generalmente la versión de 64 bits, pero si tu aplicación requiere la versión de 32 bits, descarga la correspondiente).

2. **Instalar el paquete redistribuible**:
   - Ejecuta el instalador descargado y sigue las instrucciones en pantalla para instalarlo.
   - Si ya tienes el paquete instalado, puedes seleccionar la opción "Reparar" durante el proceso de instalación para reparar la instalación.

3. **Reinicia el ordenador**:
   - Después de instalar o reparar el paquete, reinicia tu ordenador para asegurarte de que todos los cambios surtan efecto.

4. **Verificar actualizaciones**:
   - Asegúrate de que tu Windows esté actualizado. Ve a `Configuración > Actualización y seguridad > Windows Update` y verifica las actualizaciones.

5. **Reinstalar TikMatrix**:
   - Si los pasos anteriores no funcionan, intenta desinstalar y reinstalar TikMatrix. Asegúrate de descargar la última versión desde el sitio oficial.

Si después de intentar estos pasos el error persiste, es posible que necesites verificar si hay problemas adicionales, como archivos del sistema dañados, ejecutando la herramienta de verificación de archivos del sistema:

1. **Ejecutar la herramienta de verificación de archivos del sistema (SFC)**:
   - Abre el Símbolo del sistema como administrador (haz clic derecho en el botón "Inicio" y selecciona "Símbolo del sistema (Admin)" o "Windows PowerShell (Admin)").
   - Escribe `sfc /scannow` y presiona Enter.
   - Espera a que el proceso se complete. Si SFC encuentra problemas, intentará repararlos.

Estos pasos deberían ayudarte a resolver el error "vcruntime140.dll no encontrado" y hacer que TikMatrix funcione normalmente.
