console.log("helloworldListentomysongweb");
// 1. First select and store the elements you'll be working with
let searchIn = document.getElementById("search_field");
let submit = document.getElementById('submit_button');
let searchform = document.getElementById("search-form");
let searchResults;

let player = document.getElementById('music-player');



// 2. Create your `onSubmit` event for getting the user's search term

submit.addEventListener('click', goSearch);
//
function goSearch() {
  let searchQuery = searchIn.value;


  // 3. Create your `fetch` request that is called after a submission

    fetch('https://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04&q=' + searchQuery )
    .then(
      function (response) {

        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        } else {
          response.json().then(function (data) {
            for (let i = 0; i < data.length; i++) {
              console.log("show each title:", data[i].title);
              let markup = `
                <div class="artist_container">
                  <div class="avatar_container">
                    <img class="${data[i].stream_url}?client_id=8538a1744a7fdaa59981232897501e04" src=${data[i].user.avatar_url}>
                  </div>
                  <div class="title_artist">
                   <ul>
                     <li id="title">${data[i].title}</li>
                     <li id="artist">${data[i].user.username}</li>
                   </ul>
                 </div>
                </div>
               `
              document.getElementById("results").innerHTML += markup;
            }
          });
        }
      })
  document.getElementById("results").innerHTML = "" 
}

document.getElementById("results").addEventListener("click", function(e) {
  if (e.target && e.target.nodeName == "IMG") {
    let url = e.target.className;
    player.removeAttribute("src");
    player.setAttribute("src", url);
    player.play();
    let playerSource = player.src;
    console.log(playerSource);
  }
})
