// Rating System JavaScript
class RatingSystem {
    constructor(container) {
        this.container = container;
        this.stars = container.querySelectorAll('.star');
        this.input = container.querySelector('input[name="stars"]');
        this.currentRating = 0;
        this.init();
    }

    init() {
        this.stars.forEach((star, index) => {
            star.addEventListener('mouseover', () => this.highlightStars(index + 1));
            star.addEventListener('mouseout', () => this.highlightStars(this.currentRating));
            star.addEventListener('click', () => this.setRating(index + 1));
        });

        // Initialize rating bars
        this.updateRatingBars();
    }

    highlightStars(rating) {
        this.stars.forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }

    setRating(rating) {
        this.currentRating = rating;
        this.input.value = rating;
        this.highlightStars(rating);
        
        // Add selection effect
        this.stars[rating - 1].classList.add('pulse');
        setTimeout(() => {
            this.stars[rating - 1].classList.remove('pulse');
        }, 200);
    }

    updateRatingBars() {
        const bars = this.container.querySelectorAll('.rating-bar-fill');
        bars.forEach(bar => {
            const width = bar.dataset.percentage;
            setTimeout(() => {
                bar.style.width = `${width}%`;
            }, 100);
        });
    }
}

// Initialize rating systems
document.addEventListener('DOMContentLoaded', () => {
    const ratingContainers = document.querySelectorAll('.rating-container');
    ratingContainers.forEach(container => {
        new RatingSystem(container);
    });
});