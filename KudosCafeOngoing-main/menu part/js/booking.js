/**
 * Booking Functionality
 */

// Booking variables
let currentBookingStep = 1;
let bookingFormData = {};
let paymentMethod = 'payNow';

// Booking modal elements
const bookingForm = document.getElementById('bookingForm');
const nextToReviewBtn = document.getElementById('nextToReviewBtn');
const cancelBookingBtn = document.getElementById('cancelBookingBtn');
const backToDetailsBtn = document.getElementById('backToDetailsBtn');
const nextToPaymentBtn = document.getElementById('nextToPaymentBtn');
const backToReviewBtn = document.getElementById('backToReviewBtn');
const completeBookingBtn = document.getElementById('completeBookingBtn');
const doneBookingBtn = document.getElementById('doneBookingBtn');

// Initialize booking modal
function initBookingModal() {
    goToBookingStep(1);
    bookingForm.reset();
    setMinDateToday(document.getElementById('date'));
    clearValidationErrors();
    openModal(bookingModal);
}

// Navigate to a booking step
function goToBookingStep(step) {
    // Hide all steps
    document.querySelectorAll('.booking-step').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show selected step
    document.getElementById(`bookingStep${step}`).classList.add('active');
    
    // Update progress indicators
    document.querySelectorAll('.progress-step').forEach(el => {
        const stepNum = parseInt(el.dataset.step);
        
        // Remove all classes
        el.classList.remove('active', 'completed');
        
        // Add appropriate class
        if (stepNum === step) {
            el.classList.add('active');
        } else if (stepNum < step) {
            el.classList.add('completed');
        }
    });
    
    // Update progress bars
    document.querySelectorAll('.progress-bar').forEach((bar, index) => {
        if (index + 1 < step) {
            bar.classList.add('completed');
        } else {
            bar.classList.remove('completed');
        }
    });
    
    // Store current step
    currentBookingStep = step;
}

// Validate booking form
function validateBookingForm() {
    let isValid = true;
    clearValidationErrors();
    
    // Validate name
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
        showValidationError('nameError', 'Please enter your name');
        isValid = false;
    }
    
    // Validate contact
    const contactInput = document.getElementById('contact');
    if (!contactInput.value.trim()) {
        showValidationError('contactError', 'Please enter your contact number');
        isValid = false;
    } else if (!validatePhone(contactInput.value)) {
        showValidationError('contactError', 'Please enter a valid contact number');
        isValid = false;
    }
    
    // Validate email
    const emailInput = document.getElementById('email');
    if (!emailInput.value.trim()) {
        showValidationError('emailError', 'Please enter your email address');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showValidationError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate date
    const dateInput = document.getElementById('date');
    if (!dateInput.value) {
        showValidationError('dateError', 'Please select a date');
        isValid = false;
    } else {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showValidationError('dateError', 'Please select a future date');
            isValid = false;
        }
    }
    
    // Validate time
    const timeInput = document.getElementById('time');
    if (!timeInput.value) {
        showValidationError('timeError', 'Please select a time');
        isValid = false;
    }
    
    // Validate guests
    const guestsInput = document.getElementById('guests');
    if (!guestsInput.value || parseInt(guestsInput.value) < 1) {
        showValidationError('guestsError', 'Please enter at least 1 guest');
        isValid = false;
    }
    
    return isValid;
}

// Add helper function for email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show validation error
function showValidationError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Highlight input
    const inputId = errorId.replace('Error', '');
    const inputElement = document.getElementById(inputId);
    inputElement.classList.add('error');
}

// Clear validation errors
function clearValidationErrors() {
    // Clear error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    
    // Remove error highlights
    document.querySelectorAll('input, textarea').forEach(el => {
        el.classList.remove('error');
    });
}

// Collect booking form data
function collectBookingFormData() {
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return {
        id: tempId,
        name: document.getElementById('name').value,
        contact: document.getElementById('contact').value,
        email: document.getElementById('email').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        guests: parseInt(document.getElementById('guests').value),
        special: document.getElementById('special').value
    };
}

// Update review step with form data and cart items
function updateReviewStep() {
    // Get the form data
    const formData = collectBookingFormData();
    
    // Update review sections
    document.getElementById('reviewName').textContent = formData.name;
    document.getElementById('reviewContact').textContent = formData.contact;
    document.getElementById('reviewDateTime').textContent = `${formatDate(formData.date)} at ${formatTime(formData.time)}`;
    document.getElementById('reviewGuests').textContent = formData.guests;
    
    // Handle special requests
    if (formData.special.trim()) {
        document.getElementById('reviewSpecial').textContent = formData.special;
        document.getElementById('reviewSpecialRequests').style.display = 'flex';
    } else {
        document.getElementById('reviewSpecialRequests').style.display = 'none';
    }
    
    // Update order items
    const reviewItems = document.getElementById('reviewItems');
    reviewItems.innerHTML = '';
    
    cartItems.forEach(item => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.innerHTML = `
            <div class="review-item-details">
                <div class="review-item-title">${item.title}</div>
                <div class="review-item-quantity">${item.quantity} × ${formatCurrency(item.price)}</div>
            </div>
            <div class="review-item-price">${formatCurrency(item.price * item.quantity)}</div>
        `;
        reviewItems.appendChild(reviewItem);
    });
    
    // Update totals
    const { subtotal, total } = calculateCartTotals();
    const deposit = total * 0.25;
    
    document.getElementById('reviewSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('reviewTotal').textContent = formatCurrency(total);
    document.getElementById('reviewDeposit').textContent = formatCurrency(deposit);
}

// Update payment step with totals
function updatePaymentStep() {
    const { total } = calculateCartTotals();
    const deposit = total * 0.25;
    
    document.getElementById('paymentTotal').textContent = formatCurrency(total);
    document.getElementById('paymentDeposit').textContent = formatCurrency(deposit);
}

// Update confirmation step
function updateConfirmationStep() {
    const formData = bookingFormData;
    const reservationId = generateId().substring(0, 8).toUpperCase();
    
    document.getElementById('confirmDate').textContent = formatDate(formData.date);
    document.getElementById('confirmTime').textContent = formatTime(formData.time);
    document.getElementById('confirmGuests').textContent = formData.guests;
    document.getElementById('reservationId').textContent = reservationId;
    
    // Set payment status based on method
    if (paymentMethod === 'payNow') {
        document.getElementById('paymentStatus').textContent = 'Deposit has been processed successfully.';
    } else {
        document.getElementById('paymentStatus').textContent = 'Please pay the deposit upon arrival.';
    }
}

// Complete booking process
async function completeBooking() {
    // Save booking data
    bookingFormData = collectBookingFormData();
    paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    const { subtotal, total } = calculateCartTotals();
    const deposit = total * 0.25;

    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...bookingFormData,
                items: cartItems,
                totalAmount: total,
                deposit: deposit,
                paymentMethod: paymentMethod
            })
        });

        if (response.ok) {
            // Update confirmation step
            updateConfirmationStep();
            goToBookingStep(4);
            clearCart();
        } else {
            const errorData = await response.json();
            console.error('Booking API error:', errorData);
            showToast(`Failed to create booking: ${errorData.error || 'Unknown error'}. Please try again.`, 'error');
        }
    } catch (error) {
        console.error('Error creating booking:', error);
        showToast(`Failed to create booking: ${error.message || 'Network error'}. Please try again.`, 'error');
    }
}

// Event Listeners

// Next to Review Button
nextToReviewBtn.addEventListener('click', () => {
    if (validateBookingForm()) {
        bookingFormData = collectBookingFormData();
        updateReviewStep();
        goToBookingStep(2);
    }
});

// Cancel Booking Button
cancelBookingBtn.addEventListener('click', () => {
    closeModal(bookingModal);
});

// Back to Details Button
backToDetailsBtn.addEventListener('click', () => {
    goToBookingStep(1);
});

// Next to Payment Button
nextToPaymentBtn.addEventListener('click', () => {
    updatePaymentStep();
    goToBookingStep(3);
});

// Back to Review Button
backToReviewBtn.addEventListener('click', () => {
    goToBookingStep(2);
});

// Complete Booking Button
completeBookingBtn.addEventListener('click', () => {
    completeBooking();
});

// Done Booking Button
doneBookingBtn.addEventListener('click', () => {
    closeModal(bookingModal);
    showToast('Reservation confirmed! We look forward to serving you.', 'success', 5000);
});

// Payment Method Selection
document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
        const radio = method.querySelector('input[type="radio"]');
        radio.checked = true;
        
        // Update selected class
        document.querySelectorAll('.payment-method').forEach(m => {
            m.classList.remove('selected');
        });
        method.classList.add('selected');
        
        // Update payment method
        paymentMethod = radio.value;
    });
});