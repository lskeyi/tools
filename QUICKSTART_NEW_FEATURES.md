# Quick Start Guide - New Features

## 🚀 Getting Started

After starting the server with `npm start`, navigate to `http://localhost:3000` to access all the enhanced features.

---

## 🔗 URL Encoding - Quick Guide

### When to use encodeURIComponent vs encodeURI

**Use encodeURIComponent when:**
- Encoding query parameters: `?name=John Doe` → `?name=John%20Doe`
- Encoding form data
- Encoding any text that's part of a URL

**Use encodeURI when:**
- Encoding complete URLs: `https://example.com/path?q=hello world`
- Preserving URL structure (/, ?, &, =, etc.)

### Example

```
Input: https://example.com/search?q=hello world&lang=en

Method: encodeURI
Output: https://example.com/search?q=hello%20world&lang=en

Method: encodeURIComponent  
Output: https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3Den
```

---

## 🔐 MD5 Hash Options - Quick Guide

### 16 vs 32 Characters

**32 Characters (Full Hash)**
- Maximum uniqueness
- Standard MD5 output
- Use for: File checksums, data integrity

**16 Characters (Short Hash)**
- Compact format
- Middle 16 characters of full hash
- Use for: Database keys, short identifiers

### Uppercase vs Lowercase

**Lowercase** (default)
- Standard format
- Most common in web development

**Uppercase**
- Alternative format
- Sometimes required by legacy systems

### Example

```
Input: "hello@example.com"

32 chars, lowercase: 5d41402abc4b2a76b9719d911017c592
32 chars, uppercase: 5D41402ABC4B2A76B9719D911017C592
16 chars, lowercase: c4b2a76b9719d911
16 chars, uppercase: C4B2A76B9719D911
```

---

## ✨ JSON Formatter - Quick Guide

### Three Main Actions

**1. Prettify (Format)**
```json
// Before
{"name":"John","age":30,"address":{"city":"NYC","zip":"10001"}}

// After
{
  "name": "John",
  "age": 30,
  "address": {
    "city": "NYC",
    "zip": "10001"
  }
}
```

**2. Minify (Compress)**
```json
// Before
{
  "name": "John",
  "age": 30
}

// After
{"name":"John","age":30}
```

**3. Validate (Check)**
- ✓ Shows "Valid JSON" if correct
- ❌ Shows specific error if invalid
- Example error: "Unexpected token } at position 15"

### Common Use Cases

- **Debugging API responses**: Prettify to read easily
- **Production deployment**: Minify to reduce size
- **Before sending to API**: Validate to catch errors

---

## 🔑 JWT Tool - Quick Guide

### Decode Mode (View Token Contents)

**Step 1:** Copy a JWT token
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Step 2:** Paste into the input field

**Step 3:** Click "Decode JWT"

**Result:** See header and payload in readable JSON format

### Encode Mode (Create Token)

**Step 1:** Switch to "Encode" mode

**Step 2:** Select algorithm (HS256 recommended)

**Step 3:** Enter payload (JSON format)
```json
{
  "userId": "12345",
  "email": "user@example.com",
  "role": "admin",
  "iat": 1516239022,
  "exp": 1516325422
}
```

**Step 4:** Enter secret key
```
my-super-secret-key-2024
```

**Step 5:** Click "Encode JWT"

**Result:** Get a signed JWT token ready to use

### Common JWT Claims

```json
{
  "sub": "1234567890",        // Subject (user ID)
  "name": "John Doe",         // User name
  "email": "john@example.com", // Email
  "iat": 1516239022,          // Issued at (timestamp)
  "exp": 1516325422,          // Expiration (timestamp)
  "role": "admin"             // Custom claim
}
```

### Algorithm Selection

- **HS256**: Most common, good security
- **HS384**: More secure, larger signature
- **HS512**: Most secure, largest signature

**Recommendation:** Use HS256 unless you have specific security requirements

---

## 💡 Pro Tips

### URL Encoding
```javascript
// For query parameters
const email = "user@example.com";
const url = `https://api.com/search?email=${encodeURIComponent(email)}`;
// Result: https://api.com/search?email=user%40example.com
```

### MD5 Hashing
```javascript
// For database keys (16 chars is enough)
const email = "user@example.com";
const userId = md5(email, 16, 'lowercase');
// Result: c4b2a76b9719d911
```

### JSON Formatting
```javascript
// Always validate before sending to API
1. Paste JSON
2. Click "Validate"
3. If valid, click "Minify"
4. Copy and send to API
```

### JWT Tokens
```javascript
// Creating a token for API authentication
Payload: {
  "userId": "12345",
  "exp": Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
}
Secret: "your-secret-key"
Algorithm: HS256

// Use in API request
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer ' + jwtToken
  }
})
```

---

## ⌨️ Keyboard Shortcuts

Save time with keyboard shortcuts:

| Tool | Shortcut | Action |
|------|----------|--------|
| URL | Ctrl/Cmd + Enter | Encode |
| Base64 | Ctrl/Cmd + Enter | Encode |
| Unicode | Ctrl/Cmd + Enter | Encode |
| Hash | Ctrl/Cmd + Enter | Generate MD5 |
| JSON | Ctrl/Cmd + Enter | Prettify |
| JWT | Ctrl/Cmd + Enter | Decode/Encode |
| Diff | Ctrl/Cmd + Enter | Compare |

---

## 🎯 Common Workflows

### Workflow 1: API Development

1. **Create JWT token** for authentication
   - Go to JWT tool → Encode mode
   - Enter user payload
   - Copy token

2. **Format API response** for debugging
   - Go to JSON tool
   - Paste response
   - Click Prettify

3. **Validate before sending**
   - Paste JSON
   - Click Validate
   - Fix any errors

### Workflow 2: URL Building

1. **Encode query parameters**
   - Go to URL tool
   - Select "encodeURIComponent"
   - Encode each parameter value

2. **Build complete URL**
   ```
   https://api.com/search?
   q=encodeURIComponent("hello world")&
   email=encodeURIComponent("user@example.com")
   ```

### Workflow 3: Data Hashing

1. **Generate user ID from email**
   - Go to Hash tool
   - Select: 16 chars, lowercase
   - Enter email
   - Get compact user ID

2. **Generate file checksum**
   - Select: 32 chars, lowercase
   - Enter file content
   - Get full MD5 hash

---

## 🔍 Troubleshooting

### JSON Validation Errors

**Error: "Unexpected token"**
- Check for missing commas
- Check for trailing commas
- Verify quotes are correct (use double quotes)

**Error: "Unexpected end of JSON"**
- Check for missing closing brackets
- Verify all objects/arrays are closed

### JWT Errors

**Error: "Invalid JWT format"**
- JWT must have 3 parts separated by dots
- Format: `header.payload.signature`

**Error: "Invalid JSON payload"**
- Payload must be valid JSON
- Use JSON validator first

### URL Encoding Issues

**Characters not encoding**
- Use encodeURIComponent for full encoding
- encodeURI preserves some characters

---

## 📱 Mobile Usage

All features work perfectly on mobile:

1. **Touch-friendly buttons**: Large tap targets
2. **Responsive layout**: Adapts to screen size
3. **Easy copy**: Tap copy button to copy results
4. **Vertical layout**: Options stack vertically on mobile

---

## 🎨 UI Elements Guide

### Radio Buttons
- **Teal circle**: Selected option
- **Gray circle**: Unselected option
- **Hover**: Text turns teal

### Mode Switcher (JWT)
- **Teal background**: Active mode
- **Gray background**: Inactive mode
- **Click to switch**: Between Decode/Encode

### Validation Messages
- **Green background**: Success (✓ Valid JSON)
- **Red background**: Error (❌ Invalid JSON)

---

## 🚀 Next Steps

1. **Explore each tool** to understand capabilities
2. **Try the examples** provided in this guide
3. **Use keyboard shortcuts** for faster workflow
4. **Read NEW_FEATURES.md** for detailed documentation
5. **Check API endpoints** for programmatic access

---

## 📚 Additional Resources

- **NEW_FEATURES.md**: Comprehensive feature documentation
- **README.md**: Project overview and setup
- **COLOR_PALETTE.md**: Design system reference
- **STYLE_CHANGES.md**: Design transformation details

---

## 💬 Tips for Best Results

✅ **DO:**
- Validate JSON before minifying
- Use strong secret keys for JWT (32+ characters)
- Choose the right URL encoding method
- Copy results using the copy button

❌ **DON'T:**
- Share JWT secret keys
- Use MD5 for password hashing (use bcrypt instead)
- Forget to set JWT expiration times
- Trust JWT tokens without server-side validation

---

## 🎉 You're Ready!

You now have all the tools you need for:
- URL encoding and decoding
- Hash generation with custom options
- JSON formatting and validation
- JWT token creation and inspection

Happy coding! 🚀
