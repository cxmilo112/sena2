const URL = 'SENACTPI.matriculados.json';

function validarLogin() {
  const user = document.getElementById('usuario').value.trim();
  const pass = document.getElementById('contrasena').value.trim();
  if (pass === 'adso2993013' && user) {
    localStorage.setItem('usuario', user);
    mostrarApp(user);
  } else alert('Usuario o contraseña incorrectos');
}

function mostrarApp(user) {
  document.getElementById('login').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('nombreUsuario').textContent = user;
  cargarDatos();
}

function cargarDatos() {
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#tablaAprendices tbody');
      tbody.innerHTML = '';
      data.forEach(item => {
        const tr = document.createElement('tr');
        if (item.estadoAprendiz === 'Retiro Voluntario') {
          tr.classList.add('resaltado');
        }
        tr.innerHTML = `
          <td>${item.nombreAprendiz}</td>
          <td><a href="#" onclick='guardarFicha(${JSON.stringify(item)})'>${item.codigoFicha}</a></td>
          <td>${item.nombrePrograma}</td>
          <td>${item.nivelFormacion}</td>
          <td>${item.estadoAprendiz}</td>
          <td>${item.estadoFicha}</td>
        `;
        tbody.appendChild(tr);
      });
    });
}

function guardarFicha(item) {
  localStorage.setItem('codigoFicha', item.codigoFicha);
  localStorage.setItem('nombrePrograma', item.nombrePrograma);
  localStorage.setItem('nivelFormacion', item.nivelFormacion);
  localStorage.setItem('estadoFicha', item.estadoFicha);
  alert('Ficha guardada correctamente');
}

function cerrarSesion() {
  localStorage.clear();
  document.getElementById('app').classList.add('hidden');
  document.getElementById('login').classList.remove('hidden');
}

window.onload = () => {
  const user = localStorage.getItem('usuario');
  if (user) mostrarApp(user);
};
