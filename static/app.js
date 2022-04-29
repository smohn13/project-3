function lineChart(data){
    // convert the dictionary to array
    // let date = Object.values(data.Date_Time)
    // let co = Object.values(data.CarbonMonoxide)
    // let no2 = Object.values(data.NitogenDioxide)
    // let o3 = Object.values(data.Ozone)
    // let city = Object.values(data.City)
    function filterByCityName (LA) {
        // Filter for Los Angeles in the City Column
        return LA.City == "Los Angeles"
    }
    let data_la = data.filter(filterByCityName)

    let date = data_la.map(row => row.Date_Time);
     // convert the date from unix timestamp to actual date/time
    date = date.map(x=>new Date(x).toLocaleString("en-US"))
    console.log(date)

    let co = data_la.map(row => row.CarbonMonoxide);
    console.log(co)

    let no2 = data_la.map(row => row.NitogenDioxide);
    console.log(no2) 

    let o3 = data_la.map(row => row.Ozone);
    console.log(o3)

    let city = data_la.map(row => row.City);
    console.log(city)


    // Los Angeles: Date VS CO
    var trace1 = {
        x: date,
        y: co,
        type: 'line',
        name: "Los Angeles",
      };
    
      var data = [trace1];
      
      Plotly.newPlot('la_co', data);

}





d3.json("http://127.0.0.1:5000/get_air_pollution").then(function(data){
    console.log(data)
    // console.log(data.Date)
    lineChart(data)
})