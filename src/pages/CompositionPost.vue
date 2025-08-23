<!--<template>-->
<!--  <div class="post">-->
<!--    <header class="post__header">-->
<!--      <router-link to="/" class="post__title">-->
<!--        <p>Page for post (Composition API)</p>-->
<!--      </router-link>-->

<!--      <my-input-->
<!--          v-model="searchQuery"-->
<!--          placeholder="Поиск..."-->
<!--          class="post__search"-->
<!--          v-focus-->
<!--      />-->

<!--      <div class="post__actions">-->
<!--        <div class="post__controls">-->
<!--          <my-button-->
<!--              @click="fetchPosts(true)"-->
<!--              variant="secondary"-->
<!--              :disabled="isPostsLoading"-->
<!--              class="post__button"-->
<!--          >-->
<!--            {{ isPostsLoading ? 'Loading...' : 'Give a posts' }}-->
<!--          </my-button>-->

<!--          <my-select-->
<!--              v-model="selectedSort"-->
<!--              :options="sortOptions"-->
<!--              class="post__select"-->
<!--          />-->
<!--        </div>-->

<!--        <my-button-->
<!--            @click="dialogVisible = true"-->
<!--            variant="primary"-->
<!--            class="post__button"-->
<!--        >-->
<!--          Open post-->
<!--        </my-button>-->
<!--      </div>-->
<!--    </header>-->

<!--    <my-dialog v-model:show="dialogVisible">-->
<!--      <post-form @create="createPost" class="post__form"/>-->
<!--    </my-dialog>-->

<!--    <main class="post__main">-->
<!--      <div v-if="isPostsLoading && page === 1" class="post__loading">-->
<!--        <div class="loading-spinner"></div>-->
<!--        <p class="loading-text">Loading posts...</p>-->
<!--      </div>-->

<!--      <post-list-->
<!--          v-else-->
<!--          :posts="sortedAndSearchedPosts"-->
<!--          @delete="deletePost"-->
<!--          class="post__list"-->
<!--      />-->

<!--      <div v-if="isPostsLoading && page > 1" class="post__loading-more">-->
<!--        <div class="loading-spinner"></div>-->
<!--        <p>Loading more posts...</p>-->
<!--      </div>-->

<!--      <div-->
<!--          v-intersection="loadMorePosts"-->
<!--          class="post__observer-target"-->
<!--          v-show="page < totalPages"-->
<!--      ></div>-->
<!--    </main>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {ref, watch} from "vue";-->
<!--import {usePosts} from "@/hooks/usePost.js"-->
<!--import useSortedPosts from "@/hooks/useSortedPosts.js"-->
<!--import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts.js"-->

<!--import PostForm from "@/components/PostForm.vue"-->
<!--import PostList from "@/components/PostList.vue"-->

<!--export default {-->
<!--  name: "CompositionPost",-->
<!--  components: {PostForm, PostList},-->

<!--  setup() {-->
<!--    const {posts, isPostsLoading, totalPages, page, searchQuery, fetchPosts, loadMorePosts, deletePost} = usePosts(10)-->
<!--    const {selectedSort, sortedPosts} = useSortedPosts(posts)-->
<!--    const {searchQuery: searchQueryRef, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)-->

<!--    searchQueryRef.value = searchQuery.value-->
<!--    const unwatch = watch(searchQuery, (newVal) => {-->
<!--      searchQueryRef.value = newVal-->
<!--    })-->

<!--    const createPost = (post) => {-->
<!--      posts.value = [post, ...posts.value]-->
<!--      dialogVisible.value = false-->
<!--    }-->

<!--    return {-->
<!--      posts,-->
<!--      isPostsLoading,-->
<!--      totalPages,-->
<!--      page,-->
<!--      searchQuery,-->
<!--      selectedSort,-->
<!--      sortedAndSearchedPosts,-->
<!--      fetchPosts,-->
<!--      loadMorePosts,-->
<!--      deletePost,-->
<!--      createPost,-->
<!--      dialogVisible: ref(false),-->
<!--      sortOptions: [-->
<!--        {value: "", name: "No sorting"},-->
<!--        {value: "title", name: "By title"},-->
<!--        {value: "body", name: "By description"},-->
<!--        {value: "id", name: "By ID"}-->
<!--      ]-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="sass" scoped>-->
<!--.post-->
<!--  padding: 2rem-->

<!--.post__header-->
<!--  display: flex-->
<!--  justify-content: space-between-->
<!--  align-items: center-->
<!--  margin-bottom: 30px-->
<!--  padding-bottom: 20px-->
<!--  border-bottom: 1px solid #eee-->
<!--  flex-flow: row wrap-->
<!--  gap: 15px-->

<!--.post__title-->
<!--  margin: 0-->
<!--  font-size: 2rem-->
<!--  text-decoration: none-->
<!--  color: inherit-->

<!--.post__search-->
<!--  flex: 1-->
<!--  min-width: 200px-->

<!--.post__actions-->
<!--  display: flex-->
<!--  gap: 20px-->
<!--  align-items: center-->
<!--  flex-flow: row wrap-->

<!--.post__controls-->
<!--  display: flex-->
<!--  gap: 10px-->
<!--  align-items: center-->
<!--  flex-flow: row wrap-->

<!--.post__button-->
<!--  white-space: nowrap-->

<!--.post__select-->
<!--  min-width: 180px-->

<!--.post__main-->
<!--  margin-top: 30px-->

<!--.post__loading,-->
<!--.post__loading-more-->
<!--  display: flex-->
<!--  flex-direction: column-->
<!--  align-items: center-->
<!--  justify-content: center-->
<!--  padding: 60px 20px-->

<!--.post__loading-more-->
<!--  padding: 30px 20px-->

<!--.loading-spinner-->
<!--  width: 40px-->
<!--  height: 40px-->
<!--  border: 4px solid #f3f3f3-->
<!--  border-top: 4px solid #4CAF50-->
<!--  border-radius: 50%-->
<!--  animation: spin 1s linear infinite-->
<!--  margin-bottom: 20px-->

<!--.loading-text-->
<!--  color: #666-->
<!--  font-size: 1.2rem-->
<!--  margin: 0-->

<!--.post__observer-target-->
<!--  height: 20px-->

<!--@keyframes spin-->
<!--  0%-->
<!--    transform: rotate(0deg)-->
<!--  100%-->
<!--    transform: rotate(360deg)-->
<!--</style>-->
