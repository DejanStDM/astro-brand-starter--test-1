export function countDownTimer  ()  {
    const countDownElements = document.querySelectorAll(".counter-wrapper");

    countDownElements.forEach(element => {
        timer(element);
    });

    function timer(el) {
        // Set the date we're counting down to
        const countDownDate = new Date(
            el.dataset.countDownTo
        ).getTime();

        if(isNaN(countDownDate)) return;

        const x = setInterval(function () {
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance between now and the count down date
            const distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            let minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Add leading zeros when number is < 10 (if needed)
            if (days < 10) {
                days = "0" + days;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            // If the countdown is finished, stop timer and set values to zero
            if (distance < 0) {
                clearInterval(x);
                days = "0" + 0;
                hours = "0" + 0;
                minutes = "0" + 0;
                seconds = "0" + 0;
            }

            // Display the result in the elements with animation
            const daysEl = el.querySelector("[data-days]");
            const hoursEl = el.querySelector("[data-hours]");
            const minutesEl = el.querySelector("[data-minutes]");
            const secondsEl = el.querySelector("[data-seconds]");
            
            // Only update if value changed
            if (daysEl.textContent !== days) {
                daysEl.textContent = days;
                daysEl.classList.add('pulse');
                setTimeout(() => daysEl.classList.remove('pulse'), 600);
            }
            if (hoursEl.textContent !== hours) {
                hoursEl.textContent = hours;
                hoursEl.classList.add('pulse');
                setTimeout(() => hoursEl.classList.remove('pulse'), 600);
            }
            if (minutesEl.textContent !== minutes) {
                minutesEl.textContent = minutes;
                minutesEl.classList.add('pulse');
                setTimeout(() => minutesEl.classList.remove('pulse'), 600);
            }
            if (secondsEl.textContent !== seconds) {
                secondsEl.textContent = seconds;
                secondsEl.classList.add('pulse');
                setTimeout(() => secondsEl.classList.remove('pulse'), 600);
            }
        }, 1000);
    }
};

// countDownTimer();
