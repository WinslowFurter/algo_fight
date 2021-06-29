<?php
include("../db.php");
file_put_contents('whatisinmyPOST.txt', print_r($_POST, true));
session_start();


try {
    $db->beginTransaction();
    $sql = "INSERT INTO `games` (`id`, `id_algo1`, `id_algo2`, `isValid_algo1`, `isValid_algo2`, `iterations`, `victoryCountJ1`, `victoryCountJ2`, `fairCount`, `jeu`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, 'morpion');";
    $req = $db->prepare($sql);
    $req->bindValue(1, $_POST["j1"], PDO::PARAM_STR);
    $req->bindValue(2, $_POST["j2"], PDO::PARAM_STR);
    if (
        isset($_POST["J1Fail"]) && $_POST["J1Fail"] == "non" &&
        isset($_POST["J2Fail"]) && $_POST["J2Fail"] == "non"
    ) {



        $req->bindValue(3, 1, PDO::PARAM_INT);
        $req->bindValue(4, 1, PDO::PARAM_INT);
        $req->bindValue(5, $_POST["fightIteration"], PDO::PARAM_INT);
        $req->bindValue(6, $_POST["J1Win"], PDO::PARAM_INT);
        $req->bindValue(7, $_POST["J2Win"], PDO::PARAM_INT);
        $req->bindValue(8, $_POST["fairCount"], PDO::PARAM_INT);

    } else if (isset($_POST["J1Fail"]) && $_POST["J1Fail"] == "oui") {
        $req->bindValue(3, 0, PDO::PARAM_INT);
        //C'est j1 la merde
    } else if (isset($_POST["J2Fail"]) && $_POST["J2Fail"] == "oui") {
        $req->bindValue(4, 0, PDO::PARAM_INT);
        //C'est j2 la merde
    }
        if (!$req->execute()) {
            file_put_contents('claD.txt', print_r("error try beginTransac l 20", true));
        }
        $db->commit();    
} catch (\Throwable $th) {
    $db->rollBack();
    file_put_contents('cladtavu.txt', print_r("error name upload C LA D l 35", true));
}

if (
    isset($_POST["J1Fail"]) && $_POST["J1Fail"] == "non" &&
    isset($_POST["J2Fail"]) && $_POST["J2Fail"] == "non"
) {

    $db->beginTransaction();
    $sql = "UPDATE algos
    SET victoryCount=victoryCount+1
    WHERE nameId=?";
    $req = $db->prepare($sql);
    $req->bindValue(1, $_POST['winner'], PDO::PARAM_STR);

    if (!$req->execute()) {
        file_put_contents('lagrosseD.txt', print_r($req, true));
    }
    $db->commit(); 

    $db->beginTransaction();
    $sql = "UPDATE algos
    SET defeatCount=defeatCount+1
    WHERE nameId='".$_POST['loser']."'";
    $req = $db->prepare($sql);
    if (!$req->execute()) {
        file_put_contents('lagrosseLoose.txt', print_r($sql, true));
    }
    $db->commit(); 

}