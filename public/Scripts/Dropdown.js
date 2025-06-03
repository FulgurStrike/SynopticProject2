// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get elements related to the menu
    // The 'profileMenuTrigger' is the specific element on this page that opens the menu.
    
    const openTrigger = document.getElementById('profileMenuTrigger');
    const closeButton = document.getElementById('closeMenuButton');
    const menuElement = document.getElementById('fullscreenMenu');
    const body = document.body;

    // Function to open the menu
    function openMenu() {
        if (menuElement) {
            menuElement.style.display = 'flex'; // Show the menu
        }
        if (body) {
            body.classList.add('body-no-scroll'); // Prevent body scrolling
        }
    }

    // Function to close the menu
    function closeMenu() {
        if (menuElement) {
            menuElement.style.display = 'none'; // Hide the menu
        }
        if (body) {
            body.classList.remove('body-no-scroll'); // Restore body scrolling
        }
    }

    // --- Event Listeners ---


    if (openTrigger) {
        openTrigger.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default action if the trigger is a link
            openMenu();
        });
    }

    if (closeButton && menuElement) {
        // Close when the close button is clicked
        closeButton.addEventListener('click', closeMenu);

        // Close when clicking on the menu overlay itself (but not its content)
        menuElement.addEventListener('click', (event) => {
            if (event.target === menuElement) { // Check if the click is directly on the overlay
                closeMenu();
            }
        });

        // Close when the 'Escape' key is pressed
        document.addEventListener('keydown', (event) => {
            // Check if the menu is currently displayed (flex) and Escape key is pressed
            if (event.key === 'Escape' && menuElement.style.display === 'flex') {
                closeMenu();
            }
        });
    } else {
        // Log errors if essential menu components are missing, as the menu won't function correctly.
        if (!menuElement) {
            console.error("Fullscreen menu container (#fullscreenMenu) not found. Menu cannot operate.");
        }
        if (!closeButton && menuElement) { // Only warn if menu exists but its close button doesn't
             console.warn("Close button (#closeMenuButton) for fullscreen menu not found.");
        }
    }
});
