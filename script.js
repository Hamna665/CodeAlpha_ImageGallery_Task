let currentSlide = 0;

function openModal(index) {
  currentSlide = index;
  showSlide(currentSlide);
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function changeSlide(n) {
  currentSlide += n;
  showSlide(currentSlide);
}

function showSlide(index) {
  const images = document.querySelectorAll(".gallery-item img");
  if (index >= images.length) currentSlide = 0;
  if (index < 0) currentSlide = images.length - 1;

  document.getElementById("modalImage").src = images[currentSlide].src;
  document.getElementById("caption").innerText = images[currentSlide].alt;

  const thumbnails = document.querySelectorAll(".thumbnail-container img");
  thumbnails.forEach(thumb => thumb.classList.remove("active"));
  thumbnails[currentSlide].classList.add("active");
}

function createThumbnails() {
  const images = document.querySelectorAll(".gallery-item img");
  const thumbnailContainer = document.getElementById("thumbnailContainer");

  images.forEach((image, index) => {
    const thumb = document.createElement("img");
    thumb.src = image.src;
    thumb.alt = image.alt;
    thumb.onclick = () => openModal(index);
    if (index === currentSlide) thumb.classList.add("active");
    thumbnailContainer.appendChild(thumb);
  });
}

function toggleFullscreen() {
  const modal = document.getElementById("modal");
  if (!document.fullscreenElement) {
    modal.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function handleKeyboard(e) {
  if (e.key === "ArrowLeft") {
    changeSlide(-1);
  } else if (e.key === "ArrowRight") {
    changeSlide(1);
  } else if (e.key === "Escape") {
    closeModal();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  createThumbnails();
  document.addEventListener("keydown", handleKeyboard);
});