interface ExpandedState {
  [key: string]: boolean;
}

const expandedState: ExpandedState = {};

export function initSlider(sliderId: string) {
  const slider = document.getElementById(sliderId) as HTMLElement;
  const prevBtn = document.querySelector(
    `[data-slider="${sliderId}"].slider-prev-btn`
  ) as HTMLButtonElement;
  const nextBtn = document.querySelector(
    `[data-slider="${sliderId}"].slider-next-btn`
  ) as HTMLButtonElement;

  if (slider && prevBtn && nextBtn) {
    const updateButtonStates = () => {
      const scrollLeft = slider.scrollLeft;
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      // Mostrar/ocultar botón anterior
      if (scrollLeft <= 0) {
        prevBtn.classList.add("opacity-0", "pointer-events-none");
      } else {
        prevBtn.classList.remove("opacity-0", "pointer-events-none");
      }

      // Deshabilitar botón siguiente si estamos al final
      if (scrollLeft >= maxScroll - 10) {
        nextBtn.classList.add("opacity-50", "pointer-events-none");
      } else {
        nextBtn.classList.remove("opacity-50", "pointer-events-none");
      }
    };

    // Navegar al siguiente slide
    nextBtn.addEventListener("click", () => {
      const slideWidth =
        slider.querySelector(".min-w-full")?.clientWidth || slider.clientWidth;
      slider.scrollBy({
        left: slideWidth + 16,
        behavior: "smooth",
      });
    });

    // Navegar al slide anterior
    prevBtn.addEventListener("click", () => {
      const slideWidth =
        slider.querySelector(".min-w-full")?.clientWidth || slider.clientWidth;
      slider.scrollBy({
        left: -(slideWidth + 16),
        behavior: "smooth",
      });
    });

    // Actualizar estado de botones al scroll
    slider.addEventListener("scroll", updateButtonStates);
    window.addEventListener("resize", updateButtonStates);

    // Estado inicial
    updateButtonStates();
  }
}

export function initSeeMore() {
  const buttons = document.querySelectorAll(".see-more-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const visibleId = btn.getAttribute("data-target-visible");
      const hiddenId = btn.getAttribute("data-target-hidden");
      const originalText = btn.getAttribute("data-original-text");
      const hiddenText = btn.getAttribute("data-hidden-text");

      if (!visibleId || !hiddenId || !originalText || !hiddenText) return;

      const visibleElement = document.getElementById(visibleId);
      const hiddenElement = document.getElementById(hiddenId);

      if (!visibleElement || !hiddenElement) return;

      const isExpanded = expandedState[visibleId] || false;

      if (isExpanded) {
        visibleElement.textContent = originalText;
        hiddenElement.classList.add("hidden");
        btn.textContent = "See More";
        expandedState[visibleId] = false;
      } else {
        visibleElement.textContent = originalText + " ";
        hiddenElement.classList.remove("hidden");
        btn.textContent = "Show Less";
        expandedState[visibleId] = true;
      }
    });
  });
}