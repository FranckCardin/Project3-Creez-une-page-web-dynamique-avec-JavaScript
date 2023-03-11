import {dataWorks, dataCategories} from "./loginAPI.js";

const token = sessionStorage.getItem("token");
console.log(token);

const adminModal = function() {
    if (token) {
        // Afficher et disparaitre elements
        const displayModalNav = document.querySelector('.displayModalNav');
        displayModalNav.style.display = "flex";
        const displayFilters = document.querySelector(".filters");
        displayFilters.style.display = "none";
        
        const projets = document.querySelector(".projets");

        // Creation du bouton modifier et de l'icone
        const btnEdit = document.createElement("button");
        btnEdit.className = "modal-btn modal-js displayBtnEdit btn-edit";
        btnEdit.innerHTML = "modifier";
        btnEdit.style.display = "flex";
        projets.appendChild(btnEdit);
        
        const iconeEdit = document.createElement("i");
        iconeEdit.className = "fa-regular fa-pen-to-square";
        btnEdit.appendChild(iconeEdit);

        // Creation de l'overlay
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        projets.appendChild(overlay);
        
        // Creation de la modal
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
                
                //Creation icone poubelle
                const btnBin = document.createElement("i");
                btnBin.className = "fa-solid fa-trash-can";
                dataGallery.appendChild(btnBin);
                
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

        //MODAL AJOUT PROJET
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
