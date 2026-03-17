# Sliding Window Pattern

**Topic 01.05 | Phase 01**  
**Estimated Time:** 5-6 hours  
**Difficulty:** Medium

---

## 1. Overview

### What You'll Learn

- Understand the sliding window technique and when to apply it
- Master fixed-size windows for subarray/substring problems
- Master variable-size windows with dynamic expansion and contraction
- Optimize brute-force O(n²) or O(n³) solutions to O(n)
- Identify the right window type for different problem patterns
- Use hash maps and counters within windows for complex constraints

### Why This Matters

Sliding window is one of the most powerful patterns for **contiguous subarray and substring problems**. It shows up constantly in interviews and directly extends your two-pointer knowledge.

**Real-World Applications:**
- Network packet analysis (bandwidth windows)
- Stock market analytics (moving averages)
- DNA sequence matching (biology)
- Text search and processing
- Rate limiting in APIs (time-based windows)

Once you master this, problems that seem to require nested loops become single-pass O(n) solutions.

---

## 2. Prerequisites

**Prerequisites:** Arrays, Strings, Complexity Analysis, Two Pointers (Topics 1.1 - 1.4)

- Arrays and string traversal (Topics 1.2, 1.3)
- Two-pointer same-direction technique (Topic 1.4)
- Hash maps / frequency counters (you'll use these here)
- Time & space complexity analysis (Topic 1.1)

---

## 3. Theory & Concepts

### What Is a Sliding Window?

A **sliding window** is a subarray or substring of a fixed or variable length that moves through a larger array or string. Instead of recomputing the entire window from scratch each step, you **slide** it — removing the element that left and adding the element that entered.

```
Array:   [1, 3, 5, 2, 8, 6, 4]
Window:  [1, 3, 5] → [3, 5, 2] → [5, 2, 8] → [2, 8, 6] → [8, 6, 4]
          ↑remove, add↑
```

**Key Insight:** The window overlaps — you only process the one element that changes each step, not the whole window.

---

### Type 1: Fixed-Size Window

Window size `k` is **constant**. You slide it one position at a time.

**Template:**
```
1. Build the first window (first k elements)
2. Record/process the initial window result
3. Slide: remove leftmost element, add new rightmost element
4. Update result each step
```

**Visual:**
```
k=3, find max sum
[2, 1, 5, 1, 3, 2]

Step 1: [2, 1, 5] sum=8
Step 2: [-2, +1] → [1, 5, 1] sum=7
Step 3: [-1, +3] → [5, 1, 3] sum=9 ← max
Step 4: [-5, +2] → [1, 3, 2] sum=6
```

---

### Type 2: Variable-Size Window

Window size is **dynamic** — expands and contracts based on a condition.

**Template:**
```
left = 0
for right from 0 to n-1:
    add arr[right] to window
    while window is INVALID:
        remove arr[left] from window
        left++
    update answer with current window
```

**Two sub-patterns:**

Both use the same template — the only difference is the order of "check validity" vs "update answer" vs "shrink".

| | Longest | Shortest |
|---|---|---|
| Record answer when | window is valid | window is valid |
| Then | move `right` forward | shrink `left` as far as possible |
| Shrink happens | only to fix invalidity | aggressively while still valid |

---

**2a. Find LONGEST window satisfying a condition:**

Goal: **maximize** window size — be greedy about expanding, reluctant to shrink.

```
Expand right → add element to window
  → if VALID:   update max_len (this window is a candidate)
  → if INVALID: shrink from left until valid again, then keep going
```

> Key insight: only record the answer when the window is valid. Shrinking just restores validity — don't record anything during a shrink.

**Example** — Longest substring with all unique chars (`"abcabcbb"`):
```
→ expand: "a"    ✓  max=1
→ expand: "ab"   ✓  max=2
→ expand: "abc"  ✓  max=3
→ expand: "abca" ✗  (duplicate 'a') → shrink → "bca" ✓  max stays 3
→ expand: "bcab" ✗  → shrink → "cab" ✓
→ expand: "cabc" ✗  → shrink → "abc" ✓
→ expand: "abcb" ✗  → shrink → "cb"  ✓
→ expand: "cbb"  ✗  → shrink → "b"   ✓
Answer: 3
```

---

**2b. Find SHORTEST window satisfying a condition:**

Goal: **minimize** window size — be aggressive about shrinking whenever possible.

```
Expand right → add element to window
  → if INVALID: keep expanding (don't record yet)
  → if VALID:   record min_len, then keep shrinking left as long as still valid,
                updating min_len each time
```

> Key insight: only record the answer when valid, then squeeze the window as small as possible before moving on.

**Example** — Minimum Window Substring (`s = "ADOBECODEBANC"`, `t = "ABC"`):
```
→ expand until window contains A, B, C → "ADOBEC"      ✓  min=6
→ shrink: remove 'A' → "DOBEC"                          ✗  stop shrinking
→ keep expanding → ... → "DOBECODEBA"                   ✗
→ keep expanding → "DOBECODEBANC"                        ✓  min=12? no...
  shrink: remove 'D' → "OBECODEBANC" still has A,B,C   ✓  min=11
  shrink: remove 'O' → "BECODEBANC"                    ✓  min=10
  ... continue shrinking until invalid
→ eventually find "BANC"                                ✓  min=4
Answer: "BANC"
```

**Visual (Longest substring with at most k distinct chars, k=2):**
```
s = "eceba", k=2

right=0: window="e"    {e:1}           valid, len=1
right=1: window="ec"   {e:1,c:1}       valid, len=2
right=2: window="ece"  {e:2,c:1}       valid, len=3
right=3: window="eceb" {e:2,c:1,b:1}   INVALID (3 distinct)
         shrink: left++ → "ceb" {c:1,e:1,b:1}  still 3, left++
         "eb" {e:1,b:1}   valid, len=2
right=4: window="eba"  {e:1,b:1,a:1}   INVALID
         shrink → "ba" {b:1,a:1}       valid, len=2
Answer: 3
```

---

### Type 3: Fixed-Size with Condition Check

A specific subtype — window is fixed size `k` but you check for a **property** (e.g., contains all unique chars, is an anagram, etc.).

**Pattern:**
```
Build window of size k
For each step:
    check condition on current window
    slide: remove left, add right
```

---

### When To Use Sliding Window

✅ **Perfect for:**
- Problems asking for max/min of a **contiguous** subarray or substring
- "Longest/shortest substring with property X"
- "Number of subarrays/substrings satisfying condition"
- "All anagrams in string"

❌ **Not for:**
- Non-contiguous subsequences (use DP or two pointers)
- Problems that require random access into the window
- Cases where shrinking isn't monotonic (complex conditions)

---

### Sliding Window vs Two Pointers

These are closely related — sliding window **is** a form of two pointers, but with a distinct identity:

| | Two Pointers | Sliding Window |
|--|--|--|
| **Focus** | Pair/triplet finding | Subarray/substring properties |
| **Movement** | Pointers can meet in middle | Left/right both move forward |
| **Window** | Not always a window | Always defines a contiguous range |
| **Array order** | Often sorted | Often unsorted |

---

### Complexity

| Solution Type | Time | Space |
|---|---|---|
| Brute force (nested loops) | O(n²) or O(n³) | O(1) |
| Sliding window (fixed) | O(n) | O(1) |
| Sliding window (variable) | O(n) | O(k) for hash map |

The window moves: right advances n times, left advances at most n times → 2n operations = **O(n)**.

---

## 4. Visual Diagrams

### Fixed Window: Maximum Sum Subarray of Size k

```
Array: [2, 1, 5, 1, 3, 2], k = 3

Initial window:
  [2, 1, 5, | 1, 3, 2]
   ↑←left  →↑right
   sum = 8

Slide right by 1:
  [2, | 1, 5, 1, | 3, 2]
       ↑←left  →↑right
   sum = 8 - 2 + 1 = 7

Slide right by 1:
  [2, 1, | 5, 1, 3, | 2]
          ↑←left  →↑right
   sum = 7 - 1 + 3 = 9  ← max!

Slide right by 1:
  [2, 1, 5, | 1, 3, 2 |]
             ↑←left  →↑right
   sum = 9 - 5 + 2 = 6

Answer: 9
```

---

### Variable Window: Longest Substring Without Repeating Characters

```
s = "abcabcbb"

Step-by-step:

right=0: add 'a' → window="a"    {a:1}   len=1
right=1: add 'b' → window="ab"   {a,b}   len=2
right=2: add 'c' → window="abc"  {a,b,c} len=3  ← new max
right=3: add 'a' → 'a' already in window!
         shrink: remove 'a' at left → window="bca" len=3
right=4: add 'b' → 'b' already in window!
         shrink: remove 'b' at left → window="cab" len=3
right=5: add 'c' → 'c' already in window!
         shrink: remove 'c' at left → window="abc" len=3
right=6: add 'b' → 'b' already in window!
         shrink: remove 'a' → "bcb" still has 'b'
         shrink: remove 'b' → "cb" len=2
right=7: add 'b' → 'b' already in window!
         shrink: remove 'c' → "bb" still has 'b'
         shrink: remove 'b' → "b" len=1

Answer: 3
```

---

## 5. JavaScript Implementations

### Fixed Window: Max Sum of k Consecutive Elements

```javascript
function maxSumSubarray(arr, k) {
  if (arr.length < k) return -1;

  // Build initial window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum;

  // Slide the window
  for (let right = k; right < arr.length; right++) {
    windowSum += arr[right] - arr[right - k]; // add new, remove old
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

// maxSumSubarray([2, 1, 5, 1, 3, 2], 3) → 9
// maxSumSubarray([2, 3, 4, 1, 5], 2)    → 7
```

---

### Variable Window: Longest Substring Without Repeating Characters

```javascript
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // Shrink window until no duplicate
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// lengthOfLongestSubstring("abcabcbb") → 3
// lengthOfLongestSubstring("bbbbb")    → 1
// lengthOfLongestSubstring("pwwkew")   → 3
```

---

### Variable Window: Minimum Window Substring (Advanced)

```javascript
function minWindow(s, t) {
  if (!t.length) return "";

  // Count required characters
  const need = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;

  const window = {};
  let have = 0;
  const required = Object.keys(need).length;

  let left = 0;
  let minLen = Infinity;
  let minStart = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window[c] = (window[c] || 0) + 1;

    // Check if this character satisfies a requirement
    if (need[c] !== undefined && window[c] === need[c]) {
      have++;
    }

    // Shrink from left while window is valid
    while (have === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }

      const leftChar = s[left];
      window[leftChar]--;
      if (need[leftChar] !== undefined && window[leftChar] < need[leftChar]) {
        have--;
      }
      left++;
    }
  }

  return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);
}

// minWindow("ADOBECODEBANC", "ABC") → "BANC"
// minWindow("a", "a")               → "a"
// minWindow("a", "aa")              → ""
```

---

### Fixed Window with Condition: Find All Anagrams

```javascript
function findAnagrams(s, p) {
  const result = [];
  if (s.length < p.length) return result;

  // Frequency arrays (26 lowercase letters)
  const pCount = new Array(26).fill(0);
  const windowCount = new Array(26).fill(0);
  const a = 'a'.charCodeAt(0);

  for (const c of p) pCount[c.charCodeAt(0) - a]++;

  // Build initial window of size p.length
  for (let i = 0; i < p.length; i++) {
    windowCount[s.charCodeAt(i) - a]++;
  }

  if (pCount.join(',') === windowCount.join(',')) result.push(0);

  // Slide window
  for (let right = p.length; right < s.length; right++) {
    const left = right - p.length;
    windowCount[s.charCodeAt(right) - a]++;
    windowCount[s.charCodeAt(left) - a]--;

    if (pCount.join(',') === windowCount.join(',')) {
      result.push(left + 1);
    }
  }

  return result;
}

// findAnagrams("cbaebabacd", "abc") → [0, 6]
// findAnagrams("abab", "ab")        → [0, 1, 2]
```

---

### Variable Window: Longest Subarray with Sum ≤ k

```javascript
function longestSubarrayWithSumAtMostK(arr, k) {
  let left = 0;
  let windowSum = 0;
  let maxLen = 0;

  for (let right = 0; right < arr.length; right++) {
    windowSum += arr[right];

    while (windowSum > k) {
      windowSum -= arr[left];
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

---

## 6. Step-by-Step Walkthrough: Longest Substring with At Most K Distinct Characters

**Problem:** Given string `s` and integer `k`, find the length of the longest substring containing at most `k` distinct characters.

**Example:** `s = "araaci"`, `k = 2` → answer is `4` (`"araa"`)

**Strategy:** Variable window, shrink when distinct chars > k.

```javascript
function longestSubstringKDistinct(s, k) {
  const charCount = {};
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // Step 1: Expand - add right character to window
    const rightChar = s[right];
    charCount[rightChar] = (charCount[rightChar] || 0) + 1;

    // Step 2: Shrink - while window has > k distinct chars
    while (Object.keys(charCount).length > k) {
      const leftChar = s[left];
      charCount[leftChar]--;
      if (charCount[leftChar] === 0) {
        delete charCount[leftChar];  // Remove from map when count hits 0
      }
      left++;
    }

    // Step 3: Record result
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

**Trace through `s = "araaci"`, `k = 2`:**

```
right=0, c='a': {a:1}                 distinct=1 ✅  len=1
right=1, c='r': {a:1, r:1}           distinct=2 ✅  len=2
right=2, c='a': {a:2, r:1}           distinct=2 ✅  len=3
right=3, c='a': {a:3, r:1}           distinct=2 ✅  len=4  ← max!
right=4, c='c': {a:3, r:1, c:1}      distinct=3 ❌
  shrink: remove s[0]='a' → {a:2, r:1, c:1}  still 3 ❌
  shrink: remove s[1]='r' → {a:2, c:1}        distinct=2 ✅  left=2
  len = 4-2+1 = 3
right=5, c='i': {a:2, c:1, i:1}      distinct=3 ❌
  shrink: remove s[2]='a' → {a:1, c:1, i:1}  still 3 ❌
  shrink: remove s[3]='a' → {c:1, i:1}         distinct=2 ✅  left=4
  len = 5-4+1 = 2

Answer: 4
```

---

## 7. Common Patterns Summary

### Pattern 1: Fixed Window
```
Problem type: max/min/count in every subarray of size k
Template:
  build initial window (0 to k-1)
  for i = k to n-1:
    add arr[i], remove arr[i-k]
    update answer
```
Examples: max sum of k elements, average of k elements

---

### Pattern 2: Longest Window (variable)
```
Problem type: find longest subarray/substring with property X
Template:
  left = 0
  for right = 0 to n-1:
    expand window (add right)
    while window INVALID:
      shrink (remove left, left++)
    maxLen = max(maxLen, right - left + 1)
```
Examples: longest unique substring, at most k distinct chars

---

### Pattern 3: Shortest Window (variable)
```
Problem type: find shortest subarray/substring with property X
Template:
  left = 0
  for right = 0 to n-1:
    expand window (add right)
    while window VALID:
      minLen = min(minLen, right - left + 1)
      shrink (remove left, left++)
```
Examples: minimum window substring, smallest subarray with sum ≥ k

---

### Pattern 4: Count of Windows
```
Problem type: count number of subarrays/substrings with property X
Trick: count(at most k) - count(at most k-1) = count(exactly k)
Template:
  function atMostK(arr, k):
    use longest-window template, count valid windows
```
Examples: subarrays with exactly k odd numbers

---

## 8. Complexity Analysis

### Why is Sliding Window O(n)?

```
right pointer: moves from 0 to n-1 → n steps
left pointer:  moves from 0 to at most n-1 → n steps
Total: 2n steps = O(n)

Even with the while loop inside the for loop,
left never moves backwards, so total left movements ≤ n.
```

### Space Complexity
```
Fixed window (sum/product): O(1)
Variable window with set/map: O(k) or O(alphabet size)
  - "at most k distinct" → O(k)
  - "no repeating chars" → O(26) = O(1) for lowercase letters
```

---

## 9. Practice Problems

### Easy Problems (Start Here!)

1. **Maximum Average Subarray I** - LeetCode #643
   - Difficulty: Easy
   - Pattern: Fixed window
   - Concepts: Sum of k elements, average
   - Time to solve: 15-20 min

2. **Maximum Sum of Distinct Subarrays With Length K** - LeetCode #2461
   - Difficulty: Medium (accessible)
   - Pattern: Fixed window with set
   - Concepts: Distinct elements in window
   - Time to solve: 20-25 min

3. **Diet Plan Performance** - LeetCode #1176
   - Difficulty: Easy
   - Pattern: Fixed window
   - Concepts: Sum comparison, counting
   - Time to solve: 15-20 min

4. **Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold** - LeetCode #1343
   - Difficulty: Easy
   - Pattern: Fixed window
   - Concepts: Sum and average, counting valid windows
   - Time to solve: 15-20 min

5. **Find the K-Beauty of a Number** - LeetCode #2269
   - Difficulty: Easy
   - Pattern: Fixed window (on digit string)
   - Concepts: Substring as number, divisibility
   - Time to solve: 15-20 min

6. **Maximum Number of Vowels in a Substring of Given Length** - LeetCode #1456
   - Difficulty: Medium (accessible)
   - Pattern: Fixed window
   - Concepts: Character counting in fixed window
   - Time to solve: 20-25 min

7. **Minimum Recolors to Get K Consecutive Black Blocks** - LeetCode #2379
   - Difficulty: Easy
   - Pattern: Fixed window
   - Concepts: Count within window, minimize flips
   - Time to solve: 15-20 min

### Medium Problems (Core Practice)

8. **Get Equal Substrings Within Budget** - LeetCode #1208
   - Difficulty: Medium
   - Pattern: Variable window (longest)
   - Concepts: Cost-based window constraint, shrink when over budget
   - Time to solve: 25-35 min

9. **Permutation in String** - LeetCode #567
   - Difficulty: Medium
   - Pattern: Fixed window with frequency match
   - Concepts: Anagram detection, frequency arrays
   - Time to solve: 25-35 min

10. **Find All Anagrams in a String** - LeetCode #438
    - Difficulty: Medium
    - Pattern: Fixed window with frequency match
    - Concepts: Sliding anagram detection
    - Time to solve: 25-35 min

11. **Fruit Into Baskets** - LeetCode #904
    - Difficulty: Medium
    - Pattern: Variable window (longest, at most 2 distinct)
    - Concepts: At most k distinct elements
    - Time to solve: 25-35 min

12. **Substrings of Size Three with Distinct Characters** - LeetCode #1876
    - Difficulty: Easy
    - Pattern: Fixed window
    - Concepts: Distinct char check in window of 3
    - Time to solve: 15-20 min

13. **Max Consecutive Ones III** - LeetCode #1004
    - Difficulty: Medium
    - Pattern: Variable window (longest)
    - Concepts: At most k flips, window with constraint
    - Time to solve: 25-35 min

14. **Minimum Size Subarray Sum** - LeetCode #209
    - Difficulty: Medium
    - Pattern: Variable window (shortest)
    - Concepts: Sum ≥ target, shrink when valid
    - Time to solve: 25-30 min
    - **Note:** Classic shortest-window problem!

### Hard Problems (Challenge Yourself)

15. **Minimum Window Subsequence** - LeetCode #727
    - Difficulty: Hard
    - Pattern: Variable window (shortest)
    - Concepts: Subsequence within window, two-pass shrink
    - Time to solve: 45-60 min

16. **Sliding Window Maximum** - LeetCode #239
    - Difficulty: Hard
    - Pattern: Fixed window with deque
    - Concepts: Monotonic deque, max tracking in window
    - Time to solve: 45-60 min
    - **Note:** Advanced — introduces the deque optimization

17. **Substring with Concatenation of All Words** - LeetCode #30
    - Difficulty: Hard
    - Pattern: Fixed window (word-level)
    - Concepts: Word-level sliding, frequency maps
    - Time to solve: 45-60 min

18. **Count Number of Nice Subarrays** - LeetCode #1248
    - Difficulty: Medium
    - Pattern: Variable window (count exactly k)
    - Concepts: atMost(k) - atMost(k-1) trick
    - Time to solve: 30-40 min

19. **Subarrays with K Different Integers** - LeetCode #992
    - Difficulty: Hard
    - Pattern: Variable window (count exactly k)
    - Concepts: atMost trick with distinct integers
    - Time to solve: 40-50 min

20. **Grumpy Bookstore Owner** - LeetCode #1052
    - Difficulty: Medium
    - Pattern: Fixed window (maximize benefit)
    - Concepts: Fixed window to find best window, combine with baseline
    - Time to solve: 30-40 min

### Topic Coverage Matrix

**Every concept has dedicated problems:**

| Concept | Problems Covering It |
|---------|---------------------|
| **Fixed Window - Sum/Average** | #643, #1176, #1343, #1052 |
| **Fixed Window - Distinct/Condition** | #2461, #2269, #1456, #1876, #2379 |
| **Fixed Window - Anagram/Frequency** | #567, #438 |
| **Fixed Window - Deque (Advanced)** | #239 |
| **Fixed Window - Word-Level** | #30 |
| **Variable Window - Longest with Budget** | #1208 |
| **Variable Window - At Most k Distinct** | #904, #1004 |
| **Variable Window - Shortest** | #209, #727 |
| **Variable Window - Count Exactly k** | #1248, #992 |

✅ **All major sliding window patterns covered!**

**Total: 20 problems**

### Practice Plan

**Day 1:** Problems 1-4 (Easy fixed windows — sums and averages)  
**Day 2:** Problems 5-7 (Easy/medium intro + first variable window)  
**Day 3:** Problems 8-10 (Medium — frequency matching and anagrams)  
**Day 4:** Problems 11-13 (Medium — at most k and constraints)  
**Day 5:** Problems 14-15 (Shortest window — classic patterns)  
**Day 6:** Problems 16-17 (Hard — deque and word-level windows)  
**Day 7:** Problems 18-20 (Count patterns — the atMost trick)

---

## 10. Common Pitfalls

### 1. Forgetting to Clean Up the Window

When removing `arr[left]` from a map/set, always check if the count drops to zero before deleting the key:

```javascript
// ❌ Wrong - leaves zero-count entries
charCount[leftChar]--;

// ✅ Correct
charCount[leftChar]--;
if (charCount[leftChar] === 0) delete charCount[leftChar];
```

---

### 2. Off-by-One in Window Length

Window length from index `left` to `right` (inclusive):

```javascript
// ❌ Wrong
length = right - left;

// ✅ Correct
length = right - left + 1;
```

---

### 3. Using Wrong Window Type

- Asking for **max** length → expand greedily, shrink when invalid (longest window)
- Asking for **min** length → shrink as soon as valid (shortest window)
- Asking for **fixed k** → always maintain exactly k elements

---

### 4. Infinite Loop in While Shrink

If your invalid condition never becomes valid after shrinking, you'll loop forever. Always ensure shrinking moves `left` forward unconditionally:

```javascript
while (window is invalid) {
  remove arr[left];  // MUST update window state
  left++;            // MUST advance left
}
```

---

### 5. Not Initializing the Window State Correctly

For fixed windows, build the first k elements before sliding. For variable windows, start with an empty window at `left = 0`.

---

## 11. Connections to Other Topics

### Builds On:
- **Two Pointers (1.4):** Sliding window is same-direction two pointers with a defined range
- **Strings (1.3):** Most string problems here use character frequency maps
- **Arrays (1.2):** Fixed-window problems on arrays (subarrays, prefix sums connection)

### Leads To:
- **Hashing & Hash Maps (1.6):** More complex frequency tracking
- **Monotonic Stack/Deque:** Used in sliding window maximum (#239)
- **DP (Phase 10):** Some DP problems use sliding window optimization

---

## 12. Quick Reference

### Fixed Window Skeleton

```javascript
function fixedWindow(arr, k) {
  let windowVal = 0; // sum, count, etc.

  // Build initial window
  for (let i = 0; i < k; i++) {
    windowVal += arr[i];
  }
  let result = windowVal;

  // Slide
  for (let right = k; right < arr.length; right++) {
    windowVal += arr[right] - arr[right - k];
    result = Math.max(result, windowVal); // or min, or count
  }

  return result;
}
```

### Variable Window Skeleton (Longest)

```javascript
function variableWindowLongest(s) {
  const window = {}; // or Set
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // 1. Add s[right] to window
    window[s[right]] = (window[s[right]] || 0) + 1;

    // 2. Shrink while invalid
    while (/* window invalid */) {
      window[s[left]]--;
      if (window[s[left]] === 0) delete window[s[left]];
      left++;
    }

    // 3. Update result
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

### Variable Window Skeleton (Shortest)

```javascript
function variableWindowShortest(arr, target) {
  let windowSum = 0;
  let left = 0;
  let minLen = Infinity;

  for (let right = 0; right < arr.length; right++) {
    windowSum += arr[right];

    while (/* window valid */) {
      minLen = Math.min(minLen, right - left + 1);
      windowSum -= arr[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
```

---

## 13. Key Takeaways

1. **Sliding window = two pointers + a contiguous range** — same O(n) guarantee
2. **Fixed window:** slide one step at a time, maintain state by removing old + adding new
3. **Variable window:** expand right always, shrink left until valid (longest) or until invalid (shortest)
4. **The while loop is O(n) total** — left never goes backwards, so total iterations ≤ 2n
5. **Maps/sets track window state** — always clean up zero-count keys to avoid false validity checks
6. **Count exactly k = atMost(k) - atMost(k-1)** — a powerful pattern for counting problems
7. **Fixed vs variable is determined by the problem**, not your choice — read carefully
