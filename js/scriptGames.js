$(document).ready(function () {
  $('.search-bar').on('submit', function (e) {
      e.preventDefault();

      // Wait until gameSearchMap is ready
      if (!window.isGameSearchReady) {
          alert("Search is still loading. Please wait a moment and try again.");
          return;
      }

      let input = $(this).find('input[name="q"]').val().toLowerCase().trim();
      input = input.replace(/\s+/g, '');

      if (window.gameSearchMap && window.gameSearchMap[input]) {
          window.location.href = window.gameSearchMap[input];
      } else {
          alert("Game not found. Try a different search term.");
      }
  });
});



