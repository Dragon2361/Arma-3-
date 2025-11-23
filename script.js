// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Слайдер
const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.slider-dots');

let currentSlide = 0;
const totalSlides = slideItems.length;

// Создание точек для навигации
slideItems.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
    
    // Обновление активной точки
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
});

// Автопрокрутка слайдера
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}, 5000);

// Чат виджет
const chatToggle = document.querySelector('.chat-toggle');
const chatWidget = document.querySelector('.chat-widget');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const sendBtn = document.querySelector('.send-btn');

chatToggle.addEventListener('click', () => {
    chatWidget.classList.toggle('active');
});

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    
    const messageText = document.createElement('p');
    messageText.textContent = text;
    
    messageDiv.appendChild(messageText);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Имитация ответа бота
        setTimeout(() => {
            const responses = [
                "Интересный вопрос! Напишите нам на email для подробной информации.",
                "Следующая операция запланирована на выходные. Следите за обновлениями!",
                "Для участия в операциях присоединяйтесь к нашему Discord серверу.",
                "Спасибо за сообщение! Мы свяжемся с вами в ближайшее время."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse);
        }, 1000);
    }
}

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Форма обратной связи
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    this.reset();
});
