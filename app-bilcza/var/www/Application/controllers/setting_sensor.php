<?php

class SettingSensorController { 
    
   public static function sensorAction() {
       $app = Slim::getInstance();
       $menu_rooms = Group_room::getGroupWithRooms();	
       
       $elem_items = Model::factory('Element')->where('type', 'SENSOR')->find_many();
       $groups = array();
       $ids = array();
       foreach ($elem_items as $group) {
           $groups[] = array('id' => $group->id, 'name' => $group->name);
           $ids[] = $group->id;
       }

       $groups_name = array();
       $group_items = Model::factory('Group_room')->find_many();
       foreach ($group_items as $group) {
           $groups_name[$group->id] = $group->name;
       }
       
       $sensors = array();
       $items = Model::factory('Sensor')->where_in('element_id', $ids)->find_many();
       foreach ($items as $item) {
           $elem = $item->type()->find_one();
           $room = $item->room()->find_one();
           $sensors[] = array(
              'id' => $item->id,
              'name' => $item->name,
              'icon' => $elem->icon,
              'element_id' => $item->element_id,
              'type' => $elem->name,
              'room' => $room->name,
              'group_room' => $groups_name[$room->group_id],
           );
       }
      
	   return $app->render('setting_sensor.html', array('URL_BASE' => URL_BASE, 'menu_rooms' => $menu_rooms, 'groups' => $groups, 'sensors' => $sensors)); 
   }
   
   
}