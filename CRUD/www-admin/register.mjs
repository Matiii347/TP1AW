const formRegistro = document.getElementById('form-registro')

formRegistro.addEventListener('submit', async (event) => {

    event.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('passwordConfirm').value

    if (password !== passwordConfirm) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.')
        return
    }
    try {
        const respuesta = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        });
        if (respuesta.ok) {
            alert('¡Usuario registrado con éxito! Ahora puedes iniciar sesión.')
            window.location.href = '/admin/'
        } else {
            const error = await respuesta.json()
            alert(`Error al registrar: ${error.mensaje}`)
        }
    } catch (error) {
        console.error('Error en el fetch:', error)
        alert('No se pudo conectar al servidor.')
    }
})