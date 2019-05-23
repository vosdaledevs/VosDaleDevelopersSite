const routes = {
  '/': 'index route'
};

const navbarItems = document.querySelectorAll('.navbar--item');

if(navbarItems){
  navbarItems.forEach(item => {
    item.addEventListener('click', e => {
      const prev = document.querySelector('.navbar--item.active'),
            next = e.target;

      prev.classList.remove('active');
      next.classList.add('active');
      e.preventDefault();

      /* Router code for change pages */
      let pathName = next.getAttribute('page-target');

      window.history.pushState(
        {},
        (pathName === '/') ? 'Inicio' : pathName,
        window.location.origin + pathName
      );
    });
  });
}
