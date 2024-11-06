
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
        const opacityName = document.getElementById('opacityName').value;
        const opacityCharges = document.getElementById('opacityCharges').value;
        const opacityReward = document.getElementById('opacityReward').value;

        // Apply new font and red color with individual opacities
        ctx.font = "bold 32px 'AA Typewriter'";
        ctx.fillStyle = `rgba(139, 0, 0, ${opacityName})`;
        ctx.textAlign = "center";

        // Draw name text under "WANTED" heading
        ctx.fillText(name, canvas.width / 2, 120);

        // Draw charges under "WANTED FOR" section, handling multiple lines
        ctx.font = "20px 'AA Typewriter'";
        ctx.fillStyle = `rgba(139, 0, 0, ${opacityCharges})`;
        const chargeLines = charges.split("\n");
        chargeLines.forEach((line, index) => {
            ctx.fillText(line, canvas.width / 2, 460 + (index * 24));
        });

        // Draw reward text
        ctx.font = "24px 'AA Typewriter'";
        ctx.fillStyle = `rgba(139, 0, 0, ${opacityReward})`;
        ctx.fillText(reward, canvas.width / 2, 520);

        // Handle uploaded image with scaling to fit the designated area
        if (uploadedImage) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.src = event.target.result;
                img.onload = function() {
                    ctx.drawImage(img, 100, 150, 300, 300); // Positioned image within the white box
                };
            };
            reader.readAsDataURL(uploadedImage);
        }
    };
}

// Toggle sepia filter for canvas
function toggleSepia() {
    const canvas = document.getElementById("posterCanvas");
    const ctx = canvas.getContext("2d");
    ctx.filter = ctx.filter === "sepia(1)" ? "none" : "sepia(1)";
    updatePoster();
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
    document.getElementById('opacityName').value = "1";
    document.getElementById('opacityCharges').value = "1";
    document.getElementById('opacityReward').value = "1";
    document.getElementById("posterCanvas").style.filter = "none"; // Reset filter
    updatePoster();
}

// Update poster preview on input change
document.getElementById("name").addEventListener("input", updatePoster);
document.getElementById("charges").addEventListener("input", updatePoster);
document.getElementById("reward").addEventListener("input", updatePoster);
document.getElementById("uploadImage").addEventListener("change", updatePoster);
document.getElementById("opacityName").addEventListener("input", updatePoster);
document.getElementById("opacityCharges").addEventListener("input", updatePoster);
document.getElementById("opacityReward").addEventListener("input", updatePoster);

// Load template on page load
window.onload = loadTemplateAndRender;
