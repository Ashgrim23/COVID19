import axios from "axios";
import entJson from "./entidades.json";
import VueMeta from "vue-meta";

import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import Card from "./componentes/Card.vue";
import hstChart from "./componentes/hstChart.vue";

axios.defaults.baseURL = "http://127.0.0.1:3000";
Vue.use(Vuetify);
Vue.use(VueMeta);

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];
const smallMmeses = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic"
];

export default {
  created() {
    document.title = "Información referente a casos COVID-19 en México";
  },
  name: "app",
  vuetify: new Vuetify(),
  components: {
    Card,
    hstChart
  },
  metaInfo: function() {
    return {
      title: "Información referente a casos COVID-19 en México",
      meta: [
        { name: "description", content: "Información COVID-19 México" },
        {
          name: "keywords",
          content:
            "COVID-19,COVID19,México,Mexico,Estados,Entidades,tracker,rastreador"
        },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { "http-equiv": "X-UA-Compatible", content: "ie=edge" }
      ]
    };
  },
  data() {
    return {
      dataDef: {
        HOMBRES: 0,
        MUJERES: 0,
        EDADPROM: 0,
        TITULO: "",
        DESCRIP: "",
        CLASS: ""
      },
      dataActivos: {
        HOMBRES: 0,
        MUJERES: 0,
        EDADPROM: 0,
        TITULO: "",
        DESCRIP: "",
        CLASS: ""
      },
      dataConf: {
        HOMBRES: 0,
        MUJERES: 0,
        EDADPROM: 0,
        TITULO: "",
        DESCRIP: "",
        CLASS: ""
      },
      dataNeg: {
        HOMBRES: 0,
        MUJERES: 0,
        EDADPROM: 0,
        TITULO: "",
        DESCRIP: "",
        CLASS: ""
      },
      dataSos: {
        HOMBRES: 0,
        MUJERES: 0,
        EDADPROM: 0,
        TITULO: "",
        DESCRIP: "",
        CLASS: ""
      },
      dataTot: {
        HOMBRES: 0,
        MUJERES: 0,
        EDADPROM: 0,
        TITULO: "",
        DESCRIP: "",
        CLASS: ""
      },
      datos: null,
      items: entJson,
      ultactual: null,
      entidad: 0,
      entData: {
        type: Object
      },
      confData: {
        type: Object
      },
      defData: {
        type: Object
      },
      chartOpt: {
        title: {
          display: true,
          text: null,
          fontFamily: "'DejaVu Serif'",
          fontSize: 16
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      },
      entOpt: {
        title: {
          display: true,
          text: null,
          fontFamily: "'DejaVu Serif'",
          fontSize: 16
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    this.getInitData();
  },
  methods: {
    async getEntData() {
      try {
        let acumulados = axios.get("/api/v1/entidades/" + this.entidad
        );
        let serieConfirmados = axios.get("/api/v1/series/confirmados/" + this.entidad
        );
        let serieDefunciones = axios.get("/api/v1/series/defunciones/" + this.entidad
        );
        var entHost;
        if (this.entidad == 0) {
          entHost = "/api/v1/series/estados";
        } else {
          entHost ="/api/v1/series/municipios/" + this.entidad;
        }
        let serieEntidades = axios.get(entHost);

        const [
          acumResp,
          serieConfResp,
          serieDefResp,
          serieEntResp
        ] = await Promise.all([
          acumulados,
          serieConfirmados,
          serieDefunciones,
          serieEntidades
        ]);

        //ACUMULADOS
        // CONFIRMADOS
        this.dataConf.HOMBRES = acumResp.data[0].CONFIRMADOS_H;
        this.dataConf.MUJERES = acumResp.data[0].CONFIRMADOS_M;
        this.dataConf.EDADPROM = acumResp.data[0].CONFIRMADOS_EDAD;
        this.dataConf.TITULO = "Confirmados";
        this.dataConf.DESCRIP =
          "Total acumulado de casos infectados por COVID-19.";
        this.dataConf.CLASS = "infec";
        //DEFUNCIONES
        this.dataDef.HOMBRES = acumResp.data[0].DEFUNCIONES_H;
        this.dataDef.MUJERES = acumResp.data[0].DEFUNCIONES_M;
        this.dataDef.EDADPROM = acumResp.data[0].DEFUNCIONES_EDAD;
        this.dataDef.TITULO = "Defunciones";
        this.dataDef.DESCRIP = "Total de defunciones por COVID-19.";
        this.dataDef.CLASS = "def";
        //ACTIVOS
        this.dataActivos.HOMBRES = acumResp.data[0].CONFACTIVOS_H;
        this.dataActivos.MUJERES = acumResp.data[0].CONFACTIVOS_M;
        this.dataActivos.EDADPROM = acumResp.data[0].CONFACTIVOS_EDAD;
        this.dataActivos.TITULO = "Activos";
        this.dataActivos.DESCRIP =
          "Total de infectados por COVID-19 en los ultimos 14 dias.";
        this.dataActivos.CLASS = "activos";
        //NEGATIVOS
        this.dataNeg.HOMBRES = acumResp.data[0].NEGATIVOS_H;
        this.dataNeg.MUJERES = acumResp.data[0].NEGATIVOS_M;
        this.dataNeg.EDADPROM = acumResp.data[0].NEGATIVOS_EDAD;
        this.dataNeg.TITULO = "Negativos";
        this.dataNeg.DESCRIP =
          "Total acumulado de casos con resultado negativo en la prueba de COVID-19.";
        this.dataNeg.CLASS = "neg";
        //SOSPECHOSOS
        this.dataSos.HOMBRES = acumResp.data[0].SOSPECHOSOS_H;
        this.dataSos.MUJERES = acumResp.data[0].SOSPECHOSOS_M;
        this.dataSos.EDADPROM = acumResp.data[0].SOSPECHOSOS_EDAD;
        this.dataSos.TITULO = "Sospechosos";
        this.dataSos.DESCRIP =
          "Total acumulado de posbiles contagios nuevos de COVID-19.";
        this.dataSos.CLASS = "sosp";
        //TOTAL
        this.dataTot.HOMBRES = acumResp.data[0].PERSONAS_H;
        this.dataTot.MUJERES = acumResp.data[0].PERSONAS_M;
        this.dataTot.EDADPROM = acumResp.data[0].PERSONAS_EDAD;
        this.dataTot.TITULO = "Personas Estudiadas";
        this.dataTot.DESCRIP =
          "Total de personas analizadas (Infectados+Sospechosos+Negativos).";
        this.dataTot.CLASS = "tot";

        //SERIE CONFIRMADOS
        let fechas = [];
        let totales = [];
        let sospechosos = [];
        serieConfResp.data.forEach(e => {
          const myDate = new Date(e.FECHA);
          const label = myDate.getDate() + " " + smallMmeses[myDate.getMonth()];
          fechas.push(label);
          totales.push(e.CONFIRMADOS);
          sospechosos.push(e.SOSPECHOSOS);
        });
        this.confData = {
          labels: fechas,
          datasets: [
            {
              label: "Confirmados",
              data: totales,
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              barThickness: "flex"
            },
            {
              label: "Sospechosos",
              data: sospechosos,
              backgroundColor: "rgba(255, 255, 0, 0.5)",
              barThickness: "flex"
            }
          ]
        };

        //SERIE DEFUNCIONES
        fechas = [];
        totales = [];
        sospechosos = [];
        serieDefResp.data.forEach(e => {
          const myDate = new Date(e.FECHA);
          const label = myDate.getDate() + " " + smallMmeses[myDate.getMonth()];
          fechas.push(label);
          totales.push(e.DEFUNCIONES);
          sospechosos.push(e.DEFSOSP);
        });
        this.defData = {
          labels: fechas,
          datasets: [
            {
              label: "Defunciones",
              data: totales,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              barThickness: "flex"
            },
            {
              label: "Sospechosos",
              data: sospechosos,
              backgroundColor: "rgba(255, 255, 0, 0.5)",
              barThickness: "flex"
            }
          ]
        };

        //SERIE ENTIDADES
        const ents = [];
        totales = [];
        serieEntResp.data.forEach(e => {
          ents.push(e.Nombre);
          totales.push(e.Confirmados);
        });
        this.entData = {
          labels: ents,
          datasets: [
            {
              label: "Confirmados",
              data: totales,
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              barThickness: "flex"
            }
          ]
        };
      } catch (error) {
        console.log(error);
      }
    },
    async getInitData() {
      this.getEntData();
      try {        
        let res = await axios.get("/api/v1/ultUpdate");
        const anio = res.data[0].FECHA.substring(0, 4);
        const mes = parseInt(res.data[0].FECHA.substring(5, 7));
        const dia = res.data[0].FECHA.substring(8, 10);
        this.ultactual = dia + " de " + meses[mes - 1] + " del " + anio;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
