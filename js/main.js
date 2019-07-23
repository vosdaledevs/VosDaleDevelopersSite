const routes = {};

const navbarItems = document.querySelectorAll('.navbar--item'),
      footerNavbarItems = document.querySelectorAll('.footer-navbar-item'),
      rootComponent = document.getElementById('page-content');


//  list events for components
const eventsRoutes = {
  '/': function(){
    let questionForm = document.getElementById("questionForm"); // form question event

    if(questionForm){ // verify that value is'n null
      questionForm.addEventListener('submit', e => { // adding submit event to form
        e.preventDefault();

        // declarations
        let ajax = new XMLHttpRequest(),
            url = new URL(`${window.location.origin}/email.php`),
            notificator = document.getElementById('form-notificator'),
            userQuestion = document.forms['questionForm'].elements['userQuestion'].value,
            userEmail = document.forms['questionForm'].elements['userEmail'].value,
            data = { userQuestion, userEmail };

          ajax.open('POST', url); // setting the type petition and the url to send
          ajax.setRequestHeader('Content-Type', 'application/json'); // indicating type transferency

          notificator.classList.add('active'); // showing indicator

        if(userEmail.length > 0 && userQuestion.length > 0) {

          ajax.addEventListener('load', x => { // event to execute after send email
            notificator.innerHTML = "!Pregunta enviada con éxito!";
            e.target.reset(); // restart form values

            setTimeout(function () { // hiddign notificator
              notificator.classList.remove('active');
              notificator.innerHTML = "Enviando pregunta<span>.</span><span>.</span><span>.</span>";
            }, 3000);
          });

          ajax.send(JSON.stringify(data)); // sending data
        }else{
          notificator.innerHTML = "Antes de enviar. <br> !Completa todos los campos del formulario!";
          setTimeout(function () { // hiddign notificator
            notificator.classList.remove('active');
            notificator.innerHTML = "Enviando pregunta<span>.</span><span>.</span><span>.</span>";
          }, 2000);
        }
      });
    }
  }
};

// FUNCTIONS DECLARATIONS
function showIconLogo(pathName){
  (pathName === "/") ? document.getElementById('icon-logo').classList.remove("show") : document.getElementById('icon-logo').classList.add("show");
}

function changeRouter(e){
  /* Router code for change pages */
  let pathName = e.target.getAttribute('page-target'); // get route target

  showIconLogo(pathName);
  window.scrollTo({top: 0, behavior: 'smooth'});
  rootComponent.innerHTML = routes[pathName]; // loading component to main container
  if(eventsRoutes[pathName]){ // loading event for component if exist
    eventsRoutes[pathName]();
  }

  window.history.pushState(
    {},
    (pathName === '/') ? 'Inicio' : pathName,
    window.location.origin + pathName
  );
}


// EVENT ASIGNATION TO NAVBAR-ITEMS
if(navbarItems){
  navbarItems.forEach(item => {

    // getting all components templates of site
    let _route = item.getAttribute('page-target'),
        _componentName = item.getAttribute('page-component').toLowerCase(),
        _component = document.getElementById(`component__${_componentName}`);

    // saving the component content and route from all templates
    if(_route && _component){
      routes[_route] = _component.innerHTML;
      _component.remove(); // deleting templates nodes from html and loading to virtual node
    }else{
      console.error(`Navbar Item empty: ${item.textContent}`);
    }


    // Adding events to navba--item's
    item.addEventListener('click', e => {
      const prev = document.querySelector('.navbar--item.active'), // geting the navbar-item for active section
            next = e.target;

      // updating navbar--item indicator for active item
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
      let pageTarget = e.target.getAttribute('page-target'); // get the page-taget value to use in querySelector

      // updating navbar--item indicator for active item
      document.querySelector('.navbar--item.active').classList.remove('active');
      document.querySelector(`[page-target="${pageTarget}"]`).classList.add('active');

      e.preventDefault();
      changeRouter(e);
    });
  });
}


(function(){
  let cookies = { path: '/' };

  if([window.location.origin, window.location.origin+'/'].includes(window.location.href)){
    rootComponent.innerHTML = routes['/'];
  }else{

    // getting the URL to access from cookie 'path'
    if(document.cookie){
      cookies = document.cookie
        .split(";")
        .map(item => item.split("="))
        .reduce((prev,cur) => { prev[cur[0]] = cur[1].split('%2F').join('/'); return prev; },{});
    }

    //  loading component node switch cookie value storage
    document.querySelector('.navbar--item.active').classList.remove('active');
    if(cookies['path'] !== '404') {
      rootComponent.innerHTML = routes[cookies['path']];
      document.querySelector(`.navbar--item[page-target="${cookies['path']}"]`).classList.add('active');
    }else{
      rootComponent.innerHTML = "Error 404; Page not found";
    }

    showIconLogo(cookies['path']); // showing or hidden iconLogo switch section page loaded

  }

  if(eventsRoutes[cookies['path']]){ // loading event for component if exist
    console.log("loaded event");
    eventsRoutes[cookies['path']]();
  }

})();
