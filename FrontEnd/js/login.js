// Récupération des éléments du DOM
const submit = document.getElementById("login-btn");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Fonction qui permet de récuperer les valeurs de l'user et de se connecter
submit.addEventListener("click", function (event) {
    event.preventDefault();
    let user = {
        email: email.value,
        password: password.value,
    };
    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user)
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            alert("L'identifiant ou/et le mot de passe sont incorrects");
        }
    })
    // Sauvegarde du token en LocalStorage et redirection vers page index_edit
    .then((data) => {
    if (data !== 0) {
        window.sessionStorage.setItem("userId", data.userId);
        window.sessionStorage.setItem("token", data.token);
        console.log(data);
        document.location.href = "../html/index.html";
    }
    })
}); 




    
    