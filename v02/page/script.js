let model;
const loadModel = async () => {
  model = await tf.loadLayersModel("./model/place/model.json");
};
loadModel();

const imgSelector = document.querySelector("#img");
const predictBtn = document.querySelector(".predict");
const pred = document.querySelector(".result");

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
      };
    })
    .sort((a, b) => {
      return b.probability - a.probability;
    })
    .slice(0, 1);
  console.log(top);


  pred.innerHTML = `${top[0].className}`;
});

