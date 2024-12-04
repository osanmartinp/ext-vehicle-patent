document.getElementById('searchBtn').addEventListener('click', function() {
    const patente = document.getElementById('patente').value;
    if (!patente) {
      alert('Por favor, ingrese una patente válida.');
      return;
    }
  
    // Mostrar un mensaje de carga
    document.getElementById('result').innerHTML = 'Cargando...';
  
    // Llamada a la API
    fetch(`https://chile.getapi.cl/v1/vehicles/appraisal/${patente}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-api-key': 'GvsxZQ3eTovJJ0WTJxhxaAtLZ0hAwwHVt8pMvn4tIwMoXHrqKMXfRouN9ZW7CfgddkLTq5yDbdZARPy55gQsWokqiKtmOPoE8dp1IfvjkQ7ttBjjoYR0bq83GAdVc8vU'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const vehicle = data.data.vehicle;
        const resultHTML = `
          <h3>Información del Vehículo</h3>
          <p><strong>Marca:</strong> ${vehicle.model.brand.name}</p>
          <p><strong>Modelo:</strong> ${vehicle.model.name}</p>
          <p><strong>Año:</strong> ${vehicle.year}</p>
          <hr>
          <p><strong>Precio Usado:</strong> $${data.data.precioUsado.precio.toLocaleString()}</p>
          <p><strong>Precio Usado Max:</strong> $${data.data.precioUsado.banda_max.toLocaleString()}</p>
          <p><strong>Precio Usado Min:</strong> $${data.data.precioUsado.banda_min.toLocaleString()}</p>
          <p><strong>Precio de Retoma:</strong> $${data.data.precioRetoma.toLocaleString()}</p>
          <p><strong>Precio de Tasación:</strong> $${data.data.informacionFiscal.tasacion}</p>
          <hr>
        `;
        document.getElementById('result').innerHTML = resultHTML;
      } else {
        document.getElementById('result').innerHTML = 'No se pudo obtener la información. Intenta nuevamente.';
      }
    })
    .catch(error => {
      document.getElementById('result').innerHTML = 'Error en la solicitud. Por favor, intenta más tarde.';
    });
  });
  