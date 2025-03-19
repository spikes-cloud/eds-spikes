export default function decorate(block) {
  const container = document.createElement('div');
  let heroImage = null;
  let heroTitle = null;
  let heroCaption = null;
  let introText = null;
  container.className = 'container';
  const children = [...block.children];

  children.forEach((child, index) => {
    const innerDiv = child.querySelector('div');
    if (!innerDiv) return;
    const content = innerDiv.innerHTML.trim();

    if (innerDiv.querySelector('picture')) {
      heroImage = document.createElement('div');
      heroImage.className = 'hero-image';
      heroImage.innerHTML = innerDiv.innerHTML;
    } else if (index === 1) {
      heroCaption = document.createElement('div');
      heroCaption.className = 'hero-caption';
      heroCaption.innerHTML = content;
    } else if (index === 2) {
      heroTitle = document.createElement('div');
      heroTitle.className = 'hero-title';
      heroTitle.innerHTML = content;
    } else if (index === 3) {
      introText = document.createElement('div');
      introText.className = 'hero-intro-text';
      introText.innerHTML = content;
    }
  });

  block.textContent = '';
  container.append(heroTitle);
  container.append(heroImage);
  container.append(heroCaption);
  container.append(introText);
  block.append(container);
}
