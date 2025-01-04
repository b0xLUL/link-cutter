const linkType = document.getElementById("link-type");
const inputField = document.getElementById("url-input-field");
const cutButton = document.getElementById("cut-button");
const outputField = document.getElementById("output-field");

cutButton.onClick = doLinkCutting(linkType.value, inputField.value);

function doLinkCutting(type, link) {
    
}

function sanitizeInput(input) {
    
}