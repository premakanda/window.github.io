function calc() {
    let priceBtn = document.querySelectorAll('.glazing_price_btn '),
    popupCalc = document.querySelector('.popup_calc'),
    popupCalcClose = document.querySelector('#popup-calc-close'),
    balconIconsIcon = document.querySelectorAll('.balcon_icons_icon'),
    balconIcons = document.querySelector('.balcon_icons'),
    popupCalcImg = document.querySelectorAll('.popup-calc__img'),
    popupCalcBtn = document.querySelector('.popup_calc_button'),
    popupCalcProfile = document.querySelector('.popup_calc_profile'),
    popupCalcProfileClose = document.querySelector('.popup_calc_profile_close'),
    balconType;

    priceBtn.forEach(function(i){
        i.addEventListener('click', function(){
            popupCalc.style.display = 'block';
        });
    });

    popupCalcClose.addEventListener('click', function(){
        popupCalc.style.display = 'none';
        inputWidth.value = '';
        inputHeight.value = '';

    });

    popupCalcProfileClose.addEventListener('click', function(){
        popupCalcProfile.style.display = 'none';
        inputWidth.value = '';
        inputHeight.value = '';
        checkbox[0].checked = false;
        checkbox[1].checked = false;
    });


    let hideCalcContent = (a) => {
        for (let i = a; i < popupCalcImg.length; i++) {
            popupCalcImg[i].classList.remove('showFlex');
            popupCalcImg[i].classList.add('hideFlex');
            balconIconsIcon[i].classList.remove('balcon_iconsAnimate');
        }
    }
    hideCalcContent(1);

    let showCalcContent = (b) => {
        if (popupCalcImg[b].classList.contains('hideFlex')) {
            popupCalcImg[b].classList.remove('hideFlex');
            popupCalcImg[b].classList.add('showFlex');
            balconIconsIcon[b].classList.add('balcon_iconsAnimate');
        }
    }

    balconIcons.addEventListener('click', function(event){
        let target = event.target;
        if(target && target.classList.contains('balcon_icons_icon')) {
            for(let i = 0; i < balconIconsIcon.length; i++) {
                if(target == balconIconsIcon[i]) {
                    hideCalcContent(0);
                    showCalcContent(i);
                    break;
                } 
            }
        } 
    });



    popupCalcBtn.addEventListener('click', function(){
        popupCalc.style.display = 'none';
        popupCalcProfile.style.display = 'block';
        formData.append('Ширина: ', inputWidth.value);
        formData.append('Высота: ', inputHeight.value);
        formData.append('Форма балкона ', balconType)
    });

    balconIcons.addEventListener('click', function(event){
        let target = event.target;
        if (target.classList.contains('balconType1')) {
            balconType = 'тип 1'
        }else if (target.classList.contains('balconType2')) {
            balconType = 'тип 2'
        }else if (target.classList.contains('balconType3')) {
            balconType = 'тип 3'
        }else if (target.classList.contains('balconType4')) {
            balconType = 'тип 4'
        }
    });



    let checkCalc = () => {
        
        setInterval(function () {
        if (inputWidth.value == '' || inputHeight.value == '') {
            popupCalcBtn.setAttribute('disabled', 'true');
        } else {
            popupCalcBtn.removeAttribute('disabled', 'true');
        }

        }, 0);
    }
    checkCalc();


    let buttonProfile = document.getElementsByClassName('popup_calc_profile_button')[0],
        checkbox = document.getElementsByClassName('checkbox'),
        popupCalcEnd = document.querySelector('.popup_calc_end'),
        popupCalcEndClose = document.querySelector('.popup_calc_end_close');

    let check = () => {
        
        setInterval(function () {
        if (checkbox[0].checked === false && checkbox[1].checked === false) {
            buttonProfile.setAttribute('disabled', 'true');
        } else {
            buttonProfile.removeAttribute('disabled', 'true');
        }
        checkbox[0].addEventListener('click', function() {
            checkbox[1].checked = false;
            buttonProfile.removeAttribute('disabled', 'true');
        })
        checkbox[1].addEventListener('click', function() {
            checkbox[0].checked = false;
            buttonProfile.removeAttribute('disabled', 'true');
        })


        }, 0);
    }
    check();

    buttonProfile.addEventListener('click', function(){
        popupCalcProfile.style.display = 'none';
        popupCalcEnd.style.display = 'block';
        popupCalcProfile.style.display = 'none';
    });

    popupCalcEndClose.addEventListener('click', function(){
        popupCalcEnd.style.display = 'none';
        inputWidth.value = '';
        inputHeight.value = '';
        checkbox[0].checked = false;
        checkbox[1].checked = false;
        popupCalcFormInput[0].value = '';
        popupCalcFormInput[1].value = '';
    });


    let popupCalcForm = document.querySelector('#popup-calc__form'),
        popupCalcFormInput = popupCalcForm.getElementsByTagName('input'),
        statusMess = document.createElement('div'),
        inputWidth = document.querySelector('#width'),
        inputHeight = document.querySelector('#height'),
        calculateEverything = document.getElementById('calculate-everything'),
        selectControl = document.getElementById('view_type'),
        formData = new FormData();
        

    statusMess.classList.add('status');

    let mess = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Упс..что-то пошло не так'
    };


    buttonProfile.addEventListener('click', function(){
        if(checkbox[0].checked === true) {
            formData.append('Остекление - ', 'Холодное');
        } else if (checkbox[1].checked === true) {
            formData.append('Остекление - ', 'Теплое');
        }
    });

    calculateEverything.addEventListener('click', function(){
        formData.append("Имя ", popupCalcFormInput[0].value);
        formData.append("Телефон ", popupCalcFormInput[1].value);

    });

    selectControl.addEventListener('change', function(){
        formData.append("Тип остекления ", this.options[this.selectedIndex].innerHTML);
    });



    // form for calc

    function sendForm(item) {

        item.addEventListener('submit', function(event){
            event.preventDefault();
            item.appendChild(statusMess);

                function postData(data) {
                    return new Promise(function(resolve, reject){
                        let request = new XMLHttpRequest();

                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                        request.onreadystatechange = function(){
                            if (request.readyState < 4) {
                                resolve();
                            } else if(request.readyState === 4) {
                                if(request.status == 200 && request.status < 300) {
                                    resolve();
                                }
                                else {
                                    reject();
                                }
                            }
                        };

                        let obj = {};
                        formData.forEach(function(value, key){
                            obj[key] = value;
                        });
                        let json = JSON.stringify(obj);
                        request.send(json);

                    });
                }

                postData(formData)
                    .then(() => statusMess.innerHTML = mess.loading)
                    .then(() => statusMess.innerHTML = mess.success)
                    .catch(() => statusMess.innerHTML = mess.failure)
                    .then(() => {
                        for (let j = 0; j < popupCalcFormInput.length; j++) {
                            popupCalcFormInput[j].value = '';
                        }
                    });
            });

    }

    sendForm(popupCalcForm);
}

export default calc;