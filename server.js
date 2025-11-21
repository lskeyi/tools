const express = require('express');
const crypto = require('crypto');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API Routes

// URL Encode/Decode
app.post('/api/url/encode', (req, res) => {
    try {
        const { text, method } = req.body;
        let encoded;
        
        if (method === 'uri') {
            encoded = encodeURI(text);
        } else {
            encoded = encodeURIComponent(text);
        }
        
        res.json({ result: encoded });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/url/decode', (req, res) => {
    try {
        const { text } = req.body;
        const decoded = decodeURIComponent(text);
        res.json({ result: decoded });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Base64 Encode/Decode
app.post('/api/base64/encode', (req, res) => {
    try {
        const { text } = req.body;
        const encoded = Buffer.from(text, 'utf-8').toString('base64');
        res.json({ result: encoded });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/base64/decode', (req, res) => {
    try {
        const { text } = req.body;
        const decoded = Buffer.from(text, 'base64').toString('utf-8');
        res.json({ result: decoded });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Unicode Encode/Decode
app.post('/api/unicode/encode', (req, res) => {
    try {
        const { text } = req.body;
        let encoded = '';
        for (let i = 0; i < text.length; i++) {
            const hex = text.charCodeAt(i).toString(16).padStart(4, '0');
            encoded += '\\u' + hex;
        }
        res.json({ result: encoded });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/unicode/decode', (req, res) => {
    try {
        const { text } = req.body;
        const decoded = text.replace(/\\u[\dA-Fa-f]{4}/g, (match) => {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
        res.json({ result: decoded });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// MD5 Hash
app.post('/api/md5', (req, res) => {
    try {
        const { text, length, caseType } = req.body;
        let hash = crypto.createHash('md5').update(text).digest('hex');
        
        // Apply length option (16 or 32 characters)
        if (length === '16') {
            hash = hash.substring(8, 24); // Middle 16 characters
        }
        
        // Apply case option
        if (caseType === 'uppercase') {
            hash = hash.toUpperCase();
        }
        
        res.json({ result: hash });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// SHA256 Hash
app.post('/api/sha256', (req, res) => {
    try {
        const { text } = req.body;
        const hash = crypto.createHash('sha256').update(text).digest('hex');
        res.json({ result: hash });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// JSON Formatter
app.post('/api/json/prettify', (req, res) => {
    try {
        const { text } = req.body;
        const parsed = JSON.parse(text);
        const prettified = JSON.stringify(parsed, null, 2);
        res.json({ result: prettified });
    } catch (error) {
        res.json({ error: 'Invalid JSON: ' + error.message });
    }
});

app.post('/api/json/minify', (req, res) => {
    try {
        const { text } = req.body;
        const parsed = JSON.parse(text);
        const minified = JSON.stringify(parsed);
        res.json({ result: minified });
    } catch (error) {
        res.json({ error: 'Invalid JSON: ' + error.message });
    }
});

app.post('/api/json/validate', (req, res) => {
    try {
        const { text } = req.body;
        JSON.parse(text);
        res.json({ valid: true });
    } catch (error) {
        res.json({ valid: false, error: error.message });
    }
});

// JWT Encode/Decode
app.post('/api/jwt/decode', (req, res) => {
    try {
        const { token } = req.body;
        
        // Split JWT into parts
        const parts = token.split('.');
        if (parts.length !== 3) {
            return res.json({ error: 'Invalid JWT format' });
        }
        
        // Decode header and payload (they are base64url encoded)
        const header = JSON.parse(Buffer.from(parts[0], 'base64').toString('utf-8'));
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
        
        res.json({ header, payload });
    } catch (error) {
        res.json({ error: 'Invalid JWT: ' + error.message });
    }
});

app.post('/api/jwt/encode', (req, res) => {
    try {
        const { payload, secret, algorithm } = req.body;
        
        // Create header
        const header = {
            alg: algorithm || 'HS256',
            typ: 'JWT'
        };
        
        // Encode header and payload
        const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
        
        const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
        
        // Create signature
        const signatureInput = `${encodedHeader}.${encodedPayload}`;
        let signature;
        
        switch (algorithm) {
            case 'HS384':
                signature = crypto.createHmac('sha384', secret).update(signatureInput).digest('base64');
                break;
            case 'HS512':
                signature = crypto.createHmac('sha512', secret).update(signatureInput).digest('base64');
                break;
            default: // HS256
                signature = crypto.createHmac('sha256', secret).update(signatureInput).digest('base64');
        }
        
        signature = signature
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
        
        const token = `${encodedHeader}.${encodedPayload}.${signature}`;
        
        res.json({ token });
    } catch (error) {
        res.json({ error: 'Error encoding JWT: ' + error.message });
    }
});

// Advanced Text Diff using Myers algorithm
app.post('/api/diff', (req, res) => {
    try {
        const { text1, text2, mode, ignoreWhitespace, ignoreCase } = req.body;
        
        let processedText1 = text1;
        let processedText2 = text2;
        
        // Apply preprocessing options
        if (ignoreCase) {
            processedText1 = processedText1.toLowerCase();
            processedText2 = processedText2.toLowerCase();
        }
        
        if (ignoreWhitespace) {
            processedText1 = processedText1.replace(/\s+/g, ' ').trim();
            processedText2 = processedText2.replace(/\s+/g, ' ').trim();
        }
        
        let diff;
        let stats = { added: 0, removed: 0, modified: 0, unchanged: 0 };
        
        if (mode === 'line') {
            diff = computeLineDiff(processedText1, processedText2, text1, text2);
            stats = computeLineStats(diff);
        } else if (mode === 'word') {
            diff = computeWordDiff(processedText1, processedText2, text1, text2);
            stats = computeWordStats(diff);
        } else {
            diff = computeCharDiff(processedText1, processedText2, text1, text2);
            stats = computeCharStats(diff);
        }
        
        res.json({ diff, stats, mode });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Myers diff algorithm for line-based comparison
function computeLineDiff(text1, text2, originalText1, originalText2) {
    const lines1 = originalText1.split('\n');
    const lines2 = originalText2.split('\n');
    const processedLines1 = text1.split('\n');
    const processedLines2 = text2.split('\n');
    
    const diff = myersDiff(processedLines1, processedLines2);
    
    // Map back to original lines with line numbers
    const result = [];
    let lineNum1 = 1;
    let lineNum2 = 1;
    
    diff.forEach(part => {
        if (part.type === 'equal') {
            for (let i = 0; i < part.count; i++) {
                result.push({
                    type: 'equal',
                    left: { line: lineNum1++, content: lines1[lineNum1 - 2] || '' },
                    right: { line: lineNum2++, content: lines2[lineNum2 - 2] || '' }
                });
            }
        } else if (part.type === 'removed') {
            for (let i = 0; i < part.count; i++) {
                result.push({
                    type: 'removed',
                    left: { line: lineNum1++, content: lines1[lineNum1 - 2] || '' },
                    right: { line: null, content: '' }
                });
            }
        } else if (part.type === 'added') {
            for (let i = 0; i < part.count; i++) {
                result.push({
                    type: 'added',
                    left: { line: null, content: '' },
                    right: { line: lineNum2++, content: lines2[lineNum2 - 2] || '' }
                });
            }
        }
    });
    
    return result;
}

// Word-level diff
function computeWordDiff(text1, text2, originalText1, originalText2) {
    const words1 = originalText1.split(/(\s+)/);
    const words2 = originalText2.split(/(\s+)/);
    const processedWords1 = text1.split(/(\s+)/);
    const processedWords2 = text2.split(/(\s+)/);
    
    const diff = myersDiff(processedWords1, processedWords2);
    
    const result = [];
    let idx1 = 0;
    let idx2 = 0;
    
    diff.forEach(part => {
        if (part.type === 'equal') {
            for (let i = 0; i < part.count; i++) {
                result.push({ type: 'equal', value: words1[idx1++] || '' });
                idx2++;
            }
        } else if (part.type === 'removed') {
            for (let i = 0; i < part.count; i++) {
                result.push({ type: 'removed', value: words1[idx1++] || '' });
            }
        } else if (part.type === 'added') {
            for (let i = 0; i < part.count; i++) {
                result.push({ type: 'added', value: words2[idx2++] || '' });
            }
        }
    });
    
    return result;
}

// Character-level diff
function computeCharDiff(text1, text2, originalText1, originalText2) {
    const chars1 = originalText1.split('');
    const chars2 = originalText2.split('');
    const processedChars1 = text1.split('');
    const processedChars2 = text2.split('');
    
    const diff = myersDiff(processedChars1, processedChars2);
    
    const result = [];
    let idx1 = 0;
    let idx2 = 0;
    
    diff.forEach(part => {
        if (part.type === 'equal') {
            for (let i = 0; i < part.count; i++) {
                result.push({ type: 'equal', value: chars1[idx1++] || '' });
                idx2++;
            }
        } else if (part.type === 'removed') {
            for (let i = 0; i < part.count; i++) {
                result.push({ type: 'removed', value: chars1[idx1++] || '' });
            }
        } else if (part.type === 'added') {
            for (let i = 0; i < part.count; i++) {
                result.push({ type: 'added', value: chars2[idx2++] || '' });
            }
        }
    });
    
    return result;
}

// Myers diff algorithm implementation
function myersDiff(arr1, arr2) {
    const n = arr1.length;
    const m = arr2.length;
    const max = n + m;
    const v = {};
    const trace = [];
    
    v[1] = 0;
    
    for (let d = 0; d <= max; d++) {
        trace.push({ ...v });
        
        for (let k = -d; k <= d; k += 2) {
            let x;
            
            if (k === -d || (k !== d && v[k - 1] < v[k + 1])) {
                x = v[k + 1];
            } else {
                x = v[k - 1] + 1;
            }
            
            let y = x - k;
            
            while (x < n && y < m && arr1[x] === arr2[y]) {
                x++;
                y++;
            }
            
            v[k] = x;
            
            if (x >= n && y >= m) {
                return backtrack(trace, arr1, arr2, d);
            }
        }
    }
    
    return [];
}

function backtrack(trace, arr1, arr2, d) {
    const result = [];
    let x = arr1.length;
    let y = arr2.length;
    
    for (let i = d; i >= 0; i--) {
        const v = trace[i];
        const k = x - y;
        
        let prevK;
        if (k === -i || (k !== i && v[k - 1] < v[k + 1])) {
            prevK = k + 1;
        } else {
            prevK = k - 1;
        }
        
        const prevX = v[prevK];
        const prevY = prevX - prevK;
        
        while (x > prevX && y > prevY) {
            result.unshift({ type: 'equal', count: 1 });
            x--;
            y--;
        }
        
        if (i > 0) {
            if (x > prevX) {
                result.unshift({ type: 'removed', count: 1 });
                x--;
            } else if (y > prevY) {
                result.unshift({ type: 'added', count: 1 });
                y--;
            }
        }
    }
    
    // Merge consecutive operations
    return mergeDiffParts(result);
}

function mergeDiffParts(parts) {
    const merged = [];
    let current = null;
    
    parts.forEach(part => {
        if (!current || current.type !== part.type) {
            if (current) merged.push(current);
            current = { type: part.type, count: part.count };
        } else {
            current.count += part.count;
        }
    });
    
    if (current) merged.push(current);
    return merged;
}

// Statistics computation
function computeLineStats(diff) {
    const stats = { added: 0, removed: 0, modified: 0, unchanged: 0 };
    diff.forEach(part => {
        if (part.type === 'added') stats.added++;
        else if (part.type === 'removed') stats.removed++;
        else if (part.type === 'equal') stats.unchanged++;
    });
    return stats;
}

function computeWordStats(diff) {
    const stats = { added: 0, removed: 0, modified: 0, unchanged: 0 };
    diff.forEach(part => {
        if (part.value.trim()) {
            if (part.type === 'added') stats.added++;
            else if (part.type === 'removed') stats.removed++;
            else if (part.type === 'equal') stats.unchanged++;
        }
    });
    return stats;
}

function computeCharStats(diff) {
    const stats = { added: 0, removed: 0, modified: 0, unchanged: 0 };
    diff.forEach(part => {
        if (part.type === 'added') stats.added++;
        else if (part.type === 'removed') stats.removed++;
        else if (part.type === 'equal') stats.unchanged++;
    });
    return stats;
}

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
