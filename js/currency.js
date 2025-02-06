const currencyData = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.91 },
    GBP: { symbol: '£', rate: 0.79 },
    AUD: { symbol: 'A$', rate: 1.52 },
    CAD: { symbol: 'C$', rate: 1.35 },
    INR: { symbol: '₹', rate: 83.12 },
    // Add more currencies as needed
};

function formatPrice(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function animatePrice(element, startPrice, endPrice, duration = 2000) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentPrice = startPrice + (endPrice - startPrice) * easeOutExpo(progress);
        element.textContent = formatPrice(currentPrice);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

async function getUserLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.currency;
    } catch (error) {
        console.error('Error fetching location:', error);
        return 'USD';
    }
}

async function initializePriceDisplay() {
    const priceElement = document.getElementById('priceDisplay');
    const amountElement = priceElement.querySelector('.price-amount');
    const symbolElement = priceElement.querySelector('.currency-symbol');
    
    // Set initial high price
    amountElement.textContent = formatPrice(2999.99);
    
    try {
        const userCurrency = await getUserLocation();
        const currencyInfo = currencyData[userCurrency] || currencyData.USD;
        
        // Update currency symbol
        symbolElement.textContent = currencyInfo.symbol;
        
        // Calculate prices
        const finalPrice = 299.99 * currencyInfo.rate;
        const startPrice = 2999.99 * currencyInfo.rate;
        
        // Start animation after a short delay
        setTimeout(() => {
            animatePrice(amountElement, startPrice, finalPrice);
        }, 500);
        
    } catch (error) {
        console.error('Error initializing price:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePriceDisplay);

// Add CSS for smooth transitions
const style = document.createElement('style');
style.textContent = `
    .price .currency-symbol,
    .price .price-amount {
        transition: opacity 0.3s ease;
    }
    
    .price.updating .currency-symbol,
    .price.updating .price-amount {
        opacity: 0;
    }
    
    .price {
        position: relative;
    }
    
    .price .price-amount {
        display: inline-block;
    }
`;
document.head.appendChild(style); 