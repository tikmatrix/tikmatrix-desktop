# Configuración de Work Profile

TikMatrix admite configurar usuarios de Work Profile por separado para cada dispositivo, lo cual es muy útil para usar dispositivos empresariales o aplicaciones duales.

## Qué es Work Profile

Work Profile (perfil de trabajo) es una función de Android que permite crear un entorno de trabajo independiente en el mismo dispositivo. Al configurar diferentes IDs de usuario, puedes:

- Usar TikMatrix normalmente en dispositivos gestionados por la empresa
- Establecer diferentes configuraciones de usuario para diferentes entornos de aplicación
- Lograr un control de permisos y gestión de dispositivos más refinado

## Usar la herramienta Shelter para clonar aplicaciones

Antes de configurar Work Profile, necesitas usar la herramienta Shelter para clonar las aplicaciones TikTok y TikMatrix:

### Qué es Shelter

Shelter es una aplicación de código abierto que puede crear y gestionar Work Profile en dispositivos Android. Te permite ejecutar aplicaciones duplicadas en un entorno de trabajo aislado.

### Instalar Shelter

1. Descarga Shelter desde [F-Droid](https://f-droid.org/packages/net.typeblog.shelter/) o [Google Play Store](https://play.google.com/store/apps/details?id=net.typeblog.shelter)
2. Instala y abre Shelter en el dispositivo
3. Sigue el asistente de configuración para crear Work Profile

### Clonar las aplicaciones necesarias

Después de configurar Shelter, necesitas clonar las aplicaciones TikTok y TikMatrix:

1. **Clonar aplicación TikTok**:
   - Abre Shelter y ve a la pestaña "Interfaz principal"
   - Encuentra TikTok en la lista de aplicaciones
   - Haz clic en el botón "Clonar a perfil de trabajo"
   - Espera a que se complete el proceso de clonación

2. **Clonar aplicación TikMatrix**:
   - En Shelter, encuentra TikMatrix en la lista de aplicaciones
   - Haz clic en el botón "Clonar a perfil de trabajo"
   - Confirma la operación de clonación

### Verificar clonación exitosa

Después de una clonación exitosa:

- Verás TikTok y TikMatrix con icono de maletín en el cajón de aplicaciones
- Estas son las versiones de Work Profile de las aplicaciones
- Las aplicaciones originales en el perfil principal permanecen sin cambios

## Cómo configurar Work Profile

### 1. Abrir barra de herramientas del dispositivo

Cuando tu dispositivo está conectado y se muestra en la interfaz principal de TikMatrix:

1. Haz doble clic en la tarjeta del dispositivo para entrar al modo de pantalla grande
2. Aparecerá una barra de herramientas en el lado derecho de la pantalla del dispositivo
3. La barra de herramientas está contraída por defecto y se expande automáticamente al pasar el ratón

### 2. Encontrar el botón de Work Profile

En la parte inferior de la barra de herramientas, verás un botón con icono de maletín, este es el botón de configuración de Work Profile.

### 3. Establecer ID de usuario

1. Haz clic en el botón de icono de maletín
2. En el cuadro de diálogo emergente, ingresa el ID de usuario (por ejemplo: 10)
3. Haz clic en el botón "Guardar"

### 4. Confirmar configuración

Después de una configuración exitosa, el sistema mostrará el mensaje "Configuración de usuario de perfil de trabajo guardada".

## Explicación del ID de usuario

### IDs de usuario comunes

- **0**: Usuario principal (usuario predeterminado)
- **10**: Primer usuario de perfil de trabajo
- **11**: Segundo usuario de perfil de trabajo
- Más IDs de usuario y así sucesivamente

### Cómo encontrar el ID de usuario

Si no estás seguro del ID de usuario en el dispositivo, puedes encontrarlo de las siguientes maneras:

```bash
adb shell pm list users
```

O ejecuta en la herramienta de depuración de TikMatrix:

```bash
pm list users
```

Ejemplo de salida:

```text
Users:
  UserInfo{0:Owner:c13} running
  UserInfo{10:Work profile:1030} running
```

## Almacenamiento de archivo de configuración

La configuración de Work Profile se guardará automáticamente en el archivo `data/work_profile_user.json`, con el siguiente formato:

```json
{
  "número_serie_dispositivo1": "10",
  "número_serie_dispositivo2": "0",
  "número_serie_dispositivo3": "11"
}
```

## Gestionar configuración de dispositivos

### Ver configuración actual

La configuración de Work Profile de cada dispositivo es independiente, puedes:

1. Establecer diferentes IDs de usuario para cada dispositivo
2. Modificar la configuración de usuario de dispositivos existentes en cualquier momento
3. Borrar configuración (ingresa valor vacío y guarda para eliminar la configuración)

### Gestión por lotes

Si necesitas gestionar un gran número de dispositivos, puedes editar directamente el archivo `data/work_profile_user.json`:

1. Cierra la aplicación TikMatrix
2. Abre el archivo de configuración
3. Agrega o modifica la configuración de dispositivos en formato JSON
4. Reinicia TikMatrix

## Solución de problemas

### Problemas comunes

#### P: Fallo en la ejecución de comandos después de configurar Work Profile

R: Por favor confirma:

- ¿Es correcto el ID de usuario?
- ¿Existe el usuario correspondiente en el dispositivo?
- ¿Hay suficientes permisos para acceder a ese usuario?

#### P: Cómo cancelar la configuración de Work Profile

R: En el cuadro de diálogo de configuración, borra el cuadro de entrada del ID de usuario, luego haz clic en guardar.

#### P: ¿Qué hacer si se pierde la configuración?

R: La configuración se almacena en un archivo JSON local, si se pierde puedes volver a configurarla, o restaurar el archivo `data/work_profile_user.json` desde una copia de seguridad.

#### P: Problemas relacionados con Shelter

R: Si encuentras problemas relacionados con Shelter:

- **Fallo en la clonación**: Asegúrate de tener permisos de administrador y suficiente espacio de almacenamiento
- **Aplicación clonada no visible**: Verifica que Work Profile en Shelter esté activado correctamente
- **Aplicación falla en Work Profile**: Intenta volver a clonar la aplicación o actualizar Shelter
- **No se encuentra la aplicación clonada**: Busca en el cajón de aplicaciones las aplicaciones con icono de maletín

## Mejores prácticas

### Uso en entorno empresarial

1. **Gestión unificada**: Establece el mismo ID de usuario para todos los dispositivos empresariales
2. **Separación de permisos**: Usa diferentes IDs de usuario para distinguir diferentes niveles de permisos
3. **Copia de seguridad de configuración**: Haz copias de seguridad regulares del archivo `work_profile_user.json`

### Uso personal

1. **Aislamiento de aplicaciones**: Establece diferentes entornos de usuario para aplicaciones con diferentes propósitos
2. **Entorno de prueba**: Usa un ID de usuario independiente para pruebas de aplicaciones
3. **Protección de privacidad**: Mejora la seguridad de la privacidad a través de la separación de usuarios

### Gestión de herramienta Shelter

1. **Actualizaciones regulares**: Mantén la aplicación Shelter actualizada para garantizar compatibilidad
2. **Sincronización de aplicaciones**: Asegúrate de haber clonado TikTok y TikMatrix antes de configurar Work Profile
3. **Copia de seguridad de configuración de Shelter**: Exporta y respalda la configuración de Shelter para una fácil recuperación
4. **Monitorear actualizaciones de aplicaciones**: Cuando TikTok o TikMatrix se actualicen, es posible que necesites actualizar las versiones clonadas

## Notas técnicas

La función de Work Profile se implementa agregando el parámetro `--user` en los comandos ADB:

```bash
# Sin usar Work Profile
adb shell input tap 100 200

# Usando Work Profile (ID de usuario: 10)
adb shell --user 10 input tap 100 200
```

Esto asegura que los comandos se ejecuten en el entorno de usuario correcto, evitando problemas de permisos y conflictos de entorno.

---

A través de una configuración razonable de Work Profile, puedes usar TikMatrix sin problemas en varios entornos de dispositivos complejos, mejorando la eficiencia del trabajo y la conveniencia de gestión.
