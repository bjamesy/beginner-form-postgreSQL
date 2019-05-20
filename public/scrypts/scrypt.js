window.onload = function(){
    const card = document.querySelector('#delivery');

    const displayBlock = function(card){
        const selectedIndex = card.selectedIndex;
        const isSelected = card[selectedIndex].value;
        const premium = document.querySelector('#premium');

        if (isSelected === "premium"){
            premium.classList.add('show');
            regular.classList.remove('show');
        } else if (isSelected === "regular"){
            premium.classList.remove('show');
        } else if (isSelected === 'select'){
            alert('you have to select an option');
            premium.classList.remove('show');
        }
    }
    
    card.addEventListener('change', () => {
        displayBlock(card);
    });
};

