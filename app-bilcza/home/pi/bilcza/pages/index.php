<?php

/**
 * Step 1: Require the Slim PHP 5 Framework
 */
require 'Slim/Slim.php';
require 'Views/TwigView.php';
require 'Paris/idiorm.php';
require 'Paris/paris.php';
require 'Application/config.php';
require 'Application/settings.php';

/**
 * Step 2: Instantiate the Slim application
 */
TwigView::$twigDirectory = __DIR__ . '/Twig/lib/Twig/';
ORM::configure(DNS_DRIVER);
ORM::configure('username', 'root');
//ORM::configure('password', '');
ORM::configure('driver_options', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));

 
$app = new Slim(array(
    'mode' => 'development',
    'log.path' => __DIR__ . '/Logs/',
    'templates.path' => __DIR__. '/Application/views/',
    'cookies.sekret_key' => 'SLIM_COOKIES',
    'view' => new TwigView,
));

$app->configureMode('production', 'setProductionMode');
$app->configureMode('development', 'setDevelopmentMode');

/**
 * Step 3: Define the Slim application routes
 */
require 'Application/routes.php';

/**
 * Step 4: Run the Slim application
 */
$app->run();