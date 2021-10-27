console.log("God this works finally");
const queryString = window.location.search;
console.log(queryString);
const urlParam = new URLSearchParams(queryString);
const uid = urlParam.get("auth");
const id = urlParam.get("id");
console.log(uid);
console.log(id);

let model;
const loadModel = async () => {
  //model = await tf.loadLayersModel("model/mobilenet/model.json");
  model = await tf.loadLayersModel("model/place/model.json");
};
loadModel();

const intro = document.createElement("h1");
intro.innerHTML = `Hello ${id}`;
header = document.querySelector(".header");
header.appendChild(intro);

const imgSelector = document.querySelector("#imgIn");
const predict = document.querySelector(".predict");
imgSelector.addEventListener("change", () => {
  document.querySelector(".emptybox").innerHTML = "";
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    let dataURL = reader.result;
    console.log(dataURL);
    let img = document.createElement("img");
    img.style.height = "200px";
    img.src = dataURL;
    img.classList.add("curImg");
    console.log(img);
    document.querySelector(".emptybox").appendChild(img);
  });
  let file = imgSelector.files[0];
  reader.readAsDataURL(file);
});
predict.addEventListener("click", async () => {
  let img = document.querySelector(".curImg");
  let selected = img;
  const preprocess = (img) => {
    let tensor = tf.browser
      .fromPixels(img)
      .resizeNearestNeighbor([128, 128]) //224 224 for mobilenet
      .toFloat();
    let offset = tf.scalar(127.5);
    // return tensor.sub(offset).div(offset).expandDims();
    return tensor.div(255).expandDims();
    // let meanImageNetRGB = tf.tensor1d([123.68, 116.779, 103.939]);
    // return tensor.sub(meanImageNetRGB).reverse(2).expandDims();
  };
  let tensor = preprocess(selected);
  console.log(tensor);

  let prediction = await model.predict(tensor).data();
  console.log(prediction);
  let top5 = Array.from(prediction)
    .map((prob, idx) => {
      return {
        probability: prob,
        className: IMAGENET_CLASSES2[idx],
      };
    })
    .sort((a, b) => {
      return b.probability - a.probability;
    })
    .slice(0, 5);
  console.log(top5);
  const pred = document.querySelector(".predictions");
  pred.innerHTML = "";
  const list = document.createElement("ul");
  top5.forEach((elem) => {
    const element = document.createElement("li");
    element.innerHTML = `${elem.className}: ${elem.probability}`;
    list.appendChild(element);
  });
  pred.appendChild(list);
});
