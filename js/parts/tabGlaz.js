function tabGlaz() {
    
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

}

export default tabGlaz;