<?php

class Sensor_status extends Model {
     public function sensor() {
         return $this->belongs_to('Sensor');
     }
}