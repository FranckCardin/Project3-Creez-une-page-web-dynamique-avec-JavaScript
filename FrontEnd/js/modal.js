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
portofolioArticle.appendChild(btnEditModalIntroArticle);

const iconeEditArticle = document.createElement("i");
iconeEditArticle.className = "fa-regular fa-pen-to-square";
btnEditModalIntroArticle.appendChild(iconeEditArticle);

// FONCTION UTILISATEUR CONNECTER ET AFFICHAGE MODAL
const adminModal = function() {
    if (token) {
        // Affichage elements
        const displayModalNav = document.querySelector('.displayModalNav');
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
                                    contentModal(dataWorks);
                                }else{
                                    throw new Error("Erreur lors de la suppression du projet");
                                }
                            })
                        }
                    });

                //const iconArrow = document.createElement("i");
                    //iconArrow.className = "fa-solid fa-arrows-up-down-left-right";
                    //imageElement[1].appendChild(iconArrow);
                
                const nameElement = document.createElement("figcaption");
                    nameElement.innerText = "éditer";
                    dataGallery.appendChild(nameElement);
            }
        }
        contentModal(dataWorks);
        
        // Ajouter un projet
        const addProjects = document.createElement("input");
            addProjects.className = "add-project";
            addProjects.type = "submit";
            addProjects.value = "Ajouter une photo";
            modalGallery.appendChild(addProjects);
        
        // Supprimer tous les projets
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
            titleModalAddProject.className = "title-add-project";
            titleModalAddProject.innerHTML = "Ajout photo";
            modalAddProject.appendChild(titleModalAddProject);


        // Ouverture modal ajouter projet
        const openModalAddProjet = document.querySelector(".add-project");
            openModalAddProjet.addEventListener("click", function (event) {
                overlay.style.display = "block";
                modalGallery.style.display = "none";
                modalAddProject.style.display = "inline";
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
