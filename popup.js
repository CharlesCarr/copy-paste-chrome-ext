// Variables/Selectors
let snippetsArr;
const addBtn = document.querySelector(".add-btn");
const toastCtn = document.querySelector(".toast-ctn");
const snippetList = document.getElementById("snippet-list");
let inputVal = document.getElementById("addInput");

// Functions
const copyText = async (text) => {
  console.log(text);
  try {
    await navigator.clipboard.writeText(text);
    // Alert the copied text
    // alert(`Copied Text! - ${text}`);
    displayToast(text);
  } catch (err) {
    console.error(`Failed to Copy - ${err}`);
    alert(`Failed to Copy - ${err}`);
  }
};

const displayToast = (text) => {
  const toast = document.createElement("h2");

  console.log(text.substring(0,4));

  if (text.substring(0, 5) === "Alert") {
    toast.innerText = text;
  } else {
    toast.innerText = `Copied Text! - "${text}"`;
  }

  toast.classList.add("show-toast");
  toastCtn.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
};

const addRow = () => {
  if (inputVal.value === "") {
    displayToast("Alert: Input Empty");
    return;
  }

  // Create Div
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("snippet-item");
  // Create li
  const newSnip = document.createElement("li");
  newSnip.classList.add("snippet-text");
  newSnip.innerText = inputVal.value;
  itemDiv.appendChild(newSnip);
  // Copy Btn
  const copyBtn = document.createElement("button");
  // copyBtn.innerHTML = `<i class="fas fa-check"></li>`;
  copyBtn.innerText = "Copy";
  copyBtn.classList.add("copy-btn");
  itemDiv.appendChild(copyBtn);
  // Delete Btn
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("del-btn");
  itemDiv.appendChild(deleteBtn);
  // Append to list
  snippetList.appendChild(itemDiv);
  // Add to local storage
  saveLocalSnippets(inputVal.value);
  // Clear out input field
  document.getElementById("addInput").value = "";
};

const rowBtnHandler = (e) => {
  // console.log(e.target); // <button class="del-btn">Delete</button>
  const item = e.target;
  console.log(item);

  if (item.classList[0] === "del-btn") {
    const parent = item.parentElement;
    const snipText = parent.firstChild.innerText;
    console.log("text", snipText);
    console.log(parent);
    console.log(parent.dataset.key);
    // remove from local storage
    // localStorage.removeItem(`Snip:${parent.dataset.key}`);
    removeLocalSnippets(parent);
    parent.remove();
  }

  if (item.classList[0] === "copy-btn") {
    const snippet = item.previousSibling.textContent;
    copyText(snippet);
  }
};

const saveLocalSnippets = (snippet) => {
  let snippets;
  if (!localStorage.getItem("snippets")) {
    snippets = [];
  } else {
    snippets = JSON.parse(localStorage.getItem("snippets"));
    console.log(snippets);
  }
  snippets.push(snippet);
  localStorage.setItem("snippets", JSON.stringify(snippets));
};

const getLocalSnippets = () => {
  let snippets;
  if (!localStorage.getItem("snippets")) {
    snippets = [];
  } else {
    snippets = JSON.parse(localStorage.getItem("snippets"));
    console.log(snippets);
  }
  snippets.forEach((snippet) => {
    // Create Div
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("snippet-item");
    // Create li
    const newSnip = document.createElement("li");
    newSnip.classList.add("snippet-text");
    newSnip.innerText = snippet;
    itemDiv.appendChild(newSnip);
    // Copy Btn
    const copyBtn = document.createElement("button");
    copyBtn.innerText = "Copy";
    copyBtn.classList.add("copy-btn");
    itemDiv.appendChild(copyBtn);
    // Delete Btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("del-btn");
    itemDiv.appendChild(deleteBtn);
    // Append to list
    snippetList.appendChild(itemDiv);
  });
};

const removeLocalSnippets = (snippet) => {
  let snippets;
  if (!localStorage.getItem("snippets")) {
    snippets = [];
  } else {
    snippets = JSON.parse(localStorage.getItem("snippets"));
    console.log(snippets);
  }
  const snippetIndex = snippet.children[0].innerText;
  snippets.splice(snippets.indexOf(snippetIndex), 1);
  localStorage.setItem("snippets", JSON.stringify(snippets));
};

// Event Listeners
document.addEventListener("DOMContentLoaded", getLocalSnippets);
addBtn.addEventListener("click", addRow);
snippetList.addEventListener("click", rowBtnHandler);
