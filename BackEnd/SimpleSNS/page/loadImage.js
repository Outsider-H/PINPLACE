const PORT = 8899;
const xhr = new XMLHttpRequest();
xhr.open("GET", `http://localhost:${PORT}/imageload`);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send();

xhr.onreadystatechange = () => {
  console.log(xhr.response);
  document.querySelector(".body").innerHTML = xhr.response;
};

let body = document.querySelector(".body");
body.addEventListener("click", (event) => {
  console.log(event.target);
  console.log(event.target.innerHTML);
  let temp = event.target.innerHTML;
  let processed = temp.split(":");
  console.log(processed);
  let imageId = processed[0] - 0;
  console.log(imageId);
  console.log(typeof imageId);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", `http://localhost:${PORT}/getimage`);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`id=${imageId}`);
  xhr.onreadystatechange = () => {
    console.log(xhr.response);
    let img = document.createElement("img");
    img.style.height = "200px";
    img.src = xhr.response;
    event.target.appendChild(img);
  };
});
