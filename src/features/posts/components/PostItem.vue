<template>
  <div class="post-card"tabindex="0" role="article" aria-label="News article">
    <div class="post-card__header">
      <div
          class="post-card__favorite"
          :class="{ 'post-card__favorite--active': isFavorite }"
          @click="toggleFavorite"
          :title="isFavorite? 'Remove from favorites' : 'Add to favorites'"
          :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
         tabindex="0"
          @keydown.enter="toggleFavorite"
          @keydown.space.prevent="toggleFavorite"
          role="button"
      >
        <Icon :icon="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" width="20" height="20"/>
      </div>

      <div
          class="post-card__pin"
          :title="post.pinned ?'Unpin' :'Pin'"
          @click="$emit('pin', post.id)"
          :aria-label="post.pinned ? 'Unpin post' : 'Pin post'"
         tabindex="0"
          @keydown.enter="$emit('pin', post.id)"
          @keydown.space.prevent="$emit('pin', post.id)"
          role="button"
      >
        <Icon :icon="post.pinned ? 'mdi:pin' : 'mdi:pin-outline'" width="20" height="20"/>
      </div>
    </div>

    <!-- Add click handler to the entire card content to show details -->
    <div class="post-card__content" @click="showDetails = true"tabindex="0" role="button" aria-label="View post details">
      <h4 class="post-card__title">{{ post.title }}</h4>
      <p class="post-card__description">{{ post.body }}</p>

      <!-- Display additional informationfornews articles-->
      <div v-if="post.source ||post.publishedAt" class="post-card__meta">
        <span v-if="post.source" class="post-card__source">{{ post.source }}</span>
        <span v-if="post.publishedAt" class="post-card__date">{{ formatDate(post.publishedAt) }}</span>
      </div>
    </div>

<div class="post-card__footer">
      <delete-icon
       @delete="onDelete"
          title="Delete post"
          class="post-card__delete"
      />

      <!-- Button to read full article or view details -->
      <my-button
         v-if="post.url && post.url !== '#'"
          variant="primary"
          size="small"
          @click="openArticle(post.url)"
          class="post-card__button"
      >
        <Icon icon="mdi:open-in-new" width="16" height="16"/>
        <span>ReadFull Article</span>
      </my-button>

      <my-button
         v-else
          variant="primary"
         size="small"
          @click="showDetails = true"
          class="post-card__button"
      >
       <Icon icon="mdi:eye" width="16" height="16"/>
        <span>View Details</span>
      </my-button>
    </div>
  </div>

 <PostDetailsModal
    v-if="showDetails"
    :post="post"
    @close="showDetails = false"
  />
</template>

<script>
import {DeleteIcon} from "@/shared/ui";
import {Icon} from "@iconify/vue";
import PostDetailsModal from "./PostDetailsModal.vue";
import {formatDate } from "@/shared/lib/utils/dateUtils.js";
import notificationManager from '@/shared/lib/utils/notificationManager.js';

export default {
  name: "PostItem",
components: {DeleteIcon, Icon, PostDetailsModal},

  props: {
    post: {type: Object, required: true},
  },

  emits: ["delete", "pin"],

data() {
    return {
      showDetails: false
    };
  },

computed: {
    isFavorite(){
      // Checkif post is in favorites
      // Added safety check for store state
      const favorites = this.$store.state.post?.favorites || [];
      return favorites.some(fav => fav.id === this.post.id);
    }
  },

  methods: {
    onDelete() {
this.$emit("delete",this.post.id);
  },

    openArticle(url) {
      // Added safety check for URL
      if (url && url !== '#') {
        window.open(url,'_blank');
      }
},

    formatDate(dateString) {
      // Added safety check for date string
      if(!dateString) return '';

const options = {year:'numeric', month: 'short', day: 'numeric'};
      const date = new Date(dateString);

      // Check if date isvalid
      if(isNaN(date.getTime())) return '';

      return date.toLocaleDateString(undefined, options);
    },

   toggleFavorite() {
      if (this.isFavorite) {
this.$store.commit("post/removeFavorite", this.post.id);
        notificationManager.notify(`Removed "${this.post.title}" from favorites`, 'success');
      } else {
        // Create a copy of the post to avoid reference issues
        const postCopy = {...this.post};
        this.$store.commit("post/addFavorite", postCopy);
        notificationManager.notify(`Added "${this.post.title}" to favorites`, 'success');
      }
    },

    formatDate
  }
};
</script>

<style scoped>
.post-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: fadeInUp 0.4s ease forwards;
  opacity: 0;
  transform: translateY(15px);
  border: 1pxsolid var(--color-neutral-100);
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

@keyframes fadeInUp {
 to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Add hover effect to card content */
.post-card__content:hover {
  background-color: var(--color-neutral-50);
}

.dark-theme .post-card__content:hover {
  background-color: var(--color-neutral-50);
}

.post-card__header {
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 0 16px;
}

.post-card__favorite,
.post-card__pin {
  color: var(--color-neutral-400);
  transition: all0.2s ease;
  cursor: pointer;
  border-radius: 50%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.dark-theme .post-card__favorite,
.dark-theme .post-card__pin {
  background: rgba(30, 30, 30, 0.7);
}

.post-card__favorite:hover,
.post-card__pin:hover {
  background-color: var(--color-neutral-200);
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0,0, 0, 0.1);
}

.post-card__favorite:hover,
.post-card__favorite--active {
  color: var(--color-error-500);
}

.post-card__favorite--active {
  animation: pulse 0.4s ease;
  background-color: var(--color-error-50);
}

.dark-theme .post-card__favorite--active {
  background-color: var(--color-error-900);
}

.post-card__pin:hover {
  color: var(--color-warning-500);
  background-color: var(--color-warning-50);
}

.dark-theme .post-card__pin:hover {
  background-color: var(--color-warning-900);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.1);
  }
}

.post-card__content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.post-card__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-neutral-900);
  margin-bottom: 12px;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.post-card__description {
  font-size: 15px;
  color: var(--color-neutral-600);
  line-height: 1.6;
  margin-bottom: 16px;
  flex: 1;
}

.post-card__meta {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--color-neutral-100);
  font-size: 13px;
  color: var(--color-neutral-500);
}

.post-card__source {
  font-weight: 500;
  color: var(--color-primary-600);
}

.post-card__date {
  color: var(--color-neutral-500);
}

.post-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid var(--color-neutral-100);
  gap: 12px;
}

.post-card__delete {
  margin-right: auto;
}

.post-card__button {
  min-width: 140px;
  border-radius: 24px!important;
  font-weight: 500 !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:8px;
  transition: all 0.2s ease;
  padding: 10px 20px;
}

.post-card__button:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
transform: translateY(-2px) !important;
}

.post-card__button--edit {
  min-width: auto;
  padding: 8px 16px !important;
}

@media (max-width: 768px) {
  .post-card__title {
    font-size: 16px;
  }

  .post-card__button {
    min-width: auto;
    padding: 8px 16px !important;
    font-size: 14px !important;
  }

  .post-card__button span {
    display: none;
  }

  .post-card__button {
padding: 8px !important;
  }
}
</style>
