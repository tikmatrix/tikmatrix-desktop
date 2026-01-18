---
sidebar_position: 9
---

# Configuración de función de marca blanca

:::info Requiere suscripción anual
La función de marca blanca solo está disponible para usuarios de **suscripción anual**. Después de comprar un plan anual, contacta con el servicio al cliente a través de [Telegram](https://t.me/tikmatrix_agent_bot) para obtener el código de desbloqueo.
:::

La función de marca blanca te permite personalizar la identidad de marca de TikMatrix para que coincida con la imagen de tu empresa. Puedes modificar el nombre de la aplicación, el logo y la información de marca para crear una versión personalizada de TikMatrix.

## Características de la función

### Configuración básica

- **Nombre de la aplicación**: Personaliza el nombre mostrado de la aplicación
- **Cargar logo**: Sube tu logo principal personalizado (recomendado 128x128px)
- **Icono del sitio web**: Establece el icono personalizado de la aplicación

### Configuración de marca

- **Correo de soporte**: Dirección de correo electrónico de soporte al cliente
- **Enlace de tutorial**: Enlace personalizado de tutorial/documentación
- **Enlace de Telegram**: Establece tu enlace de grupo o canal de Telegram

### Interruptores de función

- **Mostrar enlace de tutorial**: Controla la visualización del enlace de tutorial
- **Mostrar información de marca**: Controla la visualización de información de marca

## Métodos de configuración

### Método 1: Configuración de interfaz

1. Inicia la aplicación TikMatrix
2. Haz clic en el icono de paleta en la barra de título 🎨
3. Configura los parámetros en el cuadro de diálogo de configuración de marca blanca:
   - **Nombre de la aplicación**: Ingresa tu nombre de aplicación personalizado
   - **Logo principal**: Sube tu archivo de logo (PNG/JPG, recomendado 128x128px)
   - **Correo de soporte**: Ingresa tu dirección de correo de soporte
   - **Enlace de tutorial**: Ingresa tu enlace de tutorial personalizado
   - **Enlace de Telegram**: Ingresa tu enlace de grupo/canal de Telegram
   - **Interruptores de función**: Habilitar/deshabilitar visualización de enlace de tutorial e información de marca
4. Haz clic en "Guardar" para aplicar la configuración

### Método 2: Archivo de configuración

1. Copia el archivo de configuración de ejemplo:

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. Edita el archivo de configuración:

   ```json
   {
     "appName": "Nombre de tu aplicación",
     "logo": {
       "main": "/path/to/your/logo.webp",
       "favicon": "/path/to/your/favicon.ico"
     },
     "brand": {
       "supportEmail": "support@tuempresa.com",
       "tutorialUrl": "https://tuempresa.com/docs",
       "telegramUrl": "https://t.me/tugrupo"
     },
     "features": {
       "showTutorialLink": true,
       "showBrandInfo": true
     }
   }
   ```

3. Guarda el archivo y reinicia la aplicación

### Método 3: Herramienta de línea de comandos

1. Entra al directorio del proyecto:

   ```bash
   cd tikmatrix-desktop
   ```

2. Ejecuta la herramienta de configuración:

   ```bash
   node scripts/whitelabel-config.js
   ```

3. Sigue las instrucciones para configurar cada parámetro paso a paso

## Construir versión personalizada

### 1. Preparar archivos de recursos

```bash
# Coloca tu archivo de logo en la ubicación correcta
src/assets/your-logo.webp       # Logo principal
public/your-favicon.ico        # Icono web
src-tauri/icons/               # Icono de aplicación (varios tamaños)
```

### 2. Configurar parámetros de construcción

Usa la herramienta de línea de comandos o edita manualmente la configuración:

```bash
# Usar herramienta de línea de comandos
node scripts/whitelabel-config.js

# O editar manualmente
src/config/whitelabel-build.json
```

### 3. Construir aplicación

```bash
# Modo desarrollo
npm run dev

# Construcción de producción
npm run build

# Construir aplicación Tauri
npm run tauri build
```

## Prioridad de configuración

El sistema usa la configuración en el siguiente orden de prioridad:

1. **Configuración de tiempo de ejecución**: `whitelabel_config` en LocalStorage del navegador
2. **Configuración de construcción**: `src/config/whitelabel-build.json` (usado en construcción)
3. **Configuración de ejemplo**: `examples/whitelabel-config.json`
4. **Configuración predeterminada**: Valores predeterminados incorporados

## Requisitos del logo

### Logo principal

- **Formato**: PNG, JPG o SVG
- **Tamaño**: 128x128px (recomendado)
- **Fondo**: Fondo transparente (formato PNG)
- **Uso**: Barra de título, pantalla de inicio, cuadro de diálogo Acerca de

### Icono del sitio web

- **Formato**: ICO o PNG
- **Tamaño**: 32x32px o 16x16px
- **Uso**: Pestaña del navegador, icono de ventana

### Icono de aplicación (para construcción)

- **Formato**: PNG, ICO, ICNS
- **Tamaño**: 32x32, 128x128, 256x256, 512x512
- **Ubicación**: Directorio `src-tauri/icons/`

## Integración de API

### API de JavaScript

```javascript
import { 
  getWhiteLabelConfig,
  saveWhiteLabelConfig, 
  resetWhiteLabelConfig,
  validateWhiteLabelConfig 
} from './config/whitelabel.js';

// Obtener configuración actual
const config = getWhiteLabelConfig();

// Guardar nueva configuración
saveWhiteLabelConfig(newConfig);

// Restablecer a valores predeterminados
resetWhiteLabelConfig();

// Validar configuración
validateWhiteLabelConfig(config);
```

### Funciones de utilidad

```javascript
import { 
  initWhiteLabel,
  updateDocumentTitle,
  updateFavicon
} from './utils/whitelabel.js';

// Inicializar marca blanca al inicio de la aplicación
initWhiteLabel();

// Actualizar título del documento
updateDocumentTitle('Nombre de tu aplicación');

// Actualizar icono
updateFavicon('/path/to/favicon.ico');
```

## Mejores prácticas

### Diseño de logo

- Usa imágenes de alta resolución para una visualización clara
- Mantén una imagen de marca consistente en todos los tamaños de logo
- Prueba el logo en fondos claros y oscuros
- Asegúrate de que el logo sea legible en tamaños pequeños

### Consistencia de marca

- Usa colores y fuentes consistentes en toda la interfaz
- Mantén consistencia con tus guías de marca existentes
- Prueba la interfaz personalizada en diferentes tamaños de pantalla
- Mantén una apariencia profesional

### Configuración de enlaces

- Usa HTTPS para todos los enlaces externos
- Prueba todos los enlaces antes del despliegue
- Asegúrate de que los canales de soporte estén monitoreados adecuadamente
- Mantén los enlaces de documentación actualizados

## Solución de problemas

### Problemas comunes

**El logo no se muestra:**

- Verifica la ruta del archivo y los permisos
- Verifica que el formato de imagen sea compatible
- Asegúrate de que el tamaño de la imagen sea apropiado
- Limpia la caché del navegador y reinicia la aplicación

**La configuración no se guarda:**

- Verifica los permisos del sistema de archivos
- Verifica que la sintaxis JSON sea correcta
- Asegúrate de que el directorio de configuración exista
- Intenta ejecutar como administrador (si es necesario)

**Fallo en la construcción:**

- Verifica que todos los archivos de recursos existan
- Verifica la sintaxis del archivo de configuración
- Asegúrate de que el formato de los archivos de iconos sea correcto
- Consulta los registros de construcción para errores específicos

### Obtener ayuda

Si encuentras problemas durante la configuración de marca blanca:

1. Consulta la sección de solución de problemas anterior
2. Verifica la sintaxis del archivo de configuración
3. Contacta con soporte técnico a través de [Telegram](https://t.me/tikmatrix_agent_bot)
4. Incluye tu archivo de configuración y mensaje de error al reportar problemas

## Licencia y uso

- La función de marca blanca solo está disponible para usuarios de suscripción anual
- Los derechos de marca personalizada están incluidos en tu suscripción
- La distribución de versiones personalizadas puede requerir licencia adicional
- Contacta con el servicio al cliente para opciones de licencia empresarial

---

**¿Necesitas un código de desbloqueo?** Contacta con nuestro equipo de servicio al cliente a través de [Telegram](https://t.me/tikmatrix_agent_bot) con los detalles de tu suscripción anual.
