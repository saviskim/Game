let minValue;
let maxValue;
let answerNumber;
let orderNumber = 1;

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');
const min = document.querySelector('#min');
const max = document.querySelector('#max');
const LabelMin = document.querySelector('.LabelMin');
const LabelMax = document.querySelector('.LabelMax');
const card = document.querySelector('.card');

function text20(number){
    let oneNine = {
        1: "один",
        2: "два",
        3: "три",
        4: "четыре",
        5: "пять",
        6: "шесть",
        7: "семь",
        8: "восемь",
        9: "девять"
    };

    let tenNineteen = {
        10: "десять",
        11: "одиннадцать",
        12: "двенадцать",
        13: "тринадцать",
        14: "четырнадцать",
        15: "пятнадцать",
        16: "шестнадцать",
        17: "семнадцать",
        18: "восемнадцать",
        19: "девятнадцать"
    };

    let dozens = {
        2: "двадцать",
        3: "тридцать",
        4: "сорок",
        5: "пятьдесят",
        6: "шестьдесят",
        7: "семьдесят",
        8: "восемьдесят",
        9: "девяносто"
    };

    let hundreds = {
        1: "сто",
        2: "двести",
        3: "триста",
        4: "четыреста",
        5: "пятьсот",
        6: "шестьсот",
        7: "семьсот",
        8: "восемьсот",
        9: "девятьсот"
    }

    let text = "";
    let num = parseInt(number);
    key = null;

    if (num == 0){
        text = "0";
        return text;
    }

    if (num<0){
        text += "минус ";
        num = Math.abs(num);
    }

    if (num>=100){
       key = Math.floor(num/100);
       num = num - key*100;
       text += hundreds[key] + " ";
    }

    if (num>=10 && num<20){
        text += tenNineteen[num] + " ";
    }
    else if(num<10 && num>0){
        text += oneNine[num] + " ";
    }
    else if (num>=20){
        key = Math.floor(num/10);
        num = num - key*10;
        text += dozens[key] + " ";
        
        if (num>0){
            text += oneNine[num];
        }
    }

    text.trim; 
    
    return text.length<20 ? text : number;
}

function answerText(){
    const phraseRandom = Math.round(Math.random()*2);
    switch (phraseRandom){
        case 0:
            return `Да это легко! Ты загадал ${text20(answerNumber)}?`;
        case 1: 
            return `Наверное, это число ${text20(answerNumber)}?`;
        case 2:
            return `Возможно, это число ${text20(answerNumber)}?`;   
    }
}

function winText(){
    const phraseRandom = Math.round(Math.random()*2);
    console.log(phraseRandom);
    switch (phraseRandom){
        case 0:
            return `Я всегда угадываю\n\u{1F60E}`;
        case 1: 
            return `Я угадал всего c ${orderNumber} раза! \n\u{1F44C}`;
        case 2:
            return `И я опять угадал! \n\u{1F61C}`;
    }   
}

document.querySelector('#btnStart').addEventListener('click', function(){
    
    
    min.value = (min.value === '0') ? min.value : (parseInt(min.value) || 0); 
    min.value = min.value < -999 ? -999 : min.value;

    max.value = (max.value === '0') ? max.value : (parseInt(max.value) || 100); 
    max.value = max.value > 999 ? 999 : max.value; 

    

    minValue = parseInt(min.value)+1;
    maxValue = parseInt(max.value)-1;
    answerNumber  = Math.floor((minValue + maxValue) / 2);

    orderNumberField.innerText = orderNumber;
    answerField.innerText = answerText();

    setTimeout(() => {
        card.classList.add('scale-0');
        gameRun = true;
        answerNumber = Math.floor((minValue + maxValue) / 2);       
    }, 500);

    setTimeout(() => {
        LabelMin.innerText = min.value;
        LabelMax.innerText = max.value;
        
        let start = document.querySelectorAll('.start');
        [...start].forEach(el =>
            el.classList.add('collapse'));
        let game = document.querySelectorAll('.game');
        [...game].forEach(el => 
            el.classList.remove('collapse'));   
        card.classList.remove('scale-0');   
    }, 1000);


})

document.querySelector('#btnRetry').addEventListener('click', function () {
    minValue = null;
    maxValue = null;
    orderNumber = 0;
    gameRun = false;

    setTimeout(() => {
        card.classList.add('scale-0');
    }, 500);

    setTimeout(() => {
        min.value = "";
        max.value = "";
        LabelMin.innerText = "";
        LabelMax.innerText = "";
    
        let game = document.querySelectorAll('.game');
        [...game].map(el => 
           el.classList.add('collapse'));
        let start = document.querySelectorAll('.start');
        [...start].map(el =>
           el.classList.remove('collapse')); 
        card.classList.remove('scale-0');   
    }, 1000);

})

document.querySelector('#btnOver').addEventListener('click', function () {
    if (gameRun){
        if (answerNumber > maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.ceil((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = answerText();
            
        }
    }
})

document.querySelector('#btnLess').addEventListener('click', function () {
    if (gameRun){
        if (answerNumber < minValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber -1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = answerText();
            text20(answerNumber);
        }
    }
})

document.querySelector('#btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = winText();
        gameRun = false;
    }
})
