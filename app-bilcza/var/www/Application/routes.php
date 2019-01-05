<?php

/**
 * Step 1. Load Controllers
 */
require('Application/controllers/default.php');
require('Application/controllers/ajax.php');
require('Application/controllers/setting_zone.php');
require('Application/controllers/setting_actor.php');
require('Application/controllers/setting_sensor.php');
require('Application/controllers/setting_module.php');
require('Application/controllers/setting_connection.php');
require('Application/controllers/setting_event.php');
require('Application/controllers/room.php');

/**
 * Step 2. Load Models
 */
require('Application/models/User.php');
require('Application/models/Actor.php');
require('Application/models/Actor_status.php');
require('Application/models/Sensor.php');
require('Application/models/Sensor_status.php');
require('Application/models/Element.php');
require('Application/models/Group_room.php');
require('Application/models/Type_room.php');
require('Application/models/Room.php');
require('Application/models/Device.php');
require('Application/models/Device_type.php');
require('Application/models/Device_info.php');
require('Application/models/Device_status.php');
require('Application/models/Connection.php');
require('Application/models/Device_action.php');

/**
 * Step 3. Sets routing
 */
$app->get('/logowanie', array(new DefaultController, 'loginAction')); 
$app->post('/logowanie', array(new DefaultController, 'loginPostAction')); 
$app->get('/wylogowanie', array(new DefaultController, 'logoutAction'));
$app->get('/przypomnij-haslo', array(new DefaultController, 'remindPasswordAction')); 
$app->post('/przypomnij-haslo', array(new DefaultController, 'remindPasswordPostAction'));
$app->get('/przypomnij-haslo/nowe', array(new DefaultController, 'remindPasswordCompleteAction'));
 
$app->get('/', 'authorizeCheck', array(new DefaultController, 'indexAction'));

//Zarządzanie definiowaniem grup stref
$app->post('/ajax/strefy/grupa/dodaj', 'authorizeCheck', array(new AjaxController, 'roomGroupNewAction'));
$app->get('/ajax/strefy/grupa/usun/:id', 'authorizeCheck', array(new AjaxController, 'roomGroupDeleteAction'));
$app->post('/ajax/strefy/grupa/zmien', 'authorizeCheck', array(new AjaxController, 'roomGroupModifyAction'));
$app->get('/ajax/strefy/grupa/:id', 'authorizeCheck', array(new AjaxController, 'roomGroupDetailsAction'));
//Zarządzanie definiowniem stref
$app->post('/ajax/strefy/dodaj', 'authorizeCheck', array(new AjaxController, 'roomNewAction'));
$app->get('/ajax/strefy/usun/:id', 'authorizeCheck', array(new AjaxController, 'roomDeleteAction'));
$app->post('/ajax/strefy/zmien', 'authorizeCheck', array(new AjaxController, 'roomModifyAction'));
$app->get('/ajax/strefy/:id', 'authorizeCheck', array(new AjaxController, 'roomDetailsAction'));

$app->get('/ustawienia/strefy', 'authorizeCheck', array(new SettingZoneController, 'zoneAction'));

//Zarządzanie definiowniem aktorów
$app->post('/ajax/aktor/dodaj', 'authorizeCheck', array(new AjaxController, 'actorNewAction'));
$app->get('/ajax/aktor/usun/:id', 'authorizeCheck', array(new AjaxController, 'actorDeleteAction'));
$app->post('/ajax/aktor/zmien', 'authorizeCheck', array(new AjaxController, 'actorModifyAction'));
$app->get('/ajax/aktor/status/:id', 'authorizeCheck', array(new AjaxController, 'actorStatusAction'));
$app->put('/ajax/aktor/status/:id', 'authorizeCheck', array(new AjaxController, 'setActorStatusAction'));
$app->get('/ajax/aktor/:id', 'authorizeCheck', array(new AjaxController, 'actorDetailsAction'));

$app->get('/ustawienia/aktorzy', 'authorizeCheck', array(new SettingActorController, 'actorAction'));

//Zarządzanie definiowniem sensorów
$app->post('/ajax/sensor/dodaj', 'authorizeCheck', array(new AjaxController, 'sensorNewAction'));
$app->get('/ajax/sensor/usun/:id', 'authorizeCheck', array(new AjaxController, 'sensorDeleteAction'));
$app->post('/ajax/sensor/zmien', 'authorizeCheck', array(new AjaxController, 'sensorModifyAction'));
$app->get('/ajax/sensor/status/:id', 'authorizeCheck', array(new AjaxController, 'sensorStatusAction'));
$app->put('/ajax/sensor/status/:id', 'authorizeCheck', array(new AjaxController, 'setSensorStatusAction'));
$app->get('/ajax/sensor/:id', 'authorizeCheck', array(new AjaxController, 'sensorDetailsAction'));

$app->get('/ustawienia/sensory', 'authorizeCheck', array(new SettingSensorController, 'sensorAction'));

$app->get('/ajax/total/status/:ids', 'authorizeCheck', array(new AjaxController, 'totalStatusAction'));


//Zarządzanie definiowniem modułów
$app->get('/ajax/modul/szukaj', 'authorizeCheck', array(new AjaxController, 'moduleSearchAction'));
$app->post('/ajax/modul/dodaj', 'authorizeCheck', array(new AjaxController, 'moduleNewAction'));
$app->get('/ajax/modul/usun/:id', 'authorizeCheck', array(new AjaxController, 'moduleDeleteAction'));
$app->post('/ajax/modul/zmien', 'authorizeCheck', array(new AjaxController, 'moduleModifyAction'));
$app->get('/ajax/modul/:id', 'authorizeCheck', array(new AjaxController, 'moduleDetailsAction'));
$app->get('/ajax/modul/odswiez/:id', 'authorizeCheck', array(new AjaxController, 'moduleReloadAction'));

$app->get('/ustawienia/moduly', 'authorizeCheck', array(new SettingModuleController, 'moduleAction'));

//Zarządzanie konfiguracji modułów
$app->get('/ustawienia/konfiguracja', 'authorizeCheck', array(new SettingEventController, 'eventAction'));
$app->get('/ustawienia/konfiguracja/eksportuj', 'authorizeCheck', array(new SettingEventController, 'eventExportAction'));
$app->get('/ustawienia/konfiguracja/:id', 'authorizeCheck', array(new SettingEventController, 'eventConfigAction'));

//Status modułów
$app->get('/ajax/ustawienia/status/:id', 'authorizeCheck', array(new AjaxController, 'getDeviceStatusAction'));

//Zarządzanie połączeniami modułów z aktorami i sensorami
$app->get('/ustawienia', 'authorizeCheck', array(new SettingConnectionController, 'connectionAction'));
$app->post('/ustawienia/zapisz', 'authorizeCheck', array(new SettingConnectionController, 'saveConnectionAction'));
$app->get('/ustawienia/:id', 'authorizeCheck', array(new SettingConnectionController, 'setConnectionAction'));
$app->post('/ajax/ustawienia/polaryzacja', 'authorizeCheck', array(new AjaxController, 'changePolarConnectionAction'));

//Strefy
$app->get('/strefy', 'authorizeCheck', array(new RoomController, 'indexAction'));
$app->get('/strefa/:id', 'authorizeCheck', array(new RoomController, 'roomAction'));

//Oświetlenie
$app->get('/oswietlenie', 'authorizeCheck', array(new RoomController, 'lightAction'));

//Wyposażenie
$app->get('/wyposazenie', 'authorizeCheck', array(new RoomController, 'toolAction'));
