<template>
  <dialog ref="updateDialog" class="modal">
    <div class="modal-box max-w-2xl bg-linear-to-br from-base-100 to-base-200">
      <!-- Close button -->
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 hover:bg-base-300 transition-all duration-200">
          <font-awesome-icon icon="fas fa-times" class="text-lg" />
        </button>
      </form>

      <!-- Header -->
      <div class="flex items-center gap-3 mb-6">
        <div class="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
          <font-awesome-icon icon="fa-solid fa-rocket" class="text-2xl text-success" />
        </div>
        <div>
          <h3 class="text-2xl font-bold text-base-content">{{ $t('updateAvailableTitle') }}</h3>
          <p class="text-sm text-base-content/60">{{ $t(getSubtitleKey()) }}</p>
        </div>
      </div>

      <!-- Update content -->
      <div class="space-y-4">
        <!-- Version info -->
        <div v-if="newVersion" class="flex items-center justify-between p-4 bg-base-300/50 rounded-lg">
          <div>
            <p class="text-sm text-base-content/60">{{ $t('currentVersion') }}</p>
            <p class="text-lg font-semibold">{{ currentVersion }}</p>
          </div>
          <div class="flex items-center">
            <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-lg text-base-content/40 mx-4" />
          </div>
          <div>
            <p class="text-sm text-base-content/60">{{ $t('newVersion') }}</p>
            <p class="text-lg font-semibold text-success">{{ newVersion }}</p>
          </div>
        </div>

        <!-- Update notes with markdown support -->
        <div v-if="updateBody" class="bg-base-300/30 rounded-lg p-4 max-h-64 overflow-y-auto" tabindex="0" role="region"
          :aria-label="$t('updateNotes')">
          <h4 class="text-sm font-semibold text-base-content/80 mb-2">{{ $t('updateNotes') }}</h4>
          <!-- 
            v-html is safe here because:
            1. Content comes from trusted update server (same origin as app)
            2. DOMPurify sanitizes with strict whitelist
            3. URL protocols validated (blocks javascript:, data:, etc)
            4. All links get noopener noreferrer
            5. Parsed with DOMParser, not innerHTML
          -->
          <div class="prose prose-sm max-w-none text-base-content/90" v-html="renderedMarkdown"></div>
        </div>

        <!-- Platform-specific message -->
        <div v-if="isMac" class="alert alert-info">
          <font-awesome-icon icon="fa-solid fa-info-circle" class="h-5 w-5" />
          <span class="text-sm">{{ $t('macUpdateInfo') }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="modal-action mt-6">
        <form method="dialog" class="flex gap-3 w-full">
          <button class="btn btn-ghost flex-1" @click="handleCancel">
            {{ $t('cancel') }}
          </button>
          <button class="btn btn-success flex-1" @click="handleConfirm">
            <font-awesome-icon :icon="isMac ? 'fa-solid fa-download' : 'fa-solid fa-sync'" class="mr-2" />
            {{ $t(getConfirmButtonKey()) }}
          </button>
        </form>
      </div>
    </div>

    <!-- Modal backdrop -->
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script>
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default {
  name: 'UpdateDialog',
  props: {
    currentVersion: {
      type: String,
      default: ''
    },
    newVersion: {
      type: String,
      default: ''
    },
    updateBody: {
      type: String,
      default: ''
    },
    isMac: {
      type: Boolean,
      default: false
    }
  },
  emits: ['confirm', 'cancel'],
  computed: {
    renderedMarkdown() {
      if (!this.updateBody) {
        return '';
      }

      // Convert markdown to HTML with options passed directly
      const rawHtml = marked(this.updateBody, {
        breaks: true,
        gfm: true
      });

      // Sanitize HTML with strict URL protocol validation
      const sanitized = DOMPurify.sanitize(rawHtml, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'code', 'pre', 'blockquote', 'a'],
        ALLOWED_ATTR: ['href'],
        // Only allow safe URL protocols: https, http, mailto, tel
        ALLOWED_URI_REGEXP: /^(https?|mailto|tel):/i
      });

      // Use DOMParser for safer HTML parsing and add security attributes to all links
      const parser = new DOMParser();
      const doc = parser.parseFromString(sanitized, 'text/html');
      const links = doc.querySelectorAll('a');
      links.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
      });

      return doc.body.innerHTML;
    }
  },
  methods: {
    /**
     * Returns the i18n key for the dialog subtitle based on platform.
     * @returns {string} Translation key for Mac or Windows subtitle
     */
    getSubtitleKey() {
      return this.isMac ? 'macUpdateSubtitle' : 'windowsUpdateSubtitle';
    },
    /**
     * Returns the i18n key for the confirm button text based on platform.
     * @returns {string} Translation key for Mac download or Windows install button
     */
    getConfirmButtonKey() {
      return this.isMac ? 'downloadNow' : 'installNow';
    },
    show() {
      this.$refs.updateDialog.showModal();
    },
    close() {
      this.$refs.updateDialog.close();
    },
    handleConfirm() {
      this.$emit('confirm');
      this.close();
    },
    handleCancel() {
      this.$emit('cancel');
      this.close();
    }
  }
};
</script>

<style scoped>
/* Custom styles for markdown rendering */
.prose {
  color: inherit;
}

.prose p {
  margin-bottom: 0.75rem;
}

.prose ul,
.prose ol {
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose li {
  margin-bottom: 0.25rem;
}

.prose strong {
  font-weight: 600;
}

.prose code {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.prose pre {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.75rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 0.75rem;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.prose h1 {
  font-size: 1.5em;
}

.prose h2 {
  font-size: 1.25em;
}

.prose h3 {
  font-size: 1.1em;
}

.prose a {
  color: hsl(var(--p));
  text-decoration: underline;
}

.prose a:hover {
  opacity: 0.8;
}

.prose blockquote {
  border-left: 3px solid hsl(var(--p));
  padding-left: 1rem;
  font-style: italic;
  margin: 0.75rem 0;
}
</style>
