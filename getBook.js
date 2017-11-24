window.addEventListener('load', function (event) {
    const bookApiInput = document.getElementById('bookApiInput');
    const bookApiBtn = document.getElementById('bookApiBtn');
    const bookReq = new XMLHttpRequest();
    const bookLog = document.getElementById('bookLog');
    const bookApi = document.getElementById('bookApi');
    const topBookLog = document.getElementById('topBookLog');
    const docLog = document.getElementById('docLog')
    bookApiBtn.addEventListener('click', function (event) {
        if (bookApiInput.value != "") {
            var value = bookApiInput.value;
            value = insertPlus(value);
        } else {
            bookApi.innerHTML += "<strong>Please enter a string</strong>";
        }
        bookReq.onreadystatechange = function (event) {
            if (bookReq.readyState = 4) {
                const ans = JSON.parse(bookReq.responseText);
                const num_found = ans.num_found;


                for (let i = 0; i < 12; i++) {
                    let newElement = document.createElement("li");
                    newElement.innerHTML = ans.docs[i].title;
                    docLog.appendChild(newElement);
                }
            }
        }
        bookReq.open('GET', `http://openlibrary.org/search.json?q=${value}`);
        bookReq.send();
    })
})

// Functions

function insertPlus(aString) {
    return aString.split(" ").join("+");
}

//https://reststop.randomhouse.com/resources/authors?lastName=Grisham$application/json
// books.title
// publish_date
// publish_year
// author_name[0]