import ICountUp from 'vue-countup-v2';
import DonaChart from './DonaChart.vue'

export default {
    props:{
        datos:{
            type: Object,
            required: true
        }
    },
    components: {
        ICountUp,
        DonaChart
      },       
      data() {
        return {
          
          options: {
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.',
            prefix: '',
            suffix: ''
          }
        };
      },
      methods: {
        onReady: function(instance) {          
          instance.update(instance.endVal + 100);
        }
      }
     
}