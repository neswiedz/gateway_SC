<?php

class Room extends Model {
    public function actors() {
        return $this->has_many('Actor');
    }

    public function sensors() {
        return $this->has_many('Sensor');
    }

    public function group() {
        return $this->belongs_to('Group_room', 'group_id');
    }
}