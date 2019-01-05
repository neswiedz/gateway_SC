<?php

class Group_room extends Model {
    public function rooms() {
        return $this->has_many('Room');
    }
    
    public static function getGroupWithRooms() {
        $result = array();
        $groups = Model::factory('Group_room')->order_by_asc('item_order')->find_many();
        foreach ($groups as $group) {
            $childs = Model::factory('Room')->where('group_id', $group->id)->order_by_asc('group_order')->find_many();
            $rooms = array();
            foreach ($childs as $child) {
                $rooms[] = $child->as_array();
            }
            $result[] = array_merge($group->as_array(), array('rooms' => $rooms));
        }
        return $result;
    }
}