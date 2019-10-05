
Module.register("MMM-SnipsMonitorControl", {

  
  
  
  defaults: {
    monitorOnCommand : 'tvservice --preferred && sudo chvt 6 && sudo chvt 7',
    monitorOffCommand: 'tvservice -o',
    monitorStatusCommand : 'tvservice --status',
    raspberryOffCommand : "sleep 5;shutdown -h 0"
  },



  start() {
    Log.info("Starting module: " + this.name);
    this.loaded = true;
  },


  /**
   * @function notificationReceived
   * @description Handles incoming broadcasts from other modules or the MagicMirror core.
   * @override
   *
   * @param {string} notification - Notification name
   * @param {*} payload - Detailed payload of the notification.
   */
  notificationReceived: function(notification, payload, sender){
    const topic = "external/MagicMirror2/VoiceControl";
    //Log.info("MMM-SnipsMonitorControl Received from: " + sender + " Notification: " + notification)
    if(notification == topic){
      var payload_json = JSON.parse(payload)
      var device = payload_json['device'];
      var device = payload_json['device'];
      var power_action = payload_json['power'];

      
      if(device == "monitor"){
          if(power_action == "an"){
            this.sendSocketNotification("MONITOR_ON",this.config.monitorOnCommand)
          }
          
          else if (power_action == "aus"){
            this.sendSocketNotification("MONITOR_OFF",this.config.monitorOffCommand)
            
          }
          
      }
      
      else if(device == "pi"){
          if(power_action == "an"){
            
          }
          
          else if(power_action == "aus"){
            this.sendSocketNotification("PI_OFF",this.config.raspberryOffCommand)
          }
      }
    }
  }
});

