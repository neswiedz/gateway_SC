__author__ = 'maciek'


import serial
import sys

port = 'COM5'#'/dev/ttyUSB0'#'COM5'#'/dev/ttyS1'
baudrate = '19200'

ser = serial.Serial()
ser.port = port
ser.baudrate = baudrate
#ser.bytesize = 8

ser.databits = 8
ser.parity = 'N'
ser.rtscts = False  #python3 =None
ser.xonxoff = False #python3 =None
ser.timeout = 1

sys.stderr.write("\n------------------------------\n")
sys.stderr.write("ALARM-CAN GATEWAY v.0.1\n")
sys.stderr.write("SERIAL : %s %s,%s,%s,%s\n" % (ser.portstr, ser.baudrate, ser.databits, ser.parity, ser.timeout))
sys.stderr.write("------------------------------\n")

ser.close()
#ser.open()
ser.write("test\n")
ser.close()
