// static/scripts/4-hbnb.js

// Document ready function to handle amenities checkbox changes and button click
$('document').ready(function () {
  let amenities = {};

  // Handle changes to amenities checkboxes
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    $('.amenities H4').text(Object.values(amenities).join(', '));
  });

  // Check API status and update the DOM accordingly
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status_code) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // Function to fetch and display places
  function fetchPlaces(data) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (places) {
        $('section.places').empty();
        for (let place of places) {
          $('section.places').append(
            `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`
          );
        }
      }
    });
  }

  // Initial fetch of places
  fetchPlaces({});

  // Fetch places when the button is clicked with the list of checked amenities
  $('button').click(function () {
    fetchPlaces({ amenities: Object.keys(amenities) });
  });
});
