// Read samples.json using D3
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function that contains instructions at page load/refresh
function init() {
  // create dropdown/select
  const dropdownMenu = d3.select("#selDataset");

  // get JSON data
  d3.json(url).then(function (data) {
    const sampleNames = data.names;

    // enter sample names into dropdown menu
    sampleNames.forEach(function (name) {
      dropdownMenu
        .append("option")
        .text(name)
        .property("value", name);
    });

    // display the charts and metadata for the first sample
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function to build the charts and update them when a new sample is selected
function buildCharts(sample) {
  // get JSON data
  d3.json(url).then(function (data) {
    const samples = data.samples;
    const selectedSample = samples.find(function (s) {
      return s.id === sample;
    });

    // Build the bar chart
    const barData = [
      {
        x: selectedSample.sample_values.slice(0, 10).reverse(),
        y: selectedSample.otu_ids
          .slice(0, 10)
          .map((id) => `OTU ${id}`)
          .reverse(),
        text: selectedSample.otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      },
    ];

    const barLayout = {
      title: "Top 10 OTUs",
      margin: { t: 30, l: 150 },
    };

    Plotly.newPlot("bar", barData, barLayout);

    // Build the bubble chart
    const bubbleData = [
      {
        x: selectedSample.otu_ids,
        y: selectedSample.sample_values,
        text: selectedSample.otu_labels,
        mode: "markers",
        marker: {
          size: selectedSample.sample_values,
          color: selectedSample.otu_ids,
          colorscale: "Earth",
        },
      },
    ];

    const bubbleLayout = {
      title: "OTU IDs vs Sample Values",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Value" },
      showlegend: false,
      height: 500,
      width: 1000,
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
}

// Function to display the sample metadata
function buildMetadata(sample) {
  // Fetch the JSON data
  d3.json(url).then(function (data) {
    const metadata = data.metadata;
    const selectedMetadata = metadata.find(function (m) {
      return m.id === parseInt(sample);
    });

    // Select the metadata panel
    const metadataPanel = d3.select("#sample-metadata");

    // Clear previous metadata
    metadataPanel.html("");

    // Append each key-value pair to the panel
    Object.entries(selectedMetadata).forEach(function ([key, value]) {
      metadataPanel.append("p").text(`${key}: ${value}`);
    });
  });
}

// Function to handle changes in the dropdown selection
function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Call the initialize function
init();