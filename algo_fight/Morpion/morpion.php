<?php
session_start();
file_put_contents('sessionMorpion.txt', print_r($_SESSION, true));
if(isset($_SESSION["J1CodeIDName"])){
    $j1name = $_SESSION["J1CodeIDName"];
}
if(isset($_SESSION["J2CodeIDName"])){
    $j2name = $_SESSION["J2CodeIDName"];
}
$board = array(["1-1", ""], ["1-2", ""], ["1-3", ""], ["2-1", ""], ["2-2", ""], ["2-3", ""], ["3-1", ""], ["3-2", ""], ["3-3", ""]);

$board = json_encode($board);


$_SESSION['board'] = $board;
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style2.css">
    <title>❌Morpion⭕</title>
</head>

<body>
<?php
if(isset($_SESSION["J1CodeIDName"])){
    echo '<p id="name1" data-name= '.$j1name.'> Pour réccuperer le code de Ordi1, gardez cet identifiant :'.$j1name;
}
if(isset($_SESSION["J2CodeIDName"])){
    echo '<p id="name2" data-name= '.$j2name.'> Pour réccuperer le code de Ordi2, gardez cet identifiant :'.$j2name;
}
?>
    <h2 id="J1scriptNotOk"></h2>
    <h2 id="J2scriptNotOk"></h2>
    <h2 id="winnerSpot"></h2>
    <button id="restart" class="hidden buttonRestart">Restart</button>
    <main id="boardContainer">
        <div id="board" class="grid"></div>
        <div id="countBoard">
            <div class="counter">
                <h2>J1 ( O )</h2>
                <h3 id="J1Counter">0</h3>
            </div>
            <div class="counter">
                <h2>FAIR</h2>
                <h3 id="fairCounter">0</h3>
            </div>
            <div class="counter">
                <h2>J2 ( X )</h2>
                <h3 id="J2Counter">0</h3>
            </div>
        </div>



    </main>

    <script src="script4.js" type="text/javascript"></script>
</body>

</html>