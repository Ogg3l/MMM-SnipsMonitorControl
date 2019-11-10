import os
import time

state_cmd = 'tvservice -s'
monitorPower_cmd = 'irsend SEND_ONCE vst56 KEY_POWER'

status_monitorOn ='state 0xa'
status_monitorOff = 'state 0x9'

#Tries
tries = 50

#start
i = 0

while True:
	
	#next try
	i = i +1
	
	os.system(monitorPower_cmd)
	
	os.system(state_cmd + '>monitorStatetmp')
	monitorState = open('monitorStatetmp','r').read()
	os.remove('monitorStatetmp')
	
	if(monitorState.startswith(status_monitorOff) or i == tries):
			print('BREAK')
			break

print('END')
		
