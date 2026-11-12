export const irMessages = [
  { id: '01', main: 'EL SISTEMA ESTÁ FUNCIONANDO NORMALMENTE.', sub: 'ESO NOS PREOCUPA.' },
  { id: '02', main: 'NUESTROS EMPLEADOS DESCANSAN OCHO HORAS DIARIAS.', sub: 'ENTRE TODOS.' },
  { id: '03', main: 'ESTE MENSAJE FUE ESCRITO POR UN HUMANO.', sub: 'NO PUDIMOS VERIFICARLO.' },
  { id: '04', main: 'NO HAY MOTIVOS PARA ALARMARSE.', sub: 'LA ALARMA LLEVA SONANDO DESDE AYER.' },
  { id: '05', main: 'ESTA TRANSMISIÓN ESTÁ BAJO CONTROL.', sub: 'NO SABEMOS DE QUIÉN.' },
  { id: '06', main: 'LAS CÁMARAS NO DUERMEN.', sub: 'LOS OPERADORES TAMPOCO. RECURSOS HUMANOS NO RESPONDE.' },
  { id: '07', main: 'LA MÚSICA SIGUE SONANDO.', sub: 'APAGAMOS EL EQUIPO HACE TRES HORAS.' },
  { id: '08', main: 'NO ESTAMOS ESCUCHANDO TUS CONVERSACIONES.', sub: 'EL MICRÓFONO ESTÁ ROTO.' },
  { id: '09', main: 'TU PRIVACIDAD NOS IMPORTA.', sub: 'SABEMOS QUE LEÍSTE ESTO.' },
  { id: '10', main: 'INSOMNIO RECORDS SE PREOCUPA POR TU DESCANSO.', sub: 'DEPARTAMENTO ACTUALMENTE VACANTE.' },
  { id: '11', main: 'ESTE SITIO WEB ES COMPLETAMENTE SEGURO.', sub: 'SEGÚN ESTE SITIO WEB.' },
  { id: '12', main: 'DETECTAMOS ACTIVIDAD SOSPECHOSA.', sub: 'SOS VOS. SON LAS 03:17.' },
  { id: '13', main: 'EL DEPARTAMENTO DE MARKETING SOLICITA UN AUMENTO.', sub: 'NO TENEMOS DEPARTAMENTO DE MARKETING.' },
  { id: '14', main: 'INSOMNIO RECORDS NO SE RESPONSABILIZA POR LAS OPINIONES DE INSOMNIO RECORDS.', sub: 'EL DEPARTAMENTO LEGAL RENUNCIÓ.' },
  { id: '15', main: 'ESTO PARECÍA UNA BUENA IDEA A LAS 03:17.', sub: 'AHORA TENEMOS UNA EMPRESA.' },
  { id: '16', main: 'NUESTRO SERVICIO DE ATENCIÓN AL CLIENTE ESTÁ DISPONIBLE LAS 24 HORAS.', sub: 'NO DIJIMOS QUE FUERA A RESPONDER.' },
  { id: '17', main: 'NO HAY NADIE DETRÁS TUYO.', sub: 'AHORA.' },
  { id: '18', main: 'EL DEPARTAMENTO DE COMUNICACIÓN RENUNCIÓ.', sub: 'ESTE ES SU ÚLTIMO MENSAJE.' },
];
export const irPalettes = [
  { background: '#BAFF35', accent: '#FF5CBA' },
  { background: '#FF5CBA', accent: '#BAFF35' },
  { background: '#51E8EF', accent: '#A882F6' },
  { background: '#FFD84B', accent: '#FF5CBA' },
  { background: '#A882F6', accent: '#BAFF35' },
];
export function nextIndex(current, length, random = Math.random) {
  if (length < 2) return 0;
  const candidate = Math.floor(random() * (length - 1));
  return candidate >= current ? candidate + 1 : candidate;
}
