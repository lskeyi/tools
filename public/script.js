// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        
        // Update active button
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active section
        document.querySelectorAll('.tool-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${tool}-tool`).classList.add('active');
    });
});

// URL Encode/Decode
async function urlEncode() {
    const input = document.getElementById('url-input').value;
    if (!input) {
        showNotification('Please enter text to encode', 'error');
        return;
    }
    
    const method = document.querySelector('input[name="url-method"]:checked').value;
    
    try {
        const response = await fetch('/api/url/encode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input, method })
        });
        const data = await response.json();
        document.getElementById('url-output').value = data.result;
        showNotification('Encoded successfully!');
    } catch (error) {
        showNotification('Error encoding text', 'error');
    }
}

async function urlDecode() {
    const input = document.getElementById('url-input').value;
    if (!input) {
        showNotification('Please enter text to decode', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/url/decode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });
        const data = await response.json();
        document.getElementById('url-output').value = data.result;
        showNotification('Decoded successfully!');
    } catch (error) {
        showNotification('Error decoding text', 'error');
    }
}

// Base64 Encode/Decode
async function base64Encode() {
    const input = document.getElementById('base64-input').value;
    if (!input) {
        showNotification('Please enter text to encode', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/base64/encode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });
        const data = await response.json();
        document.getElementById('base64-output').value = data.result;
        showNotification('Encoded successfully!');
    } catch (error) {
        showNotification('Error encoding text', 'error');
    }
}

async function base64Decode() {
    const input = document.getElementById('base64-input').value;
    if (!input) {
        showNotification('Please enter text to decode', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/base64/decode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });
        const data = await response.json();
        document.getElementById('base64-output').value = data.result;
        showNotification('Decoded successfully!');
    } catch (error) {
        showNotification('Error decoding text', 'error');
    }
}

// Unicode Encode/Decode
async function unicodeEncode() {
    const input = document.getElementById('unicode-input').value;
    if (!input) {
        showNotification('Please enter text to encode', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/unicode/encode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });
        const data = await response.json();
        document.getElementById('unicode-output').value = data.result;
        showNotification('Encoded successfully!');
    } catch (error) {
        showNotification('Error encoding text', 'error');
    }
}

async function unicodeDecode() {
    const input = document.getElementById('unicode-input').value;
    if (!input) {
        showNotification('Please enter text to decode', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/unicode/decode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });
        const data = await response.json();
        document.getElementById('unicode-output').value = data.result;
        showNotification('Decoded successfully!');
    } catch (error) {
        showNotification('Error decoding text', 'error');
    }
}

// Hash Generation
async function generateMD5() {
    const input = document.getElementById('hash-input').value;
    if (!input) {
        showNotification('Please enter text to hash', 'error');
        return;
    }
    
    const length = document.querySelector('input[name="md5-length"]:checked').value;
    const caseType = document.querySelector('input[name="md5-case"]:checked').value;
    
    try {
        const response = await fetch('/api/md5', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input, length, caseType })
        });
        const data = await response.json();
        document.getElementById('hash-md5').value = data.result;
        showNotification('MD5 hash generated!');
    } catch (error) {
        showNotification('Error generating hash', 'error');
    }
}

async function generateSHA256() {
    const input = document.getElementById('hash-input').value;
    if (!input) {
        showNotification('Please enter text to hash', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/sha256', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });
        const data = await response.json();
        document.getElementById('hash-sha256').value = data.result;
        showNotification('SHA256 hash generated!');
    } catch (error) {
        showNotification('Error generating hash', 'error');
    }
}

// Text Diff - Advanced Implementation
let currentDiffData = null;
let currentDiffIndex = 0;
let diffPositions = [];

// Update character and line counts
document.getElementById('diff-input1')?.addEventListener('input', updateDiffInputStats);
document.getElementById('diff-input2')?.addEventListener('input', updateDiffInputStats);

function updateDiffInputStats() {
    const text1 = document.getElementById('diff-input1').value;
    const text2 = document.getElementById('diff-input2').value;
    
    const lines1 = text1.split('\n').length;
    const lines2 = text2.split('\n').length;
    
    document.getElementById('diff-lines1').textContent = `${lines1} line${lines1 !== 1 ? 's' : ''}`;
    document.getElementById('diff-chars1').textContent = `${text1.length} character${text1.length !== 1 ? 's' : ''}`;
    document.getElementById('diff-lines2').textContent = `${lines2} line${lines2 !== 1 ? 's' : ''}`;
    document.getElementById('diff-chars2').textContent = `${text2.length} character${text2.length !== 1 ? 's' : ''}`;
}

async function compareDiff() {
    const text1 = document.getElementById('diff-input1').value;
    const text2 = document.getElementById('diff-input2').value;
    
    if (!text1 && !text2) {
        showNotification('Please enter texts to compare', 'error');
        return;
    }
    
    const mode = document.querySelector('input[name="diff-mode"]:checked').value;
    const ignoreWhitespace = document.getElementById('diff-ignore-whitespace').checked;
    const ignoreCase = document.getElementById('diff-ignore-case').checked;
    
    try {
        const response = await fetch('/api/diff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text1, text2, mode, ignoreWhitespace, ignoreCase })
        });
        const data = await response.json();
        
        if (data.error) {
            showNotification(data.error, 'error');
            return;
        }
        
        currentDiffData = data;
        currentDiffIndex = 0;
        
        // Render diff based on mode
        if (mode === 'line') {
            renderLineDiff(data.diff);
        } else {
            renderInlineDiff(data.diff, mode);
        }
        
        // Update statistics
        updateDiffStats(data.stats);
        
        // Setup navigation
        setupDiffNavigation(data.diff);
        
        showNotification('Comparison complete!');
    } catch (error) {
        showNotification('Error comparing texts', 'error');
        console.error(error);
    }
}

function renderLineDiff(diff) {
    const leftOutput = document.getElementById('diff-output-left');
    const rightOutput = document.getElementById('diff-output-right');
    
    leftOutput.innerHTML = '';
    rightOutput.innerHTML = '';
    
    // Remove unified class if present
    document.getElementById('diff-output-left').parentElement.classList.remove('diff-unified');
    document.getElementById('diff-output-right').parentElement.classList.remove('diff-unified');
    
    diffPositions = [];
    let diffCount = 0;
    
    diff.forEach((part, index) => {
        // Left side (original)
        const leftLine = document.createElement('div');
        leftLine.className = 'diff-line';
        
        if (part.type === 'removed' || part.type === 'equal') {
            leftLine.classList.add(`diff-line-${part.type}`);
            leftLine.innerHTML = `
                <span class="diff-line-number">${part.left.line || ''}</span>
                <span class="diff-line-content">${escapeHtml(part.left.content)}</span>
            `;
        } else {
            leftLine.classList.add('diff-line-empty');
            leftLine.innerHTML = `
                <span class="diff-line-number"></span>
                <span class="diff-line-content"></span>
            `;
        }
        
        // Right side (modified)
        const rightLine = document.createElement('div');
        rightLine.className = 'diff-line';
        
        if (part.type === 'added' || part.type === 'equal') {
            rightLine.classList.add(`diff-line-${part.type}`);
            rightLine.innerHTML = `
                <span class="diff-line-number">${part.right.line || ''}</span>
                <span class="diff-line-content">${escapeHtml(part.right.content)}</span>
            `;
        } else {
            rightLine.classList.add('diff-line-empty');
            rightLine.innerHTML = `
                <span class="diff-line-number"></span>
                <span class="diff-line-content"></span>
            `;
        }
        
        // Track diff positions for navigation
        if (part.type !== 'equal') {
            diffPositions.push({ left: leftLine, right: rightLine, index: diffCount++ });
        }
        
        leftOutput.appendChild(leftLine);
        rightOutput.appendChild(rightLine);
    });
}

function renderInlineDiff(diff, mode) {
    const leftOutput = document.getElementById('diff-output-left');
    const rightOutput = document.getElementById('diff-output-right');
    
    // Use unified view for word/char mode
    leftOutput.parentElement.classList.add('diff-unified');
    rightOutput.parentElement.style.display = 'none';
    
    leftOutput.innerHTML = '';
    diffPositions = [];
    
    const container = document.createElement('div');
    container.style.whiteSpace = 'pre-wrap';
    container.style.wordBreak = 'break-word';
    
    diff.forEach(part => {
        const span = document.createElement('span');
        span.textContent = part.value;
        
        if (part.type === 'added') {
            span.className = 'diff-char-added';
            diffPositions.push(span);
        } else if (part.type === 'removed') {
            span.className = 'diff-char-removed';
            diffPositions.push(span);
        }
        
        container.appendChild(span);
    });
    
    leftOutput.appendChild(container);
    
    // Show right panel again
    rightOutput.parentElement.style.display = '';
}

function updateDiffStats(stats) {
    document.getElementById('stat-added').textContent = stats.added;
    document.getElementById('stat-removed').textContent = stats.removed;
    document.getElementById('stat-modified').textContent = stats.modified;
    document.getElementById('stat-unchanged').textContent = stats.unchanged;
    
    document.getElementById('diff-stats').style.display = 'flex';
}

function setupDiffNavigation(diff) {
    const hasDifferences = diffPositions.length > 0;
    
    if (hasDifferences) {
        document.getElementById('diff-navigation').style.display = 'flex';
        document.getElementById('diff-total').textContent = diffPositions.length;
        document.getElementById('diff-current').textContent = diffPositions.length > 0 ? '1' : '0';
        currentDiffIndex = 0;
        
        updateNavigationButtons();
        
        // Scroll to first difference
        if (diffPositions.length > 0) {
            scrollToDiff(0);
        }
    } else {
        document.getElementById('diff-navigation').style.display = 'none';
    }
}

function navigateDiff(direction) {
    if (diffPositions.length === 0) return;
    
    // Remove current highlight
    if (diffPositions[currentDiffIndex]) {
        const current = diffPositions[currentDiffIndex];
        if (current.left) {
            current.left.classList.remove('diff-line-current');
            current.right.classList.remove('diff-line-current');
        } else {
            current.classList.remove('diff-line-current');
        }
    }
    
    // Update index
    if (direction === 'next') {
        currentDiffIndex = Math.min(currentDiffIndex + 1, diffPositions.length - 1);
    } else {
        currentDiffIndex = Math.max(currentDiffIndex - 1, 0);
    }
    
    // Scroll to new position
    scrollToDiff(currentDiffIndex);
    
    // Update counter
    document.getElementById('diff-current').textContent = currentDiffIndex + 1;
    
    updateNavigationButtons();
}

function scrollToDiff(index) {
    if (index < 0 || index >= diffPositions.length) return;
    
    const diff = diffPositions[index];
    
    if (diff.left) {
        // Line mode
        diff.left.classList.add('diff-line-current');
        diff.right.classList.add('diff-line-current');
        diff.left.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        // Inline mode
        diff.classList.add('diff-line-current');
        diff.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('diff-prev-btn');
    const nextBtn = document.getElementById('diff-next-btn');
    
    prevBtn.disabled = currentDiffIndex === 0;
    nextBtn.disabled = currentDiffIndex === diffPositions.length - 1;
}

function swapDiffInputs() {
    const input1 = document.getElementById('diff-input1');
    const input2 = document.getElementById('diff-input2');
    
    const temp = input1.value;
    input1.value = input2.value;
    input2.value = temp;
    
    updateDiffInputStats();
    showNotification('Inputs swapped!');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// JSON Formatter
async function jsonPrettify() {
    const input = document.getElementById('json-input').value;
    if (!input) {
        showNotification('Please enter JSON to format', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/json/prettify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });
        const data = await response.json();
        
        if (data.error) {
            document.getElementById('json-validation').className = 'validation-message error';
            document.getElementById('json-validation').textContent = '❌ ' + data.error;
            document.getElementById('json-output').value = '';
        } else {
            document.getElementById('json-output').value = data.result;
            document.getElementById('json-validation').className = 'validation-message success';
            document.getElementById('json-validation').textContent = '✓ Valid JSON';
            showNotification('JSON prettified!');
        }
    } catch (error) {
        showNotification('Error formatting JSON', 'error');
    }
}

async function jsonMinify() {
    const input = document.getElementById('json-input').value;
    if (!input) {
        showNotification('Please enter JSON to minify', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/json/minify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });
        const data = await response.json();
        
        if (data.error) {
            document.getElementById('json-validation').className = 'validation-message error';
            document.getElementById('json-validation').textContent = '❌ ' + data.error;
            document.getElementById('json-output').value = '';
        } else {
            document.getElementById('json-output').value = data.result;
            document.getElementById('json-validation').className = 'validation-message success';
            document.getElementById('json-validation').textContent = '✓ Valid JSON';
            showNotification('JSON minified!');
        }
    } catch (error) {
        showNotification('Error minifying JSON', 'error');
    }
}

async function jsonValidate() {
    const input = document.getElementById('json-input').value;
    if (!input) {
        showNotification('Please enter JSON to validate', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/json/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });
        const data = await response.json();
        
        if (data.valid) {
            document.getElementById('json-validation').className = 'validation-message success';
            document.getElementById('json-validation').textContent = '✓ Valid JSON';
            showNotification('JSON is valid!');
        } else {
            document.getElementById('json-validation').className = 'validation-message error';
            document.getElementById('json-validation').textContent = '❌ ' + data.error;
            showNotification('Invalid JSON', 'error');
        }
    } catch (error) {
        showNotification('Error validating JSON', 'error');
    }
}

// JWT Functions
function switchJWTMode(mode) {
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    document.querySelectorAll('.jwt-mode').forEach(m => {
        m.classList.remove('active');
    });
    document.getElementById(`jwt-${mode}-mode`).classList.add('active');
}

async function jwtDecode() {
    const token = document.getElementById('jwt-token-input').value;
    if (!token) {
        showNotification('Please enter a JWT token', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/jwt/decode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });
        const data = await response.json();
        
        if (data.error) {
            showNotification(data.error, 'error');
            return;
        }
        
        document.getElementById('jwt-header').value = JSON.stringify(data.header, null, 2);
        document.getElementById('jwt-payload').value = JSON.stringify(data.payload, null, 2);
        showNotification('JWT decoded successfully!');
    } catch (error) {
        showNotification('Error decoding JWT', 'error');
    }
}

async function jwtEncode() {
    const payloadText = document.getElementById('jwt-payload-input').value;
    const secret = document.getElementById('jwt-secret').value;
    const algorithm = document.getElementById('jwt-algorithm').value;
    
    if (!payloadText) {
        showNotification('Please enter payload', 'error');
        return;
    }
    
    if (!secret) {
        showNotification('Please enter secret key', 'error');
        return;
    }
    
    try {
        const payload = JSON.parse(payloadText);
        
        const response = await fetch('/api/jwt/encode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payload, secret, algorithm })
        });
        const data = await response.json();
        
        if (data.error) {
            showNotification(data.error, 'error');
            return;
        }
        
        document.getElementById('jwt-token-output').value = data.token;
        showNotification('JWT encoded successfully!');
    } catch (error) {
        showNotification('Invalid JSON payload', 'error');
    }
}

// Clear Tool
function clearTool(tool) {
    switch(tool) {
        case 'url':
            document.getElementById('url-input').value = '';
            document.getElementById('url-output').value = '';
            break;
        case 'base64':
            document.getElementById('base64-input').value = '';
            document.getElementById('base64-output').value = '';
            break;
        case 'unicode':
            document.getElementById('unicode-input').value = '';
            document.getElementById('unicode-output').value = '';
            break;
        case 'hash':
            document.getElementById('hash-input').value = '';
            document.getElementById('hash-md5').value = '';
            document.getElementById('hash-sha256').value = '';
            break;
        case 'json':
            document.getElementById('json-input').value = '';
            document.getElementById('json-output').value = '';
            document.getElementById('json-validation').style.display = 'none';
            break;
        case 'jwt':
            document.getElementById('jwt-token-input').value = '';
            document.getElementById('jwt-header').value = '';
            document.getElementById('jwt-payload').value = '';
            document.getElementById('jwt-payload-input').value = '';
            document.getElementById('jwt-token-output').value = '';
            break;
        case 'diff':
            document.getElementById('diff-input1').value = '';
            document.getElementById('diff-input2').value = '';
            document.getElementById('diff-output-left').innerHTML = '';
            document.getElementById('diff-output-right').innerHTML = '';
            document.getElementById('diff-stats').style.display = 'none';
            document.getElementById('diff-navigation').style.display = 'none';
            document.getElementById('diff-output-left').parentElement.classList.remove('diff-unified');
            document.getElementById('diff-output-right').parentElement.style.display = '';
            currentDiffData = null;
            currentDiffIndex = 0;
            diffPositions = [];
            updateDiffInputStats();
            break;
    }
    showNotification('Cleared!');
}

// Copy to Clipboard
function copyResult(elementId) {
    const element = document.getElementById(elementId);
    const text = element.value || element.textContent;
    
    if (!text) {
        showNotification('Nothing to copy', 'error');
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.background = type === 'error' ? '#fee2e2' : 'white';
    notification.style.color = type === 'error' ? '#991b1b' : '#1e293b';
    notification.style.borderLeft = type === 'error' ? '3px solid #ef4444' : '3px solid #0891b2';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to execute primary action
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeSection = document.querySelector('.tool-section.active');
        const sectionId = activeSection.id;
        
        switch(sectionId) {
            case 'url-tool':
                urlEncode();
                break;
            case 'base64-tool':
                base64Encode();
                break;
            case 'unicode-tool':
                unicodeEncode();
                break;
            case 'hash-tool':
                generateMD5();
                break;
            case 'json-tool':
                jsonPrettify();
                break;
            case 'jwt-tool':
                const jwtMode = document.querySelector('.jwt-mode.active').id;
                if (jwtMode === 'jwt-decode-mode') {
                    jwtDecode();
                } else {
                    jwtEncode();
                }
                break;
            case 'diff-tool':
                compareDiff();
                break;
        }
    }
});
