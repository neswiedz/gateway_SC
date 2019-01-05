<?php

class Device_info extends Model {
     public function device() {
         return $this->belongs_to('Device');
     }
}