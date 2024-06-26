document.addEventListener("DOMContentLoaded", () => {
  // toogle
  let buttons = document.getElementsByClassName("toggle-state");
  let arr = [...buttons];
  let theme = localStorage.getItem("theme");
  if (theme == null) {
    localStorage.setItem("theme", "root");
  }
  let toogle = document.getElementById(theme);
  toogle.style.opacity = "1";
  document.documentElement.setAttribute("data-theme", theme);

  arr.forEach((element, index) => {
    element.addEventListener("click", () => {
      element.style.opacity = "1";
      if (element.id == "root") {
        localStorage.setItem("theme", "root");
        document.documentElement.setAttribute("data-theme", "root");
      } else if (element.id == "two") {
        localStorage.setItem("theme", "two");
        document.documentElement.setAttribute("data-theme", "two");
      } else {
        localStorage.setItem("theme", "three");
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
});

// calculator
let finish = false;
const display = (value) => {
  let x = document.getElementById("display");
  let currentValue = x.value; //value display
  let lastChar = currentValue[currentValue.length - 1]; //karakter terakhir di display

  if (
    currentValue === "Syntax Error" ||
    currentValue === "Infinity" ||
    currentValue === "NaN" ||
    finish === true
  ) {
    finish = false;
    x.value = "";
    currentValue = "";
  }

  // apakah input adalah angka
  if (/[0-9]/.test(value)) {
    x.value += value;
    // apakah input adalah aritmatika
  } else if (
    /[*/+\-.]/.test(value) &&
    currentValue.length > 0 &&
    currentValue !== "Syntax Error" &&
    currentValue !== "Infinity" &&
    currentValue !== "NaN"
  ) {
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
  //jika display error
  x === "Syntax Error" || x === "Infinity" || x === "NaN"
    ? reset()
    : (document.getElementById("display").value = x.slice(0, -1));
};

const calculate = () => {
  let x = document.getElementById("display").value;
  if (x == "") {
    return;
  }
  try {
    let y = eval(x);
    document.getElementById("display").value = y;
  } catch (e) {
    if (e instanceof SyntaxError) {
      document.getElementById("display").value = "Syntax Error";
    }
  }

  finish = true;
};
