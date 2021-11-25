const form = document.querySelector(".loginform");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(e.target);
  //   console.log(data.get("user"), data.get("pass"));
  //   data.set("login", data.get("user"));
  //   data.append("test", "test");
  console.log(data);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/sql/login");
  xhr.onload = () => {
    console.log(xhr.response);
    const json = JSON.parse(xhr.response);
    console.log(json["userId"]);
    sessionStorage.setItem("userId", json["userId"]);
    localStorage.setItem("userId", json["userId"]);
    location.href = "./main.html";
  };
  //   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  console.log(data.get("login"));
  xhr.send(data);
});
