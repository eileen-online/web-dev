// Mouse-responsive gradient
(function() {
    const bar = document.getElementById('gradientBar');
    let percent = 50, target = 50;
    let animating = false;
    function animate() {
      percent += (target - percent) * 0.08;
      bar.style.backgroundPosition = percent + '% 50%';
      if (Math.abs(target - percent) > 0.25) {
        requestAnimationFrame(animate);
      } else {
        percent = target;
        bar.style.backgroundPosition = percent + '% 50%';
        animating = false;
      }
    }
    bar.addEventListener('mousemove', function(e) {
      const rect = bar.getBoundingClientRect();
      target = Math.max(0, Math.min(100, (e.clientX - rect.left) / rect.width * 100));
      if (!animating) {
        animating = true;
        animate();
      }
    });
    // Mobile gentle auto drift
    if (window.innerWidth < 768) {
      let driftTime = 0;
      setInterval(() => {
        driftTime += 0.065;
        target = 50 + 48 * Math.sin(driftTime/1.8);
        if (!animating) {
          animating = true;
          animate();
        }
      }, 84);
    }
  })();
  
  // Geolocation-based local weather using OpenWeatherMap
  const API_KEY = '95a4b16d8d873574c89cb9bb79a036fe';
  const tempEl = document.getElementById('temp');
  const errorEl = document.getElementById('tempError');
  const loadingEl = document.getElementById('loadingTemp');
  
  function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather` +
      `?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
    return fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Weather data unavailable');
        return res.json();
      });
  }
  
  function showTemp(data) {
    loadingEl.style.display = 'none';
    tempEl.textContent = `${Math.round(data.main.temp)}°F`;
  }
  
  function showError(err) {
    loadingEl.style.display = 'none';
    errorEl.textContent = err.message;
    errorEl.style.display = 'block';
  }
  
  navigator.geolocation.getCurrentPosition(
    position => {
      fetchWeatherByCoords(position.coords.latitude, position.coords.longitude)
        .then(showTemp)
        .catch(showError);
    },
    () => {
      // fallback to Brooklyn, NY
      fetchWeatherByCoords(40.7128, -74.0060)
        .then(showTemp)
        .catch(showError);
    }
  );
  
  document.addEventListener('DOMContentLoaded', () => {
    const aboutLink = document.querySelector('a.about-link');
    const aboutModal = document.getElementById('aboutModal');
    const modalClose = document.querySelector('.modal-close');
  
    aboutLink.addEventListener('click', e => {
      e.preventDefault();
      aboutModal.classList.add('show');
    });
  
    modalClose.addEventListener('click', () => {
      aboutModal.classList.remove('show');
    });
  
    window.addEventListener('click', e => {
      if (e.target === aboutModal) {
        aboutModal.classList.remove('show');
      }
    });
  });

  