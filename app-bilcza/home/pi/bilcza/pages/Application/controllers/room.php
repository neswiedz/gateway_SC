<?php
class RoomController { 
    
   public static function indexAction() {
       $app = Slim::getInstance();
       $menu_rooms = Group_room::getGroupWithRooms();	
       
       $elem_items = Model::factory('Element')->find_many();
       $group_actors = array();
       $group_sensors = array();
       foreach ($elem_items as $group) {
           if ($group->type == 'ACTOR') {
                $group_actors[] = array('id' => $group->id, 'name' => $group->name);
           } elseif ($group->type == 'SENSOR') {
                $group_sensors[] = array('id' => $group->id, 'name' => $group->name);
           }
       }        

       $modules = array();       

       $elem_items = Model::factory('Actor')->find_many();
       foreach ($elem_items as $item) {
           $elem = $item->type()->find_one();
           $room = $item->room()->find_one();
           $status = $item->statuses()->find_many();
           $statuses = array();
           foreach ($status as $status_item) {
              $statuses["ch_".$status_item->channel_id] = $status_item->status; 
           }
           $modules[] = array(
              'id' => $item->id,
              'name' => $item->name,
              'element_id' => $item->element_id,
              'type' => $elem->name,
              'category' => 'ACTOR',
              'channels' => $elem->channels,
              'room_id' => $item->room_id,
              'room' => $room->name,
              'icon' => $elem->icon,
              'status' => $statuses,
           );
       }
       
       $elem_items = Model::factory('Sensor')->find_many();
       foreach ($elem_items as $item) {
           $elem = $item->type()->find_one();
           $room = $item->room()->find_one();
           $status = $item->statuses()->find_many();
           $statuses = array();
           foreach ($status as $status_item) {
              $statuses["ch_".$status_item->channel_id] = $status_item->status; 
           }
           $modules[] = array(
              'id' => $item->id,
              'name' => $item->name,
              'element_id' => $item->element_id,
              'type' => $elem->name,
              'category' => 'SENSOR',
              'room_id' => $item->room_id,
              'room' => $room->name,
              'channels' => $elem->channels,
              'icon' => $elem->icon,
              'status' => $statuses,
           );
       }
   
       return $app->render('rooms.html', array(
                                          'URL_BASE' => URL_BASE,
                                          'menu_rooms' => $menu_rooms, 
                                          'modules' => $modules, 
                                          'group_actors' => $group_actors,
                                          'group_sensors' => $group_sensors,
       )); 
   
   }
   
   public static function roomAction($id) {
       $app = Slim::getInstance();
       $menu_rooms = Group_room::getGroupWithRooms();    
       
       $elem_items = Model::factory('Element')->find_many();
       $group_actors = array();
       $group_sensors = array();
       foreach ($elem_items as $group) {
           if ($group->type == 'ACTOR') {
                $group_actors[] = array('id' => $group->id, 'name' => $group->name);
           } elseif ($group->type == 'SENSOR') {
                $group_sensors[] = array('id' => $group->id, 'name' => $group->name);
           }
       }        
       
       $room = Model::factory('Room')->find_one($id);
       
       if ($room == null || $room == false) {
           $app->flash('error', 'Niestety nie ma takiej strefy.');
           $app->redirect('./strefy');              
       }
       
       $modules = array();       

       $elem_items = Model::factory('Actor')->where('room_id', $id)->find_many();
       foreach ($elem_items as $item) {
           $elem = $item->type()->find_one();
           $status = $item->statuses()->find_many();
           $statuses = array();
           foreach ($status as $status_item) {
              $statuses["ch_".$status_item->channel_id] = $status_item->status; 
           }
           $modules[] = array(
              'id' => $item->id,
              'name' => $item->name,
              'element_id' => $item->element_id,
              'type' => $elem->name,
              'category' => 'ACTOR',
              'channels' => $elem->channels,
              'icon' => $elem->icon,
              'status' => $statuses,
           );
       }
       
       $elem_items = Model::factory('Sensor')->where('room_id', $id)->find_many();
       foreach ($elem_items as $item) {
           $elem = $item->type()->find_one();
           $status = $item->statuses()->find_many();
           $statuses = array();
           foreach ($status as $status_item) {
              $statuses["ch_".$status_item->channel_id] = $status_item->status; 
           }
           $modules[] = array(
              'id' => $item->id,
              'name' => $item->name,
              'element_id' => $item->element_id,
              'type' => $elem->name,
              'category' => 'SENSOR',
              'channels' => $elem->channels,
              'icon' => $elem->icon,
              'status' => $statuses,
           );
       }
       
       return $app->render('room_view.html', array(
                                          'URL_BASE' => URL_BASE,
                                          'menu_rooms' => $menu_rooms, 
                                          'room' => $room,
                                          'modules' => $modules, 
                                          'group_actors' => $group_actors,
                                          'group_sensors' => $group_sensors,
       ));
   }
   
   public static function lightAction() {
       $app = Slim::getInstance();
       $menu_rooms = Group_room::getGroupWithRooms();    
       
       $elem_items = Model::factory('Element')->where_in('id', array(1,2,3,4,5,6,7,8,9,10))->find_many();
       $group_actors = array();
       $group_sensors = array();
       foreach ($elem_items as $group) {
           if ($group->type == 'ACTOR') {
                $group_actors[] = array('id' => $group->id, 'name' => $group->name);
           }
       }        
              
       $modules = array();       

       $elem_items = Model::factory('Actor')->where_in('element_id', array(1,2,3,4,5,6,7,8,9,10))->find_many();
       foreach ($elem_items as $item) {
           $elem = $item->type()->find_one();
           $status = $item->statuses()->find_many();
           $statuses = array();
           foreach ($status as $status_item) {
              $statuses["ch_".$status_item->channel_id] = $status_item->status; 
           }
           $modules[] = array(
              'id' => $item->id,
              'name' => $item->name,
              'element_id' => $item->element_id,
              'type' => $elem->name,
              'category' => 'ACTOR',
              'channels' => $elem->channels,
              'icon' => $elem->icon,
              'status' => $statuses,
           );
       }
       
       $elem_items = Model::factory('Sensor')->where_in('element_id', array(1,2,3,4,5,6,7,8,9,10))->find_many();
       foreach ($elem_items as $item) {
           $elem = $item->type()->find_one();
           $status = $item->statuses()->find_many();
           $statuses = array();
           foreach ($status as $status_item) {
              $statuses["ch_".$status_item->channel_id] = $status_item->status; 
           }
           $modules[] = array(
              'id' => $item->id,
              'name' => $item->name,
              'element_id' => $item->element_id,
              'type' => $elem->name,
              'category' => 'SENSOR',
              'channels' => $elem->channels,
              'icon' => $elem->icon,
              'status' => $statuses,
           );
       }
       
       return $app->render('room_light.html', array(
                                          'URL_BASE' => URL_BASE,
                                          'menu_rooms' => $menu_rooms, 
                                          'modules' => $modules, 
                                          'group_actors' => $group_actors,
                                          'group_sensors' => $group_sensors,
       ));
   }
   
   public static function toolAction() {
       $app = Slim::getInstance();
       $menu_rooms = Group_room::getGroupWithRooms();    
       
       $elem_items = Model::factory('Element')->where_not_in('id', array(1,2,3,4,5,6,7,8,9,10))->find_many();
       $group_actors = array();
       $group_sensors = array();
       foreach ($elem_items as $group) {
           if ($group->type == 'ACTOR') {
                $group_actors[] = array('id' => $group->id, 'name' => $group->name);
           } elseif ($group->type == 'SENSOR') {
                $group_sensors[] = array('id' => $group->id, 'name' => $group->name);
           }
       }        
              
       $modules = array();       

       $elem_items = Model::factory('Actor')->where_not_in('element_id', array(1,2,3,4,5,6,7,8,9,10))->find_many();
       foreach ($elem_items as $item) {
           $elem = $item->type()->find_one();
           $status = $item->statuses()->find_many();
           $statuses = array();
           foreach ($status as $status_item) {
              $statuses["ch_".$status_item->channel_id] = $status_item->status; 
           }
           $modules[] = array(
              'id' => $item->id,
              'name' => $item->name,
              'element_id' => $item->element_id,
              'type' => $elem->name,
              'category' => 'ACTOR',
              'channels' => $elem->channels,
              'icon' => $elem->icon,
              'status' => $statuses,
           );
       }
       
       $elem_items = Model::factory('Sensor')->where_not_in('element_id', array(1,2,3,4,5,6,7,8,9,10))->find_many();
       foreach ($elem_items as $item) {
           $elem = $item->type()->find_one();
           $status = $item->statuses()->find_many();
           $statuses = array();
           foreach ($status as $status_item) {
              $statuses["ch_".$status_item->channel_id] = $status_item->status; 
           }
           $modules[] = array(
              'id' => $item->id,
              'name' => $item->name,
              'element_id' => $item->element_id,
              'type' => $elem->name,
              'category' => 'SENSOR',
              'channels' => $elem->channels,
              'icon' => $elem->icon,
              'status' => $statuses,
           );
       }
       
       return $app->render('rooms.html', array(
                                          'URL_BASE' => URL_BASE,
                                          'menu_rooms' => $menu_rooms, 
                                          'modules' => $modules, 
                                          'group_actors' => $group_actors,
                                          'group_sensors' => $group_sensors,
       ));
   }
   
}