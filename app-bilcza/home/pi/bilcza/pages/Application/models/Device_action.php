<?php

class Device_action extends Model {
     public function device() {
         return $this->belongs_to('Device');
     }
     public function trigger() {
         if ($this->trigger_type == 'ACTOR') {
             return $this->belongs_to('Actor', 'trigger_id');
         } else {
             return $this->belongs_to('Sensor', 'trigger_id');
         }
     }
     
     public static function canConfigure($element_type)
     {
         return count(Device_action::actions($element_type))>0;
     }
     
     public static function actions($element_type) 
     {
          $base_action = array(
              'relay' => array(
                  array( 'id' => '00', 'short_description' => 'Wyłącz', 'description' => 'Wyłącza wybrany przekaźnik, pozostałe bez zmian', 'params' => array('instruction', 'channel', 'timer')),
                  array( 'id' => '01', 'short_description' => 'Włącz', 'description' => 'Włącz wybrany przekaźnik, pozostałe bez zmian', 'params' => array('instruction', 'channel', 'timer')),
                  array( 'id' => '02', 'short_description' => 'Zaneguj', 'description' => 'Ustaw stan wybranych przekaźników na przeciwny, pozostałe bez zmian', 'params' => array('instruction', 'channel', 'timer')),
              ),
              'it' => array(
                  array( 'id' => '00', 'short_description' => 'Wyślij kod SIRC 12bit', 'description' => 'Nadaje kod SIRC 12 bitowy, 32 adresy i 128 poleceń', 'params' => array('instruction', 'address', 'parameter')),
                  array( 'id' => '01', 'short_description' => 'Wyślij kod SIRC 15bit', 'description' => 'Nadaje kod SIRC 15 bitowy, 256 adresy i 128 poleceń', 'params' => array('instruction', 'address', 'parameter')),
                  array( 'id' => '02', 'short_description' => 'Wyślij kod RC5A', 'description' => 'Nadaje kod RC5A, 32 adresy i 128 poleceń', 'params' => array('instruction', 'address', 'parameter')),
                  array( 'id' => '03', 'short_description' => 'Wyślij kod Samsung', 'description' => 'Nadaje kod Samsung, 256 adresy i 256 poleceń', 'params' => array('instruction', 'address', 'parameter')),
                  array( 'id' => '04', 'short_description' => 'Wyślij kod NEC', 'description' => 'Nadaje kod NEX, 256 adresy i 256 poleceń', 'params' => array('instruction', 'address', 'parameter')),
                  array( 'id' => 'C9', 'short_description' => 'Wyślij odebrany kod', 'description' => 'Nadaje kod jaki został odebrany z magistrali', 'params' => array('instruction', 'address', 'parameter')),
              ),
              'temp' => array(
                  array( 'id' => '00', 'short_description' => 'Ustaw termostat na', 'description' => 'Ustawia termostat na wartość równą', 'params' => array('instruction', 'value')),
                  array( 'id' => '01', 'short_description' => 'Zmniejsz termostat o', 'description' => 'Zmniejsza nastawę o wartość', 'params' => array('instruction', 'value')),
                  array( 'id' => '02', 'short_description' => 'Zwiększ termostat o', 'description' => 'Zwiększa nastawę o wartość', 'params' => array('instruction', 'value')),
              ),
              'dimmer' => array(
                  array( 'id' => '00', 'short_description' => 'Ustaw na', 'description' => 'Ustawia natychmiast stan na poziom okrelony', 'params' => array('instruction', 'value')),
                  array( 'id' => '01', 'short_description' => 'Zaneguj', 'description' => 'Jeśli jest włączony to zostanie wyłączony. Jeśli jest wyłączony to zostanie włączony na wartość maksymalną.', 'params' => array('instruction')),
                  array( 'id' => '02', 'short_description' => 'Ściemnij o 1', 'description' => 'Stan zostanie zmniejszony o 1', 'params' => array('instruction')),
                  array( 'id' => '03', 'short_description' => 'Rozjaśnij o 1', 'description' => 'Stan zostanie zwiększony o 1', 'params' => array('instruction')),
                  array( 'id' => '04', 'short_description' => 'Stop', 'description' => 'Zatrzymuje instrukcję Start lub Ustaw płynnie na', 'params' => array('instruction')),
                  array( 'id' => '05', 'short_description' => 'Start', 'description' => 'Instrukcja rozpoczyna typowy proces sterowania ????', 'params' => array('instruction')),
                  array( 'id' => '06', 'short_description' => 'Ustaw płynnie na', 'description' => 'Ustawia wybraną wartość płynnie.', 'params' => array('instruction', 'value')),
              ),
              'blind' => array(
                  array( 'id' => '00', 'short_description' => 'Stop', 'description' => 'Zatrzymuje wybrane rolety', 'params' => array('instruction', 'channel', 'timer')),
                  array( 'id' => '01', 'short_description' => 'Góra / Stop', 'description' => 'Uruchomi roletę do góry, jeśli była zatrzymana. Jeśli była w ruchu zatrzyma ją.', 'params' => array('instruction', 'channel', 'timer')),
                  array( 'id' => '02', 'short_description' => 'Dół / Stop', 'description' => 'Uruchomi roletę w dół, jeśli była zatrzymana. Jeśli była w ruchu zatrzyma ją.', 'params' => array('instruction', 'channel', 'timer')),
                  array( 'id' => '03', 'short_description' => 'Góra', 'description' => 'Uruchomi roletę do góry, jeśli była zatrzymana. Jeśli była w ruchu zatrzyma ją i uruchomi do góry po 1.5s.', 'params' => array('instruction', 'channel', 'timer')),
                  array( 'id' => '04', 'short_description' => 'Dół', 'description' => 'Uruchomi roletę w dół, jeśli była zatrzymana. Jeśli była w ruchu zatrzyma ją i uruchomi w dół po 1.5s.', 'params' => array('instruction', 'channel', 'timer')),
                  array( 'id' => '05', 'short_description' => 'Start', 'description' => 'Jeli roleta była zatrzymana, uruchomi ją w kierunku przeciwnym od ostatniego ruchu. Jeli roleta jest w ruchu - zatrzyma ja.', 'params' => array('instruction', 'channel', 'timer')),
              ),
              'led' => array(
                  array( 'id' => '00', 'short_description' => 'Ustaw R na', 'description' => 'Ustawia natychmiast stan kanału na poziom okrelony', 'params' => array('instruction', 'value', 'timer')),
                  array( 'id' => '01', 'short_description' => 'Ustaw G na', 'description' => 'Ustawia natychmiast stan kanału na poziom okrelony', 'params' => array('instruction', 'value', 'timer')),
                  array( 'id' => '02', 'short_description' => 'Ustaw B na', 'description' => 'Ustawia natychmiast stan kanału na poziom okrelony', 'params' => array('instruction', 'value', 'timer')),
                  array( 'id' => '03', 'short_description' => 'Ustaw MASTER na', 'description' => 'Ustawia natychmiast stan kanału na poziom okrelony', 'params' => array('instruction', 'value', 'timer')),
                  array( 'id' => '04', 'short_description' => 'Zaneguj R', 'description' => 'Jeśli kanał jest włączony to zostanie wyłączony. Jeśli jest wyłączony to zostanie włączony na wartość maksymalną.', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '05', 'short_description' => 'Zaneguj G', 'description' => 'Jeśli kanał jest włączony to zostanie wyłączony. Jeśli jest wyłączony to zostanie włączony na wartość maksymalną.', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '06', 'short_description' => 'Zaneguj B', 'description' => 'Jeśli kanał jest włączony to zostanie wyłączony. Jeśli jest wyłączony to zostanie włączony na wartość maksymalną.', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '07', 'short_description' => 'Zaneguj MASTER', 'description' => 'Jeśli kanał jest włączony to zostanie wyłączony. Jeśli jest wyłączony to zostanie włączony na wartość maksymalną.', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '08', 'short_description' => 'Ściemnij R o 1', 'description' => 'Stan kanału zostanie zmniejszony o 1', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '09', 'short_description' => 'Ściemnij G o 1', 'description' => 'Stan kanału zostanie zmniejszony o 1', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '0A', 'short_description' => 'Ściemnij B o 1', 'description' => 'Stan kanału zostanie zmniejszony o 1', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '0B', 'short_description' => 'Ściemnij MASTER o 1', 'description' => 'Stan kanału zostanie zmniejszony o 1', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '0C', 'short_description' => 'Rozjaśnij R o 1', 'description' => 'Stan kanału zostanie zwiększony o 1', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '0D', 'short_description' => 'Rozjaśnij G o 1', 'description' => 'Stan kanału zostanie zwiększony o 1', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '0E', 'short_description' => 'Rozjaśnij B o 1', 'description' => 'Stan kanału zostanie zwiększony o 1', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '0F', 'short_description' => 'Rozjaśnij MASTER o 1', 'description' => 'Stan kanału zostanie zwiększony o 1', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '10', 'short_description' => 'Ustaw płynnie R na', 'description' => 'Ustawia wybraną wartość płynnie.', 'params' => array('instruction', 'value', 'timer')),
                  array( 'id' => '11', 'short_description' => 'Ustaw płynnie G na', 'description' => 'Ustawia wybraną wartość płynnie.', 'params' => array('instruction', 'value', 'timer')),
                  array( 'id' => '12', 'short_description' => 'Ustaw płynnie B na', 'description' => 'Ustawia wybraną wartość płynnie.', 'params' => array('instruction', 'value', 'timer')),
                  array( 'id' => '13', 'short_description' => 'Ustaw płynnie MASTER na', 'description' => 'Ustawia wybraną wartość płynnie.', 'params' => array('instruction', 'value', 'timer')),
                  array( 'id' => '14', 'short_description' => 'Stop R', 'description' => 'Zatrzymuje instrukcję Start lub Ustaw płynnie na', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '15', 'short_description' => 'Stop G', 'description' => 'Zatrzymuje instrukcję Start lub Ustaw płynnie na', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '16', 'short_description' => 'Stop B', 'description' => 'Zatrzymuje instrukcję Start lub Ustaw płynnie na', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '17', 'short_description' => 'Stop MASTER', 'description' => 'Zatrzymuje instrukcję Start lub Ustaw płynnie na', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '18', 'short_description' => 'Start R', 'description' => 'Instrukcja rozpoczyna typowy proces sterowania ????', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '19', 'short_description' => 'Start G', 'description' => 'Instrukcja rozpoczyna typowy proces sterowania ????', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '1A', 'short_description' => 'Start B', 'description' => 'Instrukcja rozpoczyna typowy proces sterowania ????', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '1B', 'short_description' => 'Start MASTER', 'description' => 'Instrukcja rozpoczyna typowy proces sterowania ????', 'params' => array('instruction', false, 'timer')),
                  array( 'id' => '1C', 'short_description' => 'Ustaw RGB na', 'description' => 'Ustawia wartość trzech kanałów jednoczenie zgodnie z wartością RGB', 'params' => array('instruction', 'rgb_1', 'rgb_2')),
                  array( 'id' => '1D', 'short_description' => 'Ustaw predkość RGB na', 'description' => 'Ustawia czas ściemniania dla wszystkich kanałów', 'params' => array('instruction', 'timer')),
                  array( 'id' => '1E', 'short_description' => 'Zwiększ predkość RGB', 'description' => 'Zmienia czas ściemniania dla wszystkich kanałów na kolejną mniejszą wartość', 'params' => array('instruction')),
                  array( 'id' => '1F', 'short_description' => 'Zmniejsz predkość RGB', 'description' => 'Zmienia czas ściemniania dla wszystkich kanałów na kolejną większą wartość', 'params' => array('instruction')),
              ),
          );
                
          $ret_action = array();
          switch ($element_type) {
              case 'mod_wej3ch_din':
              case 'mod_wej8ch_km':
                break;
              case 'mod_wyj2ch_din':
              case 'mod_wyj6ch_din':
              case 'mod_wyj6ch_10_din':
              case 'mod_wyj_km':
              case 'mod_wyj2ch_km':
              case 'mod_wyj_10_km':
              case 'mod_wyj2ch_10_km':
                $ret_action = $base_action['relay'];      
                break;
              case 'mod_it_ir_din':
              case 'mod_it_ir_km':
                break;
              case 'mod_blind_din':
                $ret_action = $base_action['blind'];
                break;
              case 'mod_temp_din':
              case 'mod_temp_km':
                $ret_action = $base_action['temp'];
                break;
              case 'mod_dimmer_din':
                $ret_action = $base_action['dimmer'];
                break;
              case 'mod_www_din':
                break;
              case 'mod_gsm_din':
                break;
          }
          
          return $ret_action;
     }
     
}