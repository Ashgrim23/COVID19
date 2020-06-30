<template>
  <v-container>
    <v-row dense class="header">
      <v-col cols="12" md="8" >
        <span>
          <h2>Información referente a casos COVID-19 en México</h2>
        </span>        
        <span>
          Ultima actualización
          <i>{{ultactual}}</i>
        </span>
      </v-col>
      
      <v-col cols="12" md="4" data-app>
      <hr class="hidden-sm-and-up">
        <v-select
          :items="items"
          item-text="NOMBRE"
          item-value="ID_ENT"
          v-model="entidad"
          :disable-lookup=true
          v-on:input="getEntData"
          label="Entidad"
        ></v-select>
      </v-col>
    </v-row>

    <v-row dense >
      <v-col cols="12" sm="6" md="4">
        <Card v-if="dataConf" :datos="dataConf"/>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <Card v-if="dataDef" :datos="dataDef"/>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <Card v-if="dataActivos" :datos="dataActivos"/>
      </v-col>
         <v-col cols="12" sm="6" md="4">
        <Card v-if="dataNeg" :datos="dataNeg"/>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <Card v-if="dataSos" :datos="dataSos"/>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <Card v-if="dataTot" :datos="dataTot"/>
      </v-col>
    </v-row>

   

    <v-row  v-if="confData">
      <v-col>
        <hstChart :chartData="confData" :options="chartOpt" 
          chartTitle="Casos sospechosos y confirmados por fecha de inicio de síntomas" />        
      </v-col>      
    </v-row>

     <v-row  v-if="defData">
      <v-col>
        <hstChart :chartData="defData" :options="chartOpt" 
          chartTitle="Defunciones acumuladas por fecha de defunción"/>
      </v-col>
    </v-row>    

    <v-row v-if="entData">
      <v-col>
        <hstChart :chartData="entData" :options="entOpt" 
          chartTitle="Casos confirmados por entidad"/>
      </v-col>
    </v-row>
   
  </v-container>
</template>

<script src='./app.js'></script>

<style scoped>
</style>