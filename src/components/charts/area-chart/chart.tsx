import { Line } from "react-chartjs-2"
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend} from 'chart.js';
import {faker} from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );


 

 

 

const AreaChart = ({value} : any) => {

    // console.log(value)

    // const dates = value.map((item : any) => item.date);
    const labels = value.filter((item : any, index : any) => index % 3 === 0).map((item : any) => item.date.slice(0, -14));
    

    // const dates = ['a', 'b', 'c', 'd', ', '2022-08-17']

    console.log('labels');
    console.log(labels);
    console.log('dates');
    // console.log(dates)

    const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top' as const,
          },
          title: {
            display: false,
            text: 'Chart.js Line Chart',
          },
        },
      };

    const chartData = {
        labels,
        datasets: [
          {
            fill: true,
            label: 'Dataset 2',
            data: value.map((item : any) => item.priceUsd),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    return <Line options={chartOptions} data={chartData} />
}

export default AreaChart;