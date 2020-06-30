<script>
import {Line } from "vue-chartjs"
export default {
    extends: Line,   
    
    props:{    
        chartTitle:null,        
        chartData:{
            type:Object
        },         
        options:{
            type: Object
        }
    },     
    watch:{
        chartData(){            
            this.render()
        }
    },
    methods:{
        render(){                 
            this.options.title.text=this.chartTitle                  
            this.renderChart(this.chartData,this.options)
        }
    },
    mounted(){        
        this.render()       
    }

}
</script>

<style>

</style>
