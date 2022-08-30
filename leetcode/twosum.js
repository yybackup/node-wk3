// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.
// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 const twoSum = function(nums, target){
    number = [];
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++){
            if (nums[i] + nums[j] === target) {
                //**! check for i and j is not the same number **!/
                if (i ==j){
                    continue;
                }
                else{number.push(i,j)
            }
        //**! limit the length of output array to 2 **/
        number.length=2}}
    }
    return number;
}
console.log( twoSum([1,3,4],4))