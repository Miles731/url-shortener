
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



export default function Location({stats}) {
    const cityCount = stats.reduce((acc,item) => {
    
    if(acc[item.city]){
    acc[item.city] += 1;
    }else acc[item.city] =1;

    return acc;
}, {});

    const cities = Object.entries(cityCount).map(([city, count]) => ({
        city,
        count
    }))


  return (
    
    <div style ={{width:"100%", height:300}}>
        <ResponsiveContainer>
    <LineChart
      width={700}
      height={300}
      data={cities.slice(0,5)}
   
    >
     
      <XAxis dataKey="city" />
      <YAxis />
      <Tooltip labelStyle={{color: "blue"}}/>
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
    
      />
      <Line type="monotone" dataKey="count" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
    </div>
  
  );
}
