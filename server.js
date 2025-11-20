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

// Text Diff
app.post('/api/diff', (req, res) => {
    try {
        const { text1, text2 } = req.body;
        
        // Simple character-level diff implementation
        const diff = [];
        const len1 = text1.length;
        const len2 = text2.length;
        const maxLen = Math.max(len1, len2);
        
        for (let i = 0; i < maxLen; i++) {
            const char1 = text1[i] || '';
            const char2 = text2[i] || '';
            
            if (char1 === char2) {
                diff.push({ type: 'equal', value: char1 });
            } else {
                if (char1) diff.push({ type: 'removed', value: char1 });
                if (char2) diff.push({ type: 'added', value: char2 });
            }
        }
        
        res.json({ diff });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
