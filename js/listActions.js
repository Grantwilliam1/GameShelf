document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.getElementById("download-pdf");
    const shareBtn = document.getElementById("share-list");
    const userTable = document.getElementById("user-table");

    // Load external libraries dynamically
    function loadScript(url, callback) {
        let script = document.createElement("script");
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    /** 📸 Download the user list as a JPEG **/
    function downloadAsImage() {
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js", () => {
            const tableContainer = document.getElementById("user-table");
            tableContainer.classList.add("force-full-opacity");

            html2canvas(tableContainer, {
                backgroundColor: "#1A2223",
                scale: 2,
                useCORS: true
            }).then(canvas => {
                let link = document.createElement("a");
                link.href = canvas.toDataURL("image/jpeg", 0.9);
                link.download = "user_game_list.jpg";
                link.click();

                tableContainer.classList.remove("force-full-opacity");
            });
        });
    }

    /** 📷 Capture and share the user list **/
    function shareListAsImage() {
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js", () => {
            const tableContainer = document.getElementById("user-table");
            tableContainer.classList.add("force-full-opacity");

            html2canvas(tableContainer, {
                backgroundColor: "#1A2223",
                scale: 2,
                useCORS: true
            }).then(canvas => {
                tableContainer.classList.remove("force-full-opacity");

                canvas.toBlob(blob => {
                    const file = new File([blob], "user_game_list.jpg", { type: "image/jpeg" });

                    if (navigator.share && navigator.canShare({ files: [file] })) {
                        navigator.share({
                            files: [file],
                            title: "My Game List",
                            text: "Check out my game rankings!"
                        }).catch(err => {
                            console.log("Sharing failed:", err);
                            forceManualSave(blob);
                        });
                    } else {
                        forceManualSave(blob);
                    }
                }, "image/jpeg", 0.9);
            });
        });
    }

    /** 📌 If sharing fails, download image and notify user **/
    function forceManualSave(blob) {
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "user_game_list.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert("Image saved! On desktop, manually upload the image to social media.");
    }

    // Attach event listeners
    downloadBtn.addEventListener("click", downloadAsImage);
    shareBtn.addEventListener("click", shareListAsImage);
});

