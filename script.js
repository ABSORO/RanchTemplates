
function loadTemplateAndRender() {
    const canvas = document.getElementById("posterCanvas");
    const ctx = canvas.getContext("2d");
    const template = new Image();
    template.src = "wantedtemplate.png";

    template.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
        updatePoster();
    };
}

function updatePoster() {
    const canvas = document.getElementById("posterCanvas");
    const ctx = canvas.getContext("2d");
    
    // Clear the canvas and re-render template
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const template = new Image();
    template.src = "wantedtemplate.png";

    template.onload = () => {
        ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

        const name = document.getElementById('name').value;
        const charges = document.getElementById('charges').value;
        const reward = document.getElementById('reward').value;
        const uploadedImage = document.getElementById('uploadImage').files[0];
        const filter = document.getElementById('filter').value;

        // Draw text on canvas
        ctx.font = "28px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(name, 200, 80); // Position adjusted for template alignment
        
        ctx.font = "20px Arial";
        ctx.fillText(charges, 150, 450); // Position adjusted for template alignment
        
        ctx.font = "18px Arial";
        ctx.fillText(reward, 200, 500); // Position adjusted for template alignment

        // Handle uploaded image
        if (uploadedImage) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.src = event.target.result;
                img.onload = function() {
                    if (filter === "sepia") {
                        ctx.filter = "sepia(1)";
                    } else if (filter === "faded") {
                        ctx.globalAlpha = 0.7;
                    } else {
                        ctx.filter = "none";
                    }
                    ctx.drawImage(img, 100, 120, 300, 300); // Position adjusted for template alignment
                    ctx.globalAlpha = 1.0; // Reset transparency
                    ctx.filter = "none"; // Reset filter
                };
            };
            reader.readAsDataURL(uploadedImage);
        }
    };
}

function downloadPoster() {
    const canvas = document.getElementById("posterCanvas");
    const link = document.createElement("a");
    link.download = "wanted_poster.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

// Update poster preview on input change
document.getElementById("name").addEventListener("input", updatePoster);
document.getElementById("charges").addEventListener("input", updatePoster);
document.getElementById("reward").addEventListener("input", updatePoster);
document.getElementById("uploadImage").addEventListener("change", updatePoster);
document.getElementById("filter").addEventListener("change", updatePoster);

// Load template on page load
window.onload = loadTemplateAndRender;
