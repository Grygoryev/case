(function jsScaleController() {
  const weatherCock = document.querySelector('.js-form-slider__weathercock'),
        jsSkillScale = document.querySelector('.js-form-slider'),
        jsSkillScaleOffsetLeft = jsSkillScale.getBoundingClientRect().left,
        marks = [...document.getElementsByClassName('js-form-slider__mark')],
        marksCors = marks.map(mark => mark.getBoundingClientRect().left - jsSkillScaleOffsetLeft),
        weatherCockShift = Math.floor(weatherCock.offsetWidth / 2),
        sliderInput = document.querySelector('.js-form-slider__input'),
        sliderMarkMessages = [...document.getElementsByClassName('js-form-slider__mark-description')]

  if (window.innerWidth < 768) {
    for (let i = 0; i < sliderMarkMessages; i++) {
      sliderMarkMessages[i].innerHTML = i + 1 + ''
    }
  }

  console.log(sliderMarkMessages)
  
  jsSkillScale.onclick = (event) => {
    defineClosestMark(event, marksCors)
  }

  let defineClosestMark = (event, coordinates) => {
    let xCorClick = event.pageX - jsSkillScaleOffsetLeft
    
    for (let i = 0; i < coordinates.length; i++) {
      let previousMark,
          currentMark

      if (xCorClick > coordinates[i] && xCorClick < coordinates[i + 1]) {
        previousMark = coordinates[i]
        currentMark = coordinates[i + 1]
        half = previousMark + (currentMark - previousMark) / 2

        if (xCorClick >= half) {
           weatherCock.style.left = currentMark - weatherCockShift  + 'px'
            sliderInput.value = i + 2
         } else {
          weatherCock.style.left = previousMark - weatherCockShift + 'px'
          sliderInput.value = i + 1
        }
      }
    }
  }

  function onMouseMove(event) {
    weatherCock.style.transition = '300ms all'
    moveAt(event.pageX)
    
    if (event.pageX > jsSkillScale.offsetWidth + jsSkillScaleOffsetLeft) {
      moveAt(jsSkillScale.offsetWidth + jsSkillScaleOffsetLeft)
    } else if (event.pageX < jsSkillScaleOffsetLeft) {
      moveAt(jsSkillScaleOffsetLeft)
    }
  }

  function moveAt(pageX) {
    weatherCock.style.transition = '300ms transform'
    weatherCock.style.left = pageX - jsSkillScaleOffsetLeft - weatherCockShift + 'px';
  }

  weatherCock.onmousedown = function() {
    weatherCock.classList.add('js--active')
    moveAt(event.pageX)

    document.body.addEventListener('mousemove', onMouseMove);

    weatherCock.onmouseup = function() {
      document.body.removeEventListener('mousemove', onMouseMove);
      defineClosestMark(event, marksCors)
      weatherCock.classList.remove('js--active')
      weatherCock.style.transition = '300ms all'
      weatherCock.onmouseup = null;
    }
  }

  weatherCock.ondragstart = function() {
    return false;
  }
})();

(function formAboutController() {
  const textarea = document.querySelector('.js-form-about-textarea'),
        pseudoTextarea = document.querySelector('.form-about__input')

       pseudoTextarea.onkeypress = () => textarea.innerHTML = pseudoTextarea.innerHTML
}());