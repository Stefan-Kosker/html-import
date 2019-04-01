// Add <link rel="import" href="../Body/body.html"> Afterwards, the document will be imported.

window.onload = function () {
    importAllHtmlFractures();
};

function importAllHtmlFractures() {
    let linkList = document.querySelectorAll('link[rel="import"]');

    linkList.forEach(link => {

        fetch(link.href).then(response => {
            response.text().then(text  => {
                let parser = new DOMParser();
                let content = parser.parseFromString(text, 'text/html');
                let elements = content.querySelector('body').childNodes;

                elements.forEach(element => {
                    let elementParent = link.parentElement;
                    elementParent.insertBefore(element.cloneNode(true), link.nextSibling);
                });
                link.remove();
                linkList = document.querySelectorAll('link[rel="import"]');
                if (linkList.length > 0) {
                    importAllHtmlFractures();
                }
            });
        });
    });
}



