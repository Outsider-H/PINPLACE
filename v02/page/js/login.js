console.log("Hello world");
const test = document.querySelector("#login-button");

test.addEventListener("click", () => {
  const id = document.querySelector("#login-id");
  const pw = document.querySelector("#login-pw");
  /* console.log(id.value);
  console.log(pw.value);
  console.log("click"); */
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/loginquery");

  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`id=${id.value}&password=${pw.value}`);
  xhr.onreadystatechange = () => {
    console.log(xhr.response);
    const json = JSON.parse(xhr.response);
    console.log(json.success);

    if (json.success) {
      console.log("Success");
      sessionStorage.setItem("userId", json.uid);
      localStorage.setItem("userId", json.uid);
      location.href = "/predict.html";
    } else {
      console.log(`${json.statement}`);
      alert(json.statement);
    }
    //Redirect
    // location.href = `/predict.html`;
  };
});
