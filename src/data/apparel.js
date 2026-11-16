/**
 * CONTEXTO: Fuente de datos de las remeras: códigos, slugs, imágenes y encuadres SVG.
 * closing conecta cada diseño con su frase editorial. La colección aún no habilita compras.
 */
const collectionImage = "/img/apparel-ir-06-ir-07.png";
const surveillanceImage = "/img/apparel-vigilancia-total.png";
const midnightDesignsImage = "/img/apparel-ir-06-ir-07.png";

/** Las coordenadas encuadran cada diseño del arte original sin modificar el archivo. */
export const apparelDesigns = [
  { code: "IR-01", slug: "el-ojo", name: "El Ojo", description: "La observación constante.", image: collectionImage, frame: "33 150 728 410", closing: "surveillance" },
  { code: "IR-02", slug: "senal-nocturna", name: "Señal Nocturna", description: "Los clásicos no se olvidan. Lo nuevo no se pierde.", image: collectionImage, frame: "774 150 728 410", closing: "classics" },
  { code: "IR-03", slug: "fuera-de-frecuencia", name: "Fuera de Frecuencia", description: "Lo que no suena en todas partes.", image: collectionImage, frame: "33 571 728 415", closing: "frequency" },
  { code: "IR-04", slug: "despues-de-medianoche", name: "Después de Medianoche", description: "La música sigue despierta.", image: collectionImage, frame: "774 571 728 415", closing: "midnight" },
  { code: "IR-05", slug: "vigilancia-total", name: "Vigilancia Total", description: "Siempre hay alguien mirando.", image: surveillanceImage, frame: "22 132 1492 870", closing: "surveillance" },
  { code: "IR-06", slug: "transmision-de-largo-alcance", name: "Transmisión de Largo Alcance", description: "Música para un mundo que ya no escucha.", image: midnightDesignsImage, frame: "18 101 890 425", closing: "longRange", note: "El diseño contempla personalizar el código con la canción que elijas. Las opciones se informarán con el lanzamiento." },
  { code: "IR-07", slug: "03-17", name: "03:17", description: "A las 3:17 surgen las mejores ideas.", image: midnightDesignsImage, frame: "18 536 890 450", closing: "lateIdeas" },
];

export const apparelClosings = {
  surveillance: { code: "departamento de observación", lines: ["El gran hermano no vigila."], punchline: "Nosotros no dormimos." },
  classics: { code: "señal nocturna", lines: ["Los clásicos no se olvidan."], punchline: "Lo nuevo no se pierde." },
  frequency: { code: "fuera de frecuencia", lines: ["Broadcasting from nowhere.", "Received everywhere."], punchline: "If you can hear this, you're already lost." },
  midnight: { code: "después de medianoche", lines: ["Insomnio Records", "Apparel Division // VOL. 001"], punchline: "La música sigue despierta." },
  music: { code: "publicidad no solicitada / 002", lines: ["Comprá un disco.", "No te va a arreglar la vida."], punchline: "Pero por lo menos vas a tener un disco." },
  longRange: { code: "transmisión de largo alcance", lines: ["Música para un mundo", "que ya no escucha."], punchline: "Igual seguimos transmitiendo." },
  lateIdeas: { code: "departamento de malas decisiones", lines: ["A las 3:17 surgen las mejores ideas."], punchline: "Este sitio web es prueba de ello." },
};
