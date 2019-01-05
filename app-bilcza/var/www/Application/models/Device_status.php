<?php

class Device_status extends Model {
     public function device() {
         return $this->belongs_to('Device');
     }
}