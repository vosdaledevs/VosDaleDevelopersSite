const routes = {};

const navbarItems = document.querySelectorAll('.navbar--item'),
      rootComponent = document.getElementById('page-content');

if(navbarItems){
  navbarItems.forEach(item => {

    // getting all components templates of site
    let _route = item.getAttribute('page-target'),
        _componentName = item.getAttribute('page-component').toLowerCase(),
        _component = document.getElementById(`component__${_componentName}`);

    if(_route && _component){
      routes[_route] = _component.innerHTML;
      _component.remove();
    }else{
      console.error(`Navbar Item empty: ${item.textContent}`);
    }


    // Adding events to navba--item's
    item.addEventListener('click', e => {
      const prev = document.querySelector('.navbar--item.active'),
            next = e.target;

      prev.classList.remove('active');
      next.classList.add('active');
      e.preventDefault();

      /* Router code for change pages */
      let pathName = next.getAttribute('page-target'); // get route target

      rootComponent.innerHTML = routes[pathName]; // loading component to main container

      window.history.pushState(
        {},
        (pathName === '/') ? 'Inicio' : pathName,
        window.location.origin + pathName
      );
    });
  });
}

(function(){
  console.log('auto, '+window.location.href);
  if([window.location.origin, window.location.origin+'/'].includes(window.location.href)){
    rootComponent.innerHTML = routes['/'];
  }
})();
