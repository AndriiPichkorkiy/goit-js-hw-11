import { refs } from './refs';

async function saveImage(e) {
  if (e.target.nodeName !== 'BUTTON') return;

  const imgEl = e.target.nextElementSibling;

  const image = await fetch(imgEl.href);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = refs.elementForDownloadImgs;
  link.href = imageURL;
  link.download = imgEl.dataset.name;
  link.click();
}

refs.gallery.addEventListener('click', saveImage);
