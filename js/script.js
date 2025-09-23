// Define your projects data
const projectsData = {
    "real-estate-app": {
        title: "Real Estate App",
        description: "An interactive mobile application developed with Flutter for browsing and searching properties. It features a sleek user interface, smooth navigation, and advanced filtering options to help users find their ideal home. Integrated with Firebase for backend data storage and authentication.",
        techStack: "Flutter • Firebase • Dart",
        demoLink: "https://example.com/real-estate-demo", // Replace with actual link
        githubLink: "https://github.com/MoamenYehia/real-estate-app", // Replace with actual link
        images: [
            "assets/images/real-state1.jpg",
            "assets/images/real-state2.jpg", // Add more images here (you'll need to create them)
            "assets/images/real-state3.jpg"
        ]
    },
    "grocery-app": {
        title: "Grocery App",
        description: "A comprehensive e-commerce mobile application for groceries, allowing users to browse items by category, view product details, and manage their shopping cart. The app boasts a clean design and an intuitive interface, making the shopping experience enjoyable and efficient. Developed with Flutter for cross-platform compatibility.",
        techStack: "Flutter • Dart",
        demoLink: "https://example.com/grocery-demo", // Replace with actual link
        githubLink: "https://github.com/MoamenYehia/grocery-app", // Replace with actual link
        images: [
            "assets/images/grocery1.jpg",
            "assets/images/grocery2.jpg",
            "assets/images/grocery3.jpg"
        ]
    },
    "meal-app": {
        title: "Meal App",
        description: "A recipe discovery and meal planning mobile application built with Flutter. Users can explore a wide variety of meal recipes, filter by categories (e.g., Quick & Easy, Healthy), dietary preferences (Vegetarian, Vegan), and view detailed instructions and ingredients. Designed for culinary enthusiasts and those seeking new cooking ideas.",
        techStack: "Flutter • Dart",
        demoLink: "https://example.com/meal-app-demo", // Replace with actual link
        githubLink: "https://github.com/MoamenYehia/meal-app", // Replace with actual link
        images: [
            "assets/images/meal1.jpg",
            "assets/images/meal2.jpg",
            "assets/images/meal3.jpg"
        ]
    },
    // Add data for your AI projects here when you create them
    "ai-project-1": {
        title: "AI Chatbot",
        description: "A simple AI-powered chatbot demonstrating natural language processing capabilities. Built using Python and a deep learning framework to understand user queries and provide relevant responses.",
        techStack: "Python • TensorFlow • NLP",
        demoLink: "#",
        githubLink: "#",
        images: [
            "assets/images/placeholder-ai.jpg"
        ]
    }
};

// Get modal elements
const projectModal = document.getElementById('project-modal');
const closeButton = projectModal.querySelector('.close-button');
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

// Function to open the modal
function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTech.textContent = project.techStack;
    modalDemoLink.href = project.demoLink;
    modalGithubLink.href = project.githubLink;

    // Load images into the gallery
    galleryInner.innerHTML = ''; // Clear previous images
    currentProjectImages = project.images;
    currentProjectImages.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = project.title + " screenshot";
        galleryInner.appendChild(img);
    });

    currentImageIndex = 0;
    updateGalleryPosition();

    projectModal.style.display = 'flex'; // Use flex to center
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close the modal
function closeProjectModal() {
    projectModal.style.display = 'none';
    document.body.style.overflow = ''; // Restore background scrolling
}

// Function to update image gallery position
function updateGalleryPosition() {
    const imageWidth = galleryInner.children[0].clientWidth; // Assuming all images have same width
    galleryInner.style.transform = `translateX(-${currentImageIndex * imageWidth}px)`;

    // Hide/show navigation buttons based on current image
    galleryPrevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
    galleryNextBtn.style.display = currentImageImages.length > 1 && currentImageIndex < currentProjectImages.length - 1 ? 'block' : 'none';

}


// Event Listeners
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (event) => {
        // Only open modal if the click wasn't on a button link
        if (!event.target.classList.contains('btn')) {
            const projectId = card.dataset.projectId;
            openProjectModal(projectId);
        }
    });
});

closeButton.addEventListener('click', closeProjectModal);

// Close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === projectModal) {
        closeProjectModal();
    }
});

// Gallery navigation
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

// Optional: Recalculate gallery position on window resize
window.addEventListener('resize', updateGalleryPosition);