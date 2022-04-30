let data_la = ""
let data_manhattan = ""

function lineChart(data){

    function filterByCityName (LA) {
        // Filter for Los Angeles in the City Column
        return LA.City == this
    }
    data_la = data.filter(filterByCityName,"Los Angeles")
    data_manhattan = data.filter(filterByCityName, "Manhattan")

    let date_la = data_la.map(row => row.Date_Time);
     // convert the date from unix timestamp to actual date/time
    date_la = date_la.map(x=>new Date(x).toLocaleString("en-US"))
    // console.log(date_la)

    let no2_la = data_la.map(row => row.NitogenDioxide);
    // console.log(no2_la) 

    let date_manhattan = data_manhattan.map(row => row.Date_Time);
     // convert the date from unix timestamp to actual date/time
    date_manhattan = date_manhattan.map(x=>new Date(x).toLocaleString("en-US"))
    // console.log(date_manhattan)

    let no2_manhattan = data_manhattan.map(row => row.NitogenDioxide);
    // console.log(no2_manhattan) 

    // Los Angeles: Date VS CO
    var trace1 = {
        x: date_la,
        y: no2_la,
        type: 'line',
        name: "Los Angeles",
      };

    var trace2 = {
        x: date_manhattan,
        y: no2_manhattan,
        type: 'line',
        name: "Manhattan",
    };

  var data = [trace1, trace2];

  var layout = {
    title: {
        text: 'Air Pollutant By City',
    },
    xaxis:{
        automargin: true,
        // x: [1,2,3,4,5,6,7,8,9]
        // range: [2,5],
        title:{
            text:'Date',
            font: {
                family: 'Courier New, monospace',
                size: 26,
                color: "#7f7f7f"
            }
        },
    },
    yaxis: {
        title: {
            text: 'Air Pollutant Level',
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
        }
    }
  };
  
  Plotly.newPlot('cities_no2', data, layout);

}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#air_pollutant").on("change", lineChartUpdate);

// This function is called when a dropdown menu item is selected
function lineChartUpdate() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#air_pollutant");
  // Assign the value of the dropdown menu option to a variable
  var selector = dropdownMenu.property("value");
    console.log(selector);
  // Initialize x and y arrays
  var la_metric = data_la.map(row => row[selector]);
  var manhattan_metric = data_manhattan.map(row => row[selector]);
  
  Plotly.restyle("cities_no2", "y",[la_metric,manhattan_metric]);
}

//-----------------------------------------------------------------

function pieChart(data){
    // console.log("pieChart")
    var co_avg = 0;
    var no2_avg = 0;
    var o3_avg = 0;
    for(var i = 0; i < data.length; i++) {
        co_avg += data[i]["CarbonMonoxide"];
        no2_avg += data[i]["NitogenDioxide"];
        o3_avg += data[i]["Ozone"];
    }
// console.log(data_manhattan)
    co_avg /= data.length;
    no2_avg /= data.length;
    o3_avg /= data.length;

    var data = [{
        values: [co_avg, no2_avg, o3_avg],
        labels: ["CarbonMonoxide", "NitogenDioxide", "Ozone"],
        type: "pie"
    }];

    var layout = {
        height: 600,
        width: 800,
        title: 'Average Air Pollutant Levels'
    };

    Plotly.newPlot("pie", data, layout);

}
// Display the default plot
// function init(co_avg, no2_avg, o3_avg) {

// }

// On change to the DOM, call getData()
d3.selectAll("air_pollutant").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("air_pollutant");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  var data = [];

  if (dataset == 'Los Angeles') {
      data = LA;
  }
  else if (dataset == 'Manhattan') {
      data = Manhattan;
  }
  // Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

// init(co_avg, no2_avg, o3_avg);

//--------------------------------------------------------------

function maxCarbon() {
    // Create a JSON object to store the chart configurations
    d3.json("http://127.0.0.1:5000/get_max_by_city").then(function(data)
    {const chartConfigs = {
        //Specify the chart type
        type: "column2d",
        //Set the container object
        renderAt: "chart-container",
        //Specify the width of the chart
        width: "100%",
        //Specify the height of the chart
        height: "400",
        //Set the type of data
        dataFormat: "json",
        dataSource: {
          chart: {
            //Set the chart caption
            caption: "Max Carbon Monoxide Levels By City",
            subCaption: "Timeframe: 01/01/22-01/31/22",
            //Set the x-axis name
            xAxisName: "City",
            //Set the y-axis name
            yAxisName: "Carbon Monoxide Levels (mcg)",
            // numberSuffix: "mcg",
            //Set the theme for your chart
            theme: "fusion"
          },
          // Chart Data from Step 2
          data: data
        }
      };
      FusionCharts.ready(function(){
        var fusioncharts = new FusionCharts(chartConfigs);
        fusioncharts.render();
        });
    })

  }

maxCarbon()





d3.json("http://127.0.0.1:5000/get_air_pollution").then(function(data){
    // console.log(data)
    // console.log(data.Date)
    lineChart(data)
    pieChart(data)
    
})

