<template>
  <div class="post-detail">
    <div class="post-detail__container">
      <header class="post-detail__header">
        <h1 class="post-detail__title">Post Details</h1>
        <div class="post-detail__header-actions">
          <template v-if="!isEditing">
            <my-button @click="enableEditing" variant="primary">Edit Post</my-button>
          </template>
          <template v-else>
            <my-button @click="savePost" variant="primary" :disabled="isSaving">
              <span v-if="isSaving" class="spinner"></span>
              {{ isSaving ? 'Saving...' : 'Save' }}
            </my-button>
            <my-button @click="cancelEditing" variant="secondary" :disabled="isSaving">Cancel</my-button>
          </template>
        </div>
      </header>

      <main class="post-detail__content">
        <transition name="fade-slide" mode="out-in">
          <div v-if="!isEditing" key="view" class="post-detail__view-mode">
            <h2 class="post-detail__post-title">{{ post.title }}</h2>
            <p class="post-detail__post-body">{{ post.body }}</p>
            <div class="post-detail__meta">
              <span class="post-detail__post-id">ID: {{ post.id }}</span>
            </div>
          </div>
          <div v-else key="edit" class="post-detail__edit-mode">
            <div class="post-detail__form-group">
              <label class="post-detail__label">Title:</label>
              <my-input size="large" v-model="editedPost.title" placeholder="Enter post title"/>
            </div>
            <div class="post-detail__form-group">
              <label class="post-detail__label">Content:</label>
              <textarea v-model="editedPost.body" placeholder="Enter post content"
                        class="post-detail__textarea"></textarea>
            </div>
            <div class="post-detail__form-group">
              <label class="post-detail__label">ID:</label>
              <my-input size="medium" v-model="editedPost.id" type="number" disabled/>
            </div>
          </div>
        </transition>
      </main>

      <footer class="post-detail__actions">
        <my-button @click="$router.back()" variant="secondary">← Back to Posts</my-button>
      </footer>
    </div>

    <transition name="fade">
      <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>
    </transition>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  name: "PostDetail",

  data() {
    return {
      editedPost: {id: null, title: "", body: ""},
      isEditing: false,
      isSaving: false,
      toastMessage: ""
    };
  },
  computed: {
    ...mapState("post", ["posts", "localPosts"]),
    post() {
      const id = Number(this.$route.params.id);
      return [...this.localPosts, ...this.posts].find(p => p.id === id) || {id: null, title: "", body: ""};
    }
  },

  created() {
    this.editedPost = {...this.post};
  },

  methods: {
    ...mapMutations("post", ["updatePost", "removePost", "addLocalPost", 'togglePin']),

    enableEditing() {
      this.isEditing = true;
      this.editedPost = {...this.post};
    },

    cancelEditing() {
      this.isEditing = false;
      this.editedPost = {...this.post};
    },

    async savePost() {
      this.isSaving = true;
      try {
        await new Promise(res => setTimeout(res, 500));

        if (!this.post._movedToLocal) {
          const newPost = {
            ...this.editedPost,
            id: this.generateUniqueId(),
            pinned: this.post.pinned,
            _movedToLocal: true
          };
          this.removePost(this.post.id);
          this.addLocalPost(newPost);
        } else {
          this.updatePost({...this.editedPost, pinned: this.post.pinned});
        }


        this.isEditing = false;
        this.showToast("Post saved successfully!");

        this.$router.back();

      } catch {
        this.showToast("Failed to save post");
      } finally {
        this.isSaving = false;
      }
    },

    generateUniqueId() {
      const allPosts = [...this.localPosts, ...this.posts];
      let newId;
      do {
        newId = Date.now() + Math.floor(Math.random() * 10000);
      } while (allPosts.some(p => p.id === newId));
      return newId;
    },

    showToast(message) {
      this.toastMessage = message;
      setTimeout(() => (this.toastMessage = ""), 2000);
    }
  }
};
</script>

<style lang="sass" scoped>
.post-detail
  min-height: 100svh
  padding: clamp(3.75rem, 3.5rem + 1.25vw, 5rem) clamp(1rem, 0.7rem + 1.5vw, 2.5rem) clamp(6.25rem, 7rem + -3.75vw, 2.5rem) clamp(1rem, 0.7rem + 1.5vw, 2.5rem)
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)

.post-detail__container
  max-width: 800px
  margin: 0 auto
  background: #fff
  border-radius: 16px
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1)
  overflow: hidden
  display: flex
  flex-direction: column

.post-detail__header
  display: flex
  justify-content: space-between
  align-items: center
  padding: clamp(1rem, 2vw, 2rem)
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
  color: #fff

.post-detail__title
  margin: 0
  font-size: clamp(1.5rem, 2vw, 2rem)
  font-weight: 300

.post-detail__header-actions
  display: flex
  gap: 15px

.post-detail__content
  padding: clamp(1rem, 2vw, 2rem)
  flex: 1

.post-detail__post-title
  color: #333
  font-size: 1.8rem
  margin-bottom: 20px

.post-detail__post-body
  color: #555
  font-size: 1.1rem
  line-height: 1.7
  margin-bottom: 30px

.post-detail__meta
  border-top: 1px solid #eee
  padding-top: 20px
  color: #777
  font-size: 0.9rem

.post-detail__form-group
  width: 100%
  margin-bottom: 20px


.post-detail__label
  display: block
  margin-bottom: 8px
  font-weight: 500
  color: #444

.post-detail__textarea,
.post-detail__input
  width: 100%
  padding: 12px 14px
  border: 1px solid #ddd
  border-radius: 8px
  font-size: 1rem
  background-color: #fafafa
  transition: all 0.25s ease
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.03)

  &:hover
    border-color: #bbb
    background-color: #fff

  &:focus
    outline: none
    border-color: #667eea
    background-color: #fff
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2)

.post-detail__textarea
  min-height: 150px
  resize: vertical
  line-height: 1.5

.post-detail__actions
  padding: clamp(1rem, 2vw, 2rem)
  text-align: center

.spinner
  border: 2px solid rgba(255, 255, 255, 0.3)
  border-top: 2px solid white
  border-radius: 50%
  width: 14px
  height: 14px
  margin-right: 6px
  animation: spin 0.6s linear infinite
  display: inline-block
  vertical-align: middle

.toast
  position: fixed
  bottom: 20px
  left: 50%
  transform: translateX(-50%)
  background: rgba(0, 0, 0, 0.85)
  color: #fff
  padding: 10px 20px
  border-radius: 8px
  font-size: 0.9rem
  z-index: 1000

.fade-slide-enter-active,
.fade-slide-leave-active
  transition: all 0.3s ease

.fade-slide-enter-from,
.fade-slide-leave-to
  opacity: 0
  transform: translateY(10px)

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.3s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0

@keyframes spin
  to
    transform: rotate(360deg)
</style>
