# Arrays Advanced Concepts

**Topic 1.2 | Phase 1: Fundamentals**  
**Estimated Time:** 6-8 hours  
**Difficulty:** Fundamental

---

## 1. Overview

### What You'll Learn

Building on your basic array knowledge, you'll master advanced array techniques including:
- Multi-dimensional arrays and matrix operations
- Prefix sums and range queries
- In-place algorithms and space optimization
- Array rotation and transformation techniques
- Subarray problems and sliding window preparation
- Advanced manipulation patterns

### Why This Matters

Arrays are the most fundamental and commonly used data structure in programming. **Over 30% of LeetCode problems** involve array manipulation. Mastering arrays gives you:

- **Strong foundation** - Many data structures are built on arrays
- **Interview success** - Arrays appear in most technical interviews
- **Problem-solving tools** - Techniques learned here apply to many domains
- **Optimization skills** - Learn to balance time vs space complexity

**Real-World Impact:** Array operations power everything from image processing (2D arrays of pixels) to financial calculations (prefix sums for running totals) to game development (matrix transformations).

---

## 2. Prerequisites

✅ **Complexity analysis** (Topic 1.1 - just completed!)  
✅ **Basic array operations** (access, iterate, modify)  
✅ **Basic JavaScript array methods** (push, pop, slice, etc.)

---

## 3. Theory & Concepts

### Array Fundamentals Review

**What is an array?**
A contiguous block of memory holding elements of the same type, accessible by index in O(1) time.

```
Array: [10, 20, 30, 40, 50]
Index:   0   1   2   3   4

Memory:  [10][20][30][40][50]
Address: 1000 1004 1008 1012 1016
```

**Key Properties:**
- **Random Access:** O(1) to access any element by index
- **Sequential Memory:** Elements stored next to each other
- **Fixed Size:** In many languages (though JavaScript arrays are dynamic)
- **Homogeneous:** Typically same data type (JavaScript is flexible)

### JavaScript Arrays: Special Features

JavaScript arrays are actually objects with special properties:

```javascript
const arr = [1, 2, 3];
// Behind the scenes, similar to:
// { 0: 1, 1: 2, 2: 3, length: 3 }
```

**Important characteristics:**
- Dynamic sizing (grow/shrink automatically)
- Can hold mixed types (though usually not recommended)
- Has both array methods and object properties
- Sparse arrays possible (gaps in indices)

### Multi-Dimensional Arrays (Matrices)

A 2D array is "an array of arrays" - each element is itself an array.

```javascript
const matrix = [
    [1, 2, 3],    // Row 0
    [4, 5, 6],    // Row 1
    [7, 8, 9]     // Row 2
];
//  Col 0,1,2

// Access: matrix[row][col]
console.log(matrix[1][2]);  // 6 (row 1, column 2)
```

**Visualization:**
```
     Col0  Col1  Col2
Row0 [ 1    2    3 ]
Row1 [ 4    5    6 ]
Row2 [ 7    8    9 ]
```

**Common uses:**
- Grids and game boards
- Images (pixels)
- Graphs (adjacency matrix)
- Dynamic programming tables
- Mathematical matrices

### Prefix Sums (Cumulative Arrays)

**Concept:** Pre-compute cumulative sums to answer range sum queries in O(1).

**Problem:** Given array, answer multiple "sum from index i to j" queries.

**Naive approach:** O(n) per query - loop and add elements
**Optimized approach:** O(n) preprocessing, O(1) per query - use prefix sums!

**How it works:**
```
Original: [3, 1, 4, 1, 5, 9, 2]
Prefix:   [0, 3, 4, 8, 9, 14, 23, 25]
           ↑
        Extra 0 at start (makes math easier)

prefix[i] = sum of elements from index 0 to i-1

Sum from index i to j = prefix[j+1] - prefix[i]
```

**Example:**
```javascript
// Original array
const arr = [3, 1, 4, 1, 5];

// Build prefix sum
const prefix = [0];  // Start with 0
for (let i = 0; i < arr.length; i++) {
    prefix.push(prefix[i] + arr[i]);
}
// prefix = [0, 3, 4, 8, 9, 14]

// Query: Sum from index 1 to 3 (elements: 1, 4, 1)
const sum = prefix[4] - prefix[1];  // 9 - 3 = 6
// Correct! 1 + 4 + 1 = 6
```

**Why it works:**
```
prefix[4] = 3 + 1 + 4 + 1 = 9
prefix[1] = 3
prefix[4] - prefix[1] = (3+1+4+1) - 3 = 1+4+1 = 6 ✓
```

### In-Place Algorithms

**Definition:** Algorithm that modifies data structure in place without creating a copy.

**Benefits:**
- O(1) space instead of O(n)
- More memory efficient
- Often required in interviews

**Example:** Reverse array in place
```javascript
// NOT in-place: O(n) space
function reverse(arr) {
    return arr.slice().reverse();  // Creates new array
}

// In-place: O(1) space
function reverseInPlace(arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr;  // Modified original
}
```

### Array Rotation

**Problem:** Rotate array elements left or right by k positions.

**Example:** Rotate right by 2
```
Original: [1, 2, 3, 4, 5, 6, 7]
Result:   [6, 7, 1, 2, 3, 4, 5]
           ↑  ↑ └─────────────┘
           Last 2 moved to front
```

**Approaches:**
1. **Brute force:** Move one by one, k times - O(nk) time
2. **Extra array:** Copy to new array - O(n) time, O(n) space
3. **Reverse trick:** Three reversals - O(n) time, O(1) space ✅

**Reverse trick explained:**
```
To rotate right by k=2:
1. Reverse entire array
2. Reverse first k elements
3. Reverse remaining elements

Original:  [1, 2, 3, 4, 5, 6, 7]
After 1:   [7, 6, 5, 4, 3, 2, 1]  (reverse all)
After 2:   [6, 7, 5, 4, 3, 2, 1]  (reverse first 2)
After 3:   [6, 7, 1, 2, 3, 4, 5]  (reverse remaining)
```

### Subarray vs Subsequence

**Important distinction:**

**Subarray:**
- Contiguous elements from original array
- Must maintain order AND be adjacent
- Example: From [1,2,3,4,5], subarrays include [2,3,4], [1,2], [3]

**Subsequence:**
- Elements from original array in same order
- Can skip elements (non-contiguous)
- Example: From [1,2,3,4,5], subsequences include [1,3,5], [2,4], [1,2,4]

```
Array: [1, 2, 3, 4]

Subarrays (contiguous):
[1], [2], [3], [4]
[1,2], [2,3], [3,4]
[1,2,3], [2,3,4]
[1,2,3,4]

Some Subsequences (can skip):
[1], [2], [3], [4]
[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]
[1,2,3], [1,2,4], [1,3,4], [2,3,4]
[1,2,3,4]
[1,3] ✓ (can skip 2)
[1,4] ✓ (can skip 2,3)
```

### Two-Pointer Technique (Introduction)

**Concept:** Use two pointers to traverse array, often from different positions.

**Common patterns:**

1. **Converging pointers:** Start at both ends, move toward center
   ```
   [1, 2, 3, 4, 5, 6]
    ↑              ↑
    left          right
   ```

2. **Same direction:** Both move left to right, one faster
   ```
   [1, 2, 3, 4, 5, 6]
    ↑  ↑
    slow fast
   ```

3. **Separate arrays:** One pointer per array
   ```
   arr1: [1, 3, 5]  →
           ↑
   arr2: [2, 4, 6]  →
           ↑
   ```

We'll explore this deeply in Topic 1.4, but the foundation starts with arrays.

---

## 4. Visual Diagrams

### Array Access Pattern

```
Access by index: O(1)
    arr[3]
      ↓
[10][20][30][40][50][60]
 0   1   2   3   4   5
              ↑
         Direct jump to address
```

### 2D Array Memory Layout

```
Logical View:
[1  2  3]
[4  5  6]
[7  8  9]

Physical Memory (array of arrays in JS):
┌─────────┐
│  arr[0] ├──→ [1][2][3]
│  arr[1] ├──→ [4][5][6]
│  arr[2] ├──→ [7][8][9]
└─────────┘
```

### Matrix Traversal Patterns

```
Row-wise (row by row):
1 → 2 → 3
4 → 5 → 6
7 → 8 → 9

Column-wise (column by column):
1   2   3
↓   ↓   ↓
4   5   6
↓   ↓   ↓
7   8   9

Diagonal:
1 ↘ 2   3
4   5 ↘ 6
7   8   9

Spiral:
1 → 2 → 3
        ↓
4 → 5   6
↓       ↓
7 ← 8 ← 9
```

### Prefix Sum Visualization

```
Original array:
Index:    0   1   2   3   4
Array:  [ 3   1   4   1   5 ]

Prefix sum array:
Index:    0   1   2   3   4   5
Prefix: [ 0   3   4   8   9  14 ]
          ↑   └───┐
        Start    3+0=3

Range sum from index 1 to 3:
prefix[4] - prefix[1] = 9 - 3 = 6
                             ↓
Elements [1, 4, 1] = 1+4+1 = 6 ✓
```

### Array Rotation (Reversal Method)

```
Original: [1, 2, 3, 4, 5, 6, 7]
Rotate right by k=3

Step 1: Reverse entire array
[7, 6, 5, 4, 3, 2, 1]

Step 2: Reverse first k elements
[5, 6, 7, 4, 3, 2, 1]
 └──k─┘

Step 3: Reverse remaining n-k elements
[5, 6, 7, 1, 2, 3, 4]
          └──n-k───┘

Result: [5, 6, 7, 1, 2, 3, 4] ✓
```

### In-Place vs Extra Space

```
In-Place Reversal: O(1) space
Original: [1, 2, 3, 4, 5]
          ↓↙        ↘↓
Step 1:   [5, 2, 3, 4, 1]  (swap ends)
             ↓↙   ↘↓
Step 2:   [5, 4, 3, 2, 1]  (swap next)
                ↓
Final:    [5, 4, 3, 2, 1]

With Extra Array: O(n) space
Original: [1, 2, 3, 4, 5]
               ↓ ↓ ↓ ↓ ↓ (copy reversed)
New:      [5, 4, 3, 2, 1]
```

---

## 5. JavaScript Implementation

### Example 1: 2D Array Basics

```javascript
/**
 * Create and manipulate 2D arrays
 */

// Creating a 2D array (matrix)
function createMatrix(rows, cols, defaultValue = 0) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = new Array(cols).fill(defaultValue);
    }
    return matrix;
}

const matrix = createMatrix(3, 4, 0);
console.log(matrix);
// [[0,0,0,0], [0,0,0,0], [0,0,0,0]]

// Accessing elements
matrix[1][2] = 5;  // Set row 1, col 2 to 5

// Traversing row-wise
function traverseRowWise(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            console.log(`matrix[${row}][${col}] = ${matrix[row][col]}`);
        }
    }
}

// Traversing column-wise
function traverseColWise(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            console.log(`matrix[${row}][${col}] = ${matrix[row][col]}`);
        }
    }
}

// Get all neighbors of a cell (up, down, left, right)
function getNeighbors(matrix, row, col) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const neighbors = [];
    
    // Directions: up, down, left, right
    const directions = [[-1,0], [1,0], [0,-1], [0,1]];
    
    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        
        // Check bounds
        if (newRow >= 0 && newRow < rows && 
            newCol >= 0 && newCol < cols) {
            neighbors.push(matrix[newRow][newCol]);
        }
    }
    
    return neighbors;
}
```

### Example 2: Matrix Operations

```javascript
/**
 * Common matrix operations
 */

// Transpose matrix (swap rows and columns)
function transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = createMatrix(cols, rows);
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];  // Swap indices
        }
    }
    
    return result;
}

// Example:
// Input:  [[1,2,3],      Output: [[1,4,7],
//          [4,5,6],               [2,5,8],
//          [7,8,9]]               [3,6,9]]

// Rotate matrix 90 degrees clockwise (in-place)
function rotateMatrix90(matrix) {
    const n = matrix.length;
    
    // Step 1: Transpose
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Step 2: Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
    
    return matrix;
}

// Example:
// Input:  [[1,2,3],      Output: [[7,4,1],
//          [4,5,6],               [8,5,2],
//          [7,8,9]]               [9,6,3]]

// Spiral traversal of matrix
function spiralOrder(matrix) {
    if (!matrix.length) return [];
    
    const result = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse right
        for (let col = left; col <= right; col++) {
            result.push(matrix[top][col]);
        }
        top++;
        
        // Traverse down
        for (let row = top; row <= bottom; row++) {
            result.push(matrix[row][right]);
        }
        right--;
        
        // Traverse left (if still have rows)
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                result.push(matrix[bottom][col]);
            }
            bottom--;
        }
        
        // Traverse up (if still have columns)
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                result.push(matrix[row][left]);
            }
            left++;
        }
    }
    
    return result;
}

// Example:
// Input:  [[1,2,3],      
//          [4,5,6],       
//          [7,8,9]]       
// Output: [1,2,3,6,9,8,7,4,5]
```

### Example 3: Prefix Sums

```javascript
/**
 * Prefix sum array for range queries
 */

class PrefixSum {
    constructor(arr) {
        this.arr = arr;
        this.prefix = this.buildPrefix(arr);
    }
    
    // Build prefix sum array: O(n)
    buildPrefix(arr) {
        const prefix = [0];  // Start with 0 for easier math
        for (let i = 0; i < arr.length; i++) {
            prefix.push(prefix[i] + arr[i]);
        }
        return prefix;
    }
    
    // Get sum from index left to right (inclusive): O(1)
    rangeSum(left, right) {
        // Validate indices
        if (left < 0 || right >= this.arr.length || left > right) {
            throw new Error('Invalid range');
        }
        return this.prefix[right + 1] - this.prefix[left];
    }
    
    // Update element at index (requires rebuilding): O(n)
    update(index, value) {
        this.arr[index] = value;
        this.prefix = this.buildPrefix(this.arr);
    }
}

// Usage
const ps = new PrefixSum([3, 1, 4, 1, 5, 9, 2]);
console.log(ps.rangeSum(1, 4));  // Sum of indices 1-4: 1+4+1+5 = 11
console.log(ps.rangeSum(0, 2));  // Sum of indices 0-2: 3+1+4 = 8
console.log(ps.rangeSum(3, 6));  // Sum of indices 3-6: 1+5+9+2 = 17

/**
 * 2D Prefix Sum (for matrix range queries)
 */
class PrefixSum2D {
    constructor(matrix) {
        this.matrix = matrix;
        this.prefix = this.buildPrefix2D(matrix);
    }
    
    buildPrefix2D(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const prefix = Array(rows + 1).fill(0)
            .map(() => Array(cols + 1).fill(0));
        
        for (let i = 1; i <= rows; i++) {
            for (let j = 1; j <= cols; j++) {
                prefix[i][j] = matrix[i-1][j-1] 
                             + prefix[i-1][j]      // top
                             + prefix[i][j-1]      // left
                             - prefix[i-1][j-1];   // top-left (counted twice)
            }
        }
        
        return prefix;
    }
    
    // Sum of rectangle from (r1,c1) to (r2,c2): O(1)
    rangeSum(r1, c1, r2, c2) {
        return this.prefix[r2+1][c2+1]
             - this.prefix[r1][c2+1]        // subtract top
             - this.prefix[r2+1][c1]        // subtract left
             + this.prefix[r1][c1];         // add top-left (subtracted twice)
    }
}

// Usage
const matrix = [
    [3, 0, 1, 4],
    [5, 6, 3, 2],
    [1, 2, 0, 1]
];
const ps2d = new PrefixSum2D(matrix);
console.log(ps2d.rangeSum(1, 1, 2, 3));  // Sum of submatrix
```

### Example 4: Array Rotation

```javascript
/**
 * Array rotation techniques
 */

// Rotate array right by k positions using reversal
function rotateRight(arr, k) {
    const n = arr.length;
    k = k % n;  // Handle k > n
    
    if (k === 0) return arr;
    
    // Helper function to reverse portion of array
    function reverse(start, end) {
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    }
    
    // Three-step reversal
    reverse(0, n - 1);        // Reverse entire array
    reverse(0, k - 1);        // Reverse first k elements
    reverse(k, n - 1);        // Reverse remaining elements
    
    return arr;
}

// Rotate array left by k positions
function rotateLeft(arr, k) {
    const n = arr.length;
    k = k % n;
    
    if (k === 0) return arr;
    
    function reverse(start, end) {
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    }
    
    reverse(0, k - 1);        // Reverse first k elements
    reverse(k, n - 1);        // Reverse remaining elements
    reverse(0, n - 1);        // Reverse entire array
    
    return arr;
}

// Examples
console.log(rotateRight([1,2,3,4,5,6,7], 3));  // [5,6,7,1,2,3,4]
console.log(rotateLeft([1,2,3,4,5,6,7], 3));   // [4,5,6,7,1,2,3]

// Rotate right using extra space (simpler but O(n) space)
function rotateRightExtraSpace(arr, k) {
    const n = arr.length;
    k = k % n;
    
    return [...arr.slice(n - k), ...arr.slice(0, n - k)];
}
```

### Example 5: In-Place Algorithms

```javascript
/**
 * In-place array manipulations
 */

// Reverse array in-place: O(1) space
function reverseInPlace(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    
    return arr;
}

// Remove duplicates from sorted array in-place
// Returns new length
function removeDuplicates(arr) {
    if (arr.length === 0) return 0;
    
    let writeIndex = 1;  // Where to write next unique element
    
    for (let readIndex = 1; readIndex < arr.length; readIndex++) {
        if (arr[readIndex] !== arr[readIndex - 1]) {
            arr[writeIndex] = arr[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;  // New length
}

// Example: [1,1,2,2,3,4,4] -> [1,2,3,4,_,_,_], returns 4

// Move zeroes to end (maintaining relative order)
function moveZeroes(arr) {
    let writeIndex = 0;  // Position for next non-zero
    
    // Move all non-zeros to front
    for (let readIndex = 0; readIndex < arr.length; readIndex++) {
        if (arr[readIndex] !== 0) {
            arr[writeIndex] = arr[readIndex];
            writeIndex++;
        }
    }
    
    // Fill remaining with zeros
    while (writeIndex < arr.length) {
        arr[writeIndex] = 0;
        writeIndex++;
    }
    
    return arr;
}

// Example: [0,1,0,3,12] -> [1,3,12,0,0]

// Two-pointer technique: remove element in-place
function removeElement(arr, val) {
    let writeIndex = 0;
    
    for (let readIndex = 0; readIndex < arr.length; readIndex++) {
        if (arr[readIndex] !== val) {
            arr[writeIndex] = arr[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;  // New length
}

// Example: ([3,2,2,3], 3) -> [2,2,_,_], returns 2
```

### Example 6: Subarray Operations

```javascript
/**
 * Working with subarrays
 */

// Find maximum sum of contiguous subarray (Kadane's Algorithm)
function maxSubarraySum(arr) {
    let maxSum = arr[0];
    let currentSum = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        // Either extend current subarray or start new one
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// Example: [-2,1,-3,4,-1,2,1,-5,4] -> 6 (subarray [4,-1,2,1])

// Find all subarrays with given sum
function subarraysWithSum(arr, target) {
    const result = [];
    
    for (let start = 0; start < arr.length; start++) {
        let sum = 0;
        for (let end = start; end < arr.length; end++) {
            sum += arr[end];
            if (sum === target) {
                result.push(arr.slice(start, end + 1));
            }
        }
    }
    
    return result;
}

// Example: ([1,2,3,4,5], 5) -> [[2,3], [5]]

// Count subarrays with sum equal to k (using hash map + prefix sum)
function countSubarraysWithSum(arr, k) {
    const prefixSumCount = new Map();
    prefixSumCount.set(0, 1);  // Important: empty subarray has sum 0
    
    let count = 0;
    let currentSum = 0;
    
    for (let num of arr) {
        currentSum += num;
        
        // If (currentSum - k) exists, we found subarray(s) with sum k
        if (prefixSumCount.has(currentSum - k)) {
            count += prefixSumCount.get(currentSum - k);
        }
        
        // Update prefix sum count
        prefixSumCount.set(currentSum, 
            (prefixSumCount.get(currentSum) || 0) + 1);
    }
    
    return count;
}

// Example: ([1,1,1], 2) -> 2 (subarrays: [1,1] at index 0-1 and 1-2)
```

---

## 6. Step-by-Step Walkthrough

### Walkthrough: Building Prefix Sum Array

Let's trace through building a prefix sum step by step:

```javascript
Input array: [3, 1, 4, 1, 5]

Initialize prefix with [0]:
prefix = [0]

Iteration 1 (i=0):
  prefix.push(prefix[0] + arr[0])
  prefix.push(0 + 3) = 3
  prefix = [0, 3]

Iteration 2 (i=1):
  prefix.push(prefix[1] + arr[1])
  prefix.push(3 + 1) = 4
  prefix = [0, 3, 4]

Iteration 3 (i=2):
  prefix.push(prefix[2] + arr[2])
  prefix.push(4 + 4) = 8
  prefix = [0, 3, 4, 8]

Iteration 4 (i=3):
  prefix.push(prefix[3] + arr[3])
  prefix.push(8 + 1) = 9
  prefix = [0, 3, 4, 8, 9]

Iteration 5 (i=4):
  prefix.push(prefix[4] + arr[4])
  prefix.push(9 + 5) = 14
  prefix = [0, 3, 4, 8, 9, 14]

Final: prefix = [0, 3, 4, 8, 9, 14]
```

Now query sum from index 1 to 3:
```
rangeSum(1, 3):
  return prefix[3 + 1] - prefix[1]
  return prefix[4] - prefix[1]
  return 9 - 3 = 6

Verify: arr[1] + arr[2] + arr[3] = 1 + 4 + 1 = 6 ✓
```

### Walkthrough: Rotating Array with Reversals

Rotate [1,2,3,4,5,6,7] right by k=3:

```javascript
Initial: [1, 2, 3, 4, 5, 6, 7]

Step 1: Reverse entire array (indices 0 to 6)
  [1, 2, 3, 4, 5, 6, 7]
   ↕                 ↕
  [7, 2, 3, 4, 5, 6, 1]
      ↕           ↕
  [7, 6, 3, 4, 5, 2, 1]
         ↕     ↕
  [7, 6, 5, 4, 3, 2, 1]

After Step 1: [7, 6, 5, 4, 3, 2, 1]

Step 2: Reverse first k=3 elements (indices 0 to 2)
  [7, 6, 5, 4, 3, 2, 1]
   ↕     ↕
  [5, 6, 7, 4, 3, 2, 1]

After Step 2: [5, 6, 7, 4, 3, 2, 1]

Step 3: Reverse remaining n-k=4 elements (indices 3 to 6)
  [5, 6, 7, 4, 3, 2, 1]
            ↕        ↕
  [5, 6, 7, 1, 3, 2, 4]
               ↕  ↕
  [5, 6, 7, 1, 2, 3, 4]

Final: [5, 6, 7, 1, 2, 3, 4] ✓

Verify: Last 3 elements [5,6,7] moved to front!
```

---

## 7. Complexity Analysis

### Operation Complexities

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| Access by index | O(1) | O(1) | Direct memory access |
| Search (unsorted) | O(n) | O(1) | Must check all elements |
| Search (sorted) | O(log n) | O(1) | Binary search |
| Insert at end | O(1)* | O(1) | *Amortized for dynamic arrays |
| Insert at beginning | O(n) | O(1) | Must shift all elements |
| Delete from end | O(1) | O(1) | Just decrease length |
| Delete from beginning | O(n) | O(1) | Must shift all elements |
| 2D traversal | O(rows × cols) | O(1) | Visit each cell once |
| Build prefix sum | O(n) | O(n) | One pass, extra array |
| Range query (prefix sum) | O(1) | O(1) | After preprocessing |
| Rotate (reversal method) | O(n) | O(1) | Three reversals |
| Transpose matrix | O(rows × cols) | O(rows × cols) | New matrix |
| Spiral traversal | O(rows × cols) | O(rows × cols) | For result array |

### Algorithm Comparisons

**Array Rotation:**
- Brute force: O(n × k) time, O(1) space
- Extra array: O(n) time, O(n) space
- Reversal: O(n) time, O(1) space ✅ Best!

**Range Sum Query:**
- No preprocessing: O(n) per query
- Prefix sum: O(n) preprocessing, O(1) per query ✅
- Tradeoff: Better when many queries

**Remove Duplicates:**
- Create new array: O(n) time, O(n) space
- In-place two-pointer: O(n) time, O(1) space ✅

---

## 8. Common Patterns

### Pattern 1: Two-Pointer for In-Place Modification

**When to use:** Modifying array without extra space

**Template:**
```javascript
function twoPointerInPlace(arr) {
    let writeIndex = 0;  // Where to write
    
    for (let readIndex = 0; readIndex < arr.length; readIndex++) {
        if (/* condition */) {
            arr[writeIndex] = arr[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;  // New length
}
```

**Examples:** Remove duplicates, move zeroes, remove element

### Pattern 2: Prefix Sum for Range Queries

**When to use:** Multiple sum queries on same array

**Template:**
```javascript
// Preprocessing: O(n)
const prefix = [0];
for (let i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
}

// Query: O(1)
function rangeSum(left, right) {
    return prefix[right + 1] - prefix[left];
}
```

**Examples:** Subarray sum, running totals, range queries

### Pattern 3: Nested Loops for 2D Arrays

**When to use:** Matrix traversal or manipulation

**Template:**
```javascript
function process2D(matrix) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            // Process matrix[row][col]
        }
    }
}
```

**Examples:** Matrix rotation, spiral traversal, neighbor checking

### Pattern 4: Kadane's Algorithm for Max Subarray

**When to use:** Finding maximum sum contiguous subarray

**Template:**
```javascript
function maxSubarray(arr) {
    let maxSoFar = arr[0];
    let maxEndingHere = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}
```

**Key insight:** At each position, either extend current subarray or start new one

---

## 9. Practice Problems

### Easy Problems

1. **Matrix Diagonal Sum**
   - LeetCode #1572
   - Goal: Access diagonal elements in 2D array
   - Concepts: Matrix indexing

2. **Running Sum of 1d Array**
   - LeetCode #1480
   - Goal: Build prefix sum array
   - Concepts: Prefix sums

3. **Richest Customer Wealth**
   - LeetCode #1672
   - Goal: Find maximum row sum in 2D array
   - Concepts: 2D traversal

4. **Transpose Matrix**
   - LeetCode #867
   - Goal: Swap rows and columns
   - Concepts: Matrix transformation

5. **Rotate Array**
   - LeetCode #189
   - Goal: Rotate array right by k steps
   - Concepts: In-place rotation

### Medium Problems

1. **Rotate Image**
   - LeetCode #48
   - Goal: Rotate matrix 90 degrees in-place
   - Concepts: Matrix rotation, in-place algorithms

2. **Spiral Matrix**
   - LeetCode #54
   - Goal: Return elements in spiral order
   - Concepts: Matrix traversal patterns

3. **Range Sum Query - Immutable**
   - LeetCode #303
   - Goal: Implement efficient range sum queries
   - Concepts: Prefix sums

4. **Product of Array Except Self**
   - LeetCode #238
   - Goal: Compute products without division
   - Concepts: Prefix/suffix arrays

5. **Set Matrix Zeroes**
   - LeetCode #73
   - Goal: Set rows/cols to zero in-place
   - Concepts: In-place marking, matrix manipulation

6. **Maximum Subarray**
   - LeetCode #53
   - Goal: Find maximum sum contiguous subarray
   - Concepts: Kadane's algorithm

### Hard Problems

1. **Spiral Matrix III**
   - LeetCode #885
   - Goal: Generate spiral path from starting position
   - Concepts: Complex matrix traversal

2. **Range Sum Query 2D - Immutable**
   - LeetCode #304
   - Goal: Implement 2D prefix sums
   - Concepts: 2D prefix sum optimization

3. **Maximal Rectangle**
   - LeetCode #85
   - Goal: Find largest rectangle in binary matrix
   - Concepts: Advanced matrix DP

4. **Median of Two Sorted Arrays**
   - LeetCode #4
   - Goal: Find median in O(log(min(m,n)))
   - Concepts: Binary search on arrays

---

## 10. Common Pitfalls

### Pitfall 1: Array Index Out of Bounds

❌ **Wrong:**
```javascript
for (let i = 0; i <= arr.length; i++) {  // <= is wrong!
    console.log(arr[i]);
}
```

✅ **Right:**
```javascript
for (let i = 0; i < arr.length; i++) {  // < is correct
    console.log(arr[i]);
}
```

### Pitfall 2: Modifying Array While Iterating

❌ **Wrong:**
```javascript
for (let i = 0; i < arr.length; i++) {
    if (condition) arr.splice(i, 1);  // Changes length during iteration!
}
```

✅ **Right:**
```javascript
// Filter creates new array
arr = arr.filter(item => !condition);

// OR iterate backwards if modifying in-place
for (let i = arr.length - 1; i >= 0; i--) {
    if (condition) arr.splice(i, 1);
}
```

### Pitfall 3: Forgetting to Handle Empty Arrays

❌ **Wrong:**
```javascript
function maxElement(arr) {
    let max = arr[0];  // Crashes if arr is empty!
    // ...
}
```

✅ **Right:**
```javascript
function maxElement(arr) {
    if (arr.length === 0) return null;  // Handle edge case
    let max = arr[0];
    // ...
}
```

### Pitfall 4: Shallow Copy Issues with 2D Arrays

❌ **Wrong:**
```javascript
const matrix = [[1,2],[3,4]];
const copy = matrix.slice();  // Shallow copy!
copy[0][0] = 99;
console.log(matrix[0][0]);  // 99 (original modified!)
```

✅ **Right:**
```javascript
// Deep copy for 2D array
const copy = matrix.map(row => row.slice());
// OR
const copy = JSON.parse(JSON.stringify(matrix));
```

### Pitfall 5: Not Handling k > n in Rotation

❌ **Wrong:**
```javascript
function rotate(arr, k) {
    // If k=10 and n=7, does unnecessary work!
}
```

✅ **Right:**
```javascript
function rotate(arr, k) {
    k = k % arr.length;  // Normalize k
    if (k === 0) return arr;  // No rotation needed
    // ...
}
```

---

## 11. Interview Tips

### What Interviewers Look For

1. **Ask about constraints**
   - "Can I modify the input array?"
   - "Should I handle negative numbers?"
   - "What's the range of the array size?"

2. **Consider multiple approaches**
   - Start with brute force
   - Optimize with better data structures
   - Discuss tradeoffs

3. **Handle edge cases**
   - Empty array
   - Single element
   - All elements same
   - Negative numbers (if applicable)

4. **Communicate clearly**
   - Explain your approach before coding
   - Walk through an example
   - State time and space complexity

### Common Follow-ups

**"Can you do it in O(1) space?"**
→ Look for in-place techniques (two pointers, reversal)

**"Can you handle updates efficiently?"**
→ Consider if prefix sums need updating (might not be best choice)

**"What if the array is very large?"**
→ Discuss memory concerns, streaming algorithms

**"Can you optimize this further?"**
→ Look for redundant work, better data structures

---

## 12. Summary & Key Takeaways

### Essential Concepts

1. **Arrays provide O(1) random access** - Core strength
2. **2D arrays are arrays of arrays** - Understand memory layout
3. **Prefix sums enable O(1) range queries** - After O(n) preprocessing
4. **In-place algorithms save space** - Use two pointers
5. **Array rotation via reversals** - Elegant O(n) time, O(1) space

### Quick Reference

**2D Array Access:**
```javascript
matrix[row][col]  // Row-first indexing
```

**Prefix Sum Formula:**
```javascript
rangeSum(i, j) = prefix[j+1] - prefix[i]
```

**Rotation (right by k):**
```javascript
1. Reverse all
2. Reverse first k
3. Reverse remaining
```

**Two-Pointer In-Place:**
```javascript
writeIdx = 0
for readIdx in array:
    if condition:
        write at writeIdx
        writeIdx++
```

### You've Mastered Arrays When You Can:

- ✅ Traverse matrices in multiple patterns
- ✅ Use prefix sums for range queries
- ✅ Rotate arrays efficiently
- ✅ Modify arrays in-place with two pointers
- ✅ Analyze time/space tradeoffs

---

## 13. Next Steps

### What's Next?

**Next Topic:** Strings Fundamentals (Topic 1.3)

Strings are conceptually similar to arrays (array of characters) but have unique properties and algorithms. Many array techniques apply, plus string-specific patterns like pattern matching.

### Keep Practicing

- Solve all recommended problems
- Try to optimize solutions (better time/space)
- Explain your solutions out loud
- Review concepts you found tricky

### Connection to Future Topics

- **Two Pointers (1.4):** Builds directly on array manipulation
- **Sliding Window (1.5):** Uses arrays as the underlying structure
- **Dynamic Programming (Phase 10):** Often uses 1D/2D arrays for DP tables

---

## 🎉 Congratulations!

You've mastered advanced array concepts! You can now manipulate arrays efficiently, work with matrices confidently, and optimize solutions using prefix sums and in-place techniques.

**Ready to continue?** Tell your tutor: "I'm ready for the next topic!"

**Need more practice?** Ask for: "Give me 5 more medium problems on arrays"

**Want clarification?** Ask about any concept that's still unclear!

---

Arrays are everywhere in programming. The techniques you've learned here will serve you throughout your DSA journey and career. Great work! 🚀

