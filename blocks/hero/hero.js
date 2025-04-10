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

  /* const anchor = heroImage.querySelector('a');
  const link = anchor?.getAttribute('href');
  const damUrl = link ? new URL(link) : block.textContent.trim();
  const pictureEle = await createPicTagWithOpenApi(damUrl);

  const logoAnchor = logoImg.querySelector('a');
  const logoLink = logoAnchor?.getAttribute('href');
  const logoDamUrl = logoLink ? new URL(logoLink) : block.textContent.trim();
  const logoPictureEle = await createPicTagWithOpenApi(damUrl); */

  const heroBody = document.createElement('div');
  const heroContentMax = document.createElement('div');
  const heroContent = document.createElement('div');
  // const heroImageWrapper = document.createElement('div');
  // const herologoWrapper = document.createElement('div');

  const titleText = heroTitle ? promoteChild(heroTitle) : null;
  const checkImgAltText = checkImgAlt ? promoteChild(checkImgAlt) : null;
  const mainImage = heroImage ? promoteChild(heroImage) : null;
  const logoImage = logoImg ? promoteChild(logoImg) : null;
  // const mainImage = pictureEle ? promoteChild(pictureEle) : null;
  // const logoImage = logoPictureEle ? promoteChild(logoPictureEle) : null;
  const captionText = imgCaption ? promoteChild(imgCaption) : null;
  const introTextValue = introText ? promoteChild(introText) : null;
  const checklogoAltText = checklogoAlt ? promoteChild(checklogoAlt) : null;
  console.log(checkImgAltText, checklogoAltText);

  // heroImageWrapper.append(mainImage);
  // herologoWrapper.append(logoImage);

  // Add CSS classes only if the elements exist
  captionText?.classList.add('caption');
  titleText?.classList.add('title');
  introTextValue?.classList.add('intro-text');
  heroBody?.classList.add('hero-body');
  mainImage?.classList.add('image');
  // heroImageWrapper?.classList.add('image');
  logoImage?.classList.add('logo');
  // herologoWrapper?.classList.add('logo');
  heroContent?.classList.add('hero-content');
  heroContentMax.classList.add('hero-max-content');

  const isValidElement = (el) =>
    el && (el.textContent.trim() !== '' || el.querySelector('img')?.getAttribute('src'));
  const elementAppendHeroBody = [titleText, mainImage].filter(isValidElement);
  // const elementAppendHeroBody = [titleText, heroImageWrapper].filter(isValidElement);
  const elementAppendHeroContent = [captionText, logoImage, introTextValue].filter(
    isValidElement,
  );
  // const elementAppendHeroContent = [captionText,
  // herologoWrapper, introTextValue].filter(isValidElement);

  heroContentMax.append(...elementAppendHeroContent);
  heroContent.append(heroContentMax);
  heroBody.append(...elementAppendHeroBody);
  heroBody.append(heroContent);
  block.textContent = '';
  block.append(heroBody);
  console.log(heroBody, 'hey there ankit');
}
