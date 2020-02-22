function modal() {

    let btnEngineer = document.querySelector(".popup_engineer_btn"),
    modalEngineer = document.querySelector(".popup_engineer"),
    modalPopup = document.querySelector(".popup"),
    callBtn = document.querySelectorAll(".phone_link");

  
  //time();

  modalEngineer.addEventListener("click", event => {
    if (
      event.target.matches("div.popup_engineer") ||
      event.target.classList.contains("popup_close") ||
      event.target.matches("strong")
    ) {
        modalEngineer.style.display = "none";
    }
  });

  btnEngineer.addEventListener("click", () => {
    modalEngineer.style.display = "block";
  });

  callBtn.forEach(item => {
    item.addEventListener("click", event => {
      event.preventDefault();
      modalPopup.style.display = "block";
    });
  });

  modalPopup.addEventListener("click", event => {
    if (
      event.target.matches("div.popup") ||
      event.target.classList.contains("popup_close") ||
      event.target.matches("strong")
    ) {
        modalPopup.style.display = "none";
    }
  });
    
    

    //showpopup 60 seconds 

    function showPopup() {
        setTimeout(function(){
          modalPopup.style.display = 'block';
        }, 60000);
    }
    showPopup();
    
}

export default modal;