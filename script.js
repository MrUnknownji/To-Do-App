let progressList = document.querySelector(".progress-list");
let completedList = document.querySelector(".completed-list");
let taskArray = [];

function addTaskButtonClickHandler() {
  let newTaskInputField = document.getElementById("task-input");
  let newTask = newTaskInputField.value;
  if (newTask == "" || newTask == null || taskArray.includes(newTask)) {
    alert("Enter a valid input");
    return;
  } else {
    let listItem = document.createElement("li");
    let listText = document.createTextNode(`${newTask}`);
    let uncheckedButton = document.createElement("span");
    uncheckedButton.classList.add(
      "material-symbols-rounded",
      "unchecked-button"
    );
    let uncheckedBoxText = document.createTextNode("radio_button_unchecked");
    uncheckedButton.appendChild(uncheckedBoxText);
    let fontTag = document.createElement("font");
    fontTag.appendChild(listText);
    let iconsDiv = document.createElement("div");
    iconsDiv.classList.add("edit-delete-icons-container");
    let editButton = document.createElement("span");
    editButton.classList.add("material-symbols-rounded", "edit-button");
    let editText = document.createTextNode("edit");
    editButton.appendChild(editText);
    let deleteButton = document.createElement("span");
    deleteButton.classList.add("material-symbols-rounded", "delete-button");
    let deleteText = document.createTextNode("delete");
    deleteButton.appendChild(deleteText);

    listItem.appendChild(uncheckedButton);

    listItem.appendChild(fontTag);
    iconsDiv.appendChild(editButton);
    iconsDiv.appendChild(deleteButton);
    listItem.appendChild(iconsDiv);
    progressList.appendChild(listItem);
    newTaskInputField.value = "";

    deleteButton.addEventListener("click", () =>
      deleteElement(listItem, newTask)
    );
    editButton.addEventListener("click", (e) =>
      editButtonClickHandler(e.target)
    );
    uncheckedButton.addEventListener("click", () =>
      uncheckedButtonClickHandler(listItem)
    );
  }
  taskArray.push(newTask);
}

function deleteElement(element, newTask) {
  element.remove();
  let tempArray = [];
  taskArray.forEach((element) => {
    if (element != newTask) {
      tempArray.push(element);
    }
  });
  taskArray = tempArray;
}

function editButtonClickHandler(e) {
  const innerTexts = e.parentNode.parentNode.innerText.split("\n");

  let listItem = document.createElement("li");
  listItem.classList.add("inner-list");
  let inputField = document.createElement("input");
  inputField.classList.add("list-item-edit-box");
  let saveButton = document.createElement("span");
  saveButton.classList.add("material-symbols-rounded", "save-edits-button");
  let checkText = document.createTextNode("check");
  saveButton.appendChild(checkText);
  let cancleButton = document.createElement("span");
  cancleButton.classList.add("material-symbols-rounded", "cancle-edits-button");
  let closeText = document.createTextNode("close");
  cancleButton.appendChild(closeText);
  listItem.appendChild(inputField);
  listItem.appendChild(saveButton);
  listItem.appendChild(cancleButton);

  let parentLi = e.closest("li");
  parentLi.appendChild(listItem);
  inputField.value = innerTexts[1];

  parentLi.style.visibility = "hidden";
  listItem.style.visibility = "visible";

  saveButton.addEventListener("click", () =>
    saveButtonClickHandler(inputField, parentLi)
  );
  cancleButton.addEventListener("click", () =>
    cancleButtonClickHandler(inputField, parentLi)
  );
}

function uncheckedButtonClickHandler(item) {
  item.style.display = "none";
  let listItem = document.createElement("li");
  let listText = document.createTextNode(item.children[1].innerText);
  let checkedButton = document.createElement("span");
  checkedButton.classList.add("material-symbols-rounded", "checked-button");
  let checkedBoxText = document.createTextNode("task_alt");
  checkedButton.appendChild(checkedBoxText);
  let fontTag = document.createElement("strike");
  fontTag.appendChild(listText);
  let deleteButton = document.createElement("span");
  deleteButton.classList.add("material-symbols-rounded", "delete-button");
  let deleteText = document.createTextNode("delete");
  deleteButton.appendChild(deleteText);
  listItem.appendChild(checkedButton);
  listItem.appendChild(fontTag);
  listItem.appendChild(deleteButton);
  completedList.appendChild(listItem);

  deleteButton.addEventListener("click", () => deleteElement(listItem));
  checkedButton.addEventListener("click", () =>
    checkedButtonClickHandler(listItem, item)
  );
}

function saveButtonClickHandler(inputField, parentLi) {
  if (inputField.value == "") {
    deleteElement(parentLi);
    alert("Empty task deleted automatically ");
    return;
  }

  let updatedText = document.createTextNode(inputField.value);
  parentLi.children[1].innerText = updatedText.nodeValue;
  inputField.parentNode.style.display = "none";
  parentLi.style.visibility = "visible";
}

function cancleButtonClickHandler(inputField, parentLi) {
  parentLi.style.visibility = "visible";
  inputField.parentNode.style.display = "none";
}

function checkedButtonClickHandler(completedTaskItem, progressTaskItem) {
  deleteElement(completedTaskItem);
  progressTaskItem.style.display = "flex";
}
