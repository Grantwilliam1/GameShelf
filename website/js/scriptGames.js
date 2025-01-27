document.querySelector('.search-bar').addEventListener('submit', function (event) {
    event.preventDefault();
    let query = event.target.querySelector('input[name="q"]').value.toLowerCase();

    query = query.replace(/\s+/g, '');

    const pages = {
      balatro: '../games/balatro.html',
      persona5royal: '../games/persona5.html',
      pikmin: '../games/pikmin.html',
      pikmin2: '../games/pikmin2.html'
    };

    if (pages[query]) {
      window.location.href = pages[query];
    } else {
      alert('Page not found. Please try a different search term.');
    }
  });