import axios from 'axios';
// declare var mapboxgl;

type AddressResponse = {
  data: {
    lat: string;
    lon: string;
  }[];
  status: number;
};

const form = document.querySelector('form') as HTMLFormElement;
const mapContainer = document.getElementById('map2') as HTMLDivElement;
const addressInput = document.getElementById('address') as HTMLInputElement;

const searchAddressHandler = (event: Event) => {
  event.preventDefault();
  console.log(addressInput);
  const enteredAddress = addressInput.value;
  //   const enteredAddress = '135 pilkington avenue birmingham';

  // send to google api

  axios
    .get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURI(
        enteredAddress
      )}&format=json`
    )
    .then((response: AddressResponse) => {
      console.log(response);
      if (response.status !== 200) {
        throw new Error('could not fetch location');
      }
      const location = {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      };

      mapboxgl.accessToken = 'get from mapbox';
      const map = new mapboxgl.Map({
        container: 'map2', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [+location.lon, +location.lat], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
      //   mapContainer.innerHTML = '';
      //   mapContainer.insertAdjacentHTML('afterbegin', map);
      new mapboxgl.Marker().setLngLat([location.lon, location.lat]).addTo(map);
      console.log(location);
    })
    .catch((err) => {
      alert(err.message);
      console.error(err);
    });
};

form.addEventListener('submit', searchAddressHandler);
