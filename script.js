// Track clicks and page views
document.addEventListener('DOMContentLoaded', function() {
    // Log page view
    logEvent('view', 'page');
    
    // Add event listeners to all elements
    document.addEventListener('click', function(e) {
        let target = e.target;
        let elementType = target.tagName.toLowerCase();
        let elementClass = target.className;
        let elementId = target.id;
        
        // Create a descriptive name for the clicked element
        let objectName = elementId || elementClass || elementType;
        
        // Log the click event
        logEvent('click', objectName);
    });
    
    // Show the Education section by default
    showSection('education');
});

function logEvent(eventType, eventObject) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, ${eventType}, ${eventObject}`);
}

// Show/hide sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        // Log section view
        logEvent('view', sectionId);
    }
}

// Text analysis function
function analyzeText() {
    const text = document.getElementById('text-input').value;
    
    
    // Basic text statistics
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const words = text.trim().split(/\s+/).length;
    const spaces = (text.match(/\s/g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
    
    // Tokenize for pronouns
    const pronouns = {};
    const pronounsList = ['i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves', 'they', 'them', 'their', 'theirs', 'themselves'];
    
    // Tokenize for prepositions
    const prepositions = {};
    const prepositionsList = ['about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by', 'concerning', 'considering', 'despite', 'down', 'during', 'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding', 'round', 'since', 'through', 'throughout', 'to', 'toward', 'under', 'underneath', 'until', 'unto', 'up', 'upon', 'with', 'within', 'without'];
    
    // Tokenize for indefinite articles
    const articles = {};
    const articlesList = ['a', 'an', 'the'];
    
    // Track total counts
    let totalPronouns = 0;
    let totalPrepositions = 0;
    let totalArticles = 0;
    
    // Process text word by word
    const wordsArray = text.toLowerCase().match(/\b[a-z']+\b/g) || [];
    
    wordsArray.forEach(word => {
        // Check for pronouns
        if (pronounsList.includes(word)) {
            pronouns[word] = (pronouns[word] || 0) + 1;
            totalPronouns++;
        }
        
        // Check for prepositions
        if (prepositionsList.includes(word)) {
            prepositions[word] = (prepositions[word] || 0) + 1;
            totalPrepositions++;
        }
        
        // Check for articles
        if (articlesList.includes(word)) {
            articles[word] = (articles[word] || 0) + 1;
            totalArticles++;
        }
    });
    
    // Create result HTML
    let resultHTML = `
        <h3>Text Statistics:</h3>
        <p>Letters: ${letters}</p>
        <p>Words: ${words}</p>
        <p>Spaces: ${spaces}</p>
        <p>Newlines: ${newlines}</p>
        <p>Special Symbols: ${specialSymbols}</p>
        
        <h3>Pronouns Count:</h3>
        <p><strong>Total Pronouns: ${totalPronouns}</strong></p>
        <ul>
            ${Object.entries(pronouns).map(([pronoun, count]) => `<li>${pronoun}: ${count}</li>`).join('')}
        </ul>
        
        <h3>Prepositions Count:</h3>
        <p><strong>Total Prepositions: ${totalPrepositions}</strong></p>
        <ul>
            ${Object.entries(prepositions).map(([preposition, count]) => `<li>${preposition}: ${count}</li>`).join('')}
        </ul>
        
        <h3>Articles Count:</h3>
        <p><strong>Total Articles: ${totalArticles}</strong></p>
        <ul>
            ${Object.entries(articles).map(([article, count]) => `<li>${article}: ${count}</li>`).join('')}
        </ul>
    `;
    
    document.getElementById('text-analysis-results').innerHTML = resultHTML;
}