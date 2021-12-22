 // Variáveis;

let currentInput = document.querySelector('.currentInput');
let answerScreen = document.querySelector('.answerScreen');
let buttons = document.querySelectorAll('button');
let erasebtn = document.querySelector('#erase');
let clearbtn = document.querySelector('#clear');
let evaluate = document.querySelector('evaluate');

let realTimeScreenValue = []

// função limpar;

clearbtn.addEventListener("click", ()=> {
    realTimeScreenValue = [''];
    currentInput.innerHTML = '0';
    currentInput.className = 'currentInput'
    answerScreen.innerHTML = '0';
    answerScreen.className = 'answerScreen';
    answerScreen.style.color = "rgba(150, 150, 150, 0.87)";
});

// Anexar eventos;

buttons.forEach((btn) => {

    btn.addEventListener("click", () => {

        // Montar expressão
        if (!btn.id.match('erase')) {
            if(
                (currentInput.innerHTML == '' || currentInput.innerHTML == '0') && 
                inArray(btn.value, [".", "+", "-", "*", "/", "%"])
            ){
                currentInput.innerHTML = '0';
                answerScreen.innerHTML = '0';
                return;
            }

            realTimeScreenValue.push(btn.value)
            currentInput.innerHTML = realTimeScreenValue.join('');
        
            if (btn.classList.contains('num_btn')) {
                answerScreen.innerHTML = calc(currentInput.innerHTML);
            }
        }
                   
        if (btn.id.match('erase')) {
            realTimeScreenValue.pop();
            currentInput.innerHTML = realTimeScreenValue.join('');
            answerScreen.innerHTML = calc(realTimeScreenValue.join(''));    
        }
                
        if (btn.id.match('evaluate')) {
            currentInput.className = 'answerScreen';
            answerScreen.className = 'currentInput';
            answerScreen.style.color = "white";
        }
        
        
        if (calc(realTimeScreenValue.join('')) == '') {
            answerScreen.innerHTML = 0;
        
        }
    })
});


function calc(str) {
    if(isNaN(parseFloat(str[str.length-1]))) return '';
    return Function("'use strict'; return ("+str+")")()
}

const inArray = function (needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}