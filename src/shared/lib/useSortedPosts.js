// import {ref, computed} from 'vue'
//
// export default function useSortedPosts(posts) {
//     const selectedSort = ref('')
//
//     const sortedPosts = computed(() => {
//         if (!selectedSort.value) return posts.value
//
//         return [...posts.value].sort((post1, post2) => {
//             const val1 = post1[selectedSort.value]
//             const val2 = post2[selectedSort.value]
//
//             if (typeof val1 === 'number' && typeof val2 === 'number') {
//                 return val1 - val2
//             }
//
//             return String(val1).localeCompare(String(val2), undefined, { numeric: true })
//         })
//     })
//
//     return {
//         selectedSort,
//         sortedPosts
//     }
// }
