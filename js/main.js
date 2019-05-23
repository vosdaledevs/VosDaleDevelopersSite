const navbarItems = document.querySelectorAll('.navbar--item');

if(navbarItems){
  navbarItems.forEach(item => {
    item.addEventListener('click', e => {
      const prev = document.querySelector('.navbar--item.active'),
            next = e.target;

      prev.classList.remove('active');
      next.classList.add('active');

      e.preventDefault();
    });
  });
}
