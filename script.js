const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const bookmarkListSection = document.getElementById("bookmark-list-section");

const categoryDropdown = document.getElementById("category-dropdown");

const addBookmarkButton = document.getElementById("add-bookmark-button");
const closeFormButton = document.getElementById("close-form-button");
const addBookmarkButtonForm = document.getElementById("add-bookmark-button-form");

const viewCategoryButton = document.getElementById("view-category-button");
const closeListButton = document.getElementById("close-list-button");
const deleteBookmarkButton = document.getElementById("delete-bookmark-button");

const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");

const categoryList = document.getElementById("category-list");
const categoryNames = document.querySelectorAll(".category-name");

const getBookmarks = () => {
  try {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  if (!Array.isArray(bookmarks)) {
    return [];
  }

  const isValid = bookmarks.every(
    bookmark =>
    bookmark &&
    typeof bookmark === "object" &&
    "name" in bookmark &&
    "category" in bookmark &&
    "url" in bookmark
  ) 
  return isValid ? bookmarks : [];
  } catch {
    return [];
  }
  
};

const displayOrCloseForm = () => {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
};

const displayOrHideCategory = () => {
  mainSection.classList.toggle("hidden");
  bookmarkListSection.classList.toggle("hidden");
};

const displayBookmarks = () => {
  const selectedCategory = categoryDropdown.value;

  const filteredBookmarks = getBookmarks().filter(
    bookmark => bookmark.category === selectedCategory
  );

  if (filteredBookmarks.length === 0) {
    categoryList.innerHTML = "<p>No Bookmarks Found</p>";
    return;
  }

  categoryList.innerHTML = filteredBookmarks.map(
    bookmark => `
    <div>
    <input 
    type="radio"
    id="${bookmark.name}"
    value="${bookmark.name}"
    name="bookmark">
    <label for="${bookmark.name}">
    <a href="${bookmark.url}">${bookmark.name}</a>
    </label>
    </div>`
  )
  .join("");
};

addBookmarkButton.addEventListener("click", () => {
  categoryNames.forEach(category => {
    category.textContent = categoryDropdown.value;
  });

  displayOrCloseForm();
});

closeFormButton.addEventListener("click", () => {
  displayOrCloseForm();
});

addBookmarkButtonForm.addEventListener("click", () => {
  const bookmarks = getBookmarks();

  const newBookmark = {
    name: nameInput.value,
    category: categoryDropdown.value,
    url: urlInput.value
  };

  bookmarks.push(newBookmark);

  localStorage.setItem(
    "bookmarks",
    JSON.stringify(bookmarks)
  );

  nameInput.value = "";
  urlInput.value = "";

  displayOrCloseForm();
});

viewCategoryButton.addEventListener("click", () => {
  categoryNames.forEach(category => {
    category.textContent = categoryDropdown.value;
  });

  displayBookmarks();

  displayOrHideCategory();
});

closeListButton.addEventListener("click", () => {
  displayOrHideCategory();
});

deleteBookmarkButton.addEventListener("click", () => {
  const selectedBookmark = document.querySelector(
    'input[name="bookmark"]:checked'
  );

  if (!selectedBookmark) {
    return;
  }

  const updatedBookmarks = getBookmarks().filter(
    bookmark =>
    !(
      bookmark.name === selectedBookmark.value &&
      bookmark.category === categoryDropdown.value
    )
  );

  localStorage.setItem(
    "bookmarks",
    JSON.stringify(updatedBookmarks)
  );

  displayBookmarks();
});