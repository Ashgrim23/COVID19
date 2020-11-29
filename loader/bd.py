import  mysql.connector
import csv
import credentials



insertDataRow=( "INSERT INTO COVID.COVID19MX "
                "(FECHA,ID_REGISTRO,ORIGEN,SECTOR,ENTIDAD,SEXO,MPIO,FECHA_INGRESO,FECHA_SINTOMA,FECHA_DEF,EDAD,RESULTADO) "
                "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"                
              )

loadDataQry=("LOAD DATA  INFILE 'data.csv' INTO TABLE COVID.COVID19MX FIELDS TERMINATED BY ','"
              "ENCLOSED BY '\"' IGNORE 1 LINES "
              "(@col1,@col2,@col3,@col4,@col5,@col6,@col7,@col8,@col9,@col10,"
              "@col11,@col12,@col13,@col14,@col15,@col16,@col17,@col18,@col19,@col20,"
              "@col21,@col22,@col23,@col24,@col25,@col26,@col27,@col28,@col29,@col30,"
              "@col31,@col32,@col33,@col34,@col35,@col36,@col37,@col38,@col39,@col40)"
              "set FECHA=@col1,ID_REGISTRO=@col2,ORIGEN=@col3,SECTOR=@col4,ENTIDAD=@col8,"              
              "SEXO=@col6,MPIO=@col9,FECHA_INGRESO=@col11,FECHA_SINTOMA=@col12,FECHA_DEF=IF(@col13='9999-99-99',NULL,@col13),"
              "EDAD=@col16,RESULTADO=@col36"
            )

def loadFile():
  print("lodeando tabla")
  cnx=mysql.connector.connect(**credentials.config)
  cursor = cnx.cursor()
  cursor.execute("TRUNCATE TABLE COVID.COVID19MX;")
  cursor.execute(loadDataQry)
  cnx.commit()
  print("tabla lodeada")
  
  

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
  