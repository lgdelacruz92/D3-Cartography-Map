let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
let educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'

let countyData
let educationData

const educationDataMap = {}

let canvas = d3.select('#canvas')

let drawMap = () => {
    canvas.selectAll('path')
        .data(countyData)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('class', 'county')
        .attr('fill', (countyDataItem) => {
            // console.log(countyDataItem);
            let id = countyDataItem.id;
            let county = educationDataMap[id];
            let percentage = county.bachelorsOrHigher;
            if (percentage <= 15) {
                return 'tomato';
            } else if (percentage <= 30) {
                return 'orange';
            } else if (percentage <= 45) {
                return 'lightgreen';
            } else {
                return 'limegreen';
            }
        })
        .attr('data-fips', (countyDataItem) => {
            return countyDataItem.id;
        })
        .attr('data-education', countyDataItem => {
            let county = educationDataMap[countyDataItem.id];
            let percentage = county.bachelorsOrHigher;
            return percentage;
        })
        .html(countyDataItem => {
            const county = educationDataMap[countyDataItem.id];
            return `<title>fips: ${county.fips} bachelorsOrHigher: ${county.bachelorsOrHigher}</title>`;
        })
}

const transformEducationData = (educationData) => {
    educationData.forEach(ed => educationDataMap[ed.fips] = ed)
}

d3.json(countyURL).then(
    (data, error) => {
        if (error) {
            console.log(error);
        }
        else {
            countyData = topojson.feature(data, data.objects.counties).features;
            // console.log(countyData);

            d3.json(educationURL).then(
                (data, error) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        educationData = data;
                        transformEducationData(educationData);
                        drawMap();
                    }
                }
            )
        }
    }
);