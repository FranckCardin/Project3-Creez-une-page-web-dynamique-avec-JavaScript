// Connexion à l'API au chemin works
export const dataWorks = await fetch("http://localhost:5678/api/works").then(dataWorks => dataWorks.json()).catch(error => console.info(error));

// Connexion à l'API au chemin categories
export const dataCategories = await fetch("http://localhost:5678/api/categories").then(dataCategories => dataCategories.json()).catch(error => console.info(error));
