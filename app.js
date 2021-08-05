function prayerTimes(latitude, longitude) {
    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method=4')
    .then(Response=>Response.json())
    .then(function(Response) {
        let date        = new Date();
        let today       = date.getDate();
        let data       = Response.data[0].timings;
       
        let app         = document.getElementById('app');
        let table       = document.createElement('table');
        let tableTbody  = document.createElement('tbody');
        
        for(i in data){
            let row         = tableTbody.insertRow();
            let name        = row.insertCell(0);
            let time        = row.insertCell(1);
            name.innerHTML  = i;
            time.innerHTML  = data[i];
            tableTbody.appendChild(row);            
        }
        table.appendChild(tableTbody);
        app.appendChild(table);
    });
}

function success(position) {
   prayerTimes(position.coords.latitude, position.coords.longitude);
}
// jika lokasi tidak diizinkan, maka gunakan waktu jakarta secara default
function error() {
   prayerTimes('-6.200000', '106.816666');
}

function userLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation tidak didukung didalam browser anda, silahkan gunakan browser lain');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function index() {
    let app         = document.getElementById('app');
    let h3          = document.createElement('h3');
    h3.innerHTML    = 'Prayer Times';

    app.appendChild(h3)

    userLocation();
}

index();