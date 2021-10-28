const PORT = 8899;
const xhr = new XMLHttpRequest();
xhr.open("GET", `http://localhost:${PORT}/textload`);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send();

xhr.onreadystatechange = () => {
  console.log(xhr.response);
  document.querySelector(".body").innerHTML = xhr.response;
};
