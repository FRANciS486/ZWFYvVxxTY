// 代码生成时间: 2025-10-05 02:54:20
 * This tool takes two arrays of objects and returns a new array
 * with unique objects from both arrays.
 * Each object is considered unique based on a specified key.
 */

// Helper function to check if an object exists in an array
function objectExistsInArray(arr, obj, key) {
    return arr.some(item => item[key] === obj[key]);
}

// Main function to deduplicate and merge two arrays
function deduplicateAndMerge(array1, array2, uniqueKey) {
    // Validate input
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        throw new Error('Both arguments should be arrays.');
    }
    if (typeof uniqueKey !== 'string') {
        throw new Error('Unique key should be a string.');
    }

    // Initialize the result array with elements from the first array
    let result = array1.filter(obj => !objectExistsInArray(array2, obj, uniqueKey));

    // Add elements from the second array that do not exist in the result
    result = result.concat(array2.filter(obj => !objectExistsInArray(result, obj, uniqueKey)));

    return result;
}

// Example usage:
const array1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const array2 = [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];

try {
    const mergedArray = deduplicateAndMerge(array1, array2, 'id');
    console.log(mergedArray); // Output should be [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
} catch (error) {
    console.error(error.message);
}