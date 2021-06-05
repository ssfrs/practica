const form = document.getElementById('login-form');

let token = '';

// -------- partea asta este pus in indexul unde trebuie facuta lista

// function getTodos() {
//     fetch('http://localhost:3000/api/todos', {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//     .then(response => response.json())
//     .then(response => console.log(response))
// }

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    const user = {
        email: email,
        password: pass
    };
    // const user = {email, password}; daca cheia = valoare
    console.log(user);

    // POST catre http://localhost:3000/api/login

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        body: user
    })
    .then(response => response.json())
    .then(response => {
        localStorage.setItem('token', response.token);
        window.location.href = '/';
    })
});