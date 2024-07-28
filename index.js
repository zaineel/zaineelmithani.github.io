// tab animation
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: "2s",
  transitionProperty: "all",
  transitionTimingFunction: "ease",
};

let revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer =
      revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      /* add the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.add("active");
    } else {
      /* remove the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.remove("active");
    }
  }
};

window.addEventListener("scroll", reveal);

// tabManager
function openTab(tabName) {
  var tabLinks = document.getElementsByClassName("tab-links");
  var tabContents = document.getElementsByClassName("tab-contents");

  for (tabLink of tabLinks) {
    tabLink.classList.remove("active-link");
  }
  for (tabContent of tabContents) {
    tabContent.classList.remove("active-tab");
  }

  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}

// formSubmission
document.addEventListener("DOMContentLoaded", () => {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwS28m3wJ0kv9O_RzViyz9mCeRUzAZHGInnoXFGTtVnYeDx0BW0rQSxLNnz67vOOofTGw/exec";
  const form = document.forms["submit-to-google-sheet"];
  const msg = document.getElementById("msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        msg.innerHTML =
          "Thank you for your message! I will get back to you as soon as possible.";
        setTimeout(() => {
          msg.innerHTML = "";
        }, 8000);
        form.reset();
      })
      .catch((error) => console.error("Error!", error.message));
  });
});

// sideMenu
var sidemenu = document.getElementById("sidemenu");

function openMenu() {
  sidemenu.style.right = "0";
}

function closeMenu() {
  sidemenu.style.right = "-200px";
}

// autoScroll
document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".scroll-container");

  let isScrolling;
  let autoScroll;
  let scrollDirection = 1;

  const startAutoScroll = () => {
    autoScroll = setInterval(() => {
      const maxScrollLeft =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (scrollContainer.scrollLeft >= maxScrollLeft) {
        scrollDirection = -1;
      } else if (scrollContainer.scrollLeft <= 0) {
        scrollDirection = 1;
      }
      scrollContainer.scrollLeft += scrollDirection;
    }, 10);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScroll);
  };

  const stopAutoScrollOnInteraction = () => {
    stopAutoScroll();
    clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
      startAutoScroll();
    }, 5000);
  };

  startAutoScroll();

  scrollContainer.addEventListener("wheel", stopAutoScrollOnInteraction);
  scrollContainer.addEventListener("touchstart", stopAutoScrollOnInteraction);
  scrollContainer.addEventListener("mousedown", stopAutoScrollOnInteraction);
});

// stripe
var stripe = Stripe(
  "pk_test_51PhEao2M9YgZ81xN4Wrh4015KUdytZhxrEU9yJT09dxdQ4BrOq0fMID3Wx9339z155DqPzAUTdaineJpAbaZPyFe00MxqVQ8el"
);

document
  .getElementById("book-appointment")
  .addEventListener("click", function () {
    fetch(
      "https://your-netlify-site.netlify.app/.netlify/functions/create-checkout-session",
      {
        method: "POST",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .then(function (result) {
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  });
