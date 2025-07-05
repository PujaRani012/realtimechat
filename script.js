// Mock data for demonstration
const mockUsers = [
    { id: 1, name: 'Alice Johnson', status: 'online', avatar: 'AJ' },
    { id: 2, name: 'Bob Smith', status: 'online', avatar: 'BS' },
    { id: 3, name: 'Carol Davis', status: 'offline', avatar: 'CD' },
    { id: 4, name: 'David Wilson', status: 'online', avatar: 'DW' },
    { id: 5, name: 'Emma Brown', status: 'online', avatar: 'EB' },
    { id: 6, name: 'Frank Miller', status: 'offline', avatar: 'FM' }
];

const mockChats = [
    { id: 1, name: 'Alice Johnson', lastMessage: 'Hey, how are you doing?', avatar: 'AJ', time: '2 min ago' },
    { id: 2, name: 'Bob Smith', lastMessage: 'Thanks for the help!', avatar: 'BS', time: '1 hour ago' },
    { id: 3, name: 'Carol Davis', lastMessage: 'See you tomorrow', avatar: 'CD', time: '3 hours ago' },
    { id: 4, name: 'David Wilson', lastMessage: 'Great job on the project', avatar: 'DW', time: '1 day ago' }
];

const mockMessages = [
    { id: 1, text: 'Hey there! How are you doing?', type: 'received', time: '10:30 AM' },
    { id: 2, text: 'Hi! I\'m doing great, thanks for asking. How about you?', type: 'sent', time: '10:32 AM' },
    { id: 3, text: 'I\'m good too! Just working on some projects.', type: 'received', time: '10:33 AM' },
    { id: 4, text: 'That sounds interesting! What kind of projects?', type: 'sent', time: '10:35 AM' },
    { id: 5, text: 'Mostly web development stuff. Building some chat applications.', type: 'received', time: '10:36 AM' },
    { id: 6, text: 'Cool! I love working with real-time features.', type: 'sent', time: '10:38 AM' }
];

// Authentication functions
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        // Simulate login success
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        window.location.href = 'dashboard.html';
    } else {
        alert('Please fill in all fields');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (fullName && email && password) {
        // Simulate registration success
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', fullName);
        window.location.href = 'dashboard.html';
    } else {
        alert('Please fill in all fields');
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
}

function goBack() {
    window.location.href = 'dashboard.html';
}

// Dashboard functions
function populateOnlineUsers() {
    const container = document.getElementById('onlineUsers');
    if (!container) return;
    
    container.innerHTML = '';
    
    mockUsers.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.onclick = () => startChat(user);
        
        userCard.innerHTML = `
            <div class="avatar">${user.avatar}</div>
            <h3>${user.name}</h3>
            <span class="status ${user.status}">${user.status}</span>
        `;
        
        container.appendChild(userCard);
    });
}

function populateRecentChats() {
    const container = document.getElementById('recentChats');
    if (!container) return;
    
    container.innerHTML = '';
    
    mockChats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';
        chatItem.onclick = () => openChat(chat);
        
        chatItem.innerHTML = `
            <div class="avatar">${chat.avatar}</div>
            <div class="chat-info">
                <h4>${chat.name}</h4>
                <p>${chat.lastMessage}</p>
            </div>
            <span style="font-size: 12px; color: #666; margin-left: auto;">${chat.time}</span>
        `;
        
        container.appendChild(chatItem);
    });
}

function startChat(user) {
    localStorage.setItem('currentChatUser', JSON.stringify(user));
    window.location.href = 'chat.html';
}

function openChat(chat) {
    localStorage.setItem('currentChatUser', JSON.stringify(chat));
    window.location.href = 'chat.html';
}

// Chat functions
function populateMessages() {
    const container = document.getElementById('messagesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    mockMessages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;
        
        messageDiv.innerHTML = `
            ${message.text}
            <div class="message-time">${message.time}</div>
        `;
        
        container.appendChild(messageDiv);
    });
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function handleSendMessage(event) {
    event.preventDefault();
    const input = document.getElementById('messageInput');
    const messageText = input.value.trim();
    
    if (!messageText) return;
    
    // Add message to container
    const container = document.getElementById('messagesContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message sent';
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        ${messageText}
        <div class="message-time">${timeString}</div>
    `;
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
    
    // Clear input
    input.value = '';
    
    // Simulate received message after a delay
    setTimeout(() => {
        const responses = [
            'That\'s interesting!',
            'I see what you mean.',
            'Thanks for sharing!',
            'Tell me more about that.',
            'That sounds great!'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseDiv = document.createElement('div');
        responseDiv.className = 'message received';
        
        responseDiv.innerHTML = `
            ${randomResponse}
            <div class="message-time">${timeString}</div>
        `;
        
        container.appendChild(responseDiv);
        container.scrollTop = container.scrollHeight;
    }, 1000 + Math.random() * 2000);
}

// Initialize page based on current location
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Check authentication for protected pages
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const protectedPages = ['dashboard.html', 'chat.html'];
    
    if (protectedPages.includes(currentPage) && !isLoggedIn) {
        window.location.href = 'index.html';
        return;
    }
    
    // Initialize based on current page
    switch (currentPage) {
        case 'index.html':
        case '':
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', handleLogin);
            }
            break;
            
        case 'register.html':
            const registerForm = document.getElementById('registerForm');
            if (registerForm) {
                registerForm.addEventListener('submit', handleRegister);
            }
            break;
            
        case 'dashboard.html':
            populateOnlineUsers();
            populateRecentChats();
            
            // Update user name in header
            const userName = localStorage.getItem('userName') || 'User';
            const userNameElement = document.querySelector('.user-name');
            if (userNameElement) {
                userNameElement.textContent = userName;
            }
            break;
            
        case 'chat.html':
            populateMessages();
            
            const messageForm = document.getElementById('messageForm');
            if (messageForm) {
                messageForm.addEventListener('submit', handleSendMessage);
            }
            
            // Update chat header with current user info
            const currentUser = JSON.parse(localStorage.getItem('currentChatUser') || '{}');
            if (currentUser.name) {
                const chatUserInfo = document.querySelector('.chat-user-info h3');
                if (chatUserInfo) {
                    chatUserInfo.textContent = currentUser.name;
                }
                
                const chatAvatar = document.querySelector('.chat-user-info .avatar');
                if (chatAvatar) {
                    chatAvatar.textContent = currentUser.avatar || currentUser.name.substring(0, 2).toUpperCase();
                }
            }
            break;
    }
});

// Add smooth scrolling and animations
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.auth-card, .user-card, .chat-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});