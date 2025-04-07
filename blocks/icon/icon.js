export default function decorate(block) {
  const icon = document.createElement('icon');

  [...block.children].forEach((row) => {
    const divEl = document.createElement('div');
    while (row.firstElementChild) divEl.append(row.firstElementChild);
    [...divEl.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('a')) {
        div.className = 'icon-image';
        const imageEl = document.createElement('img');
        const iconEl = div.querySelector('a');
        const iconLink = iconEl?.getHTML();
        imageEl.setAttribute('src', iconLink);
        imageEl.setAttribute('alt', 'icon');
        divEl.textContent = '';
        divEl.append(imageEl);
      }
    });
    icon.append(divEl);
  });

  block.textContent = '';
  block.append(icon);
}
