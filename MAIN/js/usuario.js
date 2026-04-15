document.addEventListener("DOMContentLoaded", () => {


  // ==========================
  // LOGIN
  // ==========================
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
      window.location.href = "/MAIN/index.html"
    }
  }

  // ==========================
  // REGISTER (MODAL)
  // ==========================
  let bloqueado = false;

  async function registerModal() {

    if (bloqueado) return; // 🚫 evita múltiples clicks
    bloqueado = true;

    const nombre = document.getElementById("reg-nombre").value
    const email = document.getElementById("reg-email").value
    const password = document.getElementById("reg-password").value
    const mensaje = document.getElementById("mensaje-register")

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password
    })

    if (error) {
      mensaje.textContent = error.message
      bloqueado = false
      return
    }

    mensaje.textContent = "Registrado correctamente ✅"

    bloqueado = false
  }

  // ==========================
  // EVENTOS
  // ==========================
  document.getElementById("btn-login").addEventListener("click", login)
  document.getElementById("btn-registrar-modal").addEventListener("click", registerModal)

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