// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })

  // Header bar functionality
  
  // Filters scroll behavior
  let wrapper = document.getElementById('filtersWrapper');
  let leftArrow = document.querySelector('.arrow-left');
  let rightArrow = document.querySelector('.arrow-right');

  // Infinite scroll setup
  const filters = Array.from(wrapper.children);              
  const totalFilters = filters.length;                       

  filters.forEach(filter => {                                
    wrapper.appendChild(filter.cloneNode(true));              
  });                                                         
  filters.forEach(filter => {                                
    wrapper.insertBefore(filter.cloneNode(true), wrapper.firstChild);  
  });                                                         

  //  Position scroll at the "middle" set
  let filterWidth = filters[0].offsetWidth + parseFloat(getComputedStyle(filters[0]).marginRight);  
  let middleStart = totalFilters * filterWidth;               
  wrapper.scrollLeft = middleStart;                           

  function getScrollStep() {
      const firstFilter = wrapper.querySelector(".filter");
      if (!firstFilter) return 110;
      const style = getComputedStyle(firstFilter);
      const marginRight = parseFloat(style.marginRight || 0);
      return Math.round(firstFilter.offsetWidth + marginRight);
  }

  // Scroll actions
  function scrollNext() {
     wrapper.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  }
  function scrollPrev() {
     wrapper.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  }

  rightArrow.addEventListener("click", scrollNext);
  leftArrow.addEventListener("click", scrollPrev);

  // Reset scroll to loop infinitely
  wrapper.addEventListener("scroll", () => {                  
    if (wrapper.scrollLeft <= 0) {                            
      wrapper.scrollLeft = middleStart;                       
     } else if (wrapper.scrollLeft >= middleStart * 2) {       
      wrapper.scrollLeft = middleStart;                       
    }                                                         
  });                                                         
        

  // Recompute step on resize (keeps behavior consistent)
   window.addEventListener('resize', () => {
      // nothing to store, getScrollStep reads computed sizes when used
  });

  // Tax toggle functionality
  const taxSwitch = document.getElementById('flexSwitchCheckDefault');

  function setTaxInfoVisibility(show) {
     // select all elements with class 'tax-info' anywhere on page
     const taxInfoEls = document.querySelectorAll('.tax-info');
     taxInfoEls.forEach(el => {
     // choose display type that fits inline text in your card, here we use 'inline' to keep it on same line
     el.style.display = show ? 'inline' : 'none';
     });
  }// initialize on load (if some other code sets checkbox state server-sidedocument.addEventListener('DOMContentLoaded', () =>   // if checkbox is present, initialize according to its checked stat  setTaxInfoVisibility(Boolean(taxSwitch.checked))});

  // listen for changes
  taxSwitch.addEventListener('change', () => {
    setTaxInfoVisibility(taxSwitch.checked);
  });

  // optional: keyboard accessibility for arrows (left/right)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') scrollNext();
    if (e.key === 'ArrowLeft') scrollPrev();
  });
})();