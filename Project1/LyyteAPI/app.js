const key2 = "200705616-691135a1c37048aca9594476cc41aee8"

// GEOLOCATION
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Pull from hiking project 
function getWeather(latitude, longitude) {
    let api2 = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=10&key=${key2}`;
    
    $.ajax({
        url: api2,
        method: "GET"
      })
        .then(function(response) {
          console.log(response);
          console.log("checkpoint!!!");

          // constants for response data
          

          // constants for new elements

          //append new divs to div id Lyyte
        //   traildiv.append(trailnamep, trailnamep, summaryp, difficultyp, starsp, imgurlp);
        //   $("#Lyyte").append(traildiv);

          for (i = 0; i < 5; i++) {

        // constants for response data
          const trailname = response.trails[i].name;
          const summary = response.trails[i].summary;
          const difficulty = response.trails[i].difficulty;
          const stars = response.trails[i].stars;
          const imgurl = response.trails[i].imgMedium;

        //
          const traildiv = $("<div class=trails>");
          const trailnamep = $("<p>").text("Trail Name: " + trailname);
          const summaryp = $("<p>").text("Summary: " + summary);
          const difficultyp = $("<p>").text("Difficulty: " + difficulty);
          const starsp = $("<p>").text("Rating: " + stars);
          const imgurlp = $("<img>").attr("src", imgurl);


            traildiv.append(trailnamep, trailnamep, summaryp, difficultyp, starsp, imgurlp);
          $("#Lyyte").append(traildiv);
          }

});
};
