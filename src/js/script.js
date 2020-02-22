window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // modals
    
    let popupEngBtn = document.querySelector('.popup_engineer_btn'),
        popupEngineer = document.querySelector('.popup_engineer');
       
        
    popupEngBtn.addEventListener('click', function(){
        popupEngineer.style.display = 'block';
    });
    

    popupEngineer.addEventListener('click', function(event){
        if(event.target && event.target.matches('strong#popup-engineer-close')) {
            popupEngineer.style.display = 'none';
        } else if (event.target && event.target.matches('div.popup_engineer')) {
            popupEngineer.style.display = 'none';
        }
        
    });
    
    let phoneLink = document.querySelectorAll('.phone_link'),
        popup = document.querySelector('.popup');
        
    phoneLink.forEach(function(i){
        i.addEventListener('click', function(){
            
            popup.style.display = 'block';
        });
    }) ;
    
    popup.addEventListener('click', function(event){
        if(event.target.matches("div.popup") ||
        event.target.classList.contains("popup_close") ||
        event.target.matches("strong")
      ) {
            popup.style.display = 'none';
        }
    });
    
    //showpopup 60 seconds 
    
    function showPopup() {
        setTimeout(function(){
            popup.style.display = 'block';
        }, 6000);
    }
    showPopup();


    //form
    let forms = document.querySelectorAll(".form"),
        statusMessage = document.createElement("div"),
        message = {
            loading: "Loading...",
            success: "Мы скоро с вами свяжемся!",
            failure: "Произошла ошибка"
        };

    forms.forEach(form => {
        form.addEventListener("submit", event => {
        event.preventDefault();
        let input = form.querySelectorAll("input");
        form.appendChild(statusMessage);
        let formData = new FormData(form);

        function postData(data) {
            return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            request.open("POST", "server.php");
            request.setRequestHeader(
                "Content-Type",
                "application/json; charset=utf-8"
            );

            request.onreadystatechange = () => {
                if (request.readyState < 4) {
                resolve();
                } else if (request.readyState === 4) {
                if (request.status == 200 && request.status < 300) {
                    resolve();
                }
                } else {
                reject();
                }
            };
         
            });
        }
        function clearInput() {
            for (let i = 0; i < input.length; i++) {
            input[i].value = "";
            }
        }

        postData(formData)
            .then(() => (statusMessage.innerHTML = message.loading))
            .then(() => (statusMessage.innerHTML = message.success))
            .catch(() => (statusMessage.innerHTML = message.failure))
            .then(clearInput);
        });
    });


    //tab glaz

    let windowLink = document.querySelectorAll('.window-link'),
            glazingSlider = document.querySelector('.glazing_slider'),
            windowContent = document.querySelectorAll('.window-content');

        function hideTabContent(a) {
            for (let i = a; i < windowContent.length; i++) {
                windowContent[i].classList.remove('show');
                windowContent[i].classList.add('hide');
                windowLink[i].classList.remove('active');
            }
        }

        hideTabContent(1);

        function showTabContent(b) {
            if (windowContent[b].classList.contains('hide')) {
                windowContent[b].classList.remove('hide');
                windowContent[b].classList.add('show');
                windowLink[b].classList.add('active');
            }
        }

        glazingSlider.addEventListener('click', function(event){
            let target = event.target;
            if(target && target.classList.contains('window-link')) {
                for(let i = 0; i < windowLink.length; i++) {
                    if(target == windowLink[i]) {
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        });


    //tab decor

     
    let clickLink = document.querySelectorAll('.no_click_link'),
        decorSlider = document.querySelector('.decoration_slider'),
        decorContent = document.querySelectorAll('.decoration-content-item'),
        noСlick = document.getElementsByClassName('no_click');


        function hideContent(a) {
            for (let i = a; i < decorContent.length; i++) {
                decorContent[i].classList.remove('show');
                decorContent[i].classList.add('hide');
                noСlick[i].classList.remove('after_click');
            }
        }
    
        hideContent(1);
    
        function showContent(b) {
            if (decorContent[b].classList.contains('hide')) {
                decorContent[b].classList.remove('hide');
                decorContent[b].classList.add('show');
                noСlick[b].classList.add('after_click');
            }
        }
    
        decorSlider.addEventListener('click', function(event){
            let target = event.target;
            if(target && target.classList.contains('no_click_link')) {
                for(let i = 0; i < clickLink.length; i++) {
                    if(target == clickLink[i]) {
                        hideContent(0);
                        showContent(i);
                        break;
                    }
                }
            }
        });


    //Calc

    let priceButtons = document.querySelectorAll(".popup_calc_btn"),
    calc = document.querySelector(".popup_calc"),
    calcProfile = document.querySelector(".popup_calc_profile"),
    calcEnd = document.querySelector(".popup_calc_end"),
    calcNextBtn = document.querySelector(".popup_calc_button"),
    calcProfileNextBtn = document.querySelector(".popup_calc_profile_button"),
    close = document.querySelectorAll(".popup_calc_close"),
    popups = [calc, calcProfile, calcEnd],
    balconIcons = document.querySelectorAll(".balcon_icons > a > img"),
    balconBig = document.querySelectorAll(".big_img > img"),
    coldBox = document.querySelector("#cold"),
    warmBox = document.querySelector("#warm"),
    form = document.querySelector(".form_calc"),
    formData = new FormData();
    statusMessage = document.createElement("div"),
    message = {
        loading: "Loading...",
        success: "Мы скоро с вами свяжемся!",
        failure: "Произошла ошибка"
    };

    priceButtons.forEach(btn => {
        btn.addEventListener("click", () => {
        calc.style.display = "block";
       
        });
    });

    close.forEach(x => {
        x.addEventListener("click", () => {
        popups.forEach(function(item) {
            setTimeout(() => {
            item.style.display = "none";
            item.classList.remove("fade");
            item.classList.remove("fadeout");
            }, 980);
            item.classList.remove("fade");
            item.classList.add("fadeout");
            clearInputs();
        });
        });
    });

    balconIcons.forEach((icon, index) => {
        icon.addEventListener("click", event => {
        event.preventDefault();
        balconIcons.forEach(icon => {
            icon.style.width = "20%";
            icon.classList.remove("choosen");
        });
        balconBig.forEach(img => {
            img.style.display = "none";
        });
        event.target.style.width = "30%";
        event.target.classList.add("choosen");
        balconBig[index].style.display = "inline-block";
        });
    });

    calcNextBtn.addEventListener("click", () => {
        let width = document.querySelector("#width").value,
        height = document.querySelector("#height").value,
        type = document.querySelector(".choosen");

        if (
        width == "" ||
        height == "" ||
        type == null ||
        width == "0" ||
        height == "0"
        ) {
        alert("Введите высоту и ширину, выбирите форму балкона");
        } else {
        formData.append("form", type.alt);
        formData.append("width", width);
        formData.append("height", height);
        calc.style.display = "none";
        calcProfile.style.display = "block";
        }
    });

    coldBox.addEventListener("click", () => {
        warmBox.checked = false;
    });

    warmBox.addEventListener("click", () => {
        coldBox.checked = false;
    });

    calcProfileNextBtn.addEventListener("click", () => {
        let viewType = document.querySelector("#view_type").value;

        if (!warmBox.checked && !coldBox.checked) {
        alert("Выберите тип профиля для рассчета.");
        } else {
        if (coldBox.checked) {
            formData.append("profile_type", "cold");
        } else {
            formData.append("profile_type", "warm");
        }
        formData.append("view_type", viewType);
        calcProfile.style.display = "none";
        calcEnd.style.display = "block";
        }
    });

    function clearInputs() {
        let inputs = document.querySelectorAll("input");
        inputs.forEach(function(input) {
        input.value = "";
        });
        formData = new FormData();
        setTimeout(function() {
        statusMessage.innerHTML = "";
        }, 10000);
    }

    form.addEventListener("submit", event => {
        event.preventDefault();
        let name = document.querySelector("#calc_user_name").value,
        phone = document.querySelector("#calc_phone").value;

        formData.append("name", name);
        formData.append("phone", phone);

        form.appendChild(statusMessage);

        function postData(data) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            request.open("POST", "server.php");
            request.setRequestHeader(
            "Content-Type",
            "application/json; charset=utf-8"
            );

            request.onreadystatechange = () => {
            if (request.readyState < 4) {
                resolve();
            } else if (request.readyState === 4) {
                if (request.status == 200 && request.status < 300) {
                resolve();
                }
            } else {
                reject();
            }
            };
            request.send(data);
        });
        }
        postData(formData)
        .then(() => (statusMessage.innerHTML = message.loading))
        .then(() => (statusMessage.innerHTML = message.success))
        .catch(() => (statusMessage.innerHTML = message.failure))
        .then(clearInputs);
    });

    //Taimer
    function checkZero(int) {
        if (int <= 0) {
        int = "00";
        } else if (int < 10 && int > 0) {
        int = "0" + int;
        } else {
        int = int;
        }
        return `${int}`;
    }

    let date = new Date(),
        deadline = "2019/7/4";

    function getTimeRemaning(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / 1000 / 60) % 60),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        days = Math.floor(t / (1000 * 60 * 60 * 24));

        return {
        total: t,
        hours: checkZero(hours),
        minutes: checkZero(minutes),
        seconds: checkZero(seconds),
        days: checkZero(days)
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
        days = timer.querySelector(".days"),
        hours = timer.querySelector(".hours"),
        minutes = timer.querySelector(".minutes"),
        seconds = timer.querySelector(".seconds"),
        timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
        let t = getTimeRemaning(endtime);
        if (t.days.length > 2) {
            days.innerHTML = `<div>${t.days[0]}</div><div>${t.days[1]}</div><div>${
            t.days[2]
            }</div>`;
        } else {
            days.innerHTML = `<div>${t.days[0]}</div><div>${t.days[1]}</div>`;
        }
        hours.innerHTML = `<div>${t.hours[0]}</div><div>${t.hours[1]}</div>`;
        minutes.innerHTML = `<div>${t.minutes[0]}</div><div>${
            t.minutes[1]
        }</div>`;
        seconds.innerHTML = `<div>${t.seconds[0]}</div><div>${
            t.seconds[1]
        }</div>`;

        if (t.total < 0) {
            clearInterval(timeInterval);
        }
        }
    }

    setClock("timer", deadline);



    //task 9
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


});




