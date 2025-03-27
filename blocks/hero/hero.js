// import optimizeImages from '../../scripts/utils/optimize-images.js'; // Adjust the path as needed
import promoteChild from '../../scripts/utils/dom.js';
import { createPicTagWithOpenApi } from '../../scripts/utils/dam-open-apis.js';

export default async function decorate(block) {
  const [img, imgAlt, caption, hideOnMobile, title, heading, text, logo, logoAlt] = [
    ...block.children,
  ];

  // generating damURL from anchor tag
  const anchor = img.querySelector('a');
  const link = anchor?.getAttribute('href');
  const damUrl = link ? new URL(link) : block.textContent.trim();
  const pictureEle = await createPicTagWithOpenApi(damUrl);

  const heroBody = document.createElement('div');

  const captionText = caption ? promoteChild(caption) : null;
  const titleText = title ? promoteChild(title) : null;
  const introText = text ? promoteChild(text) : null;
  const isAltTextRequired = imgAlt ? promoteChild(imgAlt) : null;
  const hideImageOnMobile = hideOnMobile ? promoteChild(hideOnMobile) : null;

  // Add CSS classes only if the elements exist
  captionText?.classList.add('caption');
  titleText?.classList.add('title');
  introText?.classList.add('intro-text');
  heroBody.classList.add('body');

  // Append only the elements that exist
  const elementsToAppend = [titleText, pictureEle, captionText, introText].filter(
    (el) => el !== null,
  ); // Remove `null` values

  heroBody.append(...elementsToAppend); // Append only existing elements
  block.textContent = '';
  block.append(heroBody);
  // optimizeImages(block);
  console.log(heading, logo, logoAlt, isAltTextRequired, hideImageOnMobile);
}
