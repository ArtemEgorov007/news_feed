<template>
  <div class="my-dialog" @click="$emit('close')">
    <div class="post-details-modal" @click.stop>
      <div class="post-details-modal__header">
        <h2 class="post-details-modal__title">{{ post.title }}</h2>
        <button
          class="post-details-modal__close"
          @click="$emit('close')"
          aria-label="Close dialog"
        >
          <Icon icon="mdi:close" width="24" height="24"/>
        </button>
      </div>

      <div class="post-details-modal__content">
        <p class="post-details-modal__body">{{ post.body }}</p>

        <div class="post-details-modal__info">
          <div v-if="post.source" class="post-details-modal__info-item">
            <span class="post-details-modal__info-label">Source:</span>
            <span class="post-details-modal__info-value">{{ post.source }}</span>
          </div>

          <div v-if="post.publishedAt" class="post-details-modal__info-item">
            <span class="post-details-modal__info-label">Published:</span>
            <span class="post-details-modal__info-value">{{ formatDate(post.publishedAt) }}</span>
          </div>
        </div>
      </div>

      <div class="post-details-modal__actions">
        <my-button @click="$emit('close')" variant="secondary">
          Close
        </my-button>

        <my-button
          v-if="post.url && post.url !== '#'"
          @click="openArticle(post.url)"
          variant="primary"
        >
          <Icon icon="mdi:open-in-new" width="16" height="16"/>
          <span>Read Full Article</span>
        </my-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue";
import { formatDate } from "@/shared/lib/utils/dateUtils.js";

export default {
  name: "PostDetailsModal",
  components: {Icon},

  props: {
    post: {type: Object, required: true}
  },

  emits: ["close"],

  methods: {
    openArticle(url) {
      if (url && url !== '#') {
        window.open(url, '_blank');
      }
    },

    formatDate
  }
};
</script>

<style scoped>
.my-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.post-details-modal {
  background: white;
  border-radius: var(--border-radius-lg);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.dark-theme .post-details-modal {
  background: var(--color-card-background);
}

.post-details-modal__header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-neutral-200);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.post-details-modal__title {
  margin: 0;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
  line-height: 1.3;
}

.dark-theme .post-details-modal__title {
  color: var(--color-neutral-500);
}

.post-details-modal__close {
  background: none;
  border: none;
  color: var(--color-neutral-500);
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-full);
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-details-modal__close:hover {
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-700);
}

.dark-theme .post-details-modal__close:hover {
  background-color: var(--color-neutral-700);
  color: var(--color-neutral-200);
}

.post-details-modal__content {
  padding: var(--spacing-lg);
  overflow-y: auto;
  flex: 1;
}

.post-details-modal__body {
  font-size: var(--font-size-base);
  color: var(--color-neutral-700);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
  white-space: pre-wrap;
}

.dark-theme .post-details-modal__body {
  color: var(--color-neutral-500);
}

.post-details-modal__info {
  background-color: var(--color-neutral-50);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
}

.dark-theme .post-details-modal__info {
  background-color: var(--color-neutral-500);
}

.post-details-modal__info-item {
  display: flex;
  padding: var(--spacing-sm) 0;
}

.post-details-modal__info-item:not(:last-child) {
  border-bottom: 1px solid var(--color-neutral-200);
}

.dark-theme .post-details-modal__info-item:not(:last-child) {
  border-bottom: 1px solid var(--color-neutral-600);
}

.post-details-modal__info-label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-600);
  width: 100px;
  flex-shrink: 0;
}

.dark-theme .post-details-modal__info-label {
  color: var(--color-neutral-300);
}

.post-details-modal__info-value {
  color: var(--color-neutral-800);
  flex: 1;
}

.dark-theme .post-details-modal__info-value {
  color: var(--color-neutral-200);
}

.post-details-modal__actions {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--color-neutral-200);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
}

.dark-theme .post-details-modal__actions {
  border-top: 1px solid var(--color-neutral-700);
}

@media (max-width: 768px) {
  .post-details-modal__title {
    font-size: var(--font-size-xl);
  }

  .post-details-modal__info-label {
    width: 80px;
  }

  .post-details-modal__actions {
    flex-direction: column;
  }

  .post-details-modal__actions my-button {
    width: 100%;
  }
}
</style>
