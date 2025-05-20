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
    figure.classList.add("figure");
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
}


/** ModeEdition et logOut */
const token = localStorage.getItem("token");
const filtres = document.querySelector(".filtres");


// CONSTANTE MODAL 1
    const portfolioModal = document.getElementById("portfolioModal");
    const feuilleModal = document.getElementById("feuilleModal");

// CONSTANTE MODAL 2
    const portfolioModal2 = document.getElementById("portfolioModal2");
    const feuilleModal2 = document.getElementById("feuilleModal2");
    const imageFormulaire = document.getElementById("image-formulaire");

        

/*portfolioModal2.addEventListener("click", (event) => {
    portfolioModal2.style.display = "none";
})*/


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
    BtnModifié.classList.add("Btnmodifie");

    const icone2 = document.createElement("i");
    icone2.classList.add("fa-solid", "fa-pen-to-square");
    
    BtnModifié.appendChild(icone2);

    const texteModifie = document.createTextNode("  Modifié");
    BtnModifié.appendChild(texteModifie);


// MODAL 1
    BtnModifié.addEventListener("click", function () {
        
        
        const titreModalgallery = document.createElement("h2");
        titreModalgallery.textContent = "Galerie photo";

        const Modalgallery = document.createElement("div");
        Modalgallery.className = "modalGallery";

        const iconeCroix = document.createElement("i");
        iconeCroix.classList.add("fa-solid", "fa-xmark", "Modal1iconeCroix");
        
        const barreModal = document.createElement("span");
        barreModal.classList.add("barreModal");

        const BtnAjoutPhoto = document.createElement("button");
        BtnAjoutPhoto.classList.add("photoBtn");
        BtnAjoutPhoto.innerText = "Ajouter une photo";

        portfolioModal.setAttribute("aria-hidden", "false");
        portfolioModal.style.display = "flex";
        
        feuilleModal.appendChild(iconeCroix);
        feuilleModal.appendChild(titreModalgallery);
        feuilleModal.appendChild(Modalgallery);
        feuilleModal.appendChild(barreModal);
        feuilleModal.appendChild(BtnAjoutPhoto);

        // Fonction pour la Modal1

        // Fonction création des images modal1
        fetch("http://localhost:5678/api/works")
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    Modalcard(element.imageUrl, element.id);
                });
            })
            .catch(error => console.log(error));

        function Modalcard(imgUrl, id) {
            const Modalfigure = document.createElement("Modalfigure");
            const Modalimg = document.createElement("img");
            const ModalTrash = document.createElement("i");
            ModalTrash.classList.add("fa-solid", "fa-trash", "fa-xs");
            ModalTrash.classList.add("IconeTrash");
            Modalimg.crossOrigin = "anonymous";
            Modalimg.src = imgUrl;
            Modalfigure.dataset.id = id;
            Modalfigure.classList.add("ModalFigure");
            Modalfigure.appendChild(Modalimg);
            Modalfigure.appendChild(ModalTrash);
            Modalgallery.appendChild(Modalfigure);

            ModalTrash.addEventListener("click", function(e) {
                fetch(`http://localhost:5678/api/works/${Modalfigure.dataset.id}`, {
                    method : "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(token)}`
                        },
                })
                .then(response => {
                    if (response.status === 401) {
                        alert("non autorisé");
                        }
                    if (response.status === 500) {
                        alert("comportement inattendu");
                        }
                    if (response.status === 204) {
                        alert("l'élement a bien été supprimé");
                        Modalfigure.remove()
                        const figureToDelete = document.querySelector(`.gallery figure[data-id="${id}"]`);
                        figureToDelete.remove()
                        }
                    return
                });
            })
        };

        function fermetureModal1() {
            portfolioModal.style.display = "none";
            portfolioModal.setAttribute("aria-hidden", "true");
            Modalgallery.innerHTML = "";
            feuilleModal.innerHTML ="";
            }
            
    // EventListener pour la Modal1
        iconeCroix.addEventListener("click", function () {
            fermetureModal1();
        });

        portfolioModal.addEventListener("click", (event) => {
            if (!feuilleModal.contains(event.target)) {
            fermetureModal1();
            }
        });

        BtnAjoutPhoto.addEventListener("click", function () {
            
            document.activeElement.blur(); // enlève le focus
            portfolioModal.setAttribute("aria-hidden", "true");
            portfolioModal.style.display = "none";

            portfolioModal2.setAttribute("aria-hidden", "false");
            portfolioModal2.style.display = "flex";

        // MODAL 2
            // Crée le div pour BoutonNav
            const BoutonNav = document.createElement('div');
            BoutonNav.id = 'BoutonNav';
            feuilleModal2.appendChild(BoutonNav);

            // Crée le div pour titreModalgallery2
            const titreModal2 = document.createElement('div');
            titreModal2.id = 'titreModalgallery2';
            feuilleModal2.appendChild(titreModal2);

            // Crée le div avec la classe et l'id formulaire
            const formulaire = document.createElement('div');
            formulaire.classList.add('formulaire');
            formulaire.id = 'formulaire';
            feuilleModal2.appendChild(formulaire);

            // Crée le formulaire avec classe et id formulaireModal2
            const formulaireModal2 = document.createElement('form');
            formulaireModal2.action = '#';
            formulaireModal2.method = 'post';
            formulaireModal2.classList.add('formulaireModal2');
            formulaireModal2.id = 'formulaireModal2';
            feuilleModal2.appendChild(formulaireModal2);


            const iconeRetour = document.createElement("i");
            iconeRetour.classList.add("fa-solid", "fa-arrow-left", "ModaliconeRetour");

            const iconeCroix2 = document.createElement("i");
            iconeCroix2.classList.add("fa-solid", "fa-xmark", "Modal2iconeCroix");

            const titreModalgallery2 = document.createElement("h2");
            titreModalgallery2.textContent = "Ajout Photo";

            // Création du background "photo"
            const imageFormulaire = document.createElement("img");

            imageFormulaire.src = "./assets/images/image-svgrepo-com-1.png";
            imageFormulaire.alt = "Aperçu image";
            imageFormulaire.className = "preview-icon";
            imageFormulaire.id = "image-formulaire";


            // Création de l'input "photo"
            const PhotoInput = document.createElement("input");
            PhotoInput.type = "file";
            PhotoInput.name = "image";
            PhotoInput.id = "DocumentImage";
            PhotoInput.required = true;
            PhotoInput.accept = "image/jpeg, image/png";
            PhotoInput.hidden = true;
            const PreviewImage = document.createElement("img");
            PreviewImage.style.width = "129px";
            PreviewImage.style.height = "193px";
            PreviewImage.hidden = true;
            formulaire.appendChild(PreviewImage);


            // Création du label "Ajout photo"
            const labelPhoto = document.createElement("label");
            labelPhoto.setAttribute("for", "input-photo");
            labelPhoto.classList.add("upload-button");
            labelPhoto.innerText = "+ Ajouter photo";


            // Création du bouton "Valider
            const BtnValider = document.createElement("button");
            BtnValider.classList.add("BtnValider");
            BtnValider.innerText = "Valider";


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

            const barreModal2 = document.createElement("span");
            barreModal2.classList.add("barreModal");

            fetch("http://localhost:5678/api/categories")
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    createSubmitList(element.name, element.id);
                });
            })
            .catch(error => console.log(error));
            
            function createSubmitList(name, id) {
                const option = document.createElement("option")
                option.value = name;
                option.dataset.id = id;
                dataListCategorie.appendChild(option)
            }


            // Ajout des enfants
            BoutonNav.appendChild(iconeRetour);
            BoutonNav.appendChild(iconeCroix2);

            titreModal2.appendChild(titreModalgallery2);

            formulaire.appendChild(imageFormulaire);
            formulaire.appendChild(PhotoInput);
            formulaire.appendChild(labelPhoto);
            formulaire.appendChild(infoText);

            feuilleModal2.appendChild(barreModal2);
            feuilleModal2.appendChild(BtnValider);
            
            formulaireModal2.appendChild(labelTitre);
            formulaireModal2.appendChild(inputTitre);
            formulaireModal2.appendChild(labelCategorie);
            formulaireModal2.appendChild(inputCategorie);
            formulaireModal2.appendChild(dataListCategorie);
            
            // FONCTION POUR LA MODAL 2
            function fermetureModal2() {
                portfolioModal2.style.display = "none";
                portfolioModal2.setAttribute("aria-hidden", "true");
                feuilleModal2.innerHTML = "";
            }

            function updateSubmitState() {
            const hasFile    = PhotoInput.files.length > 0;
            const hasTitle   = inputTitre.value.trim() !== "";
            const hasCategory = [...dataListCategorie.options]
                                    .some(opt => opt.value === inputCategorie.value);

            if (hasFile && hasTitle && hasCategory) {
                BtnValider.disabled = false;
                BtnValider.style.backgroundColor = "#1D6154";
            } else {
                BtnValider.disabled = true;
                BtnValider.style.backgroundColor = "#A7A7A7";
            }
            }

            // EVENT LISTENER POUR LA MODAL 2
            iconeRetour.addEventListener("click", function () {
                event.stopPropagation();
                document.activeElement.blur(); // enlève le focus
                fermetureModal2();
    
                portfolioModal.setAttribute("aria-hidden", "false");
                portfolioModal.style.display = "flex";
            });


            iconeCroix2.addEventListener("click", function () {
                document.activeElement.blur(); // enlève le focus
                fermetureModal1();
                fermetureModal2();
            });

            portfolioModal2.addEventListener("click", (event) => {
                if (!feuilleModal2.contains(event.target)) {
                fermetureModal1();
                fermetureModal2();
                }
            });


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
                    PreviewImage.style.maxWidth = "129px";
                    PreviewImage.style.maxHeight = "169px";
                    reader.readAsDataURL(file); // Lit le fichier image
                    imageFormulaire.hidden = true;
                    labelPhoto.style.display = "none";
                    infoText.hidden = true;
                }
            });

            

            
            PhotoInput.addEventListener("change", updateSubmitState);
            inputTitre.addEventListener("input",    updateSubmitState);
            inputCategorie.addEventListener("input", updateSubmitState);

            BtnValider.addEventListener("click", async () => {
                const file = PhotoInput.files[0];
                const TitreValue = inputTitre.value.trim();
                const selectedOption = [...dataListCategorie.options].find(option => option.value === inputCategorie.value);
                const CategorieValue = selectedOption ? selectedOption.dataset.id : null;
                

                const formData = new FormData();
                formData.append("image", file); // ← envoie le fichier tel quel
                formData.append("title", TitreValue);
                formData.append("category", CategorieValue);

                if (TitreValue === "" || CategorieValue === "") {
                    alert("Vous devez rentrer un Titre et/ou une catégorie");
                    return;
                }
                console.log("Titre :", TitreValue + " Categorie :", CategorieValue)
            
            
                fetch("http://localhost:5678/api/works", {
                    method : "POST",
                    headers: { 
                        Authorization: `Bearer ${JSON.parse(token)}`
                        },
                    body: formData
                    })
                .then(async response => {
                    const data = await response.json();
                    
                    if (response.status === 400) {
                        alert("Mauvaise requete");
                    }
                    if (response.status === 401) {
                        alert("Non authorisé");
                    }
                    if (response.status === 500) {
                        alert("Erreur inconnu");
                    }
                    if (response.status === 201) {
                        alert("crée")
                        card(data.imageUrl, data.title, data.categoryId, data.id)
                        Modalcard(data.imageUrl, data.id)

                        fermetureModal1();
                        fermetureModal2();
                    }
                    return data;
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

   