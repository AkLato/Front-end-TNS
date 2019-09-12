// vytvořit základní položku do tabulky s uživateli
function populateList() {
  var table = document.getElementById("userObject");
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell1.innerHTML = "user 1";
  cell2.innerHTML = "user12";
  cell3.innerHTML = "admin";
  cell4.innerHTML = "651644";
  cell5.innerHTML = `<a onClick='onEdit(this)'>Editovat</a>
                         <a onClick='onDelete(this)'>Smazat</a>`;
}
populateList();

// reset vybrané řady
var selectedRow = null;

// odeslat nová data (přes tlačítko odeslat), jestli řada prázdná, vložit nový record, jestli ne tak update record
function onFormSubmit() {
  var formData = readFormData();
  if (selectedRow == null) insertNewRecord(formData);
  else updateRecord(formData);
  // vyprázdnit formulář
  resetForm();
}

// update recordu, call přes input element, "oninput" sleduje každou změnu
function onFormUpdate() {
  var formData = readFormData();
  updateRecord(formData);
}

// pobrat data z tabulky
function readFormData() {
  var formData = {};
  formData["userName"] = document.getElementById("userName").value;
  formData["loginName"] = document.getElementById("loginName").value;
  formData["userRole"] = document.getElementById("userRole").value;
  formData["adAccount"] = document.getElementById("adAccount").value;
  return formData;
}

// vložit data do tabulky
function insertNewRecord(data) {
  // vybrat kam vkládat
  var table = document
    .getElementById("userList")
    .getElementsByTagName("tbody")[0];
  // logika pro select - option elementy
  var select = document.getElementById("userRole");
  var selectedValue = select[select.selectedIndex].value;
  // vkládání nové řady a buňek do ní
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.userName;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.loginName;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = selectedValue;
  cell3 = newRow.insertCell(3);
  cell3.innerHTML = data.adAccount;
  // v 5. buňce přidat odkaz na edit a smazání při kliknutí
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<a onClick='onEdit(this)'>Editovat</a>
                       <a onClick='onDelete(this)'>Smazat</a>`;
}

// vyprázdnit pole
function resetForm() {
  document.getElementById("userName").value = "";
  document.getElementById("loginName").value = "";
  document.getElementById("adAccount").value = "";
}

// edit state
function onEdit(td) {
  // posunout se o dvě úrovně z 'td' elementu
  selectedRow = td.parentElement.parentElement;
  // vybrat html co je uvnitř elementu
  document.getElementById("userName").value = selectedRow.cells[0].innerHTML;
  document.getElementById("loginName").value = selectedRow.cells[1].innerHTML;
  document.getElementById("userRole").value = selectedRow.cells[2].innerHTML;
  document.getElementById("adAccount").value = selectedRow.cells[3].innerHTML;
}

// aktualizace recordu, nahradit html upravenými údaji
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.userName;
  selectedRow.cells[1].innerHTML = formData.loginName;
  selectedRow.cells[2].innerHTML = formData.userRole;
  selectedRow.cells[3].innerHTML = formData.adAccount;
}

// smazat record, modal s potvrzením
function onDelete(td) {
  if (confirm("Jste si jistí?")) {
    row = td.parentElement.parentElement;
    document.getElementById("userList").deleteRow(row.rowIndex);
    resetForm();
  }
}

// array s aktivitama
var activities = [
  "Log in",
  "Did some stuff",
  "Timeout",
  "Log in",
  "Settings update",
  "Created log"
];
var str = "<ul>";

// pro každou aktivitu přidat 'li' element do 'ul' listu
activities.forEach(function(activity) {
  str += "<li>" + activity + "</li>";
});

str += "</ul>";
document.getElementById("activityList").innerHTML = str;
