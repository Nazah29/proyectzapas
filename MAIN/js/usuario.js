document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // LOGIN CONTROL
  // ==========================
  async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const mensaje = document.getElementById("mensaje");
    const btn = document.getElementById("btn-login");

    if (!email || !password) {
      mensaje.textContent = "Completa correo y contraseña ❌";
      mensaje.style.color = "red";
      return;
    }

    btn.disabled = true;
    btn.textContent = "Cargando...";

    try {
      // Consulta directa a la tabla usuarios
      const { data, error } = await supabaseClient
        .from("usuarios")
        .select("*")
        .eq("email", email)
        .eq("password", password);

      if (error) {
        mensaje.textContent = "Error al conectar con la base de datos ❌";
        mensaje.style.color = "red";
        console.error(error);
      } else if (!data || data.length === 0) {
        mensaje.textContent = "Correo o contraseña incorrectos ❌";
        mensaje.style.color = "red";
      } else {
        mensaje.textContent = "Login exitoso ✅";
        mensaje.style.color = "green";
        
        // Guardar la sesión localmente si se desea
        localStorage.setItem("usuarioLogueado", JSON.stringify(data[0]));

        setTimeout(() => {
          window.location.href = "MAIN/index.html";
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      mensaje.textContent = "Error de red ❌";
      mensaje.style.color = "red";
    }

    btn.disabled = false;
    btn.textContent = "Ingresar";
  }

  // ==========================
  // REGISTER CONTROL
  // ==========================
  let bloqueado = false;

  async function registerModal() {
    if (bloqueado) return;

    const nombre = document.getElementById("reg-nombre").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const telefono = document.getElementById("reg-telefono").value.trim();
    const direccion = document.getElementById("reg-direccion").value.trim();
    const ciudad = document.getElementById("reg-ciudad").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    
    const mensaje = document.getElementById("mensaje-register");
    const btn = document.getElementById("btn-registrar-modal");

    if (!nombre || !email || !password) {
      mensaje.textContent = "Nombre, correo y contraseña son obligatorios ❌";
      mensaje.style.color = "red";
      return;
    }

    bloqueado = true;
    btn.disabled = true;
    btn.textContent = "Registrando...";

    try {
      // Generar un UUID aleatorio para cumplir con la restricción 'not-null' y 'unique' de auth_id
      const generatedAuthId = crypto.randomUUID();

      // Insertar directamente en la tabla usuarios sin usar auth de supabase
      const { data, error } = await supabaseClient.from("usuarios").insert([
        {
          auth_id: generatedAuthId,
          nombre: nombre,
          email: email,
          telefono: telefono || null,
          direccion: direccion || null,
          ciudad: ciudad || null,
          password: password, // Se guarda directo en la DB
          rol: "cliente" // Rol por defecto
        }
      ]);

      if (error) {
        console.error("Error al registrar en DB:", error);
        if (error.code === '23505') { // Código de error unique violation en Postgres
          mensaje.textContent = "Este correo ya está registrado ❌";
        } else {
          mensaje.textContent = "Error al crear la cuenta ❌";
        }
        mensaje.style.color = "red";
      } else {
        mensaje.textContent = "Registrado correctamente ✅. Ya puedes iniciar sesión.";
        mensaje.style.color = "green";
        
        // Limpiar el formulario
        document.getElementById("reg-nombre").value = "";
        document.getElementById("reg-email").value = "";
        document.getElementById("reg-telefono").value = "";
        document.getElementById("reg-direccion").value = "";
        document.getElementById("reg-ciudad").value = "";
        document.getElementById("reg-password").value = "";
        
        // Opcional: Cerrar modal después de unos segundos
        setTimeout(() => {
          document.getElementById("modal-register").classList.remove("activo");
          mensaje.textContent = "";
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      mensaje.textContent = "Error de conexión ❌";
      mensaje.style.color = "red";
    }

    btn.disabled = false;
    btn.textContent = "Registrarse";
    bloqueado = false;
  }

  // EVENTOS DE BOTONES
  const btnLogin = document.getElementById("btn-login");
  if (btnLogin) btnLogin.addEventListener("click", login);

  const btnRegister = document.getElementById("btn-registrar-modal");
  if (btnRegister) btnRegister.addEventListener("click", registerModal);

  // ==========================
  // MODAL CONTROL
  // ==========================
  const modal = document.getElementById("modal-register");
  const abrirRegister = document.getElementById("abrir-register");
  const cerrarRegister = document.getElementById("cerrar-register");

  if (abrirRegister) {
    abrirRegister.addEventListener("click", () => {
      modal.classList.add("activo");
    });
  }

  if (cerrarRegister) {
    cerrarRegister.addEventListener("click", () => {
      modal.classList.remove("activo");
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("activo");
    }
  });

});