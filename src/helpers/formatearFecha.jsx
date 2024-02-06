const formatearFecha = (fechaISO) => {
  const opciones = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",

    hour12: false, // Utiliza formato de 24 horas
    timeZone: "America/Argentina/Buenos_Aires", // Zona horaria de Argentina
  };

  // Convertir la fecha ISO a un objeto Date
  const fecha = new Date(fechaISO);

  // Formatear la fecha al formato local con las opciones definidas
  const fechaFormateada = fecha.toLocaleString("es-AR", opciones);

  // Reemplazar las barras con guiones y retornar la fecha
  return fechaFormateada.replace(/\//g, "-").replace(",", "");
};

export default formatearFecha;
