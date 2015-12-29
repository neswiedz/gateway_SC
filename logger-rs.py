#python3

import sys
import time
import serial
import binascii

port_CAN = '/dev/ttyUSB0'#'COM5'
port_CAN_baudrate = 115200
log_filename = '/home/pi/Python-testy/log.txt'
number_of_read_atempt = 10

def save_serial_data(port, baudrate, iterations, file_name):
	log_file = open(file_name,'w')
	try:
		ser_CAN = serial.Serial(port, baudrate,
			bytesize = serial.EIGHTBITS,
			parity = serial.PARITY_NONE,
			stopbits = serial.STOPBITS_ONE
			)
		ser_CAN.close()    
		ser_CAN.open()    
		print("Port {}->CAN is open.".format(ser_CAN.name))
	except (OSError, serial.SerialException):
		sys.stderr.write("Port {} don't work".format(ser_CAN.name))
		sys.exit(0)     #need to import sys, otherwise ask if kill program
	
	buffer_string = 0
	iter = 0
	while iter < iterations:
		n = ser_CAN.inWaiting()
		if n!=0:
			iter = iter + 1 
			buffer_string = ser_CAN.read(n)
			#print("typ {}".format(type(buffer_string)))
			#print("binascii.hexlify: {}".format(binascii.hexlify(buffer_string)))
			temp = str(binascii.hexlify(buffer_string))[2:-1] #cut "b'" at the begining and "'" at the end
			# command "1100AF" is display as "b'1100AF'"
			pretty_text_v2=''
			i = 0
			for c in temp:
				if i%2==0:
					pretty_text_v2 = pretty_text_v2 + c 
				else :
					pretty_text_v2 = pretty_text_v2 + c + " "
				i = i + 1
			print(pretty_text_v2)
			log_file.write(time.asctime() + ": " + pretty_text_v2 + "\n")
	log_file.close()
	ser_CAN.close()
	print("Port {}->CAN is close.".format(ser_CAN.name))
	
print("Start")
print("Use {} for RS-CAN purpose.".format(port_CAN))	
save_serial_data(port_CAN, port_CAN_baudrate, number_of_read_atempt, log_filename)
print("The End")
