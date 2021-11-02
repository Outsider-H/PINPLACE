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
    //Redirect
    location.href = `/index.html`;
  };
});
