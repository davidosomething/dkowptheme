<?php
require __DIR__ . '/lib/classes/DKOWPT/DKOWPT.php';
$dkowpt = DKOWPT::getInstance();

$dkowpt::nq('css/main.css');

if ($dkowpt::inEnvironment('LOCAL')) {
  // $dkowpt::nq('js/templates.js');
  $dkowpt::nq('js/script.js');
}
