<?php

class Device extends Model {
     public function type() {
         return $this->belongs_to('Device_type');
     }
     public function connections() {
         return $this->has_many('Connection');
     }
}