
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
        const opacity = document.getElementById('opacity').value;

        // Apply font and color
        ctx.font = "bold 32px 'Serial Publication'";
        ctx.fillStyle = "rgba(139, 0, 0," + opacity + ")"; // Red color with adjustable opacity
        ctx.textAlign = "center";

        // Draw name text under "WANTED" heading
        ctx.fillText(name, canvas.width / 2, 120);

        // Draw charges under "WANTED FOR" section, handling multiple lines
        ctx.font = "20px 'Serial Publication'";
        const chargeLines = charges.split("\n");
        chargeLines.forEach((line, index) => {
            ctx.fillText(line, canvas.width / 2, 460 + (index * 24));
        });

        // Draw reward text
        ctx.font = "24px 'Serial Publication'";
        ctx.fillText(reward, canvas.width / 2, 520);

        // Handle uploaded image with scaling to fit the designated area
        if (uploadedImage) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.src = event.target.result;
                img.onload = function() {
                    ctx.filter = filter === "sepia" ? "sepia(1)" : "none";
                    ctx.drawImage(img, 100, 150, 300, 300);
                    ctx.filter = "none"; // Reset filter after drawing
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

// Reset all fields to default values
function resetPoster() {
    document.getElementById('name').value = "";
    document.getElementById('charges').value = "";
    document.getElementById('reward').value = "";
    document.getElementById('uploadImage').value = "";
    document.getElementById('filter').value = "none";
    document.getElementById('opacity').value = "1";
    updatePoster();
}

// Update poster preview on input change
document.getElementById("name").addEventListener("input", updatePoster);
document.getElementById("charges").addEventListener("input", updatePoster);
document.getElementById("reward").addEventListener("input", updatePoster);
document.getElementById("uploadImage").addEventListener("change", updatePoster);
document.getElementById("filter").addEventListener("change", updatePoster);
document.getElementById("opacity").addEventListener("input", updatePoster);

// Load template on page load
window.onload = loadTemplateAndRender;
