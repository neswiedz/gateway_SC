<?php

class Actor_status extends Model {
     public function actor() {
         return $this->belongs_to('Actor');
     }
}