<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>📚Menu📚</title>
</head>

<body>
    <main>
        <div class="codeBox">
            <section id="J1IA" class="box hidden">
                <label>Code Name 1</label>
                <input type=text id="J1CodeName" value="CodeNoName">
                <label>Code J1</label>
                <textarea id="J1Code" class="boxCode"></textarea>
            </section>
        </div>
        <nav id="menu">
            <div>
                <label>Jeu:</label>
                <select id="selectGame">
                    <option value=1>❌Morpion⭕</option>
                    <option value=2>🟡Puissance4🔴</option>
                </select>
            </div>
            <section id="selectPlayers">
                <label>Joueur 1 :</label>
                <select id="joueur1">
                    <option selected value="">Choisissez un type de joueur</option>
                    <option value="human">🙋 Humain</option>
                    <option value="IA">🤖 I.A.</option>
                </select><label>Joueur 2 :</label>
                <select id="joueur2">
                    <option selected value="">Choisissez un type de joueur</option>
                    <option value="human">🙋 Humain</option>
                    <option value="IA">🤖 I.A.</option>
                </select>
            </section>
            <div id="IAFightIterationBox" class="hidden">
                <label for="IAFightIteration"><b>Nombre d'affrontement en IA</b>[0-100]</label>
                <input type="number" id="IAFightIteration" name="IAFightIteration" min="3" max="100">
            </div>
            <div id="aboutMorpionIA" class="hidden">
                <h3><u>Si vous voulez faire jouer une IA : </u></h3>
                <p><i>Ici un exemple de la grille,</br><b>"O"</b> signifie que le Joueur 1 à déjà coché la case
                        concernée</br><b>"X"</b>
                        est la marque du joueur 2</i></p>
                <img src="morpion_BOARD.JPG">

                <div id=morpionExemple>
                    <div class=morpionExempleSlot>1</div>
                    <div class=morpionExempleSlot>2</div>
                    <div class=morpionExempleSlot>3</div>
                    <div class=morpionExempleSlot>4</div>
                    <div class=morpionExempleSlot>5</div>
                    <div class=morpionExempleSlot>6</div>
                    <div class=morpionExempleSlot>7</div>
                    <div class=morpionExempleSlot>8</div>
                    <div class=morpionExempleSlot>9</div>
                </div>
            </div>
            <div id="aboutP4IA" class="hidden">
                <h3><u>Exemple de board :</u></h3>
                <img src="Puissance4_BOARD.JPG">
                <p>plateau représenté par le board ( <b>"Yellow" est le joueur 1</b>):</p>
                <img src="puissance4_Plateau.JPG" style="width:200px">
            </div>
            <button id="send">C'est parti !</button>
        </nav>
        <div class="codeBox">
            <section id="J2IA" class="box hidden">
                <label>Code Name 2</label>
                <input type=text id="J2CodeName" value="CodeNoName">
                <label>Code J2</label>
                <textarea id="J2Code" class="boxCode"></textarea>
            </section>
        </div>
    </main>
    <script src="script.js"></script>
</body>

</html>