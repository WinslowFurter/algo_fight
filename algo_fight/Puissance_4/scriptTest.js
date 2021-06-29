const winnerSpot = document.getElementById("winnerSpot");
const restartButton = document.getElementById("restart");
const J1scriptNotOk = document.getElementById("J1scriptNotOk");
const J2scriptNotOk = document.getElementById("J2scriptNotOk");
const J1Count = document.getElementById("J1Count")
const FairCount = document.getElementById("FairCount")
const J2Count = document.getElementById("J2Count")

let IAFightIteration = 0;
let actualIteration = 0;

let invalidCodeFor = [];

let J1WinCount = 0;
let J2WinCount = 0;
let fairCount = 0;

if (localStorage["IAFightIteration"]) {
    if (Number(localStorage["IAFightIteration"]) >= 3) {
        IAFightIteration = Number(localStorage["IAFightIteration"])
        console.log("%cnombre maximal d'itération : " + IAFightIteration, 'background: #222; color: #bada55; padding: 5px;');
    }
}

class Puissance4 {
    constructor(id) {
        this.casesX = 7;
        this.casesY = 6;
        this.J2Tag = "red";
        this.J1Tag = "yellow";
        this.actualTag = this.J1Tag
        this.lastMove = ""
        this.currentSituation = -1;
        this.tour = 0;
        this.isTested = false;

        this.isJ1IA = false;
        this.isJ2IA = false;

        this.J1IAConstitution;
        this.J2IAConstitution;

        this.GameOver = false;

        this.pseudoPlayer1 = "Joueur 1"
        this.pseudoPlayer2 = "Joueur 2"
        this.endgame = "";
        this.BOARD = Array(this.casesX);
        for (let i = 0; i < this.casesX; i++) {
            this.BOARD[i] = Array(this.casesY).fill(0);
        }

        this.render();


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
    render() {
        const board = document.getElementById("gameBoard")
        board.innerHTML = ""
        for (let x = 0; x < this.casesX; x++) {
            let col = `<section class="colonne" id='colonne-${x}'>`;

            for (let y = (this.casesY - 1); y > -1; y--) {

                col += `<article class="case">
                            <div class='space ${this.BOARD[x][y] != 0 ? this.BOARD[x][y] : ''}' id='id-${x}-${y}'></div>
                        </article>`
            }
            col += `</section>`
            board.innerHTML += col;

        }
    }
    checkWin(BOARD) {
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
    checkFullBoard() {
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
                message = "Égalité"
                fairCount++
                break;

            case 1:
                message = `${this.pseudoPlayer1} à remporté la partie`
                J1WinCount++
                break;

            case 2:
                message = `${this.pseudoPlayer2} à remporté la partie`
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
                J2scriptNotOk.innerHTML = "erreur de script J2 : J2 éliminé pour code mal construit. "
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
                J1scriptNotOk.innerHTML = "erreur de script J1 : J1 éliminé pour code mal construit."
                invalidCodeFor.push("J1fail")
                console.log(invalidCodeFor)

            }
        }
    }
    codeIsInvalid() {
        let finalScore = 0;
        console.log(invalidCodeFor)
        if (invalidCodeFor.includes("J1fail") && invalidCodeFor.includes("J2fail")) {
            finalScore = 0;
            this.showEnd(finalScore);
            J1scriptNotOk.innerHTML = "erreur de script J1 : J1 éliminé pour code mal construit."
            J2scriptNotOk.innerHTML = "erreur de script J2 : J2 éliminé pour code mal construit."

            this.stopTheGame()
        } else if (invalidCodeFor.includes("J1fail") && invalidCodeFor.includes("J2fail") == false) {
            finalScore = 2;
            J1scriptNotOk.innerHTML = "erreur de script J1 : J1 éliminé pour code mal construit."

            this.showEnd(finalScore);
            this.stopTheGame()
        } else if (invalidCodeFor.includes("J1fail") == false && invalidCodeFor.includes("J2fail")) {
            finalScore = 1
            J2scriptNotOk.innerHTML = "erreur de script J2 : J2 éliminé pour code mal construit."

            this.showEnd(finalScore);
            this.stopTheGame()
        }
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


jeu = new Puissance4('board');


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
    console.log("%cHey Cutie", "color : red; padding 5px;")
    delete jeu;

    await setNewGameInSession("Puissance4")

    jeu = new Puissance4('board');
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
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] != previousBoard[i][j]) {
                nbOfDiff++
            }
        }
    }
    if (nbOfDiff > 1 || nbOfDiff < 1) {
        finalRes = true;
    }
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