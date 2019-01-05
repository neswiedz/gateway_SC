#!python2
import sys
import socket
import MySQLdb


def get_id_from_db(group_id, item_id):
    cursor = mysql.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("""SELECT id FROM device WHERE group_id = %s and item_id = %s""", (group_id, item_id))
    result_set = cursor.fetchall()
    for row in result_set:
        device_id = row["id"]
    return device_id

if __name__ == '__main__':

    spy = True

    net_port = 7777
    net_ip = '127.0.0.1'

    sql_host = 'localhost'
    sql_user = 'root'
    sql_pass = '1234'
    sql_db   = 'dom-bilcza'#sql_db   = 'domomatik'
    sql_port = 7770

    sys.stderr.write("\n\n\n------------------------------\n")
    sys.stderr.write("     test v.0.1\n")
    sys.stderr.write("NET    : localhost:%s %s\n" % (net_port, net_ip))
    sys.stderr.write("DB     : %s %s %s %s %s\n" % (sql_host, sql_user, sql_pass, sql_db, sql_port))
    sys.stderr.write("------------------------------\n")

    try:
        mysql = MySQLdb.connect(host = sql_host,port=sql_port, user = sql_user, passwd = sql_pass, db = sql_db)
    except MySQLdb.Error, e:
        sys.stderr.write("Could not open MySQL connection. Error %d: %s" % (e.args[0], e.args[1]))
        sys.exit(1)

    srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)   # aby zapobiec polaczeniu poki porpzednie polaczenie
                                                                # nie zostanie zamkniete
    srv.bind(('', net_port))
    srv.listen(1)

    while True:
        try:
            sys.stderr.write("Waiting for connection on %s %s...\n" % (net_port, net_ip))
            connection, addr = srv.accept()
            sys.stderr.write('Connected by %s\n' % (addr,))
            message = connection.recv(1024)
            print("Odebrana wiadomosc: \n" + message)
            dev_id = get_id_from_db(11,3)
            print(dev_id)
            if spy: sys.stdout.write('\n')
            sys.stderr.write('Disconnected\n')
            connection.close()
        except KeyboardInterrupt:
             break;
        except socket.error, msg:
             sys.stderr.write('ERROR %s\n' % msg)

    mysql.close()
    sys.stderr.write('\n--- exit ---\n')



