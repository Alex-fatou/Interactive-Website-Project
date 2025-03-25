/* ================== Projects page ================== */
function loadImages() {
  fetch("./json/filter.json")
    .then((response) => response.json())
    .then((images) => {
      const imageContainer = document.getElementById("filter-image");
      imageContainer.innerHTML = "";

      images.data.forEach((image) => {
        const div = document.createElement("div");
        div.classList.add("image-items");
        div.dataset.category = image.category;

        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.alt;
        img.setAttribute("data-lightbox", "true");

        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = image.title;

        div.appendChild(img);
        div.appendChild(title);
        imageContainer.appendChild(div);

        // Add click open image in lightbox
        img.addEventListener("click", function () {
          openLightbox(image.src);
        });
      });

      filterImages("all");
    })
    .catch((error) => console.error("Error loading the images JSON:", error));
}

function filterImages(category, event) {
  if (event) event.preventDefault();
  const allImages = document.querySelectorAll(".image-items");

  allImages.forEach((image) => {
    if (category === "all" || image.dataset.category === category) {
      image.style.display = "block";
    } else {
      image.style.display = "none";
    }
  });
}

function openLightbox(imageSrc) {
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = imageSrc;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox-modal");
  lightbox.style.display = "none";
}

// Close lightbox if click outside the image
document
  .getElementById("lightbox-modal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closeLightbox();
    }
  });

window.onload = loadImages;
