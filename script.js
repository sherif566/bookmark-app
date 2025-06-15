document
  .getElementById("bookmarkForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const siteName = document.getElementById("siteNameInput").value.trim();
    const siteUrl = document.getElementById("siteUrlInput").value.trim();
    const urlInput = document.getElementById("siteUrlInput");

    
    if (siteName === "" || siteUrl === "") {
      alert("Please enter both site name and URL");
      return;
    }

    const urlPattern =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\/\S*)?$/;

    if (urlPattern.test(siteUrl)) {
      urlInput.classList.add("is-valid");
      urlInput.classList.remove("is-invalid");
    } else {
      urlInput.classList.add("is-invalid");
      urlInput.classList.remove("is-valid");
      alert("Please enter a valid URL");
      return;
    }

    const bookmark = {
      name: siteName,
      url: siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`,
    };

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    document.getElementById("bookmarkForm").reset();
    displayBookmarks();
  });

function displayBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const tbody = document.getElementById("bookmarksBody");
  tbody.innerHTML = "";

  bookmarks.forEach((bookmark, index) => {
    tbody.innerHTML += `
        <tr>
        <td>${index + 1}</td>
        <td>${bookmark.name}</td>
        <td><a class="btn btn-success" target="_blank" href="${
          bookmark.url
        }">Visit</a></td>
        <td><button class="btn btn-danger" onclick="deleteBookmark(${index})">Delete</button></td>
        </tr>
        `;
  });
}

function deleteBookmark(index) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks();
}

window.onload = displayBookmarks;
