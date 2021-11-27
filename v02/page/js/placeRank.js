const userId = sessionStorage.getItem("userId");

const selectMeasurement = document.querySelector("#sortPlease");
let url;
let blob;

selectMeasurement.addEventListener("change", (event) => {
  let data = document.querySelector("#list-sort-by");
  console.log(+data.value);
  const xhr = new XMLHttpRequest();
  if (+data.value === 1) {
    xhr.open("GET", "/get/dailylist");
    var title = "Daily";
  } else if (+data.value === 7) {
    xhr.open("GET", "/get/weeklylist");
    var title = "Weekly";
  } else if (+data.value === 30) {
    xhr.open("GET", "/get/monthlylist");
    var title = "Monthly";
  }
  xhr.onload = () => {
    console.log(xhr.responseText);
  };
  xhr.send(data);
  xhr.onreadystatechange = () => {
    console.log(xhr.response);
    console.log(JSON.parse(xhr.response).html);
    document.querySelector("#list").innerHTML = JSON.parse(xhr.response).html;
    document.querySelector("#subtitle-text").innerHTML =
      title.concat(" Hotplace");
  };
});

const xhr = new XMLHttpRequest();
xhr.open("GET", "/get/dailylist");
xhr.onload = () => {
  console.log(xhr.responseText);
};
xhr.send();
xhr.onreadystatechange = () => {
  console.log(xhr.response);
  console.log(JSON.parse(xhr.response).html);
  document.querySelector("#list").innerHTML = JSON.parse(xhr.response).html;
};
