function tabDec() {
    
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

}

export default tabDec;