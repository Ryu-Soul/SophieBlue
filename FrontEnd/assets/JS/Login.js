
/** Login**/
const Email = document.getElementById("email");
const Password = document.getElementById("password");
const BtnConnexion = document.getElementById("connexion");
const Erreurspan = document.querySelector(".erreur");
/** Function**/



/** Login**/
BtnConnexion.addEventListener("click", async () => {
    const emailValue = Email.value.trim();
    const passwordValue = Password.value.trim();

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
        Erreurspan.textContent = "";
        if (response.status === 404) {
            Erreurspan.textContent = "Adresse mail ou Mot de passe incorrect";
        }
        if (response.status === 401) {
            Erreurspan.textContent = "Adresse mail ou Mot de passe incorrect";
        }
        if (response.status === 200) {
            window.location.href= "./index.html";
        }
        return response.json()})
    .then(data => {
        console.log(data);
        localStorage.setItem("token",JSON.stringify(data.token))
    })
    .catch (error => console.log(error))
})
