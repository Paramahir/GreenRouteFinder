# EcoRoute Calculator

The EcoRoute Calculator is a web-based application designed to calculate the carbon footprint of various transportation methods between two locations. It provides users with insights into their travel emissions and suggests the number of trees required to offset these emissions.

## Features

- Calculate the carbon emissions for travel between two locations.
- Compare emissions across different transportation modes, including cars, motorcycles, buses, and trains.
- Estimate the number of trees needed to offset the calculated carbon emissions.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- A modern web browser.
- A Google Maps API key. [Get a Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/your_username_/EcoRouteCalculator.git
2. Enter your API key in index.html: Open the index.html file and find the following script tag:
    ```sh
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=&v=weekly" defer></script> #Replace YOUR_API_KEY with your Google Maps API key.

###   Usage
Open index.html in your web browser.
Enter the source and destination locations.
Select the vehicle type and fuel type from the dropdown menus.
Click the "Calculate Route" button to view the emissions, travel distance, travel duration, and the number of trees needed for offsetting the emissions.

### Contributing
Contributions are what make the open-source community such a fantastic place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request

