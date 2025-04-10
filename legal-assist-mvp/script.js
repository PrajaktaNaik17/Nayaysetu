// Screen switching
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Home: Matchmaking form submission
document.getElementById('match-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const caseType = document.getElementById('case-type').value;
    const budget = document.getElementById('budget').value;
    const location = document.getElementById('location').value;

    // Sample lawyer data (replace with backend API call later)
    const lawyers = [
        { 
            name: "John Doe", 
            specialty: "fraud", 
            price: 100,
            experience: "5 years",
            rating: "4.8/5",
            location: "Mumbai"
        },
        { 
            name: "Jane Smith", 
            specialty: "domestic", 
            price: 150,
            experience: "8 years",
            rating: "4.9/5",
            location: "Delhi"
        },
        { 
            name: "Robert Johnson", 
            specialty: "fraud", 
            price: 200,
            experience: "10 years",
            rating: "4.7/5",
            location: "Bangalore"
        }
    ];

    // Filter lawyers based on case type and budget
    const matches = lawyers.filter(lawyer => 
        lawyer.specialty === caseType && 
        lawyer.price <= (budget || 1000) &&
        (!location || lawyer.location.toLowerCase().includes(location.toLowerCase()))
    );

    const resultsDiv = document.getElementById('lawyer-results');
    if (matches.length > 0) {
        resultsDiv.innerHTML = matches.map(lawyer => `
            <div class="lawyer-card">
                <h3>${lawyer.name}</h3>
                <p><strong>Experience:</strong> ${lawyer.experience}</p>
                <p><strong>Rating:</strong> ${lawyer.rating}</p>
                <p><strong>Location:</strong> ${lawyer.location}</p>
                <p><strong>Price:</strong> $${lawyer.price}/hour</p>
                <button onclick="startChat('${lawyer.name}')">Contact Lawyer</button>
            </div>
        `).join('');
    } else {
        resultsDiv.innerHTML = '<p class="no-results">No lawyers found matching your criteria. Please try adjusting your search.</p>';
    }
});

// Chat functionality
let currentLawyer = null;

function startChat(lawyerName) {
    currentLawyer = lawyerName;
    showScreen('chat');
    document.getElementById('chat-messages').innerHTML = `
        <p class="system-message">Connected with ${lawyerName}. How can we help you today?</p>
    `;
}

document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        const messagesDiv = document.getElementById('chat-messages');
        messagesDiv.innerHTML += `<p class="user-message">You: ${message}</p>`;
        
        // Simulate lawyer response (replace with actual API call later)
        setTimeout(() => {
            messagesDiv.innerHTML += `<p class="lawyer-message">${currentLawyer}: I'll review your case and get back to you shortly.</p>`;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }, 1000);
        
        input.value = '';
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
});

// Case Tracker: Load sample data
window.onload = function() {
    const caseTable = document.getElementById('case-table');
    const cases = [
        { 
            id: "001", 
            status: "Pending", 
            lastUpdate: new Date().toLocaleDateString(),
            type: "Extortion & Financial Fraud",
            lawyer: "John Doe"
        },
        { 
            id: "002", 
            status: "In Progress", 
            lastUpdate: new Date().toLocaleDateString(),
            type: "Domestic Violence & Abuse",
            lawyer: "Jane Smith"
        }
    ];
    
    caseTable.innerHTML = cases.map(c => `
        <tr>
            <td>${c.id}</td>
            <td>${c.status}</td>
            <td>${c.lastUpdate}</td>
            <td>${c.type}</td>
            <td>${c.lawyer}</td>
        </tr>
    `).join('');
    
    showScreen('home'); // Start on home screen
};
