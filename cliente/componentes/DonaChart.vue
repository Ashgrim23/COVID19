<script>
import {Doughnut} from "vue-chartjs"
export default {
    extends: Doughnut,
    components:{
        Doughnut
    },
    props: {
        hombres:null,
        mujeres:null
    },
    watch:{
        hombres(){            
            this.render()
        }
    },
    methods:{
        render(){            
            const tipos=["Hombres","Mujeres"]
            this.renderChart({
                labels: tipos,
                datasets: [{                
                    data: [this.hombres,this.mujeres],
                    backgroundColor:["Blue","#e30052"]}
                ]            
            },{
            
                responsive: false,
                maintainAspectRatio: true,
                legend:{
                    display: true,
                    fullWidth: true,
                    align:"center",
                    position: "top",
                    labels:{
                        boxWidth: 15,
                        padding: 5,
                        fontSize: 8
                        }
                }
            })
        }
    },
    mounted(){
        this.render()        
    }

}
</script>

<style>

</style>
