// Selectors
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
  toast.innerText = `Copied Text! - "${text}"`;
  toast.classList.add("show-toast");
  toastCtn.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
};

const addRow = () => {
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
  // copyBtn.innerHTML = `<i class="fas fa-check"></li>`;
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("del-btn");
  itemDiv.appendChild(deleteBtn);
  // Append to list
  snippetList.appendChild(itemDiv);
  // Clear out input field
  document.getElementById("addInput").value = "";
};

const rowBtnHandler = (e) => {
  // console.log(e.target); // <button class="del-btn">Delete</button>
  const item = e.target;

  if (item.classList[0] === "del-btn") {
    const parent = item.parentElement;
    parent.remove();
  }

  if (item.classList[0] === "copy-btn") {
    const snippet = item.previousSibling.textContent;
    copyText(snippet);
  }
};

// Event Listeners
addBtn.addEventListener("click", addRow);
snippetList.addEventListener("click", rowBtnHandler);
