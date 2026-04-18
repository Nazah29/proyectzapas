document.addEventListener("DOMContentLoaded", () => {

  async function login() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      document.getElementById("mensaje").textContent = error.message
    } else {
      document.getElementById("mensaje").textContent = "Login exitoso ✅"
      window.location.href = "MAIN/index.html"
    }
  }

  let bloqueado = false;

  async function registerModal() {
    if (bloqueado) return;
    bloqueado = true;

    const nombre = document.getElementById("reg-nombre").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const mensaje = document.getElementById("mensaje-register");
    const btn = document.getElementById("btn-registrar-modal");

    if (!nombre || !email || !password) {
      mensaje.textContent = "Completa todos los campos ❌";
      bloqueado = false;
      return;
    }

    btn.disabled = true;
    btn.textContent = "Registrando...";

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password
    });

    if (error) {
      mensaje.textContent = error.message;
      btn.disabled = false;
      btn.textContent = "Registrarse";
      bloqueado = false;
      return;
    }

    const user = data.user;

    if (user) {
      try {
        const { error: insertError } = await supabaseClient.from("usuarios").insert([
          {
            auth_id: user.id,
            nombre: nombre,
            email: email
          }
        ]);

        if (insertError) {
          console.error("Error al guardar perfil de usuario:", insertError);
          mensaje.textContent = "Cuenta creada. Por favor contacte soporte (Error de perfil).";
        } else {
          mensaje.textContent = "Registrado correctamente ✅";
        }
      } catch (err) {
        console.error("Error de conexión:", err);
        mensaje.textContent = "Cuenta creada ✅ (Advertencia de conexión)";
      }
    } else {
      mensaje.textContent = "Revisa tu correo 📩";
    }

    btn.disabled = false;
    btn.textContent = "Registrarse";
    bloqueado = false;
  }

  // EVENTOS SEGUROS
  const btnLogin = document.getElementById("btn-login")
  if (btnLogin) btnLogin.addEventListener("click", login)

  const btnRegister = document.getElementById("btn-registrar-modal")
  if (btnRegister) btnRegister.addEventListener("click", registerModal)



  // ==========================
  // MODAL CONTROL
  // ==========================
  const modal = document.getElementById("modal-register")

  document.getElementById("abrir-register").addEventListener("click", () => {
    modal.classList.add("activo")
  })

  document.getElementById("cerrar-register").addEventListener("click", () => {
    modal.classList.remove("activo")
  })

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("activo")
    }
  })




})