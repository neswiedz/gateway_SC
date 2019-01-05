<?php

class SettingActorController { 
    
   public static function actorAction() {
       $app = Slim::getInstance();
       $menu_rooms = Group_room::getGroupWithRooms();	
       
       $elem_items = Model::factory('Element')->where('type', 'ACTOR')->find_many();
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
       
       $actors = array();
       $items = Model::factory('Actor')->where_in('element_id', $ids)->find_many();
       foreach ($items as $item) {
           $elem = $item->type()->find_one();
           $room = $item->room()->find_one();
           $actors[] = array(
              'id' => $item->id,
              'name' => $item->name,
              'icon' => $elem->icon,
              'element_id' => $item->element_id,
              'type' => $elem->name,
              'room' => $room->name,
              'group_room' => $groups_name[$room->group_id],
           );
       }
      
	   return $app->render('setting_actor.html', array('URL_BASE' => URL_BASE, 'menu_rooms' => $menu_rooms, 'groups' => $groups, 'actors' => $actors)); 
   }
   
   
}