import {
  createPicTagWithOpenApi,
  createPicAndImgWithOpenApi,
} from '../../scripts/utils/dam-open-apis.js';

export default async function decorate(block) {
  const anchor = block.querySelector('a');
  const link = anchor?.getAttribute('href');
  const damUrl = link ? new URL(link) : block.textContent.trim();
  damUrl.alt = anchor?.title;

  // Get Lazy Loading attribute
  const isLazy =
    block.querySelector('div:nth-child(2) > div')?.textContent.trim() === 'true'
      ? 'lazy'
      : 'eager';
  damUrl.loading = isLazy;
  const pictureEle = await createPicTagWithOpenApi(damUrl);
  //const pictureEle = await createPicAndImgWithOpenApi(damUrl);

  // Remove <div> tags
  block.querySelectorAll(':scope > div').forEach((e) => e.remove());
  const parentDiv = document.createElement('p');
  // Finally add the pic tag
  block.append(parentDiv, pictureEle);
  // block.appendChild(pictureEle);
}
