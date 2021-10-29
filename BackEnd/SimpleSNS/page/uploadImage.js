const imgSelector = document.querySelector(".img");
const btn = document.querySelector(".post");
const form = document.querySelector(".sendform");
const PORT = 8899;
const userId = 1;
let url;
let blob;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let data = new FormData(event.target);
  console.log(data);
  console.log(data.get("img-file"));
  console.log(data.get("img-file").name);
  console.log(data.get("img-file").stream());
  data.set(
    "img-file",
    data.get("img-file"),
    `${userId}-${data.get("img-file").name}`
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
});
