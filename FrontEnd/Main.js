/** First page **/

/** Fetch pour récupérer les informations pour la gallery */
const gallery = document.querySelector(".gallery");

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            card(element.imageUrl, element.title, element.categoryId);
        });
    })
    .catch(error => console.log(error));

/** Fonction pour l'affichage des images */
function card(imgUrl, title, categoryId) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
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
const token = localStorage.getItem("token");
const filtres = document.querySelector(".filtres");
const portfolioModal = document.getElementById("portfolioModal");
const feuilleModal = document.getElementById("feuilleModal");
const portfolioModal2 = document.getElementById("portfolioModal2");
const feuilleModal2 = document.getElementById("feuilleModal2");

if (token) {
    const BtnConnexion = document.getElementById("login/out");
    const lienConnexion = document.getElementById("lienConnexion");
    BtnConnexion.innerText = "Logout";

    BtnConnexion.addEventListener("click", function () {
        localStorage.removeItem("token");
        BtnConnexion.innerText = "";
        lienConnexion.href = "./login.html";
        BtnConnexion.appendChild(lienConnexion);
        modeEdition.innerHTML = "";
        modeEdition.classList.remove("modeEdition");
        BtnModifié.remove();
        filtres.innerHTML = ""; 
        createFilterButtons();  
    });

    const btnfiltres = filtres.querySelectorAll("button");
    btnfiltres.forEach((btn) => {
        btn.remove();
    });

    const modeEdition = document.getElementById("ModeEdition");
    modeEdition.innerHTML = "";
    modeEdition.classList.add("modeEdition");

    const icone = document.createElement("i");
    icone.classList.add("fa-solid", "fa-pen-to-square");
    icone.style.color = "white";
    modeEdition.prepend(icone);
    modeEdition.append(" Mode édition");

    const BtnModifié = document.getElementById("modifié");
    BtnModifié.innerHTML = "";
    BtnModifié.classList.add("Btnmodifie");

    const icone2 = document.createElement("i");
    icone2.classList.add("fa-solid", "fa-pen-to-square");
    
    BtnModifié.appendChild(icone2);

    const texteModifie = document.createTextNode("  Modifié");
    BtnModifié.appendChild(texteModifie);

    BtnModifié.addEventListener("click", function () {
        portfolioModal.setAttribute("aria-hidden", "false");
        portfolioModal.style.display = "flex";
        const Modalgallery = document.querySelector(".modalGallery");
         

        fetch("http://localhost:5678/api/works")
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    Modalcard(element.imageUrl, element.categoryId);
                });
            })
            .catch(error => console.log(error));

            function Modalcard(imgUrl, categoryId) {
                const Modalfigure = document.createElement("Modalfigure");
                const Modalimg = document.createElement("img");
                const ModalTrash = document.createElement("i");
                ModalTrash.classList.add("fa-solid", "fa-trash");
                ModalTrash.classList.add("IconeTrash");
                Modalimg.crossOrigin = "anonymous";
                Modalimg.src = imgUrl;
                Modalfigure.dataset.category = categoryId;
                Modalfigure.classList.add("ModalFigure");
                Modalfigure.appendChild(Modalimg);
                Modalfigure.appendChild(ModalTrash);
                Modalgallery.appendChild(Modalfigure);

                ModalTrash.addEventListener("click", function() {
                    Modalfigure.remove();  
                });
                }

        // Supprimer ancienne croix s'il y en a une
        const ancienneCroix = feuilleModal.querySelector(".ModaliconeCroix");
        if (ancienneCroix) ancienneCroix.remove();

        const iconeCroix = document.createElement("i");
        iconeCroix.classList.add("fa-solid", "fa-xmark", "ModaliconeCroix");
        feuilleModal.prepend(iconeCroix);

        iconeCroix.addEventListener("click", function () {
            portfolioModal.style.display = "none";
            portfolioModal.setAttribute("aria-hidden", "true");
            Modalgallery.innerHTML = "";
            feuilleModal.removeChild(barreModal)
            feuilleModal.removeChild(BtnAjoutPhoto)
        });

        const barreModal = document.createElement("span");
        barreModal.classList.add("barreModal");
        feuilleModal.appendChild(barreModal);

        const BtnAjoutPhoto = document.createElement("button");
        BtnAjoutPhoto.classList.add("photoBtn");
        BtnAjoutPhoto.innerText = "Ajouter une photo";
        feuilleModal.appendChild(BtnAjoutPhoto);

                BtnAjoutPhoto.addEventListener("click", function () {
                    portfolioModal.style.display = "none";
                    portfolioModal.setAttribute("aria-hidden", "true");

                    feuilleModal.removeChild(barreModal)
                    feuilleModal.removeChild(BtnAjoutPhoto)

                    Modalgallery.innerHTML = "";

                    portfolioModal2.setAttribute("aria-hidden", "false");
                    portfolioModal2.style.display = "flex";

                    feuilleModal2.prepend(iconeCroix);

                    feuilleModal2.appendChild(barreModal);

                    feuilleModal2.appendChild(BtnAjoutPhoto);

                    
                        fetch("http://localhost:5678/api/categories")
                        .then(response => response.json())
                        .then(data => {
                            data.forEach(element => {
                                createSubmitList(element.id, element.name);
                            });
                        })
                        .catch(error => console.log(error));
                        
                        /**function createSubmitList() {
                            const CategorieList = document.createElement("datalist")

                    }**/
                })
            })

        
        

} else {
    createFilterButtons();
}

/** Fonction pour créer les filtres */
function createFilterButtons() {
    filtres.innerHTML = ""; 

    const BtnTous = document.createElement("button");
    BtnTous.innerText = "Tous";
    filtres.appendChild(BtnTous);
    BtnTous.click();
    BtnTous.focus();

    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                createFilter(element.id, element.name);
            });
        })
        .catch(error => console.log(error));

    function createFilter(id, name) {
        const Btnfiltre = document.createElement("button");
        Btnfiltre.textContent = name;
        Btnfiltre.dataset.category = id;
        filtres.appendChild(Btnfiltre);
        filtres.classList.add("btn");

        Btnfiltre.addEventListener("click", function () {
            const figures = document.querySelectorAll(".gallery figure");
            figures.forEach(fig => {
                fig.style.display = fig.dataset.category === Btnfiltre.dataset.category ? "block" : "none";
            });
        });

        BtnTous.addEventListener("click", function () {
            const figures = document.querySelectorAll(".gallery figure");
            figures.forEach(fig => {
                fig.style.display = "block";
            });
        });
    }
}

    