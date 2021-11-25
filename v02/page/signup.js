const form = document.querySelector("#signup-info");
const PORT = 8898;
let url;
let blob;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let data = new FormData(event.target);
  console.log(data);
  console.log(data.get("id"));
  console.log(data.get("name"));
  
  //add additional content here
  if (data.get("password") !== data.get("pwagain")) {
      alert("Password is not equal.");
      return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/signupform");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`id=${data.get("id")}&name=${data.get("name")}&password=${data.get("password")}`);
  xhr.onload = () => {
      console.log(xhr.responseText);
  };
  xhr.onreadystatechange = () => {
      console.log(xhr.respose);
    window.location.href = "/signupSucceed.html";
  };
});

window.addEventListener("load", (event) => {
    form.reset();
});

form.addEventListener("change", (event) => {
    event.preventDefault();
    let data = new FormData(form);
    console.log(data);
    console.log(data.get("id"));
    console.log(data.get("name"));
});
