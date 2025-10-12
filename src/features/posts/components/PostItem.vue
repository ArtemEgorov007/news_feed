<template>
  <div class="post-card">
    <div class="post-card__header">
      <div
          class="post-card__favorite"
          :class="{ 'post-card__favorite--active': isFavorite }"
          @click="toggleFavorite"
          :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
          :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <Icon :icon="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" width="20" height="20"/>
      </div>

      <div
          class="post-card__pin"
          :title="post.pinned ?'Unpin' : 'Pin'"
          @click="$emit('pin', post.id)"
          :aria-label="post.pinned ? 'Unpin post' : 'Pin post'"
      >
        <Icon :icon="post.pinned ? 'mdi:pin' : 'mdi:pin-outline'" width="20" height="20"/>
      </div>
    </div>

    <!-- Add click handler to the entire card content to show details -->
    <div class="post-card__content" @click="showDetails = true">
      <h4 class="post-card__title">{{ post.title }}</h4>
      <p class="post-card__description">{{ post.body }}</p>

      <!-- Display additional information for news articles-->
      <div v-if="post.source || post.publishedAt" class="post-card__meta">
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
        <span>Read Full Article</span>
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
import { formatDate } from "@/shared/lib/utils/dateUtils.js";

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
      // Check if post is in favorites
      // Added safety check for store state
      const favorites = this.$store.state.post?.favorites || [];
      return favorites.some(fav => fav.id === this.post.id);
    }
  },

  methods: {
    onDelete() {
      this.$emit("delete", this.post.id);
    },

    openArticle(url) {
      // Added safety check for URL
      if (url && url !== '#') {
        window.open(url, '_blank');
      }
    },

    formatDate(dateString) {
      // Added safety check for date string
      if (!dateString) return '';
      
      const options = {year:'numeric', month: 'short', day: 'numeric'};
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) return '';
      
      return date.toLocaleDateString(undefined, options);
    },

    toggleFavorite() {
      if (this.isFavorite) {
        this.$store.commit("post/removeFavorite", this.post.id);
      } else {
        // Create a copy of the post to avoid reference issues
        const postCopy = {...this.post};
        this.$store.commit("post/addFavorite", postCopy);
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
  border-radius: var(--border-radius-lg);
 background: white;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal), transform var(--transition-fast);
 display: flex;
  flex-direction: column;
height: 100%;
  animation: fadeInUp 0.4s ease forwards;
  opacity: 0;
transform: translateY(15px);
  border: 1px solid var(--color-neutral-100);
  cursor: pointer;/* Add cursor to indicate card is clickable*/
}

.post-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
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
  background-color: var(--color-neutral-200);
}

.post-card__header {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-md) 0 var(--spacing-md);
}

.post-card__favorite,
.post-card__pin {
  color: var(--color-neutral-400);
  transition: all var(--transition-fast);
  cursor: pointer;
  border-radius: var(--border-radius-full);
  padding: var(--spacing-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-card__favorite:hover,
.post-card__pin:hover {
 background-color: var(--color-neutral-100);
  transform: scale(1.1);
}

.post-card__favorite:hover,
.post-card__favorite--active {
  color:var(--color-error-500);
}

.post-card__favorite--active {
  animation: pulse 0.4s ease;
}

.post-card__pin:hover {
  color: var(--color-warning-500);
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
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
}

.post-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-900);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
letter-spacing: -0.01em;
}

.post-card__description {
  font-size: var(--font-size-base);
  color: var(--color-neutral-600);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  flex: 1;
}

.post-card__meta {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-neutral-100);
  font-size: var(--font-size-sm);
  color: var(--color-neutral-500);
}

.post-card__source {
  font-weight: var(--font-weight-medium);
  color: var(--color-primary-600);
}

.post-card__date {
  color: var(--color-neutral-500);
}

.post-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-neutral-100);
  gap: var(--spacing-sm);
}

.post-card__delete {
  margin-right: auto;
}

.post-card__button {
  min-width:140px;
border-radius: var(--border-radius-full) !important;
  font-weight: var(--font-weight-semibold) !important;
  box-shadow: var(--shadow-sm) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.post-card__button:hover {
  box-shadow: var(--shadow-md) !important;
  transform: translateY(-2px) !important;
}

.post-card__button--edit {
  min-width: auto;
  padding: var(--spacing-sm) var(--spacing-md) !important;
}

@media (max-width: 768px) {
  .post-card__title {
    font-size: var(--font-size-base);
  }

  .post-card__button {
    min-width: auto;
    padding:var(--spacing-sm) var(--spacing-md) !important;
    font-size: var(--font-size-sm) !important;
  }

  .post-card__button span {
    display: none;
 }

  .post-card__button {
    padding: var(--spacing-sm) !important;
  }
}
</style>