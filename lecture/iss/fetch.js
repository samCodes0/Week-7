// main url: https://api.wheretheiss.at/v1/satellites/25544
// backup url: https://iss-2560.herokuapp.com/iss-now
let url = "https://api.wheretheiss.at/v1/satellites/25544";
let issLat = document.querySelector('#iss-lat');
let issLong = document.querySelector('#iss-long');
let fetchDate = document.querySelector('#fetch-date');

let update = 10000;
let maxFailedAttempts = 3;
let issMarker;
let spaceStationIcon = L.icon({
    iconUrl: 'spaceStation.jpg',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
    // popupAnchor:  [1, -15] // point from which the popup should open relative to the iconAnchor
});

let map = L.map('iss-map').setView([0, 0], 1);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetchIss(maxFailedAttempts) // call the function once to start

function fetchIss(attempts) {

    if (attempts <= 0) {
        alert('Attempted to contact the ISS server. Failed after several attempts');
        return;
    }

    fetch(url).then(res => {
        return res.json();
    }).then(issData => {
        let date = Date();
        let lat = issData.latitude;
        let long = issData.longitude;

        issLat.innerHTML = lat;
        issLong.innerHTML = long;
        fetchDate.innerHTML = `At ${date} the ISS is over the following coordinates:`
        //creating the marker if it doesnt exists/move it if it does exist
        if (!issMarker) {
            issMarker = L.marker([lat, long], {icon: spaceStationIcon}).addTo(map);
        } else {
           issMarker.setLatLng([lat, long]);
        }
    }).catch(err => {
        attempts --;
        console.log(err);
    }) // the final catch will handle errors in any point in the promise chain.
        .finally(() => {
            setTimeout(fetchIss, update, attempts);
        })
}
