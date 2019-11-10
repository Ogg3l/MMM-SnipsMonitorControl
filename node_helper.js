/* Magic Mirror
 * Node Helper: {{MMM-SnipMonitorControl}}
 *
 * By {{Markus Mohr}}
 * 
 */

var NodeHelper = require("node_helper");
const {PythonShell} = require('python-shell');

var pyShelloptions = {
    mode: 'text',
    scriptPath: '/home/pi/MagicMirror/modules/MMM-SnipsMonitorControl/Skripts',
};

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
			

			
			//If Script is defined
			if(payload.startsWith("SCRIPT")){
					console.log("Powering Off Monitor per Script...");
				
					script = payload.substring(7)
					
					PythonShell.run(script, pyShelloptions, function (err, results) {
					if (err) throw err;
						// results is an array consisting of messages collected during execution
						console.log('results: %j', results);
					});
			}
		
			
			//Else make command
			else{
				console.log("Powering Off Monitor per Command...");
				exec(payload, function(error, stdout, stderr) {
					if (error) {
						console.log("Could not power off Monitor. Error Code: " + error.code);
					}
				});

			}
		}
		
		else if (notification == "MONITOR_ON"){
			
			//If Script is defined
			if(payload.startsWith("SCRIPT")){
					console.log("Powering On Monitor per Script...");
				
					script = payload.substring(7)
					
					PythonShell.run(script, pyShelloptions, function (err, results) {
					if (err) throw err;
						// results is an array consisting of messages collected during execution
						console.log('results: %j', results);
					});
			}
			
			
			//Else make command
			else{
				console.log("Powering On Monitor per Command...");
				exec(payload, function(error, stdout, stderr) {
					if (error) {
						console.log(error.code);
					}
				});
			}
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

	
});

