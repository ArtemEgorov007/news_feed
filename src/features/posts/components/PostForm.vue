<template>
  <form @submit.prevent="createPost" class="post-form">
    <h4 class="post-form__title">Create post</h4>

    <my-input
        v-focus
        v-model="post.title"
        placeholder="Enter title"
        type="text"
        size="large"
    />

    <my-input
        v-model="post.body"
        placeholder="Enter subtitle"
        type="text"
        size="large"
    />

    <my-button
        variant="primary"
        size="large"
        class="post-form__button"
    >
      Create Post
    </my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    };
  },

  methods: {
    createPost() {
      if (this.post.title.trim() && this.post.body.trim()) {
        this.$emit('create', {
          ...this.post,
          id: Date.now()
        });

        this.post = {
          title: '',
          body: ''
        };
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.post-form
  display: flex
  flex-direction: column
  gap: 15px
  max-width: 500px
  margin: 20px auto
  padding: 20px
  border-radius: 8px
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
  background-color: #f9f9f9
  transition: all 0.3s ease

.post-form:hover
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15)

.post-form__input
  padding: 12px 15px
  border: 1px solid #ddd
  border-radius: 4px
  font-size: 16px
  transition: border-color 0.3s ease, box-shadow 0.3s ease

.post-form__input:focus
  outline: none
  border-color: #4CAF50
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2)

.post-form__button
  align-self: flex-end
</style>
