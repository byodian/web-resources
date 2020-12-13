import { Component } from './models/Component';
import { elements, classes, getSections, getCards, getMenuItems } from './views/ui';
import { getSkeleton, render } from './views/skeleton';
import service from './services/resources';
import { handleOverlay, hideMenu } from './views/handleMenu';

const app = (function() {
  // Variables
  const that = {};
  const defaults = {
    navItemContainer: '.left_menu_items',
    sectionsContainer: '#section_groups',
    resources: [],
    callback: function (content) {
      return content;
    },
  };

  // Methods
  const uniqueArray = function (arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  };

  const uniqueResources = function (category) {
    return function (resources) {
      return resources.filter(resource => resource.category.trim() === category);
    }
  }

  // Init events
  const init = function (options) {
    options = options || {};
    // Merge both user defaults and options.
    const settings = Object.assign({}, defaults, options);

    // Get all categories of resources
    const categories = uniqueArray(
      settings.resources.map(resource => resource.category)
    );

    // Get all items of left menu items then append it to document
    const menuItems = new Component(settings.navItemContainer, {
      resources: categories,
      template: getMenuItems
    });
    
    // Get all sections of main content
    const sections = new Component(settings.sectionsContainer, {
      resources: categories,
      template: getSections
    })

    menuItems.render();
    sections.render();
    
    // Render the items into a unique section id
    categories.forEach(category => {          
      const selector = `#${category} .group_items`;

      // Get reqources of the same category
      const resources = uniqueResources(category)(settings.resources)

      const cards = new Component(selector, {
        resources: resources,
        template: getCards
      });

      cards.render();
    })

    // Event 
    elements.leftControlMenu.addEventListener('click', handleOverlay(elements, classes));
    elements.leftMenuOverlay.addEventListener('click', handleOverlay(elements, classes));
    window.addEventListener('resize', hideMenu(elements, classes));
  };
  
  // Inits & Events
  that.init = init;
  
  // Render the skeleton screen before getting the resources from server
  render(defaults.sectionsContainer, getSkeleton);
  hideMenu(elements, classes)();

    // Get resources from the service side
  service
    .getAll()
    .then(resources => {
      init(resources);
    });

  return that;
})();