const tooltipLinks = Array.from(document.querySelectorAll('.has-tooltip'));
let activeTooltip = null;
let activeLink = null;

function createTooltip(link) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = link.title;

  document.body.appendChild(tooltip);

  return tooltip;
}

function removeTooltip() {
  if (activeTooltip) {
    activeTooltip.remove();
    activeTooltip = null;
    activeLink = null;
  }
}

function getTooltipPosition(link, tooltip) {
  const linkRect = link.getBoundingClientRect();
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;
  const position = link.dataset.position || 'bottom';
  let top = 0;
  let left = 0;

  if (position === 'top') {
    top = linkRect.top + scrollY - tooltip.offsetHeight;
    left = linkRect.left + scrollX;
  }

  if (position === 'bottom') {
    top = linkRect.bottom + scrollY;
    left = linkRect.left + scrollX;
  }

  if (position === 'left') {
    top = linkRect.top + scrollY;
    left = linkRect.left + scrollX - tooltip.offsetWidth;
  }

  if (position === 'right') {
    top = linkRect.top + scrollY;
    left = linkRect.right + scrollX;
  }

  return {
    top: top,
    left: left
  };
}

function showTooltip(link) {
  const tooltip = createTooltip(link);
  const coordinates = getTooltipPosition(link, tooltip);

  tooltip.classList.add('tooltip_active');
  tooltip.style.left = coordinates.left + 'px';
  tooltip.style.top = coordinates.top + 'px';

  activeTooltip = tooltip;
  activeLink = link;
}

function toggleTooltip(event) {
  event.preventDefault();

  const currentLink = event.currentTarget;

  if (activeLink === currentLink) {
    removeTooltip();
    return;
  }

  removeTooltip();
  showTooltip(currentLink);
}

function initTooltips() {
  tooltipLinks.forEach(function (link) {
    link.addEventListener('click', toggleTooltip);
  });
}

initTooltips();