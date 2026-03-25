# Sets & Hash Sets

**Topic 01.07 | Phase 01**  
**Estimated Time:** 3-4 hours  
**Difficulty:** Easy

---

## 1. Overview

### What You'll Learn

- Understand sets as a data structure — unordered collections of unique elements
- Master JavaScript's `Set` for O(1) add, delete, and lookup
- Distinguish when to use a Set vs a Map vs an Array
- Apply sets for deduplication, membership testing, and set operations
- Implement union, intersection, difference, and symmetric difference
- Solve problems using set-based thinking to avoid nested loops

### Why This Matters

Sets are a simplified hash map (keys only, no values). They appear everywhere:

- **Deduplication:** Remove duplicates from any collection in O(n)
- **Membership testing:** "Have I seen this before?" in O(1)
- **Set operations:** Union, intersection, difference — foundational for databases, search, and filtering
- **Constraint tracking:** Track what's allowed/forbidden in O(1) per check

If hash maps are the Swiss army knife of DSA, sets are the scalpel — simpler, faster for specific tasks.

---

## 2. Prerequisites

**Prerequisites:** Complexity Analysis (1.1), Arrays (1.2), Strings (1.3), Hashing & Hash Maps (1.6)

- Understanding of hash-based O(1) lookups (from 1.6)
- Array traversal and string operations
- Basic understanding of time/space tradeoffs

---

## 3. Theory & Concepts

### What Is a Set?

A **set** is an unordered collection of **unique** elements. No duplicates allowed.

```
Set A = {1, 3, 5, 7}
Set B = {3, 5, 8, 10}

A contains 3? → true  (O(1) lookup)
A contains 4? → false (O(1) lookup)
```

### JavaScript's Set

```javascript
const set = new Set();

set.add(1);          // {1}
set.add(2);          // {1, 2}
set.add(1);          // {1, 2} — duplicate ignored
set.has(1);          // true — O(1)
set.delete(2);       // {1}
set.size;            // 1
set.clear();         // {}

// Create from array
const fromArr = new Set([1, 2, 2, 3]); // {1, 2, 3}

// Convert back to array
const arr = [...fromArr]; // [1, 2, 3]
```

### Time Complexity

| Operation | Set | Array |
|-----------|-----|-------|
| Add | O(1) | O(1) amortized (push) |
| Delete | O(1) | O(n) (find + shift) |
| Lookup (has/includes) | **O(1)** | **O(n)** |
| Iterate | O(n) | O(n) |

The key advantage: **O(1) lookup** vs array's O(n) `includes()`.

---

### Set Operations

#### Union (A ∪ B) — all elements from both

```javascript
function union(setA, setB) {
  return new Set([...setA, ...setB]);
}
// {1,2,3} ∪ {2,3,4} = {1,2,3,4}
```

#### Intersection (A ∩ B) — elements in both

```javascript
function intersection(setA, setB) {
  return new Set([...setA].filter(x => setB.has(x)));
}
// {1,2,3} ∩ {2,3,4} = {2,3}
```

#### Difference (A \ B) — elements in A but not B

```javascript
function difference(setA, setB) {
  return new Set([...setA].filter(x => !setB.has(x)));
}
// {1,2,3} \ {2,3,4} = {1}
```

#### Symmetric Difference (A △ B) — elements in one but not both

```javascript
function symmetricDifference(setA, setB) {
  const diff = new Set(setA);
  for (const elem of setB) {
    if (diff.has(elem)) diff.delete(elem);
    else diff.add(elem);
  }
  return diff;
}
// {1,2,3} △ {2,3,4} = {1,4}
```

#### Subset Check (A ⊆ B)

```javascript
function isSubset(setA, setB) {
  for (const elem of setA) {
    if (!setB.has(elem)) return false;
  }
  return true;
}
```

---

### When to Use Set vs Map vs Array

| Need | Use |
|------|-----|
| Store unique values, check membership | **Set** |
| Store key-value pairs, count frequencies | **Map** |
| Store ordered, possibly duplicate items | **Array** |
| Deduplicate an array | `new Set(arr)` |
| Check if element exists (large data) | **Set** (O(1) vs O(n)) |
| Track seen/visited elements | **Set** |

---

### Common Patterns

#### Pattern 1: Deduplication
```javascript
const unique = [...new Set(arr)];
```

#### Pattern 2: Membership Check in Loop
```javascript
const forbidden = new Set(blacklist);
const filtered = arr.filter(x => !forbidden.has(x));
```

#### Pattern 3: Find Common / Missing Elements
```javascript
const setA = new Set(arrA);
const common = arrB.filter(x => setA.has(x));
const missing = arrB.filter(x => !setA.has(x));
```

#### Pattern 4: Track Visited State
```javascript
const visited = new Set();
for (const item of items) {
  if (visited.has(item)) continue; // skip duplicates
  visited.add(item);
  process(item);
}
```

#### Pattern 5: Existence as Termination
```javascript
// Detect cycle or repeated state
const seen = new Set();
while (true) {
  if (seen.has(state)) break; // found cycle
  seen.add(state);
  state = nextState(state);
}
```

---

## 4. Visual Diagrams

### Set Operations

```
Set A = {1, 2, 3, 4, 5}
Set B = {3, 4, 5, 6, 7}

Union (A ∪ B):
  {1, 2, 3, 4, 5, 6, 7}
  [A only] [overlap] [B only]

Intersection (A ∩ B):
  {3, 4, 5}
       [overlap]

Difference (A \ B):
  {1, 2}
  [A only]

Symmetric Difference (A △ B):
  {1, 2, 6, 7}
  [A only]        [B only]

Venn Diagram:
  ┌─────────┐     ┌─────────┐
  │ 1  2    │     │    6  7 │
  │      ┌──┼─────┼──┐      │
  │      │3 │  4  │5 │      │
  │      └──┼─────┼──┘      │
  │   A     │     │    B    │
  └─────────┘     └─────────┘
```

---

### Deduplication Flow

```
Input:  [4, 2, 7, 2, 4, 8, 7, 1]

Step 1: new Set()
  add 4 → {4}
  add 2 → {4, 2}
  add 7 → {4, 2, 7}
  add 2 → {4, 2, 7}       ← duplicate, ignored
  add 4 → {4, 2, 7}       ← duplicate, ignored
  add 8 → {4, 2, 7, 8}
  add 7 → {4, 2, 7, 8}    ← duplicate, ignored
  add 1 → {4, 2, 7, 8, 1}

Step 2: [...set] → [4, 2, 7, 8, 1]  (insertion order preserved)
```

---

### Longest Consecutive Sequence with Set

```
Input: [100, 4, 200, 1, 3, 2]

Set = {100, 4, 200, 1, 3, 2}

For each element, check if it's the START of a sequence:
  100: has 99? No → start! → 100, 101? No → length 1
  4:   has 3?  Yes → skip (not a start)
  200: has 199? No → start! → 200, 201? No → length 1
  1:   has 0?  No → start! → 1, 2? Yes → 2, 3? Yes → 3, 4? Yes → 4, 5? No → length 4
  3:   has 2?  Yes → skip
  2:   has 1?  Yes → skip

Answer: 4 (sequence 1→2→3→4)
```

---

## 5. JavaScript Implementations

### Implementation 1: Remove Duplicates Preserving Order

```javascript
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// removeDuplicates([3, 1, 4, 1, 5, 9, 2, 6, 5]) → [3, 1, 4, 5, 9, 2, 6]
```

---

### Implementation 2: Array Intersection

```javascript
function arrayIntersection(arr1, arr2) {
  const set1 = new Set(arr1);
  return [...new Set(arr2.filter(x => set1.has(x)))];
}

// arrayIntersection([1,2,2,1], [2,2]) → [2]
```

---

### Implementation 3: Longest Consecutive Sequence

```javascript
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let maxLen = 0;

  for (const num of numSet) {
    if (numSet.has(num - 1)) continue; // only start from sequence beginnings

    let current = num;
    let length = 1;
    while (numSet.has(current + 1)) {
      current++;
      length++;
    }
    maxLen = Math.max(maxLen, length);
  }

  return maxLen;
}

// longestConsecutive([100, 4, 200, 1, 3, 2]) → 4
```

---

### Implementation 4: Single Number (XOR Alternative Using Set)

```javascript
function singleNumber(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) seen.delete(num);
    else seen.add(num);
  }
  return [...seen][0];
}

// singleNumber([4, 1, 2, 1, 2]) → 4
```

---

### Implementation 5: Set-Based Sudoku Validator

```javascript
function isValidSudoku(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === '.') continue;

      const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      if (rows[r].has(val) || cols[c].has(val) || boxes[boxIdx].has(val)) {
        return false;
      }

      rows[r].add(val);
      cols[c].add(val);
      boxes[boxIdx].add(val);
    }
  }
  return true;
}
```

---

## 6. Step-by-Step Walkthrough: Contains Duplicate

**Problem:** Given an integer array `nums`, return `true` if any value appears at least twice.

**Brute force:** Compare every pair → O(n²)  
**With Set:** Add each element, check if already present → O(n)

```javascript
function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}
```

**Trace through `nums = [1, 2, 3, 1]`:**

```
Step 1: num=1, seen={}        → has(1)? No  → add → seen={1}
Step 2: num=2, seen={1}       → has(2)? No  → add → seen={1,2}
Step 3: num=3, seen={1,2}     → has(3)? No  → add → seen={1,2,3}
Step 4: num=1, seen={1,2,3}   → has(1)? YES → return true

Answer: true
```

**Even simpler one-liner:**
```javascript
const containsDuplicate = nums => new Set(nums).size !== nums.length;
```

---

## 7. Common Patterns Summary

### Pattern 1: Deduplication
```
Use: Remove duplicates, count unique elements
Template: new Set(arr), check .size
Time: O(n)
```

### Pattern 2: Fast Membership Test
```
Use: Check existence, filter by whitelist/blacklist
Template: Build set → use .has() in loop
Time: O(n) build + O(1) per check
```

### Pattern 3: Set Algebra (Union/Intersection/Difference)
```
Use: Common elements, missing elements, symmetric diff
Template: Convert to sets → apply operation → convert back
Time: O(n + m)
```

### Pattern 4: Sequence/Path Tracking
```
Use: Detect cycles, track visited nodes, find chains
Template: Set as visited tracker, check before processing
Time: O(n) amortized
```

### Pattern 5: Constraint Validation
```
Use: Sudoku, unique rows/cols, no-repeat conditions
Template: Multiple sets tracking constraints simultaneously
Time: O(n) per constraint check
```

---

## 8. Complexity Analysis

### Set vs Alternative Approaches

```
Find duplicates:
  Array scan:         O(n²)  — check every pair
  Sort + adjacent:    O(n log n) — sort first, compare neighbors
  Hash Set:           O(n) time, O(n) space ← fastest

Check membership in loop:
  Array.includes():   O(n) per check → O(n × m) total
  Set.has():          O(1) per check → O(n + m) total

Intersection of two arrays:
  Nested loops:       O(n × m)
  Sort + two pointer: O(n log n + m log m)
  Set:                O(n + m) ← fastest
```

### Space Considerations

Sets use O(n) extra space. If memory is extremely tight and the data is sortable, sort-based approaches use O(1) extra space (or O(log n) for the sort).

---

## 9. Practice Problems

### Easy Problems (Start Here!)

1. **Contains Duplicate III** - LeetCode #220
   - Difficulty: Hard
   - Pattern: Set-based range check (bucket sort / ordered set idea)
   - Concepts: Value proximity + index proximity, bucket sets
   - Time to solve: 35-45 min

2. **Intersection of Two Arrays** - LeetCode #349
   - Difficulty: Easy
   - Pattern: Set intersection
   - Concepts: Two sets, filter common elements
   - Time to solve: 15-20 min

3. **Missing Number** - LeetCode #268
   - Difficulty: Easy
   - Pattern: Set difference / membership
   - Concepts: Build set of present numbers, find the gap
   - Time to solve: 15-20 min

4. **Destination City** - LeetCode #1436
   - Difficulty: Easy
   - Pattern: Set difference
   - Concepts: Build set of sources, find city not in sources
   - Time to solve: 10-15 min

5. **Jewels and Stones** - LeetCode #771
   - Difficulty: Easy
   - Pattern: Set membership in loop
   - Concepts: Build jewel set, count matching stones
   - Time to solve: 10-15 min

6. **Unique Number of Occurrences** - LeetCode #1207
   - Difficulty: Easy
   - Pattern: Frequency map + value set
   - Concepts: Count frequencies, check if counts are unique
   - Time to solve: 15-20 min

7. **Unique Email Addresses** - LeetCode #929
   - Difficulty: Easy
   - Pattern: String processing + set deduplication
   - Concepts: Normalize strings, count unique via set
   - Time to solve: 20-25 min

### Medium Problems (Core Practice)

8. **Set Mismatch** - LeetCode #645
   - Difficulty: Easy-Medium
   - Pattern: Set difference
   - Concepts: Find duplicate and missing using set vs expected set
   - Time to solve: 20-25 min

9. **Longest Word in Dictionary** - LeetCode #720
   - Difficulty: Medium
   - Pattern: Set for prefix validation
   - Concepts: Build set of words, check all prefixes exist
   - Time to solve: 25-30 min

10. **Single Number III** - LeetCode #260
    - Difficulty: Medium
    - Pattern: Set toggle (add/remove) for two uniques
    - Concepts: Toggle membership, two elements remain
    - Time to solve: 25-30 min

11. **Unique Morse Code Words** - LeetCode #804
    - Difficulty: Easy-Medium
    - Pattern: Set of transformed keys
    - Concepts: Transform each word, count unique via set
    - Time to solve: 15-20 min

12. **Distribute Candies** - LeetCode #575
    - Difficulty: Easy-Medium
    - Pattern: Set size vs count
    - Concepts: Unique count via set, compare with constraint
    - Time to solve: 10-15 min

13. **Determine if Two Strings Are Close** - LeetCode #1657
    - Difficulty: Medium
    - Pattern: Frequency map + sorted frequency sets
    - Concepts: Same char set + same frequency multiset
    - Time to solve: 25-35 min

14. **Most Common Word** - LeetCode #819
    - Difficulty: Easy-Medium
    - Pattern: Banned set + frequency map
    - Concepts: Set as blacklist, filter while counting
    - Time to solve: 20-25 min

### Hard Problems (Challenge Yourself)

15. **Maximum Erasure Value** - LeetCode #1695
    - Difficulty: Medium
    - Pattern: Set + sliding window
    - Concepts: Set tracks window uniqueness, maximize sum of unique subarray
    - Time to solve: 25-35 min

16. **Number of Distinct Islands** - LeetCode #694
    - Difficulty: Medium-Hard
    - Pattern: Set of serialized shapes
    - Concepts: BFS/DFS island shape, serialize path as set key
    - Time to solve: 35-45 min

17. **Minimum Area Rectangle** - LeetCode #939
    - Difficulty: Medium-Hard
    - Pattern: Set of coordinate pairs
    - Concepts: Store points in set, check diagonal pairs for rectangles
    - Time to solve: 35-45 min

### Topic Coverage Matrix

**Every concept has dedicated problems:**

| Concept | Problems Covering It |
|---------|---------------------|
| **Deduplication** | #929, #804 |
| **Membership Test** | #771, #819 |
| **Set Intersection** | #349 |
| **Set Difference / Missing** | #268, #645, #1436 |
| **Frequency Uniqueness** | #1207, #1657 |
| **Prefix Validation** | #720 |
| **Set + Sliding Window** | #1695 |
| **Set as Toggle** | #260, #575 |
| **Set of Serialized Keys** | #694 |
| **Set of Coordinate Pairs** | #939 |
| **Bucket / Range Set** | #220 |

✅ **All major set patterns covered!**

**Total: 17 problems**

### Practice Plan

**Day 1:** Problems 1-4 (Easy — duplicate, intersection, missing, cycles)  
**Day 2:** Problems 5-7 (Easy — membership, uniqueness, dedup)  
**Day 3:** Problems 8-10 (Medium — mismatch, consecutive, toggle)  
**Day 4:** Problems 11-14 (Medium — Sudoku, distribute, string closeness, banned words)  
**Day 5:** Problems 15-17 (Hard — window tracking, distinct islands, first missing)

---

## 10. Common Pitfalls

### 1. Using Array.includes() Instead of Set.has()

```javascript
// ❌ O(n) per check — O(n²) total in a loop
for (const item of arr) {
  if (otherArr.includes(item)) { }
}

// ✅ O(1) per check — O(n) total
const otherSet = new Set(otherArr);
for (const item of arr) {
  if (otherSet.has(item)) { }
}
```

---

### 2. Forgetting Set Stores References for Objects

```javascript
const set = new Set();
set.add({ a: 1 });
set.has({ a: 1 }); // false! Different reference

// Use primitive keys or serialize objects
set.add(JSON.stringify({ a: 1 }));
set.has(JSON.stringify({ a: 1 })); // true
```

---

### 3. Not Handling the Empty Set

```javascript
// Always check set.size before operations that assume non-empty
const s = new Set();
[...s][0]; // undefined — not an error, but may cause bugs downstream
```

---

### 4. Modifying a Set During Iteration

```javascript
// ❌ Can behave unexpectedly
for (const item of set) {
  set.delete(item); // removing while iterating
}

// ✅ Collect first, then modify
const toRemove = [...set].filter(condition);
toRemove.forEach(item => set.delete(item));
```

---

## 11. Connections to Other Topics

### Builds On:
- **Hash Maps (1.6):** A Set is a Map with keys only — same O(1) internals
- **Arrays (1.2):** Sets often created from arrays, results converted back
- **Strings (1.3):** Character sets, unique character tracking
- **Sliding Window (1.5):** Set tracks window contents for uniqueness

### Leads To:
- **Sorting (1.8):** Some set problems have sort-based alternatives
- **Graph Traversal (Phase 6):** Visited sets are fundamental to BFS/DFS
- **Bit Manipulation (Phase 11):** Bit sets as ultra-compact set representations
- **Union-Find (Phase 7):** Advanced set merging/querying

---

## 12. Quick Reference

### Create & Use
```javascript
const set = new Set();         // empty
const set = new Set(arr);      // from array
const arr = [...set];          // back to array
set.add(x); set.has(x); set.delete(x); set.size; set.clear();
```

### Set Operations
```javascript
const union = new Set([...a, ...b]);
const intersect = new Set([...a].filter(x => b.has(x)));
const diff = new Set([...a].filter(x => !b.has(x)));
```

### One-Liners
```javascript
const hasDuplicates = arr => new Set(arr).size !== arr.length;
const unique = arr => [...new Set(arr)];
const commonElements = (a, b) => { const s = new Set(a); return b.filter(x => s.has(x)); };
```

---

## 13. Key Takeaways

1. **Sets give O(1) lookup** — the core advantage over arrays for membership checks
2. **Deduplication** is trivially `new Set(arr)` — memorize this one-liner
3. **Set operations** (union, intersect, diff) solve comparison problems in O(n+m)
4. **Use Set over Map** when you only need keys, not key-value pairs
5. **Cycle detection** works by tracking visited states in a set
6. **Serialize objects** before adding to sets — reference equality doesn't work for objects
7. **Don't use `Array.includes()` in loops** — build a Set first for O(1) per check
8. **Sets preserve insertion order** in JavaScript — useful for maintaining sequence
