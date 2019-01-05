<?php 

function authorizeCheck() {
    $app = Slim::getInstance();

// JAKIS PROBLEM WIEC OBCHODZIMY
    $user = Model::factory('User')
          ->where('login', 'admin')
          ->where('password', md5('domomatik'))
          ->find_one();
    $app->setUser($user);
/*
    $logged = $app->getEncryptedCookie('user_logged');
    if ($logged === false || $logged === null) {
        $app->flash('error', 'Wymagane poprawne zalogowanie.');
        $app->redirect('logowanie');
    }

    $app->setUser(unserialize(base64_decode($logged)));
*/
}

function setProductionMode()
{
  $app = Slim::getInstance();	
  $app->config(array(
      'log.enable' => true,
	  'debug' => false,
  ));
}

function setDevelopmentMode()
{
  $app = Slim::getInstance();	
  $app->config(array(
      'log.enable' => false,
	  'debug' => true,
  ));
}
