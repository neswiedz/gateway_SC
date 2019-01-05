<?php

class Actor extends Model {
     public function room() {
         return $this->belongs_to('Room');
     }
     
     public function type() {
         return $this->belongs_to('Element');
     }
     
     public function statuses() {
         return $this->has_many('Actor_status');
     }
}