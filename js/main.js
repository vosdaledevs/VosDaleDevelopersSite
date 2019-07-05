const routes = {};

const navbarItems = document.querySelectorAll('.navbar--item'),
      footerNavbarItems = document.querySelectorAll('.footer-navbar-item'),
      rootComponent = document.getElementById('page-content');


function showIconLogo(pathName){
  (pathName === "/") ? document.getElementById('icon-logo').classList.remove("show") : document.getElementById('icon-logo').classList.add("show");
}

function changeRouter(e){
  /* Router code for change pages */
  let pathName = e.target.getAttribute('page-target'); // get route target

  showIconLogo(pathName);
  window.scrollTo({top: 0, behavior: 'smooth'});
  rootComponent.innerHTML = routes[pathName]; // loading component to main container

  window.history.pushState(
    {},
    (pathName === '/') ? 'Inicio' : pathName,
    window.location.origin + pathName
  );
}


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

      if(prev){
        prev.classList.remove('active');
        next.classList.add('active');
      }

      e.preventDefault();
      changeRouter(e);
    });
  });
}


if(footerNavbarItems){
  footerNavbarItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      changeRouter(e);
    });
  });
}


(function(){

  if([window.location.origin, window.location.origin+'/'].includes(window.location.href)){
    rootComponent.innerHTML = routes['/'];
  }else{
    let cookies = null;

    // getting the URL to access from cookie 'path'
    if(document.cookie){
      cookies = document.cookie
        .split(";")
        .map(item => item.split("="))
        .reduce((prev,cur) => { prev[cur[0]] = cur[1].split('%2F').join('/'); return prev; },{});
    }else{
      cookies = { path: '/' }
    }

    console.log(cookies);
    document.querySelector('.navbar--item.active').classList.remove('active');
    if(cookies['path'] !== '404') {
      rootComponent.innerHTML = routes[cookies['path']];
      document.querySelector(`.navbar--item[page-target="${cookies['path']}"]`).classList.add('active');
    }else{
      rootComponent.innerHTML = "Error 404; Page not found";
    }

    showIconLogo(cookies['path']);
  }

})();
