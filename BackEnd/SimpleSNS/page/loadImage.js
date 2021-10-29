const PORT = 8899;
const xhr = new XMLHttpRequest();
xhr.open("GET", `http://localhost:${PORT}/imageload`);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send();

xhr.onreadystatechange = () => {
  console.log(xhr.response);
  console.log(JSON.parse(xhr.response).html);
  document.querySelector(".body").innerHTML = JSON.parse(xhr.response).html;
  console.log(JSON.parse(xhr.response).image.split(","));
  let pathlist = [];
  JSON.parse(xhr.response)
    .image.split(",")
    .forEach((elem) => {
      pathlist.push(elem);
    });
  console.log(pathlist);
  console.log(JSON.parse(xhr.response).class);
  JSON.parse(xhr.response).class.forEach((elem, idx) => {
    console.log(idx);
    console.log(`.${elem}`);
    console.log(`.${pathlist[idx]}`);
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.style.height = "200px";

    img.src = `${pathlist[idx]}`;
    div.appendChild(img);
    document.querySelector(`.${elem}`).appendChild(div);
  });
};
