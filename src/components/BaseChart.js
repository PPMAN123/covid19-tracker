import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js'
import { Card, CardContent, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    cardContent : {
        width:1000,
        height:500
    }
})

const BaseChart = ({ type, chartDataset, chartXAxes }) => {
    const chart = useRef();
    const [ctx, setCtx] = useState(null);
    const c = useStyles()

    useEffect(() =>{
        setCtx(chart.current);
    },[])
    
    useEffect(() => {
        if(ctx){
            console.log(chartDataset)
            console.log(chartXAxes)
            new Chart(ctx, {
                type: type,
                data:{
                    datasets: chartDataset
                },
                options:{
                    elements: {
                        point:{
                            radius: 1.5
                        }
                    },
                    scales: {
                        xAxes: chartXAxes
                    }
                }
            })
        }
    }, [ctx, chartDataset, chartXAxes, type])

    return (
        <Card className={c.cardContent} >
            <CardContent>
                <canvas ref={chart} ></canvas>
            </CardContent>
        </Card>
    )
}

export default BaseChart