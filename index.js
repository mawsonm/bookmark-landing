const tabs = document.querySelectorAll(".tab");
console.log(tabs);

const rows = document.querySelectorAll(".row");
console.log(rows);

const form = document.querySelector(".email-form");

const errorMsg = document.querySelector(".error-text");

const content = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis.",
  "Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdie tVivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet.",
  "Sed consectetur quam id neque fermentum accumsan. Praesent luctus vestibulum dolor, ut condimentum urna vulputate eget. Cras in ligula quis est pharetra mattis sit amet pharetra purus. Sed sollicitudin ex et ultricies bibendum ",
  "Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat mi, at euismod dui. Aliquam vitae neque eget nisl gravida pellentesque non ut velit.",
];

function classHelper(num) {
  switch (num) {
    case 0:
      return ".first";
    case 1:
      return ".second";
    case 2:
      return ".third";
  }
}

function selectTab(evt) {
  if (evt.target.classList.contains("active")) {
    return;
  }

  let removedIndex = null;

  tabs.forEach((item, index) => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
      removedIndex = index;
    }
  });

  evt.target.classList.add("active");

  const index = [].indexOf.call(tabs, evt.target);
  const classToShow = classHelper(index);
  const showItems = document.querySelectorAll(classToShow);
  showItems.forEach((item) => {
    item.classList.remove("hide");
  });

  console.log(removedIndex);
  const classToHide = classHelper(removedIndex);
  const hideItems = document.querySelectorAll(classToHide);
  hideItems.forEach((item) => {
    item.classList.add("hide");
  });
}

tabs.forEach((item) => {
  item.addEventListener("click", selectTab);
});

function selectAccordion(evt) {
  console.log(evt);
  let element = evt.target.tagName;
  let row = evt.target;
  if (element != "DIV") {
    row = evt.target.parentNode;
  }

  if (row.classList.contains("selected")) {
    row.classList.remove("selected");
    row.nextSibling.remove();
  } else {
    console.log(rows);
    let removedIndex = null;
    rows.forEach((item, index) => {
      if (item.classList.contains("selected")) {
        item.classList.remove("selected");
        item.nextSibling.remove();
        removedIndex = index;
      }
    });
    row.classList.add("selected");
    const ind = [].indexOf.call(rows, row);
    console.log(ind);
    const paragraph = document.createElement("p");
    paragraph.innerText = content.at(ind);
    row.parentNode.insertBefore(paragraph, row.nextSibling);
  }
}

rows.forEach((item) => {
  item.addEventListener("click", selectAccordion);
});

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function submitHandler(e) {
  e.preventDefault();
  const isValid = validateEmail(form.elements["email"].value);
  if (isValid) {
    form.elements["email"].value = "";
    form.classList.remove("invalid");
    errorMsg.classList.remove("show");
    return;
  }
  form.classList.add("invalid");
  errorMsg.classList.add("show");
}

form.addEventListener("submit", submitHandler);
