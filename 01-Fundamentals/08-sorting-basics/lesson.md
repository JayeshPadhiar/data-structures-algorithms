# Sorting Basics Review

**Topic 01.08 | Phase 01**  
**Estimated Time:** 4-5 hours  
**Difficulty:** Easy-Medium

---

## 1. Overview

### What You'll Learn

- Understand why sorting matters and how it unlocks simpler solutions to harder problems
- Master the three elementary sorts: Bubble Sort, Selection Sort, Insertion Sort
- Analyze each algorithm's time/space complexity and stability
- Know when each elementary sort is actually the right choice
- Use JavaScript's built-in `Array.prototype.sort()` correctly (and avoid its traps)
- Recognize the "sort first, then solve" pattern that simplifies dozens of interview problems

### Why This Matters

Sorting is the most fundamental algorithmic building block. A huge number of interview problems become trivial once the input is sorted:

- **Two Sum on sorted array** → two pointers in O(n) instead of hash map
- **Find duplicates** → adjacent elements after sorting
- **Kth largest** → sort and index
- **Merge intervals** → sort by start, then one pass
- **Meeting rooms** → sort by time, check overlaps

Understanding elementary sorts builds intuition for how data moves through algorithms. Even though you'll rarely implement Bubble Sort in production, knowing *why* it's slow (and when Insertion Sort is fast) is essential for choosing the right tool.

---

## 2. Prerequisites

**Prerequisites:** Complexity Analysis (1.1), Arrays (1.2), Two Pointers (1.4)

- Big-O analysis for nested loops
- Array traversal and in-place swapping
- Understanding of stable vs unstable operations

---

## 3. Theory & Concepts

### Sorting Terminology


| Term                 | Meaning                                            |
| -------------------- | -------------------------------------------------- |
| **In-place**         | Uses O(1) extra memory (swaps within the array)    |
| **Stable**           | Equal elements keep their original relative order  |
| **Comparison-based** | Decides order by comparing pairs of elements       |
| **Adaptive**         | Runs faster when input is already partially sorted |


### Why Stability Matters

```
Input:  [{name: "Alice", age: 25}, {name: "Bob", age: 25}, {name: "Carol", age: 22}]

Stable sort by age:
  Carol(22), Alice(25), Bob(25)    ← Alice still before Bob ✓

Unstable sort by age:
  Carol(22), Bob(25), Alice(25)    ← order of equal elements not guaranteed
```

Stability matters when you sort by multiple keys (e.g., sort by age, then by name within same age).

---

### Bubble Sort

**Idea:** Repeatedly walk through the array, swapping adjacent elements that are out of order. After each pass, the largest unsorted element "bubbles" to its correct position.

```
Pass 1: [5, 3, 8, 1, 2] → [3, 5, 1, 2, 8]   ← 8 bubbled to end
Pass 2: [3, 5, 1, 2, 8] → [3, 1, 2, 5, 8]   ← 5 bubbled
Pass 3: [3, 1, 2, 5, 8] → [1, 2, 3, 5, 8]   ← 3 bubbled
Pass 4: [1, 2, 3, 5, 8] → [1, 2, 3, 5, 8]   ← no swaps, done early!
```

**Properties:** In-place, Stable, Adaptive (with early termination)

---

### Selection Sort

**Idea:** Find the minimum element in the unsorted portion, swap it into the next sorted position. Repeat.

```
[5, 3, 8, 1, 2]
 Find min(0..4)=1 at idx 3, swap with idx 0 → [1, 3, 8, 5, 2]
 Find min(1..4)=2 at idx 4, swap with idx 1 → [1, 2, 8, 5, 3]
 Find min(2..4)=3 at idx 4, swap with idx 2 → [1, 2, 3, 5, 8]
 Find min(3..4)=5 at idx 3, already there    → [1, 2, 3, 5, 8]
```

**Properties:** In-place, **Not stable** (the swap can jump equal elements), Not adaptive

Why unstable? Consider `[3a, 3b, 1]`. Selection sort finds min=1 at index 2, swaps with index 0: `[1, 3b, 3a]`. Now 3b comes before 3a — original order broken.

---

### Insertion Sort

**Idea:** Build the sorted portion one element at a time. Take the next unsorted element and insert it into its correct position among the already-sorted elements.

```
[5, 3, 8, 1, 2]
 sorted: [5]         insert 3 → shift 5 right → [3, 5]
 sorted: [3, 5]      insert 8 → already in place → [3, 5, 8]
 sorted: [3, 5, 8]   insert 1 → shift all right → [1, 3, 5, 8]
 sorted: [1, 3, 5, 8] insert 2 → shift 3,5,8 right → [1, 2, 3, 5, 8]
```

**Properties:** In-place, Stable, Adaptive (nearly sorted input → nearly O(n))

**This is the most important elementary sort.** It's used as the base case in Timsort (Python, Java, JavaScript engines) for small subarrays because its constant factors are tiny and it's adaptive.

---

### Comparison Summary


| Algorithm      | Best     | Average | Worst | Space | Stable | Adaptive |
| -------------- | -------- | ------- | ----- | ----- | ------ | -------- |
| Bubble Sort    | O(n)     | O(n²)   | O(n²) | O(1)  | Yes    | Yes      |
| Selection Sort | O(n²)    | O(n²)   | O(n²) | O(1)  | No     | No       |
| Insertion Sort | **O(n)** | O(n²)   | O(n²) | O(1)  | Yes    | **Yes**  |


**When to use each:**

- **Bubble Sort:** Almost never. Educational only. Insertion Sort is strictly better.
- **Selection Sort:** When the number of *swaps* must be minimized (each element moves at most once). Useful for memory-write-expensive scenarios.
- **Insertion Sort:** Small arrays (n < 20-50), nearly sorted data, online sorting (elements arrive one at a time).

---

### JavaScript's Built-in Sort

```javascript
const nums = [10, 9, 1, 5, 20];
nums.sort(); // [1, 10, 20, 5, 9] — WRONG! Lexicographic by default

nums.sort((a, b) => a - b); // [1, 5, 9, 10, 20] — correct numeric sort
nums.sort((a, b) => b - a); // [20, 10, 9, 5, 1] — descending
```

**The comparator function `(a, b)`:**

- Return negative → a comes first
- Return 0 → keep original order (stable in modern engines)
- Return positive → b comes first

**Under the hood:** V8 (Chrome/Node) uses **Timsort** — a hybrid of Merge Sort and Insertion Sort. It's O(n log n) worst case, stable, and adaptive.

#### Sorting Objects

```javascript
const people = [
  { name: "Carol", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 25 },
];

people.sort((a, b) => a.age - b.age);
// Alice(25), Bob(25), Carol(30) — stable: Alice stays before Bob

people.sort((a, b) => a.name.localeCompare(b.name));
// Alice, Bob, Carol — alphabetical
```

#### Sorting Strings by Length, Then Alphabetically

```javascript
words.sort((a, b) => a.length - b.length || a.localeCompare(b));
```

The `||` trick: if lengths are equal (returns 0, which is falsy), fall through to alphabetical comparison.

---

## 4. Visual Diagrams

### Bubble Sort Visualization

```
Array: [5, 3, 8, 1, 2]

Pass 1 (compare adjacent, swap if needed):
  [5, 3, 8, 1, 2]  5>3? swap → [3, 5, 8, 1, 2]
  [3, 5, 8, 1, 2]  5>8? no
  [3, 5, 8, 1, 2]  8>1? swap → [3, 5, 1, 8, 2]
  [3, 5, 1, 8, 2]  8>2? swap → [3, 5, 1, 2, 8]
                                              ↑ sorted

Pass 2:
  [3, 5, 1, 2, 8]  3>5? no
  [3, 5, 1, 2, 8]  5>1? swap → [3, 1, 5, 2, 8]
  [3, 1, 5, 2, 8]  5>2? swap → [3, 1, 2, 5, 8]
                                        ↑↑ sorted

Pass 3:
  [3, 1, 2, 5, 8]  3>1? swap → [1, 3, 2, 5, 8]
  [1, 3, 2, 5, 8]  3>2? swap → [1, 2, 3, 5, 8]
                                     ↑↑↑ sorted

Pass 4:
  [1, 2, 3, 5, 8]  1>2? no, 2>3? no → no swaps → DONE!
```

---

### Insertion Sort Visualization

```
Array: [5, 3, 8, 1, 2]

Step 1: key=3, sorted=[5]
  3 < 5 → shift 5 right
  [_, 5, 8, 1, 2] → insert 3 → [3, 5, 8, 1, 2]
   ↑sorted↑

Step 2: key=8, sorted=[3, 5]
  8 > 5 → already in place
  [3, 5, 8, 1, 2]
   ↑ sorted ↑

Step 3: key=1, sorted=[3, 5, 8]
  1 < 8 → shift 8
  1 < 5 → shift 5
  1 < 3 → shift 3
  [_, 3, 5, 8, 2] → insert 1 → [1, 3, 5, 8, 2]
   ↑  sorted   ↑

Step 4: key=2, sorted=[1, 3, 5, 8]
  2 < 8 → shift 8
  2 < 5 → shift 5
  2 < 3 → shift 3
  2 > 1 → stop
  [1, _, 3, 5, 8] → insert 2 → [1, 2, 3, 5, 8]
   ↑   sorted    ↑

Done! [1, 2, 3, 5, 8]
```

---

### Selection Sort Visualization

```
Array: [5, 3, 8, 1, 2]

Round 1: scan [5,3,8,1,2] → min=1 at index 3
  swap arr[0] ↔ arr[3] → [1, 3, 8, 5, 2]
                           ↑ placed

Round 2: scan [3,8,5,2] → min=2 at index 4
  swap arr[1] ↔ arr[4] → [1, 2, 8, 5, 3]
                           ↑↑ placed

Round 3: scan [8,5,3] → min=3 at index 4
  swap arr[2] ↔ arr[4] → [1, 2, 3, 5, 8]
                           ↑↑↑ placed

Round 4: scan [5,8] → min=5 at index 3
  already in place → [1, 2, 3, 5, 8]
                       ↑↑↑↑ placed

Done! [1, 2, 3, 5, 8]
```

---

### Stability Illustration

```
Input: [(A,2), (B,1), (C,2), (D,1)]   — sort by number

Stable sort result:
  [(B,1), (D,1), (A,2), (C,2)]
   B before D ✓ (original order preserved for equal keys)
   A before C ✓

Unstable sort might produce:
  [(D,1), (B,1), (C,2), (A,2)]   — equal elements reordered
```

---

## 5. JavaScript Implementations

### Bubble Sort

```javascript
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // early termination — adaptive!
  }
  return arr;
}
```

---

### Selection Sort

```javascript
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}
```

---

### Insertion Sort

```javascript
function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
```

---

### Using Built-in Sort Correctly

```javascript
function sortNumbers(arr) {
  return [...arr].sort((a, b) => a - b);
}

function sortByMultipleKeys(people) {
  return [...people].sort((a, b) =>
    a.age - b.age || a.name.localeCompare(b.name)
  );
}

function sortDescending(arr) {
  return [...arr].sort((a, b) => b - a);
}
```

---

### Custom Comparator Patterns

```javascript
// Sort by absolute value
arr.sort((a, b) => Math.abs(a) - Math.abs(b));

// Sort by frequency (most frequent first)
function sortByFrequency(arr) {
  const freq = new Map();
  for (const x of arr) freq.set(x, (freq.get(x) || 0) + 1);
  return [...arr].sort((a, b) => freq.get(b) - freq.get(a) || a - b);
}

// Sort strings by length, then alphabetically
words.sort((a, b) => a.length - b.length || a.localeCompare(b));
```

---

## 6. Step-by-Step Walkthrough: Merge Intervals

**Problem:** Given an array of intervals `[start, end]`, merge all overlapping intervals.

**Key insight:** Sort by start time first, then merge in one pass.

```javascript
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const curr = intervals[i];

    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }

  return merged;
}
```

**Trace through `[[1,3], [8,10], [2,6], [15,18]]`:**

```
Step 1: Sort by start → [[1,3], [2,6], [8,10], [15,18]]

Step 2: merged = [[1,3]]

Step 3: curr=[2,6], last=[1,3]
  2 <= 3? Yes → overlap! → merge → last becomes [1, max(3,6)] = [1,6]
  merged = [[1,6]]

Step 4: curr=[8,10], last=[1,6]
  8 <= 6? No → no overlap → push
  merged = [[1,6], [8,10]]

Step 5: curr=[15,18], last=[8,10]
  15 <= 10? No → no overlap → push
  merged = [[1,6], [8,10], [15,18]]

Answer: [[1,6], [8,10], [15,18]]
```

Without sorting first, you'd need O(n²) pairwise comparisons. Sorting reduces it to O(n log n).

---

## 7. Complexity Analysis

### Elementary Sorts


| Algorithm              | Best  | Average    | Worst      | Space | Stable |
| ---------------------- | ----- | ---------- | ---------- | ----- | ------ |
| Bubble Sort            | O(n)  | O(n²)      | O(n²)      | O(1)  | Yes    |
| Selection Sort         | O(n²) | O(n²)      | O(n²)      | O(1)  | No     |
| Insertion Sort         | O(n)  | O(n²)      | O(n²)      | O(1)  | Yes    |
| JS `.sort()` (Timsort) | O(n)  | O(n log n) | O(n log n) | O(n)  | Yes    |


### "Sort First" Pattern Complexity

```
Sort the array:           O(n log n)
Process sorted array:   + O(n) or O(n log n)
Total:                    O(n log n)

This is almost always better than brute force O(n²).
```

### When O(n²) Sorts Beat O(n log n)

- **n < ~50:** Insertion sort's tiny constant factor wins over merge/quick sort overhead
- **Nearly sorted data:** Insertion sort is O(n) — Timsort exploits this too
- **Memory constrained:** All elementary sorts are O(1) space; merge sort needs O(n)

---

## 8. Common Patterns

### Pattern 1: Sort + Two Pointers

Sort the array, then use two pointers to find pairs/triplets.

```javascript
// Two Sum on sorted array
function twoSumSorted(nums, target) {
  nums.sort((a, b) => a - b);
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const sum = nums[lo] + nums[hi];
    if (sum === target) return [lo, hi];
    if (sum < target) lo++;
    else hi--;
  }
  return [];
}
```

### Pattern 2: Sort + Linear Scan for Duplicates/Gaps

```javascript
// Find duplicates — adjacent after sorting
function findDuplicates(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) result.push(nums[i]);
  }
  return result;
}
```

### Pattern 3: Sort + Greedy (Intervals)

```javascript
// Can attend all meetings?
function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
  }
  return true;
}
```

### Pattern 4: Sort + Binary Search

```javascript
// Find insertion position in sorted array
function searchInsert(nums, target) {
  let lo = 0, hi = nums.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
```

### Pattern 5: Custom Comparator Sort

```javascript
// Largest number from array of integers
function largestNumber(nums) {
  const strs = nums.map(String);
  strs.sort((a, b) => (b + a).localeCompare(a + b));
  const result = strs.join('');
  return result[0] === '0' ? '0' : result;
}
```

---

## 9. Practice Problems

### Easy Problems (Start Here!)

1. **Sort Array By Parity** - LeetCode #905
  - Difficulty: Easy
  - Pattern: Custom partition / two-pass sort
  - Concepts: Rearrange array so evens come before odds
  - Time to solve: 10-15 min
2. **Sort an Array** - LeetCode #912
  - Difficulty: Medium (but Easy for this lesson — implement elementary sorts)
  - Pattern: Implement sorting from scratch
  - Concepts: Practice Bubble/Selection/Insertion Sort implementations
  - Time to solve: 15-20 min
3. **Height Checker** - LeetCode #1051
  - Difficulty: Easy
  - Pattern: Sort + compare with original
  - Concepts: Sort a copy, count positions that differ from original
  - Time to solve: 10-15 min
4. **Relative Sort Array** - LeetCode #1122
  - Difficulty: Easy
  - Pattern: Custom comparator with ordering map
  - Concepts: Sort by a given ordering, remaining elements sorted ascending
  - Time to solve: 15-20 min
5. **Can Make Arithmetic Progression From Sequence** - LeetCode #1502
  - Difficulty: Easy
  - Pattern: Sort + linear scan
  - Concepts: Sort, check constant difference between consecutive elements
  - Time to solve: 10-15 min
6. **Minimum Difference Between Highest and Lowest of K Scores** - LeetCode #1984
  - Difficulty: Easy
  - Pattern: Sort + sliding window
  - Concepts: Sort, then slide a window of size k to find minimum range
  - Time to solve: 10-15 min
7. **Maximum Product of Two Elements in an Array** - LeetCode #1464
  - Difficulty: Easy
  - Pattern: Sort to find extremes
  - Concepts: Sort to identify two largest elements
  - Time to solve: 5-10 min

### Medium Problems (Core Practice)

1. **Merge Intervals** - LeetCode #56
  - Difficulty: Medium
  - Pattern: Sort + greedy merge
  - Concepts: Sort by start, merge overlapping intervals in one pass
  - Time to solve: 20-25 min
2. **Largest Number** - LeetCode #179
  - Difficulty: Medium
  - Pattern: Custom string comparator
  - Concepts: Compare concatenations to determine order
  - Time to solve: 20-25 min
3. **Sort the People** - LeetCode #2418
  - Difficulty: Easy-Medium
    - Pattern: Parallel array sort / index sort
    - Concepts: Sort people by height descending using index mapping
    - Time to solve: 15-20 min
4. **Wiggle Sort II** - LeetCode #324
  - Difficulty: Medium
    - Pattern: Sort + interleave
    - Concepts: Sort, then place elements in alternating positions
    - Time to solve: 25-35 min
5. **Meeting Rooms II** - LeetCode #253
  - Difficulty: Medium
    - Pattern: Sort + sweep line / min-heap
    - Concepts: Sort intervals, track concurrent meetings
    - Time to solve: 25-30 min
6. **H-Index** - LeetCode #274
  - Difficulty: Medium
    - Pattern: Sort descending + scan
    - Concepts: Sort citations, find h where h papers have >= h citations
    - Time to solve: 20-25 min
7. **Reorder Data in Log Files** - LeetCode #937
  - Difficulty: Medium
    - Pattern: Multi-key custom comparator
    - Concepts: Partition letter/digit logs, sort letter logs by content then identifier
    - Time to solve: 20-25 min
8. **Non-overlapping Intervals** - LeetCode #435
  - Difficulty: Medium
    - Pattern: Sort by end + greedy
    - Concepts: Sort intervals by end time, greedily keep non-overlapping
    - Time to solve: 20-25 min

### Hard Problems (Challenge Yourself)

1. **Minimum Number of Arrows to Burst Balloons** - LeetCode #452
  - Difficulty: Medium
    - Pattern: Sort by end + greedy (interval scheduling)
    - Concepts: Sort balloons by end, greedily shoot arrows at overlap points
    - Time to solve: 25-30 min
2. **Queue Reconstruction by Height** - LeetCode #406
  - Difficulty: Medium-Hard
    - Pattern: Sort by two keys + insertion
    - Concepts: Sort descending by height, then insert at k-index
    - Time to solve: 25-35 min
3. **Maximum Gap** - LeetCode #164
  - Difficulty: Medium-Hard
    - Pattern: Bucket sort / pigeonhole principle
    - Concepts: Use bucket sort idea to find max gap in O(n) time
    - Time to solve: 35-45 min

### Topic Coverage Matrix

**Every concept has dedicated problems:**


| Concept                                           | Problems Covering It      |
| ------------------------------------------------- | ------------------------- |
| **Bubble/Selection/Insertion Sort understanding** | #912, #1051               |
| **Built-in sort with numeric comparator**         | #905, #1502, #1984, #1464 |
| **Custom comparator**                             | #1122, #179, #937         |
| **Sort + linear scan**                            | #1051, #1502, #274        |
| **Sort + greedy (intervals)**                     | #56, #253, #435, #452     |
| **Parallel array / index sort**                   | #2418                     |
| **Sort + interleave/rearrange**                   | #324, #406                |
| **Multi-key sorting**                             | #937, #406                |
| **Non-comparison sort concepts**                  | #164                      |
| **Sort + sliding window**                         | #1984                     |
| **String concatenation comparator**               | #179                      |


**Total: 18 problems**

### Practice Plan

**Day 1:** Problems 1-4 (Easy — parity, squares, height check, relative sort)  
**Day 2:** Problems 5-7 (Easy — arithmetic progression, min diff, max product)  
**Day 3:** Problems 8-11 (Medium — merge intervals, largest number, frequency sort, wiggle)  
**Day 4:** Problems 12-15 (Medium — meeting rooms, h-index, log files, non-overlapping)  
**Day 5:** Problems 16-18 (Hard — arrows, queue reconstruction, maximum gap)

---

## 10. Common Pitfalls

### 1. Forgetting the Comparator for Numeric Sort

```javascript
// ❌ Lexicographic — sorts as strings!
[10, 9, 1, 5, 20].sort();  // [1, 10, 20, 5, 9]

// ✅ Numeric
[10, 9, 1, 5, 20].sort((a, b) => a - b);  // [1, 5, 9, 10, 20]
```

This is the #1 JavaScript sorting bug. The default `.sort()` converts elements to strings.

---

### 2. Mutating the Original Array

```javascript
// ❌ .sort() modifies in place
const original = [3, 1, 2];
const sorted = original.sort((a, b) => a - b);
console.log(original); // [1, 2, 3] — mutated!

// ✅ Copy first
const sorted = [...original].sort((a, b) => a - b);
// or: const sorted = original.slice().sort((a, b) => a - b);
```

---

### 3. Comparator Returning Boolean Instead of Number

```javascript
// ❌ Returns true/false — inconsistent behavior
arr.sort((a, b) => a > b);

// ✅ Returns negative/zero/positive
arr.sort((a, b) => a - b);
```

---

### 4. Integer Overflow in Comparator

```javascript
// ❌ Can overflow for very large numbers
arr.sort((a, b) => a - b); // if a and b are near Number.MAX_SAFE_INTEGER

// ✅ Safe for extreme values
arr.sort((a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
});
```

For typical interview problems, `a - b` is fine. But know this edge case exists.

---

### 5. Assuming Sort is O(n)

Sorting is O(n log n). If a problem requires O(n), sorting alone won't get you there — you need a hash-based or counting approach instead.

---

## 11. Interview Tips

### When to Reach for Sorting

- **"Find pairs/triplets with some property"** → sort + two pointers
- **"Merge/overlap intervals"** → sort by start
- **"Kth largest/smallest"** → sort (or heap for better complexity)
- **"Rearrange array in some order"** → custom comparator
- **"Check if two arrays have same elements"** → sort both, compare

### Communicating Sort Decisions

In interviews, always state:

1. **Why you're sorting** — "Sorting lets me find overlaps in a single pass"
2. **The complexity impact** — "This adds O(n log n) but eliminates the O(n²) brute force"
3. **Whether you need stability** — "I need stable sort here because equal elements must maintain order"

### Built-in Sort is Almost Always Fine

Don't implement your own sort in interviews unless specifically asked. Say: "I'll use the built-in sort which is O(n log n) Timsort" and move on to the interesting part of the problem.

### Watch for "Can You Do Better Than O(n log n)?"

If the interviewer asks this after you sort, they want:

- **Counting sort** — if values are in a small range
- **Bucket sort** — if values are uniformly distributed
- **Radix sort** — if sorting integers/strings of fixed length
- **Hash map** — if you don't actually need full ordering

---

## 12. Connections to Other Topics

### Builds On:

- **Complexity Analysis (1.1):** Analyzing nested loops in elementary sorts
- **Arrays (1.2):** In-place swapping, array traversal
- **Two Pointers (1.4):** Sort + two pointers is a major pattern
- **Hashing (1.6):** Hash-based alternatives when sorting is too slow
- **Sets (1.7):** Set-based dedup vs sort-based dedup

### Leads To:

- **Linked Lists (2.1):** Merge sort on linked lists
- **Stacks (2.2):** Monotonic stack as a "partial sort"
- **Heaps (3.8):** Heap sort, partial sorting, Kth element
- **QuickSort & MergeSort (6.2, 6.3):** The O(n log n) algorithms in depth
- **Binary Search (6.6):** Requires sorted input — sorting is the prerequisite
- **Greedy (Phase 9):** Many greedy algorithms sort first

---

## 13. Key Takeaways

1. **Insertion Sort is the only elementary sort worth remembering** — it's adaptive, stable, and used inside Timsort for small subarrays
2. **Always use a comparator** with JavaScript's `.sort()` — the default is lexicographic, not numeric
3. **"Sort first, then solve"** is one of the most powerful interview patterns — it turns O(n²) problems into O(n log n)
4. **Know the tradeoffs:** O(n²) sorts use O(1) space; O(n log n) sorts typically need O(n) space
5. **Stability matters** when sorting by multiple keys or when relative order of equal elements is meaningful
6. **Don't implement sort in interviews** unless asked — use the built-in and focus on the actual problem
7. **Custom comparators** unlock a huge class of problems — master the `(a, b) => ...` pattern
8. **Sorting is a preprocessing step**, not the solution itself — the real algorithm comes after the sort

