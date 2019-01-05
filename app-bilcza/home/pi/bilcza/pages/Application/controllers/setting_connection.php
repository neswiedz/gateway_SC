<?php

class SettingConnectionController { 
    
   public static function connectionAction() {
       $app = Slim::getInstance();
       $menu_rooms = Group_room::getGroupWithRooms();	
                   
       $elem_items = Model::factory('Device_type')->find_many();
       $groups = array();
       foreach ($elem_items as $group) {
           $groups[] = array('id' => $group->id, 'name' => $group->name);
       }

       $modules = array();
       $items = Model::factory('Device')->order_by_asc('group_id')->order_by_asc('item_id')->find_many();
       foreach ($items as $item) {
           $elem = $item->type()->find_one();
           $connects = array();
           for ($i=0; $i<$elem->channels; $i++) {
               $connects['ch_'.($i+1)] = array(
                  'id' => false,
                  'name' => false,
                  'type' => false,
                  'room' => false,
                  'group_room' => false,
                  'device_channel' => $i+1,
                  'channel' => false,
                  'connection_type' => '',
                  'category' => false,
                  'icon' => false,
               );               
           }
           $connections = $item->connections()->find_many();
           foreach ($connections as $i => $conn) {
               $element=false;
               if ($conn->element_type == 'ACTOR') {
                   $element = Model::factory('Actor')->find_one($conn->element_id);
               } elseif ($conn->element_type == 'SENSOR') {
                   $element = Model::factory('Sensor')->find_one($conn->element_id);                   
               }
               if ($element) {
                   $category = $element->type()->find_one();
                   $room = $element->room()->find_one();
                   $groom = $room->group()->find_one();
                   $connects['ch_'.$conn->device_channel] = array(
                       'id' => $conn->element_id,
                       'name' => $element->name,
                       'type' => $conn->element_type,
                       'room' => $room->name,
                       'group_room' => $groom->name,
                       'device_channel' => $conn->device_channel,
                       'channel' => $conn->element_channel,
                       'connection_type' => $conn->connection_type,
                       'category' => $category->name,
                       'icon' => $category->icon,
                   );
               }
           }
           $modules[] = array(
              'id' => $item->id,
              'description' => $item->description,
              'icon' => $elem->icon,
              'device_type' => $elem->type,
              'device_type_id' => $item->device_type_id,
              'device_type_name' => $elem->name,
              'group_id' => $item->group_id,
              'item_id' => $item->item_id,
              'connects' => $connects,
           );
       }
                          
	   return $app->render('setting_connection.html', array('URL_BASE' => URL_BASE, 'menu_rooms' => $menu_rooms, 'groups' => $groups, 'modules' => $modules)); 
   }
     
   public static function setConnectionAction($id) {
       $app = Slim::getInstance();
       $menu_rooms = Group_room::getGroupWithRooms();    
                   
       $item = Model::factory('Device')->find_one($id);
       if ($item != null && $item != false) {
           $elem = $item->type()->find_one();
           $connects = array();
           $connections = $item->connections()->find_many();
           foreach ($connections as $i => $conn) {
               $element=false;
               if ($conn->element_type == 'ACTOR') {
                   $element = Model::factory('Actor')->find_one($conn->element_id);
               } elseif ($conn->element_type == 'SENSOR') {
                   $element = Model::factory('Sensor')->find_one($conn->element_id);                   
               }
               if ($element) {
                   $category = $element->type()->find_one();
                   $connects['ch_'.$conn->device_channel] = array(
                       'id' => $conn->element_id,
                       'name' => $element->name,
                       'type' => $conn->element_type,
                       'device_channel' => $conn->device_channel,
                       'channel' => $conn->element_channel,
                       'connection_type' => $conn->connection_type,
                       'category' => $category->name,
                       'category_icon' => $category->icon,
                       'js_name' => ($conn->element_type == 'ACTOR' ? 'actor_' : ( $conn->element_type == 'SENSOR' ? 'sensor_' : ''))
                                    .$conn->element_id."_".$conn->element_channel,
                   );
               }
           }
           
           $module = array(
              'id' => $item->id,
              'description' => $item->description,
              'icon' => $elem->icon,
              'device_type' => $elem->type,
              'device_type_id' => $item->device_type_id,
              'device_type_name' => $elem->name,
              'channels' => $elem->channels,
              'group_id' => $item->group_id,
              'item_id' => $item->item_id,
              'connects' => $connects,
           );
           
           $actors = array();
           $items = Model::factory('Actor')->find_many();
           foreach ($items as $item) {
               $elem = $item->type()->find_one();
               $room = $item->room()->find_one();
               $groom = $room->group()->find_one();
               $found = false;
               foreach ($module["connects"] as $ch => $conn) {
                   if ($conn["id"] == $item->id && $conn["type"] == 'ACTOR') {
                       $found = true;
                   }
               }
               $actors[] = array(
                  'id' => $item->id,
                  'name' => $item->name,
                  'icon' => $elem->icon,
                  'channels' => $elem->channels,
                  'element_id' => $item->element_id,
                  'type' => $elem->name,
                  'room' => $room->name,
                  'group_room' => $groom->name,
               );
           }           
           
           $sensors = array();
           $items = Model::factory('Sensor')->find_many();
           foreach ($items as $item) {
               $elem = $item->type()->find_one();
               $room = $item->room()->find_one();
               $groom = $room->group()->find_one();
               $found = false;
               foreach ($module["connects"] as $ch => $conn) {
                   if ($conn["id"] == $item->id && $conn["type"] == 'SENSOR') {
                       $found = true;
                   }
               }
               $sensors[] = array(
                  'id' => $item->id,
                  'name' => $item->name,
                  'icon' => $elem->icon,
                  'channels' => $elem->channels,
                  'element_id' => $item->element_id,
                  'type' => $elem->name,
                  'room' => $room->name,
                  'group_room' => $groom->name,
               );
           }       
           
           $connects = array();
           $items = Model::factory('Connection')->where_not_equal('device_id', $module['id'])->find_many();
           foreach ($items as $item) {
               if ($item->element_type=='ACTOR') {
                   $connects[] = 'actor_'.$item->element_id.'_'.$item->element_channel;
               } elseif ($item->element_type=='SENSOR') {
                   $connects[] = 'sensor_'.$item->element_id.'_'.$item->element_channel;
               }
           }   
           
           return $app->render('setting_connection_config.html', array('URL_BASE' => URL_BASE, 'menu_rooms' => $menu_rooms, 'module' => $module, 'actors' => $actors, 'sensors' => $sensors, 'connects' => $connects)); 
       } else {
           $app->flash('error', 'Niestety nie ma takiego modułu.');
           $app->redirect('./ustawienia');    
       }
                          
   }     
   
   public function saveConnectionAction() {
       $app = Slim::getInstance();
       $menu_rooms = Group_room::getGroupWithRooms();           

       $device_id = $app->request()->post('id');
       $chk_device_id = Slim_Validate::numeric($device_id);
       
       if (strlen($device_id)>0 && $chk_device_id) {
           $item = Model::factory('Device')->find_one($device_id);
           if ($item !== null && $item !== false) {       
               $channels = $app->request()->post('channels');
               $chk_channels = Slim_Validate::numeric($channels);
               if (strlen($channels)>0 && $chk_channels) {
                   for ($i=1; $i<=$channels; $i++) {
                       $dev_channel = Model::factory('Connection')
                                            ->where('device_id', $device_id)
                                            ->where('device_channel', $i)
                                            ->find_one();
                       $channel = $app->request()->post('ch_'.$i);
                       if (strlen($channel)>0) {
                           $channel_data = explode("_", $channel);
                           if ($dev_channel !== null && $dev_channel !== false) {
                           } else {
                              $dev_channel = Model::factory('Connection')->create();
                              $dev_channel->device_id = $device_id;
                              $dev_channel->device_channel = $i; 
                           }
                           $dev_channel->element_type = strtoupper($channel_data[0]);
                           $dev_channel->element_id = $channel_data[1];
                           $dev_channel->element_channel = $channel_data[2];
                           $dev_channel->connection_type = 'NC';
                           $dev_channel->save();
                       } else {
                           if ($dev_channel != null && $dev_channel != false) {
                               $dev_channel->delete();
                           }
                       }                      
                   }           
                   $app->flash('success', 'Zmiana została zachowana.');
                   $app->redirect('./ustawienia/'.$device_id);
               } else {
                   $app->flash('error', 'Niestety, zmiana nie została zachowana.');
                   $app->redirect('./ustawienia/'.$device_id);
               }
           } else {
               $app->flash('error', 'Niestety nie ma takiego modułu.');
               $app->redirect('./ustawienia');
           }    
       } else {
           $app->flash('error', 'Niestety nie ma takiego modułu.');
           $app->redirect('./ustawienia');    
       }       
   }
     
}
