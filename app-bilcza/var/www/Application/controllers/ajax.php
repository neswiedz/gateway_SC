<?php

class AjaxController { 
      
   public static function send_reply($app, $data)
   {
       $app->response()->header('Content-Type', 'application/json');
       echo json_encode($data);
       $app->stop();       
   }
    
   public static function roomDetailsAction($id) {
       $app = Slim::getInstance();

       $data = array(
         'function' => 'roomDetails',
         'id' => $id,
         'error' => true
       );
       
       $chk_id = Slim_Validate::numeric($id);
       if (strlen($id)>0 && $chk_id) {
           $room = Model::factory('Room')->find_one($id);           
           if ($room !== null && $room !== false) {
	           $data = array(
                 'data' => $room->as_array(),
                 'error' => false
               );
           }
       }
       AjaxController::send_reply($app, $data);     
   }
   
   public static function roomNewAction() {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'roomNew',
          'error' => true,
       );

       $name = $app->request()->post('name');
       $group_id = $app->request()->post('group_id');
       $icon = $app->request()->post('type_id');
       $chk_name = Slim_Validate::standard_text($name);
       $chk_group_id = Slim_Validate::numeric($group_id);
       $chk_icon = Slim_Validate::standard_text($icon);
       $chk_icon2 = in_array($icon, Type_room::getKeys());
       
       if (strlen($name)>0 && strlen($group_id)>0 && strlen($icon)>0 && $chk_name && $chk_group_id && $chk_icon && $chk_icon2) {
           $last_in_group = Model::factory('Room')->where('group_id', $group_id)->order_by_desc('group_order')->find_one();
           
           $room = Model::factory('Room')->create();
           $room->name = $name;
           $room->group_id = $group_id;
           $room->icon = $icon;
           if ($last_in_group) {
               $room->group_order = $last_in_group->group_order + 1;
           } else {
               $room->group_order = 1;
           }
           if ($room->save()) {
              $data["id"] = $room->id;
              $data["name"] = $name;
              $data["group_id"] = $group_id;
              $data["icon"] = $icon;
              $data["error"] = false;
           }
       }
       
       AjaxController::send_reply($app, $data);     
   }

   public static function roomModifyAction() {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'roomModify',
          'error' => true,
       );

       $id = $app->request()->post('id');
       $name = $app->request()->post('name');
       $group_id = $app->request()->post('group_id');
       $icon = $app->request()->post('type_id');
       $chk_id = Slim_Validate::numeric($id);
       $chk_name = Slim_Validate::standard_text($name);
       $chk_group_id = Slim_Validate::numeric($group_id);
       $chk_icon = Slim_Validate::standard_text($icon);
       $chk_icon2 = in_array($icon, Type_room::getKeys());
       
       if (strlen($id)>0 && strlen($name)>0 && strlen($group_id)>0 && strlen($icon)>0 && $chk_id && $chk_name && $chk_group_id && $chk_icon && $chk_icon2) {
           $room = Model::factory('Room')->find_one($id);
           if ($room !== null && $room !== false) {
               $room->name = $name;
               $room->group_id = $group_id;
               $room->icon = $icon;
               if ($room->save()) {
                   $data["id"] = $id;
                   $data["name"] = $name;
                   $data["group_id"] = $group_id;
                   $data["icon"] = $icon;
                   $data["error"] = false;
               }
           }
       }
       
       AjaxController::send_reply($app, $data);     
   }
   
   public static function roomDeleteAction($id) {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'roomDelete',
          'id' => $id,
          'error' => true,
       );
       
       $room = Model::factory('Room')->find_one($id);
       if ($room !== null && $room !== false) {
           if ($room->delete()) {
               $data['error'] = false;
           }
       }
       
       AjaxController::send_reply($app, $data);            
   }
   
   public static function roomGroupDetailsAction($id) {
       $app = Slim::getInstance();

       $data = array(
         'function' => 'roomGroupDetails',
         'id' => $id,
         'error' => true
       );
       
       $chk_id = Slim_Validate::numeric($id);
       if (strlen($id)>0 && $chk_id) {
           $group = Model::factory('Group_room')->find_one($id);           
           if ($group !== null && $group !== false) {
               $data = array(
                 'data' => $group->as_array(),
                 'error' => false
               );
           }
       }
       AjaxController::send_reply($app, $data);     
   }
   
   public static function roomGroupNewAction() {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'roomGroupNew',
          'error' => true,
       );

       $name = $app->request()->post('name');
       $chk_name = Slim_Validate::standard_text($name);
       
       if (strlen($name)>0 && $chk_name) {
           $last = Model::factory('Group_room')->order_by_desc('item_order')->find_one();
           
           $group = Model::factory('Group_room')->create();
           $group->name = $name;
           if ($last) {
               $group->item_order = $last->item_order + 1;
           } else {
               $group->item_order = 1;
           }
           if ($group->save()) {
              $data["id"] = $group->id;
              $data["name"] = $name;
              $data["error"] = false;
           }
       }
       
       AjaxController::send_reply($app, $data);     
   }

   public static function roomGroupModifyAction() {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'roomGroupModify',
          'error' => true,
       );

       $id = $app->request()->post('id');
       $name = $app->request()->post('name');
       $chk_id = Slim_Validate::numeric($id);
       $chk_name = Slim_Validate::standard_text($name);
       
       if (strlen($id)>0 && strlen($name)>0 && $chk_id && $chk_name) {
           $group = Model::factory('Group_room')->find_one($id);
           if ($group !== null && $group !== false) {
               $group->name = $name;
               if ($group->save()) {
                   $data["id"] = $id;
                   $data["name"] = $name;
                   $data["error"] = false;
               }
           }
       }
       
       AjaxController::send_reply($app, $data);     
   }
   
   public static function roomGroupDeleteAction($id) {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'roomGroupDelete',
          'id' => $id,
          'error' => true,
       );
       
       $group = Model::factory('Group_room')->find_one($id);
       if ($group !== null && $group !== false) {
           if ($group->delete()) {
               $data['error'] = false;
           }
       }
       
       AjaxController::send_reply($app, $data);            
   }

   public static function actorDetailsAction($id) {
       $app = Slim::getInstance();

       $data = array(
         'function' => 'actorDetails',
         'id' => $id,
         'error' => true
       );
       
       $chk_id = Slim_Validate::numeric($id);
       if (strlen($id)>0 && $chk_id) {
           $actor = Model::factory('Actor')->find_one($id);           
           if ($actor !== null && $actor !== false) {
               $data = array(
                 'data' => $actor->as_array(),
                 'error' => false
               );
           }
       }
       AjaxController::send_reply($app, $data);     
   }
   
   public static function actorNewAction() {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'actorNew',
          'error' => true,
       );

       $name = $app->request()->post('name');
       $elem_id = $app->request()->post('element_id');
       $room_id = $app->request()->post('room_id');
       $chk_name = Slim_Validate::standard_text($name);
       $chk_elem_id = Slim_Validate::numeric($elem_id);
       $chk_room_id = Slim_Validate::numeric($room_id);
       
       if (strlen($name)>0 && strlen($elem_id)>0 && strlen($room_id)>0 && $chk_name && $chk_elem_id && $chk_room_id) {          
           $actor = Model::factory('Actor')->create();
           $actor->name = $name;
           $actor->element_id = $elem_id;
           $actor->room_id = $room_id;
           if ($actor->save()) {
              $data["id"] = $actor->id;
              $data["name"] = $name;
              $data["element_id"] = $elem_id;
              $data["room_id"] = $room_id;
              $data["error"] = false;
           }
       }
       
       AjaxController::send_reply($app, $data);     
   }

   public static function actorModifyAction() {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'actorModify',
          'error' => true,
       );

       $id = $app->request()->post('id');
       $name = $app->request()->post('name');
       $elem_id = $app->request()->post('element_id');
       $room_id = $app->request()->post('room_id');
       $chk_id = Slim_Validate::numeric($id);
       $chk_name = Slim_Validate::standard_text($name);
       $chk_elem_id = Slim_Validate::numeric($elem_id);
       $chk_room_id = Slim_Validate::numeric($room_id);
       
       if (strlen($id)>0 && strlen($name)>0 && strlen($elem_id)>0 && strlen($room_id)>0 && $chk_id && $chk_name && $chk_elem_id && $chk_room_id) {
           $actor = Model::factory('Actor')->find_one($id);
           if ($actor !== null && $actor !== false) {
               $actor->name = $name;
               $actor->element_id = $elem_id;
               $actor->room_id = $room_id;
               if ($actor->save()) {
                   $data["id"] = $id;
                   $data["name"] = $name;
                   $data["element_id"] = $elem_id;
                   $data["room_id"] = $room_id;
                   $data["error"] = false;
               }
           }
       }
       
       AjaxController::send_reply($app, $data);     
   }
   
   public static function actorDeleteAction($id) {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'actorDelete',
          'id' => $id,
          'error' => true,
       );
       
       $actor = Model::factory('Actor')->find_one($id);
       if ($actor !== null && $actor !== false) {
           if ($actor->delete()) {
               $data['error'] = false;
           }
       }
       
       AjaxController::send_reply($app, $data);            
   }

   public static function sensorDetailsAction($id) {
       $app = Slim::getInstance();

       $data = array(
         'function' => 'sensorDetails',
         'id' => $id,
         'error' => true
       );
       
       $chk_id = Slim_Validate::numeric($id);
       if (strlen($id)>0 && $chk_id) {
           $sensor = Model::factory('Sensor')->find_one($id);           
           if ($sensor !== null && $sensor !== false) {
               $data = array(
                 'data' => $sensor->as_array(),
                 'error' => false
               );
           }
       }
       AjaxController::send_reply($app, $data);     
   }
   
   public static function sensorNewAction() {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'sensorNew',
          'error' => true,
       );

       $name = $app->request()->post('name');
       $elem_id = $app->request()->post('element_id');
       $room_id = $app->request()->post('room_id');
       $chk_name = Slim_Validate::standard_text($name);
       $chk_elem_id = Slim_Validate::numeric($elem_id);
       $chk_room_id = Slim_Validate::numeric($room_id);
       
       if (strlen($name)>0 && strlen($elem_id)>0 && strlen($room_id)>0 && $chk_name && $chk_elem_id && $chk_room_id) {          
           $sensor = Model::factory('Sensor')->create();
           $sensor->name = $name;
           $sensor->element_id = $elem_id;
           $sensor->room_id = $room_id;
           if ($sensor->save()) {
              $data["id"] = $sensor->id;
              $data["name"] = $name;
              $data["element_id"] = $elem_id;
              $data["room_id"] = $room_id;
              $data["error"] = false;
           }
       }
       
       AjaxController::send_reply($app, $data);     
   }

   public static function sensorModifyAction() {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'sensorModify',
          'error' => true,
       );

       $id = $app->request()->post('id');
       $name = $app->request()->post('name');
       $elem_id = $app->request()->post('element_id');
       $room_id = $app->request()->post('room_id');
       $chk_id = Slim_Validate::numeric($id);
       $chk_name = Slim_Validate::standard_text($name);
       $chk_elem_id = Slim_Validate::numeric($elem_id);
       $chk_room_id = Slim_Validate::numeric($room_id);
       
       if (strlen($id)>0 && strlen($name)>0 && strlen($elem_id)>0 && strlen($room_id)>0 && $chk_id && $chk_name && $chk_elem_id && $chk_room_id) {
           $sensor = Model::factory('Sensor')->find_one($id);
           if ($sensor !== null && $sensor !== false) {
               $sensor->name = $name;
               $sensor->element_id = $elem_id;
               $sensor->room_id = $room_id;
               if ($sensor->save()) {
                   $data["id"] = $id;
                   $data["name"] = $name;
                   $data["element_id"] = $elem_id;
                   $data["room_id"] = $room_id;
                   $data["error"] = false;
               }
           }
       }
       
       AjaxController::send_reply($app, $data);     
   }
   
   public static function sensorDeleteAction($id) {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'sensorDelete',
          'id' => $id,
          'error' => true,
       );
       
       $sensor = Model::factory('Sensor')->find_one($id);
       if ($sensor !== null && $sensor !== false) {
           if ($sensor->delete()) {
               $data['error'] = false;
           }
       }
       
       AjaxController::send_reply($app, $data);            
   }
   
   public static function moduleDetailsAction($id) {
       $app = Slim::getInstance();

       $data = array(
         'function' => 'moduleDetails',
         'id' => $id,
         'error' => true
       );
       
       $chk_id = Slim_Validate::numeric($id);
       if (strlen($id)>0 && $chk_id) {
           $module = Model::factory('Device')->find_one($id);           
           if ($module !== null && $module !== false) {
               $return_data = $module->as_array();
               $type = Model::factory('Device_type')->find_one($module->device_type_id);
               if ($type !== null) 
                   $return_data["device_type"] = $type->name;
               $statuses = Model::factory('Device_status')->where('device_id', $id)->find_many();
               foreach ($statuses as $i => $status) {
                   $return_data['status']['ch_'.$status->channel_id] = $status->status;    
               }
               $infos = Model::factory('Device_info')->where('device_id',$id)->find_many();
               foreach ($infos as $i => $info) {
                   $return_data[$info->device_attribute] = trim($info->device_value);
               }
               $data = array(
                 'data' => $return_data,
                 'error' => false
               );
           }
       }
       AjaxController::send_reply($app, $data);     
   }
   
   public static function moduleNewAction() {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'moduleNew',
          'error' => true,
       );

       $name = $app->request()->post('name');
       $device_type_id = $app->request()->post('device_type_id');
       $group_id = $app->request()->post('group_id');
       $item_id = $app->request()->post('item_id');
       $chk_name = Slim_Validate::standard_text($name);
       $chk_device_type_id = Slim_Validate::numeric($device_type_id);
       $chk_group_id = Slim_Validate::numeric($group_id);
       $chk_item_id = Slim_Validate::numeric($item_id);
       
       if (strlen($name)>0 && strlen($device_type_id)>0 && strlen($group_id)>0 && strlen($item_id)>0 && $chk_name && $chk_device_type_id && $chk_group_id && $chk_item_id) {          
           $module = Model::factory('Device')->create();
           $module->description = $name;
           $module->device_type_id = $device_type_id;
           $module->group_id = $group_id;
           $module->item_id = $item_id;
           if ($module->save()) {
              $data["id"] = $module->id;
              $data["name"] = $name;
              $data["device_type_id"] = $device_type_id;
              $data["group_id"] = $group_id;
              $data["item_id"] = $item_id;
              $data["error"] = false;
           }
       }
       
       AjaxController::send_reply($app, $data);     
   }

   public static function moduleModifyAction() {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'moduleModify',
          'error' => true,
       );

       $id = $app->request()->post('id');
       $name = $app->request()->post('name');
       $device_type_id = $app->request()->post('device_type_id');
       $group_id = $app->request()->post('group_id');
       $item_id = $app->request()->post('item_id');
       $chk_id = Slim_Validate::numeric($id);
       $chk_name = Slim_Validate::standard_text($name);
       $chk_device_type_id = Slim_Validate::numeric($device_type_id);
       $chk_group_id = Slim_Validate::numeric($group_id);
       $chk_item_id = Slim_Validate::numeric($item_id);
       
       if (strlen($id)>0 && strlen($name)>0 && strlen($device_type_id)>0 && strlen($group_id)>0 && strlen($item_id)>0 && $chk_id && $chk_name && $chk_device_type_id && $chk_group_id && $chk_item_id) {
           $module = Model::factory('Device')->find_one($id);
           if ($module !== null && $module !== false) {
               $module->description = $name;
               $module->device_type_id = $device_type_id;
               $module->group_id = $group_id;
               $module->item_id = $item_id;
               if ($module->save()) {
                   $data["id"] = $id;
                   $data["name"] = $name;
                   $data["device_type_id"] = $device_type_id;
                   $data["group_id"] = $group_id;
                   $data["item_id"] = $item_id;
                   $data["error"] = false;
               }
           }
       }
       
       AjaxController::send_reply($app, $data);     
   }
   
   public static function moduleDeleteAction($id) {
       $app = Slim::getInstance();
       
       $data = array(
          'function' => 'moduleDelete',
          'id' => $id,
          'error' => true,
       );
       
       $module = Model::factory('Device')->find_one($id);
       if ($module !== null && $module !== false) {
           if ($module->delete()) {
               $data['error'] = false;
           }
       }
       
       AjaxController::send_reply($app, $data);            
   }   
   
   public static function moduleSearchAction() {
       $app = Slim::getInstance();

       $fp = @fsockopen(CANBUS_GATEWAY, CANBUS_PORT, $errno, $errstr, 5);
       if (!$fp) {
           $data = "<div class=\"error\"><div class=\"msgAlert_content\"><p>Nie udało się połączyć z bramką do magistrali. Błąd: ".$errno.": ".$errstr."</p></div></div>";
       } else {
           for ($i=1; $i<=255; $i++) {
               $out = "105".sprintf("%03s",$i)."000000000000\r\n";
               fwrite($fp, $out);
               $out = "103".sprintf("%03s",$i)."000000000000\r\n";
               fwrite($fp, $out);
               $out = "10d".sprintf("%03s",$i)."000000000000\r\n";
               fwrite($fp, $out);
               $out = "10b".sprintf("%03s",$i)."000000000000\r\n";
               fwrite($fp, $out);
           }
           fclose($fp);
           $data = "<div class=\"info\"><div class=\"msgAlert_content\"><p>Wyszukiwanie nowych modułów zostało zakończone.</p></div></div>";
       }
       
       echo $data;
       $app->stop();  
   }

   public static function moduleReloadAction($id) {
       $app = Slim::getInstance();

       $data = array(
          'function' => 'moduleReload',
          'id' => $id,
          'error' => true,
       );
       
       $module = Model::factory('Device')->find_one($id);
       if ($module !== false && $module !== null ) {
           $group_id = $module->group_id;
           $item_id = $module->item_id;
           $fp = @fsockopen(CANBUS_GATEWAY, CANBUS_PORT, $errno, $errstr, 5);
           if ($fp) {
               $out = "106".sprintf("%03s",$group_id).sprintf("%03s",$item_id)."000000000\r\n";
               fwrite($fp, $out);
               $out = "104".sprintf("%03s",$group_id).sprintf("%03s",$item_id)."000000000\r\n";
               fwrite($fp, $out);
               $out = "10e".sprintf("%03s",$group_id).sprintf("%03s",$item_id)."000000000\r\n";
               fwrite($fp, $out);
               $out = "10c".sprintf("%03s",$group_id).sprintf("%03s",$item_id)."000000000\r\n";
               fwrite($fp, $out);
               fclose($fp);
               $data["error"]=false;
           }
       }
       
       AjaxController::send_reply($app, $data);     
   }
   
   public static function changePolarConnectionAction() {
       $app = Slim::getInstance();

       $data = array(
          'function' => 'changePolarConnection',
          'error' => true,
       );
              
       $id = $app->request()->post('id');
       $channel = $app->request()->post('channel');
       $chk_id = Slim_Validate::numeric($id);
       $chk_channel = Slim_Validate::numeric($channel);
       
       if (strlen($id)>0 && strlen($channel)>0 && $chk_id && $chk_channel) {
           $module = Model::factory('Device')->find_one($id);
           if ($module !== false && $module !== null) {
               $connect = Model::factory('Connection')
                               ->where('device_id', $id)
                               ->where('device_channel', $channel)
                               ->find_one();
               if ($connect !== false && $connect !== null) {
                   if ($connect->connection_type == 'NC') {
                       $connect->connection_type = 'NO';
                   } else {
                       $connect->connection_type = 'NC';                       
                   }
                   $connect->save();
                   $data["connection_type"] = $connect->connection_type;
                   $data["error"]=false;
               } else {
                   $data["err_dsc"] = "Brak połączenia!";
               }
           } else {
               $data["err_dsc"] = "Brak modulu!";
           }
       }
       
       AjaxController::send_reply($app, $data);
   }
   
   public static function actorStatusAction($id)
   {
       $app = Slim::getInstance();

       $data = array(
          'function' => 'actorStatus',
          'error' => true,
       );

       $statuses = array();
       $items = Model::factory('Actor_status')->where('actor_id', $id)->find_many();
       foreach ($items as $item) {
           $statuses["ch_".$item->channel_id] = $item->status;
       }

       if (count($statuses)>0) {
           $data['status'] = $statuses;
           $data['error'] = false;
       }

       AjaxController::send_reply($app, $data);
   }

   public static function sensorStatusAction($id)
   {
       $app = Slim::getInstance();

       $data = array(
          'function' => 'sensorStatus',
          'error' => true,
       );

       $statuses = array();
       $items = Model::factory('Sensor_status')->where('sensor_id', $id)->find_many();
       foreach ($items as $item) {
           $statuses["ch_".$item->channel_id] = $item->status;
       }

       if (count($statuses)>0) {
           $data['status'] = $statuses;
           $data['error'] = false;
       }
       
       AjaxController::send_reply($app, $data);
   }
   
   public static function totalStatusAction($ids)
   {
       $app = Slim::getInstance();
       
       $data = array(
           'function' => 'totalStatus',
           'error' => true,
       );
       
       $actors = array();
       $sensors = array();
       
       $g_actors = explode(",", substr($ids, 0, strpos($ids, "-")));
       $g_sensors = explode(",", substr($ids, strpos($ids, "-")+1));
       foreach ($g_actors as $g_act) {
           $check_id = Slim_Validate::numeric($g_act);
           if ($check_id) {
               $actors[] = $g_act;
           }   
       } 
       foreach ($g_sensors as $g_sen) {
           $check_id = Slim_Validate::numeric($g_sen);
           if ($check_id) {
               $sensors[] = $g_sen;
           }   
       } 
    
       if (count($actors) + count($sensors) > 0) {
           $actor_status = array();
           $sensor_status = array();
    
           foreach ($actors as $act) {
               $statuses = array();
               $items = Model::factory('Actor_status')->where('actor_id', $act)->find_many();
               foreach ($items as $item) {
                   $statuses["ch_".$item->channel_id] = $item->status;
               }
        
               if (count($statuses)>0) {
                   $actor_status[] = array(
                     "id" => $act,
                     "status" => $statuses,
                   );
               }
           }                  
        
           foreach ($sensors as $sen) {
               $statuses = array();
               $items = Model::factory('Sensor_status')->where('sensor_id', $sen)->find_many();
               foreach ($items as $item) {
                   $statuses["ch_".$item->channel_id] = $item->status;
               }
        
               if (count($statuses)>0) {
                   $sensor_status[] = array(
                     "id" => $sen,
                     "status" => $statuses,
                   );
               }
           }                  
           
           $data['actors'] = $actor_status;
           $data['sensors'] = $sensor_status;
           $data['error'] = false;
       }
       
       AjaxController::send_reply($app, $data);
   }
   
   
   public static function setActorStatusAction($id)
   {
       $app = Slim::getInstance();

       $data = array(
          'function' => 'setActorStatus',
          'error' => true,
       );

       $chk_id = Slim_Validate::numeric($id);
              
       if (strlen($id)>0 && $chk_id) {
          $actor = Model::factory('Actor')->find_one($id);
          if ($actor !== false && $actor !== null) {              
              $send_data = array('10a');
              switch ($actor->element_id) {
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                  case 8:
                  case 9:
                  case 10:
                  case 11:
                  case 12:
                  case 13:
                  case 14:
                  case 15:
                  case 16:
                  case 17:
                  case 18:
                  case 19:
                  case 20:
                  case 21:
                  case 22:
                  case 23:
                  case 24:
                  case 25:
                  case 26:
                  case 27:
                      $channel = $app->request()->put('channel');
                      $status = $app->request()->put('status');
                      $chk_channel = Slim_Validate::numeric($channel);
                      $chk_status = Slim_Validate::numeric($status);
                      
                      if (strlen($channel)>0 && strlen($status)>0 && $chk_channel && $chk_status) {
                          $connect = Model::factory('Connection')->where('element_id', $actor->id)->where('element_channel', $channel)->find_one();
                          if ($connect !== false && $connect !== null) {
                              if ($connect->element_scaler == -1) { $status = 255 - $status; }
                              
                              $model = $connect->device()->find_one();
                              if ($model !== false && $model !== null) {
                                  $send_data[] = sprintf('%03d', $model->group_id); 
                                  $send_data[] = sprintf('%03d', $model->item_id); 
                              }
                              
                              if ($status == 0) {
                                  $send_data[] = sprintf('%03d', 1);
                              } else {
                                  $send_data[] = sprintf('%03d', 0);                                  
                              }
                              
                              $send_data[] = sprintf('%03d', $connect->device_channel);
                              $send_data[] = sprintf('%03d', 0);
                          }
                      }
                      break;
                  default:
                      break;
              }
              if (count($send_data)>=3) {
                   $fp = @fsockopen(CANBUS_GATEWAY, CANBUS_PORT, $errno, $errstr, 5);
                   if ($fp) {
                       fwrite($fp, implode("", $send_data));
                       fclose($fp);
                       $data["error"] = false;
                   } else {
                       $data["error_info"] =  CANBUS_GATEWAY.":".CANBUS_PORT." >> ".$errno." - ".$errstr;
                   }             
              } else {
                  $data["error_info"] = "Nie oprogramowany aktor!";
              }
          }
       }
       
       AjaxController::send_reply($app, $data);
   }
   
   public static function setSensorStatusAction($id)
   {
       $app = Slim::getInstance();

       $data = array(
          'function' => 'setSensorStatus',
          'error' => true,
       );
       
       $chk_id = Slim_Validate::numeric($id);
       $send_data = array();
       
       if (strlen($id)>0 && $chk_id) {
          $sensor = Model::factory('Sensor')->find_one($id);
          if ($sensor !== false && $sensor !== null) {              
              switch ($sensor->element_id) {
                  case 34:
                      $send_data = array('10a');
                      $channel = $app->request()->put('channel');
                      $status = $app->request()->put('status');
                      $chk_channel = Slim_Validate::numeric($channel);
                      $chk_status = Slim_Validate::numeric($status);
                      if (strlen($channel)>0 && strlen($status)>0 && $chk_channel && $chk_status) {
                          $connect = Model::factory('Connection')->where('element_id', $sensor->id)->where('element_type', 'SENSOR')->where('element_channel', $channel)->find_one();
                          if ($connect !== false && $connect !== null) {
                              if ($connect->element_scaler == -1) { $status = 255 - $status; }
                             
                              $model = $connect->device()->find_one();
                              if ($model !== false && $model !== null) {
                                  $send_data[] = sprintf('%03d', $model->group_id); 
                                  $send_data[] = sprintf('%03d', $model->item_id); 
                              }
                
                              $send_data[] = sprintf('%03d', 0);
                              $send_data[] = sprintf('%03d', $status); 
                              $send_data[] = sprintf('%03d', 0); 
                          }
                      }
                      break;
                  default:
                      break;
              }
              if (count($send_data)>=3) {
                   $fp = @fsockopen(CANBUS_GATEWAY, CANBUS_PORT, $errno, $errstr, 5);
                   if ($fp) {
                       fwrite($fp, implode("", $send_data));
                       fclose($fp);
                       $data["error"] = false;
                   }                  
              }
          }
       }
              
       AjaxController::send_reply($app, $data);
       
   }
   
}
