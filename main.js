// effects
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
    toggleActions: "restart reverse restart reverse",
    scroller: '.scroll',
    start: '-10% top',
    end: () => `+=${document.querySelector('.scroll').offsetHeight}`,
});

gsap.set('section:nth-of-type(1) *', {
    autoAlpha: 1,
  })
  
gsap.from('section:nth-of-type(1) *', {
    scrollTrigger: 'section:nth-of-type(1)',
    opacity: 0,
    duration: 1,
    y: 100,
})

gsap.from(['section:nth-of-type(2) .talk p', 'section:nth-of-type(2) #search-app'], {
    scrollTrigger: 'section:nth-of-type(2)',
    opacity: 0,
    duration: 1,
    y: 100,
})

gsap.from(['section:nth-of-type(3) .talk p', 'section:nth-of-type(3) .talk a'], {
    scrollTrigger: 'section:nth-of-type(3)',
    opacity: 0,
    duration: 1,
    y: 100,
})

gsap.from('section:nth-of-type(4) *', {
    scrollTrigger: 'section:nth-of-type(4)',
    opacity: 0,
    duration: 1,
    y: 100,
})

const circles = gsap.utils.toArray('.circle');

circles.forEach((circle, index) => {
    gsap.to(circle, {
      scrollTrigger: `section:nth-of-type(${index + 1})`,
      backgroundColor: '#000',
      duration: .3,
})
})

// preloader
const buttonContact = document.getElementById('click-contact');

const preloaderTl = gsap.timeline({ defaults: { ease: "power1.out", duration: 0.4 } });

function delayToLink(URL) {
    setTimeout(() => {
        window.location.href = URL;
    }, 2000)
}

buttonContact.addEventListener('click', () => {
    gsap.set('.preload', {
        y: '-100%',
        backgroundColor: getComputedStyle(document.body).getPropertyValue('--yellow-first'),
    })

    preloaderTl
        .to('.preload', {
            y: '0%',
            duration: 2,
            display: 'block',
            ease: 'elastic.out(1, 0.5)',
            delay: 0.3,
        })

    delayToLink('https://tranthanhhthao.github.io/swinburne-contact/')

});

// button magneto
const btnWrapper = document.querySelector('.button-wrapper:nth-of-type(1)');

// mouse move 
function activateMagneto(event, wrapper, element) {
    let boundBox = element.getBoundingClientRect();
    let boundBoxWrapper = wrapper.getBoundingClientRect();
    const magnetoStrength = 55;

    const newX = ((event.clientX - boundBoxWrapper.left)/(boundBoxWrapper.width) - 0.5)
    const newY = ((event.clientY - boundBoxWrapper.top)/(boundBoxWrapper.height) - 0.5)                    

    gsap.to(element, {
        x: newX * magnetoStrength,
        y: newY * magnetoStrength,
        duration: 0.2,
        ease: 'power1.inOut'
    });   
                   
}

// mouse leave 
function resetMagneto(event, wrapper, element) {
    gsap.to(element, {
        x: 0,
        y: 0,
        duration: 2,
        ease: 'elastic.out(1, 0.3)'
    });
}

// media query
let mm = gsap.matchMedia();

mm.add({
    isMobile: '(max-width: 768px)',
    isDesktop: '(min-width: 769px)',
}, (context) => {

    let { isMobile, isDesktop } = context.conditions;

    if (isDesktop) {
        // add event listener
        btnWrapper.addEventListener('mousemove', (event) => {
            activateMagneto(event, btnWrapper, btnWrapper.querySelector('.nav'));
        })
        btnWrapper.addEventListener('mouseleave', (event) => {
            resetMagneto(event, btnWrapper, btnWrapper.querySelector('.nav'));
        })
    }
})


