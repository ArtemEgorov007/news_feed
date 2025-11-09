<template>
  <div class="my-dialog" @click="$emit('close')"role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="post-details-modal" @click.stop>
      <div class="post-details-modal__header">
        <h2 id="modal-title" class="post-details-modal__title">{{ post.title }}</h2>
        <button class="post-details-modal__close"
          @click="$emit('close')"
          aria-label="Close dialog"
         ref="closeButton"
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
          Close</my-button>

        <my-button
          v-if="post.url && post.url !== '#'"
          @click="openArticle(post.url)"
          variant="primary"
       >
          <Icon icon="mdi:open-in-new" width="16" height="16"/>
          <span>ReadFull Article</span>
        </my-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue";
import {formatDate } from "@/shared/lib/utils/dateUtils.js";

export default {
  name: "PostDetailsModal",
  components:{Icon},

  props: {
    post: {type: Object, required: true}
  },

  emits: ["close"],

  mounted() {
    // Focus the close button when modalopens
    this.$nextTick(() => {
      if (this.$refs.closeButton) {
        this.$refs.closeButton.focus();
      }
    });

    // Add escape key listener
    document.addEventListener('keydown', this.handleKeydown);
  },

  beforeUnmount() {
    // Remove escape key listenerdocument.removeEventListener('keydown', this.handleKeydown);
  },

  methods: {
    openArticle(url) {
      if (url && url !== '#') {
        window.open(url, '_blank');
      }
    },

    handleKeydown(event) {
      // Close modal on Escape key
      if (event.key === 'Escape') {
        this.$emit('close');
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
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.post-details-modal {
  background: white;
  border-radius: 20px;
  max-height: 90vh;
overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  transform: translateY(0);
  transition: transform 0.3s ease;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.dark-theme .post-details-modal {
  background: var(--color-card-background);
}

.post-details-modal__header {
  padding: 32px;
  border-bottom: 1px solid var(--color-neutral-200);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.post-details-modal__title {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: var(--color-neutral-900);
  line-height: 1.3;
}

.post-details-modal__close {
  background: none;
  border: none;
  color: var(--color-neutral-500);
  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
}

.post-details-modal__close:hover {
 background-color: var(--color-neutral-100);
  color: var(--color-neutral-700);
  transform: rotate(90deg);
}

.dark-theme .post-details-modal__close:hover {
  background-color: var(--color-neutral-700);
  color: var(--color-neutral-200);
}

.post-details-modal__content {
  padding: 32px;
  overflow-y: auto;
  flex: 1;
}

.post-details-modal__body {
  font-size: 18px;
  color: var(--color-neutral-700);
  line-height: 1.8;
  margin-bottom: 32px;
  white-space: pre-wrap;
}

.dark-theme .post-details-modal__body {
  color: var(--color-neutral-300);
}

.post-details-modal__info {
  background-color: var(--color-neutral-50);
  border-radius: 16px;
  padding: 24px;
}

.dark-theme.post-details-modal__info {
  background-color: var(--color-neutral-800);
}

.post-details-modal__info-item {
  display: flex;
  padding: 12px 0;
}

.post-details-modal__info-item:not(:last-child) {
  border-bottom: 1px solid var(--color-neutral-200);
}

.dark-theme .post-details-modal__info-item:not(:last-child) {
  border-bottom: 1px solid var(--color-neutral-700);
}

.post-details-modal__info-label {
  font-weight: 600;
  color: var(--color-neutral-600);
  width: 120px;
  flex-shrink: 0;
}

.dark-theme .post-details-modal__info-label {
  color: var(--color-neutral-400);
}

.post-details-modal__info-value {
  color: var(--color-neutral-800);
  flex: 1;
  font-weight: 500;
}

.dark-theme .post-details-modal__info-value {
  color: var(--color-neutral-200);
}

.post-details-modal__actions {
  padding: 32px;
  border-top: 1px solid var(--color-neutral-200);
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.dark-theme .post-details-modal__actions {
  border-top: 1pxsolid var(--color-neutral-700);
}

@media (max-width: 768px) {
  .post-details-modal__title {
    font-size: 24px;
  }

  .post-details-modal__header,
  .post-details-modal__content,
  .post-details-modal__actions {
    padding: 24px;
  }

  .post-details-modal__info-label {
    width: 100px;
  }

  .post-details-modal__actions {
    flex-direction: column;
  }

  .post-details-modal__actions my-button {
    width: 100%;
  }

  .post-details-modal {
    margin: 20px;
    max-height: calc(100vh - 40px);
  }
}
</style>
