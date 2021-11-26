const imgSelector = document.querySelector(".img");
const btn = document.querySelector("#upload-cancel");
const form = document.querySelector("#sendform");
const PORT = 8898;
const userId = 1;
let url;
let blob;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let data = new FormData(event.target);
  console.log(data);
  console.log(data.get("image"));
  console.log(data.get("image").name);
  console.log(data.get("image").stream());
  console.log(data.get("place"));
  data.set(
      "image",
      data.get("image"),
           `${data.get("place")}-${userId}-${data.get("image").name}`
  );

  //add additional content here
  data.append("test", "test");
  data.append("test2", "test2");

  console.log(data.get("test"));
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/imguploadform");
  xhr.onload = () => {
    console.log(xhr.responseText);
  };
  xhr.send(data);
  xhr.onreadystatechange = () => {
    window.location.href = "/photoUploadSucceed.html";
  };
});

window.addEventListener("load", (event) => {
    form.reset();
    const file = document.getElementById("upload-file-upload").value = '';
});

form.addEventListener("change", (event) => {
    event.preventDefault();
    const file = document.getElementById("upload-file-upload").files[0];
    const preview = document.getElementById("preview");
    //let data = new FormData(event.target);
    
    if (file) {
        console.log(file);
        console.log(file.name);
        console.log(file.stream());
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", function () {
            preview.style.display = "flex";
            preview.innerHTML = '<img src ="' + this.result + '" />';
        });
    }
});

btn.addEventListener("click", (event) => {
    window.location.href = "/";
});

const x = new XMLHttpRequest();
x.open("GET", "/getplace");
x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
x.send();
x.onreadystatechange = () => {
    console.log(x.response);
    console.log(JSON.parse(x.response).html);
    document.querySelector("#upload-place-dropdown").innerHTML = '<option hidden disabled selected value="-1"></option>'
    document.querySelector("#upload-place-dropdown").innerHTML += JSON.parse(x.response).html;
};
