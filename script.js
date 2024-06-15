// toogle
let buttons = document.getElementsByClassName("toggle-state");
let arr = [...buttons];

arr.forEach((element, index) => {
  element.addEventListener("click", () => {
    element.style.opacity = "1";
    console.log(element.id);
    if (element.id == "one") {
      document.documentElement.setAttribute("data-theme", "root");
    } else if (element.id == "two") {
      document.documentElement.setAttribute("data-theme", "two");
    } else {
      document.documentElement.setAttribute("data-theme", "three");
    }

    arr
      .filter(function (item) {
        return item != element;
      })
      .forEach((item) => {
        item.style.opacity = "0";
      });
  });
});

// calculator
const display = (value) => {
  let x = document.getElementById("display");
  let currentValue = x.value; //value display
  let lastChar = currentValue[currentValue.length - 1]; //karakter terakhir di display

  if (
    currentValue === "Syntax Error" ||
    currentValue === "Infinity" ||
    currentValue === "NaN"
  ) {
    x.value = "";
  }

  // apakah angka
  if (/[0-9]/.test(value)) {
    x.value += value;
    // apakah aritmatika
  } else if (/[*/+\-.]/.test(value) && currentValue.length > 0) {
    // apakah karakter terakhir bukan aritmatika
    if (!/[*/+\-.]/.test(lastChar)) {
      x.value += value;
    } else {
      // ganti aritmatika
      x.value = x.value.slice(0, -1) + value;
    }
  }

  return x;
};

const reset = () => {
  document.getElementById("display").value = "";
};

const deleted = () => {
  let x = document.getElementById("display").value;
  document.getElementById("display").value = x.slice(0, -1);
};

const calculate = () => {
  let x = document.getElementById("display").value;
  if (x == "") {
    return;
  }
  try {
    let y = eval(x);
    console.log(y);
    document.getElementById("display").value = y;
  } catch (e) {
    if (e instanceof SyntaxError) {
      document.getElementById("display").value = "Syntax Error";
    }
  }
};
