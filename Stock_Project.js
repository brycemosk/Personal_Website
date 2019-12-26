

  var xData = [];
  var year;
  for(var i = 0; i < 1103; i++)
  {
    year = 1927 + i/12;
     xData.push(year);
  }


//MACHINE LEARNING PORTION WITH BRAIN.JS
// provide optional config object: Defaults shown.
const config = {
binaryThresh: 0.5,
hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
};
const net = new brain.NeuralNetwork(config);
net.maxPredictionLength = 20000;


//Network is being trained to output likelyhood of stock rising by 25% in 1 year, and 50% in 5 years after a local minimum. (i.e. A depression)
net.train([{
//1929, initial = 4.43
//output = 10.91, 15.40

//percentage drop from peak to minimum
  input: [.861],
//Atleast 1.25 factor increase in 1 year, 1.5 factor incease in 5 years? (1 = yes, 0 = no)
  output: [1,1]
},
{
  //1947, initial = 13.93
  //output = 14.62, 25.90
  input: [.296],
  output: [0,1]
},
{
  //1961 initial = 54.75
  //output = 69.37, 90.64
  input: [.28],
  output: [1,1]
},
{
  //1973 initial = 72.72
  //output =
  input: [.48],
  output: [1,1]
},
{
  //1987
  input: [.335],
  output: [0,1]
},
{
  //2008 inital = 735.09
  input: [.564],
  output: [1,1]
},
{
  //1990 correction
  input: [.102],
  output: [0,0]
},
{
  //1980 correction
  input: [.171],
  output: [1,1]
},
{
  //2000 DOTcom bubble
  input: [.491],
  output: [0,0]
},
{
  //1997 correction
  input: [.108],
  output: [1,0]
},
{
  //1982 stagflation
  input: [.278],
  output: [1,0]
}
]);

//********* NOTE: THESE PLOTS WILL INTERACT WITH A 'DIV' ELEMENT WHHICH HAS THE ID OF MyDiv3.
//plotting the outputs of the networks

//Plot of drop versus likelyhood of Increase

var percentage = [];
var future25 = [];
var future50 = [];
for(i = 0; i < 1001; i++)
{
percentage.push(i/10);
}
for(i = 0; i < 1001; i++)
{
future25.push(100*net.run([i/1000])[0]);
future50.push(100*net.run([i/1000])[1]);

}

var trace6 = {
x: percentage,
y: future25,
name: "Odds of 25% Increase After 1 year",
type: 'scatter'
};
var trace7 = {
x: percentage,
y: future50,
name: "Odds of 50% Increase After 5 years",
type: 'scatter'
};
var data3 = [trace6,trace7];

var layout3 = {
title: 'Percentage Drop vs. Likelyhood of Increase',
xaxis: {
  title: 'Percentage Drop'
},
yaxis: {
  title: 'Percentage Likelyhood of Increase'
}
};


//NOTE: SOMETIMES THE NETWORK WILL TRAIN AND SEEM TO OVERFIT THE DATA. THE GRAPH WILL APPEAR
//TO HAVE MULTIPLE LARGE BUMPS RATHER THAN A SMOOTH INCREASE
Plotly.newPlot('myDiv3', data3, layout3);
