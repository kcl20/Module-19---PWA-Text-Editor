const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        installBtn.style.visibility = 'visible';
        textHeader.textContent = 'Click to install this app';

        installBtn.addEventListener('click', () => {
        event.prompt();
        installBtn.setAttribute('disabled', true);
        installBtn.textContent = 'Installed';
        });

        window.addEventListener('appinstalled', () => {
        installBtn.setAttribute('disabled', true);
        installBtn.textContent = 'Installed';
        });

        // Store the triggered events
        window.deferredPrompt = event;

        // Remove the hidden class from the button.
        butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
     return;
    }
  
    // Show prompt
    promptEvent.prompt();
    
    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;
    
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
     // Clear prompt
  window.deferredPrompt = null;
});
