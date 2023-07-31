
function init(){
    // code that runs once (only on page load or refresh)

    // this checks that our initial function runs.
    console.log("The Init() function ran")

    // create dropdown/select
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json(url).then(data =>{

        // console.log(data.names)
        let dropdownNames = data.names;
        let dropdown = d3.select('#selDataset');

        for (i=0; i<dropdownNames.length; i++){
            // <option value="volvo">Volvo</option>
            dropdown.append("option").text(dropdownNames[i]).property('value',dropdownNames[i])
        }
        
    });
    // run functions to generate plots with default id = 940
    createScatter('940')
    createBar('940')
    createSummary('940')

}

// function that runs whenever the dropdown is changed
// this function is in the HTML and is called with an input called 'this.value'
// that comes from the select element (dropdown)
function optionChanged(newID){
    // code that updates graphics
    // one way is to recall each function
    createScatter(newID)
    createBar(newID)
    createSummary(newID)

}

function createScatter(id){
    // code that makes scatter plot at id='bubble'

    // checking to see if function is running
    console.log(`This function generates scatter plot of ${id} `)
}

function createBar(id){
    // code that makes bar chart at id='bar'
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json(url).then(data =>{
        // console.log(data)
        let idData = data.samples.filter(i => i.id == id)
        console.log(idData[0])
        // console.log(idData[0].sample_values.slice(0,10).reverse())
        let otuIds = idData[0].otu_ids.slice(0,10)
        let otuLabels = idData[0].otu_labels.slice(0,10)
        let sampleValues = idData[0].sample_values.slice(0,10)

        let otuIds_text = otuIds.map(i => `OTU ${i}`)

        console.log()
        let chartData = [
            {
                y: otuIds_text.reverse(),
                x: sampleValues.reverse(),
                text: otuLabels.reverse(),
                type: 'bar',
                orientation: 'h'
            }
        ];

        let layout = {
            title: "my bellybutton bacteria"
        };
        
        Plotly.newPlot("bar", chartData, layout);

    });



    // checking to see if function is running
    console.log(`This function generates bar chart of ${id} `)

}

function createSummary(id){
    // code that makes list, paragraph, text/linebreaks at id='sample-meta'
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json(url).then(data =>{
        let idData = data.metadata.filter(i => i.id == id)
        console.log(idData[0])
        let demographics = d3.select('#sample-metadata');

        demographics.html("")
        demographics.append("p").text(`ID: ${idData[0].id}`)
        demographics.append("p").text(`AGE: ${idData[0].age}`)
        

    })
    // checking to see if function is running
    console.log(`This function generates summary info of ${id} `)
}


// function called, runs init instructions
// runs only on load and refresh of browser page
init()





