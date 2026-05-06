const formulario = document.getElementById('form-contacto');
const erroresDiv = document.getElementById('errores');
const telefono = document.getElementById('telefono');

// Evitar escribir letras en teléfono
telefono.addEventListener('input', function() {
  this.value = this.value.replace(/[^0-9+]/g, '');
});

// Función para validar un campo
function validarCampo(input) {
  const valor = input.value.trim();
  let valido = true;

  if(input.id === 'nombre' || input.id === 'asunto' || input.id === 'mensaje') {
    if(valor === '') valido = false;
  }

  if(input.id === 'email') {
    if(valor === '' || !valor.includes('@')) valido = false;
  }

  if(input.id === 'telefono') {
    if(valor !== '' && !/^\+?\d{8,15}$/.test(valor)) valido = false;
  }

  // Aplicar clases
  input.classList.remove('error', 'correcto');
  if(valido && valor !== '') {
    input.classList.add('correcto');
  } else if(!valido) {
    input.classList.add('error');
  }

  return valido;
}

// Validación del formulario
Object.values(formulario.elements).forEach(input => {
  if(input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
    input.addEventListener('input', () => {
      validarCampo(input);
    });
  }
});

// Al enviar
formulario.addEventListener('submit', function(e) {
  e.preventDefault();
  erroresDiv.innerHTML = '';

  let errores = [];
  Object.values(formulario.elements).forEach(input => {
    if(input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
      if(!validarCampo(input)) {
        errores.push(`Campo "${input.previousElementSibling.innerText}" inválido.`);
      }
    }
  });

  if(errores.length > 0) {
    erroresDiv.innerHTML = errores.join('<br>');
    erroresDiv.style.color = 'red';
  } else {
    erroresDiv.innerHTML = '✅ Mensaje enviado con éxito';
    erroresDiv.style.color = 'green';

    // Esperar un momento y enviar
    setTimeout(() => {
      formulario.submit();
    }, 1200);
  }
});
