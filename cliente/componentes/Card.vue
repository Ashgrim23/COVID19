<template>
   <v-card  class="card" :class="datos.CLASS">
            <v-card-title class="cardTitle" >{{datos.TITULO}}</v-card-title>
            <v-row dense no-gutters >
              <v-col   cols="7">
                <v-card-text>
                  <div class="iCountUp">                    
                    <ICountUp                      
                      :endVal="datos.HOMBRES+datos.MUJERES"
                      :options="options"
                      :callback="onReady"
                    />
                  </div>
                </v-card-text>
                <v-card-text>
                  <span>Edad Prom.</span>
                  <ICountUp
                    class="iCountUpEdad"
                    :endVal="datos.EDADPROM"
                    :options="options"
                    :callback="onReady"
                  />
                </v-card-text>
              </v-col>
              <v-col  cols="5">
                <DonaChart :width=120 :height=95 :hombres="datos.HOMBRES" :mujeres="datos.MUJERES"/>
              </v-col>
            </v-row>
            <v-card-text>{{datos.DESCRIP}}</v-card-text>
          </v-card>
</template>

<script src='./Card.js'></script>

<style scoped>
.cardTitle {
  padding-bottom: 0;
}

.iCountUp {
  font-size: 2.5em;
  margin: 0;
  color: #4d63bc;
}

.card {
  margin: 0 2% !important;
  height: 100%;
}

.row {
  margin-top: 1% !important;
}

.infec {
  border-bottom: 10px solid rgba(255, 0, 0, 0.5);
}

.def {
  border-bottom: 10px solid rgb(0, 0, 0, 0.5);
}
.activos {
  border-bottom: 10px solid rgb(0, 0, 255, 0.5);
}

.sosp {
  border-bottom: 10px solid rgb(255, 230, 0, 0.5);
}

.tot {
  border-bottom: 10px solid rgba(85, 27, 4, 0.5);
}

.neg {
  border-bottom: 10px solid rgba(0, 255, 0, 0.5);
}

.test {
  border-bottom: 10px solid rgba(0, 255, 0, 0.5);
}
</style>
