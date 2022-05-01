const image_container = document.getElementById("image_container");
const loader = document.getElementById("loader");


let photoArray = [];

// Api URL
const apiKey = 'TN8AORASIT--o6fEB9lpYqiu9fCg0s307A-u554NN8U';
const counter = 30;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${counter}`;
 
//set attribute functions
function setAttributes (element , attributes) {
    for (const key in attributes  ) {
        element.setAttribute(key , attributes[key]);
    }
}


let a = 0 ;
// function for display photoes on the DOM
function displayPhotos () {
    if (a === 0){
        a = 1;
        loader.hidden = false;
        image_container.hidden = true;
    }
    photoArray.forEach((photo) => {
        // create an ancher tag 
        const item = document.createElement("a");
        setAttributes(item , {
            href: photo.links.html , 
            target : '_blank'
        })

        // create an img tag 
        const img = document.createElement("img");
        img.setAttribute("src" , photo.urls.regular);
        if(photo.alt_description === null){       
            setAttributes(img , {
                alt : photo.user.bio , 
                title : photo.user.bio 
            })
        } else {
            setAttributes(img , {
                alt : photo.alt_description , 
                title : photo.alt_description
            })
        }

        // adding img in ancher and ancher into the img-container
        item.appendChild(img);
        image_container.appendChild(item);
    })

    setTimeout(() => {
        loader.hidden = true;
        image_container.hidden = false;
    }, 2000);
}
// get the photo from unsplash API
async function getPhoto() {
    try {
        const response = await fetch(apiUrl)
        photoArray = await response.json()
        displayPhotos();

    } catch (error) {
        getPhoto();        
    }
}

window.addEventListener("scroll" , () =>{
    if(window.scrollY >= document.body.offsetHeight - 1000 ) {
        getPhoto();
    }
});

getPhoto();

document.body.scolly
