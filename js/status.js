document.getElementById("playStatusForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const playStatus = document.getElementById("playStatus").value;
    localStorage.setItem("balatroPlayStatus", playStatus);
});