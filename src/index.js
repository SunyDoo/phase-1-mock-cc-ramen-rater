document.addEventListener("DOMContentLoaded", ()=>{
    const baseUrl = 'http://localhost:3000/ramens/'
    getAllRamen() 
    initialDisplay(1)   
    function getAllRamen(){
        fetch (baseUrl)
        .then (res=>res.json())
        .then(data=>data.forEach(ramen=>renderOneRamen(ramen)))
    }
    
})
const menu= document.getElementById('ramen-menu')
function renderOneRamen(ramen){
    const div = document.createElement('div')
    const ramenImg = document.createElement('img')
    const button = document.createElement('button')
    menu.append(div)    
    div.append(ramenImg, button)
    button.textContent='x'
    button.id = ramen.id
    button.addEventListener('click', deleteRamen)
    ramenImg.src = ramen.image
    ramenImg.alt = ramen.name
    ramenImg.id = ramen.id
    ramenImg.addEventListener('click', displayRamen)    
}
function displayRamen(e){
    const ramenDetails = document.getElementById('ramen-detail')
    const rating = document.getElementById('rating')
    const comment = document.getElementById('comment')
    fetch (`http://localhost:3000/ramens/${e.target.id}`)
    .then (res=>res.json())    
    .then(ramen=>{
        ramenDetails.innerHTML=`
        <img class="detail-image" src=${ramen.image} alt=${ramen.name} />
        <h2 class="name">${ramen.name}</h2>
        <h3 class="restaurant">${ramen.restaurant}</h3>
        `
        rating.innerHTML=`
        <h3>Rating:</h3>
        <p>
        <span id='rating-display'>${ramen.rating}</span> / 10
        </p>
        `
        comment.innerHTML=`
        <h3>Comment:</h3>
        <p id='comment-display'>
        <span>${ramen.comment}</span>
        </p>
        `
    })
}
const form = document.getElementById('new-ramen')
form.addEventListener('submit',createRamen)
function createRamen(e){
    e.preventDefault()
    let newRamenObj = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: document.getElementById("new-comment").value        
    }    
    renderOneRamen(newRamenObj)
    postRamen(newRamenObj)
    form.reset()
} 

function postRamen(newRamenObj){
    fetch ('http://localhost:3000/ramens/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(newRamenObj)
    })
    .then(res=>res.json())
    .then(ramen=>{
        window.location.reload()
        console.log(ramen)
    })  
}

function deleteRamen(e){
    e.target.parentNode.remove()
    handleDelete(e.target.id)
}

function handleDelete(id){
    fetch (`http://localhost:3000/ramens/${id}`,{
        method: 'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
}

function initialDisplay(id){
    const ramenDetails = document.getElementById('ramen-detail')
    const rating = document.getElementById('rating')
    const comment = document.getElementById('comment')
    fetch (`http://localhost:3000/ramens/${id}`)
    .then (res=>res.json())    
    .then(ramen=>{
        ramenDetails.innerHTML=`
        <img class="detail-image" src=${ramen.image} alt=${ramen.name} />
        <h2 class="name">${ramen.name}</h2>
        <h3 class="restaurant">${ramen.restaurant}</h3>
        `
        rating.innerHTML=`
        <h3>Rating:</h3>
        <p>
        <span id='rating-display'>${ramen.rating}</span> / 10
        </p>
        `
        comment.innerHTML=`
        <h3>Comment:</h3>
        <p id='comment-display'>
        <span>${ramen.comment}</span>
        </p>
        `
    })
}



