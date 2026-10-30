# Receta: extender Nice Avatar sin perder su estilo

> Catálogo actualizado: `curly`, `bob`, `pixie`, `bun`, `buzz` y `goatee` usan exclusivamente los diseños aprobados (antes v2). Los dibujos v1 fueron eliminados. `fullBeard` es la barba completa aprobada. Los nombres con sufijo `V2` y `beard` solo se aceptan como alias de migración de configuraciones guardadas, nunca como opciones adicionales del editor o del catálogo aleatorio. Las referencias a versiones en el historial de esta receta son históricas.


## Uso

```tsx
import NiceAvatar, { avatarPresets, genConfig } from 'react-nice-avatar';

const mexicano = avatarPresets.find(p => p.id === 'mexicano')!;
const config = genConfig({ ...mexicano.config, shirtColor: '#6BD9E9' });
<NiceAvatar style={{ width: 160, height: 160 }} {...config} />;
```

Las 16 recetas completas están en `src/presets.ts`; no dependen de elecciones aleatorias. La galería del demo permite seleccionarlas, editar sus piezas y descargar el avatar con el flujo existente.

## Inventario nuevo

| Familia | Opciones |
| --- | --- |
| Pelo (5) | `curly`, `bob`, `pixie`, `bun`, `buzz` |
| Sombreros (1) | `bucket` (pescador) |
| Ojos (4) | `wink`, `sleepy`, `sparkle`, `focused` |
| Vello facial (3) | `mustache`, `handlebar`, `beard`; desactivar con `none` |
| Personaje | `avatarStyle: 'robot'`; humano por defecto |


## Reglas visuales

1. Dibujar SVG vectorial con rellenos planos, contorno `#171921` de aproximadamente 4 unidades y uniones redondeadas. Evitar texturas, sombras realistas y degradados en las piezas.
2. Reutilizar los anclajes: pelo `viewBox="0 0 240 270"`, ojos `0 0 96 48`, ropa `0 0 281 93`. Los sombreros usan `0 0 240 150` y el vello facial `0 0 64 64`.
3. Mantener la cabeza inclinada y la asimetría de los rasgos originales. No centrar ambos ojos artificialmente: el ojo derecho está más alto.
4. Conservar la paleta lila, aqua, rosa, amarillo y azul original. Separar pelo, ropa y fondo mediante contraste; probar también piel clara y oscura.
5. Ordenar capas: cara o robot, sombrero o pelo, detalles humanos, vello facial y ropa. El robot tiene cara y rasgos propios; conserva sombreros y ropa combinables. Los sombreros ocultan el pelo, como en la API original.
6. Fijar `left` en las capas absolutas de pelo y ropa: su posición no debe depender de la posición estática de elementos anteriores.
7. Para cada nueva pieza: ampliar el tipo en `src/types.ts`, registrar opciones en `src/utils.ts`, enlazar el renderer de su familia y crear una receta completa.
8. Revisar el conjunto a 32, 64 y 160 px, con las tres formas de fondo. Confirmar que no se corten rasgos, no se tapen los ojos y los accesorios sigan el mismo grosor de contorno.

## Combinaciones especiales

El mexicano combina bigote y ropa original, con cualquier tono de piel. Se retiraron sombrero de charro, gorra y boina del catálogo y de las recetas por su calidad visual. De los sombreros nuevos se conserva únicamente el de pescador.

El robot usa carcasa marfil, visor azul oscuro, ojos, cejas y sonrisa del mismo color que los detalles, antena, orejeras y torso con emblema circular. `faceColor` controla la carcasa y `shirtColor` controla conjuntamente ojos, boca, cejas, antena, orejeras, hombros y círculo del pecho. El editor ofrece un control «Color del robot» para cambiarlos todos juntos. El torso mecánico tiene hombros de color, emblema circular y cuello corto oscuro. La antena se une directamente al contorno de la cabeza, sin base negra. No usa pelo, nariz ni vello facial humanos; se dibuja en `src/robot.tsx`.

## Compatibilidad y comprobación

Las configuraciones explícitas anteriores siguen siendo válidas. Las listas ampliadas cambian la selección aleatoria y el resultado de las semillas de texto: guardar la configuración completa para conservar una identidad exacta entre versiones.

```sh
npm install --ignore-scripts --legacy-peer-deps
npx jest --runInBand
npx webpack --config webpack/production.js
NODE_ENV=production npx webpack --config webpack/demo.js
```

`preview/index.html` contiene la galería estática renderizada desde los componentes reales. `preview/gallery.png` es la hoja de contacto revisada visualmente. No se añadieron dependencias de ejecución.


Se retiraron las seis prendas nuevas (suéter, chaqueta, overol, marinero, poncho y chaleco). Solo se conservan las prendas originales: `short`, `polo` y `hoody`. Hay 16 recetas, 5 peinados nuevos, 4 ojos nuevos, sombrero de pescador, 3 estilos de vello facial y robot.


Nuevas piezas para el estilo Tony: `facialHairStyle: "goatee"` (barba de candado) y `glassesStyle: "aviator"` (marco metálico fino con tinte azul). Ambas se pueden elegir en el editor y combinar con cualquier avatar humano.

## Variantes v2 sin reemplazar las actuales

Se conservan las cinco piezas anteriores y `goatee`. Las nuevas opciones son `curlyV2`, `bobV2`, `pixieV2`, `bunV2`, `buzzV2` y `goateeV2`. Están disponibles en el editor. Los peinados v2 usan curvas largas, mechones asimétricos y contornos adaptados a cada silueta; bob mantiene una capa posterior detrás de la cara. Comparación visual: `preview/hair-v2.html`. El candado v2 se puede revisar en `preview/tony-v2.html` sin alterar el ejemplo anterior.

Rizos v2 ahora reutiliza la posición, proporciones laterales y patilla del peinado original `thick`, con una copa rizada propia. Se dibuja en `src/hair/curlyV2.tsx`; no comparte el encuadre genérico de las demás variantes. La patilla forma parte del lateral continuo y termina junto a la oreja; el flequillo no tiene la punta recta de la primera versión.

Bob v2 separa el volumen posterior completo (nuca y ambos laterales) del flequillo. El pelo queda detrás de la cara y la oreja; el frente cubre la sien sin una patilla suelta. Su silueta se define en `src/hair/bobV2.tsx`, conservando `bob` como variante anterior.

Pixie y moño v2 usan el encuadre del peinado `thick` y una transición continua hasta la oreja. Rapado v2 usa el gris `#717376` al 35% del mohicano original, ajustado al contorno real de la cabeza. Bob v2 retrae el extremo oculto del flequillo dentro de la zona cubierta por la oreja para que su borde no aparezca como una mancha.



Trenzas v1 y v2 retiradas del catálogo, tipos, generador y recetas por decisión de diseño. Los demás peinados v2 están aprobados. Pendiente de revisión visual: candado, lentes aviator, ojos nuevos y el resto del vello facial.

### Afinado de detalles faciales

Los ojos nuevos conservan los centros y la inclinación de los originales. Las pupilas rellenas no llevan contorno adicional; los párpados usan trazos de 4 unidades y extremos redondos. Los bigotes y la barba usan siluetas continuas del color del cabello, sin un segundo borde oscuro. Candado v2 conserva espacio para leer la sonrisa; la versión anterior sigue disponible. Los lentes metálicos usan un solo puente, patillas integradas y tinte plano. Vista de revisión: `preview/refined-details.html`.

Candado v2: silueta cerrada que une bigote y laterales, abertura inclinada con la boca y masa amplia en el mentón. Pequeño mechón central integrado bajo el labio; sin contorno extra. Se conserva candado v1.

### Barba completa

`facialHairStyle: "fullBeard"` agrega una variante independiente del candado. Usa `hairColor`, sigue el contorno de la mandíbula original y conecta los laterales desde debajo de la oreja. Conserva una abertura alrededor de la boca y el pequeño mechón bajo el labio. Disponible en el selector de vello facial; vista en `preview/full-beard.html`.

La barba completa integra la patilla en una silueta continua desde la sien hasta la mandíbula, sin punta aislada. Se dibuja detrás de la oreja y comparte `hairColor`.

### Barba sin bigote

`facialHairStyle: "chinBeard"` conserva las mejillas y la boca despejadas. Una sola silueta conecta las patillas con la mandíbula y forma un pequeño mechón redondeado en el mentón. Comparte `hairColor` y se dibuja detrás de la oreja. Candado v2 y barba completa se conservan como variantes aprobadas independientes. Vista: `preview/chin-beard.html`.

### Bigotes refinados

`mustache` usa dos lóbulos suaves y puntas cortas; `handlebar` añade extremos curvos abiertos. Ambos siguen la inclinación del rostro, comparten `hairColor` y conservan espacio sobre la sonrisa. Vista comparativa: `preview/mustaches.html`. Las tres barbas aprobadas no cambian.

### Revisión de ojos y lentes

Los párpados de `focused` usan curvas suaves. `wink`, `sleepy` y `sparkle` mantienen los anclajes del ojo original. `aviator` usa el mismo perfil redondeado en ambas lentes, desplazado según la inclinación facial, con tinte plano al 24% y trazo de 3 unidades. Comparación visual con `oval`: `preview/eyes-glasses.html`.

Encuadre de `aviator`: centros separados 54 unidades y desnivel de 8.4 en su viewBox, ajustados a la capa original de ojos. Cristales más altos para dejar margen bajo las pupilas. Vista: `preview/glasses-fit.html`. Las cuatro variantes de ojos están aprobadas.

Forma final en revisión de `aviator`: trapecios redondeados con base más estrecha, montura de 3.5 unidades, doble puente de 2 unidades y tinte azul lavanda `#ADBFFF` al 32%, siguiendo la referencia aportada. Mantiene los centros ajustados a los ojos.

Los cristales de `aviator` se reflejan horizontalmente y luego se inclina el conjunto −8.85°, de modo que los lados interiores estrechan hacia el puente. Incluye ambas patillas laterales.

Lentes `aviator`: se elimina el puente superior; queda un solo puente sobre la nariz.

### Integración de lentes con el original

La revisión vigente de `aviator` usa la capa, el puente y el anclaje lateral de `square`: viewBox 160×74, altura 22%, top 0.5%, left −3%. Trazo negro uniforme de 4 unidades y cristales sin relleno. La forma trapezoidal conserva la alineación y separación de los originales, sin recentrarla en las pupilas. Sustituye los ajustes anteriores de tinte y centrado.

### Lentes lavanda con doble puente

`glassesStyle: "aviatorTinted"` reutiliza la montura aprobada `aviator`, añade un puente superior conectado a los dos aros y relleno plano `#ADBFFF` al 32%. La variante transparente permanece intacta. Ambas están disponibles en el selector de lentes. Vista: `preview/glasses-tinted.html`.

### Color configurable de los cristales

Usar `glassesStyle: "aviatorTinted", glassesColor: "#ADBFFF"`. `glassesColor` acepta un color CSS y aplica `fillOpacity={0.32}` a ambos cristales, sin reducir la opacidad de la montura. Lavanda es el valor por defecto. El editor muestra un selector de color para esta variante. Se eliminó el puente superior.

Las variantes `roundDark`, `squareDark` y `aviatorDark` conservan sus monturas y usan cristales opacos `#292B35`. Vista: `preview/glasses-dark.html`.

Reflejo en revisión: las variantes oscuras incorporan un trazo blanco al 88% de opacidad, de 4 unidades, que sigue el borde inferior y lateral del cristal. `aviator` es la versión sin tinte de `aviatorTinted`; comparten exactamente los contornos. Vista: `preview/glasses-reflection.html`.

El reflejo curvo queda guardado como candidato final en `preview/candidates/reflection-curved/` (componentes y preview). Prueba actual: diagonal central de 10 unidades, blanca al 55%, recortada al cristal y debajo del contorno negro. Vista: `preview/glasses-diagonal.html`. Aviator transparente aprobado.

### Reflejo oscuro seleccionado

Versión vigente: base `#292B35`, diagonal ancha de 10 unidades y área inferior lateral en `#515664`, separadas por una franja oscura. Sin brillo curvo ni azul; contorno negro intacto. Se aplica a las tres formas oscuras. Los candidatos previos permanecen guardados en `preview/candidates/`. Vista: `preview/glasses-final.html`.

### API unificada de lentes (vigente)

- Forma: `glassesStyle: "round" | "square" | "aviator" | "none"`.
- Acabado: `glassesMode: "transparent" | "tinted" | "dark"`.
- Tinte: `glassesColor`, lavanda `#ADBFFF` por defecto, con alfa 0.32 sobre ambos cristales.
- Los nombres anteriores con `Dark` y `aviatorTinted` siguen funcionando. El modo explícito tiene prioridad. No se cambian los pools aleatorios existentes en esta estandarización.
- Uniceja: `eyeBrowStyle: "unibrow"`, silueta negra continua y poblada, adaptada al marco e inclinación originales. Referencia solicitada: Negas, aclarada por el usuario como uniceja.
- Vista de todas las combinaciones y cejas: `preview/standardized-glasses.html`.

Validación: 23 pruebas y render real de las nueve combinaciones, equivalencia de alias, alfa de los cristales y uniceja. Compilación de biblioteca y demo correcta.

## Importación de los 14 originales de Figma

Fuente: [Avatar Illustration System — Library](https://www.figma.com/design/HjwULEwq8hpWuMEAe6kLcV/Avatar-Illustration-System--Community-?node-id=0-1).

| Pieza | Variante API | Nodo |
| --- | --- | --- |
| Aro / punto | `earringStyle: hoop / stud` | 58:931 / 58:1044 |
| Sorpresa | `mouthStyle: surprised` | 48:80 |
| Triste / ceño / beso / nervios | `sad / frown / pucker / nervous` | 58:235 / 58:240 / 58:245 / 58:656 |
| Cejas hacia abajo / con pestañas | `eyeBrowStyle: down / eyelashesDown` | 58:776 / 66:271 |
| Sombra de ojos | `eyeStyle: eyeshadow` | 58:2137 |
| Doug Funny / Mr Clean | `hairStyle: dougFunny / bald` | 48:105 / 48:112 |
| Barba original / incipiente | `facialHairStyle: originalBeard / scruff` | 65:231 / 65:381 |

1. Exportar SVG completos de cada componente, conservar los archivos y sus límites en `assets/figma-originals/manifest.json`.
2. Ejecutar `python3 scripts/import-figma-originals.py`. Convierte atributos SVG a JSX, mantiene curvas originales y recupera el desplazamiento entre los límites del componente y el área exportada. Es importante para no recentrar las bocas anchas ni las pestañas.
3. Usar los mismos marcos que las piezas originales: boca 64×64, cejas 149×48, ojos 96×48 y pelo 240×200. Los adaptadores están en `src/originals/index.tsx`.
4. Colocar barbas en el marco del rostro 200×320, con origen (35,106), debajo de la oreja, nariz y boca. No reemplazar las tres barbas previamente aprobadas.
5. Anclar los aretes al lóbulo usando el marco de cada tamaño de oreja. El aro conserva su escala original (48×48): su extremo superior se ancla al lóbulo en (25,34) para oreja pequeña y (25,42) para oreja grande. El punto conserva su radio original de 4 unidades; su centro queda en (22,34) para oreja pequeña y (20,40) para oreja grande, dentro del lóbulo y separado del contorno. Ambos permiten cambiar `earringColor`; la sombra usa `eyeshadowColor` y las barbas/pelo `hairColor`.
6. Conservar opciones aleatorias y semillas existentes. Ofrecer las nuevas opciones explícitamente mediante props y editor. `genConfig` conserva las props opcionales cuando se proporcionan.
7. Revisar `preview/figma-additions.html`: los 14 componentes y dos combinaciones con colores y oreja grande. Ejecutar Jest y compilar biblioteca y demo.

Las máscaras de las nuevas bocas tienen IDs por instancia para que varios avatares puedan compartir una página. No se cargan recursos remotos en el componente.
