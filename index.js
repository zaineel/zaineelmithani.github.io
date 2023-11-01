let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
  }

let revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
      let windowHeight = window.innerHeight;
      let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
      if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
        /* add the active class to the revealableContainer's classlist */
        revealableContainers[i].classList.add("active");
      } else {
        /* remove the active class to the revealableContainer's classlist */
        revealableContainers[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);