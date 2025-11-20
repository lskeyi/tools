#!/bin/bash

# API Test Script
# This script tests all API endpoints

BASE_URL="http://localhost:3000"

echo "================================"
echo "Testing Tools Website API"
echo "================================"
echo ""

# Test URL Encode
echo "1. Testing URL Encode..."
curl -s -X POST "$BASE_URL/api/url/encode" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello World!"}' | jq '.'
echo ""

# Test URL Decode
echo "2. Testing URL Decode..."
curl -s -X POST "$BASE_URL/api/url/decode" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello%20World%21"}' | jq '.'
echo ""

# Test Base64 Encode
echo "3. Testing Base64 Encode..."
curl -s -X POST "$BASE_URL/api/base64/encode" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello World!"}' | jq '.'
echo ""

# Test Base64 Decode
echo "4. Testing Base64 Decode..."
curl -s -X POST "$BASE_URL/api/base64/decode" \
  -H "Content-Type: application/json" \
  -d '{"text":"SGVsbG8gV29ybGQh"}' | jq '.'
echo ""

# Test Unicode Encode
echo "5. Testing Unicode Encode..."
curl -s -X POST "$BASE_URL/api/unicode/encode" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello"}' | jq '.'
echo ""

# Test Unicode Decode
echo "6. Testing Unicode Decode..."
curl -s -X POST "$BASE_URL/api/unicode/decode" \
  -H "Content-Type: application/json" \
  -d '{"text":"\\u0048\\u0065\\u006c\\u006c\\u006f"}' | jq '.'
echo ""

# Test MD5
echo "7. Testing MD5 Hash..."
curl -s -X POST "$BASE_URL/api/md5" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello World!"}' | jq '.'
echo ""

# Test SHA256
echo "8. Testing SHA256 Hash..."
curl -s -X POST "$BASE_URL/api/sha256" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello World!"}' | jq '.'
echo ""

# Test Diff
echo "9. Testing Text Diff..."
curl -s -X POST "$BASE_URL/api/diff" \
  -H "Content-Type: application/json" \
  -d '{"text1":"Hello World","text2":"Hello Node"}' | jq '.'
echo ""

echo "================================"
echo "All tests completed!"
echo "================================"
