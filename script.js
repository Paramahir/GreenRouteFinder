

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calculateButton').addEventListener('click', calculateRoute);
});

function calculateRoute() {
    const directionsService = new google.maps.DirectionsService();
    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const vehicleType = document.getElementById("vehicleType").value;
    const fuelType = document.getElementById("fuelType").value;

    directionsService.route({
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
        if (status === 'OK') {
            const route = response.routes[0].legs[0];
            const distance = route.distance.value / 1000; // Convert to km
            const duration = route.duration.text; // Human-readable duration
            const emission = calculateEmission(distance, vehicleType, fuelType);
            document.getElementById("result").innerHTML = `<p><strong>Distance:</strong> ${distance} km</p><p> <strong>Duration:</strong> ${duration}</br></p><p> <strong>Estimated CO2 Emissions for ${vehicleType}:</strong> ${emission.toFixed(2)} grams.</p> ${displayEmissionDetails(emission, vehicleType, fuelType)}`;

        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}




function calculateEmission(distance, vehicleType, fuelType) {
    // Assume these are CO2 equivalent emission factors (g/km) which include CO2, CH4, and N2O
    const emissionFactors = {
        'car': { 'petrol': 271.5, 'diesel': 300, 'electric': 0 },  // Example values
        'motorcycle': { 'petrol': 150, 'diesel': 160, 'electric': 0 },  // Example values
        'bus': { 'default': 100 },  // Example values
        'train': { 'default': 50 },  // Example values
    };

    const factor = emissionFactors[vehicleType][fuelType] || emissionFactors[vehicleType]['default'];
    return distance * factor;
}

function getEmissionBreakdown(vehicleType, fuelType) {
    // Corrected breakdowns; values are treated as percentages but without the '%' symbol
    const emissionBreakdown = {
        'car': {
            'petrol': { 'CO2': 92, 'CH4': 5, 'N2O': 3 },
            'diesel': { 'CO2': 95, 'CH4': 3, 'N2O': 2 },
            'electric': { 'CO2': 0, 'CH4': 0, 'N2O': 0 }
        },
        'motorcycle': {
            'petrol': { 'CO2': 90, 'CH4': 7, 'N2O': 3 },
            'diesel': { 'CO2': 92, 'CH4': 6, 'N2O': 2 }
        },
        'bus': {
            'default': { 'CO2': 80, 'CH4': 15, 'N2O': 5 }
        },
        'train': {
            'default': { 'CO2': 75, 'CH4': 20, 'N2O': 5 }
        }
    };

    return emissionBreakdown[vehicleType][fuelType] || emissionBreakdown[vehicleType]['default'];
}


function displayEmissionDetails(emission, vehicleType, fuelType) {
    const breakdown = getEmissionBreakdown(vehicleType, fuelType);
    let details = `<p><strong>Emission Breakdown for ${vehicleType} (${fuelType}):</strong></p>`;
    details += `<ul>`;

    for (const gas in breakdown) {
        const gasAmount = emission * (breakdown[gas] / 100);
        details += `<li>${gas}: ${gasAmount.toFixed(2)} grams</li>`;
    }

    details += `</ul>`;

    // Calculate the number of trees needed to offset the emissions
    const treesToPlant = (emission * 1000) / 22000; // Convert grams to kilograms and divide by 22kg
    details += `<p>To offset these emissions, you would need to plant approximately ${treesToPlant.toFixed(2)} trees, which would absorb this amount of CO2 over the course of one year.</p>`;

    return details;
}



