import optimizeImages from '../../scripts/utils/optimize-images.js'; // Adjust the path as needed
import promoteChild from '../../scripts/utils/dom.js';

export default function decorate(block) {
  const [image, caption, title, text] = [...block.children];
  const heroBody = document.createElement('div');
  const heroImage = promoteChild(image);
  const heroCaption = promoteChild(caption);
  const heroTitle = promoteChild(title);
  const introText = promoteChild(text);

  heroImage?.classList.add('hero-image');
  heroCaption?.classList.add('hero-caption');
  heroTitle?.classList.add('hero-title');
  introText?.classList.add('hero-intro-text');

  heroBody.classList.add('hero-body');
  heroBody.append(heroTitle, heroImage, heroCaption, introText);
  block.textContent = '';
  block.append(heroBody);

  optimizeImages(block);
}
