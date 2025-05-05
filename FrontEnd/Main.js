/** First page **/

/** Fetch pour récupérer les informations pour la gallery */
const gallery = document.querySelector(".gallery");

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            card(element.imageUrl, element.title, element.categoryId, element.id);
        });
    })
    .catch(error => console.log(error));

/** Fonction pour l'affichage des images */
function card(imgUrl, title, categoryId, id) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.crossOrigin = "anonymous";
    img.src = imgUrl;
    img.alt = title;
    figcaption.textContent = title;
    figure.dataset.category = categoryId;
    figure.dataset.id = id;
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
const BoutonNav = document.getElementById("BoutonNav");
const formulaire = document.getElementById("formulaire");
const formulaireModal2 = document.getElementById("formulaireModal2");



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
        BtnModifié.innerHTML = "";
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
                    Modalcard(element.imageUrl, element.id);
                });
            })
            .catch(error => console.log(error));
        // Fonction pour créer les images dans la modal 1
            function Modalcard(imgUrl, id) {
                const Modalfigure = document.createElement("Modalfigure");
                const Modalimg = document.createElement("img");
                const ModalTrash = document.createElement("i");
                ModalTrash.classList.add("fa-solid", "fa-trash");
                ModalTrash.classList.add("IconeTrash");
                Modalimg.crossOrigin = "anonymous";
                Modalimg.src = imgUrl;
                Modalfigure.dataset.id = id;
                Modalfigure.classList.add("ModalFigure");
                Modalfigure.appendChild(Modalimg);
                Modalfigure.appendChild(ModalTrash);
                Modalgallery.appendChild(Modalfigure);
        // Supprimer une image dans la modal 1
                ModalTrash.addEventListener("click", function() {
                    
                    fetch(`http://localhost:5678/api/works/${Modalfigure.dataset.id}`, {
                        method : "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json", 
                          },
                    })
                    .then(response => {
                        if (response.status === 401) {
                            alert("non autorisé");
                        }
                        if (response.status === 500) {
                            alert("comportement inattendu");
                        }
                        if (response.status === 200) {
                            alert("l'élement a bien été supprimé");
                            Modalfigure.remove()
                            const figureToDelete = document.querySelector(`.gallery figure[data-id="${id}"]`);
                            figureToDelete.remove()
                        }
                        return response.json()})
                    .then(data => {
                        console.log(data);
                    })
                    .catch (error => console.log(error))
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
            feuilleModal.removeChild(barreModal);
            feuilleModal.removeChild(BtnAjoutPhoto);
        });

        const barreModal = document.createElement("span");
        barreModal.classList.add("barreModal");
        feuilleModal.appendChild(barreModal);

        const BtnAjoutPhoto = document.createElement("button");
        BtnAjoutPhoto.classList.add("photoBtn");
        BtnAjoutPhoto.innerText = "Ajouter une photo";
        feuilleModal.appendChild(BtnAjoutPhoto);

                BtnAjoutPhoto.addEventListener("click", function () {
                    
                    document.activeElement.blur(); // enlève le focus
                    portfolioModal.setAttribute("aria-hidden", "true");
                    portfolioModal.style.display = "none";

                    const iconeRetour = document.createElement("i");
                    iconeRetour.classList.add("fa-solid", "fa-arrow-left", "ModaliconeRetour");
                    BoutonNav.appendChild(iconeRetour);

                    iconeRetour.addEventListener("click", function () {
                        portfolioModal2.style.display = "none";
                        portfolioModal2.setAttribute("aria-hidden", "true");
                        BoutonNav.removeChild(iconeCroix);
                        feuilleModal2.removeChild(barreModal);
                        feuilleModal2.removeChild(BtnAjoutPhoto);
                        feuilleModal2.removeChild(iconeRetour);

                        portfolioModal.setAttribute("aria-hidden", "false");
                        portfolioModal.style.display = "flex";
                        feuilleModal.prepend(iconeCroix);
                        feuilleModal.appendChild(barreModal);
                        feuilleModal.appendChild(BtnAjoutPhoto);
                    });

                    portfolioModal2.setAttribute("aria-hidden", "false");
                    portfolioModal2.style.display = "flex";

                    BoutonNav.appendChild(iconeCroix);

                    iconeCroix.addEventListener("click", function () {
                        portfolioModal2.style.display = "none";
                        portfolioModal2.setAttribute("aria-hidden", "true");
                        
                        feuilleModal2.removeChild(barreModal);
                        feuilleModal2.removeChild(BtnAjoutPhoto);
                        BoutonNav.removeChild(iconeCroix);
                        feuilleModal2.removeChild(iconeRetour);
                    });
                      // Création de l'input "photo"
                        const PhotoInput = document.createElement("input");
                        PhotoInput.type = "file";
                        PhotoInput.name = "image";
                        PhotoInput.id = "DocumentImage";
                        PhotoInput.required = true;
                        PhotoInput.accept = "image/jpeg, image/png";
                        PhotoInput.hidden = true;
                        const PreviewImage = document.createElement("img");
                        PreviewImage.style.width = "420px";
                        PreviewImage.style.height = "169px";
                        PreviewImage.hidden = true;
                        formulaire.appendChild(PreviewImage);
                      // Création du label "Ajout photo"
                      const labelPhoto = document.createElement("label");
                      labelPhoto.setAttribute("for", "input-photo");
                      labelPhoto.classList.add("upload-button");
                      labelPhoto.innerText = "+ Ajouter photo";
                      
                      labelPhoto.addEventListener("click", () => {
                        PhotoInput.click(); // déclenche l'ouverture du sélecteur de fichier
                    });
                        PhotoInput.addEventListener("change", () => {
                        const file = PhotoInput.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                PreviewImage.src = e.target.result; // Donne la prévisualisation en base64
                            };
                            PreviewImage.hidden = false;
                            reader.readAsDataURL(file); // Lit le fichier image
                        }
                    });
                        

                      // Création de l'info text
                        const infoText = document.createElement("p");
                        infoText.innerText = "jpg, png : 4mo max";
                        infoText.classList.add("info-text");

                      // Création du label "Titre"
                        const labelTitre = document.createElement("label");
                        labelTitre.setAttribute("for", "titre");
                        labelTitre.innerText = "Titre";
                        

                        // Création de l'input "Titre"
                        const inputTitre = document.createElement("input");
                        inputTitre.type = "text";
                        inputTitre.name = "titre";
                        inputTitre.id = "titre";
                        inputTitre.required = true;

                        // Création du label "Catégorie"
                        const labelCategorie = document.createElement("label");
                        labelCategorie.setAttribute("for", "Categorie");
                        labelCategorie.innerText = "Catégorie";

                        // Création de l'input "Catégorie"
                        const inputCategorie = document.createElement("input");
                        inputCategorie.type = "text";
                        inputCategorie.name = "Categorie";
                        inputCategorie.id = "Categorie";
                        inputCategorie.setAttribute("list", "Categorie-list");
                        inputCategorie.required = true;

                        // Création du datalist "Categorie-list"
                        const dataListCategorie = document.createElement("datalist");
                        dataListCategorie.id = "Categorie-list";

                        formulaire.appendChild(PhotoInput);
                        formulaire.appendChild(labelPhoto);
                        formulaire.appendChild(infoText);
                        formulaireModal2.appendChild(labelTitre);
                        formulaireModal2.appendChild(inputTitre);
                        formulaireModal2.appendChild(labelCategorie);
                        formulaireModal2.appendChild(inputCategorie);
                        formulaireModal2.appendChild(dataListCategorie);

                    feuilleModal2.appendChild(barreModal);

                    feuilleModal2.appendChild(BtnAjoutPhoto);
                    BtnAjoutPhoto.innerText = "Valider"
                    
                        fetch("http://localhost:5678/api/categories")
                        .then(response => response.json())
                        .then(data => {
                            data.forEach(element => {
                                createSubmitList(element.name);
                            });
                        })
                        .catch(error => console.log(error));
                        
                        function createSubmitList(name) {
                            
                            const option = document.createElement("option")
                            option.value = name;
                            dataListCategorie.appendChild(option)
                    }

                    const DocumentImage = document.getElementById("DocumentImage");
                    const Titre = document.getElementById("Titre");
                    const Categorie = document.getElementById("Categorie");

                    BtnAjoutPhoto.addEventListener("click", async () => {
                        const DocumentImageValue = DocumentImage.files[0];
                        const TitreValue = Titre.value.trim();
                        const CategorieValue = Categorie.value.trim();
                    
                        if (TitreValue === "" || CategorieValue === "") {
                            alert("Vous devez rentrer un Titre et/ou une catégorie");
                            return;
                        }
                        console.log("Titre :", TitreValue + " Categorie :", CategorieValue)
                    
                    
                        fetch("http://localhost:5678/api/works", {
                            method : "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                title: TitreValue,
                                category: CategorieValue,
                                imageUrl : DocumentImageValue
                            }),
                        })
                        .then(response => {
                            Erreurspan.textContent = "";
                            if (response.status === 400) {
                                Erreurspan.textContent = "Mauvaise requete";
                            }
                            if (response.status === 401) {
                                Erreurspan.textContent = "Non authorisé";
                            }
                            if (response.status === 500) {
                                Erreurspan.textContent = "Erreur inconnu";
                            }
                            if (response.status === 200) {
                                alert("crée")
                            }
                            return response.json()})
                        .then(data => {
                            console.log(data);
                        })
                        .catch (error => console.log(error))
                    })
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

   