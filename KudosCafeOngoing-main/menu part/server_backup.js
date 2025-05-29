import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Initialize database
async function initializeDb() {
    console.log('Initializing database...');
    const db = await open({
        filename: 'kudos_backup.db',
        driver: sqlite3.Database
    });
    console.log('Database connection established');

    console.log('Creating tables if they don\'t exist...');
    // Create tables if they don't exist
    await db.exec(`
        CREATE TABLE IF NOT EXISTS bookings (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            guests INTEGER NOT NULL,
            special_requests TEXT,
            items TEXT,
            total_amount REAL NOT NULL,
            deposit REAL NOT NULL,
            payment_method TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            archived BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return db;
}

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const PORT = 4000;

// Initialize database and start server
initializeDb().then(async db => {
    // Check current bookings
    console.log('Checking existing bookings...');
    const bookings = await db.all('SELECT * FROM bookings');
    console.log('Current bookings:', bookings);
    
    // Add test data if table is empty
    if (bookings.length === 0) {
        console.log('Adding test booking...');
        await db.run(`
            INSERT INTO bookings (id, name, phone, date, time, guests, total_amount, deposit, payment_method, status)
            VALUES (
                'test1',
                'John Doe',
                '1234567890',
                date('now'),
                '18:00',
                2,
                100.00,
                20.00,
                'cash',
                'pending'
            )
        `);
        console.log('Test booking added');
    }

    // Get all bookings
    app.get('/api/bookings', async (req, res) => {
        console.log('GET /api/bookings request received');
        try {
            console.log('Querying database...');
            const bookings = await db.all('SELECT * FROM bookings ORDER BY created_at DESC');
            console.log('Bookings fetched:', bookings);
            res.status(200).json(bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            res.status(500).json({ error: 'Failed to fetch bookings' });
        }
    });

    // Create a new booking
    app.post('/api/bookings', async (req, res) => {
        try {
            const { id, name, contact, email, date, time, guests, special, items, totalAmount, deposit, paymentMethod } = req.body;
            
            // Generate a unique booking ID if not provided
            const bookingId = id || `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            
            await db.run(`
                INSERT INTO bookings (id, name, phone, email, date, time, guests, special_requests, items, total_amount, deposit, payment_method, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [bookingId, name, contact, email, date, time, guests, special, JSON.stringify(items), totalAmount, deposit, paymentMethod, 'pending']);
            
            res.status(201).json({ 
                message: 'Booking created successfully',
                bookingId: bookingId
            });
        } catch (error) {
            console.error('Error creating booking:', error);
            res.status(500).json({ error: 'Failed to create booking' });
        }
    });

    // Confirm a temporary booking
    app.post('/api/bookings/:tempId/confirm', async (req, res) => {
        try {
            const { tempId } = req.params;
            const { bookingId } = req.body;
            
            console.log('Confirming temporary booking:', tempId);
            console.log('New booking ID:', bookingId);
            
            // Validate IDs
            if (!tempId || !bookingId) {
                return res.status(400).json({ error: 'Missing temporary ID or booking ID' });
            }
            
            // Update the booking with the new ID
            const result = await db.run(
                'UPDATE bookings SET id = ? WHERE id = ?',
                [bookingId, tempId]
            );
            
            if (result.changes === 0) {
                return res.status(404).json({ error: 'Temporary booking not found' });
            }
            
            console.log('Successfully confirmed booking:', bookingId);
            res.status(200).json({ message: 'Booking confirmed successfully' });
        } catch (error) {
            console.error('Error confirming booking:', error);
            res.status(500).json({ error: 'Failed to confirm booking' });
        }
    });

    // Update a booking
    app.patch('/api/bookings/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;
            
            console.log('Received PATCH request for booking:', id);
            console.log('Update data:', updates);
            
            // Validate booking ID
            if (!id || id === 'null') {
                console.error('Invalid booking ID:', id);
                return res.status(400).json({ error: 'Invalid booking ID' });
            }
            
            // Check if booking exists
            const booking = await db.get('SELECT * FROM bookings WHERE id = ?', [id]);
            if (!booking) {
                console.log('No booking found with ID:', id);
                return res.status(404).json({ error: 'Booking not found' });
            }
            
            // Build the update query dynamically based on provided fields
            const updateFields = [];
            const updateValues = [];
            
            Object.entries(updates).forEach(([key, value]) => {
                if (key === 'status') {
                    updateFields.push('status = ?');
                    updateValues.push(value);
                    console.log(`Adding status update: status = ${value}`);
                } else {
                    // Convert camelCase to snake_case for database fields
                    const dbField = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
                    updateFields.push(`${dbField} = ?`);
                    updateValues.push(value);
                    console.log(`Adding update field: ${dbField} = ${value}`);
                }
            });
            
            if (updateFields.length === 0) {
                console.error('No valid update fields provided');
                return res.status(400).json({ error: 'No valid update fields provided' });
            }
            
            // Add the ID to the values array
            updateValues.push(id);
            
            const query = `UPDATE bookings SET ${updateFields.join(', ')} WHERE id = ?`;
            console.log('Executing query:', query);
            console.log('With values:', updateValues);
            
            const result = await db.run(query, updateValues);
            console.log('Update result:', result);
            
            if (result.changes === 0) {
                console.log('No changes made to booking:', id);
                return res.status(400).json({ error: 'No changes made to booking' });
            }
            
            console.log('Successfully updated booking:', id);
            res.status(200).json({ message: 'Booking updated successfully' });
        } catch (error) {
            console.error('Error updating booking:', error);
            res.status(500).json({ error: 'Failed to update booking: ' + error.message });
        }
    });

    // Delete a booking
    app.delete('/api/bookings/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.run('DELETE FROM bookings WHERE id = ?', [id]);
            
            if (result.changes === 0) {
                return res.status(404).json({ error: 'Booking not found' });
            }
            
            res.status(200).json({ message: 'Booking deleted successfully' });
        } catch (error) {
            console.error('Error deleting booking:', error);
            res.status(500).json({ error: 'Failed to delete booking' });
        }
    });

    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
        console.log(`Admin panel available at http://localhost:${PORT}/admin.html`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});