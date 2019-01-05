<?php

class Type_room {   
    public static function getTypes() {
        return array(
           array( 
              'id' => 'room_balkon',
              'name' => 'Balkon/Taras',
           ),
           array( 
              'id' => 'room_dzieciecy',
              'name' => 'Pokój dziecięcy',
           ),
           array( 
              'id' => 'room_gabinet',
              'name' => 'Gabinet',
           ),
           array( 
              'id' => 'room_garaz',
              'name' => 'Garaż',
           ),
           array( 
              'id' => 'room_korytarz',
              'name' => 'Korytarz',
           ),
           array( 
              'id' => 'room_kuchnia',
              'name' => 'Kuchnia',
           ),
           array( 
              'id' => 'room_lazienka',
              'name' => 'Łazienka',
           ),
           array( 
              'id' => 'room_ogrod',
              'name' => 'Ogród',
           ),
           array( 
              'id' => 'room_salon',
              'name' => 'Salon',
           ),
           array( 
              'id' => 'room_sypialnia',
              'name' => 'Sypialnia',
           ),
           array( 
              'id' => 'room_inne',
              'name' => 'Inne',
           ),
        );
    }
    public static function getKeys() {
        return array('room_balkon', 'room_inne', 'room_dzieciecy', 'room_gabinet', 'room_garaz', 'room_lazienka', 'room_korytarz', 'room_kuchnia', 'room_ogrod', 'room_salon', 'room_sypialnia');
    }
}