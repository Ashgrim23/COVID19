python tool that downloads the CSV file from datos.gob.mx that contain daily information of the pandemic situation in mexico then parses, inserts and updates statistics in a MYSQL database.

cedentials.py should contain the database credentials

#cedentials.py config = { 'user': db_username, 'password': db_database, 'host': db_host,
'raise_on_warnings': True }
