// const myNodeList = document.getElementsByTagName('tr')
// for (let i = 0; i < myNodeList.length; i++) {
//     let span = document.createElement('span');
//     let txt = document.createTextNode('\u00D7')
//     span.className = "close";
//     span.appendChild(txt);
//     myNodeList[i].appendChild(span);
// }

// const close = document.getElementsByClassName('close');
// for(let i = 0; i < close.length; i++) {
//     close[i].onclick = () => {
//         let div = this.parentElement;
//         div.style.display = "none";
//     }
// }
const body = document.getElementsByTagName('body')

async function getAll () {
    try {
        const response = await fetch("https://movies-db-team3.onrender.com/movies_to_watch");
        console.log(response)
        const data = await response.json();
        console.log(data);
        let temp = "";
        for (i = 0; i < data.length; i++) {
            temp+="<tr>";
            temp+=`<td>${data[i].title}</td>`
            temp+=`<td>${data[i].genre}</td>`
            temp+=`<td>${data[i].rating}</td>`
        }
        document.getElementById('data').innerHTML=temp;
    }
    catch(err) {
        console.error(err.message)
    }

}
getAll();

////////////////////POST REQUEST/////////////////
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        title: document.getElementById('movieTitle').value,
        genre: document.getElementById('genre').value,
        rating: document.getElementById('rating').value
    }
    postData(formData)
})

function postData(data) {
    fetch('https://movies-db-team3.onrender.com/movies_to_watch', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);

        addRowToTable(result)
    })
    .catch(error => {
        console.error('Error:', error)
    })
}

function addRowToTable(data) {
    const movieTable = document.getElementById('movieTable')
    const newRow = movieTable.insertRow()
    const titleCell = newRow.insertCell()
    titleCell.textContent = data.title;
    const genreCell = newRow.insertCell()
   genreCell.textContent = data.genre;
    const ratingCell = newRow.insertCell()
    ratingCell.textContent = data.rating;
    
}

//////////////////////////////////////////

////////////////////DELETE ONE////////////


//deletes table row
function deleteRow(entityId) {
    //make a delete request using fetch
    fetch('https://movies-db-team3.onrender.com/movies_to_watch/${id}', {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Row deleted successfully");
        fetchData();

    })
    .catch(error => {
        console.error("Error:", error)
    })
}

function fetchData() {
    fetch('https://movies-db-team3.onrender.com/movies_to_watch')
    .then(response => response.json())
    .then(data => {
        const movieTable = document.getElementById('movieTable')
        movieTable.innerHTML = '';

        data.forEach(entity => {
            const newRow = document.createElement('tr')
            const titleCell = document.createElement('td');
            const genreCell = document.createElement('td');
            const ratingCell = document.createElement('td');
            const actionCell = document.createElement('td')
            const deleteBtn = document.createElement('button')

            titleCell.textContent = entity.title;
            genreCell.textContent = entity.genre;
            ratingCell.textContent = entity.rating;
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function() {
                deleteTableRow(entity.id);
            })

            actionCell.appendChild(deleteBtn);
            newRow.appendChild(titleCell);
            newRow.appendChild(genreCell)
            newRow.appendChild(ratingCell)
            newRow.appendChild(actionCell)
            movieTable.appendChild(newRow)
        
        });
    })
    .catch(error => {
        console.error('Error:', error)
    })

}
fetchData();