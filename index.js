// selection sort

let arr = [1,5,4,3,2,1];

function selectionSort(nums) {
	for (let i = 0; i < nums.length; i++) {
		let j = i;
		let min = nums[j];
		let minIndex = j;
		while (j < nums.length) {
			if (min > nums[j]) {
				min = nums[j];
				minIndex = j;
			}
			j++;
		}
		[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
	}
	return nums;
}

function insertionSort(nums) {
	for(let i=1; i<nums.length; i++){
		let j=i;
		let curr = nums[j];
		while(j >= 1 && nums[j-1] > nums[j]){
			nums[j] = nums[j-1];
			j--;
		}
		nums[j] = curr;
	}
	return nums;
}



console.log(selectionSort(arr));
console.log(insertionSort(arr));