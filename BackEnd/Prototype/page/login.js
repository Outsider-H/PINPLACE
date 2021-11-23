console.log("Hello world");
const test = document.querySelector(".btn");

test.addEventListener("click", () => {
  const id = document.querySelector(".id");
  const pw = document.querySelector(".pw");
  /* console.log(id.value);
  console.log(pw.value);
  console.log("click"); */
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/loginquery");

  xhr.onreadystatechange = () => {
    console.log(xhr.response);
    //Redirect
    location.href = `/main?auth=${xhr.response}&id=${id.value}`;
  };

  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`id=${id.value}&password=${pw.value}`);
});
