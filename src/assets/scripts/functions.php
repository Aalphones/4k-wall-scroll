<?php

include './classes.php';

function sqlSelect($sql)
{
  try {
    include './db.php';

    $pdo = new PDO('mysql:host=' . $database_host . '; dbname=' . $database_name, $database_user, $database_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);;
  } catch (PDOException $e) {
    echo 'Database error. ' . $e->getMessage();
    return [];
  }
}

function sqlExecute($sql)
{
  try {
    include './db.php';

    $pdo = new PDO('mysql:host=' . $database_host . '; dbname=' . $database_name, $database_user, $database_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    $pdo->exec($sql);

    return true;
  } catch (PDOException $e) {
    echo 'Database error. ' . $e->getMessage();
    return false;
  }
}
