/** First page**/

/** Function */
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

    const filtres = document.querySelector(".filtres")

    const BtnTous = document.createElement("button");
    BtnTous.innerText = "Tous";

    const BtnObjets = document.createElement("button");
    BtnObjets.innerText = "Objets";

    const BtnAppartements = document.createElement("button");
    BtnAppartements.innerText = "Appartements";

    const BtnHotelsrestaurants = document.createElement("button");
    BtnHotelsrestaurants.innerText = "Hotels & restaurants";

    const boutons = [BtnTous, BtnObjets, BtnAppartements, BtnHotelsrestaurants];
    boutons.forEach(bouton => {
        bouton.style.border = "1px solid #1D6154";
        bouton.style.text = "#1D6154";
    })

    filtres.appendChild(BtnTous);
    filtres.appendChild(BtnObjets);
    filtres.appendChild(BtnAppartements);
    filtres.appendChild(BtnHotelsrestaurants);
    filtres.style.display = "flex";
    filtres.style.justifyContent = "center";
    filtres.style.gap = "5px";
    filtres.style.height = "37px";      
    
    
    BtnObjets.addEventListener("click", function () {
        const figures = document.querySelectorAll(".gallery figure");
        const figuresArray = Array.from(figures); 
    
        
        figuresArray.forEach(fig => {
            fig.style.display = fig.dataset.category === "1" ? "block" : "none";
        });
    })

    BtnAppartements.addEventListener("click", function () {
        const figures = document.querySelectorAll(".gallery figure");
        const figuresArray = Array.from(figures); 
    
        
        figuresArray.forEach(fig => {
            fig.style.display = fig.dataset.category === "2" ? "block" : "none";
        });
    })

    BtnHotelsrestaurants.addEventListener("click", function () {
        const figures = document.querySelectorAll(".gallery figure");
        const figuresArray = Array.from(figures); 
    
        
        figuresArray.forEach(fig => {
            fig.style.display = fig.dataset.category === "3" ? "block" : "none";
        });
    })

    BtnTous.addEventListener("click", function () {
        const figures = document.querySelectorAll(".gallery figure");
        const figuresArray = Array.from(figures); 
    
        
        figuresArray.forEach(fig => {
            fig.style.display = "block"
        });
    })

    
const token = localStorage.getItem("token")
    console.log(token)

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
            modeEdition.style = "none"
        })


        filtres.removeChild(BtnTous)
        filtres.removeChild(BtnObjets)
        filtres.removeChild(BtnAppartements)
        filtres.removeChild(BtnHotelsrestaurants)

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
        
    }



    

