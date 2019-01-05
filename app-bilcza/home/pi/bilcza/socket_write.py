#!python2
import sys
import socket



net_port = 7778
net_ip = '127.0.0.1'

srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)   #aby zapobiec polaczeniu poki porpzednie polaczenie
                                                                # nie zostanie zamkniete
srv.connect((net_ip, net_port))
tekst='Hello world'
bytestekst=tekst.encode(encoding='UTF-8')
srv.sendall(bytestekst)
print('Wyslano')
sys.stdout.flush()
data=srv.recv(1024)
srv.close()
print(data)
print('\nKoniec')

