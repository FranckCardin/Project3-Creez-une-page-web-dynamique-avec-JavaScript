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
        const modal = document.createElement("aside");
        modal.className = "modal";
        projets.appendChild(modal);
        
        // Ouverture Modal
        const openModal = document.querySelector(".btn-edit");
        openModal.addEventListener("click", function (event) {
            overlay.style.display = "block";
            modal.style.display = "inline";
        });
        
        // Creation du contenu de la modal        
        const closeModal = document.createElement("button");
        closeModal.className = "close-modal";
        modal.appendChild(closeModal);
        
        const iconeCloseModal = document.createElement("i");
        iconeCloseModal.className = "fa-solid fa-xmark";
        closeModal.appendChild(iconeCloseModal);
        
        const titleModal = document.createElement("h3");
        titleModal.className = "title";
        titleModal.innerHTML = "Galerie Photo"
        modal.appendChild(titleModal);
        
        
        // Recuperation des projets
        const modalContent = document.createElement("div");
        modalContent.className = "list-projects"
        modal.appendChild(modalContent);
        
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
        modal.appendChild(addProjects);
        
        // Supprimer tous les projets
        const deleteProjects = document.createElement("a");
        deleteProjects.className = "delete-all";
        deleteProjects.innerHTML = " Supprimer la galerie"
        modal.appendChild(deleteProjects);
        
        // Fermeture Modal
        const btnClose = document.querySelector(".close-modal");
        btnClose.addEventListener("click", function (event) {
            overlay.style.display = "none";
            modal.style.display = "none";
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