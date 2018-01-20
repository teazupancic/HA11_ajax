  // globale Variable in der die Blog-Artikel gespeichert werden
 var blogEntries = [];

document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll("#header-navbar a");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function (e) {
            // Verhinder normales Link-Verhalten
            e.preventDefault();

            document.querySelector("li.active").className = "";
            this.parentElement.className = "active";

            // Hole Wert aus dem data-page Attribut und setze das als Hash
            // Dadurch wird ein "hashchange" Event ausgelöst
            location.hash = this.dataset["page"];
        })
    }
    insertTemplate(location.hash.trim().substr(1));
});

// Eine Möglichkeit
// window.addEventListener("popstate", () => console.log("Event: popstate"));

window.addEventListener("hashchange", function () {
    insertTemplate(location.hash.trim().substr(1));
});

function insertTemplate(strPage) {
    var templateContent;

    var jumboTron = document.getElementsByClassName("jumbotron")[0];
    var jumboTronH2 = jumboTron.getElementsByTagName("h2")[0];
    var jumboTronButton = jumboTron.getElementsByTagName("button");
    //Wenn im Jumbotron ein Button enthalten ist, dann lösche ihn
    if (jumboTronButton.length > 0) {
        jumboTron.removeChild(jumboTronButton[0]);
    }

    // Wenn strPage leer, weil kein Hash, dann Willkommen setzen
    strPage = strPage || "Willkommen";

    switch (strPage) {
    case "Willkommen":
        templateContent = document.getElementById("WillkommenTemplate").content;
        jumboTronH2.textContent = "Willkommen auf Max's Homepage";
        break;
    case "Blog":

        //load asynchronously, parse and cache messages
        //loadmessages( callback )
        blogEntries = JSON.parse(payloadJson);

        templateContent = createAllBlogEntries(null, blogEntries);
        // templateContent = document.getElementById("BlogTemplate").content;
        jumboTronH2.textContent = "Max's Kurznachrichten-Blog";

        var blogModalTemplate = document.getElementById("BlogModalTemplate").content;
        var addArticleButton = blogModalTemplate.querySelector("button");
        jumboTron.appendChild(document.importNode(addArticleButton, true));

        //Füge bei der ersten Verwendung das die unsichtbare EingabeMaske dem Body hinzu
        var addArticleMaske = blogModalTemplate.querySelector("#newArticleModal");
        document.body.appendChild(document.importNode(addArticleMaske, true));

        break;
    case "Kontakt":
        templateContent = document.getElementById("KontaktTemplate").content;
        jumboTronH2.textContent = "Kontaktiere Max";
        break;
    case "About":
        templateContent = document.getElementById("AboutTemplate").content;
        jumboTronH2.textContent = "Über Max Mustermann";
        break;
    default: //anderer Hash
        templateContent = document.getElementById("WillkommenTemplate").content;
        jumboTronH2.textContent = "Willkommen auf Max's Homepage";
        break;
    }

    var mainArea = document.querySelector("main");
    // Entferne alle Elemente aus der Main-Area
    while (mainArea.hasChildNodes()) {
        mainArea.removeChild(mainArea.lastChild);
    }
    mainArea.appendChild(document.importNode(templateContent, true));
}
