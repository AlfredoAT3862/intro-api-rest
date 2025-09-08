const API_URL = "https://68bb0de584055bce63f104e1.mockapi.io/api/v1/dispositivos_IoT";

document.addEventListener("DOMContentLoaded", () => {
  cargarRegistros();

  const form = document.getElementById("form-dispositivo");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const status = document.getElementById("status").value;
    const ip = document.getElementById("ip").value;

    const date = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });

    // POST - Agregar nuevo registro
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, status, ip, date })
    });

    form.reset();
    cargarRegistros(); // refrescar tabla automáticamente
  });
});

async function cargarRegistros() {
  const response = await fetch(API_URL);
  let data = await response.json();

  // Ordenar por ID descendente (últimos registros primero)
  data.sort((a, b) => b.id - a.id);

  // Mostrar último status
  if (data.length > 0) {
    document.getElementById("ultimo-status").innerHTML = 
      `Último status: <strong>${data[0].status}</strong>`;
  }

  // Tomar solo los últimos 5 registros
  const ultimos = data.slice(0, 5);

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
}

