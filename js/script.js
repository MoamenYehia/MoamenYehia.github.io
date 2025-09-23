document.addEventListener('DOMContentLoaded', () => {

    // Define your projects data
    const projectsData = {
        "real-estate-app": {
            title: "Real Estate App",
            description: "An interactive mobile application developed with Flutter for browsing and searching properties. It features a sleek user interface, smooth navigation, and advanced filtering options to help users find their ideal home. Integrated with Firebase for backend data storage and authentication.",
            techStack: "Flutter • Firebase • Dart",
            demoLink: "#", // Replace with your actual link
            githubLink: "#", // Replace with your actual link
            images: [
                "assets/projects/real-estate/real-state1.jpg",
                "assets/projects/real-estate/real-state2.jpg",
                "assets/projects/real-estate/real-state3.jpg"
            ]
        },
        "grocery-app": {
            title: "Grocery App",
            description: "A comprehensive e-commerce mobile application for groceries, allowing users to browse items by category, view product details, and manage their shopping cart. The app boasts a clean design and an intuitive interface, making the shopping experience enjoyable and efficient.",
            techStack: "Flutter • Dart",
            demoLink: "#", // Replace with your actual link
            githubLink: "#", // Replace with your actual link
            images: [
                "assets/projects/grocery_app/GroceryApp1.jpg",
            ]
        },
        "meal-app": {
            title: "Meal App",
            description: "A recipe discovery and meal planning mobile application built with Flutter. Users can explore a wide variety of meal recipes, filter by categories and dietary preferences, and view detailed instructions.",
            techStack: "Flutter • Dart",
            demoLink: "#", // Replace with your actual link
            githubLink: "#", // Replace with your actual link
            images: [
                "assets/projects/Meal_app/foodCategories1.jpg",
                "assets/projects/Meal_app/foodCategories2.jpg",
                "assets/projects/Meal_app/foodCategories3.jpg",
                "assets/projects/Meal_app/foodCategories4.jpg",
                "assets/projects/Meal_app/foodCategories5.jpg",
            ]
        },
        "ai-project-1": {
            title: "AI Project Title",
            description: "A placeholder for a future AI project. This could involve natural language processing, computer vision, or predictive modeling to solve a complex problem.",
            techStack: "Python • TensorFlow • Scikit-learn",
            demoLink: "#",
            githubLink: "#",

            images: [
                "assets/images/placeholder-ai.jpg"
            ]
        }
    };

    // --- Individual Project Modal Logic ---
    const projectModal = document.getElementById('project-modal');
    const projectModalCloseButton = projectModal.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-project-title');
    const modalDescription = document.getElementById('modal-project-description');
    const modalTech = document.getElementById('modal-project-tech');
    const modalDemoLink = document.getElementById('modal-demo-link');
    const modalGithubLink = document.getElementById('modal-github-link');
    const galleryInner = projectModal.querySelector('.gallery-inner');
    const galleryPrevBtn = projectModal.querySelector('.gallery-nav.prev');
    const galleryNextBtn = projectModal.querySelector('.gallery-nav.next');

    let currentImageIndex = 0;
    let currentProjectImages = [];

    function openProjectModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalTech.textContent = project.techStack;
        modalDemoLink.href = project.demoLink;
        modalGithubLink.href = project.githubLink;

        galleryInner.innerHTML = '';
        currentProjectImages = project.images;
        currentProjectImages.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = project.title + " screenshot";
            galleryInner.appendChild(img);
        });
        
        currentImageIndex = 0;
        updateGalleryPosition();
        
        projectModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        projectModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function updateGalleryPosition() {
        if (galleryInner.children.length === 0) return;
        const imageWidth = galleryInner.clientWidth;
        galleryInner.style.transform = `translateX(-${currentImageIndex * imageWidth}px)`;
        galleryPrevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
        galleryNextBtn.style.display = currentImageIndex < currentProjectImages.length - 1 ? 'block' : 'none';
    }

    projectModalCloseButton.addEventListener('click', closeProjectModal);
    galleryPrevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateGalleryPosition();
        }
    });
    galleryNextBtn.addEventListener('click', () => {
        if (currentImageIndex < currentProjectImages.length - 1) {
            currentImageIndex++;
            updateGalleryPosition();
        }
    });

    // --- Category Modal Logic ---
    const categoryModal = document.getElementById('category-modal');
    const categoryModalCloseButton = categoryModal.querySelector('.close-button');
    const categoryModalTitle = document.getElementById('category-modal-title');
    const categoryModalProjectsContainer = document.getElementById('category-modal-projects');

    function openCategoryModal(category) {
        let title = "";
        let projectsToShow = [];

        if (category === "mobile-apps") {
            title = "Mobile Apps (Flutter)";
            projectsToShow = Object.keys(projectsData)
                .filter(id => projectsData[id].techStack.includes("Flutter"))
                .map(id => ({ id, ...projectsData[id] }));
        } else if (category === "ai-ml-projects") {
            title = "AI/Machine Learning Projects";
            projectsToShow = Object.keys(projectsData)
                .filter(id => projectsData[id].techStack.includes("Python"))
                .map(id => ({ id, ...projectsData[id] }));
        }

        categoryModalTitle.textContent = title;
        categoryModalProjectsContainer.innerHTML = '';

        if (projectsToShow.length === 0) {
            categoryModalProjectsContainer.innerHTML = `<p class="no-projects-message">Projects coming soon!</p>`;
        } else {
            projectsToShow.forEach(project => {
                const card = document.createElement('div');
                card.classList.add('project-card');
                card.dataset.projectId = project.id;

                card.innerHTML = `
                    <img src="${project.images[0]}" alt="${project.title}" class="project-thumbnail">
                    <div class="project-info">
                        <h4>${project.title}</h4>
                        <p>${project.description.substring(0, 80)}...</p>
                        <div class="tech-stack">${project.techStack}</div>
                    </div>
                `;
                categoryModalProjectsContainer.appendChild(card);

                card.addEventListener('click', () => {
                    closeCategoryModal();
                    // Use a short delay to allow the first modal to close smoothly
                    setTimeout(() => {
                        openProjectModal(project.id);
                    }, 200);
                });
            });
        }
        
        categoryModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeCategoryModal() {
        categoryModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.category-folder').forEach(folder => {
        folder.addEventListener('click', () => {
            const category = folder.dataset.category;
            openCategoryModal(category);
        });
    });

    categoryModalCloseButton.addEventListener('click', closeCategoryModal);

    // --- Global Modal Closing Logic ---
    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            closeProjectModal();
        }
        if (event.target === categoryModal) {
            closeCategoryModal();
        }
    });

    window.addEventListener('resize', updateGalleryPosition);
});