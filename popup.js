const firstBtn = document.getElementsByTagName("button")[0];
const input = document.getElementsByTagName("input")[0];

const copyText = async () => {
  console.log(input.value);

  try {
    await navigator.clipboard.writeText(input.value);
    // Alert the copied text
    alert(`Copied Text! - ${input.value}`);
  } catch (err) {
    console.error(`Failed to Copy - ${err}`);
    alert(`Failed to Copy - ${err}`);
  }
};

firstBtn.addEventListener("click", copyText);