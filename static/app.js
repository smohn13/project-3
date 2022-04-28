function lineChart(data){
    // convert the dictionary to array
    let date = Object.values(data.Date_Time)
    let co = Object.values(data.CarbonMonoxide)
    let no2 = Object.values(data.NitogenDioxide)
    let o3 = Object.values(data.Ozone)
    let city = Object.values(data.City)
    console.log(date)
    console.log(co)
    console.log(no2) 
    console.log(o3)
    console.log(city)
    // convert the date from unix timestamp to actual date/time
    // date = date.map(x=>new Date(x).toLocaleTimeString("en-US"))
    
    // let trace1 = {
    //     x: date,
    //     y: temp,
    //     type: 'scatter',
    //     name: 'temp'
    //   };
    //   let trace2 = {
    //     x: date,
    //     y: mintemp,
    //     type: 'scatter',
    //     name: 'min temp'
    //   };  let trace3 = {
    //     x: date,
    //     y: maxtemp,
    //     type: 'scatter',
    //     name: 'max temp'
    //   };

      
    //   var data = [trace1,trace2,trace3];
      
    //   Plotly.newPlot('lineplot', data);
}



d3.json("http://127.0.0.1:5000/get_air_pollution").then(function(data){
    console.log(data)
    // console.log(data.Date)
    lineChart(data)
})