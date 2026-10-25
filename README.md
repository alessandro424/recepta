# Recepta

Web de **Recepta**, empresa ficticia de agentes de IA para la comunicación con huéspedes de
hoteles y alquiler vacacional. Los agentes se conectan al PMS para leer y actuar sobre las
reservas (llegadas, check-in, accesos, upselling, incidencias y reseñas) por WhatsApp, email y OTAs.

- **Fundadora y CEO (ficticia):** Martina Ferrer Olmos
- **Sede (ficticia):** Recepta Labs, S.L. · Barcelona

## Estructura

- `index.html` — landing (hero con demo animada, agentes, cómo funciona, precios, fundadora, FAQ, demo).
- `brand.html` — manual de marca (logo, colores, tipografía, voz).
- `styles.css`, `script.js` — estilos e interacciones, sin dependencias ni build.
- `assets/` — logotipo e isotipo en SVG.

## Local

Abrir `index.html` en el navegador, o servir la carpeta:

```bash
npx serve .
```

## Despliegue

Render lee `render.yaml` y lo publica como Static Site; cada push a `main` despliega solo.
