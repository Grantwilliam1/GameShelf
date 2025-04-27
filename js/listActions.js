document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.getElementById("download-pdf");
    const shareBtn = document.getElementById("share-list");
    const userTable = document.getElementById("user-table");

    function loadScript(url, callback) {
        let script = document.createElement("script");
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

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

    function forceManualSave(blob) {
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "user_game_list.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert("Image saved! On desktop, manually upload the image to social media.");
    }

    downloadBtn.addEventListener("click", downloadAsImage);
    shareBtn.addEventListener("click", shareListAsImage);
});

