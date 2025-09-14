console.log('ABBAH-Point');

// ✅ Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();

// STICKY BEHAVIOUR
const sectionHeroEl = document.querySelector('#section-hero');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    // console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add('sticky');
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove('sticky');
    }
  },
  {
    // In the ViewPort
    root: null,
    threshold: 0,
  }
);
obs.observe(sectionHeroEl);

// Modal
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('ratingModal');
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('closeModal');
  const stars = document.querySelectorAll('#starRating .star');
  const feedbackForm = document.getElementById('feedbackForm');
  const textarea = feedbackForm.querySelector('textarea');
  const thankYouModal = document.getElementById('thankYouModal');

  let selectedValue = 0;
  let hasReviewed = false; // 🚀 track if review is submitted

  // Function to open modal
  function openModal() {
    if (!hasReviewed) {
      // only open if no review yet
      modal.classList.add('show');
      overlay.style.display = 'block';
    }
  }

  // Open modal every 1 min
  setInterval(openModal, 60000);

  // Close modal function
  function closeModal() {
    modal.classList.remove('show');
    overlay.style.display = 'none';
  }

  // Close on overlay or close button click
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  // Stars logic
  stars.forEach((star) => {
    star.addEventListener('mouseover', () => {
      stars.forEach((s) => s.classList.remove('hovered'));
      let index = [...stars].indexOf(star);
      for (let i = 0; i <= index; i++) stars[i].classList.add('hovered');
    });

    star.addEventListener('mouseout', () => {
      stars.forEach((s) => s.classList.remove('hovered'));
    });

    star.addEventListener('click', () => {
      selectedValue = star.dataset.value;
      stars.forEach((s) => s.classList.remove('selected'));
      let index = [...stars].indexOf(star);
      for (let i = 0; i <= index; i++) stars[i].classList.add('selected');
    });
  });

  // Feedback submit
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // close rating modal
    closeModal();

    // show thank you modal
    thankYouModal.classList.add('show');
    setTimeout(() => {
      thankYouModal.classList.remove('show');
    }, 1000);

    // reset stars & textarea
    selectedValue = 0;
    stars.forEach((s) => {
      s.classList.remove('selected');
      s.classList.remove('hovered');
    });
    textarea.value = '';

    // 🚀 mark as reviewed
    hasReviewed = true;
  });
});
