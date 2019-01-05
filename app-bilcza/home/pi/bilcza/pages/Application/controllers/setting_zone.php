<?php

class SettingZoneController { 
    
   public static function zoneAction() {
       $app = Slim::getInstance();
       $menu_rooms = Group_room::getGroupWithRooms();	
       
       $rooms = Model::factory('Room')->find_many();
       $group_items = Model::factory('Group_room')->find_many();
       $groups = array();
       foreach ($group_items as $group) {
           $groups[$group->id] = $group->name;
       }
       
       $menu_type_rooms = Type_room::getTypes();
                  
	   return $app->render('setting_zone.html', array('URL_BASE' => URL_BASE, 'menu_rooms' => $menu_rooms, 'rooms' => $rooms, 'groups' => $groups, 'menu_type_rooms' => $menu_type_rooms)); 
   }
      
}