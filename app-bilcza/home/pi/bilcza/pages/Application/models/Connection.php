<?php

class Connection extends Model {
     public function device() {
         return $this->belongs_to('Device');
     }
}