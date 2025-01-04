const linkType = document.getElementById("link-type");
const inputField = document.getElementById("url-input-field");
const cutButton = document.getElementById("cut-button");
const outputField = document.getElementById("output-field");

// cutButton.addEventListener("click", doLinkCutting(linkType.value, inputField.value))

/**
 * purely a bridge between the HTML and the script
 */
function runScript() {
    doLinkCutting(linkType.value, inputField.value)
}

/**
 * The main function for this website. this function calls the
 * other necessary functions.
 * @param {String} urlType the type of the link that will be cut
 * @param {String} link the link that will be cut
 */
function doLinkCutting(urlType, link) {
    //sanitize the URL input to prevent XSS
    const sanitizedInput = sanitizeInput(link)

    //sanitize the URL type to be sure the value has not been edited to prevent XSS
    const sanitizedUrlType = sanitizeInput(urlType)

    let cutUrl = ""

    if(usedValidType(sanitizedUrlType) === true) {
        switch (sanitizedUrlType) {
            case "generic":
                cutUrl = sanitizedInput.split('&utm')[0]
                cutUrl = cutUrl.split('?utm')[0]
                cutUrl = cutUrl.split('?id')[0]
                cutUrl = cutUrl.split('&id')[0]
            case "amazon":
                cutUrl = sanitizedInput.split('?')[0]
                break;
            case "youtube":
                cutUrl = sanitizedInput.split('?si')[0]
                break;
            case "twitter":
                cutUrl = sanitizedInput.split('?t')[0]
                break;
            default:
                break;
        }

        outputField.innerHTML = cutUrl
        outputField.select();
        navigator.clipboard.writeText(outputField.value)
        alert("type: " + sanitizedUrlType + " | url: " + cutUrl)
    }


}

/**
 * sanitize the input by removing the <> brackets of html tags
 * and trimming the whitespaces away.
 * @param {String} input
 * @return {String}
 */
function sanitizeInput(input) {
    let sanitized = input.replace(/[<>]/g, '')
    sanitized = sanitized.trim()

    return sanitized
}

/**
 * check if the user selected a valid type with the dropdown,
 * to prevent XSS or code breaking.
 * @param {String} urlType
 * @return {String}
 */
function usedValidType(urlType) {
    const allowedUrlTypes = ["generic", "amazon", "youtube", "twitter"]

    //check if the type selected is allowed to prevent XSS and code breaking
    if(allowedUrlTypes.includes(urlType)) {
        return true
    } else {
        return false
    }
}