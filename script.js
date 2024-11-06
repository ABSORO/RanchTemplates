
function generatePoster() {
    const name = document.getElementById('name').value;
    const charges = document.getElementById('charges').value;
    const reward = document.getElementById('reward').value;
    const filter = document.getElementById('filter').value;

    const previewName = document.getElementById('previewName');
    const previewCharges = document.getElementById('previewCharges');
    const previewReward = document.getElementById('previewReward');
    const uploadedImage = document.getElementById('uploadedImage');

    previewName.textContent = name;
    previewCharges.textContent = charges;
    previewReward.textContent = reward;

    // Apply filters
    if (filter === 'sepia') {
        uploadedImage.style.filter = 'sepia(100%)';
    } else if (filter === 'faded') {
        uploadedImage.style.opacity = '0.7';
    } else {
        uploadedImage.style.filter = 'none';
        uploadedImage.style.opacity = '1';
    }

    // Image handling and download functionality
}
