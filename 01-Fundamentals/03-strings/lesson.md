# Strings Fundamentals

**Topic 1.3 | Phase 1: Fundamentals**  
**Estimated Time:** 6-8 hours  
**Difficulty:** Fundamental

---

## 1. Overview

### What You'll Learn

In this lesson, you'll master string manipulation and pattern matching, including:
- String properties and characteristics in JavaScript
- Character manipulation and encoding
- String building and optimization techniques
- Pattern matching and substring problems
- Palindromes and anagrams
- String transformation algorithms
- Common string interview patterns

### Why This Matters

Strings are the second most common data structure in interviews (after arrays). They appear in:

- **Text processing** - Search engines, editors, NLP
- **Data validation** - Emails, URLs, formats
- **Encoding/decoding** - Compression, encryption
- **Pattern matching** - DNA sequences, log analysis
- **UI/UX** - Form validation, auto-complete

**Real-World Impact:** String algorithms power search engines (Google uses sophisticated pattern matching), DNA sequencing (finding genetic patterns), text editors (find and replace), and countless other applications.

**Interview Frequency:** ~25% of LeetCode problems involve string manipulation.

---

## 2. Prerequisites

✅ **Complexity analysis** (Topic 1.1)  
✅ **Arrays advanced** (Topic 1.2)  
✅ **Basic JavaScript string methods** (slice, substring, charAt, etc.)

---

## 3. Theory & Concepts

### What is a String?

A string is a sequence of characters. You can think of it as an "array of characters."

```javascript
const str = "Hello";
// Conceptually: ['H', 'e', 'l', 'l', 'o']

// Access by index (like arrays)
console.log(str[0]);     // 'H'
console.log(str[4]);     // 'o'
console.log(str.length); // 5
```

### Strings in JavaScript: Key Properties

#### 1. Strings are Immutable

**Critical difference from arrays:** You cannot modify a string in place!

```javascript
const str = "Hello";

// This doesn NOT modify the string
str[0] = 'J';
console.log(str);  // Still "Hello"

// You must create a NEW string
let newStr = 'J' + str.slice(1);
console.log(newStr);  // "Jello"
```

**Why it matters:**
- Every "modification" creates a new string
- String concatenation in loops can be O(n²)!
- Must use arrays or StringBuilder pattern for efficiency

#### 2. String Concatenation Cost

```javascript
// INEFFICIENT: O(n²) time!
let result = "";
for (let i = 0; i < n; i++) {
    result += str[i];  // Creates new string each time!
}
// Iteration 1: "" + 'a' = "a" (1 char copied)
// Iteration 2: "a" + 'b' = "ab" (2 chars copied)
// Iteration 3: "ab" + 'c' = "abc" (3 chars copied)
// Total: 1+2+3+...+n = n(n+1)/2 = O(n²)

// EFFICIENT: O(n) time
const chars = [];
for (let i = 0; i < n; i++) {
    chars.push(str[i]);  // Array push is O(1)
}
const result = chars.join('');  // Join once at end: O(n)
```

**Rule:** Use array + join() for building strings character-by-character.

#### 3. String Comparison

Strings are compared lexicographically (dictionary order):

```javascript
"apple" < "banana"  // true ('a' < 'b')
"apple" < "application"  // true (shorter, same prefix)
"ABC" < "abc"  // true (uppercase comes before lowercase in ASCII)

// Character codes
'A'.charCodeAt(0);  // 65
'a'.charCodeAt(0);  // 97
'0'.charCodeAt(0);  // 48
```

**Character order in ASCII:**
```
'0'-'9':  48-57   (digits)
'A'-'Z':  65-90   (uppercase letters)
'a'-'z':  97-122  (lowercase letters)
```

### Character Encoding

#### ASCII vs Unicode

**ASCII:** 128 characters (0-127)
- English letters, digits, punctuation, control characters
- Each character = 1 byte

**Unicode (UTF-16 in JavaScript):** 143,000+ characters
- All languages, emojis, symbols
- Each character = 2-4 bytes

```javascript
// ASCII characters
'A'.charCodeAt(0);  // 65

// Unicode characters
'😀'.charCodeAt(0); // 55357 (first part of surrogate pair)
'中'.charCodeAt(0);  // 20013
```

### Common String Patterns

#### Pattern 1: Palindrome

A string that reads the same forwards and backwards.

```
"racecar" → palindrome
"hello" → not palindrome

Checking: Compare first half with reversed second half
```

#### Pattern 2: Anagram

Two strings are anagrams if they contain the same characters with same frequencies.

```
"listen" and "silent" → anagrams
"hello" and "world" → not anagrams

Checking: Sort both or use character frequency map
```

#### Pattern 3: Substring vs Subsequence

**Substring:** Contiguous sequence of characters
```
"abcdef"
Substrings: "abc", "bcd", "def", "abcd", etc.
NOT substrings: "ace" (not contiguous)
```

**Subsequence:** Characters in order, but can skip
```
"abcdef"
Subsequences: "ace", "adf", "bdf", etc.
```

#### Pattern 4: Prefix and Suffix

```
String: "programming"

Prefixes: "", "p", "pr", "pro", ..., "programming"
Suffixes: "", "g", "ng", "ing", ..., "programming"

Common prefix of ["flower", "flow", "flight"] → "fl"
```

### String Algorithms Overview

#### 1. Pattern Matching

**Problem:** Find if/where pattern exists in text.

**Algorithms:**
- Naive: O(nm) - Check every position
- KMP (Knuth-Morris-Pratt): O(n+m) - Use pattern preprocessing
- Rabin-Karp: O(n) average - Use rolling hash

#### 2. String Hashing

Convert string to number for quick comparison:

```javascript
function simpleHash(str) {
    let hash = 0;
    for (let char of str) {
        hash = hash * 31 + char.charCodeAt(0);
    }
    return hash;
}

// Use case: Quick string comparison
// If hashes differ → strings definitely different
// If hashes same → strings probably same (need verification)
```

#### 3. String Transformation

Common transformations:
- **Reverse:** "hello" → "olleh"
- **Uppercase/Lowercase:** "Hello" → "HELLO" or "hello"
- **Remove spaces:** "a b c" → "abc"
- **Replace:** "hello world" → "hello everyone"

---

## 4. Visual Diagrams

### String as Array of Characters

```
String: "HELLO"
Index:   0 1 2 3 4

┌───┬───┬───┬───┬───┐
│ H │ E │ L │ L │ O │
└───┴───┴───┴───┴───┘
  ↑               ↑
str[0]         str[4]
```

### Palindrome Check (Two Pointers)

```
Check "racecar":

Step 1:  r a c e c a r
         ↑           ↑
         left      right
         r == r ✓

Step 2:  r a c e c a r
           ↑       ↑
           a == a ✓

Step 3:  r a c e c a r
             ↑   ↑
             c == c ✓

Step 4:  r a c e c a r
               ↑
          left >= right
          → Palindrome! ✓
```

### Anagram Check (Frequency Map)

```
"listen" vs "silent"

Build frequency maps:
"listen":  l:1, i:1, s:1, t:1, e:1, n:1
"silent":  s:1, i:1, l:1, e:1, n:1, t:1

Compare maps: All frequencies match ✓ → Anagrams!
```

### String Building Inefficiency

```
Building "HELLO" character by character:

BAD (string concatenation):
Step 1: "" + "H" = "H"        (copy 1 char)
Step 2: "H" + "E" = "HE"      (copy 2 chars)
Step 3: "HE" + "L" = "HEL"    (copy 3 chars)
Step 4: "HEL" + "L" = "HELL"  (copy 4 chars)
Step 5: "HELL" + "O" = "HELLO" (copy 5 chars)
Total: 1+2+3+4+5 = 15 operations = O(n²)

GOOD (array + join):
Step 1-5: Push to array       (5 operations)
Step 6: Join array to string  (5 chars copied once)
Total: 5+5 = 10 operations = O(n)
```

### Substring Search (Naive)

```
Text:    "HELLO WORLD"
Pattern: "LO"

Position 0:  HE vs LO ✗
Position 1:  EL vs LO ✗
Position 2:  LL vs LO ✗
Position 3:  LO vs LO ✓ Found at index 3!
```

### Character Frequency Array

```
For lowercase letters only:

String: "hello"

Frequency array (size 26):
Index: 0  1  2  3  4  5  6  7  8  9 ...
Char:  a  b  c  d  e  f  g  h  i  j ...
Count: 0  0  0  0  1  0  0  1  0  0 ...
                    ↑        ↑
                    e        h

index for 'e' = 'e'.charCodeAt(0) - 'a'.charCodeAt(0) = 4
```

---

## 5. JavaScript Implementation

### Example 1: Basic String Operations

```javascript
/**
 * Essential string operations in JavaScript
 */

const str = "Hello World";

// Length
console.log(str.length);  // 11

// Access character
console.log(str[0]);       // 'H'
console.log(str.charAt(0)); // 'H'
console.log(str.at(-1));   // 'd' (last character, ES2022)

// Substring extraction
console.log(str.slice(0, 5));      // "Hello" (start to end-1)
console.log(str.substring(0, 5));  // "Hello" (similar to slice)
console.log(str.substr(0, 5));     // "Hello" (start, length) - deprecated

// Case conversion
console.log(str.toLowerCase());  // "hello world"
console.log(str.toUpperCase());  // "HELLO WORLD"

// Search
console.log(str.indexOf('o'));      // 4 (first occurrence)
console.log(str.lastIndexOf('o'));  // 7 (last occurrence)
console.log(str.includes('World')); // true
console.log(str.startsWith('Hello')); // true
console.log(str.endsWith('World'));   // true

// Split and join
const words = str.split(' ');  // ["Hello", "World"]
const joined = words.join('-'); // "Hello-World"

// Replace
console.log(str.replace('World', 'JavaScript')); // "Hello JavaScript"
console.log(str.replaceAll('l', 'L'));  // "HeLLo WorLd"

// Trim whitespace
const padded = "  hello  ";
console.log(padded.trim());      // "hello"
console.log(padded.trimStart()); // "hello  "
console.log(padded.trimEnd());   // "  hello"

// Repeat
console.log('Ha'.repeat(3));  // "HaHaHa"

// Character codes
console.log('A'.charCodeAt(0));  // 65
console.log(String.fromCharCode(65)); // 'A'
```

### Example 2: Efficient String Building

```javascript
/**
 * String concatenation: Inefficient vs Efficient
 */

// INEFFICIENT: O(n²) time
function buildStringBad(chars) {
    let result = "";
    for (let char of chars) {
        result += char;  // Creates new string each time!
    }
    return result;
}

// EFFICIENT: O(n) time
function buildStringGood(chars) {
    const array = [];
    for (let char of chars) {
        array.push(char);  // Array push is O(1)
    }
    return array.join('');  // Join once at end
}

// BEST: Use built-in join directly
function buildStringBest(chars) {
    return chars.join('');
}

// Example usage
const chars = ['H', 'e', 'l', 'l', 'o'];
console.log(buildStringGood(chars));  // "Hello"

/**
 * StringBuilder pattern for complex building
 */
class StringBuilder {
    constructor() {
        this.buffer = [];
    }
    
    append(str) {
        this.buffer.push(str);
        return this;  // For chaining
    }
    
    toString() {
        return this.buffer.join('');
    }
    
    clear() {
        this.buffer = [];
    }
}

// Usage
const sb = new StringBuilder();
sb.append('Hello')
  .append(' ')
  .append('World');
console.log(sb.toString());  // "Hello World"
```

### Example 3: Palindrome Checking

```javascript
/**
 * Check if string is a palindrome
 */

// Method 1: Reverse and compare
function isPalindrome1(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}

// Method 2: Two pointers (more efficient, O(n/2) comparisons)
function isPalindrome2(str) {
    // Clean: remove non-alphanumeric, lowercase
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

// Method 3: Without creating new string (most space efficient)
function isPalindrome3(str) {
    let left = 0;
    let right = str.length - 1;
    
    function isAlphaNumeric(char) {
        const code = char.charCodeAt(0);
        return (code >= 48 && code <= 57) ||   // 0-9
               (code >= 65 && code <= 90) ||   // A-Z
               (code >= 97 && code <= 122);    // a-z
    }
    
    while (left < right) {
        // Skip non-alphanumeric from left
        while (left < right && !isAlphaNumeric(str[left])) {
            left++;
        }
        
        // Skip non-alphanumeric from right
        while (left < right && !isAlphaNumeric(str[right])) {
            right--;
        }
        
        // Compare (case-insensitive)
        if (str[left].toLowerCase() !== str[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

// Test
console.log(isPalindrome2("A man, a plan, a canal: Panama"));  // true
console.log(isPalindrome2("race a car"));  // false
```

### Example 4: Anagram Detection

```javascript
/**
 * Check if two strings are anagrams
 */

// Method 1: Sort and compare
function isAnagram1(s1, s2) {
    if (s1.length !== s2.length) return false;
    
    const sorted1 = s1.split('').sort().join('');
    const sorted2 = s2.split('').sort().join('');
    
    return sorted1 === sorted2;
}
// Time: O(n log n) due to sorting

// Method 2: Character frequency map (faster!)
function isAnagram2(s1, s2) {
    if (s1.length !== s2.length) return false;
    
    const freq = new Map();
    
    // Count characters in s1
    for (let char of s1) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    
    // Subtract characters from s2
    for (let char of s2) {
        if (!freq.has(char)) return false;
        freq.set(char, freq.get(char) - 1);
        if (freq.get(char) < 0) return false;
    }
    
    return true;
}
// Time: O(n), Space: O(k) where k = unique characters

// Method 3: Character frequency array (for lowercase letters only)
function isAnagram3(s1, s2) {
    if (s1.length !== s2.length) return false;
    
    const freq = new Array(26).fill(0);
    const base = 'a'.charCodeAt(0);
    
    for (let i = 0; i < s1.length; i++) {
        freq[s1.charCodeAt(i) - base]++;
        freq[s2.charCodeAt(i) - base]--;
    }
    
    return freq.every(count => count === 0);
}
// Time: O(n), Space: O(1) - fixed 26 elements

// Test
console.log(isAnagram2("listen", "silent"));  // true
console.log(isAnagram2("hello", "world"));    // false
```

### Example 5: String Reversal

```javascript
/**
 * Reverse a string in multiple ways
 */

// Method 1: Built-in methods
function reverse1(str) {
    return str.split('').reverse().join('');
}

// Method 2: Loop (building array)
function reverse2(str) {
    const chars = [];
    for (let i = str.length - 1; i >= 0; i--) {
        chars.push(str[i]);
    }
    return chars.join('');
}

// Method 3: Two pointers (if string were mutable)
// This shows the concept - JS strings are immutable
function reverse3(str) {
    const chars = str.split('');
    let left = 0;
    let right = chars.length - 1;
    
    while (left < right) {
        [chars[left], chars[right]] = [chars[right], chars[left]];
        left++;
        right--;
    }
    
    return chars.join('');
}

// Method 4: Recursion
function reverse4(str) {
    if (str.length <= 1) return str;
    return str[str.length - 1] + reverse4(str.slice(0, -1));
}

// Method 5: Reduce
function reverse5(str) {
    return str.split('').reduce((reversed, char) => char + reversed, '');
}

console.log(reverse1("Hello"));  // "olleH"
```

### Example 6: Pattern Matching (Naive)

```javascript
/**
 * Find all occurrences of pattern in text
 */

function findPattern(text, pattern) {
    const indices = [];
    const n = text.length;
    const m = pattern.length;
    
    // Check each possible starting position
    for (let i = 0; i <= n - m; i++) {
        let match = true;
        
        // Check if pattern matches at position i
        for (let j = 0; j < m; j++) {
            if (text[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        
        if (match) {
            indices.push(i);
        }
    }
    
    return indices;
}

// Test
const text = "AABAACAADAABAABA";
const pattern = "AABA";
console.log(findPattern(text, pattern));  // [0, 9, 12]

// Using built-in methods (simpler)
function findPatternBuiltIn(text, pattern) {
    const indices = [];
    let index = text.indexOf(pattern);
    
    while (index !== -1) {
        indices.push(index);
        index = text.indexOf(pattern, index + 1);
    }
    
    return indices;
}
```

### Example 7: Character Frequency

```javascript
/**
 * Count character frequencies
 */

// Using Map
function charFrequency(str) {
    const freq = new Map();
    
    for (let char of str) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    
    return freq;
}

// Using Object
function charFrequencyObj(str) {
    const freq = {};
    
    for (let char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }
    
    return freq;
}

// Using Array (lowercase letters only)
function charFrequencyArray(str) {
    const freq = new Array(26).fill(0);
    const base = 'a'.charCodeAt(0);
    
    for (let char of str) {
        const index = char.charCodeAt(0) - base;
        if (index >= 0 && index < 26) {
            freq[index]++;
        }
    }
    
    return freq;
}

// Find most frequent character
function mostFrequent(str) {
    const freq = charFrequency(str);
    let maxChar = '';
    let maxCount = 0;
    
    for (let [char, count] of freq) {
        if (count > maxCount) {
            maxCount = count;
            maxChar = char;
        }
    }
    
    return { char: maxChar, count: maxCount };
}

console.log(charFrequency("hello"));  // Map { 'h'=>1, 'e'=>1, 'l'=>2, 'o'=>1 }
console.log(mostFrequent("hello"));   // { char: 'l', count: 2 }
```

### Example 8: String Transformations

```javascript
/**
 * Common string transformations
 */

// Remove all spaces
function removeSpaces(str) {
    return str.split(' ').join('');
    // Or: str.replace(/ /g, '')
    // Or: str.replaceAll(' ', '')
}

// Remove all non-alphanumeric
function removeNonAlphaNumeric(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '');
}

// Capitalize first letter of each word
function capitalize(str) {
    return str.split(' ')
              .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
              .join(' ');
}

// Convert to camelCase
function toCamelCase(str) {
    return str.split(' ')
              .map((word, index) => {
                  if (index === 0) return word.toLowerCase();
                  return word[0].toUpperCase() + word.slice(1).toLowerCase();
              })
              .join('');
}

// Convert to snake_case
function toSnakeCase(str) {
    return str.toLowerCase().split(' ').join('_');
}

// Compress string (e.g., "aaabbc" -> "a3b2c1")
function compress(str) {
    if (!str) return '';
    
    const result = [];
    let count = 1;
    
    for (let i = 1; i <= str.length; i++) {
        if (i < str.length && str[i] === str[i - 1]) {
            count++;
        } else {
            result.push(str[i - 1] + count);
            count = 1;
        }
    }
    
    const compressed = result.join('');
    return compressed.length < str.length ? compressed : str;
}

console.log(capitalize("hello world"));  // "Hello World"
console.log(toCamelCase("hello world")); // "helloWorld"
console.log(compress("aaabbc"));         // "a3b2c1"
```

### Example 9: Longest Common Prefix

```javascript
/**
 * Find longest common prefix among array of strings
 */

function longestCommonPrefix(strs) {
    if (!strs.length) return '';
    
    // Start with first string as prefix
    let prefix = strs[0];
    
    // Compare with each subsequent string
    for (let i = 1; i < strs.length; i++) {
        // Reduce prefix until it matches start of current string
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (!prefix) return '';
        }
    }
    
    return prefix;
}

// Alternative: Vertical scanning
function longestCommonPrefix2(strs) {
    if (!strs.length) return '';
    
    // Check each character position
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];
        
        // Check if all strings have same character at position i
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== char) {
                return strs[0].slice(0, i);
            }
        }
    }
    
    return strs[0];
}

console.log(longestCommonPrefix(["flower", "flow", "flight"]));  // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"]));     // ""
```

---

## 6. Step-by-Step Walkthrough

### Walkthrough: Palindrome Check with Two Pointers

Check if "racecar" is a palindrome:

```javascript
str = "racecar"
left = 0, right = 6

Iteration 1:
  left = 0, right = 6
  str[0] = 'r', str[6] = 'r'
  'r' === 'r' ✓
  left++, right--
  left = 1, right = 5

Iteration 2:
  left = 1, right = 5
  str[1] = 'a', str[5] = 'a'
  'a' === 'a' ✓
  left++, right--
  left = 2, right = 4

Iteration 3:
  left = 2, right = 4
  str[2] = 'c', str[4] = 'c'
  'c' === 'c' ✓
  left++, right--
  left = 3, right = 3

Condition: left >= right
Exit loop
Return true ✓

Total comparisons: 3 (only half the string)
Time: O(n/2) = O(n)
Space: O(1)
```

### Walkthrough: Anagram Check with Frequency Map

Check if "listen" and "silent" are anagrams:

```javascript
s1 = "listen", s2 = "silent"

Step 1: Check lengths
  s1.length = 6, s2.length = 6 ✓

Step 2: Build frequency map for s1
  freq = {}
  'l': freq['l'] = 1
  'i': freq['i'] = 1
  's': freq['s'] = 1
  't': freq['t'] = 1
  'e': freq['e'] = 1
  'n': freq['n'] = 1
  freq = {l:1, i:1, s:1, t:1, e:1, n:1}

Step 3: Decrement for each char in s2
  's': freq['s'] = 1 - 1 = 0 ✓
  'i': freq['i'] = 1 - 1 = 0 ✓
  'l': freq['l'] = 1 - 1 = 0 ✓
  'e': freq['e'] = 1 - 1 = 0 ✓
  'n': freq['n'] = 1 - 1 = 0 ✓
  't': freq['t'] = 1 - 1 = 0 ✓

Step 4: Check all frequencies = 0
  All are 0 ✓
  Return true

Result: "listen" and "silent" are anagrams ✓
```

---

## 7. Complexity Analysis

### String Operation Complexities

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| Access by index | O(1) | O(1) | str[i] |
| Length | O(1) | O(1) | str.length (stored) |
| Concatenation (+) | O(n+m) | O(n+m) | Creates new string |
| Slice/Substring | O(k) | O(k) | k = length of slice |
| indexOf/includes | O(nm) | O(1) | n = text, m = pattern |
| Split | O(n) | O(n) | Creates array |
| Join | O(n) | O(1) | n = total chars |
| Replace | O(n) | O(n) | Creates new string |
| toLowerCase/Upper | O(n) | O(n) | Creates new string |
| Reverse | O(n) | O(n) | Using split-reverse-join |
| Palindrome check | O(n) | O(1) | Two pointers |
| Anagram check (freq map) | O(n) | O(k) | k = unique chars |
| Anagram check (sort) | O(n log n) | O(n) | Sorting cost |

### Algorithm Complexities

**String Building:**
- Naive concatenation in loop: O(n²) time, O(n²) space
- Array + join: O(n) time, O(n) space ✅

**Pattern Matching:**
- Naive: O(nm) time, O(1) space
- KMP: O(n+m) time, O(m) space
- Built-in indexOf: Usually O(nm) worst case

**Palindrome:**
- Reverse method: O(n) time, O(n) space
- Two pointers: O(n) time, O(1) space ✅

**Anagram:**
- Sort method: O(n log n) time, O(n) space
- Frequency map: O(n) time, O(k) space ✅
- Frequency array: O(n) time, O(1) space (fixed 26 for lowercase)

---

## 8. Common Patterns

### Pattern 1: Two Pointers for Palindrome/Reversal

```javascript
// Template
function twoPointerString(str) {
    let left = 0;
    let right = str.length - 1;
    
    while (left < right) {
        // Process str[left] and str[right]
        left++;
        right--;
    }
}
```

**Use cases:** Palindrome check, reverse string (concept), valid parentheses

### Pattern 2: Character Frequency Map

```javascript
// Template
function frequencyMap(str) {
    const freq = new Map();
    for (let char of str) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    return freq;
}
```

**Use cases:** Anagrams, character counting, find duplicates, group anagrams

### Pattern 3: Sliding Window on String

```javascript
// Template
function slidingWindow(str, k) {
    let windowStart = 0;
    
    for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
        // Add str[windowEnd] to window
        
        if (windowEnd - windowStart + 1 === k) {
            // Process window of size k
            
            // Slide window
            // Remove str[windowStart]
            windowStart++;
        }
    }
}
```

**Use cases:** Substring problems, longest substring with k distinct chars, minimum window substring

### Pattern 4: StringBuilder Pattern

```javascript
// Template
const chars = [];
for (let i = 0; i < n; i++) {
    chars.push(/* character */);
}
const result = chars.join('');
```

**Use cases:** Building strings character by character, string modifications

---

## 9. Practice Problems

### Easy Problems

1. **Valid Palindrome**
   - LeetCode #125
   - Goal: Check if string is palindrome (ignoring non-alphanumeric)
   - Concepts: Two pointers, character validation

2. **Valid Anagram**
   - LeetCode #242
   - Goal: Check if two strings are anagrams
   - Concepts: Frequency map or sorting

3. **Reverse String**
   - LeetCode #344
   - Goal: Reverse string in-place (as char array)
   - Concepts: Two pointers

4. **First Unique Character**
   - LeetCode #387
   - Goal: Find first non-repeating character
   - Concepts: Frequency map

5. **Is Subsequence**
   - LeetCode #392
   - Goal: Check if s is subsequence of t
   - Concepts: Two pointers

### Medium Problems

1. **Longest Substring Without Repeating Characters**
   - LeetCode #3
   - Goal: Find length of longest substring with unique chars
   - Concepts: Sliding window, hash set

2. **Longest Palindromic Substring**
   - LeetCode #5
   - Goal: Find longest palindromic substring
   - Concepts: Expand from center, DP

3. **Group Anagrams**
   - LeetCode #49
   - Goal: Group strings that are anagrams
   - Concepts: Frequency map, hashing

4. **String Compression**
   - LeetCode #443
   - Goal: Compress string in-place
   - Concepts: Two pointers, in-place modification

5. **Longest Common Prefix**
   - LeetCode #14
   - Goal: Find longest common prefix in array of strings
   - Concepts: Vertical/horizontal scanning

6. **Repeated DNA Sequences**
   - LeetCode #187
   - Goal: Find repeated 10-character substrings
   - Concepts: Sliding window, hash set

### Hard Problems

1. **Minimum Window Substring**
   - LeetCode #76
   - Goal: Find minimum window containing all characters of pattern
   - Concepts: Sliding window, frequency map

2. **Longest Substring with At Most K Distinct Characters**
   - LeetCode #340 (Premium)
   - Goal: Find longest substring with at most k distinct characters
   - Concepts: Sliding window, hash map

3. **Palindrome Pairs**
   - LeetCode #336
   - Goal: Find pairs of words that form palindromes
   - Concepts: Trie, string manipulation

---

## 10. Common Pitfalls

### Pitfall 1: Forgetting String Immutability

❌ **Wrong:**
```javascript
str[0] = 'X';  // Does nothing! Strings are immutable
```

✅ **Right:**
```javascript
str = 'X' + str.slice(1);  // Create new string
// Or use array: chars = str.split(''); chars[0] = 'X'; str = chars.join('');
```

### Pitfall 2: Inefficient String Concatenation

❌ **Wrong:**
```javascript
let result = "";
for (let char of str) {
    result += char;  // O(n²) - creates new string each time!
}
```

✅ **Right:**
```javascript
const chars = [];
for (let char of str) {
    chars.push(char);  // O(n)
}
const result = chars.join('');
```

### Pitfall 3: Not Handling Empty Strings

❌ **Wrong:**
```javascript
function process(str) {
    let first = str[0];  // Undefined if empty!
    // ...
}
```

✅ **Right:**
```javascript
function process(str) {
    if (str.length === 0) return /* handle empty */;
    let first = str[0];
    // ...
}
```

### Pitfall 4: Case Sensitivity Issues

❌ **Wrong:**
```javascript
if (str1 === str2)  // "Hello" !== "hello"
```

✅ **Right:**
```javascript
if (str1.toLowerCase() === str2.toLowerCase())
```

### Pitfall 5: Substring vs Subsequence Confusion

```javascript
// Substring: contiguous
"abc" is substring of "xabcy" ✓
"ac" is NOT substring of "xabcy" ✗

// Subsequence: in order but can skip
"abc" is subsequence of "xabcy" ✓
"ac" is subsequence of "xabcy" ✓ (skip 'b')
```

---

## 11. Interview Tips

### What Interviewers Look For

1. **Ask clarifying questions**
   - "Are all characters lowercase?"
   - "Can the string be empty?"
   - "Should I consider spaces/punctuation?"
   - "Is the string ASCII or Unicode?"

2. **Consider multiple approaches**
   - Brute force first
   - Optimize with hash maps
   - Consider space-time tradeoffs

3. **Handle edge cases**
   - Empty string
   - Single character
   - All same characters
   - Special characters

4. **Know your string methods**
   - Don't reinvent the wheel
   - But understand complexity of built-in methods

### Common Follow-Ups

**"Can you do it in-place?"**
→ Remember strings are immutable in JS, might need character array

**"What if the string is very long?"**
→ Discuss streaming approaches, space optimization

**"Can you optimize space?"**
→ Consider using frequency arrays instead of maps for fixed character sets

**"What about Unicode characters?"**
→ Discuss surrogate pairs, normalization

---

## 12. Summary & Key Takeaways

### Essential Concepts

1. **Strings are immutable** - Can't modify, must create new
2. **Use array + join for building** - Avoids O(n²) concatenation
3. **Two pointers for palindromes** - O(n) time, O(1) space
4. **Frequency maps for anagrams** - O(n) time, O(k) space
5. **Sliding window for substrings** - Efficient substring problems

### Quick Reference

**Palindrome Check:**
```javascript
let left = 0, right = str.length - 1;
while (left < right) {
    if (str[left] !== str[right]) return false;
    left++; right--;
}
return true;
```

**Anagram Check:**
```javascript
const freq = new Map();
for (char of s1) freq.set(char, (freq.get(char)||0)+1);
for (char of s2) freq.set(char, freq.get(char)-1);
return [...freq.values()].every(v => v === 0);
```

**Character Frequency:**
```javascript
const freq = {};
for (let char of str) {
    freq[char] = (freq[char] || 0) + 1;
}
```

### You've Mastered Strings When You Can:

- ✅ Manipulate strings efficiently
- ✅ Check palindromes with two pointers
- ✅ Detect anagrams with frequency maps
- ✅ Build strings without O(n²) cost
- ✅ Handle common string patterns

---

## 13. Next Steps

### What's Next?

**Next Topic:** Two Pointers Technique (Topic 1.4)

Now that you understand arrays and strings deeply, you'll learn the powerful two-pointer technique that applies to both. You've already seen hints of it (palindrome checks, in-place operations) - now we'll master it completely.

### Keep Practicing

- Solve all recommended problems
- Focus on string manipulation patterns
- Practice both with and without built-in methods
- Time yourself on easy problems (aim for <15 minutes)

### Connection to Future Topics

- **Two Pointers (1.4):** Builds directly on string manipulation
- **Sliding Window (1.5):** Many substring problems
- **Dynamic Programming (Phase 10):** String DP problems (LCS, edit distance)

---

## 🎉 Congratulations!

You've completed the string fundamentals! You now have solid foundations in the three core data structures: complexity analysis, arrays, and strings.

**Ready for patterns?** Tell your tutor: "I'm ready for the next topic!"

**Want more practice?** Ask: "Give me 5 string problems mixing easy and medium"

**Questions?** Ask about anything unclear - string mastery is crucial for interviews!

---

Strings power so much of software - from search engines to DNA analysis. The techniques you've learned will serve you throughout your career. Excellent work! 🚀

