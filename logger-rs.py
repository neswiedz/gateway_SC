# python3

import sys
import os
import time
import datetime
import serial
import binascii

#port_CAN = '/dev/ttyUSB0'
port_CAN = 'COM11'
port_CAN_baudrate = 115200
#log_path = '/media/flash-log/'
log_path = 'log'
file_extension = ".txt"
number_of_read_atempt = 50
time_of_file_closing = dict(hour=22, minutes=15, seconds=00, miliseconds=999999)
#time_of_file_closing = dict(hour=23, minutes=59, seconds=59, miliseconds=999999)


def open_file(subfolder):
    start_time = datetime.datetime.today()
    log_name = start_time.strftime("%Y-%m-%d_%H-%M-%S") + file_extension
    path = os.path.join(os.getcwd(),subfolder)
    if not ((os.path.isdir(path))):
        #print("folder nie istnieje")
        os.mkdir(path)
    log_file = open(os.path.join(os.getcwd(),path, log_name), 'a')
    return (log_file)

def init_serial(port, baudrate):
    try:
        ser = serial.Serial(port, baudrate,
                                bytesize=serial.EIGHTBITS,
                                parity=serial.PARITY_NONE,
                                stopbits=serial.STOPBITS_ONE
        )
        ser.close()
        ser.open()

    except (OSError, serial.SerialException):
        sys.stderr.write("Port {} don't work".format(ser.name))
        sys.exit(0)  #need to import sys, otherwise ask if kill program

    return ser

def main_loop(CAN_port, time_end, log_file):
    buffer_string=0
    while (datetime.datetime.today()<time_end):
        n = CAN_port.inWaiting()
        if n != 0:
            buffer_string = CAN_port.read(n)
            temp = str(binascii.hexlify(buffer_string))[2:-1]  #cut "b'" at the begining and "'" at the end
            # command "1100AF" is display as "b'1100AF'"
            pretty_text = ''
            i = 0
            for c in temp:
                if i % 2 == 0:
                    pretty_text = pretty_text + c
                else:
                    pretty_text = pretty_text + c + " "
                i = i + 1
            print(pretty_text)
            log_file.write(time.asctime() + ": " + pretty_text + "\n")
    log_file.close()
    CAN_port.close()
    print("Port {}->CAN is closed.".format(CAN_port.name))

#MAIN APP
print("Start")
file = open_file(log_path)
print("Log will be write into: {}".format(file.name))
start_time = datetime.datetime.today()
work_until = datetime.datetime(start_time.year, start_time.month, start_time.day, \
                             time_of_file_closing['hour'], time_of_file_closing['minutes'], \
                             time_of_file_closing['seconds'], time_of_file_closing['miliseconds'])
print("Work will be terminated at: {}".format(work_until))
ser_CAN = init_serial(port_CAN, port_CAN_baudrate)
print("Port {}->CAN is opened sucessfully.".format(ser_CAN.name))
main_loop(ser_CAN, work_until, file)
print("Finished")

#--------------------------------------
#TODO
#--------------------------------------
#zapis danych co n minut

#--------------------------------------
#DONE
#--------------------------------------
#zamykanie pliku o polnocy

#--------------------------------------	
#KNOW-HOW: wyswietlanie daty i godziny
#--------------------------------------
#temp_dzis = datetime.datetime.today()
#print("data: {}".format(temp_dzis.strftime("%d-%m-%Y")))
#-
#print("test {}".format(datetime.datetime.today().year))
#-	
#teraz = datetime.datetime.today()
#rok = teraz.year
#godzina = teraz.hour
#minuty = teraz.minute
#--------------------------------------