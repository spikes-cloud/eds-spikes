import optimizeImages from '../../scripts/utils/optimize-images.js'; // Adjust the path as needed
import promoteChild from '../../scripts/utils/dom.js';
// import { createPicTagWithOpenApi } from '../../scripts/utils/dam-open-apis.js';

export default async function decorate(block) {
  const [
    heroImage,
    checkImgAlt,
    imgCaption,
    heroTitle,
    introText,
    logoImg,
    checklogoAlt,
  ] = [...block.children];

  // generating damURL from anchor tag
  // const anchor = heroImage.querySelector('a');
  // const link = anchor?.getAttribute('href');
  // const damUrl = link ? new URL(link) : block.textContent.trim();
  // const pictureEle = await createPicTagWithOpenApi(damUrl);

  const heroBody = document.createElement('div');

  const titleText = heroTitle ? promoteChild(heroTitle) : null;

  const checkImgAltText = checkImgAlt ? promoteChild(checkImgAlt) : null;

  const mainImage = heroImage ? promoteChild(heroImage) : null;

  const captionText = imgCaption ? promoteChild(imgCaption) : null;

  const logoImage = logoImg ? promoteChild(logoImg) : null;

  const checklogoAltText = checklogoAlt ? promoteChild(checklogoAlt) : null;

  const introTextValue = introText ? promoteChild(introText) : null;

  console.log(checkImgAltText, checklogoAltText);

  // Add CSS classes only if the elements exist
  captionText?.classList.add('caption');
  titleText?.classList.add('title');
  introTextValue?.classList.add('introText');
  heroBody?.classList.add('heroContainer');
  mainImage?.classList.add('image');
  logoImage?.classList.add('logo');

  // Append only the elements that exist
  const elementsToAppend = [
    titleText,
    captionText,
    introText,
    mainImage,
    logoImage,
  ].filter((el) => el !== null); // Remove `null` values

  heroBody.append(...elementsToAppend); // Append only existing elements
  block.textContent = '';
  block.append(heroBody);
  optimizeImages(block);
}
