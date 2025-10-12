import axios from "axios";
import {ref, onMounted} from "vue";

export function usePosts(limit = 10) {
    const posts = ref([])
    const totalPages = ref(0)
    const isPostsLoading = ref(false)
    const page = ref(1)
    const searchQuery = ref('')

    const fetchPosts = async (reset = false) => {
        try {
            isPostsLoading.value = true

            if (reset) {
                page.value = 1
            }

            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: page.value,
                    _limit: limit
                }
            });

            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)

            if (page.value === 1) {
                posts.value = response.data
            } else {
                posts.value = [...posts.value, ...response.data]
            }
        } catch (e) {
            console.error('Ошибка загрузки постов:', e)
            alert('Ошибка загрузки постов')
        } finally {
            isPostsLoading.value = false
        }
    }

    const loadMorePosts = async () => {
        if (isPostsLoading.value || page.value >= totalPages.value) return

        page.value++
        await fetchPosts()
    }

    const deletePost = (postId) => {
        posts.value = posts.value.filter(post => post.id !== postId)
    }

    onMounted(() => {
        fetchPosts()
    })

    return {
        posts,
        isPostsLoading,
        totalPages,
        page,
        searchQuery,
        fetchPosts,
        loadMorePosts,
        deletePost
    }
}
