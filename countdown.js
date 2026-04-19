"use strict";

const getElement = selector => document.querySelector(selector);

let countdownInterval = null;

document.addEventListener("DOMContentLoaded", () => {

    getElement("#countdown").addEventListener("click", () => {
        const eventName = getElement("#event").value.trim();
        const eventDateString = getElement("#date").value;
        const messageLbl = getElement("#message");

        // clear previous countdown
        if (countdownInterval !== null) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }

        // validate input
        if (eventName === "" || eventDateString === "") {
            messageLbl.textContent = "Please enter both a name and a date.";
            return;
        }

        const eventDate = new Date(eventDateString);
        if (isNaN(eventDate.getTime())) {
            messageLbl.textContent = "Please enter a valid date.";
            return;
        }

        const updateCountdown = () => {
            const now = new Date();
            let seconds = Math.floor((eventDate.getTime() - now.getTime()) / 1000);

            if (seconds < 0) {
                clearInterval(countdownInterval);
                countdownInterval = null;
                messageLbl.textContent = `${eventName} has already happened.`;
                return;
            }

            const days = Math.floor(seconds / 86400);
            const hours = Math.floor(seconds / 3600) % 24;
            const minutes = Math.floor(seconds / 60) % 60;
            const secs = seconds % 60;

            messageLbl.textContent =
                `${days} day(s), ${hours} hour(s), ${minutes} minute(s), ` +
                `${secs} second(s) until ${eventName}!`;
        };

        updateCountdown(); // show immediately
        countdownInterval = setInterval(updateCountdown, 1000);
    });

    getElement("#event").focus();
});