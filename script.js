const stabilBtn = document.querySelectorAll('.brand-tabs button')[0];
const andeliBtn = document.querySelectorAll('.brand-tabs button')[1];
const stabilSection = document.getElementById('stabil-section');
const andeliSection = document.getElementById('andeli-section');

stabilBtn.addEventListener('click', () => {
  stabilBtn.classList.add('active');
  andeliBtn.classList.remove('active');
  stabilSection.classList.remove('hidden');
  andeliSection.classList.add('hidden');
});

andeliBtn.addEventListener('click', () => {
  andeliBtn.classList.add('active');
  stabilBtn.classList.remove('active');
  andeliSection.classList.remove('hidden');
  stabilSection.classList.add('hidden');
});

document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".inputSearch");

  input.addEventListener("input", function () {
    const value = input.value.toLowerCase();

    // Определяем активный раздел (Stabil или Andeli)
    const activeSection = document.querySelector(".product-grid:not(.hidden)");
    const cards = activeSection.querySelectorAll(".product-card");

    cards.forEach(card => {
      const text = card.querySelector("p").textContent.toLowerCase();
      const match = text.includes(value);
      

      card.style.display = match || value === "" ? "block" : "none";
    });
  });

  // Поддержка переключения вкладок
  const tabs = document.querySelectorAll(".brand-tabs button");
  const sections = {
    "Stabil": document.getElementById("stabil-section"),
    "Andeli": document.getElementById("andeli-section")
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const sectionName = tab.textContent.trim();
      for (let key in sections) {
        if (key === sectionName) {
          sections[key].classList.remove("hidden");
        } else {
          sections[key].classList.add("hidden");
        }
      }

      // Сброс поиска при переключении вкладок (по желанию можно убрать)
      input.value = "";
      const cards = sections[sectionName].querySelectorAll(".product-card");
      cards.forEach(card => card.style.display = "block");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const goToStabilBtn = document.querySelector(".go-to-stabil");
  const stabilTabBtn = document.querySelector(".brand-tabs button");

  if (goToStabilBtn) {
    goToStabilBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Открываем вкладку Stabil
      stabilTabBtn.click();

      // Скроллим до раздела
      const stabilSection = document.getElementById("stabil-section");
      stabilSection.scrollIntoView({ behavior: "smooth" });
    });
  }
});

function addToFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Добавлено в избранное!");
  } else {
    alert("Уже в избранном.");
  }
}

// Сохраняем все товары (при загрузке)
document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card");
  const allProducts = [];

  productCards.forEach((card, index) => {
    const img = card.querySelector("img")?.getAttribute("src");
    const name = card.querySelector("p")?.textContent;
    const price = card.querySelector("span")?.textContent;

    allProducts.push({
      id: "product_" + index,
      img,
      name,
      price
    });

    const btn = card.querySelector("button");
    if (btn) btn.setAttribute("onclick", `addToFavorites("product_${index}")`);
  });

  localStorage.setItem("allProducts", JSON.stringify(allProducts));
});


document.addEventListener("DOMContentLoaded", () => {
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const productCards = document.querySelectorAll(".product-card");
  const allProducts = [];

  productCards.forEach((card, index) => {
    const id = "product_" + index;
    const img = card.querySelector("img")?.getAttribute("src");
    const name = card.querySelector("p")?.textContent;
    const price = card.querySelector("span")?.textContent;

    allProducts.push({ id, img, name, price });

    // Создаём кнопку, если её нет
    let btn = card.querySelector(".favorite-btn");
    if (!btn) {
      btn = document.createElement("button");
      btn.className = "favorite-btn";
      btn.innerHTML = `<i class="fa fa-heart"></i>`;
      card.appendChild(btn);
    }

    // Устанавливаем data-id и проверяем избранное
    btn.setAttribute("data-id", id);
    if (favorites.includes(id)) btn.classList.add("active");

    // Обработка клика
    btn.addEventListener("click", () => {
      if (favorites.includes(id)) {
        // Удалить из избранного
        favorites = favorites.filter(fav => fav !== id);
        btn.classList.remove("active");
      } else {
        // Добавить в избранное
        favorites.push(id);
        btn.classList.add("active");
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  });

  // Сохраняем все товары
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
});


// Увеличение картинки при клике
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".close-modal");

  document.querySelectorAll(".product-card img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slider-container img");
  let current = 0;
})


document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const isOpen = answer.style.display === 'block';

    // Закрыть все
    document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');

    // Показать выбранный
    answer.style.display = isOpen ? 'none' : 'block';
  });
});



