<?php
header('Content-Type: application/json');
session_start();
http_response_code(200);

    $res = $_SESSION['board']; //On réccupère le dernier board stocké en Session
    $toPush=$_POST["board"]; // On réccupère le nouveau board envoyé
    $_SESSION['board'] = $toPush; // On stock en session le dernier board
    echo $res; // On envoie le dernier board stocké;
