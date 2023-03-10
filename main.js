document.addEventListener('DOMContentLoaded', function() {
    function createArray (n) {
        const arr = [];
        for (let i = 1; i <= n; i++) {
            arr.push(i);
            arr.push(i)
        }
        return arr;
    }
    
    
    function shuffle (array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function createCard (number) {
        let card = document.createElement('div');
        card.textContent = number;
        card.classList.add('card');
        card.classList.add('closed');
        return card;
    }

    function createForm () {
        const form = document.createElement('form');
        form.classList.add('form');
        const input = document.createElement('input');
        input.classList.add('input');
        input.placeholder = "enter number of cards";
        input.type = 'number';
        input.min = '4';
        input.step = '2';
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = 'start game';

        const ruleText = document.createElement('p');
        ruleText.classList.add('rule-text');
        ruleText.textContent = 'number must be from 4 to 10';

        function isNumberValid(number) {
            return (number % 2 === 0) && (number >= 4) && (number <= 10);
        }

        form.addEventListener('submit', function(e){
            e.preventDefault();
            const number = Number(input.value);

            if (isNumberValid(number)){
                createNewGame(number);
            }
            else {
                createNewGame(16);
            }
        })

        form.appendChild(input);
        form.appendChild(ruleText);
        form.appendChild(button);
        
        let root = document.querySelector('#root');
        root.innerHTML = "";
        root.appendChild(form);
    }

    createForm();

    
    
    function createNewGame (cardsNumber) {
        let root = document.querySelector('#root');
        root.innerHTML = "";
        let openedCardsNumber = 0;
        const gameCardsArray = document.createElement('div');
        gameCardsArray.classList.add('cards-list');
        const gameNumbersArray = shuffle(createArray(cardsNumber/2));

        let cardsCount = 0;
        let count = 1;
        const openedCards = [];
        let clicksCount = 0;

        function cardClick (cardsCount, id) {
            clicksCount++;
            let card = document.getElementById(id)
            if (openedCardsNumber === cardsNumber - 2) {
                if (cardsCount === 1) {
                
                    card.classList.remove('closed');
                    openedCards.push(id);
                    compareCards();
                    
                    cardsCount = 1;
                    return cardsCount;
                }
            }

            if (cardsCount === 0 || cardsCount === 1) {
                card.classList.remove('closed');
                openedCards.push(id);
                cardsCount++;
                return cardsCount;
            }

            if (cardsCount === 2) {
                
                card.classList.remove('closed');
                compareCards();
                openedCards.push(id);
                cardsCount = 1;
                return cardsCount;
            }
        }

        function compareCards () {
            let card1 = document.getElementById(openedCards[0]);
            let card2 = document.getElementById(openedCards[1]);
            openedCards.length = 0;
            if (card1.textContent === card2.textContent) {
                card1.classList.add('good');
                card2.classList.add('good');
                openedCardsNumber+=2;
                isVictory();
            }
            else {
                card1.classList.add('closed');
                card2.classList.add('closed');
            }
        }

        function isVictory() {
            if (openedCardsNumber === cardsNumber) {
                const end = document.createElement('div');
                end.textContent = "you win!";
                end.classList.add('end-card');

                const secondsText = document.createElement('div');
                secondsText.textContent = `it took you ${60 - timerElement.textContent} seconds`;
                secondsText.classList.add('seconds');

                const clicksText = document.createElement('div');
                clicksText.textContent = `and ${clicksCount} clicks`;
                clicksText.classList.add('clicks');

                const newGameBtn = document.createElement('button');
                newGameBtn.classList.add('new-game');
                newGameBtn.textContent = "start new game";
                newGameBtn.addEventListener('click', function() {
                    
                    createForm();
                });
                end.append(secondsText);
                end.append(clicksText);
                end.append(newGameBtn);
                clearInterval(timerId);
                root.append(end);
                
            }
        }


        for (let i of gameNumbersArray) {
            let card = createCard(i);
            card.id = count;
            card.addEventListener('click', function(event){
                const id = event.target.id;
                if (event.target.classList.contains('closed')){
                    cardsCount = cardClick(cardsCount, id);
                }
                
            });
            gameCardsArray.appendChild(card);
            count++;
        }

        function gameOver() {
            const end = document.createElement('div');
                end.textContent = "time's up!";
                end.classList.add('end-card');
                const newGameBtn = document.createElement('button');
                newGameBtn.classList.add('new-game');
                newGameBtn.textContent = "start new game";
                newGameBtn.addEventListener('click', function() {
                    clearInterval(timerId);
                    createForm();
                });
                end.appendChild(newGameBtn);
                root.append(end);
        }

        

        root.appendChild(gameCardsArray);
        const seconds = 60;
        const timerElement = document.createElement('div');
        timerElement.classList.add('timer');
        timerElement.textContent = seconds;
        root.appendChild(timerElement);

        function startTimer() {
            let seconds = timerElement.textContent;
            if (seconds <= 0 ){
                clearInterval(timerId);
                gameOver();
            }
            else {
                seconds--;
                timerElement.textContent = seconds;
            }
        }
        const timerId = setInterval(startTimer, 1000);
    }

    
    
    
})
