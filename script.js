
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

        // Draw name text under "WANTED" heading
        ctx.font = "bold 32px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.fillText(name, canvas.width / 2, 120); // Centered below "WANTED"

        // Draw charges under "WANTED FOR" section, handling multiple lines
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        const chargeLines = charges.split("\n"); // Split by new lines
        chargeLines.forEach((line, index) => {
            ctx.fillText(line, canvas.width / 2, 460 + (index * 24)); // Adjusted line height
        });

        // Draw reward text
        ctx.font = "24px Arial";
        ctx.fillText(reward, canvas.width / 2, 520); // Positioned below charges

        // Handle uploaded image with scaling to fit the designated area
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
                    // Scale the image to fit into 300x300 area on the poster
                    const imgWidth = 300;
                    const imgHeight = 300;
                    ctx.drawImage(img, 100, 150, imgWidth, imgHeight); // Adjusted position and size for template alignment
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
    
    // Create a larger canvas for download at the original template size (assumed 1000x1200)
    const downloadCanvas = document.createElement("canvas");
    downloadCanvas.width = 1000;
    downloadCanvas.height = 1200;
    const downloadCtx = downloadCanvas.getContext("2d");

    const template = new Image();
    template.src = "wantedtemplate.png";
    template.onload = () => {
        downloadCtx.drawImage(template, 0, 0, downloadCanvas.width, downloadCanvas.height);

        // Copy name, charges, reward, and uploaded image to the full-size canvas
        downloadCtx.font = "bold 64px Arial";
        downloadCtx.fillStyle = "#000000";
        downloadCtx.textAlign = "center";
        downloadCtx.fillText(document.getElementById('name').value, downloadCanvas.width / 2, 200);

        downloadCtx.font = "40px Arial";
        const chargeLines = document.getElementById('charges').value.split("\n");
        chargeLines.forEach((line, index) => {
            downloadCtx.fillText(line, downloadCanvas.width / 2, 800 + (index * 48));
        });

        downloadCtx.font = "48px Arial";
        downloadCtx.fillText(document.getElementById('reward').value, downloadCanvas.width / 2, 1040);

        const uploadedImage = document.getElementById('uploadImage').files[0];
        if (uploadedImage) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.src = event.target.result;
                img.onload = function() {
                    downloadCtx.drawImage(img, 200, 300, 600, 600);
                    const link = document.createElement("a");
                    link.download = "wanted_poster.png";
                    link.href = downloadCanvas.toDataURL("image/png");
                    link.click();
                };
            };
            reader.readAsDataURL(uploadedImage);
        } else {
            const link = document.createElement("a");
            link.download = "wanted_poster.png";
            link.href = downloadCanvas.toDataURL("image/png");
            link.click();
        }
    };
}

// Update poster preview on input change
document.getElementById("name").addEventListener("input", updatePoster);
document.getElementById("charges").addEventListener("input", updatePoster);
document.getElementById("reward").addEventListener("input", updatePoster);
document.getElementById("uploadImage").addEventListener("change", updatePoster);
document.getElementById("filter").addEventListener("change", updatePoster);

// Load template on page load
window.onload = loadTemplateAndRender;
