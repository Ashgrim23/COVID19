import requests
import os
import zipfile
import bd


def downloadFile():
    url="http://187.191.75.115/gobmx/salud/datos_abiertos/datos_abiertos_covid19.zip"
    print("Descargando..")
    r=requests.get(url,allow_redirects=False)
    print("Archivo Descargado")
    if r:
        return unzipFile(r)
       

def unzipFile(request):
    open('file.zip','wb').write(request.content)        
    with zipfile.ZipFile("file.zip","r") as zip_ref:
        archivo=zip_ref.namelist()
        zip_ref.extractall("./")
    os.remove("file.zip")
    print("Archivo descompreso: "+archivo[0])
    os.rename(archivo[0],"data.csv")    
    
if __name__=='__main__':
    archivo=downloadFile()    
    bd.insertFile()
    bd.updateAcumulados()
    bd.updateAcumSeries()
    os.remove("data.csv")


    