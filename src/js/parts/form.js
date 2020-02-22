function form() {
   
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Упс..что-то пошло не так'
    };
    
    let myForm = document.querySelectorAll('.myForm'),
        inputName = document.getElementsByName('user_name'),
        inputPhone = document.getElementsByName('user_phone'),
        statusMessage = document.createElement('div');
    
    statusMessage.classList.add('status');
    
    myForm.forEach(function(elem){
        elem.addEventListener('submit', function(event){
            event.preventDefault();
                elem.appendChild(statusMessage);
    
                let formData = new FormData(elem);
    
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
                    .then(() => statusMessage.innerHTML = message.loading)
                    .then(() => statusMessage.innerHTML = message.success)
                    .catch(() => statusMessage.innerHTML = message.failure)
                    .then(() => {
                        for (let j = 0; j < inputName.length; j++) {
                            inputName[j].value = '';
                        }
                    })
                    .then(() => {
                        for (let i = 0; i < inputPhone.length; i++) {
                            inputPhone[i].value = '';
                        }
                    });
            });
    });

}

export default form;