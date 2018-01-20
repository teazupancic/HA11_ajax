function createBlogArticle(entry) {
    /* 
     * entry = { title: , time: , content: , volltextLink:  }
     */

    var templateContent = document.getElementById("BlogTemplate").content;

    templateContent.querySelector("h2").textContent = entry.title;

    var date = new Date(entry.time);
    templateContent.querySelector("time").datetime = date.toISOString();
    templateContent.querySelector("time").innerHTML = date.toLocaleTimeString() + ' Uhr<br>' + date.toLocaleDateString();

    templateContent.querySelector("section > span").innerHTML = entry.content;
    templateContent.querySelector("a").href = entry.volltextLink;

    // Return a Node-Object
    return document.importNode(templateContent, true);
}

/*function addNewBlogArticle() {
    var formular = document.forms["addNewArticleForm"];
    if (formular.reportValidity() == false) {
        return;
    }

    var entry = {};

    //Formular auslesen, Inhalte setzen, Formular zurücksetzen
    entry.title = document.getElementById('inputHeader').value;
    entry.time = new Date().toJSON();
    entry.content = document.getElementById('inputText').value;
    entry.volltextLink = document.getElementById('inputLink').value;

    //Add new Article to the list of blog entries 
    blogEntries.unshift(entry);

    formular.reset();

    //Create new Node from Entry
    var newArticle = createBlogArticle(entry);

    var mainArea = document.querySelector("main");
    mainArea.insertBefore(newArticle, mainArea.firstChild);
    $('#newArticleModal').modal('hide');
}*/

function createAllBlogEntries(error, blogEntries) {
    if (error) {
        return console.error("Ein Fehler ist aufgetreten: \n" + error);
    }

    //<template>.content == DocumentFragment, so we also have to create one
    //https://developer.mozilla.org/de/docs/Web/API/DocumentFragment
    var documentFrag = document.createDocumentFragment();

    blogEntries.forEach(function (entry) {
        documentFrag.appendChild(createBlogArticle(entry));
    });

    return documentFrag;
}

var xmlhttp = new XMLHttpRequest();


function addNewBlogArticle() {
    xmlhttp.onreadystatechange = function (){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            
            var formular = document.forms["addNewArticleForm"];
            if (formular.reportValidity() == false) {
                return;
            }
            
            //Formular auslesen, Inhalte setzen, Formular zurücksetzen
            var entry = {};
            entry.title = document.getElementById('inputHeader').value;
            entry.time = new Date().toJSON();
            entry.content = document.getElementById('inputText').value;
            entry.volltextLink = document.getElementById('inputLink').value;
            
            

            formular.reset();
            
            //Create new Node from Entry
            var newArticle = createBlogArticle(entry);
        
            var mainArea = document.querySelector("main");
            mainArea.insertBefore(newArticle, mainArea.firstChild);
            $('#newArticleModal').modal('hide');
        }
    }
    xmlhttp.open("GET", "https://webtech-teazupancic.c9users.io/HA11/HA11_ajax/SPA.html" ,true);
    xmlhttp.send();
}




/*function addNewBlogArticle(){
    
    $.ajax({
        url: "https://webtech-teazupancic.c9users.io/HA11/HA11_ajax/SPA.html", 
        type: "GET",
        success: function(data) {
          //alert(document.querySelector("#inputHeader").value);
            var entry = {};
            entry.title = $('#inputHeader').val();
            entry.time = new Date().toJSON();
            entry.content = $('#inputText').val();
            entry.volltextLink = $("#inputLink").val();
    
            var newArticle = createBlogArticle(entry);
        
            var mainArea = document.querySelector("main");
            mainArea.insertBefore(newArticle, mainArea.firstChild);
            $('#newArticleModal').modal('hide');
            
            var formular = document.forms["addNewArticleForm"];
            if (formular.reportValidity() == false) {
                return;
            }
            formular.reset();
            
            
       },
       error : function(error) {
          alert("no good "+JSON.stringify(error));
       }
    });

}*/

 