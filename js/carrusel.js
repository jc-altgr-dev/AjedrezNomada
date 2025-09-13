  const carousel = document.querySelector(".carousel-images");
  const images = document.querySelectorAll(".carousel-images img");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsContainer = document.querySelector(".dots");

  let index = 0;

  // Crear puntos dinámicamente según la cantidad de imágenes
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => showImage(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dots span");

  function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function showImage(i) {
    if (i < 0) {
      index = images.length - 1;
    } else if (i >= images.length) {
      index = 0;
    } else {
      index = i;
    }
    carousel.style.transform = `translateX(${-index * 100}%)`;
    updateDots();
  }

  prevBtn.addEventListener("click", () => showImage(index - 1));
  nextBtn.addEventListener("click", () => showImage(index + 1));

  // Inicializar
  showImage(0);

