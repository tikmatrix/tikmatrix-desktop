---
sidebar_position: 2
---

# Problemas conocidos

## Error de conflicto de puertos

Si aparece el siguiente mensaje de error en los registros:

```text
tcp connect error: The connection could not be established because the target computer refused the connection request. (os error 10061)"
```

Esto indica un problema de conflicto de puertos. Para resolver este problema:

1. **Reinicie completamente el software TikMatrix/IgMatrix** y vuelva a intentarlo
2. **Evite usar otro software de control simultáneamente con TikMatrix/IgMatrix**, ya que pueden causar conflictos de puertos
3. Asegúrese de que ninguna otra aplicación esté usando el mismo puerto de comunicación

Este error generalmente ocurre cuando se ejecutan múltiples aplicaciones de control de dispositivos simultáneamente, causando conflictos en el puerto de comunicación.

## Fallo de scripts en teléfonos en la nube

Intente asegurarse de que el ancho de banda de red entre su computadora y el centro de datos del teléfono en la nube sea suficiente y estable. Para obtener mejores resultados, se recomienda colocar la computadora y el centro de datos del teléfono en la nube en el mismo país o región para reducir la latencia y la pérdida de paquetes, garantizando así que las tareas de automatización se ejecuten de manera estable y confiable.

## Scripts inestables, errores aleatorios, resultados inconsistentes en cada ejecución

Generalmente está relacionado con la calidad de la conexión ADB. Si usa conexión USB, intente cambiar el cable de datos o el puerto USB; si usa conexión ADB inalámbrica, asegúrese de que la conexión de red entre la computadora y el dispositivo sea estable y que la intensidad de la señal sea buena.

## Fallo de scripts debido a actualizaciones de aplicaciones TikTok/Instagram

Las aplicaciones TikTok e Instagram se actualizan periódicamente, lo que a veces puede causar que los scripts de automatización no funcionen correctamente. Envíe un ticket de soporte y actualizaremos los scripts lo antes posible para adaptarse a la última versión de las aplicaciones.
