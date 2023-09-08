'use strict'

//Make navbar transparent when it is at the top 
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    // Log the current scroll position and navbar height
    console.log(window.scrollY);
    console.log(`navbarHeight: ${navbarHeight}` );
    if(window.scrollY > navbarHeight) {
      // Add a class to make the navbar dark
        navbar.classList.add('navbar--dark');
    }else{
      // Remove the class to make the navbar transparent
        navbar.classList.remove('navbar--dark');
    }
})

// Handle scrolling when tapping on the navbar menu 
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener('click', (event) => {
    // Log the clicked link's dataset  
    console.log(event.target.dataset.link);
    const target = event.target; 
    const link = target.dataset.link ; 
    if(link == null){
        return;
    }
    // Close the mobile menu and scroll to the selected section
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
    selectNavItem(target);
})

//Navbar toggle button for small screens 
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn'); 
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
})

//Contact me = > #contact 
const  homeContactBtn = document.querySelector(".home__contact"); 
homeContactBtn.addEventListener('click', ()=> {
  // Scroll to the "contact" section when the button is clicked
   scrollIntoView('#contact');
})


//Make home slowly fade to transparent as the window scrolls down 
const home = document.querySelector(".home__wrap");
const homeHeight = home.getBoundingClientRect().height; 
document.addEventListener('scroll', ()=>{
  // Adjust the opacity of the home section based on scroll position
    home.style.opacity = 1 - window.scrollY/homeHeight;
})

//Show "arrow up" button when scrolling down 
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight /2){
      // Add a class to make the "arrow up" button visible
        arrowUp.classList.add("visible"); 
    }else{
      // Remove the class to hide the "arrow up" button
        arrowUp.classList.remove("visible"); 
    }
});

//Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
  // Scroll back to the top of the page when the button is clicked
    scrollIntoView('#home');
});

// Define section IDs and related elements
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#contact',
  ];
  const sections = sectionIds.map(id => document.querySelector(id));
  const navItems = sectionIds.map(id =>
    document.querySelector(`[data-link="${id}"]`)
  );
  
  let selectedNavIndex = 0;
  let selectedNavItem = navItems[0];

  // Function to select and highlight the active navigation item
  function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
  }
  
  // Function to smoothly scroll to a section
  function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

  // Configure options for the Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };
  
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting && entry.intersectionRatio > 0) {
        const index = sectionIds.indexOf(`#${entry.target.id}`);
        if (entry.boundingClientRect.y < 0) {
          selectedNavIndex = index + 1;
        } else {
          selectedNavIndex = index - 1;
        }
      }
    });
  };
 
// Callback function for the Intersection Observer
const observer = new IntersectionObserver(observerCallback, observerOptions);
// Observe each section for intersection
sections.forEach(section => observer.observe(section));

// Handle scrolling with the mouse wheel 
window.addEventListener('wheel', ()=> {
   if(window.scrollY ===0){
      selectedNavIndex = 0; 
  }else if (

   Math.round(window.scrollY + window.innerHeight) >=
    
   document.body.clientHeight
    
  ) {
    selectedNavIndex = navItems.length - 1; 
 }
  selectNavItem(navItems[selectedNavIndex]);
})

// Wrap every letter in a span for a text animation effect
var textWrapper = document.querySelector('.contact__title .contact__letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// Create a text animation timeline using the anime.js library
anime.timeline({loop: true})
  .add({
    targets: '.contact__title .letter',
    rotateY: [-90, 0],
    duration: 1300,
    delay: (el, i) => 45 * i
  }).add({
    targets: '.ml10',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Handle mousemove and resize events for animations
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleWindowResize);

const spansSlow = document.querySelectorAll('.spanSlow');
const spansFast = document.querySelectorAll('.spanFast');

let width = window.innerWidth;

// Function to handle mouse movement for animations
function handleMouseMove(e) {
  let normalizedPosition = e.pageX / (width/2) - 1;
  let speedSlow = 100 * normalizedPosition;
  let speedFast = 130 * normalizedPosition;
  spansSlow.forEach((span) => {
    span.style.transform = `translate(${speedSlow}px)`;
  });
  spansFast.forEach((span) => {
    span.style.transform = `translate(${speedFast}px)`
  })
}

// Recalculate width when the window is resized
function handleWindowResize() {
  width = window.innerWidth;
}
