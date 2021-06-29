<?php

try {
  $db = new PDO('mysql:dbname=algo_fight;host=localhost;charset=UTF8', 'root', '');
} catch (\Throwable $th) {
  var_dump($th);
  die();
}
