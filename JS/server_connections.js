function feedback(message) {

    const feedback = document.createElement("div");
    feedback.setAttribute("id", "feedback");
    feedback.innerHTML = `<p>${message}</p> <button id="close">CLOSE</button>`;
    document.querySelector("body").append(feedback);

    feedback.querySelector("button").addEventListener("click", () => {
        feedback.classList.add("hide");
    });

}

function log_out () {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("profilepicture");

    renderLoginPage();
}