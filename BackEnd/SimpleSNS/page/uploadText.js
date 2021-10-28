const PORT = 8899;
const userID = 1; //set default admin
const btn = document.querySelector(".post");
const content = document.querySelector(".content");
btn.addEventListener("click", () => {
  console.log("button clicked");
  console.log(content.value);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `http://localhost:${PORT}/textupload`);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`id=${userID}&content=${content.value}`);
  content.value = "";
  console.log("success");
});
