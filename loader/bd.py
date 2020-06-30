import  mysql.connector
import csv
import credentials



insertDataRow=( "INSERT INTO COVID.COVID19MX "
                "(FECHA,ID_REGISTRO,ORIGEN,SECTOR,ENTIDAD,SEXO,MPIO,FECHA_INGRESO,FECHA_SINTOMA,FECHA_DEF,EDAD,RESULTADO) "
                "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
              )


def insertFile():
    with open('data.csv') as csv_file:
      csv_reader=csv.reader(csv_file,delimiter=',')
      cnx=mysql.connector.connect(**credentials.config)
      cursor = cnx.cursor()
      cursor.execute("TRUNCATE TABLE COVID.COVID19MX;")
      cnx.commit()
      print("Tabla Truncada")
      linea=0
      print("Insertando datos..")
      for row in csv_reader:
          if linea>0:
            if (row[12]=='9999-99-99'):
              FECHA_DEF=None
            else:
              FECHA_DEF=row[12]
            datos=(row[0],row[1],row[2],row[3],row[7],row[5],row[8],
                  row[10] ,row[11],FECHA_DEF,
                  row[15],row[30])
            cursor.execute(insertDataRow, datos)
          linea+=1          
      cnx.commit()
      cursor.close()
      cnx.close()
      print(str(linea)+" Lineas Insertadas")
    

def updateAcumulados():
  cnx=mysql.connector.connect(**credentials.config)
  cursor=cnx.cursor()
  cursor.callproc('COVID.updateAcumulados',)
  cursor.close()
  cnx.close()
  print("Acumulados Actualizados")

def updateAcumSeries():
  cnx=mysql.connector.connect(**credentials.config)
  cursor=cnx.cursor()
  cursor.callproc('COVID.updateAcumSeries',)
  cursor.close()
  cnx.close()
  print("Series Actualizadas")
  