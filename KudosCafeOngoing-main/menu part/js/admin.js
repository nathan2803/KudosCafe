/**
 * Admin Panel Functionality
 */

// DOM Elements
const bookingsGrid = document.querySelector('.bookings-grid');
const filterButtons = document.querySelectorAll('.filter-btn');



// State
let bookings = [];
let currentFilter = 'all';

// Fetch bookings from the server
async function fetchBookings() {
    try {
        console.log('Fetching bookings...');
        const response = await fetch('/api/bookings');
        console.log('Response status:', response.status);
        if (!response.ok) throw new Error('Failed to fetch bookings');
        
        bookings = await response.json();
        console.log('Fetched bookings:', bookings);
        renderBookings();
        console.log('Rendered bookings');
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to load bookings', 'error');
    }
}

// Render bookings to the grid
function renderBookings() {
    console.log('Starting renderBookings with bookings:', bookings);
    try {
        if (!Array.isArray(bookings)) {
            console.error('Bookings is not an array:', bookings);
            showNotification('Invalid bookings data', 'error');
            return;
        }
        
        const filteredBookings = filterBookings(bookings);
        console.log('Filtered bookings:', filteredBookings);
        
        if (!bookingsGrid) {
            console.error('Bookings grid element not found');
            return;
        }
        
        const bookingCards = filteredBookings.map(booking => {
            try {
                return createBookingCard(booking);
            } catch (error) {
                console.error('Error creating booking card:', error, booking);
                return '';
            }
        });
        
        bookingsGrid.innerHTML = bookingCards.join('');
        console.log('Rendered', bookingCards.length, 'booking cards');
    } catch (error) {
        console.error('Error in renderBookings:', error);
        showNotification('Error displaying bookings', 'error');
    }
}

// Filter bookings based on current filter
function filterBookings(bookings) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch(currentFilter) {
        case 'today':
            return bookings.filter(booking => {
                const bookingDate = new Date(booking.date);
                return bookingDate.toDateString() === today.toDateString();
            });
        case 'upcoming':
            return bookings.filter(booking => {
                const bookingDate = new Date(booking.date);
                return bookingDate > today;
            });
        case 'past':
            return bookings.filter(booking => {
                const bookingDate = new Date(booking.date);
                return bookingDate < today;
            });
        default:
            return bookings;
    }
}

// Create HTML for a booking card
function createBookingCard(booking) {
    if (!booking || !booking.name) {
        console.error('Invalid booking data:', booking);
        return '';
    }

    const bookingDate = new Date(booking.date);
    const formattedDate = bookingDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const status = booking.status || 'pending';
    const isTemporary = !booking.id || booking.id.startsWith('temp-');
    const bookingId = booking.id || `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    let formattedItems = '';
    if (booking.items) {
        try {
            const items = typeof booking.items === 'string' ? JSON.parse(booking.items) : booking.items;
            formattedItems = Array.isArray(items) ? items.map(item => `${item.title} (${item.quantity})`).join(', ') : '';
        } catch (error) {
            console.error('Error parsing items:', error);
            formattedItems = 'Error displaying items';
        }
    }
    
    return `
        <div class="booking-card ${isTemporary ? 'temporary' : ''}" data-id="${bookingId}">
            <div class="booking-header">
                <h3>${booking.name}</h3>
                ${isTemporary ? '<span class="temporary-badge">Pending Confirmation</span>' : ''}
                <button class="delete-booking-btn" onclick="deleteBooking('${bookingId}')">Delete</button>
            </div>
            <div class="booking-details">
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${booking.time}</p>
                <p><strong>Guests:</strong> ${booking.guests}</p>
                <p><strong>Contact:</strong> ${booking.phone}</p>
                <p><strong>Email:</strong> ${booking.email || 'Not provided'}</p>
                <p><strong>Total Amount:</strong> $${(booking.total_amount || 0).toFixed(2)}</p>
                ${formattedItems ? `<p><strong>Orders:</strong> ${formattedItems}</p>` : ''}
                ${booking.special_requests ? `<p><strong>Special Requests:</strong> ${booking.special_requests}</p>` : ''}
            </div>
            ${isTemporary ? `
                <div class="booking-actions">
                    <button class="confirm-booking-btn" onclick="confirmTemporaryBooking('${bookingId}')">Confirm Booking</button>
                    <p class="temporary-notice">This booking needs to be confirmed in the system before status can be updated.</p>
                </div>
            ` : `
                <div class="booking-status">
                    <span class="status-label">Status:</span>
                    <div class="status-buttons">
                        <button class="status-btn pending ${status === 'pending' ? 'active' : ''}" 
                                data-status="pending" 
                                data-id="${bookingId}">Pending</button>
                        <button class="status-btn confirmed ${status === 'confirmed' ? 'active' : ''}" 
                                data-status="confirmed" 
                                data-id="${bookingId}">Confirmed</button>
                        <button class="status-btn cancelled ${status === 'cancelled' ? 'active' : ''}" 
                                data-status="cancelled" 
                                data-id="${bookingId}">Cancelled</button>
                    </div>
                </div>
            `}
        </div>
    `;
}

// Confirm a temporary booking
async function confirmTemporaryBooking(tempId) {
    try {
        console.log('Confirming temporary booking:', tempId);
        const bookingId = `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const response = await fetch(`/api/bookings/${tempId}/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookingId })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to confirm temporary booking');
        }

        // Refresh the bookings display
        await fetchBookings();
        showNotification('Booking confirmed successfully', 'success');
    } catch (error) {
        console.error('Error confirming temporary booking:', error);
        showNotification(error.message || 'Failed to confirm temporary booking', 'error');
    }
}

// Update booking status to confirmed
async function confirmBooking(bookingId) {
    if (bookingId.startsWith('temp-')) {
        return confirmTemporaryBooking(bookingId);
    }
    
    try {
        const response = await fetch(`/api/bookings/${bookingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'confirmed' })
        });
        
        if (!response.ok) throw new Error('Failed to confirm booking');
        
        showNotification('Booking confirmed successfully', 'success');
        await fetchBookings();
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to confirm booking', 'error');
    }
}

async function cancelBooking(bookingId) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
        const response = await fetch(`/api/bookings/${bookingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'cancelled' })
        });
        
        if (!response.ok) throw new Error('Failed to cancel booking');
        
        showNotification('Booking cancelled successfully', 'info');
        await fetchBookings();
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to cancel booking', 'error');
    }
}



async function updateBookingStatus(bookingId, status) {
    try {
        console.log(`Updating booking ${bookingId} status to ${status}`);
        
        // Check if this is a temporary ID
        if (bookingId.startsWith('temp-')) {
            console.warn('Cannot update status for temporary booking ID:', bookingId);
            showNotification('Cannot update status for temporary bookings', 'error');
            return;
        }
        
        const response = await fetch(`/api/bookings/${bookingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        
        console.log('Update response status:', response.status);
        const responseData = await response.json();
        console.log('Update response data:', responseData);
        
        if (!response.ok) {
            throw new Error(`Failed to update booking status: ${responseData.error || response.statusText}`);
        }
        
        // Update UI only after successful API call
        const card = document.querySelector(`.booking-card[data-id="${bookingId}"]`);
        if (card) {
            const statusButtons = card.querySelectorAll('.status-btn');
            statusButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.status === status);
            });
            console.log('Updated UI status buttons');
        } else {
            console.warn('Booking card not found in DOM:', bookingId);
        }
        
        showNotification(`Booking status updated to ${status}`, 'success');
    } catch (error) {
        console.error('Error updating booking status:', error);
        showNotification(`Failed to update booking status: ${error.message}`, 'error');
        // Revert UI changes on error by re-fetching current state
        await fetchBookings();
    }
}

async function archiveBooking(bookingId) {
    try {
        const response = await fetch(`/api/bookings/${bookingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ archived: true })
        });
        
        if (!response.ok) throw new Error('Failed to archive booking');
        
        showNotification('Booking archived successfully', 'info');
        await fetchBookings();
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to archive booking', 'error');
    }
}

// Delete a booking
async function deleteBooking(bookingId) {
    if (!confirm('Are you sure you want to delete this booking?')) {
        return;
    }

    try {
        const response = await fetch(`/api/bookings/${bookingId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete booking');
        }

        // Refresh the bookings display
        await fetchBookings();
        showNotification('Booking deleted successfully', 'success');
    } catch (error) {
        console.error('Error deleting booking:', error);
        showNotification(error.message || 'Failed to delete booking', 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize admin panel
function initAdminPanel() {
    console.log('Initializing admin panel...');
    
    // Check if required DOM elements exist
    if (!bookingsGrid) {
        console.error('Bookings grid element not found');
        showNotification('Failed to initialize admin panel', 'error');
        return;
    }

    if (!filterButtons || filterButtons.length === 0) {
        console.warn('Filter buttons not found');
    }

    // Make functions globally accessible
    window.confirmBooking = confirmBooking;
    window.cancelBooking = cancelBooking;
    window.archiveBooking = archiveBooking;
    window.deleteBooking = deleteBooking;
    window.confirmTemporaryBooking = confirmTemporaryBooking;

    // Add event delegation for booking cards
    bookingsGrid.addEventListener('click', async (e) => {
        // Handle status buttons
        const statusBtn = e.target.closest('.status-btn');
        if (statusBtn) {
            e.preventDefault();
            const card = statusBtn.closest('.booking-card');
            if (!card) {
                console.error('Could not find booking card element');
                return;
            }
            
            const targetId = card.dataset.id;
            const newStatus = statusBtn.dataset.status;
            
            if (!targetId || !newStatus) {
                console.error('Missing required data:', { targetId, newStatus });
                return;
            }
            
            console.log('Status button clicked:', { targetId, newStatus });
            
            try {
                // Disable the button during update
                statusBtn.disabled = true;
                
                // Update the booking status
                await updateBookingStatus(targetId, newStatus);
            } catch (error) {
                console.error('Error handling status button click:', error);
                showNotification(`Failed to update status: ${error.message}`, 'error');
            } finally {
                // Re-enable the button
                statusBtn.disabled = false;
            }
        }
    });

    // Add filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update filter and re-render
            currentFilter = button.dataset.filter;
            renderBookings();
        });
    });
    
    // Initial fetch
    fetchBookings();
    
    // Set up polling for updates
    setInterval(fetchBookings, 30000); // Poll every 30 seconds
}

// Start the admin panel when the page loads
document.addEventListener('DOMContentLoaded', initAdminPanel);