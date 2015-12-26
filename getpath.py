__author__ = 'neswiedz'

import os

print("----------")

print("1 " + os.path.realpath(__file__))                    # \path\file
print("2 " + os.getcwd())                                   # \path\
print("3 " + __file__)                                      # /path/file
print("4 " + os.path.dirname(__file__))                     # /path/
print("5 "+ os.path.split(os.path.realpath(__file__))[0])   # \path\
print("6 "+ os.path.split(os.path.realpath(__file__))[1])   # file

'''
1 C:\Dysk_sync\Projekt-d\d-SVN\SOFTWARE\GATEWAY_SATEL\getpath.py
2 C:\Dysk_sync\Projekt-d\d-SVN\SOFTWARE\GATEWAY_SATEL
3 C:/Dysk_sync/Projekt-d/d-SVN/SOFTWARE/GATEWAY_SATEL/getpath.py
4 C:/Dysk_sync/Projekt-d/d-SVN/SOFTWARE/GATEWAY_SATEL
5 C:\Dysk_sync\Projekt-d\d-SVN\SOFTWARE\GATEWAY_SATEL
6 getpath.py
'''