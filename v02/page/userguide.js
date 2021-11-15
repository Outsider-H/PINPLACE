// Cards
let card1 = document.getElementById("card1"),
card2 = document.getElementById("card2"),
card3 = document.getElementById("card3"),
card4 = document.getElementById("card4"),
card_length = document.querySelectorAll(".card");

// container
let container = document.getElementById("container");

// Card List
let card_list = [card1, card2, card3, card4];

// next function
let counter = 1;
function next() {
console.log("next:" + counter)
if (counter < card_length.length) {
    card_list[counter].classList.add("active");
    backgroundFunc(counter);
    counter += 1;
}
else {
    counter = card_length.length;
}
}

function prev() {
if (counter > 1) {
    card_list[counter - 1].classList.remove("active");
    counter -= 1;
}
else {
    counter = 1;
}
backgroundFunc(counter-1);
console.log("prev:" + counter)
}

// background function
function backgroundFunc(x) {
if (x == 0) {
    container.style.background = "linear-gradient(90deg, #2196f3 0%, rgb(31, 197, 181) 100%)";
}
else if (x == 1) {
    container.style.background = "linear-gradient(90deg, #47eaff 0%, #fff498 100%)";
}
else if (x == 2) {
    container.style.background = "linear-gradient(90deg, #ffcf86 0%, #ff5a4e 100%)";
}
else if (x == 3) {
    container.style.background = "linear-gradient(90deg, #b085fd 0%, rgb(249 195 191) 100%)";
}
}
