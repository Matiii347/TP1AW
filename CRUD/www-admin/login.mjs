const formLogin = document.getElementById('form-login')

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    try {
        const respuesta = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        if (respuesta.ok) {
            alert('¡Bienvenido!')
            window.location.href = '/admin/panel.html'
        } else {
            const error = await respuesta.json()
            alert(`Error: ${error.mensaje}`)
        }
    } catch (error) {
        console.error('Error en el fetch:', error)
        alert('No se pudo conectar al servidor.')
    }
})