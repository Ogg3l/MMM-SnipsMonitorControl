/* Magic Mirror
 * Node Helper: {{MMM-SnipMonitorControl}}
 *
 * By {{Markus Mohr}}
 * 
 */

var NodeHelper = require("node_helper");
const exec = require("child_process").exec;

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * notification: What to to (Monitor off or on)
	 * payload: command for monitor control
	 */
	socketNotificationReceived: function(notification, payload) {
		//console.log("Working notification system. Notification:", notification, "payload: ", payload);
		
		if(notification == "MONITOR_OFF"){
			console.log("Powering Off Monitor...")
			exec(payload, function(error, stdout, stderr) {
				if (error) {
					console.log(error.code);
				}
            });
		}
		
		else if (notification == "MONITOR_ON"){
			console.log("Powering On Monitor...")
			exec(payload, function(error, stdout, stderr) {
				if (error) {
					console.log(error.code);
				}
            });
			
		}
		
		else if (notification == "PI_OFF"){
			console.log("Powering Off Raspberry Pi...")
			exec(payload, function(error, stdout, stderr) {
				if (error) {
					console.log(error.code);
				}
            });
			
		}
		
		
		

      

	},

	
	/*
	// Example function send notification test
	sendNotificationTest: function(payload) {
		this.sendSocketNotification("{{MODULE_NAME}}-NOTIFICATION_TEST", payload);
	},

	// this you can create extra routes for your module
	extraRoutes: function() {
		var self = this;
		this.expressApp.get("/{{MODULE_NAME}}/extra_route", function(req, res) {
			// call another function
			values = self.anotherFunction();
			res.send(values);
		});
	},

	// Test another function
	anotherFunction: function() {
		return {date: new Date()};
	}
	*/
});

