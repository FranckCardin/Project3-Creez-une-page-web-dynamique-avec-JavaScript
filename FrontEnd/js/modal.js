import {dataWorks, dataCategories} from "./loginAPI.js";

const token = sessionStorage.getItem("token");

// CREATION MODAL EDITION/PUBLISH
const header = document.querySelector('header');
const modalNav = document.createElement("div");
modalNav.className = "modal-nav displayModalNav";
header.appendChild(modalNav);

const edition = document.createElement("p");
edition.className = "edition";
edition.innerHTML = "Mode édition";
modalNav.appendChild(edition);

const iconeEdition = document.createElement("i");
iconeEdition.className = "fa-regular fa-pen-to-square";
edition.appendChild(iconeEdition);

const btnPublish = document.createElement("button");
btnPublish.className = "btn-publish";
btnPublish.innerHTML = "Publier les changements";
modalNav.appendChild(btnPublish);

// CREATION BOUTON MODIFIER INTRODUCTION
const portofolioImg = document.querySelector("#introduction figure")
const btnEditIntroImg = document.createElement("button");
btnEditIntroImg.className = "modal-btn displayBtnEditIntroImg btn-edit-img";
btnEditIntroImg.innerHTML = "modifier";
portofolioImg.appendChild(btnEditIntroImg);

const iconeEditImg = document.createElement("i");
iconeEditImg.className = "fa-regular fa-pen-to-square";
btnEditIntroImg.appendChild(iconeEditImg);

const portofolioArticle = document.querySelector("#introduction article")
const btnEditModalIntroArticle = document.createElement("button");
btnEditModalIntroArticle.className = "modal-btn displayBtnEditIntroArticle btn-edit-article";
btnEditModalIntroArticle.innerHTML = "modifier";
portofolioArticle.prepend(btnEditModalIntroArticle);

const iconeEditArticle = document.createElement("i");
iconeEditArticle.className = "fa-regular fa-pen-to-square";
btnEditModalIntroArticle.appendChild(iconeEditArticle);

// FONCTION UTILISATEUR CONNECTER ET AFFICHAGE MODAL
const adminModal = function() {
    if (token) {
        // Affichage elements
        const displayModalNav = document.querySelector('.displayModalNav');
        header.style.marginTop = "60px";
        displayModalNav.style.display = "flex";
        const displayModalEditImg = document.querySelector('.displayBtnEditIntroImg');
        displayModalEditImg.style.display = "flex";
        const displayModalEditArticle = document.querySelector('.displayBtnEditIntroArticle');
        displayModalEditArticle.style.display = "flex";
        const displayFilters = document.querySelector(".filters");
        displayFilters.style.display = "none";
        
        const projets = document.querySelector(".projets");

        // Creation bouton modifier et icone
        const btnEditModal = document.createElement("button");
        btnEditModal.className = "modal-btn displayBtnEdit btn-edit";
        btnEditModal.innerHTML = "modifier";
        btnEditModal.style.display = "flex";
        projets.appendChild(btnEditModal);
        
        const iconeEdit = document.createElement("i");
        iconeEdit.className = "fa-regular fa-pen-to-square";
        btnEditModal.appendChild(iconeEdit);

        // MODAL
        // Creation overlay
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        projets.appendChild(overlay);
        
        // Creation modal
        const modalGallery = document.createElement("aside");
        modalGallery.className = "modal";
        projets.appendChild(modalGallery);
        
        // Ouverture Modal
        const openModalGallery = document.querySelector(".btn-edit");
        openModalGallery.addEventListener("click", function (event) {
            overlay.style.display = "block";
            modalGallery.style.display = "inline";
        });
        
        //MODAL GALLERY
        // Creation du contenu de la modal        
        const closeModalGallery = document.createElement("button");
        closeModalGallery.className = "close-modal-gallery";
        modalGallery.appendChild(closeModalGallery);
        
        const iconeCloseModalGallery = document.createElement("i");
        iconeCloseModalGallery.className = "fa-solid fa-xmark";
        closeModalGallery.appendChild(iconeCloseModalGallery);
        
        const titleModalGallery = document.createElement("h3");
        titleModalGallery.className = "title-modal-gallery";
        titleModalGallery.innerHTML = "Galerie Photo"
        modalGallery.appendChild(titleModalGallery);
        
        
        // Recuperation des projets
        const modalContent = document.createElement("div");
        modalContent.className = "list-projects"
        modalGallery.appendChild(modalContent);
        
        function contentModal(dataWorks) {
            for (let i = 0; i < dataWorks.length; i++) {
                
                // Creation de la balise figure
                const dataGallery = document.createElement("figure");
                // Rattache la balise figure à la div gallery
                    modalContent.appendChild(dataGallery);
                
                const imageElement = document.createElement('img');
                    imageElement.src = dataWorks[i].imageUrl;
                    imageElement.alt = dataWorks[i].title;
                    dataGallery.appendChild(imageElement);
                
                //Creation icone poubelle + function suppression un projet
                const btnBin = document.createElement("i");
                    btnBin.className = "fa-solid fa-trash-can";
                    btnBin.id = dataWorks[i].id;
                    dataGallery.appendChild(btnBin);
                    // SUPPRESSION UN PROJET
                    btnBin.addEventListener("click", function (event){
                        const confirmDelete = confirm("Voulez-vous vraiment supprimer ce projet ?");
                        if(confirmDelete){
                            fetch("http://localhost:5678/api/works/" + btnBin.id, {
                            method: 'DELETE',
                            headers: { Authorization: 'Bearer ' + token},
                            })
                            .then((response) => {
                                if (response.ok) {
                                    alert("Projet supprimé avec succès !");
                                }else{
                                    throw new Error("Erreur lors de la suppression du projet");
                                }
                            })
                        }

                    });
                
                const nameElement = document.createElement("figcaption");
                    nameElement.innerText = "éditer";
                    dataGallery.appendChild(nameElement);
            }
        }
        contentModal(dataWorks);

        /*
        const iconArrow = document.createElement("i");
                iconArrow.className = "fa-solid fa-arrows-up-down-left-right";
                dataGallery.firstChild.appendChild(iconArrow);
        */

        const addProjects = document.createElement("input");
            addProjects.className = "add-project";
            addProjects.type = "submit";
            addProjects.value = "Ajouter une photo";
            modalGallery.appendChild(addProjects);

        const deleteProjects = document.createElement("a");
            deleteProjects.className = "delete-all";
            deleteProjects.innerHTML = " Supprimer la galerie"
            modalGallery.appendChild(deleteProjects);

        // MODAL AJOUT PROJET
        // Creation modal ajout projet
        const modalAddProject = document.createElement("aside");
            modalAddProject.className = "modal";
            projets.appendChild(modalAddProject);

        const BackModalAddProject = document.createElement("button");
            BackModalAddProject.className = "btn-back-modal-add-project";
            modalAddProject.appendChild(BackModalAddProject);

        const iconeBack = document.createElement("i");
            iconeBack.className = "fa-solid fa-arrow-left";
            BackModalAddProject.appendChild(iconeBack);

        const closeModalAddProject = document.createElement("button");
            closeModalAddProject.className = "close-modal-add-project";
            modalAddProject.appendChild(closeModalAddProject);

        const iconeCloseModalAddProject = document.createElement("i");
            iconeCloseModalAddProject.className = "fa-solid fa-xmark";
            closeModalAddProject.appendChild(iconeCloseModalAddProject);

        const titleModalAddProject = document.createElement("h3");
            titleModalAddProject.className = "title-modal-add-project";
            titleModalAddProject.innerHTML = "Ajout photo";
            modalAddProject.appendChild(titleModalAddProject);

        const formAddProject = document.createElement("form");
            formAddProject.className = "form-add-project";
            formAddProject.enctype = "multipart/form-data";
            formAddProject.method = "post";
            modalAddProject.appendChild(formAddProject);

        const contentAddPhoto = document.createElement("div");
            contentAddPhoto.className = "content-add-photo";
            formAddProject.appendChild(contentAddPhoto);

        const iconAddPhoto = document.createElement("i");
            iconAddPhoto.className = "icon-add-photo fa-regular fa-image";
            contentAddPhoto.appendChild(iconAddPhoto);

        const labelAddPhoto = document.createElement("label");
            labelAddPhoto.className = "label-add-photo";
            labelAddPhoto.setAttribute("for", "input-add-photo");
            labelAddPhoto.innerHTML = "+ Ajouter photo";
            contentAddPhoto.appendChild(labelAddPhoto);

        const inputAddPhoto = document.createElement("input");
            inputAddPhoto.id = "input-add-photo";
            inputAddPhoto.type = "file";
            inputAddPhoto.accept = ".jpeg, .png";
            inputAddPhoto.setAttribute("max-size", "4000000");
            contentAddPhoto.appendChild(inputAddPhoto);

        const descriptionAddPhoto = document.createElement("p");
            descriptionAddPhoto.className = "description-add-photo";
            descriptionAddPhoto.innerHTML = "jpg, png : 4mo max";
            contentAddPhoto.appendChild(descriptionAddPhoto);

            // preview de l'image
        inputAddPhoto.addEventListener("change", function () {
            if (inputAddPhoto.files && inputAddPhoto.files[0]) {
                const reader = new FileReader();
                const previewImg = document.createElement("img");
                    previewImg.className = "preview-img";

                reader.onload = event => {
                    previewImg.src = event.target.result;
                    previewImg.style.height = "170px";
                    previewImg.style.width = "150px";
                };

                iconAddPhoto.style.display = "none";
                labelAddPhoto.style.display = "none";
                inputAddPhoto.style.display = "none";
                descriptionAddPhoto.style.display = "none";
                reader.readAsDataURL(inputAddPhoto.files[0]);
                contentAddPhoto.appendChild(previewImg);
            }
        });

        const labelTitle = document.createElement("label");
            labelTitle.className = "title-add-project";
            labelTitle.setAttribute("for", "title-add-project");
            labelTitle.innerHTML = "Titre";
            formAddProject.appendChild(labelTitle);

        const inputTitle = document.createElement("input");
            inputTitle.id = "title-add-project";
            inputTitle.type = "text";
            inputTitle.required = true;
            formAddProject.appendChild(inputTitle);

        const labelCategorie = document.createElement("label");
            labelCategorie.className = "categorie-add-project";
            labelCategorie.for = "categorie-add-project";
            labelCategorie.innerHTML = "Catégorie";
            formAddProject.appendChild(labelCategorie);

        const selectCategorie = document.createElement("select");
            selectCategorie.id = "categorie-add-project";
            formAddProject.appendChild(selectCategorie);

        // Ajout d'une option vide
        const emptyFirstOption = document.createElement("option");
        selectCategorie.appendChild(emptyFirstOption);
        for (let i = 0; i < dataCategories.length; i++) {
            // Création des balises "OPTION".
            const categoryListModaleOptions = document.createElement("option");
            categoryListModaleOptions.value = dataCategories[i].id;
            categoryListModaleOptions.innerText = dataCategories[i].name;
            selectCategorie.appendChild(categoryListModaleOptions);
        };

        const inputValider = document.createElement("input");
            inputValider.className = "input-valider";
            inputValider.type = "submit";
            inputValider.value = "Valider";
            formAddProject.appendChild(inputValider);

            // MODIFICATION COULEUR BTN VALIDER SI CHAMPS REMPLI
       if (contentAddPhoto.files && inputTitle.value && selectCategorie.value){
            inputValider.style.backgroundColor ='#1D6154';
        }
        else{
            inputValider.style.backgroundColor = "#A7A7A7";
        };


            // AJOUT D'UN PROJET
        formAddProject.addEventListener("submit", function (event) {
            event.preventDefault();
            const dataForm = new FormData();
                dataForm.append("image", inputAddPhoto.files[0]);
                dataForm.append("title", inputTitle.value);
                dataForm.append("category", selectCategorie.value);

            fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: { Authorization: 'Bearer ' + token},
                body: dataForm
            })
            .then((res) => {
              if (res.ok) {
                alert("Projet ajouté !");
                return res.json();
              } else {
                throw new Error(res.statusText);
              }
            })
            .catch((error) => {
              alert(error);
            });
        });

            // OUVERTURE ET FERMETURE MODAL
        // Ouverture modal ajouter projet
        const openModalAddProjet = document.querySelector(".add-project");
            openModalAddProjet.addEventListener("click", function (event) {
                overlay.style.display = "block";
                modalGallery.style.display = "none";
                modalAddProject.style.display = "flex";
            });

        // Retour modal gallery icone
        const backModalGallery = document.querySelector(".btn-back-modal-add-project");
            backModalGallery.addEventListener("click", function (event) {
                overlay.style.display = "block";
                modalGallery.style.display = "inline";
                modalAddProject.style.display = "none";
            });

        
        // Fermeture Modal Gallery par la croix
        const btnCloseModalGallery = document.querySelector(".close-modal-gallery");
            btnCloseModalGallery.addEventListener("click", function (event) {
                overlay.style.display = "none";
                modalGallery.style.display = "none";
            });
        
        // Fermeture Modal ajouter projet par la croix
        const btnCloseModalAddProject = document.querySelector(".close-modal-add-project");
            btnCloseModalAddProject.addEventListener("click", function (event) {
                overlay.style.display = "none";
                modalAddProject.style.display = "none";
            });

        // Fermeture Modal par l'overlay
        const overlayClose = document.querySelector(".overlay");
            overlayClose.addEventListener("click", function (event) {
                overlay.style.display = "none";
                modalGallery.style.display = "none";
                modalAddProject.style.display = "none";
            });

        // Modification du login en logout
        document.getElementById("login").innerHTML = "logout";

        // Effacement du sessionStorage quand l'utilisateur se déconnecte 
        document.getElementById("login").addEventListener("click", function logout(){
            window.sessionStorage.removeItem('token');
            window.sessionStorage.removeItem('userId');
            location.href = "../html/index.html";
        });
        }else{
        document.getElementById("login").addEventListener("click", function login(){
            location.href = "../html/login.html";
        });
    }
};

adminModal();
