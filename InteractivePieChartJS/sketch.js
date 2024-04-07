let data;
let timeSlider;
let timeLabel;
let currentTime = 0;
let vehicles = [];
let pieDiameter = 300;
let legendWidth = 200;

function preload() {
  // Load your data here, for example from a CSV file
  data = loadTable('parking_lot_data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1000, 600);
  angleMode(DEGREES); // Set angle mode to degrees for pie chart

  // Create time slider
  timeSlider = createSlider(0, data.getRowCount() - 1, 0);
  timeSlider.position(20, height + 20);
  timeSlider.style('width', '760px'); // Make the slider responsive

  // Create time label
  timeLabel = createP();
  timeLabel.position(20, height + 50);

  // Parse the data and extract relevant information
  for (let i = 0; i < data.getRowCount(); i++) {
    let time = data.getNum(i, 'Time');
    let carCount = data.getNum(i, 'Car');
    let truckCount = data.getNum(i, 'Truck');
    let suvCount = data.getNum(i, 'SUV');
    vehicles.push({ time: time, car: carCount, truck: truckCount, suv: suvCount });
  }
}

function draw() {
  background(0); // Set background to black

  // Update current time based on slider
  currentTime = timeSlider.value();

  // Display time label
  timeLabel.html("Time: " + vehicles[currentTime].time);

  // Draw pie chart for vehicle counts
  drawPieChart(vehicles[currentTime].car, vehicles[currentTime].truck, vehicles[currentTime].suv);

  // Draw legend
  drawLegend();
}

function drawPieChart(carCount, truckCount, suvCount) {
  let totalVehicles = carCount + truckCount + suvCount;

  // Calculate angles for each vehicle type
  let carAngle = map(carCount, 0, totalVehicles, 0, 360);
  let truckAngle = map(truckCount, 0, totalVehicles, 0, 360);
  let suvAngle = map(suvCount, 0, totalVehicles, 0, 360);

  // Draw pie chart
  let lastAngle = 0;
  fill(255, 0, 0); // Red for cars
  arc(width / 2, height / 2, pieDiameter, pieDiameter, lastAngle, lastAngle + carAngle);
  drawLabel("Cars: " + carCount, lastAngle + carAngle / 2); // Draw label for cars
  lastAngle += carAngle;
  fill(0, 255, 0); // Green for trucks
  arc(width / 2, height / 2, pieDiameter, pieDiameter, lastAngle, lastAngle + truckAngle);
  drawLabel("Trucks: " + truckCount, lastAngle + truckAngle / 2); // Draw label for trucks
  lastAngle += truckAngle;
  fill(0, 0, 255); // Blue for SUVs
  arc(width / 2, height / 2, pieDiameter, pieDiameter, lastAngle, lastAngle + suvAngle);
  drawLabel("SUVs: " + suvCount, lastAngle + suvAngle / 2); // Draw label for SUVs
}

function drawLabel(label, angle) {
  // Calculate position for label
  let labelX = width / 2 + (pieDiameter / 2 + 20) * cos(angle);
  let labelY = height / 2 + (pieDiameter / 2 + 20) * sin(angle);
  
  // Draw label
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, labelX, labelY);
}

function drawLegend() {
  // Draw legend background
  fill(50);
  rect(width - legendWidth, 0, legendWidth, height);

  // Draw legend labels
  textSize(16);
  textAlign(LEFT, CENTER);
  fill(255);
  text('Legend', width - legendWidth + 10, 20);
  textSize(14);
  fill(255, 0, 0);
  text('Cars', width - legendWidth + 30, 50);
  fill(0, 255, 0);
  text('Trucks', width - legendWidth + 30, 70);
  fill(0, 0, 255);
  text('SUVs', width - legendWidth + 30, 90);

  // Draw legend colors
  let rectSize = 15;
  fill(255, 0, 0);
  rect(width - legendWidth + 10, 50 - rectSize / 2, rectSize, rectSize);
  fill(0, 255, 0);
  rect(width - legendWidth + 10, 70 - rectSize / 2, rectSize, rectSize);
  fill(0, 0, 255);
  rect(width - legendWidth + 10, 90 - rectSize / 2, rectSize, rectSize);
}
