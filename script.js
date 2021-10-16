let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
let educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'

let countyData
let educationData

let canvas = d3.select('#canvas')

let drawMap = () => {

}

d3.json(countyURL).then(
    (data, error) => {
        if (error) {
            console.log(error);
        }
        else {
            countyData = topojson.feature(data, data.objects.counties).features;
            console.log(countyData);

            d3.json(educationURL).then(
                (data, error) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        educationData = data;
                        console.log(educationData);
                    }
                }
            )
        }
    }
);