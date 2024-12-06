document.addEventListener('DOMContentLoaded', function() {

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });

    const ratingInputs = document.querySelectorAll('.rating-input');
    const ratingDisplay = document.querySelector('.rating-display');

    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (ratingDisplay) {
                ratingDisplay.textContent = `${this.value} stars`;
            }
        });
    });

    const projectDescriptions = document.querySelectorAll('.terminal-effect');
    projectDescriptions.forEach(desc => {
        const text = desc.textContent;
        desc.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                desc.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(desc);
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('invalid');
                    
                    field.classList.add('shake');
                    setTimeout(() => field.classList.remove('shake'), 500);
                    
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        const msg = document.createElement('div');
                        msg.className = 'error-message';
                        msg.textContent = 'This field is required';
                        field.parentNode.appendChild(msg);
                    }
                } else {
                    field.classList.remove('invalid');
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    // Dynamic star rating preview
    const starContainer = document.querySelector('.star-rating-preview');
    if (starContainer) {
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            star.innerHTML = '<i class="fas fa-star"></i>';
            star.dataset.rating = i;
            
            star.addEventListener('mouseover', function() {
                const rating = this.dataset.rating;
                highlightStars(rating);
            });

            star.addEventListener('click', function() {
                const rating = this.dataset.rating;
                document.querySelector('input[name="stars"]').value = rating;
                highlightStars(rating);
            });

            starContainer.appendChild(star);
        }
    }

    function highlightStars(rating) {
        const stars = document.querySelectorAll('.star i');
        stars.forEach((star, index) => {
            star.style.color = index < rating ? '#ffd700' : '#ccc';
        });
    }
});