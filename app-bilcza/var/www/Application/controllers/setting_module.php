<?php

class SettingModuleController { 
    
   public static function moduleAction() {
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
           $modules[] = array(
              'id' => $item->id,
              'description' => $item->description,
              'icon' => $elem->icon,
              'device_type' => $elem->type,
              'device_type_id' => $item->device_type_id,
              'device_type_name' => $elem->name,
              'group_id' => $item->group_id,
              'item_id' => $item->item_id,
           );
       }
                          
	   return $app->render('setting_module.html', array('URL_BASE' => URL_BASE, 'menu_rooms' => $menu_rooms, 'groups' => $groups, 'modules' => $modules)); 
   }
   
   public static function firmwareAction() {
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
           $modules[] = array(
              'id' => $item->id,
              'description' => $item->description,
              'icon' => $elem->icon,
              'device_type' => $elem->type,
              'device_type_id' => $item->device_type_id,
              'device_type_name' => $elem->name,
              'group_id' => $item->group_id,
              'item_id' => $item->item_id,
           );
       }
                          
       return $app->render('setting_firmware.html', array('URL_BASE' => URL_BASE, 'menu_rooms' => $menu_rooms, 'groups' => $groups, 'modules' => $modules)); 
   }

   public static function configurationAction() {
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
           $modules[] = array(
              'id' => $item->id,
              'description' => $item->description,
              'icon' => $elem->icon,
              'device_type' => $elem->type,
              'device_type_id' => $item->device_type_id,
              'device_type_name' => $elem->name,
              'group_id' => $item->group_id,
              'item_id' => $item->item_id,
           );
       }
                          
       return $app->render('setting_configuration.html', array('URL_BASE' => URL_BASE, 'menu_rooms' => $menu_rooms, 'groups' => $groups, 'modules' => $modules)); 
   }
   
}