const winnerSpot = document.getElementById("winnerSpot");
const restartButton = document.getElementById("restart");
const J1WinCounterId = document.getElementById("J1Counter");
const fairCounterId = document.getElementById("fairCounter");
const J2WinCounterId = document.getElementById("J2Counter");
const J1scriptNotOk = document.getElementById("J1scriptNotOk");
const J2scriptNotOk = document.getElementById("J2scriptNotOk");

let IAFightIteration = 0;
let actualIteration = 0;

let invalidCodeFor = [];

let J1WinCount = 0;
let J2WinCount = 0;
let fairCount = 0;

if (localStorage["IAFightIteration"]) {
    if (Number(localStorage["IAFightIteration"]) >= 3) {
        IAFightIteration = Number(localStorage["IAFightIteration"])
    }
}

class Morpion {
    constructor(id) {
        const board = document.getElementById(id)
        this.cases = 9;
        this.BOARD = [];
        this.J2Tag = "X";
        this.J1Tag = "O";
        this.GameOver = false;

        this.playerTag = this.J1Tag;
        this.player1isplaying = true;

        this.isJ1IA = false;
        this.isJ2IA = false;

        this.J1IAConstitution;
        this.J2IAConstitution;

        this.pseudoPlayer1 = "Joueur 1"
        this.pseudoPlayer2 = "Joueur 2"

        this.endgame = "";

        for (let i = 1; i <= this.cases; i++) {
            let x = 0;
            let y = 0;
            switch (i) {
                case 1:
                    x = 1;
                    y = 1;
                    break;
                case 2:
                    x = 1;
                    y = 2;
                    break;
                case 3:
                    x = 1;
                    y = 3;
                    break;
                case 4:
                    x = 2;
                    y = 1;
                    break;
                case 5:
                    x = 2;
                    y = 2;
                    break;
                case 6:
                    x = 2;
                    y = 3;
                    break;
                case 7:
                    x = 3;
                    y = 1;
                    break;
                case 8:
                    x = 3;
                    y = 2;
                    break;
                case 9:
                    x = 3;
                    y = 3;
                    break;
            }
            let arrayPosition = Number(i - 1);
            let cDiv = `<div class="case" id='${x}-${y}' data-position='${x}-${y}' data-arrayorder='${arrayPosition}' data-checked='no'></div>`
            board.innerHTML += cDiv;
            this.BOARD.push([`${x}-${y}`, ""]);
        }


        if (localStorage['isJ2IA'] == "ok" || localStorage['isJ1IA'] == "ok") {
            if (localStorage['isJ2IA'] == "ok") {
                this.pseudoPlayer2 = "ORDI 2"
                this.isJ2IA = true;
                this.constructIABoard(2)
            }
            if (localStorage["isJ1IA"] == "ok") {
                this.isJ1IA = true;
                this.pseudoPlayer1 = "ORDI 1"
                this.constructIABoard(1)
                if (invalidCodeFor.length == 0) {
                    try {
                        this.IAplays()
                    } catch {
                        if (this.player1isplaying) {
                            invalidCodeFor.push("J1fail")
                            console.log(invalidCodeFor)
                        }
                        if (this.isJ2IA) {
                            try {
                                this.J2IAConstitution();
                            } catch (error) {
                                invalidCodeFor.push("J2fail")
                                console.log(invalidCodeFor)
                            }
                        }
                        this.codeIsInvalid()
                    }
                } else {
                    this.codeIsInvalid()
                }
            }
        }
    }

    async checkWin(BOARD) {
        let winner = ""
        if ((BOARD[0][1] == (this.J1Tag) && BOARD[1][1] == (this.J1Tag) && BOARD[2][1] == (this.J1Tag)) ||
            (BOARD[0][1] == (this.J2Tag) && BOARD[1][1] == (this.J2Tag) && BOARD[2][1] == (this.J2Tag))

        ) {
            if (BOARD[0][1] == (this.J2Tag)) {
                winner = 2;
            } else {
                winner = 1;
            }
        } else if (
            (BOARD[0][1] == (this.J1Tag) && BOARD[3][1] == (this.J1Tag) && BOARD[6][1] == (this.J1Tag)) ||
            (BOARD[0][1] == (this.J2Tag) && BOARD[3][1] == (this.J2Tag) && BOARD[6][1] == (this.J2Tag))
        ) {
            if (BOARD[0][1] == (this.J2Tag)) {
                winner = 2;
            } else {
                winner = 1;
            }
        } else if (
            (BOARD[1][1] == (this.J1Tag) && BOARD[4][1] == (this.J1Tag) && BOARD[7][1] == (this.J1Tag)) ||
            (BOARD[1][1] == (this.J2Tag) && BOARD[4][1] == (this.J2Tag) && BOARD[7][1] == (this.J2Tag))

        ) {
            if (BOARD[1][1] == (this.J2Tag)) {
                winner = 2;
            } else {
                winner = 1;
            }
        } else if (
            (BOARD[2][1] == (this.J1Tag) && BOARD[5][1] == (this.J1Tag) && BOARD[8][1] == (this.J1Tag)) ||
            (BOARD[2][1] == (this.J2Tag) && BOARD[5][1] == (this.J2Tag) && BOARD[8][1] == (this.J2Tag))
        ) {
            if (BOARD[2][1] == (this.J2Tag)) {
                winner = 2;
            } else {
                winner = 1;
            }
        } else if (
            (BOARD[3][1] == (this.J1Tag) && BOARD[4][1] == (this.J1Tag) && BOARD[5][1] == (this.J1Tag)) ||
            (BOARD[3][1] == (this.J2Tag) && BOARD[4][1] == (this.J2Tag) && BOARD[5][1] == (this.J2Tag))
        ) {
            if (BOARD[3][1] == (this.J2Tag)) {
                winner = 2;
            } else {
                winner = 1;
            }
        } else if (
            (BOARD[6][1] == (this.J1Tag) && BOARD[7][1] == (this.J1Tag) && BOARD[8][1] == (this.J1Tag)) ||
            (BOARD[6][1] == (this.J2Tag) && BOARD[7][1] == (this.J2Tag) && BOARD[8][1] == (this.J2Tag))

        ) {
            if (BOARD[6][1] == (this.J2Tag)) {
                winner = 2;
            } else {
                winner = 1;
            }
        } else if (
            (BOARD[0][1] == (this.J1Tag) && BOARD[4][1] == (this.J1Tag) && BOARD[8][1] == (this.J1Tag)) ||
            (BOARD[0][1] == (this.J2Tag) && BOARD[4][1] == (this.J2Tag) && BOARD[8][1] == (this.J2Tag))

        ) {
            if (BOARD[0][1] == (this.J2Tag)) {
                winner = 2;
            } else {
                winner = 1;
            }
        } else if (
            (BOARD[2][1] == (this.J1Tag) && BOARD[4][1] == (this.J1Tag) && BOARD[6][1] == (this.J1Tag)) ||
            (BOARD[2][1] == (this.J2Tag) && BOARD[4][1] == (this.J2Tag) && BOARD[6][1] == (this.J2Tag))
        ) {
            if (BOARD[2][1] == (this.J2Tag)) {
                winner = 2;
            } else {
                winner = 1;
            }
        } else {
            return;
        }
        this.showEnd(winner);
        let winnerToPrint = "Joueur 1";
        if (winner == 2) {
            winnerToPrint = "Joueur 2"
        }
        this.stopTheGame();
        this.GameOver = true;
        actualIteration++
        console.warn(actualIteration + " / " + IAFightIteration + " | Winner : " + winnerToPrint)

        if (this.isJ1IA && this.isJ2IA) {
            if (actualIteration == IAFightIteration) {
                await stockGame()
                alert("Game over")
            }
            if (actualIteration < IAFightIteration) {
                setTimeout(function () {
                    restart();;
                }, 20);

            }
        }
    }

    printMove(e) {
        let target = e.dataset.arrayorder;
        e.innerHTML = this.playerTag;
        e.dataset.checked = this.playerTag;
        this.BOARD[target][1] = this.playerTag;
    }
    changePlayer() {
        if (this.player1isplaying) {
            this.playerTag = this.J2Tag;
            this.player1isplaying = false;

        } else {
            this.playerTag = this.J1Tag;
            this.player1isplaying = true;
        }
    }
    async checkFullBoard() {
        for (let i = 0; i < this.cases; i++) {
            if (this.BOARD[i][1] == "") {
                return;
            }
        }
        this.stopTheGame();
        this.showEnd(0);
        actualIteration++
        console.warn(actualIteration + " / " + IAFightIteration + "Last was Fair")
        if (this.isJ1IA && this.isJ2IA) {
            if (actualIteration == IAFightIteration) {
                await stockGame()
                alert("Game over")
            }
            if (actualIteration < IAFightIteration) {
                setTimeout(function () {
                    restart();;
                }, 20);

            }
        }
    }
    fin() {
        let BOARD = this.BOARD
        let currentSituation = ""
        for (let i = 0; i < this.cases; i++) {
            if (this.BOARD[i][1] == "") {
                currentSituation = -1;
            } else {
                currentSituation = 0;
            }
        }

        if ((BOARD[0][1] == (this.J1Tag) && BOARD[1][1] == (this.J1Tag) && BOARD[2][1] == (this.J1Tag)) ||
            (BOARD[0][1] == (this.J2Tag) && BOARD[1][1] == (this.J2Tag) && BOARD[2][1] == (this.J2Tag))

        ) {
            if (BOARD[0][1] == (this.J2Tag)) {
                currentSituation = 2;
            } else {
                currentSituation = 1;
            }
        } else if (
            (BOARD[0][1] == (this.J1Tag) && BOARD[3][1] == (this.J1Tag) && BOARD[6][1] == (this.J1Tag)) ||
            (BOARD[0][1] == (this.J2Tag) && BOARD[3][1] == (this.J2Tag) && BOARD[6][1] == (this.J2Tag))
        ) {
            if (BOARD[0][1] == (this.J2Tag)) {
                currentSituation = 2;
            } else {
                currentSituation = 1;
            }
        } else if (
            (BOARD[1][1] == (this.J1Tag) && BOARD[4][1] == (this.J1Tag) && BOARD[7][1] == (this.J1Tag)) ||
            (BOARD[1][1] == (this.J2Tag) && BOARD[4][1] == (this.J2Tag) && BOARD[7][1] == (this.J2Tag))

        ) {
            if (BOARD[1][1] == (this.J2Tag)) {
                currentSituation = 2;
            } else {
                currentSituation = 1;
            }
        } else if (
            (BOARD[2][1] == (this.J1Tag) && BOARD[5][1] == (this.J1Tag) && BOARD[8][1] == (this.J1Tag)) ||
            (BOARD[2][1] == (this.J2Tag) && BOARD[5][1] == (this.J2Tag) && BOARD[8][1] == (this.J2Tag))
        ) {
            if (BOARD[2][1] == (this.J2Tag)) {
                currentSituation = 2;
            } else {
                currentSituation = 1;
            }
        } else if (
            (BOARD[3][1] == (this.J1Tag) && BOARD[4][1] == (this.J1Tag) && BOARD[5][1] == (this.J1Tag)) ||
            (BOARD[3][1] == (this.J2Tag) && BOARD[4][1] == (this.J2Tag) && BOARD[5][1] == (this.J2Tag))
        ) {
            if (BOARD[3][1] == (this.J2Tag)) {
                currentSituation = 2;
            } else {
                currentSituation = 1;
            }
        } else if (
            (BOARD[6][1] == (this.J1Tag) && BOARD[7][1] == (this.J1Tag) && BOARD[8][1] == (this.J1Tag)) ||
            (BOARD[6][1] == (this.J2Tag) && BOARD[7][1] == (this.J2Tag) && BOARD[8][1] == (this.J2Tag))

        ) {
            if (BOARD[6][1] == (this.J2Tag)) {
                currentSituation = 2;
            } else {
                currentSituation = 1;
            }
        } else if (
            (BOARD[0][1] == (this.J1Tag) && BOARD[4][1] == (this.J1Tag) && BOARD[8][1] == (this.J1Tag)) ||
            (BOARD[0][1] == (this.J2Tag) && BOARD[4][1] == (this.J2Tag) && BOARD[8][1] == (this.J2Tag))

        ) {
            if (BOARD[0][1] == (this.J2Tag)) {
                currentSituation = 2;
            } else {
                currentSituation = 1;
            }
        } else if (
            (BOARD[2][1] == (this.J1Tag) && BOARD[4][1] == (this.J1Tag) && BOARD[6][1] == (this.J1Tag)) ||
            (BOARD[2][1] == (this.J2Tag) && BOARD[4][1] == (this.J2Tag) && BOARD[6][1] == (this.J2Tag))
        ) {
            if (BOARD[2][1] == (this.J2Tag)) {
                currentSituation = 2;
            } else {
                currentSituation = 1;
            }
        }
        return currentSituation;
    }
    showEnd(finalScore) {
        let message = "";
        switch (finalScore) {
            case -1:
                return;

            case 0:
                message = "??galit??"
                fairCount++
                break;

            case 1:
                message = `${this.pseudoPlayer1} ?? remport?? la partie`
                J1WinCount++
                break;

            case 2:
                message = `${this.pseudoPlayer2} ?? remport?? la partie`
                J2WinCount++
                break;

            default:
                break;

        }
        winnerSpot.innerHTML = `${message}`
        if (!this.isJ1IA || !this.isJ2IA) {
            restartButton.classList.remove("hidden");
        }
        this.printScoreCounter()
    }
    stopTheGame() {
        board.classList.add("notClickable");
    }
    checkIfChecked(id) {
        let eltCase = document.getElementById(id);
        if (eltCase == null) {
            return false;
        } else if (eltCase.dataset.checked == "no") {
            return true;
        }
    }
    async jouer(x, y) {
        let id = `${x}-${y}`
        let eltCase = document.getElementById(id);

        let canBeChecked = this.checkIfChecked(id);

        if (canBeChecked == true) {
            this.printMove(eltCase);
            let isThereCheat = await getOldAndStockNewBoard(this.BOARD);
            if (isThereCheat) {
                if (this.playerTag == this.J1Tag) {
                    invalidCodeFor.push("J1fail");
                    console.log(invalidCodeFor)

                } else {
                    invalidCodeFor.push("J2fail");
                    console.log(invalidCodeFor)

                }
                this.codeIsInvalid();
            }
            this.checkWin(this.BOARD)
            if (this.GameOver == false) {
                this.checkFullBoard()
                this.changePlayer();
                if ((this.player1isplaying && this.isJ1IA) || (this.player1isplaying == false && this.isJ2IA)) {
                    if (invalidCodeFor.length == 0) {
                        this.IAplays()
                    } else {
                        this.codeIsInvalid()
                    }
                }
            }
        }
    }
    randomPlay() {
        let emptySlots = [];
        for (let i = 0; i < this.cases; i++) {
            if (this.BOARD[i][1] == "") {
                emptySlots.push(this.BOARD[i][0]);
            }
        }
        if (emptySlots.length > 0) {
            let rndSlot = Math.floor(Math.random() * emptySlots.length);
            let indexs = emptySlots[rndSlot].split("-");
            this.jouer(indexs[0], indexs[1]);

        }
    }
    printScoreCounter() {
        J1WinCounterId.innerHTML = J1WinCount;
        fairCounterId.innerHTML = fairCount;
        J2WinCounterId.innerHTML = J2WinCount;
    }
    constructIABoard(player) {
        if (player == 2) {
            if (localStorage['J2Code'].length == 0) {
                invalidCodeFor.push("J2fail")
                console.log(invalidCodeFor)

            }
            try {
                this.J2IAConstitution = new Function("board", localStorage['J2Code'])

            } catch {
                J2scriptNotOk.innerHTML = "erreur de script J2 : J2 ??limin?? pour code mal construit. "
                invalidCodeFor.push("J2fail")
                console.log(invalidCodeFor)

            }
        } else if (player == 1) {
            if (localStorage['J1Code'].length == 0) {
                invalidCodeFor.push("J1fail")
                console.log(invalidCodeFor)

            }
            try {
                this.J1IAConstitution = new Function("board", localStorage['J1Code'])

            } catch {
                J1scriptNotOk.innerHTML = "erreur de script J1 : J1 ??limin?? pour code mal construit."
                invalidCodeFor.push("J1fail")
                console.log(invalidCodeFor)

            }
        }
    }
    async codeIsInvalid() {
        let finalScore = 0;
        console.log(invalidCodeFor)
        if (invalidCodeFor.includes("J1fail") && invalidCodeFor.includes("J2fail")) {
            finalScore = 0;
            this.showEnd(finalScore);
            J1scriptNotOk.innerHTML = "erreur de script J1 : J1 ??limin?? pour code mal construit."
            J2scriptNotOk.innerHTML = "erreur de script J2 : J2 ??limin?? pour code mal construit."

            this.stopTheGame()
        } else if (invalidCodeFor.includes("J1fail") && invalidCodeFor.includes("J2fail") == false) {
            finalScore = 2;
            J1scriptNotOk.innerHTML = "erreur de script J1 : J1 ??limin?? pour code mal construit."

            this.showEnd(finalScore);
            this.stopTheGame()
        } else if (invalidCodeFor.includes("J1fail") == false && invalidCodeFor.includes("J2fail")) {
            finalScore = 1
            J2scriptNotOk.innerHTML = "erreur de script J2 : J2 ??limin?? pour code mal construit."

            this.showEnd(finalScore);
            this.stopTheGame()
        }
        await stockGame()
        alert("Game over")

    }
    IAplays() {
        if (this.player1isplaying == true) {
            let caseIAWannaPlay = this.J1IAConstitution(this.BOARD);
            let id = this.getIDbyCaseNumber(caseIAWannaPlay);
            let indexs = id.split("-");
            if (isNaN(caseIAWannaPlay)) {
                this.randomPlay();
            } else if (this.checkIfChecked(id)) {
                this.jouer(indexs[0], indexs[1]);
            } else {
                this.randomPlay();
            }

        } else if (this.player1isplaying == false) {
            let caseIAWannaPlay = this.J2IAConstitution(this.BOARD);
            let id = this.getIDbyCaseNumber(caseIAWannaPlay);
            let indexs = id.split("-");
            if (isNaN(caseIAWannaPlay)) {
                this.randomPlay();
            } else if (this.checkIfChecked(id)) {
                this.jouer(indexs[0], indexs[1]);
            } else {
                this.randomPlay();
            }
        }
    }
    getIDbyCaseNumber(x) {
        let res = ""
        switch (x) {
            case 1:
                res = "1-1"
                break;
            case 2:
                res = "1-2"
                break;
            case 3:
                res = "1-3"
                break;
            case 4:
                res = "2-1"
                break;
            case 5:
                res = "2-2"
                break;
            case 6:
                res = "2-3"
                break;
            case 7:
                res = "3-1"
                break;
            case 8:
                res = "3-2"
                break;
            case 9:
                res = "3-3"
                break;
            default:
                break
        }
        return res;
    }
}


jeu = new Morpion('board');


window.addEventListener("click", function (e) {
    if (e.target.classList.contains('case')) {
        let id = e.target.id
        var indexs = id.split("-", 2);
        jeu.jouer(indexs[0], indexs[1])

    } else if (e.target.classList.contains('buttonRestart')) {
        restart();
    };
})

async function restart() {
    board.innerHTML = ""
    winnerSpot.innerHTML = ""
    restartButton.classList.add('hidden')
    board.classList.remove("notClickable")
    BOARD = []
    delete jeu;

    await setNewGameInSession("morpion")

    jeu = new Morpion('board');
}





//PHP

async function getOldAndStockNewBoard(board) {
    const formData = new FormData();

    boardString = JSON.stringify(board)

    formData.append("board", boardString);

    let res = await fetch("../antiCheat.php", {
        method: "post",
        body: formData,
    });

    const previousBoard = await res.json(); // EST un JSON


    let nbOfDiff = 0;
    let finalRes = false;
    for (let i = 0; i < board.length; i++) {
        if (board[i][1] != previousBoard[i][1]) {
            nbOfDiff++
        }
    }
    if (nbOfDiff > 1 || nbOfDiff < 1) {
        finalRes = true;
    }
    console.log("is " + jeu.playerTag + " cheating ? :" + finalRes)
    return finalRes;

}

async function setNewGameInSession(game) {
    const formData = new FormData();
    const data = game
    console.log("Nouvelle partie")
    formData.append("game", data);

    let res = await fetch("../pushNewBoard.php", {
        method: "post",
        body: formData,
    });

    const laRes = await res.json(); // EST un JSON
}


async function stockGame() {
    const formData = new FormData();
    var request = new XMLHttpRequest();





//let IAFightIteration = 0;
//let actualIteration = 0;
//let invalidCodeFor = [];
//let J1WinCount = 0;
//let J2WinCount = 0;
//let fairCount = 0;
//id="name1" data-name

    //ids
    const name1 = document.getElementById("name1");
    const name2 = document.getElementById("name2");
    var id1 = name1.dataset.name
    var id2 = name2.dataset.name
    formData.set("j1", id1);
    formData.set("j2", id2);
    //gagnant
    //s??ries
    formData.set("fightIteration", actualIteration);

    //nb victoire par joueur
    if(invalidCodeFor.length==0){
    formData.set("J1Win", J1WinCount);
    formData.set("J2Win", J2WinCount);
    if(J1WinCount>J2WinCount){
        formData.set("winner", id1);
        formData.set("loser", id2);
    } else if(J2WinCount>J1WinCount){
        formData.set("winner", id2);
        formData.set("loser", id1);
    }
    formData.set("fairCount", fairCount);  
    formData.set("J1Fail", "non");
    formData.set("J2Fail", "non");      
    }else{
        if (invalidCodeFor.includes("J1fail") && invalidCodeFor.includes("J2fail")) {
            formData.set("J1Fail", "oui");
            formData.set("J2Fail", "oui");
        } else if (invalidCodeFor.includes("J1fail") && invalidCodeFor.includes("J2fail") == false) {
            formData.set("J1Fail", "oui");
            formData.set("J2Fail", "non");

        } else if (invalidCodeFor.includes("J1fail") == false && invalidCodeFor.includes("J2fail")) {
            formData.set("J2Fail", "oui");
            formData.set("J1Fail", "non");

        }
    }


    //nb fair
    //jeu
    formData.set("jeu", "morpion");

    request.open("POST", "./stockGame.php", true);
    request.send(formData);
  
console.log("%cPartie Enregistree", "background : lightgreen; padding : 100px;")
}