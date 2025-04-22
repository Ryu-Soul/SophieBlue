/** First page**/

/** Fetch pour récupérer les informations sur le swagger */
const gallery = document.querySelector(".gallery")
fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            card(element.imageUrl, element.title, element.categoryId)
            console.log(element);
        });
    })
    .catch(error => console.log(error));
/** Fonction pour l'affichage des images */
function card(imgUrl, title, categoryId) {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")
    img.crossOrigin = "anonymous";
    img.src = imgUrl;
    img.alt = title;
    figcaption.textContent = title;
    figure.dataset.category = categoryId;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
    
}

/** ModeEdition et logOut */
const token = localStorage.getItem("token")
    console.log(token)
const filtres = document.querySelector(".filtres")

    if (token) {
        const BtnConnexion = document.getElementById("login/out")
        const lienConnexion = document.getElementById("lienConnexion")
        BtnConnexion.innerText = "Logout"
        

        BtnConnexion.addEventListener("click", function(){
            localStorage.removeItem("token")
            BtnConnexion.innerText = ""
            lienConnexion.href = "./login.html"
            BtnConnexion.appendChild(lienConnexion)
            modeEdition.innerHTML = ""
            modeEdition.classList.remove("modeEdition")
        })

        const btnfiltres = filtres.querySelectorAll("button")
        btnfiltres.forEach((btn) =>{
            btn.remove();
        })
        

        const modeEdition = document.getElementById("ModeEdition")
        modeEdition.innerText = "Mode édition";
        modeEdition.classList.add("modeEdition");
        
        const icone = document.createElement("i");
        icone.classList.add("fa-solid" , "fa-pen-to-square");
        icone.style.Color = "white";
        
        modeEdition.prepend(icone);

        
        const BtnModifié = document.getElementById("modifié");
        BtnModifié.classList.add("Btnmodifie")
        BtnModifié.innerText = "Modifié"
        const icone2 = document.createElement("i");
        icone2.classList.add("fa-solid" , "fa-pen-to-square");
        icone2.style.Color = "white";
        BtnModifié.prepend(icone2)
    
    } else {

        /** Création des boutons pour filtrer*/
    
    const BtnTous = document.createElement("button");
    BtnTous.innerText = "Tous";
    filtres.appendChild(BtnTous);
    BtnTous.click();
    BtnTous.focus();

    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            filtre(element.id, element.name)
            console.log(element);
        });
    })
    .catch(error => console.log(error));

/** Fonction pour les filtres */    
function filtre(id, name) {
    /** Boutons pour filtrer*/ 
    const Btnfiltre = document.createElement("button");
    Btnfiltre.textContent = name;
    Btnfiltre.dataset.category = id;

    filtres.appendChild(Btnfiltre);
    filtres.classList.add("btn")

    Btnfiltre.addEventListener("click", function () {
        const figures = document.querySelectorAll(".gallery figure");
        const figuresArray = Array.from(figures); 
        figuresArray.forEach(fig => {
            fig.style.display = fig.dataset.category === Btnfiltre.dataset.category ? "block" : "none";
        });
    })
    BtnTous.addEventListener("click", function () {
        const figures = document.querySelectorAll(".gallery figure");
        const figuresArray = Array.from(figures); 
        figuresArray.forEach(fig => {
            fig.style.display = "block"
        });
    })
}
}



    

