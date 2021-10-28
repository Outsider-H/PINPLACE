const imgSelector = document.querySelector(".img");
const btn = document.querySelector(".post");
const PORT = 8899;
const userId = 1;
let url;
let blob;
imgSelector.addEventListener("change", () => {
  document.querySelector(".imgbox").innerHTML = "";
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    let dataURL = reader.result;
    let img = document.createElement("img");
    img.style.height = "200px";
    img.src = dataURL;
    document.querySelector(".imgbox").appendChild(img);
    url = dataURL;

    req.open("GET", url);
    req.responseType = "blob";
    req.onload = (e) => {
      let temp = req.response;
      console.log(temp);
      blob = temp;
    };
    req.send();
  });
  let file = imgSelector.files[0];
  reader.readAsDataURL(file);
  //   blob = file;

  let req = new XMLHttpRequest();
});

btn.addEventListener("click", () => {
  console.log(blob);
  console.log(blob.stream());

  //   console.log(url);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `http://localhost:${PORT}/imgupload`);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`id=${userId}&img=${url}`);
});
