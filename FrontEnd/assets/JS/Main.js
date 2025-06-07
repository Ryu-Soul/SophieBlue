/** Creation of the gallery **/
const portfolio = document.getElementById("portfolio");
const entete = document.createElement("div");
entete.classList.add("en-tete");
const titrePortfolio = document.createElement("h2");
titrePortfolio.innerText = "Mes projets";
const modifié = document.createElement("div");
modifié.id = "modifié";
const filtres = document.createElement("div");
filtres.classList.add("filtres")
const gallery = document.createElement("div");
gallery.classList.add("gallery");
portfolio.appendChild(entete);
portfolio.appendChild(filtres);
portfolio.appendChild(gallery);
entete.appendChild(titrePortfolio);
entete.appendChild(modifié);
/** Fetch pour récupérer les informations pour la gallery */
fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            card(element.imageUrl, element.title, element.categoryId, element.id);
        });
    })
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
// CONSTANTE MODAL 1
    const portfolioModal = document.getElementById("portfolioModal");
    const feuilleModal = document.getElementById("feuilleModal");
// CONSTANTE MODAL 2
    const portfolioModal2 = document.getElementById("portfolioModal2");
    const feuilleModal2 = document.getElementById("feuilleModal2");
    const imageFormulaire = document.getElementById("image-formulaire");
if (token) {
    const btnConnexion = document.getElementById("login/out");
    const lienConnexion = document.getElementById("lienConnexion");
    btnConnexion.innerText = "Logout";
    portfolio.removeChild(filtres);
    btnConnexion.addEventListener("click", function () {
        localStorage.removeItem("token");
        btnConnexion.innerText = "";
        lienConnexion.href = "./login.html";
        btnConnexion.appendChild(lienConnexion);
        modeEdition.innerHTML = "";
        modeEdition.classList.remove("modeEdition");
        btnModifié.innerHTML = "";
        portfolio.innerHTML ="";
        portfolio.appendChild(entete);
        portfolio.appendChild(filtres);
        portfolio.appendChild(gallery);
        entete.appendChild(titrePortfolio);
        entete.appendChild(modifié);
        createFilterButtons();  
    });
    const modeEdition = document.getElementById("ModeEdition");
    modeEdition.innerHTML = "";
    modeEdition.classList.add("modeEdition");
    const icone = document.createElement("i");
    icone.classList.add("fa-solid", "fa-pen-to-square");
    icone.classList.add('iconeModeEdition');
    modeEdition.prepend(icone);
    modeEdition.append(" Mode édition");
    const btnModifié = document.getElementById("modifié");
    btnModifié.classList.add("Btnmodifie");
    const icone2 = document.createElement("i");
    icone2.classList.add("fa-solid", "fa-pen-to-square");
    btnModifié.appendChild(icone2);
    const texteModifie = document.createTextNode("  Modifier");
    btnModifié.appendChild(texteModifie);
// MODAL 1
    btnModifié.addEventListener("click", function () {
        const titreModalgallery = document.createElement("h3");
        titreModalgallery.textContent = "Galerie photo";
        const modalgallery = document.createElement("div");
        modalgallery.className = "modalGallery";
        const iconeCroix = document.createElement("i");
        iconeCroix.classList.add("fa-solid", "fa-xmark", "Modal1iconeCroix");
        const barreModal = document.createElement("span");
        barreModal.classList.add("barreModal");
        const btnAjoutPhoto = document.createElement("button");
        btnAjoutPhoto.classList.add("photoBtn");
        btnAjoutPhoto.innerText = "Ajouter une photo";
        portfolioModal.setAttribute("aria-hidden", "false");
        portfolioModal.style.display = "flex";
        feuilleModal.appendChild(iconeCroix);
        feuilleModal.appendChild(titreModalgallery);
        feuilleModal.appendChild(modalgallery);
        feuilleModal.appendChild(barreModal);
        feuilleModal.appendChild(btnAjoutPhoto);
        // Fonction pour la Modal1
        // Fonction création des images modal1
        fetch("http://localhost:5678/api/works")
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    modalcard(element.imageUrl, element.id);
                });
            })
        function modalcard(imgUrl, id) {
            const modalfigure = document.createElement("Modalfigure");
            const modalimg = document.createElement("img");
            const modalTrash = document.createElement("i");
            modalTrash.classList.add("fa-solid", "fa-trash", "fa-xs");
            modalTrash.classList.add("IconeTrash");
            modalimg.crossOrigin = "anonymous";
            modalimg.src = imgUrl;
            modalfigure.dataset.id = id;
            modalfigure.classList.add("ModalFigure");
            modalfigure.appendChild(modalimg);
            modalfigure.appendChild(modalTrash);
            modalgallery.appendChild(modalfigure);
            modalTrash.addEventListener("click", function(e) {
                fetch(`http://localhost:5678/api/works/${modalfigure.dataset.id}`, {
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
                        modalfigure.remove()
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
            modalgallery.innerHTML = "";
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
        btnAjoutPhoto.addEventListener("click", function () {
            document.activeElement.blur(); // enlève le focus
            portfolioModal.setAttribute("aria-hidden", "true");
            portfolioModal.style.display = "none";
            portfolioModal2.setAttribute("aria-hidden", "false");
            portfolioModal2.style.display = "flex";
        // MODAL 2
            // Crée le div pour BoutonNav
            const boutonNav = document.createElement('div');
            boutonNav.id = 'BoutonNav';
            feuilleModal2.appendChild(boutonNav);
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
            const titreModalgallery2 = document.createElement("h3");
            titreModalgallery2.textContent = "Ajout Photo";
            // Création du background "photo"
            const imageFormulaire = document.createElement("img");
            imageFormulaire.src = "./assets/images/image-svgrepo-com-1.png";
            imageFormulaire.alt = "Aperçu image";
            imageFormulaire.className = "preview-icon";
            imageFormulaire.id = "image-formulaire";
            // Création de l'input "photo"
            const photoInput = document.createElement("input");
            photoInput.type = "file";
            photoInput.name = "image";
            photoInput.id = "DocumentImage";
            photoInput.required = true;
            photoInput.accept = "image/jpeg, image/png";
            photoInput.hidden = true;
            const previewImage = document.createElement("img");
            previewImage.classList.add('PreviewImage');
            previewImage.hidden = true;
            formulaire.appendChild(previewImage);
            // Création du label "Ajout photo"
            const labelPhoto = document.createElement("label");
            labelPhoto.setAttribute("for", "input-photo");
            labelPhoto.classList.add("upload-button");
            labelPhoto.innerText = "+ Ajouter photo";
            // Création du bouton "Valider
            const btnValider = document.createElement("button");
            btnValider.classList.add("BtnValider");
            btnValider.innerText = "Valider";
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
            const inputCategorie = document.createElement("select");
            inputCategorie.name = "Categorie";
            inputCategorie.id = "Categorie";
            inputCategorie.required = true;
            const barreModal2 = document.createElement("span");
            barreModal2.classList.add("barreModal");
            // Création des options pour l'input"Catégorie"
            // Option vide/informative
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.hidden = true;
            inputCategorie.appendChild(defaultOption);
            fetch("http://localhost:5678/api/categories")
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    createSubmitList(element.name, element.id);
                });
            })
            function createSubmitList(name, id) {
                const option = document.createElement("option")
                option.value = name;
                option.textContent = name;
                option.dataset.id = id;
                inputCategorie.appendChild(option)
            }
            // Ajout des enfants
            boutonNav.appendChild(iconeRetour);
            boutonNav.appendChild(iconeCroix2);
            titreModal2.appendChild(titreModalgallery2);
            formulaire.appendChild(imageFormulaire);
            formulaire.appendChild(photoInput);
            formulaire.appendChild(labelPhoto);
            formulaire.appendChild(infoText);
            feuilleModal2.appendChild(barreModal2);
            feuilleModal2.appendChild(btnValider);
            formulaireModal2.appendChild(labelTitre);
            formulaireModal2.appendChild(inputTitre);
            formulaireModal2.appendChild(labelCategorie);
            formulaireModal2.appendChild(inputCategorie);
            // FONCTION POUR LA FERMETURE MODAL 2
            function fermetureModal2() {
                portfolioModal2.style.display = "none";
                portfolioModal2.setAttribute("aria-hidden", "true");
                feuilleModal2.innerHTML = "";
            }
            function updateSubmitState() {
            const hasFile    = photoInput.files.length > 0;
            const hasTitle   = inputTitre.value.trim() !== "";
            const hasCategory = [...inputCategorie.options]
                                    .some(opt => opt.value === inputCategorie.value);
            if (hasFile && hasTitle && hasCategory) {
                btnValider.disabled = false;
                btnValider.style.backgroundColor = "#1D6154";
            } else {
                btnValider.disabled = true;
                btnValider.style.backgroundColor = "#A7A7A7";
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
            photoInput.click(); // déclenche l'ouverture du sélecteur de fichier
            });
            photoInput.addEventListener("change", () => {
            const file = photoInput.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewImage.src = e.target.result; // Donne la prévisualisation en base64
                    };
                    previewImage.hidden = false;
                    previewImage.classList.remove('PreviewImage');
                    previewImage.classList.add('PreviewImageUpload');
                    reader.readAsDataURL(file); // Lit le fichier image
                    imageFormulaire.hidden = true;
                    labelPhoto.style.display = "none";
                    infoText.hidden = true;
                }
            });
            photoInput.addEventListener("change", updateSubmitState);
            inputTitre.addEventListener("input",    updateSubmitState);
            inputCategorie.addEventListener("input", updateSubmitState);
            btnValider.addEventListener("click", async () => {
                const file = photoInput.files[0];
                const titreValue = inputTitre.value.trim();
                const selectedOption = [...inputCategorie.options].find(option => option.value === inputCategorie.value);
                const categorieValue = selectedOption ? selectedOption.dataset.id : null;
                const formData = new FormData();
                formData.append("image", file); // ← envoie le fichier tel quel
                formData.append("title", titreValue);
                formData.append("category", categorieValue);
                if (titreValue === "" || categorieValue === "") {
                    alert("Vous devez rentrer un Titre et/ou une catégorie");
                    return;
                }
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
                        alert("Vous devez remplir tous les champs du formulaire.");
                    }
                    if (response.status === 201) {
                        alert("crée")
                        card(data.imageUrl, data.title, data.categoryId, data.id)
                        modalcard(data.imageUrl, data.id)
                        fermetureModal1();
                        fermetureModal2();
                    }
                    return data;
                    })
            })
        })                                               
    })
} else {
    createFilterButtons();
}
/** Fonction pour créer les filtres */
function createFilterButtons() {
    filtres.innerHTML = ""; 
    const btnTous = document.createElement("button");
    btnTous.innerText = "Tous";
    filtres.appendChild(btnTous);
    btnTous.click();
    btnTous.focus();
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                createFilter(element.id, element.name);
            });
        })
    function createFilter(id, name) {
        const btnFiltre = document.createElement("button");
        btnFiltre.textContent = name;
        btnFiltre.dataset.category = id;
        filtres.appendChild(btnFiltre);
        btnFiltre.addEventListener("click", function () {
            const figures = document.querySelectorAll(".gallery figure");
            figures.forEach(fig => {
                fig.style.display = fig.dataset.category === btnFiltre.dataset.category ? "block" : "none";
            });
        });
        btnTous.addEventListener("click", function () {
            const figures = document.querySelectorAll(".gallery figure");
            figures.forEach(fig => {
                fig.style.display = "block";
            });
        });
    }   
}