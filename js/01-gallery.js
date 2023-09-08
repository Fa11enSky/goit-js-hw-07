import { galleryItems } from "./gallery-items.js";
// Change code below this line
const listEl = document.querySelector(".gallery");
listEl.insertAdjacentHTML("beforeend", createMarkup(galleryItems));

listEl.addEventListener("click", onItemClick);


function createMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
         <a class="gallery__link" href="${original}">
          <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
          />
         </a>
        </li>
        `;
    })
    .join("");
}


function onItemClick(ev) {
  ev.preventDefault();
  if (!ev.target.classList.contains("gallery__image")) {
    return;
  }
  const url = ev.target.dataset.source;
  const instance = basicLightbox.create(
    `
        <img src="${url}">
        `
  );
  instance.show();
  /* Тут для закриття модалки по ESC інших способів як оголосити функцію
   в функції я не придумав, а якщо оголошувати через function functionName() виглядає
   взагалі дико😁.
   (перепробував я багато чого, знаю що є простіше краще рішення але не допер)
  */
  const onEscClick = function (ev) {
    if (ev.key === "Escape" && ev.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", onEscClick);
    }
  };

  document.addEventListener("keydown", onEscClick);
}
