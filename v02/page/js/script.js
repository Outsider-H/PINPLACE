// const userId = sessionStorage.getItem("userId");

// console.log(`${sessionStorage.getItem("userId")}`);
const userId = sessionStorage.getItem("userId");

let model;
const loadModel = async () => {
  model = await tf.loadLayersModel("./model/place/model.json");
};
loadModel();

const imgSelector = document.querySelector("#img");
const predictBtn = document.querySelector(".predict");
const pred = document.querySelector(".result");
const uploadBtn = document.querySelector(".predict-upload");
const form = document.querySelector("#pred");
let idx;
// const userId = 1;

imgSelector.addEventListener("change", () => {
  pred.innerHTML = "";
  document.querySelector(".imageBox").innerHTML = "";
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    let dataURL = reader.result;
    let img = document.createElement("img");
    img.style.height = "200px";
    img.src = dataURL;
    img.classList.add("curImg");
    document.querySelector(".imageBox").appendChild(img);
  });
  let file = imgSelector.files[0];
  reader.readAsDataURL(file);
  uploadBtn.style.display = "none";
});

predictBtn.addEventListener("click", async () => {
  let imgInput = document.querySelector(".curImg");
  const preprocess = (img) => {
    let tensor = tf.browser
      .fromPixels(img)
      .resizeNearestNeighbor([128, 128])
      .toFloat();
    return tensor.div(255).expandDims();
  };
  let tensor = preprocess(imgInput);
  let prediction = await model.predict(tensor).data();
  let top = Array.from(prediction)
    .map((prob, idx) => {
      return {
        probability: prob,
        className: IMAGENET_CLASSES2[idx],
        idx: idx,
      };
    })
    .sort((a, b) => {
      return b.probability - a.probability;
    })
    .slice(0, 1);
  console.log(top);

  pred.innerHTML = `${top[0].className}`;
  uploadBtn.style.display = "inline-block";
  idx = top[0].idx;
  console.log(idx);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let data = new FormData(event.target);
  console.log(data);
  console.log(data.get("image"));
  console.log(data.get("image").name);
  console.log(data.get("image").stream());
  console.log(idx);
  data.set(
    "image",
    data.get("image"),
    `${idx}-${userId}-${data.get("image").name}`
  );
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
