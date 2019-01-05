<?php

class DefaultController {

   public static function indexAction() {
       $app = Slim::getInstance();
       $rooms = Group_room::getGroupWithRooms();	

       $parter = array();
       $pietro = array();
       $elem_items = Model::factory('Actor')->where_in('element_id', array(1,2,3,4,5,6,7,8,9,10,11,20))->where_not_equal('coords','')->find_many();
       foreach ($elem_items as $item) {
           $elem = $item->type()->find_one();
           $status = $item->statuses()->find_many();
           $room = $item->room()->find_one();
           $statuses = array();
           $status_descr = '';
           switch ($item->element_id) {
              case 1:
                 $status_descr = 'off';
                 break;
              case 2:
                 $status_descr = 'ch1_off ch2_off';
                 break;
              case 3:
                 $status_descr = 'off';
                 break;
              case 4:
                 $status_descr = 'ch1_off ch2_off';
                 break;
              case 5:
                 $status_descr = 'off';
                 break;
              case 6:
                 $status_descr = 'ch1_off ch2_off';
                 break;
              case 20:
                 $status_descr = 'off';
                 break;
           } 
           foreach ($status as $status_item) {
              $statuses["ch_".$status_item->channel_id] = $status_item->status;
           }
           if (($room->id>=12 && $room->id<=19) || $item->element_id == 20) {
               $pietro[] = array(
                  'id' => $item->id,
                  'name' => $item->name,
                  'element_id' => $item->element_id,
                  'type' => $elem->name,
                  'category' => 'ACTOR',
                  'channels' => $elem->channels,
                  'icon' => $elem->icon,
                  'status' => $statuses,
                  'status_descr' => $status_descr,
                  'room' => $room->name,
                  'room_id' => $room->id,
                  'room_group_id' => $room->group_id,   
                  'left' => substr($item->coords, 0, strpos($item->coords,',')), 
                  'top' =>  substr($item->coords, strpos($item->coords,',')+1)
               );
           } else {
               $parter[] = array(
                  'id' => $item->id,
                  'name' => $item->name,
                  'element_id' => $item->element_id,
                  'type' => $elem->name,
                  'category' => 'ACTOR',
                  'channels' => $elem->channels,
                  'icon' => $elem->icon,
                  'status' => $statuses,
                  'status_descr' => $status_descr,
                  'room' => $room->name,
                  'room_id' => $room->id,
                  'room_group_id' => $room->group_id,
                  'left' => substr($item->coords, 0, strpos($item->coords,',')), 
                  'top' =>  substr($item->coords, strpos($item->coords,',')+1)
               );
           }
           
       }
       
	   return $app->render('default.html', array('menu_rooms' => $rooms, 'parter' => $parter, 'pietro' => $pietro, 'URL_BASE' => URL_BASE)); 
   }
   
   public static function loginAction() {
       $app = Slim::getInstance();  
       
       $logged = $app->getEncryptedCookie('user_logged');
       if (!($logged === false || $logged === null)) {
            $user = unserialize(base64_decode($logged));
            if ($user instanceof User) {
                $app->redirect('./');
            }
       }    

       return $app->render('login.html', array('URL_BASE' => URL_BASE));        
   }
   
   public static function loginPostAction() {
       $app = Slim::getInstance();
       
       $login = $app->request()->post('login');
       $password = $app->request()->post('password');
       
       $chk_login = Slim_Validate::standard_text($login);
       $chk_password = Slim_Validate::standard_text($password);
       
       if (strlen($login.$password)<1 || !$chk_login || !$chk_password) {
           $app->flashNow('error', 'Logowanie niepoprawne. Musisz wypełnić poprawnie oba pola.');
       } else {
           $user = Model::factory('User')
             ->where('login', $login)
             ->where('password', md5($password))
             ->find_one();
             
           if ($user!==false) {              
               $app->setEncryptedCookie('user_logged', base64_encode(serialize($user)), time() + 14 * 24 * 60 * 60);
               $app->redirect('./');


           } else {
               $app->flashNow('error', 'Logowanie niepoprawne. Musisz wypełnić poprawnie oba pola.');           
           }
       }
       return $app->render('login.html', array('URL_BASE' => URL_BASE));
   }

   public static function logoutAction() {
       $app = Slim::getInstance();
       $app->setEncryptedCookie('user_logged', false, time() - 3600);           
       return $app->render('login.html', array('URL_BASE' => URL_BASE));        
   }
   
   public static function remindPasswordAction() {
       $app = Slim::getInstance();
       return $app->render('remind-password.html', array('URL_BASE' => URL_BASE));
   }
   
   public static function remindPasswordPostAction() {
       $app = Slim::getInstance();
       
       $login = $app->request()->post('login');
       $code = $app->request()->post('code');
       
       if (strlen($login.$code)<1) {
           $app->flashNow('error', 'Musisz wypełnić poprawnie oba pola.');
       } else {
           $user = Model::factory('User')
              ->where('login', $login)
              ->find_one();
           
           if ($user!==false && $code === INSTALATION_CODE) {
               $user->password = md5('domomatik');
               $user->save();
               $app->redirect('./przypomnij-haslo/nowe');
           } else {
               $app->flashNow('error', 'Musisz wypełnić poprawnie oba pola.');
           }
       }
       return $app->render('remind-password.html',array('URL_BASE' => URL_BASE));
   }
   
   public static function remindPasswordCompleteAction() {
       $app = Slim::getInstance();
       return $app->render('remind-password-complete.html',array('URL_BASE' => URL_BASE));
   }

   
}