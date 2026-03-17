# LeetCode Problem Tracker

**Purpose:** Track which LeetCode problems are used in which lessons to avoid duplicates.

**Rule:** Each problem can only appear in ONE lesson.

---

## How to Use

Before adding a problem to a lesson:
1. Search this file for the problem number
2. If found, choose a different problem
3. If not found, add it to the appropriate section below

---

## Phase 1: Fundamentals

### 1.1 - Complexity Analysis
**Focus:** Analyzing time/space complexity of different approaches
**Prerequisites:** None (first lesson)
**Total Problems:** 17

**Easy:**
- LeetCode #1 - Two Sum
- LeetCode #136 - Single Number
- LeetCode #26 - Remove Duplicates from Sorted Array
- LeetCode #217 - Contains Duplicate
- LeetCode #350 - Intersection of Two Arrays II
- LeetCode #121 - Best Time to Buy and Sell Stock

**Medium:**
- LeetCode #33 - Search in Rotated Sorted Array
- LeetCode #347 - Top K Frequent Elements
- LeetCode #560 - Subarray Sum Equals K
- LeetCode #70 - Climbing Stairs
- LeetCode #238 - Product of Array Except Self
- LeetCode #36 - Valid Sudoku

**Hard:**
- LeetCode #41 - First Missing Positive
- LeetCode #155 - Min Stack
- LeetCode #23 - Merge K Sorted Lists
- LeetCode #72 - Edit Distance
- LeetCode #295 - Find Median from Data Stream

**Coverage:**
- O(1): #136, #26, #155, #295
- O(log n): #33, #23, #295
- O(n): #1, #136, #26, #217, #350, #560, #238, #41, #121
- O(n²): #1 (brute), #217 (brute), #121 (brute), #36 (validation)
- O(n log n): #347, #23
- O(2ⁿ): #70 (naive)
- Space-Time Tradeoffs: #1, #136, #26, #560, #238
- In-Place: #26, #41
- Nested Loops: #36
- Amortized: #155

---

### 1.2 - Arrays Advanced
**Focus:** Matrix operations, prefix sums, in-place algorithms, rotations
**Prerequisites:** 1.1
**Total Problems:** 20

**Easy:**
- LeetCode #1572 - Matrix Diagonal Sum
- LeetCode #1480 - Running Sum of 1d Array
- LeetCode #1672 - Richest Customer Wealth
- LeetCode #867 - Transpose Matrix
- LeetCode #189 - Rotate Array
- LeetCode #118 - Pascal's Triangle
- LeetCode #66 - Plus One

**Medium:**
- LeetCode #48 - Rotate Image
- LeetCode #54 - Spiral Matrix
- LeetCode #303 - Range Sum Query - Immutable
- LeetCode #73 - Set Matrix Zeroes
- LeetCode #53 - Maximum Subarray
- LeetCode #287 - Find the Duplicate Number
- LeetCode #59 - Spiral Matrix II
- LeetCode #74 - Search a 2D Matrix

**Hard:**
- LeetCode #885 - Spiral Matrix III
- LeetCode #304 - Range Sum Query 2D - Immutable
- LeetCode #85 - Maximal Rectangle
- LeetCode #407 - Trapping Rain Water II
- LeetCode #329 - Longest Increasing Path in a Matrix

**Coverage:**
- 2D Array Basics: #1572, #1672, #118, #867
- Matrix Traversal: #1672, #54, #59, #885
- Matrix Transformation: #867, #48
- 1D Prefix Sums: #1480, #303
- 2D Prefix Sums: #304
- In-Place Algorithms: #189, #48, #73
- Array Rotation: #189
- Subarray Problems: #53 (Kadane's)
- Matrix Construction: #118, #59
- Array Manipulation: #66, #287, #73
- Matrix Search: #74
- Advanced Matrix: #85, #407, #329

---

### 1.3 - Strings Fundamentals
**Focus:** String manipulation, palindromes, anagrams, pattern matching
**Prerequisites:** 1.1, 1.2
**Total Problems:** 20

**Easy:**
- LeetCode #58 - Length of Last Word
- LeetCode #242 - Valid Anagram
- LeetCode #28 - Implement strStr()
- LeetCode #387 - First Unique Character in a String
- LeetCode #392 - Is Subsequence
- LeetCode #67 - Add Binary
- LeetCode #345 - Reverse Vowels of a String

**Medium:**
- LeetCode #3 - Longest Substring Without Repeating Characters
- LeetCode #424 - Longest Repeating Character Replacement
- LeetCode #49 - Group Anagrams
- LeetCode #8 - String to Integer (atoi)
- LeetCode #14 - Longest Common Prefix
- LeetCode #187 - Repeated DNA Sequences
- LeetCode #394 - Decode String
- LeetCode #165 - Compare Version Numbers
- LeetCode #409 - Longest Palindrome

**Hard:**
- LeetCode #10 - Regular Expression Matching
- LeetCode #44 - Wildcard Matching
- LeetCode #336 - Palindrome Pairs
- LeetCode #68 - Text Justification

**Coverage:**
- String Traversal: #58, #392, #345
- Character Frequency: #242, #387, #49, #424, #409
- Anagram Detection: #242, #49
- Subsequence vs Substring: #392, #3
- Pattern Matching: #28, #10, #44
- String Building: #67, #394
- Palindrome: #409, #336
- Two Pointers: #345, #392
- Sliding Window: #3, #187, #424
- String Hashing: #49, #187
- String Parsing: #8, #165, #68
- Prefix: #14
- Nested Parsing: #394
- Advanced: #10, #44, #336

---

### 1.4 - Two Pointers Technique
**Focus:** Opposite direction, same direction, collision patterns
**Prerequisites:** 1.1, 1.2, 1.3
**Total Problems:** 17 (complete coverage of all patterns)

**Easy:**
- LeetCode #125 - Valid Palindrome
- LeetCode #27 - Remove Element
- LeetCode #283 - Move Zeroes
- LeetCode #344 - Reverse String
- LeetCode #977 - Squares of a Sorted Array
- LeetCode #88 - Merge Sorted Array
- LeetCode #202 - Happy Number

**Medium:**
- LeetCode #167 - Two Sum II - Input Array Is Sorted
- LeetCode #15 - 3Sum
- LeetCode #11 - Container With Most Water
- LeetCode #680 - Valid Palindrome II
- LeetCode #75 - Sort Colors
- LeetCode #16 - 3Sum Closest
- LeetCode #42 - Trapping Rain Water

**Hard:**
- LeetCode #18 - 4Sum
- LeetCode #76 - Minimum Window Substring
- LeetCode #5 - Longest Palindromic Substring

**Coverage Matrix:**
- Opposite Direction (Palindrome): #125, #680, #5
- Opposite Direction (Pair Sum): #167, #15, #16, #18
- Opposite Direction (Array Props): #11, #42, #977
- Opposite Direction (Merging): #88
- Same Direction (Remove/Filter): #27, #283
- Fast-Slow (Cycle Detection): #202
- Same Direction (Sliding Window): #76
- Three Pointers: #15, #16, #18, #75

---

### 1.5 - Sliding Window Pattern
**Focus:** Fixed window, variable window, count patterns
**Prerequisites:** 1.1, 1.2, 1.3, 1.4
**Total Problems:** 20

**Easy:**
- LeetCode #643 - Maximum Average Subarray I
- LeetCode #1176 - Diet Plan Performance
- LeetCode #1343 - Number of Sub-arrays of Size K and Average >= Threshold
- LeetCode #2269 - Find the K-Beauty of a Number
- LeetCode #2379 - Minimum Recolors to Get K Consecutive Black Blocks
- LeetCode #1876 - Substrings of Size Three with Distinct Characters

**Medium:**
- LeetCode #2461 - Maximum Sum of Distinct Subarrays With Length K
- LeetCode #1456 - Maximum Number of Vowels in a Substring of Given Length
- LeetCode #1208 - Get Equal Substrings Within Budget
- LeetCode #567 - Permutation in String
- LeetCode #438 - Find All Anagrams in a String
- LeetCode #904 - Fruit Into Baskets
- LeetCode #1004 - Max Consecutive Ones III
- LeetCode #209 - Minimum Size Subarray Sum
- LeetCode #1248 - Count Number of Nice Subarrays
- LeetCode #1052 - Grumpy Bookstore Owner

**Hard:**
- LeetCode #727 - Minimum Window Subsequence
- LeetCode #239 - Sliding Window Maximum
- LeetCode #30 - Substring with Concatenation of All Words
- LeetCode #992 - Subarrays with K Different Integers

**Coverage Matrix:**
- Fixed Window (Sum/Average): #643, #1176, #1343, #1052
- Fixed Window (Distinct/Condition): #2461, #2269, #1456, #1876, #2379
- Fixed Window (Anagram/Frequency): #567, #438
- Fixed Window (Deque/Advanced): #239
- Fixed Window (Word-Level): #30
- Variable Window (Budget/Cost): #1208
- Variable Window (At Most k Distinct): #904, #1004
- Variable Window (Shortest): #209, #727
- Variable Window (Count Exactly k): #1248, #992

---

### 1.6 - Hashing & Hash Maps
**Focus:** Hash map patterns — frequency, lookup, grouping, prefix sum combos
**Prerequisites:** 1.1, 1.2, 1.3, 1.4, 1.5
**Total Problems:** 20

**Easy:**
- LeetCode #219 - Contains Duplicate II
- LeetCode #13 - Roman to Integer
- LeetCode #383 - Ransom Note
- LeetCode #205 - Isomorphic Strings
- LeetCode #290 - Word Pattern
- LeetCode #2215 - Find the Difference of Two Arrays
- LeetCode #169 - Majority Element

**Medium:**
- LeetCode #451 - Sort Characters By Frequency
- LeetCode #128 - Longest Consecutive Sequence
- LeetCode #523 - Continuous Subarray Sum
- LeetCode #692 - Top K Frequent Words
- LeetCode #525 - Contiguous Array
- LeetCode #554 - Brick Wall
- LeetCode #535 - Encode and Decode TinyURL
- LeetCode #791 - Custom Sort String
- LeetCode #442 - Find All Duplicates in an Array

**Hard:**
- LeetCode #159 - Longest Substring with At Most Two Distinct Characters
- LeetCode #146 - LRU Cache
- LeetCode #340 - Longest Substring with At Most K Distinct Characters
- LeetCode #380 - Insert Delete GetRandom O(1)

**Coverage Matrix:**
- Frequency Counter: #383, #2215, #169, #442, #451, #692
- Index Tracking / Lookup: #219, #13
- Bijection / Mapping: #205, #290
- Prefix Sum + Hash Map: #523, #525, #554
- Hash Map + Sliding Window: #159, #340
- Hash Map + Data Structure Combo: #146, #380
- Custom Ordering: #791
- Sequence Finding: #128
- In-Place Hashing: #442
- System Design: #535, #146

---

### 1.7 - Sets & Hash Sets (To Be Created)
**Prerequisites:** 1.1, 1.2, 1.3, 1.4, 1.5, 1.6

_Problems to be assigned..._

---

### 1.8 - Sorting Basics (To Be Created)
**Prerequisites:** 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7

_Problems to be assigned..._

---

## Future Phases

### Phase 2: Basic Data Structures
_To be populated as lessons are created..._

### Phase 3: Trees
_To be populated as lessons are created..._

### Phase 4: Graphs
_To be populated as lessons are created..._

---

## Summary Statistics

### Phase 1 Lessons (Complete)

| Lesson | Total Problems | Easy | Medium | Hard | Topics Covered |
|--------|---------------|------|--------|------|----------------|
| **1.1** Complexity Analysis | 17 | 6 | 6 | 5 | All complexity concepts |
| **1.2** Arrays Advanced | 20 | 7 | 8 | 5 | All array/matrix concepts |
| **1.3** Strings Fundamentals | 20 | 7 | 9 | 4 | All string concepts |
| **1.4** Two Pointers | 17 | 7 | 7 | 3 | All two-pointer patterns |
| **TOTAL** | **74** | **27** | **30** | **17** | — |

### Coverage Verification

✅ **Every major concept has 2+ dedicated problems**  
✅ **No duplicate problems across lessons**  
✅ **Progressive difficulty within each lesson**  
✅ **Complete topic coverage matrices included**

---

## Duplicate Issues Found & Resolved

### ✅ Fixed Duplicates (Feb 23, 2026):
- #26 (Remove Duplicates) - Now only in 1.1
- #238 (Product Except Self) - Now only in 1.1
- #48 (Rotate Image) - Now only in 1.2 (was in 1.1)
- #125 (Valid Palindrome) - Now only in 1.4
- #344 (Reverse String) - Now only in 1.4
- #283 (Move Zeroes) - Now only in 1.4
- #76 (Minimum Window) - Now only in 1.4

### Problem Additions (Feb 23, 2026):
Added problems to ensure complete topic coverage:
- **1.1:** Added #121 for optimization analysis, making total 17 problems
- **1.2:** Added #118, #66, #287, #59, #74, #329, making total 20 problems
- **1.3:** Added #67, #345, #394, #165, #409, #68, making total 20 problems
- **1.4:** Replaced duplicates (#26→kept in 1.1, #350→kept in 1.1), added #88 and #202, making total 17 problems

### Duplicate Resolution (Feb 23, 2026):
- **#26 (Remove Duplicates)**: Kept in 1.1 (complexity analysis), removed from 1.4
- **#48 (Rotate Image)**: Kept ONLY in 1.2 (matrix operations), replaced in 1.1 with #36
- **#350 (Intersection)**: Kept in 1.1 (complexity analysis), removed from 1.4, replaced with #202

✅ **ALL DUPLICATES RESOLVED - Each problem appears in exactly ONE lesson**

---

## Search Command

To check if a problem is already used:
```bash
rg "LeetCode #XXX" 01-Fundamentals/
```

Or search this file for the problem number.

---

**Last Updated:** February 23, 2026  
**Next Update:** When lesson 1.5 (Sliding Window) is created
