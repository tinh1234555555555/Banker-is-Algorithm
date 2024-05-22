let savedNumber1;
let savedNumber2;
let n_click = true;
let n;
let m;
var click = 0;
let matrix_allo = [
  [1, 2, 3],
  [4, 1, 6],
  [7, 3, 9],
];
let matrix_max = [
  [3, 2, 9],
  [18, 5, 8],
  [10, 8, 9],
];
let matrix_avai = [18, 18, 18];

function CalculateAvailableM() {
  m = Number(m);
  n = Number(n);
  a = "";
  b = "";
  c = "";

  const elements_mat1 = document.querySelectorAll(".NeedElement");
  const elements_mat2 = document.querySelectorAll(".allocation_item");
  const elements_mat3 = document.querySelectorAll(".available_item");

  for (var j = 0; j < elements_mat1.length; j++) {
    a += elements_mat1[j].value;
    a += ",";
  }
  for (var j = 0; j < elements_mat2.length; j++) {
    b += elements_mat2[j].value;
    b += ",";
  }
  for (var j = 0; j < elements_mat3.length; j++) {
    c += elements_mat3[j].value;
    c += ",";
  }

  arr1 = a.split(",");
  arr2 = b.split(",");
  arr3 = c.split(",");

  var need = new Array(n);
  for (var i = 0; i < n; i++) {
    need[i] = new Array(m);
  }

  var h = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      need[i][j] = Number(arr1[h++]);
    }
  }
  var allocation = new Array(n);
  for (var i = 0; i < n; i++) {
    allocation[i] = new Array(m);
  }
  var h = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      allocation[i][j] = Number(arr2[h++]);
    }
  }

  var available = new Array(Number(n) + 1);
  for (var i = 0; i <= n; i++) {
    available[i] = new Array(3);
  }
  var nn = 0;
  for (var i = 0; i <= n; i++) {
    for (var j = 0; j < m; j++) {
      available[i][j] = Number(arr3[nn++]);
    }
  }

  var ans = new Array(n);
  var flag = new Array(n);
  for (var i = 0; i < n; i++) {
    flag[i] = Number(document.getElementById("flag" + i).value);
    ans[i] = Number(document.getElementById("ans" + i).value);
  }

  var ind = 0;
  var done = 0;
  for (k = 0; k < n; k++) {
    for (i = 0; i < n; i++) {
      if (flag[i] == 0) {
        let f = 0;

        for (j = 0; j < m; j++) {
          if (need[i][j] > available[done][j]) {
            f = 1;
            break;
          }
        }
        if (f == 0) {
          done += 1;

          ans[ind++] = i;
          console.log(i);

          for (y = 0; y < m; y++) {
            document.getElementById("Avai" + done + y).value = Number(
              available[done - 1][y] + allocation[i][y]
            );

            document.getElementById("Avai" + done + y).style.background =
              "pink";

            document.getElementById("Avai" + (done - 1) + y).style.background =
              "yellow";
            document.getElementById("Need" + i + y).style.background = "yellow";
            document.getElementById("Aloc" + i + y).style.background = "orange";
          }
          flag[i] = 1;
        }
      }
    }
  }

  click += 1;
  tooltip.textContent = "Click " + (n - click) + " times to see the result";
  if (click == n) {
    document.getElementById("ProcessVisualBtnb").remove();
    tooltip.classList.remove("show");
    document.getElementById(
      "showBlock"
    ).innerHTML += `<button id="showBlockBtn">    Output    </button>`;

    document.getElementById("showBlock").hidden = false;

    for (var i = 0; i < n; i++) {
      if (ans[i] == 1000) {
        var safe = false;
        break;
      }
    }

    if (safe == false) {
      document.getElementById("safe_seq").innerHTML += "Deadlock!";
    } else {
      document.getElementById("safe_seq").innerHTML +=
        "Safe Sequence is: P" + ans[0];
      for (var i = 1; i < n; i++) {
        document.getElementById("safe_seq").innerHTML += " &rarr; P" + ans[i];
      }
    }
  }
}

function InputBlock() {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      document.getElementById("Aloc" + i + j).disabled = true;
      document.getElementById("Max" + i + j).disabled = true;
    }
  }
  for (var i = 0; i < m; i++) {
    document.getElementById("Avai0" + i).disabled = true;
  }
}

function CalculateNeedM() {
  let html5 =
    "<div class='need' id='need'><table border='2'><tr><th colspan='" +
    String(m + 1) +
    "'>Need</th></tr><tr><td></td>";

  let capital_letters = 65;
  for (var i = 0; i < m; i++) {
    html5 +=
      "<td style = '    padding-left: 26px;    '>" +
      String.fromCharCode(capital_letters) +
      "</td>";
    capital_letters++;
  }

  html5 += "</tr>";

  for (var i = 0; i < n; i++) {
    html5 += "<tr><td>P" + i + "</td>";
    for (var j = 0; j < m; j++) {
      html5 +=
        "<td><input class='NeedElement' id='Need" +
        i +
        j +
        "' type='number' value = " +
        Number(
          Number(document.getElementById("Max" + i + j).value) -
            Number(document.getElementById("Aloc" + i + j).value)
        ) +
        " min='0' style='width:50px; height: 20px; text-align:center' disabled/></td>";
    }
    html5 += "</tr></div>";
  }

  NeedM.innerHTML = html5;
  document.getElementById("NeedMatrixBtnb").style.visibility = "hidden";

  document.getElementById(
    "ProcessVisualBtn"
  ).innerHTML += `<button id="ProcessVisualBtnb" onclick="CalculateAvailableM();" >Start Process</button>`;
  tooltip.textContent = "Click " + (n - click) + " times to see the result";

  setTimeout(function () {
    document.getElementById("NeedM").classList.add("show");
  }, 50);
}

function checkTables() {
  number = 0;

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      if (document.getElementById("Aloc" + i + j).value === "") {
        alert(
          "The data in cell " + i + " " + j + " of table Allocation is invalid"
        );
        document.getElementById("Aloc" + i + j).value = "";
        document.getElementById("Aloc" + i + j).focus();
        return;
      }
      number = Number(document.getElementById("Aloc" + i + j).value);

      if (Number.isInteger(number) && number > -1) {
      } else {
        alert(
          "The data in cell " + i + " " + j + " of table Allocation is invalid"
        );
        document.getElementById("Aloc" + i + j).value = "";
        document.getElementById("Aloc" + i + j).focus();
        return;
      }

      if (document.getElementById("Max" + i + j).value === "") {
        alert("The data in cell " + i + " " + j + " of table Max is invalid");
        document.getElementById("Max" + i + j).value = "";
        document.getElementById("Max" + i + j).focus();
        return;
      }
      number = Number(document.getElementById("Max" + i + j).value);
      if (Number.isInteger(number) && number > -1) {
      } else {
        alert("The data in cell " + i + " " + j + " of table Max is invalid");
        document.getElementById("Max" + i + j).value = "";
        document.getElementById("Max" + i + j).focus();

        return;
      }

      if (
        Number(document.getElementById("Max" + i + j).value) <
        Number(document.getElementById("Aloc" + i + j).value)
      ) {
        alert(
          "The amount of resources occupied cannot be greater than the maximum required resources, cell " +
            i +
            " " +
            j
        );
        document.getElementById("Aloc" + i + j).value = "";
        document.getElementById("Max" + i + j).value = "";
        document.getElementById("Aloc" + i + j).focus();
        return;
      }
    }
  }

  for (var i = 0; i < m; i++) {
    if (document.getElementById("Avai0" + i).value === "") {
      alert("The data in cell 0 " + i + " of table Available is invalid");
      document.getElementById("Avai0" + i).value = "";
      document.getElementById("Avai0" + i).focus();

      return;
    }
    number = Number(document.getElementById("Avai0" + i).value);
    if (Number.isInteger(number) && number > -1) {
    } else {
      alert("The data in cell 0 " + i + " of table Available is invalid");
      document.getElementById("Avai0" + i).value = "";
      document.getElementById("Avai0" + i).focus();

      return;
    }
  }

  InputBlock();
  CalculateNeedM();
}
function generateAllocation(n, m) {
  let html2 =
    "<div class='allocation' id='allocation'><table border='2'><tr><th colspan='" +
    String(m + 1) +
    "'>Allocation</th></tr><tr><td></td>";

  let capital_letters = 65;
  for (var i = 0; i < m; i++) {
    html2 +=
      "<td style = '    padding-left: 26px;    '>" +
      String.fromCharCode(capital_letters) +
      "</td>";
    capital_letters++;
  }

  html2 += "</tr>";
  if (n === 3 && m === 3) {
    for (var i = 0; i < n; i++) {
      html2 += "<tr><td>P" + i + "</td>";
      for (var j = 0; j < m; j++) {
        html2 +=
          "<td><input class='allocation_item' id='Aloc" +
          i +
          j +
          "' type='number' value = " +
          matrix_allo[i][j] +
          " min='0' style='width:50px; height: 20px; text-align:center'/></td>";
      }
      html2 += "</tr></div>";
    }
  } else {
    for (var i = 0; i < n; i++) {
      html2 += "<tr><td>P" + i + "</td>";
      for (var j = 0; j < m; j++) {
        html2 +=
          "<td><input class='allocation_item' id='Aloc" +
          i +
          j +
          "' type='number' value = " +
          " min='0' style='width:50px; height: 20px; text-align:center'/></td>";
      }
      html2 += "</tr></div>";
    }
  }
  alloctionM.innerHTML = html2;
}
function generateMaximum(n, m) {
  let html3 =
    "<div class='max' id = 'max'><table border='2'><tr><th colspan='" +
    String(m + 1) +
    "'>Max</th></tr><tr><td></td>";

  let capital_letters = 65;
  for (var i = 0; i < m; i++) {
    html3 +=
      "<td style = '    padding-left: 26px;    '>" +
      String.fromCharCode(capital_letters) +
      "</td>";
    capital_letters++;
  }

  html3 += "</tr>";
  if (n === 3 && m === 3) {
    for (var i = 0; i < n; i++) {
      html3 += "<tr><td>P" + i + "</td>";
      for (var j = 0; j < m; j++) {
        html3 +=
          "<td><input class='elements_mat1' id='Max" +
          i +
          j +
          "' type='number' value = " +
          matrix_max[i][j] +
          " min='0' style='width:50px; height: 20px; text-align:center'/></td>";
      }
      html3 += "</tr></div>";
    }
  } else {
    for (var i = 0; i < n; i++) {
      html3 += "<tr><td>P" + i + "</td>";
      for (var j = 0; j < m; j++) {
        html3 +=
          "<td><input class='elements_mat1' id='Max" +
          i +
          j +
          "' type='number' value = " +
          " min='0' style='width:50px; height: 20px; text-align:center'/></td>";
      }
      html3 += "</tr></div>";
    }
  }
  maximumM.innerHTML = html3;
}

function generateAvailable(m) {
  let html4 =
    "<div class='available' id='available'><table border='2'><tr><th colspan='" +
    String(m + 1) +
    "'>Available</th></tr><tr>";

  let capital_letters = 65;
  for (var i = 0; i < m; i++) {
    html4 +=
      "<td style = '    padding-left: 26px;    '>" +
      String.fromCharCode(capital_letters) +
      "</td>";
    capital_letters++;
  }
  html4 += "</tr><tr>";

  if (n === 3 && m === 3) {
    for (var i = 0; i < m; i++) {
      html4 +=
        "<td><input class='available_item' id='Avai0" +
        i +
        "' type='number' value = " +
        matrix_avai[i] +
        " min='0' style='width:50px; height: 20px; text-align:center'/></td>";
    }
  } else {
    for (var i = 0; i < m; i++) {
      html4 +=
        "<td><input class='available_item' id='Avai0" +
        i +
        "' type='number' value = " +
        " min='0' style='width:50px; height: 20px; text-align:center'/></td>";
    }
  }
  html4 += "</tr><tr>";
  for (var i = 1; i <= n; i++) {
    for (var j = 0; j < m; j++) {
      html4 +=
        "<td><input class='available_item' id='Avai" +
        i +
        j +
        "' type='number' value = " +
        " min='0'  style='width:50px; height: 20px; text-align:center' disabled/></td>";
    }
    html4 += "</tr></div>";
  }
  availableA.innerHTML = html4;

  document.getElementById(
    "NeedMatrixBtn"
  ).innerHTML += `<button id="NeedMatrixBtnb" onclick="checkTables();">Generate Need Matrix</button>`;
}

function flagAns(n) {
  var flag = new Array(n);
  var ans = new Array(n);
  for (var i = 0; i < n; i++) {
    flag[i] = 0;
    ans[i] = 1000;
  }
  var flagList = document.getElementById("flagList");
  var ansList = document.getElementById("ansList");
  var html6 = "";
  var html7 = "";
  for (var i = 0; i < n; i++) {
    html6 +=
      "<input class='flag_item' id='flag" +
      i +
      "' type='number' value = " +
      Number(flag[i]) +
      " min='0' style='width:50px; height: 20px; text-align:center'/>";
    html7 +=
      "<input class='ans_item' id='ans" +
      i +
      "' type='number' value = " +
      Number(ans[i]) +
      " min='0' style='width:50px; height: 20px; text-align:center'/>";
  }
  flagList.innerHTML = html6;
  ansList.innerHTML = html7;
}

let alloctionM = document.getElementById("alloctionM");
let NeedM = document.getElementById("NeedM");
let maximumM = document.getElementById("maximumM");
let availableA = document.getElementById("availableA");

function errorGenerator() {
  click = 0;
  alloctionM.innerHTML = "";
  maximumM.innerHTML = "";
  availableA.innerHTML = "";
  NeedM.innerHTML = "";
  generateAllocation(n, m);
  generateMaximum(n, m);
  generateAvailable(m);
  Request_Ma(n, m);

  setTimeout(function () {
    document.getElementById("alloctionM").classList.add("show");
    document.getElementById("maximumM").classList.add("show");
    document.getElementById("availableA").classList.add("show");
  }, 50);
  flagAns(n);
  document.getElementById("gen_btn").hidden = "true";
}

function Request_Ma(n, m) {
  let html8 =
    "<div class='request' id='request'><table border='2'><tr><th colspan='" +
    String(m + 1) +
    "'>Request</th></tr><tr><td></td>";

  let capital_letters = 65;
  for (var i = 0; i < m; i++) {
    html8 +=
      "<td style = '    padding-left: 26px;    '>" +
      String.fromCharCode(capital_letters) +
      "</td>";
    capital_letters++;
  }

  html8 += "</tr>";
  for (var i = 0; i < n; i++) {
    html8 += "<tr><td>P" + i + "</td>";
    for (var j = 0; j < m; j++) {
      html8 +=
        "<td><input class='allocation_item' id='Req" +
        i +
        j +
        "' type='number' value = " +
        0 +
        " min='0' style='width:50px; height: 20px; text-align:center'/></td>";
    }
    html8 += "</tr></div>";
  }
  RequestM.innerHTML = html8;
}

function request_appear() {
  document.getElementById("edit_btn").hidden = true;
  setTimeout(function () {
    document.getElementById("RequestM").classList.add("show");
  }, 50);
  var resultBlock = document.getElementById("resultBlock");
  setTimeout(function () {
    resultBlock.classList.remove("show");
  }, 50);
  document.getElementById("request_btn").hidden = true;

  document.getElementById("enforce_btn").hidden = false;

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      document.getElementById("Aloc" + i + j).style.background = "white";
      document.getElementById("Need" + i + j).style.background = "white";
      document.getElementById("Avai0" + j).style.background = "white";
      if (i > 0) {
        document.getElementById("Avai" + i + j).style.background = "white";
        document.getElementById("Avai" + i + j).value = "";
      }
      if (i === n - 1) {
        document.getElementById("Avai" + Number(i + 1) + j).style.background =
          "white";
        document.getElementById("Avai" + Number(i + 1) + j).value = "";
      }
    }
  }
}

function enforce_request() {
  document.getElementById("enforce_btn").hidden = true;
  document.getElementById("safe_seq").innerHTML = "";
  click = 0;
  document.getElementById(
    "ProcessVisualBtn"
  ).innerHTML += `<button id="ProcessVisualBtnb" onclick="CalculateAvailableM();" >Start Process</button>`;

  tooltip.textContent = "Click " + (n - click) + " times to see the result";
  var Allocation_Array = [];
  var Max_Array = [];
  var Need_Array = [];
  var Avaiable_Array = [];
  var sums = new Array(m).fill(0);
  var count = 0;

  for (var i = 0; i < n; i++) {
    Allocation_Array[i] = [];
    Max_Array[i] = [];
    Need_Array[i] = [];
    for (var j = 0; j < m; j++) {
      Allocation_Array[i][j] = Number(
        document.getElementById("Aloc" + i + j).value
      );
      Max_Array[i][j] = Number(document.getElementById("Max" + i + j).value);
      Need_Array[i][j] = Number(document.getElementById("Need" + i + j).value);
      Avaiable_Array[j] = Number(document.getElementById("Avai0" + j).value);
    }
  }

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      document.getElementById("Aloc" + i + j).value =
        Number(document.getElementById("Aloc" + i + j).value) +
        Number(document.getElementById("Req" + i + j).value);
      document.getElementById("Max" + i + j).value =
        Number(document.getElementById("Max" + i + j).value) -
        Number(document.getElementById("Req" + i + j).value);
      document.getElementById("Need" + i + j).value =
        Number(document.getElementById("Need" + i + j).value) -
        Number(document.getElementById("Req" + i + j).value);
      if (Number(document.getElementById("Need" + i + j).value) < 0) {
        alert("Stateless: Need >= Request");
        document.getElementById("enforce_btn").hidden = false;
        document.getElementById("ProcessVisualBtnb").remove();
        tooltip.classList.remove("show");
        for (var e = 0; e < n; e++) {
          for (var f = 0; f < m; f++) {
            document.getElementById("Aloc" + e + f).value =
              Allocation_Array[e][f];
            document.getElementById("Max" + e + f).value = Max_Array[e][f];
            document.getElementById("Need" + e + f).value = Need_Array[e][f];
            document.getElementById("Avai0" + f).value = Avaiable_Array[f];
          }
        }
        return;
      }
      if (count === 0) {
        count++;
        for (var k = 0; k < m; k++) {
          for (var l = 0; l < n; l++) {
            sums[k] += Number(document.getElementById("Req" + l + k).value);
          }
          document.getElementById("Avai0" + k).value =
            Number(document.getElementById("Avai0" + k).value) - sums[k];
          if (Number(document.getElementById("Avai0" + k).value) < 0) {
            alert("Stateless: Available >= Request");
            document.getElementById("enforce_btn").hidden = false;
            document.getElementById("ProcessVisualBtnb").remove();
            tooltip.classList.remove("show");
            for (var e = 0; e < n; e++) {
              for (var f = 0; f < m; f++) {
                document.getElementById("Aloc" + e + f).value =
                  Allocation_Array[e][f];
                document.getElementById("Max" + e + f).value = Max_Array[e][f];
                document.getElementById("Need" + e + f).value =
                  Need_Array[e][f];
                document.getElementById("Avai0" + f).value = Avaiable_Array[f];
              }
            }
            return;
          }
        }
      }
    }
  }
}

function openForm() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("formInput").style.display = "block";
  setTimeout(() => {
    document.getElementById("overlay").style.opacity = 1;
    document.getElementById("formInput").style.opacity = 1;
  }, 10);

  document.getElementById("processes_input").value = 3;
  document.getElementById("resources_input").value = 3;
}

function closeForm() {
  document.getElementById("overlay").style.opacity = 0;
  document.getElementById("formInput").style.opacity = 0;
  setTimeout(() => {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("formInput").style.display = "none";
  }, 500);
}

document.getElementById("openFormButton").addEventListener("click", openForm);

document
  .getElementById("completeButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const number1 = Number(document.getElementById("processes_input").value);
    const number2 = Number(document.getElementById("resources_input").value);

    if (
      Number.isInteger(number1) &&
      Number.isInteger(number2) &&
      number1 > 0 &&
      number2 > 0
    ) {
      savedNumber1 = number1;
      savedNumber2 = number2;
      closeForm();
    } else {
      alert(
        "Please enter valid integers greater than 0 for both processes and resources."
      );
      if (!Number.isInteger(number1) || number1 <= 0) {
        document.getElementById("processes_input").value = "";
        document.getElementById("processes_input").focus();
      } else {
        document.getElementById("resources_input").value = "";
        document.getElementById("resources_input").focus();
      }
    }

    n = savedNumber1;
    m = savedNumber2;
    tooltip.textContent = "Click " + (n - click) + " times to see the result";

    var box = document.getElementById("drawing-area");

    var currentWidth = box.offsetWidth;
    var currentHeight = box.offsetHeight;

    if (m * 90 * 5 + 3 * 6 + 5 * 22 > currentWidth) {
      box.style.width =
        currentWidth + (m * 100 * 5 + 3 * 6 + 5 * 22 - currentWidth) + "px";
      document.querySelector("header").style.width = box.style.width;
    }

    if ((n + 2) * 70 + 20 > currentHeight) {
      box.style.height =
        currentHeight + ((n + 2) * 85 + 20 - currentHeight) + "px";
    }

    document.getElementById("gen_btn").hidden = false;
    document.getElementById("openFormButton").hidden = true;
  });

document.getElementById("showBlock").addEventListener("click", function () {
  document.getElementById("showBlock").hidden = true;

  var resultBlock = document.getElementById("resultBlock");
  setTimeout(function () {
    resultBlock.classList.add("show");
  }, 50);

  document.getElementById("request_btn").hidden = false;
  document.getElementById("edit_btn").hidden = false;
});

function editfunc() {
  click = 0;
  document.getElementById("NeedMatrixBtnb").style.visibility = "visible";
  document.getElementById("safe_seq").innerHTML = "";

  setTimeout(function () {
    document.getElementById("NeedM").classList.remove("show");
    document.getElementById("resultBlock").classList.remove("show");
    document.getElementById("RequestM").classList.remove("show");
  }, 50);

  document.getElementById("edit_btn").hidden = true;
  document.getElementById("request_btn").hidden = true;
  for (var i = 1; i <= n; i++) {
    for (var j = 0; j < m; j++) {
      document.getElementById("Avai" + i + j).style.background = "white";
      document.getElementById("Avai" + i + j).value = "";
    }
  }

  for (var i = 0; i < m; i++) {
    document.getElementById("Avai0" + i).disabled = false;
  }

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      document.getElementById("Aloc" + i + j).style.background = "white";
      document.getElementById("Aloc" + i + j).disabled = false;
      document.getElementById("Max" + i + j).disabled = false;
      document.getElementById("Avai0" + j).style.background = "white";
    }
  }
}

document.getElementById("closeBtn").addEventListener("click", function () {
  setTimeout(function () {
    document.getElementById("alloctionM").classList.remove("show");
    document.getElementById("maximumM").classList.remove("show");
    document.getElementById("availableA").classList.remove("show");
    document.getElementById("NeedM").classList.remove("show");
    document.getElementById("RequestM").classList.remove("show");
  }, 50);
  var resultBlock = document.getElementById("resultBlock");
  setTimeout(function () {
    resultBlock.classList.remove("show");
  }, 50);

  setTimeout(function () {
    document.getElementById("details").innerHTML = "";
    document.getElementById("safe_seq").innerHTML = "";
    document.getElementById("ProcessVisualBtn").innerHTML = "";
    flagList.innerHTML = "";
    document.getElementById("NeedMatrixBtn").innerHTML = "";
    ansList.innerHTML = "";

    document.getElementById("edit_btn").hidden = true;
    document.getElementById("request_btn").hidden = true;
    restoreOriginalSize();
    document.getElementById("openFormButton").hidden = false;
  }, 2000);

  document.getElementById("processes_input").value = "";
  document.getElementById("resources_input").value = "";
});

function restoreOriginalSize() {
  setTimeout(function () {
    var box = document.getElementById("drawing-area");

    box.style.width = 100 + "vw";
    box.style.height = 100 + "vh";

    document.querySelector("header").style.width = 100 + "vw";

    alloctionM.innerHTML = "";
    maximumM.innerHTML = "";
    availableA.innerHTML = "";
    NeedM.innerHTML = "";
  }, 2000);
}

function goHome() {
  window.location.href = "index.html";
}

function openInstruction() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("formInstruction").style.display = "block";
  setTimeout(() => {
    document.getElementById("overlay").style.opacity = 1;
    document.getElementById("formInstruction").style.opacity = 1;
  }, 10);
}

function closeInstruction() {
  document.getElementById("overlay").style.opacity = 0;
  document.getElementById("formInstruction").style.opacity = 0;
  setTimeout(() => {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("formInstruction").style.display = "none";
  }, 500);
}

document.addEventListener("DOMContentLoaded", (event) => {
  const nut = document.getElementById("ProcessVisualBtn");
  const tooltip = document.getElementById("tooltip");

  nut.addEventListener("mouseover", (event) => {
    const rect = nut.getBoundingClientRect();
    tooltip.classList.add("show");
  });

  nut.addEventListener("mouseout", () => {
    tooltip.classList.remove("show");
  });
});
