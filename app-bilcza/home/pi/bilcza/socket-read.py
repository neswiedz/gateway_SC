#!python2
import sys
import socket

net_ip = ''                 # Symbolic name meaning all available interfaces
net_port = 7778              # Arbitrary non-privileged port
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((net_ip, net_port))
s.listen(1)
conn, addr = s.accept()
sys.stderr.write('Connected by ' + (str(addr)))
'''
#alternatywnie zamiast sys.stderr.write()
print 'Connected by', addr
sys.stdout.flush()
'''
while 1:
    data = conn.recv(1024)
    if not data:
        sys.stderr.write("\nNie odebrano zadnych danych")
        break
    conn.sendall(data+" dodatek")  #odeslanie odebranej paczki wraz z dodatkiem
    sys.stderr.write("\nOdebrane dane: " + data)
conn.close()