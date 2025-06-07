
/** Login**/
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnConnexion = document.getElementById("connexion");
const erreurspan = document.querySelector(".erreur");
/** Login**/
btnConnexion.addEventListener("click", async () => {
    erreurspan.classList.remove("erreur-visible");
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    if (emailValue === "" || passwordValue === "") {
        alert("Vous devez rentrer un email et/ou un mot de passe");
        return;
    }
    fetch("http://localhost:5678/api/users/login", {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        }),
    })
    .then(response => {
        erreurspan.textContent = "";
        if (response.status === 404) {
            erreurspan.classList.add("erreur-visible");
            erreurspan.textContent = "Adresse mail ou Mot de passe incorrect";
        }
        if (response.status === 401) {
            erreurspan.classList.add("erreur-visible");
            erreurspan.textContent = "Adresse mail ou Mot de passe incorrect";
        }
        if (response.status === 200) {
            window.location.href= "./index.html";
        }
        return response.json()})
    .then(data => {
        localStorage.setItem("token",JSON.stringify(data.token))
    })
})