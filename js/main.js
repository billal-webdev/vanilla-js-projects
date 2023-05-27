//Calculation function
function getAreaOfTriangle(b, h) {
  return 0.5 * b * h;
}

function getAreaOfRectangle(w, l) {
  return w * l;
}

function getAreaOfPeralellogram(b, h) {
  return b * h;
}

function getAreaOfRhombus(d1, d2) {
  return 0.5 * d1 * d2;
}

function getAreaOfPentagon(p, b) {
  return 0.5 * p * b;
}

function getAreaOfEllipse(a, b) {
  const totalArea = 3.14 * a * b;
  return totalArea.toFixed(2);
}

//Event Handler for delete icon
let table = document.getElementById("tBody");
function deleteCal(event) {
  const deleteableTR = event.target.parentNode.parentNode;
  const isDelete = confirm("Are you sure to delete ?");
  if (isDelete) {
    table.removeChild(deleteableTR);
  }
}

//Event Handler for converting centimeter to meter
function centimeterToMeter(btn) {
  const clickedBtn = btn;
  const calculatedValueElement = clickedBtn.parentNode.children[2].children[0];
  const calculatedUnitElement = clickedBtn.parentNode.children[2].children[1];
  const calculatedValue = parseFloat(
    clickedBtn.parentNode.children[2].children[0].innerText
  );

  const buttonUnitElement = clickedBtn.children[0].children[1];

  if (buttonUnitElement.innerText === "m") {
    const meter = calculatedValue / 100;
    calculatedValueElement.innerText = meter.toFixed(2);
    calculatedUnitElement.innerText = "m";
    buttonUnitElement.innerText = "cm";
  } else {
    const centimeter = calculatedValue * 100;
    calculatedValueElement.innerText = parseInt(centimeter);
    calculatedUnitElement.innerHTML = "cm";
    buttonUnitElement.innerText = "m";
  }
}

//Event Delegation
let counter = 0;
function addNewCalculation(area, name) {
  //Create a new row
  const TR = `
    <tr>
            <td>${counter}.</td>
            <td>${name}</td>
            <td><span>${area}</span> <span>cm</span> <sup>2</sup> </td>
            <td onclick="centimeterToMeter(this)"><button><span>Convert to</span> <span>m</span> <sup>2</sup></button></td>
            <td onclick="deleteCal(event)"><i class="fa-solid fa-trash-can"></i></td>
    </tr>
    `;
  table.innerHTML += TR;
}

const cartsContainer = document.getElementById("carts-container");
const editIcon = document.getElementById("edit-icon");
cartsContainer.addEventListener("click", function (event) {
  //Toggle Input Elements
  if (
    event.target.tagName === "I" &&
    event.target.className === "fa-solid fa-check"
  ) {
    event.target.parentNode.parentNode.children[4].style.display = "none";
    event.target.parentNode.parentNode.children[5].style.display = "none";
    event.target.parentNode.parentNode.children[6].style.display = "none";
    event.target.parentNode.parentNode.children[7].style.display = "none";
    event.target.style.display = "none";
  } else if (
    event.target.tagName === "SPAN" &&
    event.target.className === "square"
  ) {
    event.target.innerHTML = '<i class="fa-solid fa-check"></i>';

    //Show the input fields
    event.target.parentNode.children[4].style.display = "inline-block";
    event.target.parentNode.children[5].style.display = "inline-block";
    event.target.parentNode.children[6].style.display = "inline-block";
    event.target.parentNode.children[7].style.display = "inline-block";
  }
  const iconClass = event.target.classList[1];

  //Edit the data into input fields
  if (iconClass === "fa-pen-to-square") {
    let field1 = event.target.parentNode.parentNode.children[4];
    let field2 = event.target.parentNode.parentNode.children[6];
    field1.style.display = "inline-block";
    field2.style.display = "inline-block";
    event.target.parentNode.parentNode.children[7].style.display =
      "inline-block";
    event.target.parentNode.parentNode.children[8].style.display =
      "inline-block";
    event.target.parentNode.parentNode.children[9].style.display =
      "inline-block";

    const value1 = event.target.parentNode.children[0].innerText;
    const value2 = event.target.parentNode.children[2].innerText;

    field1.value = value1;
    field2.value = value2;
  }
  if (event.target.innerText === "Calculate") {
    //Getting input fields value
    const inputValue1 = parseInt(event.target.parentNode.children[4].value);
    const inputValue2 = parseInt(event.target.parentNode.children[6].value);

    //check empty fields
    if (!inputValue1 || !inputValue2) {
      alert("Please input value");
      return;
    } else {
      const display1 = event.target.parentNode.children[3].children[0];
      const display2 = event.target.parentNode.children[3].children[2];
      display1.innerText = inputValue1;
      display2.innerText = inputValue2;

      //Reset the fields
      event.target.parentNode.children[4].value = "";
      event.target.parentNode.children[6].value = "";
    }

    //Increase serial number
    if (table.children.length) {
      counter++;
    } else {
      counter = 1;
    }

    //Get geometry name dynamically
    const targetGeometry = event.target.parentNode.children[1].innerText;

    if (targetGeometry === "Triangle") {
      const triangleArea = getAreaOfTriangle(inputValue1, inputValue2);
      addNewCalculation(triangleArea, "Triangle");
    } else if (targetGeometry === "Rectangle") {
      const rectangleArea = getAreaOfRectangle(inputValue1, inputValue2);
      addNewCalculation(rectangleArea, "Rectangle");
    } else if (targetGeometry === "Paralellogram") {
      const paralellogramArea = getAreaOfPeralellogram(
        inputValue1,
        inputValue2
      );
      addNewCalculation(paralellogramArea, "Paralellogram");
    } else if (targetGeometry === "Rhombus") {
      const rhombusArea = getAreaOfRhombus(inputValue1, inputValue2);
      addNewCalculation(rhombusArea, "Rhombus");
    } else if (targetGeometry === "Pentagon") {
      const pentagonArea = getAreaOfPentagon(inputValue1, inputValue2);
      addNewCalculation(pentagonArea, "Pentagon");
    } else if (targetGeometry === "Ellipse") {
      const ellipseArea = getAreaOfEllipse(inputValue1, inputValue2);
      addNewCalculation(ellipseArea, "Ellipse");
    }
  }
});

//Generate random number
function getRandomNumber() {
  const rand = Math.round(Math.random() * 10000);
  const strRand = rand + "";
  if (strRand.length === 4) {
    return parseInt(strRand);
  } else {
    return getRandomNumber();
  }
}

function randomNumberGenerator() {
  return getRandomNumber();
}
//Random Background Color for each cart when hovering mouse over
cartsContainer.addEventListener("mouseover", function (event) {
  const currentCart = event.target;
  if (currentCart.className === "cart") {
    currentCart.addEventListener("mouseenter", function (e) {
      const randomNum = randomNumberGenerator();
      currentCart.style = `background-color:#${randomNum};transform: scale(1.1, 1.1); border-radius: 0 60px 0 45px; transition: 0.5s`;
    });
    //Mouse out event listener
    currentCart.addEventListener("mouseout", function () {
      currentCart.style =
        "border-radius: 0 0 0 0; transform: scale(1, 1); transition: 0.5s";
    });
  } else if (
    currentCart.className === "geometry-img" ||
    currentCart.className === "inputed-data-display" ||
    currentCart.tagName === "H2" ||
    currentCart.tagName === "INPUT" ||
    currentCart.tagName === "BUTTON"
  ) {
    const randomNum = randomNumberGenerator();
    currentCart.parentElement.style = `background-color:#${randomNum};transform: scale(1.1, 1.1); border-radius: 0 60px 0 45px; transition: 0.5s`;
  }
});