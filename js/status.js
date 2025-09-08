const API_URL = "https://68bb0de584055bce63f104e1.mockapi.io/api/v1/dispositivos_IoT";

document.addEventListener("DOMContentLoaded", () => {
  refresh(); // primera carga
  setInterval(refresh, 2000); // actualizar cada 2s
});

async function refresh() {
  try {
    const response = await fetch(API_URL);
    let data = await response.json();

    // Ordenar por ID descendente (últimos registros primero)
    data.sort((a, b) => Number(b.id) - Number(a.id));

    // Mostrar último status
    if (data.length > 0) {
      document.getElementById("ultimo-status").textContent = data[0].status;
    } else {
      document.getElementById("ultimo-status").textContent = "No hay registros";
    }

    // Mostrar los últimos 10
    const ultimos = data.slice(0, 10);

    const tabla = document.getElementById("tabla-registros");
    tabla.innerHTML = "";

    ultimos.forEach(registro => {
      const row = `
        <tr>
          <td>${registro.id}</td>
          <td>${registro.name}</td>
          <td>${registro.status}</td>
          <td>${registro.ip}</td>
          <td>${registro.date}</td>
        </tr>
      `;
      tabla.innerHTML += row;
    });

  } catch (error) {
    console.error("Error al cargar registros:", error);
  }
}
