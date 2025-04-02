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
  const heroContent = document.createElement('div');
  const captionText = imgCaption ? promoteChild(imgCaption) : null;
  const logoImage = logoImg ? promoteChild(logoImg) : null;
  const introTextValue = introText ? promoteChild(introText) : null;
  const checklogoAltText = checklogoAlt ? promoteChild(checklogoAlt) : null;
  console.log(checkImgAltText, checklogoAltText);

  // Add CSS classes only if the elements exist
  captionText?.classList.add('caption');
  titleText?.classList.add('title');
  introTextValue?.classList.add('intro-text');
  heroBody?.classList.add('hero-body');
  mainImage?.classList.add('image');
  logoImage?.classList.add('logo');
  heroContent?.classList.add('hero-content');

  // Append only the elements that exist
  const elementAppendHeroBody = [titleText, mainImage].filter((el) => el !== null);

  const elementAppendHeroContent = [captionText, logoImage, introTextValue].filter(
    (el) => el !== null,
  ); // Remove `null` values

  heroContent.append(...elementAppendHeroContent);
  heroBody.append(...elementAppendHeroBody); // Append only existing elements
  heroBody.append(heroContent);
  block.textContent = '';
  block.append(heroBody);
}
