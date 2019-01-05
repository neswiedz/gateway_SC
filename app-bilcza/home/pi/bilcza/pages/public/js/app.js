var App = {};

App = function ()
{
    var defaults = {};    
    var options = {};
    var wMgmt = false;

    return { init: init, widgetInit: widgetInit };
    
    function init (config)
    {                        
        options = $.extend (defaults, config);
        Nav.init();
        if ($.fn.dataTable) { $('.datatable').dataTable ({ "sPaginationType": "full_numbers" }); };
        if ($.fn.placeholder) { $('input, textarea').placeholder (); }
        this.wMgmt = new WidgetMgmt(); 
        this.wMgmt.init();
        if (typeof JsInit == 'function') { JsInit() }       
    }    
    
    function widgetInit (widgets)
    {
         tmp_wMgmt = this.wMgmt;
         
         $(widgets).each(function(i,wid) {
            var item = false;
            switch (wid.type_id) {
                case 1:
                    item = new Widget_Lamp_1;
                    break;
                case 2:
                    item = new Widget_Lamp_2;
                    break;
                case 3:
                    item = new Widget_Kin_1;
                    break;
                case 4:
                    item = new Widget_Kin_2;
                    break;
                case 5:
                    item = new Widget_Lamp_Sto_1;
                    break;
                case 6:
                    item = new Widget_Lamp_Sto_2;
                    break;
                case 7:
                    item = new Widget_Lamp_RGB;
                    break;
                case 8:
                    item = new Widget_Lamp_R;
                    break;
                case 9:
                    item = new Widget_Lamp_G;
                    break;
                case 10:
                    item = new Widget_Lamp_B;
                    break;
                case 11:
                    item = new Widget_Kontakt_1;
                    break;
                case 12:
                    item = new Widget_Kontakt_2;
                    break;
                case 13:
                    item = new Widget_Telewizor;
                    break;
                case 14:
                    item = new Widget_Video;
                    break;
                case 15:
                    item = new Widget_HiFi;
                    break;
                case 16:
                    item = new Widget_AudioVideo;
                    break;
                case 17:
                    item = new Widget_Kamera;
                    break;
                case 18:
                    item = new Widget_Wentylator;
                    break;
                case 19:
                    item = new Widget_Klimatyzator;
                    break;
                case 20:
                    item = new Widget_Kaloryfer;
                    break;
                case 21:
                    item = new Widget_Piec;
                    break;
                case 22:
                    item = new Widget_Zawor;
                    break;
                case 23:
                    item = new Widget_Pompa;
                    break;
                case 24:
                    item = new Widget_Markiza;
                    break;
                case 25:
                    item = new Widget_Roleta;
                    break;
                case 26:
                    item = new Widget_Zaluzja;
                    break;
                case 27:
                    item = new Widget_Zraszacz;
                    break;
                case 28:
                    item = new Widget_Brama_Garazowa;
                    break;
                case 29:
                    item = new Widget_Brama_Skrzydlowa;
                    break;
                case 30:
                    item = new Widget_Brama_Suwana;
                    break;
                case 31:
                    item = new Widget_Wlacznik_1;
                    break;
                case 32:
                    item = new Widget_Wlacznik_2;
                    break;
                case 33:
                    item = new Widget_Wlacznik_3;
                    break;
                case 34:
                    item = new Widget_Wlacznik_regulowany;
                    break;
                case 35:
                    item = new Widget_Czujnik_ruchu;
                    break;
                case 36:
                    item = new Widget_Czujnik_dymu;
                    break;
                case 37:
                    item = new Widget_Czujnik_gazu;
                    break;
                case 38:
                    item = new Widget_Czujnik_zalania;
                    break;
                case 39:
                    item = new Widget_Czujnik_temperatury;
                    break;
                case 40:
                    item = new Widget_Alarm_centrala;
                    break;
                case 41:
                    item = new Widget_Alarm_manipulator;
                    break;
                case 42:
                    item = new Widget_Czytnik_kart;
                    break;
                case 43:
                    item = new Widget_Odbiornik_podczerwieni;
                    break;
                default:
                    break;                
            } 
            if (typeof(item) == 'object' && typeof(item.init) == 'function') {
               item.init(wid);
            }
            if (typeof(item) == 'object') {
               tmp_wMgmt.addWidget(item);
            }
         });      
    }
}();

function WidgetMgmt() {
   this.widgets = [];
   this.actors = [];
   this.sensors = [];
   this.timer = false;
   
   return {init: init, addWidget: addWidget, update: update };   
   
   function addWidget(widget) {
      _this =this;
      _this.widgets.push(widget);
      var id = '';
      if (widget.id.search("actor")>=0) {
          id = widget.id.replace("item_actor__", "");
          _this.actors.push(id);
      }
      if (widget.id.search("sensor")>=0) {
          id = widget.id.replace("item_sensor__", "");      
          _this.sensors.push(id);
      }
   }
   
   function init(config) {
       _this = this;
       this.widgets = [];
       this.actors = [];
       this.sensors = [];
       this.timer = $.timer(function() { _this.update(); });
       this.timer.set({time: 2000, autostart: true });  
   }
   
   function update() {
       var _this = this;
       if (this.actors.length+ this.sensors.length>0) {
           $.ajax({
                url: './ajax/total/status/' + this.actors.join() + "-" + this.sensors.join(),
                type: 'GET',
                success: function(obj) {
                    if (!obj.error) {
                        $(obj.actors).each(function(index) {
                           var id = this.id;
                           var status = this.status;
                           $(_this.widgets).each(function(index) {
                               if (this.id == 'item_actor__' + id) {
                                  this.status = status;
                                  this.redraw();
                               }
                           });
                        })
                        $(obj.sensors).each(function(index) {
                           var id = this.id;
                           var status = this.status;
                           $(_this.widgets).each(function(index) {
                               if (this.id == 'item_sensor__' + id) {
                                  this.status = status;
                                  this.redraw();
                               }
                           });
                        })
                        _this.timer.set({ time: 1*2000 });
                    } else {
                        $.msgAlert({
                              type: 'error',
                              title: 'Aktualizacja statusu',
                              text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                        }); 
                        _this.timer.set({ time: 5*2000 });
                    }
                },
                error: function() {
                    $.msgAlert({
                          type: 'error',
                          title: 'Aktualizacja statusu',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
                    _this.timer.set({ time: 5*2000 });
                }           
           }); 
       }
   }
}

function Widget() {
   this.options = {};
   this.defaults = { timer : 700 };
   this.timer = false;
   this.status = {};
   this.url = '';
   this.id = false;
   
   this.init = function(config) {
       var _this = this;
       if (config.type == 'ACTOR') {
           this.url = "./ajax/aktor/status/" + config.elem_id;
       }
       if (config.type == 'SENSOR') {
           this.url = "./ajax/sensor/status/" + config.elem_id;
       }
       this.id = config.id;
       this.status = config.status;
       this.options = $.extend ( _this.defaults, config );
       this.render();
   };
   
   this.update = function() {
       var _this = this;
       $.ajax({
            url: _this.url,
            type: 'GET',
            success: function(obj) {
                if (!obj.error) {
                    _this.status = obj.status;
                    _this.redraw();
                } else {
                    _this.redraw();
                    $.msgAlert({
                          type: 'error',
                          title: 'Aktualizacja statusu',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    }); 
                }
            },
            error: function() {
                _this.redraw();
                $.msgAlert({
                      type: 'error',
                      title: 'Aktualizacja statusu',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
            }           
       }) 
   };
   
   this.render = function() {}; 
   this.redraw = function() {};
};

Widget_Lamp_1 = function() {}
Widget_Lamp_1.prototype = new Widget();
Widget_Lamp_1.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Lamp_1.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Lamp_2 = function() {}
Widget_Lamp_2.prototype = new Widget();
Widget_Lamp_2.prototype.render = function() {
   html = '<p>';
   html += 'L: ';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>'; 
   html += '</p><p>P: ';
   html += '<a id="btn_'+this.id+'_ch_2_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_2_off" class="btn small">Off</a>'; 
   html += '</p>';
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_2_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 2, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_2_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 2, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Lamp_2.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('ch1_on').removeClass('ch1_off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('ch1_off').removeClass('ch1_on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
   if (this.status['ch_2'] == '255') {
       $('#'+this.id+' div.img').addClass('ch2_on').removeClass('ch2_off');
       $('#btn_'+this.id+"_ch_2_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_2_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('ch2_off').removeClass('ch2_on');
       $('#btn_'+this.id+"_ch_2_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_2_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Kin_1 = function() {}
Widget_Kin_1.prototype = new Widget();
Widget_Kin_1.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Kin_1.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Kin_2 = function() {}
Widget_Kin_2.prototype = new Widget();
Widget_Kin_2.prototype.render = function() {
   html = '<p>';
   html += 'G: ';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>'; 
   html += '</p><p>D: ';
   html += '<a id="btn_'+this.id+'_ch_2_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_2_off" class="btn small">Off</a>'; 
   html += '</p>';
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_2_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 2, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_2_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 2, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Kin_2.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('ch1_on').removeClass('ch1_off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('ch1_off').removeClass('ch1_on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
   if (this.status['ch_2'] == '255') {
       $('#'+this.id+' div.img').addClass('ch2_on').removeClass('ch2_off');
       $('#btn_'+this.id+"_ch_2_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_2_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('ch2_off').removeClass('ch2_on');
       $('#btn_'+this.id+"_ch_2_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_2_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Lamp_Sto_1 = function() {}
Widget_Lamp_Sto_1.prototype = new Widget();
Widget_Lamp_Sto_1.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Lamp_Sto_1.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Lamp_Sto_2 = function() {}
Widget_Lamp_Sto_2.prototype = new Widget();
Widget_Lamp_Sto_2.prototype.render = function() {
   html = '<p>';
   html += 'P: ';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>'; 
   html += '</p><p>L: ';
   html += '<a id="btn_'+this.id+'_ch_2_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_2_off" class="btn small">Off</a>'; 
   html += '</p>';
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_2_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 2, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_2_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 2, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Lamp_Sto_2.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('ch1_on').removeClass('ch1_off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('ch1_off').removeClass('ch1_on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
   if (this.status['ch_2'] == '255') {
       $('#'+this.id+' div.img').addClass('ch2_on').removeClass('ch2_off');
       $('#btn_'+this.id+"_ch_2_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_2_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('ch2_off').removeClass('ch2_on');
       $('#btn_'+this.id+"_ch_2_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_2_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Lamp_RGB = function() {}
Widget_Lamp_RGB.prototype = new Widget();
Widget_Lamp_RGB.prototype.render = function() {
   this.redraw();
};
Widget_Lamp_RGB.prototype.redraw = function() {
}

Widget_Lamp_R = function() {}
Widget_Lamp_R.prototype = new Widget();
Widget_Lamp_R.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Lamp_R.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Lamp_G = function() {}
Widget_Lamp_G.prototype = new Widget();
Widget_Lamp_G.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Lamp_G.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Lamp_B = function() {}
Widget_Lamp_B.prototype = new Widget();
Widget_Lamp_B.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Lamp_B.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Kontakt_1 = function() {}
Widget_Kontakt_1.prototype = new Widget();
Widget_Kontakt_1.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Kontakt_1.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Kontakt_2 = function() {}
Widget_Kontakt_2.prototype = new Widget();
Widget_Kontakt_2.prototype.render = function() {
   html = '<p>';
   html += 'G: ';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>'; 
   html += '</p><p>D: ';
   html += '<a id="btn_'+this.id+'_ch_2_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_2_off" class="btn small">Off</a>'; 
   html += '</p>';
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_2_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 2, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_2_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 2, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Kontakt_2.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('ch1_on').removeClass('ch1_off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('ch1_off').removeClass('ch1_on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
   if (this.status['ch_2'] == '255') {
       $('#'+this.id+' div.img').addClass('ch2_on').removeClass('ch2_off');
       $('#btn_'+this.id+"_ch_2_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_2_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('ch2_off').removeClass('ch2_on');
       $('#btn_'+this.id+"_ch_2_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_2_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Telewizor = function() {}
Widget_Telewizor.prototype = new Widget();
Widget_Telewizor.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Telewizor.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Video = function() {}
Widget_Video.prototype = new Widget();
Widget_Video.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Video.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_HiFi = function() {}
Widget_HiFi.prototype = new Widget();
Widget_HiFi.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_HiFi.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_AudioVideo = function() {}
Widget_AudioVideo.prototype = new Widget();
Widget_AudioVideo.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_AudioVideo.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Kamera = function() {}
Widget_Kamera.prototype = new Widget();
Widget_Kamera.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Kamera.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Wentylator = function() {}
Widget_Wentylator.prototype = new Widget();
Widget_Wentylator.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Wentylator.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Klimatyzator = function() {}
Widget_Klimatyzator.prototype = new Widget();
Widget_Klimatyzator.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Klimatyzator.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Kaloryfer = function() {}
Widget_Kaloryfer.prototype = new Widget();
Widget_Kaloryfer.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Kaloryfer.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Piec = function() {}
Widget_Piec.prototype = new Widget();
Widget_Piec.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Piec.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Zawor = function() {}
Widget_Zawor.prototype = new Widget();
Widget_Zawor.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Zawor.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Pompa = function() {}
Widget_Pompa.prototype = new Widget();
Widget_Pompa.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Pompa.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Markiza = function() {}
Widget_Markiza.prototype = new Widget();
Widget_Markiza.prototype.render = function() {

};

Widget_Roleta = function() {}
Widget_Roleta.prototype = new Widget();
Widget_Roleta.prototype.render = function() {
   html = '<p>Stan aktualny:<span class="slider_value"></span></p>';
   html += '<div class="slider"></div>';
   html += '<p style="padding-top: 20px">';
   html += '<a id="btn_'+this.id+'_ch_1_up" class="btn small secondary" style="width:auto">&uarr;</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_down" class="btn small secondary" style="width:auto">&darr;</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_stop" class="btn small secondary" style="width:auto">Stop</a>';
   html += '</p>';
   var val = this.status['ch_1'];
   if (!val) { val=0; }
   _this = this;
   $('#'+this.id+' div.dynamic').html(html);
   $('#'+this.id+' div.slider').slider({
      value: val,
      min: 0,
      max: 255,
      step: 5,
   });
   $('#'+this.id+' div.dynamic').addClass('small');
   $('#'+this.id+' div.slider').slider('disable');
   $('#'+this.id+' div.slider').attr('rel', this.id);
   $('#'+this.id+' div.slider').attr('old_value', val);
   $('#btn_'+this.id+'_ch_1_up').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'up' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });   
   $('#btn_'+this.id+'_ch_1_down').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'down' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });   
   $('#btn_'+this.id+'_ch_1_stop').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'stop' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });      
   this.redraw();
};
Widget_Roleta.prototype.redraw = function() {
   var old_value = $('#'+this.id+' div.slider').attr('old_value');
   var val = this.status['ch_1'];
   if (!val) { val=0; }
   if (old_value == val) {
      if (val == 0) {
         $('#'+this.id+' div.img').addClass('off').removeClass('on').removeClass('down').removeClass('up');
      } else {
         $('#'+this.id+' div.img').addClass('on').removeClass('off').removeClass('down').removeClass('up');      
      }
   } else if (old_value<val) {
      $('#'+this.id+' div.img').addClass('up').removeClass('off').removeClass('down').removeClass('on');      
   } else if (old_value>val) {
      $('#'+this.id+' div.img').addClass('down').removeClass('off').removeClass('on').removeClass('up');      
   }
   $('#'+this.id+' .slider_value').html(val);
   $('#'+this.id+' div.slider').attr('old_value', val);
}

Widget_Zaluzja = function() {}
Widget_Zaluzja.prototype = new Widget();
Widget_Zaluzja.prototype.render = function() {
   html = '<p>Stan aktualny:<span class="slider_value"></span></p>';
   html += '<div class="slider"></div>';
   html += '<p style="padding-top: 20px">';
   html += '<a id="btn_'+this.id+'_ch_1_up" class="btn small secondary" style="width:auto">&uarr;</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_down" class="btn small secondary" style="width:auto">&darr;</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_stop" class="btn small secondary" style="width:auto">Stop</a>';
   html += '</p>';
   var val = this.status['ch_1'];
   if (!val) { val=0; }
   _this = this;
   $('#'+this.id+' div.dynamic').html(html);
   $('#'+this.id+' div.slider').slider({
      value: val,
      min: 0,
      max: 255,
      step: 5,
   });
   $('#'+this.id+' div.dynamic').addClass('small');
   $('#'+this.id+' div.slider').slider('disable');
   $('#'+this.id+' div.slider').attr('rel', this.id);
   $('#'+this.id+' div.slider').attr('old_value', val);
   $('#btn_'+this.id+'_ch_1_up').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'up' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });   
   $('#btn_'+this.id+'_ch_1_down').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'down' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });   
   $('#btn_'+this.id+'_ch_1_stop').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'stop' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });      
   this.redraw();
};
Widget_Zaluzja.prototype.redraw = function() {
   var old_value = $('#'+this.id+' div.slider').attr('old_value');
   var val = this.status['ch_1'];
   if (!val) { val=0; }
   if (old_value == val) {
      if (val == 0) {
         $('#'+this.id+' div.img').addClass('off').removeClass('on').removeClass('down').removeClass('up');
      } else {
         $('#'+this.id+' div.img').addClass('on').removeClass('off').removeClass('down').removeClass('up');      
      }
   } else if (old_value<val) {
      $('#'+this.id+' div.img').addClass('up').removeClass('off').removeClass('down').removeClass('on');      
   } else if (old_value>val) {
      $('#'+this.id+' div.img').addClass('down').removeClass('off').removeClass('on').removeClass('up');      
   }
   $('#'+this.id+' .slider_value').html(val);
   $('#'+this.id+' div.slider').attr('old_value', val);
}

Widget_Zraszacz = function() {}
Widget_Zraszacz.prototype = new Widget();
Widget_Zraszacz.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Zraszacz.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Brama_Garazowa = function() {}
Widget_Brama_Garazowa.prototype = new Widget();
Widget_Brama_Garazowa.prototype.render = function() {
   html = '<p>Stan aktualny:<span class="slider_value"></span></p>';
   html += '<div class="slider"></div>';
   html += '<p style="padding-top: 20px">';
   html += '<a id="btn_'+this.id+'_ch_1_up" class="btn small secondary" style="width:auto">&uarr;</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_down" class="btn small secondary" style="width:auto">&darr;</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_stop" class="btn small secondary" style="width:auto">Stop</a>';
   html += '</p>';
   var val = this.status['ch_1'];
   if (!val) { val=0; }
   _this = this;
   $('#'+this.id+' div.dynamic').html(html);
   $('#'+this.id+' div.slider').slider({
      value: val,
      min: 0,
      max: 255,
      step: 5,
   });
   $('#'+this.id+' div.dynamic').addClass('small');
   $('#'+this.id+' div.slider').slider('disable');
   $('#'+this.id+' div.slider').attr('rel', this.id);
   $('#'+this.id+' div.slider').attr('old_value', val);
   $('#btn_'+this.id+'_ch_1_up').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'up' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });   
   $('#btn_'+this.id+'_ch_1_down').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'down' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });   
   $('#btn_'+this.id+'_ch_1_stop').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'stop' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });      
   this.redraw();
};
Widget_Brama_Garazowa.prototype.redraw = function() {
   var old_value = $('#'+this.id+' div.slider').attr('old_value');
   var val = this.status['ch_1'];
   if (!val) { val=0; }
   if (old_value == val) {
      if (val == 0) {
         $('#'+this.id+' div.img').addClass('off').removeClass('on').removeClass('down').removeClass('up');
      } else {
         $('#'+this.id+' div.img').addClass('on').removeClass('off').removeClass('down').removeClass('up');      
      }
   } else if (old_value<val) {
      $('#'+this.id+' div.img').addClass('up').removeClass('off').removeClass('down').removeClass('on');      
   } else if (old_value>val) {
      $('#'+this.id+' div.img').addClass('down').removeClass('off').removeClass('on').removeClass('up');      
   }
   $('#'+this.id+' .slider_value').html(val);
   $('#'+this.id+' div.slider').attr('old_value', val);
}

Widget_Brama_Skrzydlowa = function() {}
Widget_Brama_Skrzydlowa.prototype = new Widget();
Widget_Brama_Skrzydlowa.prototype.render = function() {
   html = '<p>Stan aktualny:<span class="slider_value"></span></p>';
   html += '<div class="slider"></div>';
   html += '<p style="padding-top: 20px">';
   html += '<a id="btn_'+this.id+'_ch_1_up" class="btn small secondary" style="width:auto">&uarr;</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_down" class="btn small secondary" style="width:auto">&darr;</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_stop" class="btn small secondary" style="width:auto">Stop</a>';
   html += '</p>';
   var val = this.status['ch_1'];
   if (!val) { val=0; }
   _this = this;
   $('#'+this.id+' div.dynamic').html(html);
   $('#'+this.id+' div.slider').slider({
      value: val,
      min: 0,
      max: 255,
      step: 5,
   });
   $('#'+this.id+' div.dynamic').addClass('small');
   $('#'+this.id+' div.slider').slider('disable');
   $('#'+this.id+' div.slider').attr('rel', this.id);
   $('#'+this.id+' div.slider').attr('old_value', val);
   $('#btn_'+this.id+'_ch_1_up').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'up' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });   
   $('#btn_'+this.id+'_ch_1_down').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'down' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });   
   $('#btn_'+this.id+'_ch_1_stop').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'stop' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });      
   this.redraw();
};
Widget_Brama_Skrzydlowa.prototype.redraw = function() {
   var old_value = $('#'+this.id+' div.slider').attr('old_value');
   var val = this.status['ch_1'];
   if (!val) { val=0; }
   if (old_value == val) {
      if (val == 0) {
         $('#'+this.id+' div.img').addClass('off').removeClass('on').removeClass('down').removeClass('up');
      } else {
         $('#'+this.id+' div.img').addClass('on').removeClass('off').removeClass('down').removeClass('up');      
      }
   } else if (old_value<val) {
      $('#'+this.id+' div.img').addClass('up').removeClass('off').removeClass('down').removeClass('on');      
   } else if (old_value>val) {
      $('#'+this.id+' div.img').addClass('down').removeClass('off').removeClass('on').removeClass('up');      
   }
   $('#'+this.id+' .slider_value').html(val);
   $('#'+this.id+' div.slider').attr('old_value', val);
}

Widget_Brama_Suwana = function() {}
Widget_Brama_Suwana.prototype = new Widget();
Widget_Brama_Suwana.prototype.render = function() {
   html = '<p>Stan aktualny:<span class="slider_value"></span></p>';
   html += '<div class="slider"></div>';
   html += '<p style="padding-top: 20px">';
   html += '<a id="btn_'+this.id+'_ch_1_up" class="btn small secondary" style="width:auto">&uarr;</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_down" class="btn small secondary" style="width:auto">&darr;</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_stop" class="btn small secondary" style="width:auto">Stop</a>';
   html += '</p>';
   var val = this.status['ch_1'];
   if (!val) { val=0; }
   _this = this;
   $('#'+this.id+' div.dynamic').html(html);
   $('#'+this.id+' div.slider').slider({
      value: val,
      min: 0,
      max: 255,
      step: 5,
   });
   $('#'+this.id+' div.dynamic').addClass('small');
   $('#'+this.id+' div.slider').slider('disable');
   $('#'+this.id+' div.slider').attr('rel', this.id);
   $('#'+this.id+' div.slider').attr('old_value', val);
   $('#btn_'+this.id+'_ch_1_up').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'up' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });   
   $('#btn_'+this.id+'_ch_1_down').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'down' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });   
   $('#btn_'+this.id+'_ch_1_stop').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, direction: 'stop' },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });      
   this.redraw();
};
Widget_Brama_Suwana.prototype.redraw = function() {
   var old_value = $('#'+this.id+' div.slider').attr('old_value');
   var val = this.status['ch_1'];
   if (!val) { val=0; }
   if (old_value == val) {
      if (val == 0) {
         $('#'+this.id+' div.img').addClass('off').removeClass('on').removeClass('down').removeClass('up');
      } else {
         $('#'+this.id+' div.img').addClass('on').removeClass('off').removeClass('down').removeClass('up');      
      }
   } else if (old_value<val) {
      $('#'+this.id+' div.img').addClass('up').removeClass('off').removeClass('down').removeClass('on');      
   } else if (old_value>val) {
      $('#'+this.id+' div.img').addClass('down').removeClass('off').removeClass('on').removeClass('up');      
   }
   $('#'+this.id+' .slider_value').html(val);
   $('#'+this.id+' div.slider').attr('old_value', val);
}

Widget_Wlacznik_1 = function() {}
Widget_Wlacznik_1.prototype = new Widget();
Widget_Wlacznik_1.prototype.render = function() {
   html = '<p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a>';
   html += '</p><p>';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Wlacznik_1.prototype.redraw = function() {
   $('#' + this.id + ' div.dynamic').addClass('small');
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Wlacznik_2 = function() {}
Widget_Wlacznik_2.prototype = new Widget();
Widget_Wlacznik_2.prototype.render = function() {
   html = '<p style="margin: 0;">Lewy &nbsp; Prawy</p><p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_2_on" class="btn small">On</a>';
   html += '</p><p>';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a> '; 
   html += '<a id="btn_'+this.id+'_ch_2_off" class="btn small">Off</a>'; 
   html += '</p>';
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_2_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 2, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_2_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 2, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Wlacznik_2.prototype.redraw = function() {
   $('#' + this.id + ' div.dynamic').addClass('small');
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('ch1_on').removeClass('ch1_off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('ch1_off').removeClass('ch1_on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
   if (this.status['ch_2'] == '255') {
       $('#'+this.id+' div.img').addClass('ch2_on').removeClass('ch2_off');
       $('#btn_'+this.id+"_ch_2_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_2_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('ch2_off').removeClass('ch2_on');
       $('#btn_'+this.id+"_ch_2_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_2_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Wlacznik_3 = function() {}
Widget_Wlacznik_3.prototype = new Widget();
Widget_Wlacznik_3.prototype.render = function() {
   html = '<p style="margin: 0;">Lewy &nbsp; &nbsp; Środek &nbsp; &nbsp; Prawy</p><p>';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_2_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_3_on" class="btn small">On</a>';
   html += '</p><p>';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a> '; 
   html += '<a id="btn_'+this.id+'_ch_2_off" class="btn small">Off</a> '; 
   html += '<a id="btn_'+this.id+'_ch_3_off" class="btn small">Off</a>'; 
   html += '</p>';
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_2_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 2, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_2_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 2, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_3_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 3, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_3_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 3, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Wlacznik_3.prototype.redraw = function() {
   $('#' + this.id + ' div.dynamic').addClass('small');
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('ch1_on').removeClass('ch1_off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('ch1_off').removeClass('ch1_on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
   if (this.status['ch_2'] == '255') {
       $('#'+this.id+' div.img').addClass('ch2_on').removeClass('ch2_off');
       $('#btn_'+this.id+"_ch_2_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_2_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('ch2_off').removeClass('ch2_on');
       $('#btn_'+this.id+"_ch_2_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_2_off").addClass('primary').removeClass('secondary');       
   }
   if (this.status['ch_3'] == '255') {
       $('#'+this.id+' div.img').addClass('ch3_on').removeClass('ch3_off');
       $('#btn_'+this.id+"_ch_3_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_3_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('ch3_off').removeClass('ch3_on');
       $('#btn_'+this.id+"_ch_3_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_3_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Wlacznik_regulowany = function() {}
Widget_Wlacznik_regulowany.prototype = new Widget();
Widget_Wlacznik_regulowany.prototype.render = function() {
   html = '<p>Stan aktualny:<span class="slider_value"></span></p>';
   html += '<div class="slider"></div>';
   var val = this.status['ch_1'];
   if (!val) { val=0; }
   _this = this;
   $('#'+this.id+' div.dynamic').html(html);
   $('#'+this.id+' div.slider').slider({
      value: val,
      min: 0,
      max: 255,
      step: 5,
      start: function(event, ui) {
         var id = $(this).attr('rel');
         $(this).attr('old_value', $('#'+id+' div.slider').slider('value'));
      },
      stop: function(event, ui) {
         var id = $(this).attr('rel');
         var new_value = $('#'+id+' div.slider').slider('value');
         var old_value = $(this).attr('old_value');
         if (old_value != new_value) {
           $.ajax({
               url: _this.url,
               type: 'PUT',
               data: { channel: 1, status: new_value },
               success: function(obj) {
                   if (obj.error) {
                        $.msgAlert({
                              type: 'error',
                              title: 'Wysłanie rozkazu do magistrali',
                              text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                        });
                   }
               },
               error: function() {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }           
           });
         }
      
      },
      change: function(event, ui) {
         var id = $(this).attr('rel');
         var _value = $('#'+id+' span.slider_value'); ;
         _value.html($('#'+id+' div.slider').slider('value')); 
      }
   });
   $('#'+this.id+' div.slider').attr('rel', this.id);
   this.redraw();
};
Widget_Wlacznik_regulowany.prototype.redraw = function() {
    var val = this.status['ch_1'];
    if (!val) { val=0; }
    if (val == 0) {
       $('#'+this.id+' div.img').addClass('off').removeClass('on').removeClass('down').removeClass('up');
    } else if(val == 255) {
       $('#'+this.id+' div.img').addClass('on').removeClass('off').removeClass('down').removeClass('up');    
    } else {
       if (old_value < val) {
          $('#'+this.id+' div.img').addClass('up').removeClass('off').removeClass('down').removeClass('on');    
       } else {
          $('#'+this.id+' div.img').addClass('down').removeClass('off').removeClass('up').removeClass('on');    
       }
    }
    $('#'+this.id+' div.slider').slider({value: val});
    $('#'+this.id+' .slider_value').html(val);
};

Widget_Czujnik_ruchu = function() {}
Widget_Czujnik_ruchu.prototype = new Widget();
Widget_Czujnik_ruchu.prototype.render = function() {
   html = '<p>';
   html += 'Czujnik: ';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Czujnik_ruchu.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Czujnik_dymu = function() {}
Widget_Czujnik_dymu.prototype = new Widget();
Widget_Czujnik_dymu.prototype.render = function() {
   html = '<p>';
   html += 'Czujnik: ';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Czujnik_dymu.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Czujnik_gazu = function() {}
Widget_Czujnik_gazu.prototype = new Widget();
Widget_Czujnik_gazu.prototype.render = function() {
   html = '<p>';
   html += 'Czujnik: ';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Czujnik_gazu.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Czujnik_zalania = function() {}
Widget_Czujnik_zalania.prototype = new Widget();
Widget_Czujnik_zalania.prototype.render = function() {
   html = '<p>';
   html += 'Czujnik: ';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               this.update();
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                this.update();
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Czujnik_zalania.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Czujnik_temperatury = function() {}
Widget_Czujnik_temperatury.prototype = new Widget();
Widget_Czujnik_temperatury.prototype.render = function() {
   html = '<p>';
   html += 'Czujnik: ';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Czujnik_temperatury.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Alarm_centrala = function() {}
Widget_Alarm_centrala.prototype = new Widget();
Widget_Alarm_centrala.prototype.render = function() {
   html = '<p>';
   html += 'Alarm: ';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Alarm_centrala.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Alarm_manipulator = function() {}
Widget_Alarm_manipulator.prototype = new Widget();
Widget_Alarm_manipulator.prototype.render = function() {
   html = '<p>';
   html += 'Alarm: ';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Alarm_manipulator.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Czytnik_kart = function() {}
Widget_Czytnik_kart.prototype = new Widget();
Widget_Czytnik_kart.prototype.render = function() {
   html = '<p>';
   html += 'Alarm: ';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Czytnik_kart.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}

Widget_Odbiornik_podczerwieni = function() {}
Widget_Odbiornik_podczerwieni.prototype = new Widget();
Widget_Odbiornik_podczerwieni.prototype.render = function() {
   html = '<p>';
   html += 'Pilot: ';
   html += '<a id="btn_'+this.id+'_ch_1_on" class="btn small">On</a> ';
   html += '<a id="btn_'+this.id+'_ch_1_off" class="btn small">Off</a>';
   html += '</p>'; 
   $('#'+this.id+' div.dynamic').html(html);
   var _this = this;
   $('#btn_'+this.id+'_ch_1_on').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 255 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   $('#btn_'+this.id+'_ch_1_off').click(function() {
       $.ajax({
           url: _this.url,
           type: 'PUT',
           data: { channel: 1, status: 0 },
           success: function(obj) {
               if (obj.error) {
                    $.msgAlert({
                          type: 'error',
                          title: 'Wysłanie rozkazu do magistrali',
                          text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                    });
               }
           },
           error: function() {
                $.msgAlert({
                      type: 'error',
                      title: 'Wysłanie rozkazu do magistrali',
                      text: 'Niestety nie udało się połączyć z serwerem. Proszę spróbować póżniej.',
                });
           }           
       });
       return false;
   });
   this.redraw();
};
Widget_Odbiornik_podczerwieni.prototype.redraw = function() {
   if (this.status['ch_1'] == '255') {
       $('#'+this.id+' div.img').addClass('on').removeClass('off');
       $('#btn_'+this.id+"_ch_1_on").addClass('primary').removeClass('secondary');
       $('#btn_'+this.id+"_ch_1_off").addClass('secondary').removeClass('primary');
   } else {
       $('#'+this.id+' div.img').addClass('off').removeClass('on');
       $('#btn_'+this.id+"_ch_1_on").addClass('secondary').removeClass('primary');
       $('#btn_'+this.id+"_ch_1_off").addClass('primary').removeClass('secondary');       
   }
}