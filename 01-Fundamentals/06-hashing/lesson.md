# Hashing & Hash Maps

**Topic 01.06 | Phase 01**  
**Estimated Time:** 4-5 hours  
**Difficulty:** Easy-Medium

---

## 1. Overview

### What You'll Learn

- Understand how hash functions and hash tables work under the hood
- Master JavaScript's `Map` and plain objects for hash-based solutions
- Use hash maps for O(1) average lookup, insert, and delete
- Solve counting, grouping, and lookup problems efficiently
- Handle collisions conceptually (chaining vs open addressing)
- Apply frequency maps, prefix sum + hash map combos, and two-pass patterns

### Why This Matters

Hash maps are the **single most useful data structure** for coding interviews. They transform brute-force O(n²) solutions into O(n) by trading space for time. Nearly every category of problem can benefit from hashing:

- **Frequency counting** — character/word/element frequency
- **Lookup acceleration** — "have I seen this before?" in O(1)
- **Grouping** — anagrams, equivalence classes
- **Complement finding** — two-sum pattern
- **Caching** — memoization, deduplication

More than 30% of LeetCode problems involve hash maps in their optimal solution.

---

## 2. Prerequisites

**Prerequisites:** Complexity Analysis (1.1), Arrays (1.2), Strings (1.3), Two Pointers (1.4), Sliding Window (1.5)

- Big-O analysis — understanding why O(1) lookup matters
- Array traversal and string operations
- Frequency counting basics (used informally in prior lessons)

---

## 3. Theory & Concepts

### What Is a Hash Map?

A **hash map** (also called hash table, dictionary, or associative array) stores **key-value pairs** with O(1) average time for get, set, and delete operations.

```
key → hash function → index → value stored at index
```

**Example:**
```
hash("apple") → 3
hash("banana") → 7
hash("cherry") → 1

Index:  [0]  [1]       [2]  [3]      [4]  [5]  [6]  [7]
Value:  [ ]  [cherry]  [ ]  [apple]  [ ]  [ ]  [ ]  [banana]
```

---

### Hash Functions

A hash function converts a key into an integer (array index).

**Properties of a good hash function:**
1. **Deterministic** — same key always produces the same hash
2. **Uniform distribution** — spreads keys evenly across the table
3. **Fast to compute** — O(1) for fixed-size keys

**Simple example (for strings):**
```javascript
function simpleHash(key, tableSize) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % tableSize;
  }
  return hash;
}
```

---

### Collisions

When two different keys produce the same index, that's a **collision**. Two main strategies:

**1. Chaining (Separate Chaining)**
Each bucket stores a linked list of entries:
```
Index 3: [("apple", 5)] → [("grape", 8)] → null
```

**2. Open Addressing (Linear Probing)**
If a slot is taken, check the next slot:
```
hash("apple") = 3 → slot 3 taken → try slot 4 → empty, store here
```

In practice, JavaScript's `Map` and objects handle this for you. The concepts matter for understanding **why** performance can degrade to O(n) in worst case.

---

### Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Insert | O(1) | O(n) |
| Lookup | O(1) | O(n) |
| Delete | O(1) | O(n) |
| Iterate | O(n) | O(n) |

Worst case happens when all keys hash to the same bucket (rare with good hash functions).

**Space:** O(n) where n is the number of stored key-value pairs.

---

### JavaScript Hash Map Options

#### 1. Plain Object `{}`
```javascript
const freq = {};
freq['a'] = 1;         // set
console.log(freq['a']); // get → 1
delete freq['a'];       // delete
'a' in freq;            // check existence
Object.keys(freq);      // all keys
```

**Limitations:** Keys are always strings, has prototype chain, no guaranteed insertion order.

#### 2. Map (Preferred)
```javascript
const map = new Map();
map.set('a', 1);       // set
map.get('a');           // get → 1
map.has('a');           // check → true
map.delete('a');        // delete
map.size;              // count
map.forEach((v, k) => { }); // iterate
```

**Advantages:** Any key type, guaranteed insertion order, `.size`, no prototype issues.

#### When to Use Which
```
Plain object: simple string-key frequency maps
Map: when you need non-string keys, guaranteed order, or .size
```

---

### Core Patterns

#### Pattern 1: Frequency Counter
```javascript
function frequencyMap(arr) {
  const freq = new Map();
  for (const item of arr) {
    freq.set(item, (freq.get(item) || 0) + 1);
  }
  return freq;
}
```

#### Pattern 2: Lookup / Complement
```javascript
function twoSum(nums, target) {
  const seen = new Map(); // value → index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}
```

#### Pattern 3: Grouping
```javascript
function groupAnagrams(strs) {
  const groups = new Map();
  for (const s of strs) {
    const key = [...s].sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  return [...groups.values()];
}
```

#### Pattern 4: Prefix Sum + Hash Map
```javascript
function subarraySum(nums, k) {
  const prefixCount = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const num of nums) {
    sum += num;
    if (prefixCount.has(sum - k)) {
      count += prefixCount.get(sum - k);
    }
    prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
  }
  return count;
}
```

#### Pattern 5: First/Last Occurrence Tracking
```javascript
function firstUniqueChar(s) {
  const freq = {};
  for (const c of s) freq[c] = (freq[c] || 0) + 1;
  for (let i = 0; i < s.length; i++) {
    if (freq[s[i]] === 1) return i;
  }
  return -1;
}
```

---

## 4. Visual Diagrams

### Hash Map Insert & Lookup

```
Insert: ("cat", 3), ("dog", 7), ("ant", 1), ("bat", 5)

hash("cat") % 8 = 2
hash("dog") % 8 = 5
hash("ant") % 8 = 2  ← collision with "cat"!
hash("bat") % 8 = 6

Chaining:
  [0]: empty
  [1]: empty
  [2]: ("cat",3) → ("ant",1)    ← chained
  [3]: empty
  [4]: empty
  [5]: ("dog",7)
  [6]: ("bat",5)
  [7]: empty

Lookup "ant":
  1. hash("ant") = 2
  2. Go to bucket 2
  3. First entry is "cat" → not "ant"
  4. Follow chain → "ant" found → return 1
```

---

### Frequency Counter Pattern

```
Input: "abracadabra"

Build map:
  'a' → 5
  'b' → 2
  'r' → 2
  'c' → 1
  'd' → 1

Finding first unique character:
  s[0]='a' → freq 5 → skip
  s[1]='b' → freq 2 → skip
  s[2]='r' → freq 2 → skip
  s[3]='a' → freq 5 → skip
  s[4]='c' → freq 1 → FOUND! return index 4
```

---

### Two Sum with Hash Map

```
nums = [2, 7, 11, 15], target = 9

Step 1: num=2, need=7, seen={}         → not found → seen={2:0}
Step 2: num=7, need=2, seen={2:0}      → FOUND at index 0!
        return [0, 1]

Without hash map: O(n²) nested loops
With hash map:    O(n) single pass
```

---

## 5. JavaScript Implementations

### Implementation 1: Basic Hash Table from Scratch

```javascript
class HashTable {
  constructor(size = 53) {
    this.table = new Array(size);
    this.size = size;
    this.count = 0;
  }

  _hash(key) {
    let hash = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      hash = (hash * PRIME + key.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  set(key, value) {
    const idx = this._hash(key);
    if (!this.table[idx]) this.table[idx] = [];

    for (const pair of this.table[idx]) {
      if (pair[0] === key) { pair[1] = value; return; }
    }

    this.table[idx].push([key, value]);
    this.count++;
  }

  get(key) {
    const idx = this._hash(key);
    if (!this.table[idx]) return undefined;
    for (const pair of this.table[idx]) {
      if (pair[0] === key) return pair[1];
    }
    return undefined;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  delete(key) {
    const idx = this._hash(key);
    if (!this.table[idx]) return false;
    for (let i = 0; i < this.table[idx].length; i++) {
      if (this.table[idx][i][0] === key) {
        this.table[idx].splice(i, 1);
        this.count--;
        return true;
      }
    }
    return false;
  }
}
```

---

### Implementation 2: Frequency Counter

```javascript
function charFrequency(s) {
  const freq = new Map();
  for (const c of s) {
    freq.set(c, (freq.get(c) || 0) + 1);
  }
  return freq;
}

// charFrequency("hello") → Map { 'h' => 1, 'e' => 1, 'l' => 2, 'o' => 1 }
```

---

### Implementation 3: Two Sum (Classic)

```javascript
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}

// twoSum([2, 7, 11, 15], 9) → [0, 1]
```

---

### Implementation 4: Group Anagrams

```javascript
function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = [...s].sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}

// groupAnagrams(["eat","tea","tan","ate","nat","bat"])
// → [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

---

### Implementation 5: Subarray Sum Equals K

```javascript
function subarraySum(nums, k) {
  const prefixCount = new Map([[0, 1]]);
  let sum = 0;
  let count = 0;

  for (const num of nums) {
    sum += num;
    if (prefixCount.has(sum - k)) {
      count += prefixCount.get(sum - k);
    }
    prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
  }

  return count;
}

// subarraySum([1, 1, 1], 2) → 2
// subarraySum([1, 2, 3], 3) → 2
```

---

### Implementation 6: Isomorphic Strings

```javascript
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  const sToT = new Map();
  const tToS = new Map();

  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = t[i];
    if (sToT.has(a) && sToT.get(a) !== b) return false;
    if (tToS.has(b) && tToS.get(b) !== a) return false;
    sToT.set(a, b);
    tToS.set(b, a);
  }
  return true;
}

// isIsomorphic("egg", "add") → true
// isIsomorphic("foo", "bar") → false
```

---

## 6. Step-by-Step Walkthrough: Subarray Sum Equals K

**Problem:** Given an array `nums` and integer `k`, return the total number of subarrays whose sum equals `k`.

**Why hash map?** Brute force checks all O(n²) subarrays. With a prefix sum + hash map, we can find all subarrays summing to `k` in a single O(n) pass.

**Key Insight:** If `prefixSum[j] - prefixSum[i] = k`, then subarray `[i+1...j]` sums to `k`. So at each position `j`, we check if `prefixSum[j] - k` has been seen before.

```
nums = [3, 4, 7, 2, -3, 1, 4, 2], k = 7

Step-by-step:
prefixCount = {0: 1}  (base case: empty prefix)
sum = 0, count = 0

i=0: sum=3,  need=3-7=-4,  not in map     → count=0  map={0:1, 3:1}
i=1: sum=7,  need=7-7=0,   0 in map (×1)  → count=1  map={0:1, 3:1, 7:1}
i=2: sum=14, need=14-7=7,  7 in map (×1)  → count=2  map={0:1, 3:1, 7:1, 14:1}
i=3: sum=16, need=16-7=9,  not in map     → count=2  map={..., 16:1}
i=4: sum=13, need=13-7=6,  not in map     → count=2  map={..., 13:1}
i=5: sum=14, need=14-7=7,  7 in map (×1)  → count=3  map={..., 14:2}
i=6: sum=18, need=18-7=11, not in map     → count=3  map={..., 18:1}
i=7: sum=20, need=20-7=13, 13 in map (×1) → count=4  map={..., 20:1}

Answer: 4 subarrays sum to 7
```

---

## 7. Common Patterns Summary

### Pattern 1: Frequency Count
```
Use: Count occurrences, find most/least frequent, check anagrams
Template: Build map → query map
Time: O(n) to build, O(1) per query
```

### Pattern 2: Complement / Two-Pass Lookup
```
Use: Find pairs summing to target, find matching elements
Template: Store seen values → check for complement
Time: O(n) single pass
```

### Pattern 3: Grouping by Key
```
Use: Group anagrams, group by property, categorize
Template: Compute canonical key → group in map
Time: O(n × key_cost)
```

### Pattern 4: Prefix Sum + Hash Map
```
Use: Count subarrays with sum k, find subarray with property
Template: Track running prefix → lookup (prefix - target) in map
Time: O(n)
```

### Pattern 5: Bijection / Mapping Check
```
Use: Isomorphic strings, word pattern, encoding validation
Template: Two maps (forward + reverse) → check consistency
Time: O(n)
```

### Pattern 6: Index Tracking
```
Use: First unique, distance between duplicates, earliest occurrence
Template: Map value → first/last index
Time: O(n) build, O(1) lookup
```

---

## 8. Complexity Analysis

### Space-Time Tradeoff

```
Brute force (no hash map):
  - Find pair with sum k: O(n²) time, O(1) space
  - Find duplicates:      O(n²) time, O(1) space
  - Group anagrams:       O(n² × m) time, O(n) space

With hash map:
  - Find pair with sum k: O(n) time, O(n) space
  - Find duplicates:      O(n) time, O(n) space
  - Group anagrams:       O(n × m log m) time, O(n) space
```

The core tradeoff: **use O(n) extra space to save O(n) time**, reducing quadratic to linear.

### Load Factor

```
Load factor = number of entries / table size
α < 0.75 → O(1) average operations (good)
α > 0.9  → many collisions → approaches O(n) (bad)

JavaScript's Map automatically resizes to maintain low load factor.
```

---

## 9. Practice Problems

### Easy Problems (Start Here!)

1. **Contains Duplicate II** - LeetCode #219
   - Difficulty: Easy
   - Pattern: Index tracking with hash map
   - Concepts: Store last-seen index, check distance constraint
   - Time to solve: 15-20 min

2. **Roman to Integer** - LeetCode #13
   - Difficulty: Easy
   - Pattern: Character-to-value mapping
   - Concepts: Predefined hash map, lookup-driven logic
   - Time to solve: 15-20 min

3. **Ransom Note** - LeetCode #383
   - Difficulty: Easy
   - Pattern: Frequency counter
   - Concepts: Character counting, availability check
   - Time to solve: 15-20 min

4. **Isomorphic Strings** - LeetCode #205
   - Difficulty: Easy
   - Pattern: Bijection mapping
   - Concepts: Two-map consistency, forward+reverse mapping
   - Time to solve: 20-25 min

5. **Word Pattern** - LeetCode #290
   - Difficulty: Easy
   - Pattern: Bijection mapping
   - Concepts: String ↔ pattern mapping, two-way check
   - Time to solve: 20-25 min

6. **Find the Difference of Two Arrays** - LeetCode #2215
   - Difficulty: Easy
   - Pattern: Frequency counter / set difference
   - Concepts: Hash set lookups, find elements unique to each array
   - Time to solve: 15-20 min

7. **Majority Element** - LeetCode #169
   - Difficulty: Easy
   - Pattern: Frequency counter + max tracking
   - Concepts: Count occurrences, Boyer-Moore alternative
   - Time to solve: 15-20 min

### Medium Problems (Core Practice)

8. **Sort Characters By Frequency** - LeetCode #451
   - Difficulty: Medium
   - Pattern: Frequency counter + sorting
   - Concepts: Build frequency map, sort by count, reconstruct
   - Time to solve: 20-30 min

9. **Longest Consecutive Sequence** - LeetCode #128
   - Difficulty: Medium
   - Pattern: Set-based lookup (hash set as hash map variant)
   - Concepts: O(n) sequence finding, smart start detection
   - Time to solve: 30-40 min

10. **Continuous Subarray Sum** - LeetCode #523
    - Difficulty: Medium
    - Pattern: Prefix sum + hash map (modular arithmetic)
    - Concepts: Running sum mod k, first-occurrence index tracking
    - Time to solve: 30-40 min

11. **Top K Frequent Words** - LeetCode #692
    - Difficulty: Medium
    - Pattern: Frequency map + sorting
    - Concepts: Frequency counting, tiebreaking by lexicographic order
    - Time to solve: 25-35 min

12. **Contiguous Array** - LeetCode #525
    - Difficulty: Medium
    - Pattern: Prefix sum + hash map
    - Concepts: Transform 0/1 to -1/1, running sum, first occurrence
    - Time to solve: 30-40 min

13. **Brick Wall** - LeetCode #554
    - Difficulty: Medium
    - Pattern: Frequency counter on prefix sums
    - Concepts: Track edge positions, maximize alignment
    - Time to solve: 30-40 min

14. **Encode and Decode TinyURL** - LeetCode #535
    - Difficulty: Medium
    - Pattern: Bidirectional hash map
    - Concepts: URL shortening, encoding/decoding with two maps
    - Time to solve: 20-30 min

15. **Custom Sort String** - LeetCode #791
    - Difficulty: Medium
    - Pattern: Frequency counter + order map
    - Concepts: Character ordering via hash map
    - Time to solve: 20-25 min

16. **Find All Duplicates in an Array** - LeetCode #442
    - Difficulty: Medium
    - Pattern: Index as hash (in-place hashing)
    - Concepts: Use array itself as hash map, O(1) space trick
    - Time to solve: 25-30 min

### Hard Problems (Challenge Yourself)

17. **Longest Substring with At Most Two Distinct Characters** - LeetCode #159
    - Difficulty: Medium-Hard
    - Pattern: Hash map + sliding window
    - Concepts: Track character counts in variable window, cleanup at 0
    - Time to solve: 30-40 min

18. **LRU Cache** - LeetCode #146
    - Difficulty: Medium-Hard
    - Pattern: Hash map + doubly linked list
    - Concepts: O(1) get and put, eviction policy
    - Time to solve: 45-60 min
    - **Note:** Classic system design + hash map problem

19. **Longest Substring with At Most K Distinct Characters** - LeetCode #340
    - Difficulty: Hard
    - Pattern: Hash map + sliding window
    - Concepts: Track character counts in window, cleanup
    - Time to solve: 35-45 min

20. **Insert Delete GetRandom O(1)** - LeetCode #380
    - Difficulty: Medium-Hard
    - Pattern: Hash map + array combo
    - Concepts: O(1) for all three operations, swap-and-pop trick
    - Time to solve: 35-45 min

### Topic Coverage Matrix

**Every concept has dedicated problems:**

| Concept | Problems Covering It |
|---------|---------------------|
| **Hash Function & Internals** | #146 (LRU), #380 (design), #535 (encoding) |
| **Frequency Counter** | #383, #2215, #169, #442, #451, #692 |
| **Index Tracking / Lookup** | #219, #13 |
| **Bijection / Mapping** | #205, #290 |
| **Prefix Sum + Hash Map** | #523, #525, #554 |
| **Hash Map + Sliding Window** | #159, #340 |
| **Hash Map + Data Structure Combo** | #146 (+ linked list), #380 (+ array) |
| **Custom Ordering** | #791 |
| **Sequence Finding** | #128 |
| **In-Place Hashing** | #442 |

✅ **All major hash map patterns covered!**

**Total: 20 problems**

### Practice Plan

**Day 1:** Problems 1-3 (Easy — lookup, mapping, frequency)  
**Day 2:** Problems 4-7 (Easy — bijection, anagram, majority)  
**Day 3:** Problems 8-10 (Medium — grouping, sequences, prefix sum)  
**Day 4:** Problems 11-13 (Medium — top K, contiguous array, brick wall)  
**Day 5:** Problems 14-16 (Medium — encoding, sorting, in-place hash)  
**Day 6:** Problems 17-18 (Hard — window + map, LRU cache)  
**Day 7:** Problems 19-20 (Hard — at most k distinct, randomized set)

---

## 10. Common Pitfalls

### 1. Forgetting to Initialize the Prefix Sum Base Case

For prefix-sum + hash map problems, always seed with `{0: 1}`:

```javascript
// ❌ Wrong — misses subarrays starting at index 0
const map = new Map();

// ✅ Correct
const map = new Map([[0, 1]]);
```

---

### 2. Using Object Keys When Order Matters

Plain objects don't guarantee insertion order for numeric-like keys:

```javascript
// ❌ May reorder
const obj = {};
obj['2'] = 'b'; obj['1'] = 'a'; obj['3'] = 'c';
Object.keys(obj); // ['1', '2', '3'] — sorted!

// ✅ Use Map for guaranteed insertion order
const map = new Map();
map.set('2', 'b'); map.set('1', 'a'); map.set('3', 'c');
[...map.keys()]; // ['2', '1', '3'] — insertion order preserved
```

---

### 3. Not Handling Missing Keys

```javascript
// ❌ Wrong — NaN + 1 = NaN
map.set(key, map.get(key) + 1);

// ✅ Correct — default to 0
map.set(key, (map.get(key) || 0) + 1);
```

---

### 4. Mutating Keys After Insertion

With `Map`, if you use an object as a key and mutate it, the hash stays the same but equality breaks:

```javascript
const key = [1, 2];
map.set(key, 'value');
key.push(3);
map.get(key); // still works (same reference), but be careful
map.get([1, 2, 3]); // undefined — different reference!
```

Prefer primitive keys (strings, numbers) for predictable behavior.

---

### 5. Confusing `in` vs `hasOwnProperty` vs `Map.has`

```javascript
// Object: use hasOwnProperty to avoid prototype pollution
if (obj.hasOwnProperty(key)) { }

// Map: use .has()
if (map.has(key)) { }

// ❌ 'in' operator also checks the prototype chain
if (key in obj) { } // may find inherited properties
```

---

## 11. Connections to Other Topics

### Builds On:
- **Arrays (1.2):** Hash maps often operate on arrays
- **Strings (1.3):** Character frequency maps, anagram detection
- **Two Pointers (1.4):** Some problems combine both (e.g., window + map)
- **Sliding Window (1.5):** Window state often tracked with a hash map

### Leads To:
- **Sets & Hash Sets (1.7):** Simplified hash map (keys only)
- **Hash Tables Deep Dive (2.4):** Implementation details, rehashing
- **Graph Adjacency Lists:** Represented as hash maps
- **Memoization (DP):** Hash maps store computed subproblem results

---

## 12. Quick Reference

### Frequency Counter Template
```javascript
const freq = new Map();
for (const item of arr) {
  freq.set(item, (freq.get(item) || 0) + 1);
}
```

### Complement Lookup Template
```javascript
const seen = new Map();
for (let i = 0; i < arr.length; i++) {
  const need = target - arr[i];
  if (seen.has(need)) return [seen.get(need), i];
  seen.set(arr[i], i);
}
```

### Prefix Sum + Hash Map Template
```javascript
const prefixCount = new Map([[0, 1]]);
let sum = 0, count = 0;
for (const num of arr) {
  sum += num;
  count += prefixCount.get(sum - k) || 0;
  prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
}
```

### Grouping Template
```javascript
const groups = new Map();
for (const item of arr) {
  const key = computeKey(item);
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(item);
}
```

---

## 13. Key Takeaways

1. **Hash maps give O(1) average lookup** — the fundamental superpower
2. **Frequency counter** is the most common pattern — count, compare, query
3. **Complement lookup** converts O(n²) pair-finding to O(n)
4. **Prefix sum + hash map** is the key to subarray-sum problems
5. **Grouping** by canonical key handles anagrams, patterns, and equivalences
6. **Two-map bijection** solves isomorphism and pattern-matching problems
7. **Always seed prefix maps with `{0: 1}`** — most common bug in these problems
8. **Prefer `Map` over `{}`** when you need non-string keys or guaranteed order
