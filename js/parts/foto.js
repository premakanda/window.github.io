function foto() {

    let photos = document.querySelectorAll(".photo_min"),
        wrap = document.querySelector(".photos"),
        bigPhoto = document.createElement("div");
    bigPhoto.classList.add("big_photo");
    wrap.insertBefore(bigPhoto, photos[0]);
    photos.forEach(function(photo, index) {
        photo.addEventListener("click", function(event) {
        event.preventDefault();
        bigPhoto.innerHTML = `<img src='img/our_works/big_img/${index + 1}.png'>`;
        bigPhoto.classList.remove("fadeout");
        bigPhoto.classList.add("fade");
        bigPhoto.style.display = "flex";
        });
    });
    bigPhoto.addEventListener("click", function(event) {
        if (event.target.classList.contains("big_photo")) {
        bigPhoto.classList.remove("fade");
        bigPhoto.classList.add("fadeout");
        setTimeout(function() {
            bigPhoto.innerHTML = "";
            bigPhoto.style.display = "none";
        }, 980);
        } else if (event.target.matches("img")) {
        let photo = parseInt(bigPhoto.innerHTML.replace(/\D/g, "")),
            next = photo + 1;
        if (next <= photos.length) {
            bigPhoto.innerHTML = `<img src='img/our_works/big_img/${next}.png'>`;
        } else {
            bigPhoto.innerHTML = `<img src='img/our_works/big_img/1.png'>`;
        }
        }
    });
}
        
export default foto; 