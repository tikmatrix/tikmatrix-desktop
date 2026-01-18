---
sidebar_position: 9
---

# Migración de licencia

Transfiere tu licencia de TikMatrix de un ordenador a otro. Esto es útil al actualizar hardware o cambiar de ordenador.

## Requisitos

- Tener una licencia válida en el ordenador actual (código de activación o suscripción Stripe)
- El ordenador de destino no debe tener una licencia TikMatrix existente
- Se permiten un máximo de 5 migraciones por mes

## Pasos de migración

### Paso 1: Abrir diálogo de migración

1. Inicia TikMatrix en el ordenador actual
2. Haz clic en el **icono de licencia** en la barra de título
3. Haz clic en el botón **"Migrar licencia"**

![Botón de migración de licencia](../img/migrate-button.webp)

### Paso 2: Obtener ID de máquina de destino

En el ordenador de destino:

1. Instala e inicia TikMatrix
2. Haz clic en el **icono de licencia** en la barra de título
3. Copia el **ID de máquina**
4. Envía este ID al ordenador actual

![ID de máquina de destino](../img/target-machine-id.webp)

### Paso 3: Verificar y migrar

Vuelve al ordenador actual:

1. Pega el **ID de máquina de destino** en el diálogo de migración
2. Haz clic en **"Verificar"** para comprobar compatibilidad
3. Revisa los detalles de licencia mostrados

![Verificación exitosa](../img/validation-success.webp)

1. Marca la casilla de confirmación
2. Haz clic en **"Migrar licencia"** y confirma

![Confirmación de migración](../img/migration-confirm.webp)

### Paso 4: Completar configuración

1. Espera a que se complete la migración
2. Reinicia TikMatrix en el ordenador de destino
3. Tu licencia ahora está activa en el nuevo ordenador

![Migración exitosa](../img/migration-success.webp)

## Advertencias importantes

⚠️ **La migración de licencia es irreversible**

- La licencia se transfiere completamente del ordenador de origen al ordenador de destino
- Tu ordenador antiguo pierde acceso inmediatamente
- Máximo 5 migraciones por mes
- Ambos ordenadores necesitan conexión de red estable

## Contenido de migración

### Usuarios de código de activación

- Estado de licencia y días restantes
- Información del código de licencia

### Usuarios de suscripción Stripe

- Estado de suscripción e información de facturación
- Fecha de renovación y detalles del plan

## Solución de problemas

### Mensajes de error comunes

#### "La máquina de destino ya tiene licencia"

El ordenador de destino ya tiene una licencia activa. La migración solo puede realizarse a ordenadores sin licencia existente.

#### "Límite de migración mensual excedido"

Solo puedes migrar 5 veces por mes. Espera hasta el próximo mes o contacta con atención al cliente.

#### "Formato de ID de máquina inválido"

Asegúrate de haber copiado correctamente el ID de máquina completo. Debe tener al menos 10 caracteres de longitud.

#### "Validación de migración falló"

Verifica lo siguiente:

- Tu licencia actual está activa y no ha expirado
- El ID de máquina de destino es correcto
- Ambos ordenadores tienen conexión de red

### Obtener soporte

Contacta con [Servicio al cliente de Telegram](https://t.me/tikmatrix_agent_bot) y proporciona:

- Captura de pantalla del mensaje de error
- Tu ID de máquina actual y de destino
- Descripción del problema

## Preguntas frecuentes

**¿Puedo migrar de vuelta al ordenador original?**

Sí, pero contará para tu límite de migración mensual.

**¿Qué sucede con mis conexiones de dispositivos después de la migración?**

Las conexiones de dispositivos están vinculadas al ordenador. Necesitarás reconectar los dispositivos en el nuevo ordenador.

**¿Puedo migrar una licencia de prueba?**

No, solo las licencias de pago pueden migrarse.

**¿La migración afecta mis días de licencia restantes?**

No, tus días restantes permanecen sin cambios después de la migración.
