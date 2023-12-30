<?php

include 'classes.php';

function sqlSelect($sql)
{
  try {
    include 'db.php';

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
    include 'db.php';

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

function base64_to_disk($base64_string, $output_file)
{
  // open the output file for writing
  $ifp = fopen($output_file, 'wb');

  // split the string on commas
  // $data[ 0 ] == "data:image/png;base64"
  // $data[ 1 ] == <actual base64 string>
  $data = explode(',', $base64_string);

  // we could add validation here with ensuring count( $data ) > 1
  fwrite($ifp, base64_decode($data[1]));

  // clean up the file resource
  fclose($ifp);

  return $output_file;
}
