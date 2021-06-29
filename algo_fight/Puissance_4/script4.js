const winnerSpot = document.getElementById("winnerSpot");
const restartButton = document.getElementById("restart");
const J1scriptNotOk = document.getElementById("J1scriptNotOk");
const J2scriptNotOk = document.getElementById("J2scriptNotOk");
const J1Count = document.getElementById("J1Count")
const FairCount = document.getElementById("FairCount")
const J2Count = document.getElementById("J2Count")


let IAFightIteration = 0;
let actualIteration = 0;

if (localStorage["IAFightIteration"]) {
    if (Number(localStorage["IAFightIteration"]) >= 3) {
        IAFightIteration = Number(localStorage["IAFightIteration"])
        console.log("%cnombre maximal d'itération : " + IAFightIteration, 'background: #222; color: #bada55; padding: 5px;');
    }
}
let invalidCodeFor = []

let J1WinCount = 0
let J2WinCount = 0;
let fairCount = 0;

class Puissance4 {
    constructor() {
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
        if (localStorage["isJ1IA"] == "ok" || localStorage["isJ2IA"] == "ok") {
            if (localStorage['isJ2IA'] == "ok") {
                this.pseudoPlayer2 = "ORDI 2"
                this.isJ2IA = true;
                this.constructIABoard(2)
            }
            if (localStorage["isJ1IA"] == "ok") {
                this.isJ1IA = true;
                this.pseudoPlayer1 = "ORDI 1"

                this.constructIABoard(1)
                try {
                    console.log("%cCa part en test", "background: #EEE6D8; padding : 10px")
                    this.IAplays()
                    if (actualIteration < IAFightIteration) {
                        setTimeout(() => {
                            console.warn("itération : " + actualIteration + " / " + IAFightIteration)

                            restart()

                        }, 20);
                    }

                } catch (error) {
                    console.log("probleme ici")
                    if (this.actualTag == this.J1Tag) {
                        invalidCodeFor.push("J1fail")
                        console.log(invalidCodeFor)
                    }
                    if (this.isJ2IA) {
                        try {
                            
                            this.J2IAConstitution(this.BOARD);
                            
                        } catch (error) {
                            invalidCodeFor.push("J2fail")
                            console.log(invalidCodeFor)
                        }
                    }
                    if (invalidCodeFor.length != 0) {
                        console.log("probleme dans ce coin")

                        this.codeIsInvalid()


                    }
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

    checkWin() {
        let indexsOfLastMove = this.lastMove.split("-");
        let colonne = indexsOfLastMove[0];
        let ligne = indexsOfLastMove[1];

        //horizontal
        let count = 0;
        for (let j = 0; j < this.casesX; j++) {
            count = (this.BOARD[colonne][j] == this.actualTag) ? count + 1 : 0;
            if (count >= 4) {
                if (this.actualTag == this.J1Tag) {
                    this.currentSituation = 1
                } else {
                    this.currentSituation = 2
                }
                return this.actualTag;
            }
        }
        // Vertical
        count = 0;
        for (let i = 0; i < this.casesX; i++) {
            count = (this.BOARD[i][ligne] == this.actualTag) ? count + 1 : 0;
            if (count >= 4) {
                if (this.actualTag == this.J1Tag) {
                    this.currentSituation = 1
                } else {
                    this.currentSituation = 2
                }
                return this.actualTag;
            }
        }
        // Diagonal

        if (
            (this.BOARD[0][2] == this.actualTag && this.BOARD[1][3] == this.actualTag && this.BOARD[2][4] == this.actualTag && this.BOARD[3][5] == this.actualTag) ||
            (this.BOARD[0][1] == this.actualTag && this.BOARD[1][2] == this.actualTag && this.BOARD[2][3] == this.actualTag && this.BOARD[3][4] == this.actualTag) ||
            (this.BOARD[1][2] == this.actualTag && this.BOARD[3][4] == this.actualTag && this.BOARD[4][5] == this.actualTag && this.BOARD[2][3] == this.actualTag) ||
            (this.BOARD[2][0] == this.actualTag && this.BOARD[3][1] == this.actualTag && this.BOARD[4][2] == this.actualTag && this.BOARD[5][3] == this.actualTag) ||
            (this.BOARD[0][0] == this.actualTag && this.BOARD[1][1] == this.actualTag && this.BOARD[2][2] == this.actualTag && this.BOARD[3][3] == this.actualTag) ||
            (this.BOARD[1][1] == this.actualTag && this.BOARD[2][2] == this.actualTag && this.BOARD[3][3] == this.actualTag && this.BOARD[4][4] == this.actualTag) ||
            (this.BOARD[2][2] == this.actualTag && this.BOARD[3][3] == this.actualTag && this.BOARD[4][4] == this.actualTag && this.BOARD[5][5] == this.actualTag) ||
            (this.BOARD[1][0] == this.actualTag && this.BOARD[2][1] == this.actualTag && this.BOARD[3][2] == this.actualTag && this.BOARD[4][3] == this.actualTag) ||
            (this.BOARD[2][1] == this.actualTag && this.BOARD[3][2] == this.actualTag && this.BOARD[4][3] == this.actualTag && this.BOARD[5][4] == this.actualTag) ||
            (this.BOARD[3][2] == this.actualTag && this.BOARD[4][3] == this.actualTag && this.BOARD[5][4] == this.actualTag && this.BOARD[6][5] == this.actualTag) ||
            (this.BOARD[3][1] == this.actualTag && this.BOARD[4][2] == this.actualTag && this.BOARD[5][3] == this.actualTag && this.BOARD[6][4] == this.actualTag) ||
            (this.BOARD[3][0] == this.actualTag && this.BOARD[4][1] == this.actualTag && this.BOARD[5][2] == this.actualTag && this.BOARD[6][3] == this.actualTag)) {
            if (this.actualTag == this.J1Tag) {
                this.currentSituation = 1
            } else {
                this.currentSituation = 2
            }
            return this.actualTag;
        }



        // Anti-diagonal
        if (
            (this.BOARD[0][3] == this.actualTag && this.BOARD[1][2] == this.actualTag && this.BOARD[2][1] == this.actualTag && this.BOARD[3][0] == this.actualTag) ||
            (this.BOARD[0][4] == this.actualTag && this.BOARD[1][3] == this.actualTag && this.BOARD[2][2] == this.actualTag && this.BOARD[3][1] == this.actualTag) ||
            (this.BOARD[1][3] == this.actualTag && this.BOARD[2][2] == this.actualTag && this.BOARD[3][1] == this.actualTag && this.BOARD[4][0] == this.actualTag) ||
            (this.BOARD[0][5] == this.actualTag && this.BOARD[1][4] == this.actualTag && this.BOARD[2][3] == this.actualTag && this.BOARD[3][2] == this.actualTag) ||
            (this.BOARD[1][4] == this.actualTag && this.BOARD[2][3] == this.actualTag && this.BOARD[3][2] == this.actualTag && this.BOARD[4][1] == this.actualTag) ||
            (this.BOARD[2][3] == this.actualTag && this.BOARD[3][2] == this.actualTag && this.BOARD[4][1] == this.actualTag && this.BOARD[5][0] == this.actualTag) ||
            (this.BOARD[1][5] == this.actualTag && this.BOARD[2][4] == this.actualTag && this.BOARD[3][3] == this.actualTag && this.BOARD[4][2] == this.actualTag) ||
            (this.BOARD[2][4] == this.actualTag && this.BOARD[3][3] == this.actualTag && this.BOARD[4][2] == this.actualTag && this.BOARD[5][1] == this.actualTag) ||
            (this.BOARD[3][3] == this.actualTag && this.BOARD[4][2] == this.actualTag && this.BOARD[5][1] == this.actualTag && this.BOARD[6][0] == this.actualTag) ||
            (this.BOARD[2][5] == this.actualTag && this.BOARD[3][4] == this.actualTag && this.BOARD[4][3] == this.actualTag && this.BOARD[5][2] == this.actualTag) ||
            (this.BOARD[3][4] == this.actualTag && this.BOARD[4][3] == this.actualTag && this.BOARD[5][2] == this.actualTag && this.BOARD[6][1] == this.actualTag) ||
            (this.BOARD[3][5] == this.actualTag && this.BOARD[4][4] == this.actualTag && this.BOARD[5][3] == this.actualTag && this.BOARD[6][2] == this.actualTag)) {
            if (this.actualTag == this.J1Tag) {
                this.currentSituation = 1
            } else {
                this.currentSituation = 2
            }
            return this.actualTag;
        }
    }
    printMove(x) {
        this.tour += 1;
        for (let i = 0; i < this.BOARD[x].length; i++) {

            if (this.BOARD[x][i] == 0) {
                this.BOARD[x][i] = this.actualTag;
                this.lastMove = `${x}-${i}`

                return;
            }
        }
        return;
    }
    changePlayer() {
        if (this.actualTag == this.J1Tag) {
            this.actualTag = this.J2Tag;
        } else {
            this.actualTag = this.J1Tag;
        }
    }
    checkFullBoard() {
        for (let i = 0; i < this.casesY; i++) {
            if (this.BOARD[i][1] == "") {
                return;
            }
        }
        this.currentSituation = 0;
        this.stopTheGame();
        this.showEnd();
    }

    checkFair() {
        for (let i = 0; i < this.casesX; i++) {
            for (let j = 0; j < this.casesY; j++) {
                if (this.BOARD[i][j] == "") {
                    return false;
                }
            }
        }
        this.currentSituation = 0;
        this.actualTag = "over";
        return true;
    }


    fin() {
        return this.currentSituation;
    }
    showEnd() {
        let message = "";
        switch (this.currentSituation) {
            case -1:
                return;

            case 0:
                message = "Égalité"
                fairCount++
                break;

            case 1:
                message = `${this.pseudoPlayer1} a remporté la manche`
                J1WinCount++
                break;

            case 2:
                message = `${this.pseudoPlayer2} a remporté la manche`
                J2WinCount++
                break;

            default:
                break;

        }
        winnerSpot.innerHTML = `${message}`
        if (!this.isJ1IA || !this.isJ2IA) {
            restartButton.classList.remove("hidden");
        }
        this.printScore();
    }
    printScore() {
        J1Count.innerHTML = J1WinCount;
        FairCount.innerHTML = fairCount;
        J2Count.innerHTML = J2WinCount;
    }
    stopTheGame() {
        console.log("%cStop the game", "background: #DAAB3A; padding : 10px;")

        const board = document.getElementById("gameBoard")

        board.classList.add("notClickable");


        restartButton.classList.remove("hidden");

        this.actualTag == "over"
        if (invalidCodeFor.length > 0) {
            actualIteration = IAFightIteration
        }
    }
    checkIsFull(x) {
        let res = false;
        for (let i = 0; i < this.BOARD[x].length; i++) {
            if (this.BOARD[x][i] == 0) {
                res = true;
            }
        }
        return res;
    }
    async jouer(x) {

        if (invalidCodeFor.length == 0) {

            if (this.checkIsFull(x)) {
                this.printMove(x);
                this.render();
                let isThereCheat = await getOldAndStockNewBoard(this.BOARD);
                console.log("%cSI CA PASSE PAS ICI CA CRAINT", "background : red; color : white; padding : 10px;")
                console.log(this.actualTag + " Is there cheat ? : "+ isThereCheat)
                if (isThereCheat == true) {
                    if (this.actualTag   == this.J1Tag) {
                        invalidCodeFor.push("J1fail");
                        console.log(invalidCodeFor)
                    } else if (this.actualTag   == this.J2Tag) {
                        invalidCodeFor.push("J2fail");
                        console.log(invalidCodeFor)
                    }

                    this.stopTheGame();
                    this.codeIsInvalid();

                }
                if (this.checkWin(this.BOARD) == this.actualTag) {
                    this.actualTag == "over";
                    this.showEnd();
                    this.stopTheGame();
                    actualIteration++
                    console.log(this.BOARD)
                    if (this.isJ1IA && this.isJ2IA) {
                        if (actualIteration < IAFightIteration) {
                            console.warn("\\\\itération : " + actualIteration + " / " + IAFightIteration)
                            return;

                        } else {
                            console.error("itération : " + actualIteration + " / " + IAFightIteration)

                            console.log("%c on arrête", "background : lightblue;padding: 10px;")
                            return;
                        }
                    }
                }
                if (this.checkFair()) {
                    this.actualTag == "over";
                    this.showEnd()
                    this.stopTheGame();
                    actualIteration++
                    if (this.isJ1IA && this.isJ2IA) {
                        console.log("%c" + actualIteration + " / " + IAFightIteration, "background : lightsalmon;")
                        if (actualIteration < IAFightIteration) {
                            return;
                        } else {
                            console.log("%c on arrête but FAIR", "background : lightblue;padding: 10px;")
                            return;
                        }
                    }
                }
                if (this.actualTag != "over" && this.fin() == -1) {
                    this.changePlayer();
                    if ((this.actualTag == this.J1Tag && this.isJ1IA) || (this.actualTag == this.J2Tag && this.isJ2IA)) {
                        console.error("IA Plays() !")
                        this.IAplays()
                    }
                };
            }

        } else {
            this.codeIsInvalid();
            this.stopTheGame();
        }
    }

    randomPlay() {
        let emptySlots = [];
        for (let i = 0; i < this.casesX; i++) {
            if (this.BOARD[i][5] == 0) {
                emptySlots.push(i);
            }
        }
        if (emptySlots.length > 0) {
            let rndSlot = Math.floor(Math.random() * emptySlots.length);
            let index = emptySlots[rndSlot]
            this.jouer(index);

        }
    }

    constructIABoard(player) {
        if (player == 2) {
            if (localStorage['J2Code'].length == 0) {
                console.log("code vierge J2")
                invalidCodeFor.push("J2fail")
                console.log(invalidCodeFor)
            }
            try {
                this.J2IAConstitution = new Function("board", localStorage['J2Code'])

            } catch {
                J2scriptNotOk.innerHTML = "erreur de script J2 : J2 éliminé pour code mal construit. "
                console.log("J2 code invalide")
                invalidCodeFor.push("J2fail")
                console.log(invalidCodeFor)
            }
        } else if (player == 1) {
            if (localStorage['J1Code'].length == 0) {
                console.log("code vierge J1")

                invalidCodeFor.push("J1fail")
                console.log(invalidCodeFor)
            }
            try {
                this.J1IAConstitution = new Function("board", localStorage['J1Code'])

            } catch {
                J1scriptNotOk.innerHTML = "erreur de script J1 : J1 éliminé pour code mal construit."
                console.log("J1 code invalide")

                invalidCodeFor.push("J1fail")
                console.log(invalidCodeFor)
            }
        }
    }

    IAplays() {
        if (this.actualTag == this.J1Tag) {

            let id = this.J1IAConstitution(this.BOARD);
            if (isNaN(id)) {
                this.randomPlay();
            } else if (this.checkIsFull(id)) {
                this.jouer(id);
            } else {
                this.randomPlay()
            }
        } else if (this.actualTag == this.J2Tag) {
            let id = "random"
            try {
                id = this.J2IAConstitution(this.BOARD);
            } catch (error) {
                invalidCodeFor.push("J2fail")
                console.log(invalidCodeFor)
            }
            if (isNaN(id)) {
                this.randomPlay();
            } else if (this.checkIsFull(id)) {
                this.jouer(id);
            } else {
                this.randomPlay()
            }
        }
    }

    codeIsInvalid() {
        console.log(invalidCodeFor)
        if (invalidCodeFor.includes("J1fail") && invalidCodeFor.includes("J2fail")) {
            this.currentSituation = 0;
            this.showEnd();
            J1scriptNotOk.innerHTML = "erreur de script J1 : J1 éliminé pour code mal construit."
            J2scriptNotOk.innerHTML = "erreur de script J2 : J2 éliminé pour code mal construit."

            this.stopTheGame()
        } else if (invalidCodeFor.includes("J1fail") && invalidCodeFor.includes("J2fail") == false) {
            this.currentSituation = 2;
            J1scriptNotOk.innerHTML = "erreur de script J1 : J1 éliminé pour code mal construit."

            this.showEnd();
            this.stopTheGame()
        } else if (invalidCodeFor.includes("J1fail") == false && invalidCodeFor.includes("J2fail")) {
            this.currentSituation = 1
            J2scriptNotOk.innerHTML = "erreur de script J2 : J2 éliminé pour code mal construit."

            this.showEnd();
            this.stopTheGame()
        }
        invalidCodeFor = []
    }

}


    setNewGameInSession("Puissance4")
    jeu = new Puissance4();

window.addEventListener("click", function (e) {
    if (e.target.parentNode.classList.contains('colonne')) {
        let id = e.target.parentNode.id
        var index = id.split("-", 2);
        jeu.jouer(index[1])

    } else if (e.target.classList.contains('buttonRestart')) {
        restart();
    };

})



async function restart() {
    const board = document.getElementById("gameBoard")

    board.innerHTML = ""
    winnerSpot.innerHTML = ""
    restartButton.classList.add('hidden')
    board.classList.remove("notClickable")
    delete jeu;
    
    await setNewGameInSession("Puissance4")
    jeu = new Puissance4();
}

async function getOldAndStockNewBoard(board) {
    const formData = new FormData();

    boardString = JSON.stringify(board)

    formData.append("board", boardString);

    let res = await fetch("../antiCheat.php", {
        method: "post",
        body: formData,
    });

    const previousBoard = await res.json(); // EST un JSON
    console.log("%cLE TEST DE TRICHE : ", "color : red; padding : 20px;")
    console.log(previousBoard)
    console.log(board);
    let nbOfDiff = 0;
    let finalRes = false;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            console.log(board[i][j] + " et " + previousBoard[i][j])
            if (board[i][j] != previousBoard[i][j]) {
                nbOfDiff++
            }
        }
    }
    if (nbOfDiff > 1 || nbOfDiff < 1) {
        finalRes = true;
    }

    return finalRes;
}

async function setNewGameInSession(game) {
    const formData = new FormData();
    const data = game
    console.log(data)
    formData.append("game", data);

    let res = await fetch("../pushNewBoard.php", {
        method: "post",
        body: formData,
    });

    const laRes = await res.json(); // EST un JSON
    console.log("%cLe tableau en Session est mit à neuf", "background : lightblue; padding : 8px;")
}

//          TODO
//retoucher l'esthetique
//XXXXX quand les deux sont des IA la partie se fait et à la fin plante C REGLé
//XXXXX Faire le tuto