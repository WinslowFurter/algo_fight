<?php
include("../db.php");
file_put_contents('postArray.txt', print_r($_POST, true));
session_start();


if (
  isset($_POST["isJ2IA"]) && $_POST["isJ2IA"] == "ok"
) {

  try {
    $db->beginTransaction();
    $sql = "INSERT INTO `algos` (`id`, `name`, `nameId`, `content`, `victoryCount`, `fairCount`, `defeatCount`, `jeu`) VALUES (NULL, ?, '', ?, '0', '0', '0', 'morpion');";
    $req = $db->prepare($sql);
    $req->bindValue(1, $_POST["J2CodeName"], PDO::PARAM_STR);
    $req->bindValue(2, $_POST["J2Code"], PDO::PARAM_STR);


    if (!$req->execute()) {
      file_put_contents('reqExecCode2.txt', print_r("error try beginTransac l 20", true));
    }

    $J2ID = $db->lastInsertId();
    $J2CodeName = $_POST["J2CodeName"]."#".$J2ID;
      $sql = "UPDATE `algos` SET `nameId` = ? WHERE `algos`.`id` = ?;";
      $req = $db->prepare($sql);
      $req->bindValue(1, $J2CodeName, PDO::PARAM_STR);
      $req->bindValue(2, $J2ID, PDO::PARAM_STR);

      if (!$req->execute()) {
        file_put_contents('reqExecCode2NameEdit.txt', print_r($J2CodeName, true));
      }
    

    $db->commit();
  } catch (\Throwable $th) {
    $db->rollBack();
    file_put_contents('reqExecCode2final.txt', print_r("error name upload C LA D l 35", true));
  }
  $_SESSION["J2CodeIDName"] = $J2CodeName;
}







if (
  isset($_POST["isJ1IA"]) && $_POST["isJ1IA"] == "ok"
) {

  try {
    $db->beginTransaction();
    $sql = "INSERT INTO `algos` (`id`, `name`, `nameId`, `content`, `victoryCount`, `fairCount`, `defeatCount`, `jeu`) VALUES (NULL, ?, '', ?, '0', '0', '0', 'morpion');";
    $req = $db->prepare($sql);
    $req->bindValue(1, $_POST["J1CodeName"], PDO::PARAM_STR);
    $req->bindValue(2, $_POST["J1Code"], PDO::PARAM_STR);


    if (!$req->execute()) {
      file_put_contents('reqExecCode1.txt', print_r("error try beginTransac l 20", true));
    }

    $J1ID = $db->lastInsertId();
    $J1CodeName = $_POST["J1CodeName"]."#".$J1ID;
      $sql = "UPDATE `algos` SET `nameId` = ? WHERE `algos`.`id` = ?;";
      $req = $db->prepare($sql);
      $req->bindValue(1, $J1CodeName, PDO::PARAM_STR);
      $req->bindValue(2, $J1ID, PDO::PARAM_STR);

      if (!$req->execute()) {
        file_put_contents('reqExecCode1NameEdit.txt', print_r($J1CodeName, true));
      }
    

    $db->commit();
  } catch (\Throwable $th) {
    $db->rollBack();
    file_put_contents('reqExecCode1final.txt', print_r("error name upload C LA D l 35", true));
  }
  $_SESSION["J1CodeIDName"] = $J1CodeName;
}
?>