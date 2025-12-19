<template>
  <div class="support-center">
    <teleport to="body">
      <transition name="attachment-preview-fade">
        <div v-if="attachmentPreview.visible" class="attachment-preview-overlay" @click.self="closeAttachmentPreview">
          <div class="attachment-preview-modal" role="dialog" aria-modal="true">
            <header class="attachment-preview-header">
              <div class="attachment-preview-title">
                <span class="attachment-preview-name">{{ getActivePreviewName() || '-' }}</span>
                <span class="attachment-preview-count">{{ attachmentPreview.currentIndex + 1 }} /
                  {{ attachmentPreview.items.length }}</span>
              </div>
              <button type="button" class="btn btn-sm btn-circle preview-close" aria-label="Close preview"
                @click="closeAttachmentPreview">
                ×
              </button>
            </header>
            <div class="attachment-preview-body">
              <div v-if="attachmentPreview.loading" class="attachment-preview-loading">
                <span class="loading loading-spinner loading-lg"></span>
              </div>
              <div v-else-if="attachmentPreview.error" class="attachment-preview-error">
                {{ attachmentPreview.error }}
              </div>
              <template v-else>
                <img v-if="getActivePreviewType() === 'image' && getActivePreviewUrl()" :src="getActivePreviewUrl()"
                  :alt="getActivePreviewName()" />
                <video v-else-if="getActivePreviewType() === 'video' && getActivePreviewUrl()" controls autoplay muted
                  playsinline :src="getActivePreviewUrl()"></video>
                <div v-else class="attachment-preview-empty">
                  {{ $t('supportAttachmentUnsupported') }}
                </div>
              </template>
            </div>
            <footer class="attachment-preview-footer">
              <button type="button" class="btn btn-circle btn-outline btn-sm preview-nav"
                :disabled="attachmentPreview.items.length <= 1" aria-label="Previous attachment"
                @click="showPreviousAttachment">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <button type="button" class="btn btn-circle btn-outline btn-sm preview-nav"
                :disabled="attachmentPreview.items.length <= 1" aria-label="Next attachment"
                @click="showNextAttachment">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="m10 6 1.41 1.41L7.83 11H20v2H7.83l3.58 3.59L10 18l-6-6z" />
                </svg>
              </button>
            </footer>
          </div>
        </div>
      </transition>
    </teleport>
    <div v-if="viewMode === 'list'" class="support-list">
      <div class="list-header">
        <div class="titles">
          <h2 class="title">{{ $t('supportTicketsTitle') }}</h2>
          <p class="subtitle">{{ $t('supportTicketsSubtitle') }}</p>
        </div>
        <button class="btn btn-primary" @click="openForm">
          {{ $t('supportCreateTicketButton') }}
        </button>
      </div>

      <div class="table-wrapper">
        <table class="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t('supportColumnSubject') }}</th>
              <th>{{ $t('supportColumnStatus') }}</th>
              <th>{{ $t('supportColumnPriority') }}</th>
              <th>{{ $t('supportColumnUpdated') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="loading-cell">
                <span class="loading loading-spinner loading-sm mr-2"></span>
                {{ $t('supportLoading') }}
              </td>
            </tr>
            <tr v-else-if="!tickets.length">
              <td colspan="5" class="empty-cell">
                {{ $t('supportEmptyState') }}
              </td>
            </tr>
            <tr v-for="ticket in tickets" :key="ticket.id || ticket.ticket_no" :class="ticketRowClass(ticket)"
              role="button" tabindex="0" @click="openDetail(ticket)" @keydown.enter.prevent="openDetail(ticket)"
              @keydown.space.prevent="openDetail(ticket)">
              <td>#{{ ticket.ticket_no }}</td>
              <td class="subject-cell">
                <span v-if="isTicketUnread(ticket)"
                  class="mr-2 inline-block h-2 w-2 rounded-full bg-error align-middle"></span>
                <span :class="isTicketUnread(ticket) ? 'font-semibold' : ''">{{ ticket.subject }}</span>
              </td>
              <td>
                <span class="tag" :class="['tag', statusClass(ticket.status)]">{{ formatStatus(ticket.status) }}</span>
              </td>
              <td>
                <span class="tag priority" :class="['tag', priorityClass(ticket.priority)]">
                  {{ formatPriority(ticket.priority) }}
                </span>
              </td>
              <td>{{ formatDate(ticket.updated_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination" v-if="total > pageSize">
        <button class="btn btn-sm" :disabled="page === 1" @click="changePage(page - 1)">
          «
        </button>
        <span class="page-indicator">{{ page }} / {{ totalPages }}</span>
        <button class="btn btn-sm" :disabled="page >= totalPages" @click="changePage(page + 1)">
          »
        </button>
      </div>
    </div>

    <div v-else-if="viewMode === 'detail'" class="support-detail-wrapper">
      <div class="detail-header">
        <div class="detail-header-left">
          <button class="btn btn-outline btn-sm back-button" @click="backToList">
            <svg class="back-button-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path
                d="M9.78 3.22a.75.75 0 0 1 0 1.06L6.56 7.5H13a.75.75 0 0 1 0 1.5H6.56l3.22 3.22a.75.75 0 0 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0z"
                fill="currentColor" />
            </svg>
            <span>{{ $t('supportBackToList') }}</span>
          </button>
          <span class="detail-header-title">{{ currentTicket?.subject || '-' }}</span>
        </div>
        <div class="detail-header-actions">
          <!-- Buttons moved to reply-actions (to the right of the Clear button) -->
        </div>
      </div>

      <div v-if="detailLoading" class="detail-loading">
        <span class="loading loading-spinner loading-sm mr-2"></span>
        {{ $t('supportLoading') }}
      </div>
      <div v-else-if="!currentTicket" class="empty-cell">
        {{ $t('supportDetailMissing') }}
      </div>
      <div v-else class="detail-content">
        <section class="detail-card summary-card">
          <div class="summary-top">
            <div>
              <h3 class="summary-subject">{{ currentTicket.subject }}</h3>

              <dialog ref="attachment-preview" class="modal" role="dialog" aria-modal="true"
                @click="onAttachmentDialogClick" @close="onAttachmentDialogClose">
                <div class="attachment-preview-modal" role="document">
                  <header class="attachment-preview-header">
                    <div class="attachment-preview-title">
                      <span class="attachment-preview-name">{{ getActivePreviewName() || '-' }}</span>
                      <span class="attachment-preview-count">{{ attachmentPreview.currentIndex + 1 }} /
                        {{ attachmentPreview.items.length }}</span>
                    </div>
                    <button type="button" class="btn btn-sm btn-circle preview-close" aria-label="Close preview"
                      @click="closeAttachmentPreview">
                      ×
                    </button>
                  </header>
                  <div class="attachment-preview-body">
                    <div v-if="attachmentPreview.loading" class="attachment-preview-loading">
                      <span class="loading loading-spinner loading-lg"></span>
                    </div>
                    <div v-else-if="attachmentPreview.error" class="attachment-preview-error">
                      {{ attachmentPreview.error }}
                    </div>
                    <template v-else>
                      <img v-if="getActivePreviewType() === 'image' && getActivePreviewUrl()"
                        :src="getActivePreviewUrl()" :alt="getActivePreviewName()" />
                      <video v-else-if="getActivePreviewType() === 'video' && getActivePreviewUrl()" controls autoplay
                        muted playsinline :src="getActivePreviewUrl()"></video>
                      <div v-else class="attachment-preview-empty">
                        {{ $t('supportAttachmentUnsupported') }}
                      </div>
                    </template>
                  </div>
                  <footer class="attachment-preview-footer">
                    <button type="button" class="btn btn-circle btn-outline btn-sm preview-nav"
                      :disabled="attachmentPreview.items.length <= 1" aria-label="Previous attachment"
                      @click="showPreviousAttachment">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                      </svg>
                    </button>
                    <button type="button" class="btn btn-circle btn-outline btn-sm preview-nav"
                      :disabled="attachmentPreview.items.length <= 1" aria-label="Next attachment"
                      @click="showNextAttachment">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                      </svg>
                    </button>
                  </footer>
                </div>
              </dialog>
              <p class="summary-meta">
                #{{ currentTicket.ticket_no }} · {{ formatDate(currentTicket.updated_at) }}
              </p>
            </div>
            <div class="summary-tags">
              <span class="tag" :class="['tag', statusClass(currentTicket.status)]">{{
                formatStatus(currentTicket.status)
              }}</span>
              <span class="tag priority" :class="`priority-${currentTicket.priority}`">{{
                formatPriority(currentTicket.priority) }}</span>
            </div>
          </div>
          <div class="summary-footer">
            <span class="summary-source">{{ formatSource(currentTicket.source, currentTicket.client_app) }}</span>
            <span class="summary-updated">
              {{ $t('supportDetailLastMessage', { time: formatDate(currentTicket.last_message_at) }) }}
            </span>
          </div>
        </section>

        <section class="detail-card">
          <h4>{{ $t('supportDetailDevices') }}</h4>
          <div v-if="!detailDevices.length" class="empty-cell compact">{{ $t('supportDetailNoDevices') }}</div>
          <div v-else class="device-number-list">
            <span v-for="device in detailDevices" :key="device.id || device.real_serial || device.realSerial"
              class="badge badge-outline device-number-badge" :title="device.real_serial || device.realSerial || ''">
              {{ formatDeviceBadge(device) }}
            </span>
          </div>
        </section>

        <section class="detail-card reply-card">
          <h4>{{ $t('supportDetailReply') }}</h4>
          <textarea v-model="reply.body" class="textarea textarea-bordered w-full" rows="5"
            :placeholder="$t('supportDetailReplyPlaceholder')"></textarea>
          <div class="reply-attachments">
            <div class="attachments-toolbar">
              <button type="button" class="btn btn-outline btn-sm" @click="pickReplyAttachments">
                {{ $t('supportAttachmentsSelect') }}
              </button>
              <span class="attachments-hint">
                {{ $t('supportAttachmentsHint', {
                  size: formatBytes(replyAttachmentSizeLimit), count:
                    replyAttachmentCountLimit
                }) }}
              </span>
            </div>
            <ul v-if="reply.attachments.length" class="attachments-list">
              <li v-for="attachment in reply.attachments" :key="attachment.id" class="attachment-item">
                <span class="attachment-name">{{ attachment.fileName }}</span>
                <span class="attachment-size">{{ formatBytes(attachment.size) }}</span>
                <span class="attachment-type">{{ attachment.type.toUpperCase() }}</span>
                <span v-if="attachment.uploading" class="attachment-status uploading">
                  {{ $t('supportAttachmentUploading') }}
                </span>
                <span v-else-if="attachment.error" class="attachment-status error">
                  {{ $t('supportAttachmentFailed') }}
                </span>
                <button type="button" class="btn btn-ghost btn-xs attachment-remove"
                  @click="removeReplyAttachment(attachment.id)">
                  {{ $t('supportAttachmentRemove') }}
                </button>
              </li>
            </ul>
            <p v-else class="attachments-empty">{{ $t('supportAttachmentsEmpty') }}</p>
          </div>
          <div class="reply-options">
            <label class="label cursor-pointer">
              <input type="checkbox" class="checkbox checkbox-sm" v-model="reply.includeLogs" />
              <span class="label-text ml-2">{{ $t('supportDetailAttachLogs') }}</span>
            </label>
          </div>
          <div class="reply-actions">
            <button type="button" class="btn btn-primary btn-sm" :disabled="reply.sending || !reply.body.trim()"
              @click="submitReply">
              <span v-if="reply.sending" class="loading loading-spinner loading-xs mr-1"></span>
              {{ $t('supportDetailReplySubmit') }}
            </button>
            <button type="button" class="btn btn-outline btn-sm" :disabled="reply.sending" @click="resetReply">
              {{ $t('supportDetailReplyReset') }}
            </button>

            <!-- Moved from detail header: Refresh and Close buttons placed to the right of Clear -->
            <button type="button" class="btn btn-outline btn-sm ml-2" :disabled="detailLoading" @click="refreshDetail">
              <span v-if="detailLoading" class="loading loading-spinner loading-xs mr-1"></span>
              {{ $t('supportDetailRefresh') }}
            </button>
            <button type="button" class="btn btn-error btn-sm ml-2" :disabled="closingTicket || isTicketClosed"
              @click="closeTicket">
              <span v-if="closingTicket" class="loading loading-spinner loading-xs mr-1"></span>
              {{ $t('supportDetailCloseTicket') }}
            </button>
          </div>
        </section>

        <section class="detail-card conversation-card">
          <h4>{{ $t('supportDetailConversation') }}</h4>
          <div v-if="!messages.length" class="empty-cell compact">{{ $t('supportDetailNoMessages') }}</div>
          <div v-else class="conversation-list">
            <article v-for="message in messages" :key="message.id" class="conversation-item">
              <header class="conversation-header">
                <span class="message-role" :class="roleClass(message.role)">{{ formatRole(message.role) }}</span>
                <span class="message-time">{{ message.created_at_display }}</span>
              </header>
              <div class="conversation-body" v-html="renderMessageBody(message.body)"></div>
              <pre v-if="message.message_tail" class="conversation-tail">{{ message.message_tail }}</pre>
              <div v-if="hasMessageAttachments(message)" class="conversation-attachments">
                <div class="attachments-summary">
                  {{ $t('supportDetailAttachmentsSummary', { count: getMessageMediaAttachments(message).length }) }}
                </div>
                <div class="attachments-grid">
                  <button v-for="(attachment, index) in getMessageMediaAttachments(message)"
                    :key="attachment.id || attachment.storage_key || attachment.storageKey || `${message.id || 'msg'}-${index}`"
                    type="button" class="attachment-card" :aria-label="resolveAttachmentName(attachment, index)"
                    @click="openAttachmentPreview(message, index)"
                    @keydown.enter.prevent="openAttachmentPreview(message, index)"
                    @keydown.space.prevent="openAttachmentPreview(message, index)">
                    <div class="attachment-thumb" :class="`type-${getAttachmentMediaType(attachment)}`">
                      <template v-if="isImageAttachment(attachment)">
                        <img v-if="resolveAttachmentThumbnail(attachment)" :src="resolveAttachmentThumbnail(attachment)"
                          :alt="resolveAttachmentName(attachment, index)" />
                        <div v-else-if="attachmentHasPreviewError(attachment)"
                          class="attachment-thumb-placeholder error">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="currentColor"
                              d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 15a1.5 1.5 0 1 1 1.5-1.5A1.502 1.502 0 0 1 12 17zm1-4h-2V7h2z" />
                          </svg>
                        </div>
                        <div v-else class="attachment-thumb-placeholder">
                          <span class="loading loading-spinner loading-xs"></span>
                        </div>
                      </template>
                      <template v-else>
                        <div class="attachment-thumb-placeholder video">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="currentColor"
                              d="M4 4h11a2 2 0 0 1 2 2v2.382l3.447-1.724A1 1 0 0 1 21 7.553v8.894a1 1 0 0 1-1.553.895L17 15.618V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h11V6H4zm15 3.382-3 1.5v2.236l3 1.5V9.382z" />
                          </svg>
                        </div>
                      </template>
                    </div>
                    <div class="attachment-meta">
                      <span class="attachment-name" :title="resolveAttachmentName(attachment, index)">
                        {{ resolveAttachmentName(attachment, index) }}
                      </span>
                      <span class="attachment-type-label">{{ getAttachmentMediaType(attachment) }}</span>
                    </div>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>

    <div v-else class="support-form-wrapper">
      <div class="form-header">
        <button class="btn btn-outline btn-sm back-button" @click="backToList">
          <svg class="back-button-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path
              d="M9.78 3.22a.75.75 0 0 1 0 1.06L6.56 7.5H13a.75.75 0 0 1 0 1.5H6.56l3.22 3.22a.75.75 0 0 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0z"
              fill="currentColor" />
          </svg>
          <span>{{ $t('supportBackToList') }}</span>
        </button>
        <span>{{ $t('supportCreateTicketButton') }}</span>
      </div>
      <SupportForm :devices="devices" :seleced-devices="selecedDevices" :client-info="clientInfo"
        @submitted="handleFormSubmitted" @cancel="backToList" @update:selected="updateSelection" />
    </div>
  </div>
</template>

<script>
import SupportForm from './SupportForm.vue'
import { getName, getVersion } from '@tauri-apps/api/app'
import { open } from '@tauri-apps/api/dialog'
import { readBinaryFile, readTextFile, BaseDirectory } from '@tauri-apps/api/fs'
import { getSupportUnreadState, extractTicketKey } from '../../utils/supportNotifications.js'
import { setItem } from '../../utils/storage.js'

const SUPPORT_EMAIL_STORAGE_KEY = 'support_contact_email'
const MAX_REPLY_ATTACHMENTS = 6
const MAX_REPLY_ATTACHMENT_SIZE = 50 * 1024 * 1024
const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'heic']
const VIDEO_EXTENSIONS = ['mp4', 'mov', 'm4v', 'avi', 'mkv', 'webm']
const MEDIA_FILTERS = [
  {
    name: 'Images & Videos',
    extensions: [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS]
  }
]

export default {
  name: 'SupportCenter',
  components: { SupportForm },
  props: {
    devices: {
      type: Array,
      default: () => []
    },
    selecedDevices: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      viewMode: 'list',
      tickets: [],
      loading: false,
      clientInfo: {},
      page: 1,
      pageSize: 10,
      total: 0,
      detailLoading: false,
      currentTicket: null,
      ticketDetail: null,
      messages: [],
      devicesDetail: [],
      metadata: {},
      reply: {
        body: '',
        includeLogs: false,
        messageTail: '',
        attachment: null,
        preparedPackage: null,
        preparedSerials: [],
        preparationTask: null,
        preparationToken: 0,
        preparationError: null,
        sending: false,
        attachments: []
      },
      detailRetryHandle: null,
      highlightTicketNo: null,
      highlightTimerHandle: null,
      closingTicket: false,
      listeners: [],
      unreadTicketMap: {},
      attachmentPreview: {
        visible: false,
        items: [],
        currentIndex: 0,
        loading: false,
        error: null
      },
      attachmentPreviewCache: {},
      attachmentPreviewKeyHandler: null,
      agentBaseUrl: '',
      agentBaseUrlPromise: null
    }
  },
  computed: {
    totalPages() {
      if (!this.total) return 1
      return Math.ceil(this.total / this.pageSize)
    },
    clientInfoNormalized() {
      const info = this.clientInfo || {}
      return {
        app_name: info.app_name || info.appName || info.name || 'TikMatrix',
        client_version: info.client_version || info.clientVersion || info.version || '',
        app_version: info.app_version || info.appVersion || info.clientVersion || '',
      }
    },
    environmentClient() {
      return (this.metadata && this.metadata.client) || {}
    },
    environmentHost() {
      return (this.metadata && this.metadata.host) || {}
    },
    environmentNetwork() {
      return (this.metadata && this.metadata.network) || { lanIPs: [] }
    },
    detailDevices() {
      return Array.isArray(this.devicesDetail) ? this.devicesDetail : []
    },
    isTicketClosed() {
      const status = this.currentTicket?.status || this.currentTicket?.statusDb
      if (!status) return false
      return String(status).toLowerCase() === 'closed'
    },
    replyAttachmentSizeLimit() {
      return MAX_REPLY_ATTACHMENT_SIZE
    },
    replyAttachmentCountLimit() {
      return MAX_REPLY_ATTACHMENTS
    }
  },
  watch: {
    'reply.includeLogs'(newVal) {
      if (!newVal) {
        this.clearReplyPreparation()
        return
      }
      this.clearReplyPreparation()
      this.scheduleReplyLogPreparation()
    }
  },
  async created() {
    await this.initialize()
    await this.setupUnreadState()
    await this.registerSupportListeners()
  },
  beforeUnmount() {
    this.destroyListeners()
    this.disposeAttachmentPreview(true)
  },
  methods: {
    async setupUnreadState() {
      try {
        const state = await getSupportUnreadState()
        this.unreadTicketMap = { ...state.map }
        this.applyUnreadFlags()
      } catch (error) {
        console.error('support setupUnreadState error', error)
        this.unreadTicketMap = {}
      }
    },
    async resolveAgentBaseUrl() {
      if (this.agentBaseUrl) {
        return this.agentBaseUrl
      }
      if (this.agentBaseUrlPromise) {
        return this.agentBaseUrlPromise
      }

      const loader = (async () => {
        let port = '50809'
        try {
          const content = await readTextFile('port.txt', { dir: BaseDirectory.AppData })
          if (content && content.trim()) {
            port = content.trim()
          }
        } catch (error) {
          console.warn('support resolveAgentBaseUrl read port failed', error)
        }

        if (!port || port === '0') {
          port = '50809'
        }

        const baseUrl = `http://localhost:${port}`
        this.agentBaseUrl = baseUrl
        this.agentBaseUrlPromise = null
        return baseUrl
      })()

      this.agentBaseUrlPromise = loader
      return loader
    },
    async buildAttachmentStreamingUrl(params) {
      const baseUrl = await this.resolveAgentBaseUrl()
      if (!baseUrl) {
        return ''
      }

      const query = new URLSearchParams()
      if (params && typeof params === 'object') {
        Object.keys(params).forEach(key => {
          const value = params[key]
          if (value === undefined || value === null) {
            return
          }
          const text = String(value).trim()
          if (!text) {
            return
          }
          query.set(key, text)
        })
      }

      const queryString = query.toString()
      return `${baseUrl}/agent/api/support/download${queryString ? `?${queryString}` : ''}`
    },
    async registerSupportListeners() {
      if (typeof this.$listen !== 'function') {
        return
      }
      const unsubscribe = await this.$listen('supportUnreadChanged', async (event) => {
        const payload = event?.payload || {}
        if (payload.unreadMap && typeof payload.unreadMap === 'object') {
          this.unreadTicketMap = { ...payload.unreadMap }
          this.applyUnreadFlags()
        }
        if (Array.isArray(payload.updates) && payload.updates.length) {
          const ticketNo = payload.highlightTicketNo || extractTicketKey(payload.updates[0])
          if (ticketNo) {
            this.highlightTicket(ticketNo)
          }
        } else if (Array.isArray(payload.ticketNos) && payload.ticketNos.length) {
          this.applyUnreadFlags()
        }
      })
      this.listeners.push(unsubscribe)
    },
    destroyListeners() {
      if (!Array.isArray(this.listeners)) {
        this.listeners = []
        return
      }
      this.listeners.forEach(unsubscribe => {
        if (typeof unsubscribe === 'function') {
          unsubscribe()
        }
      })
      this.listeners = []
    },
    applyUnreadFlags() {
      if (!Array.isArray(this.tickets)) {
        return
      }
      const unread = this.unreadTicketMap || {}
      this.tickets = this.tickets.map(ticket => {
        const key = extractTicketKey(ticket)
        if (!key) {
          return { ...ticket, __unread: false }
        }
        const isUnread = Boolean(unread[key])
        if (ticket.__unread === isUnread) {
          return ticket
        }
        return { ...ticket, __unread: isUnread }
      })
    },
    isTicketUnread(ticket) {
      if (!ticket) return false
      if (typeof ticket.__unread === 'boolean') {
        return ticket.__unread
      }
      const key = extractTicketKey(ticket)
      return Boolean(key && this.unreadTicketMap[key])
    },
    async markTicketAsRead(ticket) {
      if (typeof this.$emiter !== 'function') {
        return
      }
      const key = extractTicketKey(ticket)
      if (!key) {
        return
      }
      await this.$emiter('supportMarkRead', { ticketNos: [key] })
    },
    highlightTicket(ticketNo) {
      if (!ticketNo) {
        return
      }
      this.highlightTicketNo = ticketNo
      if (this.highlightTimerHandle) {
        clearTimeout(this.highlightTimerHandle)
      }
      this.highlightTimerHandle = setTimeout(() => {
        this.highlightTicketNo = null
        this.highlightTimerHandle = null
      }, 5000)
    },
    async initialize() {
      await this.loadClientInfo()
      await this.fetchTickets()
    },
    async loadClientInfo() {
      try {
        const [appName, appVersion] = await Promise.all([getName(), getVersion()])
        this.clientInfo = {
          app_name: appName,
          client_version: appVersion,
          app_version: appVersion
        }
      } catch (error) {
        console.warn('Failed to load client info', error)
        this.clientInfo = {}
      }
    },
    normalizeTicketListPayload(response) {
      const payload = response?.data ?? response
      const data = payload?.data ?? payload ?? {}
      const items = Array.isArray(data.items) ? data.items : []
      const total = Number(data.total ?? payload?.total ?? items.length) || 0
      const page = Number(data.page ?? payload?.page ?? this.page) || this.page
      const limit = Number(data.limit ?? payload?.limit ?? this.pageSize) || this.pageSize
      return { items, total, page, limit }
    },
    async applyTicketListPayload(payload) {
      if (!payload) {
        this.tickets = []
        this.total = 0
      } else {
        this.tickets = Array.isArray(payload.items) ? payload.items : []
        await this.saveEmail();
        this.total = Number(payload.total) || 0
        if (Number.isFinite(payload.page) && payload.page >= 1) {
          this.page = payload.page
        }
        if (Number.isFinite(payload.limit) && payload.limit > 0) {
          this.pageSize = payload.limit
        }
      }
      this.applyUnreadFlags()
    },
    isValidEmail(value) {
      if (!value || typeof value !== 'string') return false
      const trimmed = value.trim()
      // basic RFC-like email regex (practical for form validation)
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    },
    async saveEmail() {
      try {
        const email = this.tickets.find(t => t.contact_email || t.contactEmail)?.contact_email || this.tickets.find(t => t.contact_email || t.contactEmail)?.contactEmail;
        if (email && this.isValidEmail(email)) {
          await setItem(SUPPORT_EMAIL_STORAGE_KEY, email)
        }
      } catch (error) {
        console.warn('saveEmail error', error)
      }
    },
    async fetchTickets() {
      this.loading = true
      try {
        const res = await this.$service.support_fetch_tickets({
          page: this.page,
          limit: this.pageSize
        })
        const normalized = this.normalizeTicketListPayload(res)
        await this.applyTicketListPayload(normalized)
      } catch (error) {
        console.error('support fetchTickets error', error)
        this.tickets = []
        this.total = 0
        this.applyUnreadFlags()
      } finally {
        this.loading = false
      }
    },
    async notify(type, message) {
      if (typeof this.$emiter === 'function') {
        await this.$emiter('NOTIFY', {
          type,
          message,
          timeout: 2000
        })
      } else {
        const logger = type === 'error' ? console.error : type === 'warning' ? console.warn : console.log
        logger(message)
      }
    },
    formatStatus(value) {
      switch ((value || '').toLowerCase()) {
        case 'open':
          return this.$t('supportStatusOpen')
        case 'pending':
          return this.$t('supportStatusPending')
        case 'closed':
          return this.$t('supportStatusClosed')
        default:
          return value || '-'
      }
    },
    formatPriority(value) {
      switch ((value || '').toLowerCase()) {
        case 'p1':
        case 'urgent':
          return this.$t('supportPriorityUrgent')
        case 'p2':
        case 'high':
          return this.$t('supportPriorityHigh')
        case 'p3':
        case 'normal':
          return this.$t('supportPriorityNormal')
        default:
          return value || '-'
      }
    },
    statusClass(status) {
      const s = (status || '').toString().toLowerCase()
      switch (s) {
        case 'open':
          return 'bg-primary/10 text-primary'
        case 'pending':
          return 'bg-success/10 text-success'
        case 'closed':
          return 'bg-neutral/10 text-neutral'
        default:
          return 'bg-base-200 text-base-content'
      }
    },
    priorityClass(priority) {
      const p = (priority || '').toString().toLowerCase()
      switch (p) {
        case 'p1':
        case 'urgent':
          return 'bg-error/10 text-error'
        case 'p2':
        case 'high':
          return 'bg-warning/10 text-warning'
        case 'p3':
        case 'normal':
          return 'bg-primary/10 text-primary'
        default:
          return 'bg-base-200 text-base-content'
      }
    },
    roleClass(role) {
      const r = (role || '').toString().toLowerCase()
      switch (r) {
        case 'agent':
        case 'support':
          return 'bg-primary/10 text-primary'
        case 'customer':
        case 'user':
          return 'bg-success/10 text-success'
        default:
          return 'bg-neutral/10 text-neutral'
      }
    },
    ticketRowClass(ticket) {
      const classes = ['ticket-row']
      if (this.highlightTicketNo && this.highlightTicketNo === (ticket.ticket_no || ticket.ticketNo)) {
        classes.push('bg-success/10')
      }
      if (this.isTicketUnread(ticket)) {
        classes.push('bg-error/10')
      }
      return classes
    },
    formatDate(value) {
      if (value === null || value === undefined || value === '') return '-'
      const numeric = Number(value)
      if (Number.isFinite(numeric)) {
        const date = new Date(numeric)
        if (!Number.isNaN(date.getTime())) {
          return date.toLocaleString()
        }
      }
      if (typeof value === 'string') {
        return value
      }
      return '-'
    },
    formatSource(source, clientApp) {
      if (clientApp && clientApp.trim()) {
        return clientApp
      }
      switch ((source || '').toLowerCase()) {
        case 'telegram':
          return 'Telegram'
        case 'email':
          return 'Email'
        case 'admin':
          return this.$t('supportDetailSourceAdmin')
        case 'app':
        case 'client':
          return this.$t('supportDetailSourceApp')
        default:
          return source || '-'
      }
    },
    formatRole(role) {
      switch ((role || '').toLowerCase()) {
        case 'agent':
        case 'support':
          return this.$t('supportDetailRoleAgent')
        case 'customer':
        case 'user':
          return this.$t('supportDetailRoleCustomer')
        default:
          return role || this.$t('supportDetailRoleUnknown')
      }
    },
    formatBoolean(value) {
      if (value === true) return this.$t('supportDetailYes')
      if (value === false) return this.$t('supportDetailNo')
      return '-'
    },
    formatList(list) {
      if (!list || (Array.isArray(list) && list.length === 0)) {
        return '-'
      }
      if (Array.isArray(list)) {
        return list.join(', ')
      }
      return String(list)
    },
    formatBytes(bytes) {
      if (!Number.isFinite(bytes) || bytes <= 0) {
        return '0 B'
      }
      const units = ['B', 'KB', 'MB', 'GB']
      const exp = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
      const value = bytes / 1024 ** exp
      return `${value.toFixed(exp === 0 ? 0 : 1)} ${units[exp]}`
    },
    async pickReplyAttachments() {
      try {
        if (this.reply.attachments.length >= this.replyAttachmentCountLimit) {
          await this.notify('warning', this.$t('supportAttachmentLimitReached', { count: this.replyAttachmentCountLimit }))
          return
        }
        const selection = await open({
          multiple: true,
          directory: false,
          filters: MEDIA_FILTERS
        })
        const paths = Array.isArray(selection) ? selection : selection ? [selection] : []
        if (!paths.length) {
          return
        }
        for (const filePath of paths) {
          if (this.reply.attachments.length >= this.replyAttachmentCountLimit) {
            await this.notify('warning', this.$t('supportAttachmentLimitReached', { count: this.replyAttachmentCountLimit }))
            break
          }
          await this.addReplyAttachmentFromPath(filePath)
        }
      } catch (error) {
        console.error('pickReplyAttachments error', error)
        await this.notify('error', this.$t('supportAttachmentSelectFailed'))
      }
    },
    async fetchAttachmentMetadata(path) {
      const result = {
        filePath: path,
        fileName: this.extractFileName(path),
        fileExtension: null,
        size: NaN,
        source: 'unknown'
      }
      if (!path) {
        return result
      }

      if (this.$service && typeof this.$service.support_file_info === 'function') {
        try {
          const response = await this.$service.support_file_info({ file_path: path })
          const data = response?.data ?? response
          if (data && typeof data === 'object') {
            if (typeof data.file_name === 'string' && data.file_name.trim()) {
              result.fileName = data.file_name.trim()
            }
            const size = Number(data.file_size ?? data.size)
            if (Number.isFinite(size) && size >= 0) {
              result.size = size
            }
            const extension = (data.file_extension ?? data.extension ?? '').toString().trim()
            if (extension) {
              result.fileExtension = extension.replace(/^\./, '').toLowerCase()
            }
            result.source = 'agent'
          }
        } catch (error) {
          console.warn('support_file_info metadata error', error)
        }
      }

      if (!Number.isFinite(result.size) || result.size <= 0) {
        try {
          const bytes = await readBinaryFile(path)
          const size = Number(bytes?.length ?? bytes?.byteLength ?? 0)
          if (Number.isFinite(size) && size > 0) {
            result.size = size
            result.source = result.source === 'agent' ? 'agent-fallback' : 'tauri'
          }
        } catch (error) {
          console.warn('fallback readBinaryFile metadata error', error)
        }
      }

      return result
    },
    async addReplyAttachmentFromPath(path) {
      const normalizedPath = typeof path === 'string' ? path : ''
      if (!normalizedPath) {
        return
      }
      if (this.reply.attachments.some(item => item.path === normalizedPath)) {
        await this.notify('warning', this.$t('supportAttachmentDuplicate'))
        return
      }
      try {
        const metadata = await this.fetchAttachmentMetadata(normalizedPath)
        const size = Number(metadata?.size)
        if (!Number.isFinite(size) || size <= 0) {
          await this.notify('warning', this.$t('supportAttachmentInvalid'))
          return
        }
        if (size > this.replyAttachmentSizeLimit) {
          await this.notify('warning', this.$t('supportAttachmentTooLarge', { size: this.formatBytes(this.replyAttachmentSizeLimit) }))
          return
        }
        let fileName = (metadata?.fileName || '').trim() || this.extractFileName(normalizedPath)
        const extension = (metadata?.fileExtension || '').toLowerCase()
        if (extension && !fileName.toLowerCase().endsWith(`.${extension}`)) {
          fileName = `${fileName}.${extension}`
        }
        const contentType = this.guessContentType(fileName)
        const attachmentType = this.classifyAttachmentType(contentType, fileName)
        if (attachmentType === 'other') {
          await this.notify('warning', this.$t('supportAttachmentUnsupported'))
          return
        }
        const attachmentId = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `att-${Date.now()}-${Math.random().toString(16).slice(2)}`
        this.reply.attachments = [
          ...this.reply.attachments,
          {
            id: attachmentId,
            path: normalizedPath,
            fileName,
            size,
            contentType,
            type: attachmentType,
            uploading: false,
            uploadResult: null,
            error: null,
            metadataSource: metadata?.source || 'unknown'
          }
        ]
      } catch (error) {
        console.error('addReplyAttachmentFromPath error', error)
        await this.notify('error', this.$t('supportAttachmentReadFailed'))
      }
    },
    removeReplyAttachment(id) {
      this.reply.attachments = this.reply.attachments.filter(item => item.id !== id)
    },
    extractFileName(path) {
      if (!path) {
        return 'attachment.bin'
      }
      const segments = path.split(/[/\\]/)
      return segments[segments.length - 1] || 'attachment.bin'
    },
    guessContentType(fileName) {
      if (!fileName) {
        return 'application/octet-stream'
      }
      const ext = fileName.split('.').pop()?.toLowerCase()
      if (!ext) {
        return 'application/octet-stream'
      }
      if (IMAGE_EXTENSIONS.includes(ext)) {
        if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
        if (ext === 'png') return 'image/png'
        if (ext === 'gif') return 'image/gif'
        if (ext === 'webp') return 'image/webp'
        if (ext === 'bmp') return 'image/bmp'
        if (ext === 'heic') return 'image/heic'
        return `image/${ext}`
      }
      if (VIDEO_EXTENSIONS.includes(ext)) {
        if (ext === 'mp4' || ext === 'm4v') return 'video/mp4'
        if (ext === 'mov') return 'video/quicktime'
        if (ext === 'avi') return 'video/x-msvideo'
        if (ext === 'webm') return 'video/webm'
        if (ext === 'mkv') return 'video/x-matroska'
        return `video/${ext}`
      }
      return 'application/octet-stream'
    },
    classifyAttachmentType(contentType, fileName) {
      const normalized = (contentType || '').toLowerCase()
      if (normalized.startsWith('image/')) {
        return 'image'
      }
      if (normalized.startsWith('video/')) {
        return 'video'
      }
      const ext = fileName?.split('.').pop()?.toLowerCase()
      if (ext && IMAGE_EXTENSIONS.includes(ext)) {
        return 'image'
      }
      if (ext && VIDEO_EXTENSIONS.includes(ext)) {
        return 'video'
      }
      return 'other'
    },
    async ensureReplyAttachmentUpload(item, serials) {
      if (!item) {
        return null
      }
      if (item.uploadResult) {
        return item.uploadResult
      }
      item.uploading = true
      item.error = null
      try {
        const response = await this.$service.support_upload({
          file_path: item.path,
          file_name: item.fileName,
          content_type: item.contentType,
          file_size: item.size,
          serials,
          attachment_meta: {
            type: item.type,
            originalName: item.fileName
          },
          client_app: this.clientInfoNormalized.app_name,
          client_version: this.clientInfoNormalized.client_version,
          skip_cache: true
        })
        const attachment = this.parseUploadResponse(response, {
          fileName: item.fileName,
          fileSize: item.size,
          contentType: item.contentType,
          serials,
          type: item.type
        })
        item.uploadResult = attachment
        return attachment
      } catch (error) {
        item.error = error
        throw error
      } finally {
        item.uploading = false
      }
    },
    async uploadReplyCustomAttachments(serials) {
      if (!Array.isArray(this.reply.attachments) || !this.reply.attachments.length) {
        return []
      }
      const uploads = []
      for (const item of this.reply.attachments) {
        try {
          const result = await this.ensureReplyAttachmentUpload(item, serials)
          if (result) {
            uploads.push(result)
          }
        } catch (error) {
          console.error('uploadReplyCustomAttachments error', error)
          const message = error?.message || this.$t('supportAttachmentUploadFailed')
          await this.notify('error', message)
          throw error
        }
      }
      return uploads
    },
    hasMessageAttachments(message) {
      return this.getMessageMediaAttachments(message).length > 0
    },
    getMessageMediaAttachments(message) {
      if (!Array.isArray(message?.attachments) || !message.attachments.length) {
        return []
      }
      const mediaAttachments = message.attachments.filter(attachment => this.isMediaAttachment(attachment))
      mediaAttachments.forEach(attachment => this.prepareAttachmentPreview(attachment))
      return mediaAttachments
    },
    isMediaAttachment(attachment) {
      if (!attachment || typeof attachment !== 'object') {
        return false
      }
      if (attachment.__mediaType) {
        return attachment.__mediaType === 'image' || attachment.__mediaType === 'video'
      }
      const typeHint = this.normalizeMetadataField(
        attachment.type,
        attachment.attachment_type,
        attachment.attachmentType,
        attachment.category
      ).toLowerCase()
      let resolvedType = ''
      if (typeHint.includes('image')) {
        resolvedType = 'image'
      } else if (typeHint.includes('video')) {
        resolvedType = 'video'
      }
      if (!resolvedType) {
        const contentType = this.normalizeMetadataField(
          attachment.content_type,
          attachment.contentType,
          attachment.mime,
          attachment.mime_type,
          attachment.mimeType,
          attachment.file_type,
          attachment.fileType
        )
        const fileName = this.resolveAttachmentFileName(attachment)
        const classified = this.classifyAttachmentType(contentType, fileName)
        if (classified === 'image' || classified === 'video') {
          resolvedType = classified
        }
      }
      if (resolvedType) {
        attachment.__mediaType = resolvedType
      }
      return resolvedType === 'image' || resolvedType === 'video'
    },
    getAttachmentMediaType(attachment) {
      if (!attachment || typeof attachment !== 'object') {
        return 'other'
      }
      if (attachment.__mediaType) {
        return attachment.__mediaType
      }
      this.isMediaAttachment(attachment)
      return attachment.__mediaType || 'other'
    },
    isImageAttachment(attachment) {
      return this.getAttachmentMediaType(attachment) === 'image'
    },
    isVideoAttachment(attachment) {
      return this.getAttachmentMediaType(attachment) === 'video'
    },
    resolveAttachmentFileName(attachment) {
      if (!attachment || typeof attachment !== 'object') {
        return ''
      }
      return this.normalizeMetadataField(
        attachment.file_name,
        attachment.fileName,
        attachment.filename,
        attachment.originalName,
        attachment.storage_key,
        attachment.storageKey,
        attachment.key
      )
    },
    resolveAttachmentName(attachment, index = 0) {
      const name = this.resolveAttachmentFileName(attachment)
      if (name) {
        return name
      }
      return this.$t('supportDetailAttachmentDefaultName', { index: index + 1 })
    },
    getAttachmentCacheKey(attachment) {
      if (!attachment || typeof attachment !== 'object') {
        return ''
      }
      const metadata = this.parseMaybeJson(attachment.metadata) ||
        (attachment.metadata && typeof attachment.metadata === 'object' ? attachment.metadata : null)
      const storageKey = this.normalizeMetadataField(
        attachment.storage_key,
        attachment.storageKey,
        attachment.key,
        metadata?.storage_key,
        metadata?.storageKey,
        metadata?.key
      )
      if (storageKey) {
        return `storage:${storageKey}`
      }
      const attachmentId = this.normalizeMetadataField(
        attachment.attachment_id,
        attachment.attachmentId,
        attachment.id,
        metadata?.attachment_id,
        metadata?.attachmentId,
        metadata?.id
      )
      if (attachmentId) {
        return `id:${attachmentId}`
      }
      const fileName = this.resolveAttachmentFileName(attachment)
      if (fileName) {
        return `name:${fileName}`
      }
      return ''
    },
    buildAttachmentDownloadParams(attachment) {
      if (!attachment || typeof attachment !== 'object') {
        return null
      }
      const metadata = this.parseMaybeJson(attachment.metadata) ||
        (attachment.metadata && typeof attachment.metadata === 'object' ? attachment.metadata : null)
      const params = {}
      const storageKey = this.normalizeMetadataField(
        attachment.storage_key,
        attachment.storageKey,
        attachment.key,
        metadata?.storage_key,
        metadata?.storageKey,
        metadata?.key
      )
      if (storageKey) {
        params.storage_key = storageKey
      }
      const attachmentId = this.normalizeMetadataField(
        attachment.attachment_id,
        attachment.attachmentId,
        attachment.id,
        metadata?.attachment_id,
        metadata?.attachmentId,
        metadata?.id
      )
      if (attachmentId) {
        params.attachment_id = attachmentId
      }
      const fileName = this.resolveAttachmentFileName(attachment)
      if (fileName) {
        params.file_name = fileName
      }
      return Object.keys(params).length ? params : null
    },
    setPreviewCacheEntry(key, entry) {
      if (!key) {
        return entry
      }
      this.attachmentPreviewCache = {
        ...this.attachmentPreviewCache,
        [key]: entry
      }
      return entry
    },
    updatePreviewCacheEntry(key, patch) {
      if (!key) {
        return null
      }
      const existing = this.attachmentPreviewCache[key] || {}
      const entry = { ...existing, ...patch }
      return this.setPreviewCacheEntry(key, entry)
    },
    ensurePreviewCacheEntry(attachment) {
      const key = this.getAttachmentCacheKey(attachment)
      if (!key) {
        return null
      }
      const existing = this.attachmentPreviewCache[key]
      if (existing) {
        return existing
      }
      const params = this.buildAttachmentDownloadParams(attachment)
      const mimeType = this.normalizeMetadataField(
        attachment.content_type,
        attachment.contentType,
        attachment.mime,
        attachment.mime_type,
        attachment.mimeType,
        attachment.file_type,
        attachment.fileType
      )
      const entry = {
        key,
        params,
        type: this.getAttachmentMediaType(attachment),
        fileName: this.resolveAttachmentFileName(attachment),
        mimeType,
        blobUrl: '',
        loaded: false,
        loading: false,
        error: null,
        promise: null,
        bytesLength: 0,
        isStreaming: false
      }
      return this.setPreviewCacheEntry(key, entry)
    },
    prepareAttachmentPreview(attachment) {
      if (!attachment || typeof attachment !== 'object') {
        return
      }
      if (attachment.__previewPrepared) {
        return
      }
      attachment.__previewPrepared = true
      const entry = this.ensurePreviewCacheEntry(attachment)
      if (!entry || !entry.params) {
        return
      }
      if (this.isImageAttachment(attachment) && !entry.loaded && !entry.loading) {
        this.loadAttachmentPreview(attachment).catch(error => {
          console.warn('support prepareAttachmentPreview error', error)
        })
      }
    },
    normalizeBinaryData(data) {
      if (!data) {
        return null
      }
      if (data instanceof Uint8Array) {
        return data
      }
      if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer.slice(0))
      }
      if (data instanceof ArrayBuffer) {
        return new Uint8Array(data)
      }
      if (Array.isArray(data)) {
        return Uint8Array.from(data)
      }
      if (typeof data === 'object' && data.type === 'Buffer' && Array.isArray(data.data)) {
        return Uint8Array.from(data.data)
      }
      if (typeof data === 'string') {
        try {
          return Uint8Array.from(atob(data), char => char.charCodeAt(0))
        } catch (error) {
          console.warn('normalizeBinaryData base64 decode failed', error)
          return null
        }
      }
      return null
    },
    extractResponseHeader(headers, name) {
      if (!headers) {
        return ''
      }
      try {
        if (typeof headers.get === 'function') {
          const value = headers.get(name)
          if (Array.isArray(value)) {
            return value[0] || ''
          }
          return value || ''
        }
      } catch (error) {
        console.warn('extractResponseHeader get failed', error)
      }
      const lower = name.toLowerCase()
      if (typeof headers === 'object') {
        const keys = Object.keys(headers)
        for (const key of keys) {
          if (key.toLowerCase() === lower) {
            const value = headers[key]
            if (Array.isArray(value)) {
              return value[0] || ''
            }
            if (value && typeof value === 'object' && typeof value.value === 'string') {
              return value.value
            }
            return value || ''
          }
        }
      }
      return ''
    },
    extractFilenameFromDisposition(headerValue) {
      if (!headerValue || typeof headerValue !== 'string') {
        return ''
      }
      const segments = headerValue.split(';')
      for (const segment of segments) {
        const trimmed = segment.trim()
        if (!trimmed) {
          continue
        }
        if (trimmed.toLowerCase().startsWith("filename*=")) {
          const value = trimmed.split('=')[1] || ''
          const encoded = value.replace(/^[^']*''/, '')
          try {
            return decodeURIComponent(encoded.replace(/^"|"$/g, ''))
          } catch (error) {
            console.warn('extractFilenameFromDisposition decode failed', error)
            return encoded
          }
        }
        if (trimmed.toLowerCase().startsWith('filename=')) {
          return trimmed.replace(/^filename=/i, '').replace(/^"|"$/g, '')
        }
      }
      return ''
    },
    async loadAttachmentPreview(attachment, options = {}) {
      const { force = false } = options || {}
      const entry = this.ensurePreviewCacheEntry(attachment)
      if (!entry) {
        throw new Error('ATTACHMENT_PREVIEW_MISSING_KEY')
      }
      if (entry.loaded && !force) {
        return entry
      }
      if (entry.promise && !force) {
        return entry.promise
      }
      const params = entry.params || this.buildAttachmentDownloadParams(attachment)
      if (!params || !Object.keys(params).length) {
        throw new Error('ATTACHMENT_PREVIEW_MISSING_PARAMS')
      }

      const entryType = entry.type || this.getAttachmentMediaType(attachment)
      if (entryType === 'video') {
        const streamingPromise = (async () => {
          try {
            this.updatePreviewCacheEntry(entry.key, { loading: true, error: null })
            const streamUrl = await this.buildAttachmentStreamingUrl(params)
            if (!streamUrl) {
              throw new Error('ATTACHMENT_PREVIEW_STREAM_URL_MISSING')
            }
            const updated = this.updatePreviewCacheEntry(entry.key, {
              blobUrl: streamUrl,
              mimeType: entry.mimeType || 'video/*',
              fileName: entry.fileName || this.resolveAttachmentFileName(attachment),
              loaded: true,
              loading: false,
              error: null,
              promise: null,
              bytesLength: 0,
              isStreaming: true
            })
            return updated
          } catch (error) {
            this.updatePreviewCacheEntry(entry.key, {
              loading: false,
              loaded: false,
              promise: null,
              error: error?.message || String(error),
              isStreaming: false
            })
            throw error
          }
        })()
        this.updatePreviewCacheEntry(entry.key, { promise: streamingPromise, loading: true, error: null })
        return streamingPromise
      }

      const downloadPromise = (async () => {
        try {
          this.updatePreviewCacheEntry(entry.key, { loading: true, error: null })
          const response = await this.$service.support_download_attachment(params)
          const bytes = this.normalizeBinaryData(response?.data)
          if (!bytes || !bytes.length) {
            throw new Error('ATTACHMENT_PREVIEW_EMPTY')
          }
          const contentTypeHeader = this.extractResponseHeader(response?.headers, 'content-type')
          const dispositionHeader = this.extractResponseHeader(response?.headers, 'content-disposition')
          const mimeType = contentTypeHeader || entry.mimeType || (this.isImageAttachment(attachment) ? 'image/*' : 'video/*')
          const fileName = this.extractFilenameFromDisposition(dispositionHeader) || entry.fileName || this.resolveAttachmentFileName(attachment)
          if (entry.blobUrl && String(entry.blobUrl).startsWith('blob:')) {
            try {
              URL.revokeObjectURL(entry.blobUrl)
            } catch (error) {
              console.warn('attachment preview revoke failed', error)
            }
          }
          const blob = new Blob([bytes], { type: mimeType || 'application/octet-stream' })
          const objectUrl = URL.createObjectURL(blob)
          const updated = this.updatePreviewCacheEntry(entry.key, {
            blobUrl: objectUrl,
            mimeType,
            fileName,
            loaded: true,
            loading: false,
            error: null,
            promise: null,
            bytesLength: bytes.length,
            isStreaming: false
          })
          return updated
        } catch (error) {
          this.updatePreviewCacheEntry(entry.key, {
            loading: false,
            loaded: false,
            promise: null,
            error: error?.message || String(error),
            isStreaming: false
          })
          throw error
        }
      })()
      this.updatePreviewCacheEntry(entry.key, { promise: downloadPromise, loading: true, error: null })
      return downloadPromise
    },
    async ensurePreviewForIndex(index) {
      const items = Array.isArray(this.attachmentPreview.items) ? this.attachmentPreview.items : []
      if (!items.length) {
        return null
      }
      const bounded = Math.min(Math.max(index, 0), items.length - 1)
      const item = items[bounded]
      if (!item) {
        return null
      }
      const entry = this.ensurePreviewCacheEntry(item.attachment)
      if (entry && entry.loaded) {
        this.attachmentPreview.loading = false
        this.attachmentPreview.error = null
        return entry
      }
      this.attachmentPreview.loading = true
      this.attachmentPreview.error = null
      try {
        const result = await this.loadAttachmentPreview(item.attachment)
        this.attachmentPreview.loading = false
        this.attachmentPreview.error = null
        return result
      } catch (error) {
        const message = error?.message || this.$t('supportAttachmentPreviewFailed')
        this.attachmentPreview.loading = false
        this.attachmentPreview.error = message
        return null
      }
    },
    getAttachmentPreviewEntry(attachment) {
      const key = this.getAttachmentCacheKey(attachment)
      if (!key) {
        return null
      }
      return this.attachmentPreviewCache[key] || null
    },
    resolveAttachmentThumbnail(attachment) {
      const entry = this.getAttachmentPreviewEntry(attachment)
      return entry?.blobUrl || ''
    },
    getActivePreviewState() {
      const items = Array.isArray(this.attachmentPreview.items) ? this.attachmentPreview.items : []
      if (!items.length) {
        return { item: null, entry: null }
      }
      const index = Math.min(Math.max(this.attachmentPreview.currentIndex, 0), items.length - 1)
      const item = items[index]
      const entry = item ? this.getAttachmentPreviewEntry(item.attachment) : null
      return { item, entry }
    },
    getActivePreviewUrl() {
      const { entry } = this.getActivePreviewState()
      return entry?.blobUrl || ''
    },
    getActivePreviewType() {
      const { item } = this.getActivePreviewState()
      return item?.type || 'other'
    },
    getActivePreviewName() {
      const { item } = this.getActivePreviewState()
      return item?.name || ''
    },
    attachmentHasPreviewError(attachment) {
      const entry = this.getAttachmentPreviewEntry(attachment)
      return Boolean(entry && entry.error)
    },
    async openAttachmentPreview(message, index = 0) {
      const attachments = this.getMessageMediaAttachments(message)
      if (!attachments.length) {
        return
      }
      const items = attachments.map((attachment, idx) => ({
        cacheKey: this.getAttachmentCacheKey(attachment) || `inline-${idx}`,
        attachment,
        name: this.resolveAttachmentName(attachment, idx),
        type: this.getAttachmentMediaType(attachment)
      }))
      const boundedIndex = Math.min(Math.max(index, 0), items.length - 1)
      Object.assign(this.attachmentPreview, {
        visible: true,
        items,
        currentIndex: boundedIndex,
        loading: false,
        error: null
      })
      this.bindAttachmentPreviewKeydown()
      // Prefer native dialog when available
      try {
        const dlg = this.$refs['attachment-preview']
        if (dlg && typeof dlg.showModal === 'function') {
          dlg.showModal()
        }
      } catch (e) {
        // ignore
      }
      await this.ensurePreviewForIndex(boundedIndex)
    },
    async onAttachmentPreviewNavigate(offset) {
      if (!this.attachmentPreview.visible) {
        return
      }
      const items = Array.isArray(this.attachmentPreview.items) ? this.attachmentPreview.items : []
      if (!items.length) {
        return
      }
      let nextIndex = this.attachmentPreview.currentIndex + offset
      if (nextIndex < 0) {
        nextIndex = items.length - 1
      } else if (nextIndex >= items.length) {
        nextIndex = 0
      }
      this.attachmentPreview.currentIndex = nextIndex
      await this.ensurePreviewForIndex(nextIndex)
    },
    async showNextAttachment() {
      await this.onAttachmentPreviewNavigate(1)
    },
    async showPreviousAttachment() {
      await this.onAttachmentPreviewNavigate(-1)
    },
    async jumpToAttachment(index) {
      if (!this.attachmentPreview.visible) {
        return
      }
      const items = Array.isArray(this.attachmentPreview.items) ? this.attachmentPreview.items : []
      if (!items.length) {
        return
      }
      const bounded = Math.min(Math.max(index, 0), items.length - 1)
      this.attachmentPreview.currentIndex = bounded
      await this.ensurePreviewForIndex(bounded)
    },
    handleAttachmentPreviewKeydown(event) {
      if (!this.attachmentPreview.visible) {
        return
      }
      const key = event.key
      if (key === 'Escape' || key === 'Esc') {
        event.preventDefault()
        this.closeAttachmentPreview()
        return
      }
      if (key === 'ArrowRight' || key === 'Right') {
        event.preventDefault()
        this.showNextAttachment()
        return
      }
      if (key === 'ArrowLeft' || key === 'Left') {
        event.preventDefault()
        this.showPreviousAttachment()
        return
      }
      if (key === 'Home') {
        event.preventDefault()
        this.jumpToAttachment(0)
        return
      }
      if (key === 'End') {
        event.preventDefault()
        const lastIndex = (this.attachmentPreview.items?.length || 1) - 1
        this.jumpToAttachment(lastIndex)
      }
    },
    bindAttachmentPreviewKeydown() {
      if (this.attachmentPreviewKeyHandler) {
        return
      }
      if (typeof window === 'undefined') {
        return
      }
      this.attachmentPreviewKeyHandler = event => this.handleAttachmentPreviewKeydown(event)
      window.addEventListener('keydown', this.attachmentPreviewKeyHandler)
    },
    unbindAttachmentPreviewKeydown() {
      if (!this.attachmentPreviewKeyHandler) {
        return
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', this.attachmentPreviewKeyHandler)
      }
      this.attachmentPreviewKeyHandler = null
    },
    closeAttachmentPreview() {
      if (!this.attachmentPreview.visible) {
        return
      }
      // Attempt to close native dialog if used
      try {
        const dlg = this.$refs['attachment-preview']
        if (dlg && typeof dlg.close === 'function') {
          dlg.close()
        }
      } catch (e) {
        // ignore
      }
      this.unbindAttachmentPreviewKeydown()
      Object.assign(this.attachmentPreview, {
        visible: false,
        items: [],
        currentIndex: 0,
        loading: false,
        error: null
      })
    },

    onAttachmentDialogClick(event) {
      // If user clicked on dialog backdrop (the dialog element itself), close it
      try {
        const dlg = this.$refs['attachment-preview']
        if (event.target === dlg) {
          this.closeAttachmentPreview()
        }
      } catch (e) {
        // ignore
      }
    },

    onAttachmentDialogClose(/* event */) {
      // Ensure state is cleaned when native dialog is closed
      this.unbindAttachmentPreviewKeydown()
      this.attachmentPreview.visible = false
      this.attachmentPreview.items = []
      this.attachmentPreview.currentIndex = 0
      this.attachmentPreview.loading = false
      this.attachmentPreview.error = null
    },
    disposeAttachmentPreview(force = false) {
      this.unbindAttachmentPreviewKeydown()
      Object.assign(this.attachmentPreview, {
        visible: false,
        items: [],
        currentIndex: 0,
        loading: false,
        error: null
      })
      // Close native dialog if present
      try {
        const dlg = this.$refs['attachment-preview']
        if (dlg && typeof dlg.close === 'function') {
          dlg.close()
        }
      } catch (e) {
        // ignore
      }
      if (force) {
        const entries = Object.values(this.attachmentPreviewCache || {})
        entries.forEach(entry => {
          if (entry && entry.blobUrl && String(entry.blobUrl).startsWith('blob:')) {
            try {
              URL.revokeObjectURL(entry.blobUrl)
            } catch (error) {
              console.warn('disposeAttachmentPreview revoke failed', error)
            }
          }
        })
        this.attachmentPreviewCache = {}
      }
    },
    formatConnection(value) {
      if (!value) return '-'
      const normalized = String(value).trim().toUpperCase()
      if (normalized === 'USB') return 'USB'
      if (normalized === 'TCP') return 'TCP'
      return value
    },
    parseMaybeJson(value) {
      if (!value) return null
      if (typeof value === 'object') return value
      if (typeof value === 'string') {
        try {
          return JSON.parse(value)
        } catch (error) {
          return null
        }
      }
      return null
    },
    // Sanitize simple HTML for message bodies.
    // Allow a small whitelist of tags and only safe attributes for <a>.
    sanitizeHtml(html) {
      if (html === null || html === undefined) return ''
      const ALLOWED_TAGS = ['b', 'strong', 'i', 'em', 'u', 'br', 'p', 'a', 'ul', 'ol', 'li', 'code', 'pre']
      try {
        const parser = new DOMParser()
        const doc = parser.parseFromString(String(html), 'text/html')
        const walk = node => {
          if (!node) return
          const nodeType = node.nodeType
          if (nodeType === Node.TEXT_NODE) return
          if (nodeType !== Node.ELEMENT_NODE) {
            node.remove()
            return
          }
          const tag = node.tagName.toLowerCase()
          if (!ALLOWED_TAGS.includes(tag)) {
            // unwrap unknown element but keep children
            const parent = node.parentNode
            const children = Array.from(node.childNodes || [])
            for (const child of children) parent.insertBefore(child, node)
            parent.removeChild(node)
            for (const child of children) walk(child)
            return
          }
          // sanitize attributes
          const attrs = Array.from(node.attributes || [])
          for (const attr of attrs) {
            const name = attr.name.toLowerCase()
            const value = attr.value || ''
            if (name.startsWith('on')) {
              node.removeAttribute(attr.name)
              continue
            }
            // disallow style, id, class to avoid injection via css or selectors
            if (name === 'style' || name === 'id' || name === 'class') {
              node.removeAttribute(attr.name)
              continue
            }
            if (tag === 'a' && name === 'href') {
              const url = value.trim()
              // allow http(s), mailto, tel only
              if (!/^(https?:|mailto:|tel:)/i.test(url)) {
                node.removeAttribute('href')
              } else {
                // enforce safe target/rel
                node.setAttribute('target', '_blank')
                node.setAttribute('rel', 'noopener noreferrer')
                node.setAttribute('href', url)
              }
              continue
            }
            // remove any other attributes
            node.removeAttribute(attr.name)
          }
          // recurse children
          const children = Array.from(node.childNodes || [])
          for (const child of children) walk(child)
        }

        const body = doc.body
        const children = Array.from(body.childNodes)
        for (const child of children) walk(child)
        return body.innerHTML
      } catch (error) {
        // fallback to escaped text
        const escaped = String(html)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
        return escaped.replace(/\r?\n/g, '<br>')
      }
    },

    renderMessageBody(body) {
      if (body === null || body === undefined) return ''
      const str = typeof body === 'string' ? body : String(body)
      // if contains possible tags, sanitize and render; otherwise escape and convert newlines
      if (str.includes('<') && str.includes('>')) {
        return this.sanitizeHtml(str)
      }
      const escaped = str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
      return escaped.replace(/\r?\n/g, '<br>')
    },
    toArray(value) {
      if (!value) return []
      if (Array.isArray(value)) {
        return value.filter(item => item !== undefined && item !== null)
      }
      if (typeof value === 'object') {
        return Object.keys(value)
          .map(key => value[key])
          .filter(item => item !== undefined && item !== null)
      }
      return []
    },
    normalizeDetailDevices(detail) {
      const ticketData = detail?.ticket || this.currentTicket || {}
      const ticketMeta = this.parseMaybeJson(ticketData.metadata) || ticketData.metadata || {}
      const detailMeta = this.parseMaybeJson(detail?.metadata) || detail?.metadata || {}
      const primary = this.toArray(detail?.devices)
        .map(device => this.decorateDeviceEntry(device, ticketData))
        .filter(Boolean)
      if (primary.length) {
        return primary
      }
      const candidateSources = [
        ticketData?.devices,
        ticketMeta?.devices,
        detailMeta?.devices
      ]
      for (const source of candidateSources) {
        const list = this.toArray(source)
          .map(device => this.decorateMetadataDevice(device, ticketData))
          .filter(Boolean)
        if (list.length) {
          return list
        }
      }
      return []
    },
    buildDeviceMetadata(device) {
      if (!device || typeof device !== 'object') {
        return {}
      }
      const metaSource =
        this.parseMaybeJson(device.metadata) ||
        this.parseMaybeJson(device.meta) ||
        (device.metadata && typeof device.metadata === 'object' ? device.metadata : {}) ||
        {}
      const metadata = {}
      const pick = (...keys) => this.normalizeMetadataField(
        ...keys.map(key => metaSource[key]),
        ...keys.map(key => device[key])
      )

      const name = pick('name', 'displayName', 'display_name')
      if (name) metadata.name = name

      const product = pick('product')
      if (product) metadata.product = product

      const model = pick('model', 'mode')
      if (model) metadata.model = model

      const status = pick('status')
      if (status) metadata.status = status

      const group = pick('group', 'group_id', 'groupId')
      if (group) metadata.group = group

      const forwardPort = pick('forwardPort', 'forward_port')
      if (forwardPort) metadata.forwardPort = forwardPort

      const transport = pick('transport', 'transport_id', 'transportId')
      if (transport) metadata.transport = transport


      const taskStatus = pick('taskStatus', 'task_status')
      if (taskStatus) metadata.taskStatus = taskStatus

      const connectionCandidate = this.normalizeMetadataField(
        metaSource.connection,
        metaSource.connectionType,
        metaSource.connection_type,
        metaSource.connectType,
        metaSource.connect_type,
        device.connection,
        device.connection_type,
        device.connect_type
      )
      const connection = this.resolveConnectionType(connectionCandidate)
      if (connection) metadata.connection = connection

      const proxyRotation = this.sanitizeProxyRotation(
        metaSource.proxyRotation || metaSource.proxy_rotation || device.proxyRotation || device.proxy_rotation
      )
      if (proxyRotation) metadata.proxyRotation = proxyRotation

      return metadata
    },
    decorateDeviceEntry(device, ticketData = {}) {
      if (!device || typeof device !== 'object') {
        return null
      }
      const realSerial =
        device.real_serial ||
        device.realSerial ||
        device.serial ||
        device.id ||
        null
      if (!realSerial) {
        return null
      }
      const metadata = this.buildDeviceMetadata(device)
      return {
        id: device.id || device.device_id || realSerial,
        ticket_id: device.ticket_id || device.ticketId || ticketData.id || ticketData.ticket_id || null,
        real_serial: String(realSerial),
        display_name:
          this.normalizeMetadataField(
            device.display_name,
            device.displayName,
            device.name,
            metadata.name
          ),

        metadata
      }
    },
    decorateMetadataDevice(device, ticketData = {}) {
      if (!device || typeof device !== 'object') {
        return null
      }
      const realSerial =
        device.real_serial ||
        device.realSerial ||
        device.serial ||
        device.id
      if (!realSerial) {
        return null
      }
      const baseMetadata = this.buildDeviceMetadata(device)
      return {
        id: device.id || `meta-${realSerial}`,
        ticket_id: ticketData.id || ticketData.ticket_id || null,
        real_serial: String(realSerial),
        display_name:
          this.normalizeMetadataField(
            device.display_name,
            device.displayName,
            baseMetadata.name,
            device.name
          ),

        metadata: baseMetadata
      }
    },
    normalizeDetailMessages(detail) {
      const candidateSources = [
        detail?.messages,
        detail?.conversation,
        detail?.ticket?.messages
      ]
      for (const source of candidateSources) {
        const list = this.toArray(source)
          .map(message => this.decorateMessageEntry(message))
          .filter(Boolean)
        if (list.length) {
          // Ensure messages are ordered newest first (top to bottom)
          list.sort((a, b) => {
            const ta = Number(a?.created_at ?? a?.timestamp ?? 0) || 0
            const tb = Number(b?.created_at ?? b?.timestamp ?? 0) || 0
            return tb - ta
          })
          return list
        }
      }
      return []
    },
    decorateMessageEntry(message) {
      if (!message || typeof message !== 'object') {
        return null
      }
      const body = message.body || message.content || message.message || ''
      const createdValue =
        message.created_at ||
        message.createdAt ||
        message.timestamp ||
        message.created_at_display
      const numeric = Number(createdValue)
      let createdAt = createdValue
      if (Number.isFinite(numeric) && numeric > 0) {
        createdAt = numeric
      }
      const createdDisplay = this.formatDate(createdAt)
      const attachments = this.toArray(
        message.attachments ||
        message.attachment_list ||
        message.files
      )
        .map(item => (item && typeof item === 'object' ? item : null))
        .filter(Boolean)
      return {
        ...message,
        body,
        content: body,
        created_at: createdAt,
        created_at_display: createdDisplay,
        attachments
      }
    },
    getDeviceNo(serial) {
      if (!serial) return '-'
      const normalized = String(serial)
      const fromDetailIndex = this.detailDevices.findIndex(item => {
        const value = item?.real_serial || item?.realSerial
        return value != null && String(value) === normalized
      })
      if (fromDetailIndex !== -1) {
        return fromDetailIndex + 1
      }
      const fromSource = (this.devices || []).findIndex(device => {
        const value = device?.real_serial || device?.serial || device?.id
        return value != null && String(value) === normalized
      })
      if (fromSource !== -1) {
        return fromSource + 1
      }
      return normalized
    },
    formatDeviceBadge(device) {
      if (!device || typeof device !== 'object') {
        return '-'
      }
      const serial = device.real_serial || device.realSerial || device.serial || ''
      const label = this.getDeviceNo(serial)
      return label != null && label !== '' ? label : serial || '-'
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return
      this.page = page
      this.fetchTickets()
    },
    sanitizeProxyRotation(raw) {
      if (!raw || typeof raw !== 'object') {
        return null
      }
      const cleaned = {}
      const endpoint = this.normalizeMetadataField(raw.rotation_url, raw.url, raw.endpoint)
      if (endpoint) cleaned.endpoint = endpoint
      const method = this.normalizeMetadataField(raw.method)
      if (method) cleaned.method = method
      const lastStatus = this.normalizeMetadataField(raw.last_status, raw.status)
      if (lastStatus) cleaned.lastStatus = lastStatus
      const lastMessage = this.normalizeMetadataField(raw.last_message, raw.message)
      if (lastMessage) cleaned.lastMessage = lastMessage
      const lastRotatedAt = this.normalizeMetadataField(raw.last_rotated_at, raw.lastRotatedAt)
      if (lastRotatedAt) cleaned.lastRotatedAt = lastRotatedAt
      const timeoutMs = this.normalizeMetadataField(raw.timeout_ms, raw.timeout)
      if (timeoutMs) cleaned.timeoutMs = timeoutMs
      return Object.keys(cleaned).length ? cleaned : null
    },
    resolveConnectionType(value) {
      if (value === null || value === undefined) {
        return ''
      }
      if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase()
        if (!normalized) {
          return ''
        }
        if (normalized === 'usb') {
          return 'USB'
        }
        if (normalized === 'tcp') {
          return 'TCP'
        }
        if (!Number.isNaN(Number(normalized))) {
          return this.resolveConnectionType(Number(normalized))
        }
        if (normalized === 'unknown') {
          return 'Unknown'
        }
        return value.trim().toUpperCase()
      }
      const numeric = Number(value)
      if (!Number.isNaN(numeric)) {
        if (numeric === 0) return 'USB'
        if (numeric === 1) return 'TCP'
        return String(numeric)
      }
      return String(value)
    },
    normalizeMetadataField(...candidates) {
      for (const candidate of candidates) {
        if (candidate === null || candidate === undefined) {
          continue
        }
        if (typeof candidate === 'string') {
          const text = candidate.trim()
          if (text !== '') {
            return text
          }
          continue
        }
        if (typeof candidate === 'number' && Number.isFinite(candidate)) {
          return String(candidate)
        }
        if (typeof candidate === 'boolean') {
          return candidate ? 'true' : 'false'
        }
        try {
          const text = String(candidate).trim()
          if (text) {
            return text
          }
        } catch (error) {
          continue
        }
      }
      return ''
    },
    openForm() {
      // 清空上次可能遗留的已选设备，防止新建工单时显示历史工单的设备缓存
      try {
        // 使用已有的方法通知全局选中设备为空
        this.updateSelection([])
      } catch (err) {
        // 即使失败也继续打开表单，避免阻塞用户操作
        console.error('openForm clear selection failed', err)
      }
      this.viewMode = 'form'
      this.resetReply()
    },
    async openDetail(ticket) {
      const resolved = this.resolveTicketReference(ticket)
      if (!resolved) {
        this.notify('error', this.$t('supportDetailMissingIdentifier'))
        return
      }
      this.currentTicket = resolved
      await this.markTicketAsRead(resolved)
      this.viewMode = 'detail'
      this.resetReply()
      this.loadTicketDetail(resolved)
    },
    resolveTicketReference(ticket) {
      if (!ticket || typeof ticket !== 'object') return null
      const unwrapKeys = ['ticket', 'data', 'result', 'payload']
      const queue = [ticket]
      const visited = new Set()
      let merged = {}
      while (queue.length) {
        const current = queue.shift()
        if (!current || typeof current !== 'object' || visited.has(current)) {
          continue
        }
        visited.add(current)
        merged = { ...merged, ...current }
        unwrapKeys.forEach(key => {
          const next = current[key]
          if (next && typeof next === 'object') {
            queue.push(next)
          }
        })
      }
      const idCandidate =
        merged.id || merged.ticket_id || merged.ticketId || merged.ticketID
      const ticketNoCandidate =
        merged.ticket_no ||
        merged.ticketNo ||
        merged.ticketNO ||
        merged.ticket_number
      if (!idCandidate && !ticketNoCandidate) {
        return null
      }
      const normalized = { ...merged }
      if (idCandidate) {
        const idString = String(idCandidate)
        normalized.id = idString
        normalized.ticket_id = idString
        normalized.ticketId = idString
      }
      if (ticketNoCandidate) {
        const ticketNoString = String(ticketNoCandidate)
        normalized.ticket_no = ticketNoString
        normalized.ticketNo = ticketNoString
      }
      return normalized
    },
    applyTicketDetailPayload(detail, options = {}) {
      if (!detail || typeof detail !== 'object') {
        return
      }
      const fallbackTicket = options.fallbackTicket || this.currentTicket || {}
      const ticketData = detail.ticket || fallbackTicket || {}
      if (ticketData && typeof ticketData === 'object') {
        this.currentTicket = { ...ticketData }
      }
      this.ticketDetail = detail
      const parsedTicketMetadata = this.parseMaybeJson(ticketData?.metadata)
      const parsedDetailMetadata = this.parseMaybeJson(detail.metadata)
      this.metadata = parsedTicketMetadata || parsedDetailMetadata || {}
      this.devicesDetail = this.normalizeDetailDevices(detail)
      this.messages = this.normalizeDetailMessages(detail)

      if (this.reply.includeLogs) {
        this.clearReplyPreparation()
        this.scheduleReplyLogPreparation()
      }
      let serials = this.detailDevices.map(device => device.real_serial).filter(Boolean)
      if (!serials.length) {
        serials = this.toArray(this.metadata?.devices)
          .map(device => device?.real_serial || device?.realSerial)
          .filter(Boolean)
      }
      if (serials.length && typeof this.$emiter === 'function') {
        this.$emiter('selecedDevices', [...new Set(serials.map(value => String(value)))])
      }
    },
    async loadTicketDetail(ticket) {
      if (!ticket) return
      const params = {}
      const ticketId =
        ticket.id ||
        ticket.ticket_id ||
        ticket.ticketId ||
        ticket.ticketID ||
        ticket.ticket?.id
      const ticketNo =
        ticket.ticket_no ||
        ticket.ticketNo ||
        ticket.ticketNO ||
        ticket.ticket_number ||
        ticket.ticket?.ticket_no

      if (ticketNo) {
        params.ticket_no = String(ticketNo)
      }
      if (ticketId) {
        params.id = String(ticketId)
      }

      if (!params.ticket_no && !params.id) {
        console.warn('support loadTicketDetail missing identifiers', ticket)
        await this.notify('error', this.$t('supportDetailMissingIdentifier'))
        this.detailLoading = false
        return
      }

      this.detailLoading = true
      try {
        const res = await this.$service.support_ticket_detail(params)
        const detail = res?.data || res || {}
        this.applyTicketDetailPayload(detail, { fallbackTicket: ticket })
      } catch (error) {
        console.error('support loadTicketDetail error', error)
        this.notify('error', this.$t('supportDetailLoadFailed'))
        this.ticketDetail = null
        this.metadata = {}
        this.devicesDetail = []
        this.messages = []
      } finally {
        this.detailLoading = false
      }
    },


    async refreshDetail() {
      if (!this.currentTicket) return
      await this.loadTicketDetail(this.currentTicket)
    },
    async closeTicket() {
      if (!this.currentTicket || this.closingTicket) {
        return
      }
      const ticketId =
        this.currentTicket.id ||
        this.currentTicket.ticket_id ||
        this.currentTicket.ticketId ||
        this.currentTicket.ticketID
      const ticketNo =
        this.currentTicket.ticket_no ||
        this.currentTicket.ticketNo ||
        this.currentTicket.ticketNO ||
        this.currentTicket.ticket_number
      if (!ticketId && !ticketNo) {
        await this.notify('error', this.$t('supportDetailMissingIdentifier'))
        return
      }
      this.closingTicket = true
      try {
        const payload = {
          status: 'closed'
        }
        if (ticketNo) {
          payload.ticketNo = String(ticketNo)
        } else if (ticketId) {
          payload.ticketId = String(ticketId)
        }
        await this.$service.support_update_status(payload)
        await this.notify('success', this.$t('supportDetailCloseSuccess'))
        await this.loadTicketDetail({ ...this.currentTicket })
        await this.fetchTickets()
      } catch (error) {
        console.error('support closeTicket error', error)
        await this.notify('error', this.$t('supportDetailCloseFailed'))
      } finally {
        this.closingTicket = false
      }
    },
    clearDetailState() {
      this.currentTicket = null
      this.ticketDetail = null
      this.metadata = {}
      this.devicesDetail = []
      this.messages = []
      if (this.highlightTimerHandle) {
        clearTimeout(this.highlightTimerHandle)
        this.highlightTimerHandle = null
      }
      this.highlightTicketNo = null
      this.resetReply()
    },
    backToList() {
      this.viewMode = 'list'
      this.clearDetailState()
      this.fetchTickets()
    },
    handleFormSubmitted(ticket) {
      const resolved = this.resolveTicketReference(ticket)
      this.viewMode = 'list'
      this.clearDetailState()
      if (resolved) {
        this.insertTicketToList(resolved)
      }
      this.page = 1
      this.fetchTickets()
    },
    insertTicketToList(ticket) {
      const resolved = this.resolveTicketReference(ticket)
      if (!resolved) {
        return
      }
      const ticketNo = resolved.ticket_no || resolved.ticketNo || resolved.ticket_number
      const identifier =
        ticketNo || resolved.id || resolved.ticket_id || resolved.ticketId || resolved.ticketID
      if (!identifier) {
        return
      }

      const normalized = { ...resolved }
      if (!normalized.ticket_no && ticketNo) {
        normalized.ticket_no = ticketNo
      }
      if (!normalized.ticketNo && ticketNo) {
        normalized.ticketNo = ticketNo
      }
      if (!normalized.id && normalized.ticket_id) {
        normalized.id = normalized.ticket_id
      }
      if (!normalized.ticket_id && normalized.id) {
        normalized.ticket_id = normalized.id
      }

      const filtered = this.tickets.filter(item => {
        const value = item.ticket_no || item.ticketNo || item.id || item.ticket_id || item.ticketId
        return value !== identifier
      })

      this.tickets = [normalized, ...filtered]
      this.applyUnreadFlags()
      this.highlightTicket(normalized.ticket_no || normalized.ticketNo || null)
    },
    updateSelection(serials) {
      if (typeof this.$emiter === 'function') {
        this.$emiter('selecedDevices', Array.isArray(serials) ? [...serials] : [])
      }
    },
    resetReply() {
      this.reply.body = ''
      this.reply.includeLogs = false
      this.clearReplyPreparation()
      this.reply.sending = false
      this.reply.attachments = []
    },
    clearReplyPreparation() {
      this.reply.preparationToken += 1
      this.reply.preparationTask = null
      this.reply.attachment = null
      this.reply.preparedPackage = null
      this.reply.preparedSerials = []
      this.reply.preparationError = null
      this.reply.messageTail = ''
    },
    scheduleReplyLogPreparation() {
      if (!this.reply.includeLogs) {
        return
      }
      const serials = this.normalizeSerialList(
        this.buildReplySerialPayload().map(device => device.realSerial)
      )
      if (!serials.length) {
        return
      }
      const preparedForSerials = this.areSameSerialSet(serials, this.reply.preparedSerials)
      if (
        this.reply.preparationTask ||
        (this.reply.attachment && preparedForSerials) ||
        (this.reply.preparedPackage && preparedForSerials)
      ) {
        return
      }
      this.startReplyLogPreparation(serials)
    },
    normalizeSerialList(list) {
      if (!Array.isArray(list)) {
        return []
      }
      const unique = new Set()
      const normalized = []
      list.forEach(value => {
        if (value === null || value === undefined) {
          return
        }
        const text = String(value).trim()
        if (!text || unique.has(text)) {
          return
        }
        unique.add(text)
        normalized.push(text)
      })
      normalized.sort()
      return normalized
    },
    areSameSerialSet(listA, listB) {
      if (!Array.isArray(listA) || !Array.isArray(listB)) {
        return false
      }
      if (listA.length !== listB.length) {
        return false
      }
      for (let i = 0; i < listA.length; i += 1) {
        if (listA[i] !== listB[i]) {
          return false
        }
      }
      return true
    },
    startReplyLogPreparation(serials) {
      const normalizedSerials = this.normalizeSerialList(serials)
      if (!normalizedSerials.length) {
        return null
      }
      this.reply.preparationToken += 1
      const currentToken = this.reply.preparationToken
      const task = (async () => {
        try {
          const response = await this.$service.support_generate_logs({ serials: normalizedSerials })
          if (!this.reply.includeLogs || this.reply.preparationToken !== currentToken) {
            return null
          }
          if (!response || !response.zip_path) {
            throw new Error('LOG_PACKAGE_MISSING')
          }
          this.reply.messageTail = response?.message_tail || ''
          this.reply.preparedPackage = response
          this.reply.attachment = null
          this.reply.preparedSerials = normalizedSerials
          this.reply.preparationError = null
          return response
        } catch (error) {
          if (this.reply.preparationToken === currentToken) {
            this.reply.preparationError = error
            this.reply.preparedPackage = null
            this.reply.attachment = null
            this.reply.messageTail = ''
            this.reply.preparedSerials = []
          }
          throw error
        } finally {
          if (this.reply.preparationToken === currentToken && this.reply.preparationTask === task) {
            this.reply.preparationTask = null
          }
        }
      })()
      this.reply.preparationTask = task
      task.catch(err => {
        console.error('support startReplyLogPreparation error', err)
      })
      return task
    },
    async prepareReplyAttachments(serialsOverride) {
      if (!this.reply.includeLogs) {
        this.clearReplyPreparation()
        return []
      }
      const serialPayload = this.buildReplySerialPayload()
      const serialSource = Array.isArray(serialsOverride) && serialsOverride.length
        ? serialsOverride
        : serialPayload.map(device => device.realSerial)
      const serials = this.normalizeSerialList(serialSource)
      if (!serials.length) {
        await this.notify('warning', this.$t('supportDetailNoDeviceForLogs'))
        this.clearReplyPreparation()
        return []
      }
      const isPreparedForSerials = () => this.areSameSerialSet(serials, this.reply.preparedSerials)

      if (!isPreparedForSerials()) {
        this.clearReplyPreparation()
      }
      if (this.reply.attachment && isPreparedForSerials()) {
        return [this.reply.attachment]
      }

      const attemptUpload = async () => {
        if (!isPreparedForSerials()) {
          return []
        }
        if (this.reply.attachment && isPreparedForSerials()) {
          return [this.reply.attachment]
        }
        const packageInfo = this.reply.preparedPackage
        if (!packageInfo || !packageInfo.zip_path) {
          return []
        }
        try {
          const attachment = await this.uploadReplyLogs(packageInfo, serials)
          if (isPreparedForSerials()) {
            this.reply.attachment = attachment
          }
          return this.reply.attachment && isPreparedForSerials()
            ? [this.reply.attachment]
            : attachment
              ? [attachment]
              : []
        } catch (error) {
          console.error('prepareReplyAttachments upload failed', error)
          this.reply.preparationError = error
          return []
        }
      }

      if (this.reply.preparedPackage && isPreparedForSerials()) {
        const uploaded = await attemptUpload()
        if (uploaded.length) {
          return uploaded
        }
      }

      if (this.reply.preparationTask) {
        try {
          await this.reply.preparationTask
        } catch (error) {
          console.error('prepareReplyAttachments awaiting task failed', error)
        }
        if (this.reply.attachment && isPreparedForSerials()) {
          return [this.reply.attachment]
        }
        const uploaded = await attemptUpload()
        if (uploaded.length) {
          return uploaded
        }
      }

      const task = this.startReplyLogPreparation(serials)
      if (!task) {
        return []
      }
      try {
        await task
      } catch (error) {
        console.error('prepareReplyAttachments start task failed', error)
        return []
      }
      return attemptUpload()
    },
    buildReplySerialPayload() {
      const sourceDevices = Array.isArray(this.devicesDetail) && this.devicesDetail.length
        ? this.devicesDetail
        : this.normalizeDetailDevices({
          ticket: this.currentTicket,
          metadata: this.metadata
        })
      if (!Array.isArray(sourceDevices)) return []
      return sourceDevices
        .map(device => {
          const realSerial = device.real_serial || device.realSerial
          if (!realSerial) return null
          const metadata = this.buildDeviceMetadata(device)
          return {
            realSerial,
            displayName: this.normalizeMetadataField(
              device.display_name,
              device.displayName,
              device.name,
              metadata.name
            ),

            metadata
          }
        })
        .filter(Boolean)
    },
    parseUploadResponse(uploadResponse, context = {}) {
      const getField = (source, names) => {
        if (!source || typeof source !== 'object') return undefined
        const keys = Object.keys(source)
        for (const name of names) {
          if (Object.prototype.hasOwnProperty.call(source, name)) {
            return source[name]
          }
          const lower = name.toLowerCase()
          const matchKey = keys.find(key => key.toLowerCase() === lower)
          if (matchKey) {
            return source[matchKey]
          }
        }
        return undefined
      }
      const parseMaybeJson = value => {
        if (!value) return null
        if (typeof value === 'object') return value
        if (typeof value === 'string') {
          try {
            return JSON.parse(value)
          } catch (error) {
            return null
          }
        }
        return null
      }

      const unwrapKeys = ['data', 'result', 'payload']
      let body = uploadResponse ?? {}
      for (let depth = 0; depth < 4; depth += 1) {
        if (body && typeof body === 'object') {
          const key = unwrapKeys.find(candidate =>
            Object.prototype.hasOwnProperty.call(body, candidate)
          )
          if (key && body[key] != null) {
            body = body[key]
            continue
          }
        }
        break
      }
      body = body ?? {}

      let uploadInfo =
        getField(body, ['upload', 'uploadInfo', 'upload_info', 'result', 'payload', 'data']) || body
      if (Array.isArray(uploadInfo)) {
        uploadInfo = uploadInfo[0] || {}
      }

      const responseCode = Number(
        getField(body, ['code', 'status', 'statusCode', 'status_code', 'errorCode']) ??
        getField(uploadInfo, ['code', 'status', 'statusCode', 'status_code', 'errorCode'])
      )
      if (Number.isFinite(responseCode) && ![0, 200, 201, 20000].includes(responseCode)) {
        const responseMessage =
          getField(body, ['message', 'error', 'msg', 'errorMessage']) ||
          getField(uploadInfo, ['message', 'error', 'msg', 'errorMessage']) ||
          'Unknown error'
        throw new Error(responseMessage)
      }

      const storageKey =
        getField(uploadInfo, ['key', 'storageKey', 'storage_key']) ||
        getField(body, ['storageKey', 'storage_key', 'key']) ||
        ''
      if (!storageKey) {
        throw new Error('MISSING_STORAGE_KEY')
      }

      const bucket = getField(uploadInfo, ['bucket']) || getField(body, ['bucket']) || ''
      const returnedFileName =
        getField(uploadInfo, ['fileName', 'file_name']) ||
        getField(body, ['fileName', 'file_name']) ||
        context.fileName ||
        ''
      const contentType =
        getField(uploadInfo, ['contentType', 'content_type']) ||
        getField(body, ['contentType', 'content_type']) ||
        context.contentType ||
        'application/zip'
      const sizeValue = Number(
        getField(uploadInfo, ['size', 'fileSize', 'file_size']) ||
        getField(body, ['size', 'fileSize', 'file_size']) ||
        context.fileSize
      )
      const checksum =
        getField(uploadInfo, ['checksum']) ||
        getField(body, ['checksum']) ||
        context.checksum ||
        ''
      const etag = getField(uploadInfo, ['etag']) || getField(body, ['etag'])

      const normalizedSize = Number.isFinite(sizeValue)
        ? sizeValue
        : Number(context.fileSize || 0) || 0

      const attachmentMeta = {}
      const responseMeta =
        parseMaybeJson(uploadInfo.metadata) ||
        parseMaybeJson(uploadInfo.meta) ||
        parseMaybeJson(getField(body, ['metadata', 'meta']))
      if (responseMeta && typeof responseMeta === 'object') {
        Object.assign(attachmentMeta, responseMeta)
      }
      if (Array.isArray(context.serials) && context.serials.length) {
        attachmentMeta.serials = context.serials.join(',')
      }
      if (context.type) {
        attachmentMeta.type = context.type
      }
      if (etag) {
        attachmentMeta.etag = etag
      }

      const attachment = {
        storageKey,
        bucket,
        file_name: returnedFileName,
        fileName: returnedFileName,
        file_size: normalizedSize,
        fileSize: normalizedSize,
        content_type: contentType,
        contentType,
        checksum
      }
      if (Object.keys(attachmentMeta).length) {
        attachment.metadata = attachmentMeta
      }

      return attachment
    },
    async uploadReplyLogs(logPackage, serials) {
      if (!logPackage || !logPackage.zip_path) {
        throw new Error('LOG_PACKAGE_MISSING')
      }
      try {
        const uploadResponse = await this.$service.support_upload({
          file_path: logPackage.zip_path,
          file_name: logPackage.zip_name,
          file_size: logPackage.zip_size,
          content_type: 'application/zip',
          serials,
          client_app: this.clientInfoNormalized.app_name,
          client_version: this.clientInfoNormalized.client_version
        })
        const attachment = this.parseUploadResponse(uploadResponse, {
          fileName: logPackage.zip_name,
          fileSize: logPackage.zip_size,
          checksum: logPackage.checksum,
          serials,
          type: 'logs'
        })
        return attachment
      } catch (error) {
        console.error('uploadReplyLogs error', error)
        throw error
      }
    },
    async submitReply() {
      if (!this.currentTicket) {
        await this.notify('warning', this.$t('supportDetailNoTicket'))
        return
      }
      const message = this.reply.body.trim()
      if (!message) {
        await this.notify('warning', this.$t('supportDetailReplyRequired'))
        return
      }
      this.reply.sending = true
      try {
        const serialPayload = this.buildReplySerialPayload()
        const serials = this.normalizeSerialList(serialPayload.map(device => device.realSerial))
        let attachments = []
        if (this.reply.attachments.length) {
          const customAttachments = await this.uploadReplyCustomAttachments(serials)
          attachments = attachments.concat(customAttachments)
        }
        let logAttachments = []
        if (this.reply.includeLogs && serials.length) {
          logAttachments = await this.prepareReplyAttachments(serials)
          attachments = attachments.concat(logAttachments)
        } else if (this.reply.includeLogs && !serials.length) {
          this.reply.includeLogs = false
          this.clearReplyPreparation()
        }
        const ticketId =
          this.currentTicket.id ||
          this.currentTicket.ticket_id ||
          this.currentTicket.ticketId ||
          this.currentTicket.ticketID
        const ticketNo =
          this.currentTicket.ticket_no ||
          this.currentTicket.ticketNo ||
          this.currentTicket.ticketNO ||
          this.currentTicket.ticket_number
        const payload = {
          ticketId: ticketId ? String(ticketId) : undefined,
          ticketNo: ticketNo ? String(ticketNo) : undefined,
          message,
          message_tail: logAttachments.length ? this.reply.messageTail || '' : '',
          source: 'app',
          role: 'customer',
          serials: serialPayload,
          attachments
        }
        await this.$service.support_append_message(payload)
        await this.notify('success', this.$t('supportDetailReplySuccess'))
        this.reply.body = ''
        this.clearReplyPreparation()
        if (this.reply.includeLogs) {
          this.scheduleReplyLogPreparation()
        }
        this.reply.attachments = []
        await this.loadTicketDetail(this.currentTicket)
      } catch (error) {
        console.error('support submitReply error', error)
        await this.notify('error', this.$t('supportDetailReplyFailed'))
      } finally {
        this.reply.sending = false
      }
    }
  }
}
</script>

<style scoped>
.support-center {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.support-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.titles {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.subtitle {
  color: var(--color-base-content);
  margin: 0;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--color-base-300);
  border-radius: 10px;
  background: var(--color-base-100);
}

.table thead th {
  background: var(--color-base-200);
  font-weight: 600;
  color: var(--color-base-content);
}

.subject-cell {
  max-width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ticket-row {
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.ticket-row:hover {
  background-color: var(--color-base-200);
}

.ticket-row:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.loading-cell,
.empty-cell {
  text-align: center;
  color: var(--color-base-content);
  padding: 24px 12px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.page-indicator {
  font-size: 14px;
  color: var(--color-base-content);
}

.support-form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.back-button-icon {
  width: 16px;
  height: 16px;
}

.support-detail-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.detail-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-header-title {
  font-size: 18px;
  font-weight: 600;
}

.detail-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-loading {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 16px;
  border-radius: 10px;
  background: var(--color-base-200);
  color: var(--color-base-content);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-card {
  background: var(--color-base-100);
  border: 1px solid var(--color-base-300);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-card {
  gap: 10px;
}

.summary-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.summary-subject {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-base-content);
}

.summary-meta {
  margin: 4px 0 0;
  color: var(--color-base-content);
  font-size: 14px;
}

.summary-tags {
  display: flex;
  align-items: center;
  gap: 8px;
}

.summary-footer {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
  color: var(--color-base-content);
  flex-wrap: wrap;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.info-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-list li {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--color-base-content);
  gap: 12px;
}

.device-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.device-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid var(--color-base-300);
  border-radius: 10px;
  padding: 12px;
  background: var(--color-base-200);
}

.device-card-header {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  color: var(--color-base-content);
}

.device-meta-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 13px;
  color: var(--color-base-content);
}

.conversation-card {
  gap: 16px;
}

.conversation-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.conversation-item {
  border: 1px solid var(--color-base-300);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.conversation-header {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.message-role {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.message-author {
  font-weight: 600;
  color: var(--color-base-content);
}

.message-time {
  color: var(--color-base-content);
  font-size: 13px;
}

.conversation-body {
  white-space: pre-wrap;
  font-size: 14px;
  color: var(--color-base-content);
}

.conversation-tail {
  background: var(--color-base-200);
  border-radius: 8px;
  padding: 10px;
  font-size: 12px;
  color: var(--color-base-content);
  max-height: 160px;
  overflow-y: auto;
}

.conversation-attachments {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.attachments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.attachment-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border-radius: 12px;
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  text-align: left;
  color: inherit;
}

.attachment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
}

.attachment-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.attachment-thumb {
  position: relative;
  width: 100%;
  padding-top: 66%;
  border-radius: 10px;
  overflow: hidden;
  background: var(--color-base-100);
  display: flex;
  align-items: center;
  justify-content: center;
}

.attachment-thumb img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.attachment-thumb-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--color-base-content);
  opacity: 0.7;
}

.attachment-thumb-placeholder.error {
  color: var(--color-error, #f87171);
  opacity: 1;
}

.attachment-thumb-placeholder.video svg {
  width: 32px;
  height: 32px;
}

.attachment-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.attachments-list {
  display: flex;
  flex-direction: row;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
  align-items: center;
}

.attachment-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--color-base-content);
  padding: 6px 10px;
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  border-radius: 8px;
  white-space: nowrap;
}

.attachment-name {
  font-weight: 500;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.attachment-size {
  color: var(--color-base-content);
  font-size: 12px;
  margin-left: 6px;
  opacity: 0.8;

}

.attachment-type {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--color-base-content);
  opacity: 0.8;
}

.attachment-type-label {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--color-base-content);
  opacity: 0.7;
}

.attachment-status {
  font-size: 12px;
  margin-left: 4px;
}

.attachment-status.uploading {
  color: var(--color-primary);
}

.attachment-status.error {
  color: var(--color-error, #f87171);
}

.attachment-remove {
  margin-left: 4px;
}

.reply-card {
  gap: 10px;
}

.reply-options {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.reply-actions {
  display: flex;
  gap: 8px;
}

.reply-attachments {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reply-attachments .attachments-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.reply-attachments .attachments-hint {
  font-size: 12px;
  color: var(--color-base-content);
  opacity: 0.9;
}

.reply-attachments .attachments-empty {
  font-size: 12px;
  color: var(--color-base-content);
  opacity: 0.8;
}

.reply-attachments .attachments-list {
  justify-content: flex-start;
}

.empty-cell.compact {
  padding: 16px;
  font-size: 14px;
}

:global(.attachment-preview-overlay) {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1200;
}

:global(.attachment-preview-modal) {
  width: min(960px, 92vw);
  max-height: 92vh;
  background: var(--color-base-100);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.35);
}

:global(.attachment-preview-header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

:global(.attachment-preview-title) {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--color-base-content);
}

:global(.attachment-preview-name) {
  font-size: 18px;
  font-weight: 600;
  word-break: break-all;
}

:global(.attachment-preview-count) {
  font-size: 13px;
  opacity: 0.7;
}

:global(.preview-close) {
  background: var(--color-base-200);
  border: none;
  color: var(--color-base-content);
}

:global(.preview-close:hover) {
  background: var(--color-base-300);
}

:global(.attachment-preview-body) {
  flex: 1;
  background: var(--color-base-200);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  position: relative;
  overflow: hidden;
}

:global(.attachment-preview-body img),
:global(.attachment-preview-body video) {
  max-width: 100%;
  max-height: 100%;
  border-radius: 12px;
}

:global(.attachment-preview-loading),
:global(.attachment-preview-error),
:global(.attachment-preview-empty) {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-base-content);
  padding: 24px;
}

:global(.attachment-preview-error) {
  color: var(--color-error, #f87171);
}

:global(.attachment-preview-footer) {
  display: flex;
  justify-content: center;
  gap: 16px;
}

:global(.preview-nav svg) {
  width: 20px;
  height: 20px;
}

:global(.attachment-preview-fade-enter-active),
:global(.attachment-preview-fade-leave-active) {
  transition: opacity 0.2s ease;
}

:global(.attachment-preview-fade-enter-from),
:global(.attachment-preview-fade-leave-to) {
  opacity: 0;
}
</style>
