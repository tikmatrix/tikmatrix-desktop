<template>
  <dialog ref="dialog" class="modal">
    <div class="modal-box w-11/12 max-w-4xl">
      <h3 class="font-bold text-lg mb-4">
        {{ isEdit ? $t('editTemplate') : $t('addTemplate') }}
      </h3>

      <div class="space-y-4">
        <!-- Template Name -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">{{ $t('templateName') }} *</span>
          </label>
          <input type="text" class="input input-bordered w-full" v-model="form.name"
            :placeholder="$t('templateNamePlaceholder')" />
        </div>

        <!-- Description -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">{{ $t('description') }}</span>
          </label>
          <textarea class="textarea textarea-bordered w-full" v-model="form.description"
            :placeholder="$t('templateDescPlaceholder')" rows="2"></textarea>
        </div>

        <!-- Weekdays Selection -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">{{ $t('repeatOnDays') }} *</span>
          </label>
          <div class="flex flex-wrap gap-2">
            <label v-for="day in weekdayOptions" :key="day.value"
              class="label cursor-pointer gap-2 border rounded-lg px-3 py-2"
              :class="{ 'border-primary bg-primary/10': selectedWeekdays.includes(day.value) }">
              <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" :value="day.value"
                v-model="selectedWeekdays" />
              <span class="label-text">{{ $t(day.label) }}</span>
            </label>
          </div>
        </div>

        <!-- Target Groups -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">{{ $t('targetGroups') }}</span>
            <span class="label-text-alt">{{ $t('leaveEmptyForAllGroups') }}</span>
          </label>
          <div class="flex flex-wrap gap-2">
            <label v-for="group in groups" :key="group.id"
              class="label cursor-pointer gap-2 border rounded-lg px-3 py-2"
              :class="{ 'border-primary bg-primary/10': selectedGroups.includes(group.id) }">
              <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" :value="group.id"
                v-model="selectedGroups" />
              <span class="label-text">{{ group.name }}</span>
            </label>
          </div>
        </div>

        <!-- Time Slots -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">{{ $t('timeSlots') }}</span>
            <button class="btn btn-xs btn-primary" @click="addTimeSlot">
              <font-awesome-icon icon="fa fa-plus" class="mr-1"></font-awesome-icon>
              {{ $t('addTimeSlot') }}
            </button>
          </label>

          <div class="overflow-x-auto border rounded-lg">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>{{ $t('startTime') }}</th>
                  <th>{{ $t('endTime') }}</th>
                  <th>{{ $t('scriptName') }}</th>
                  <th>{{ $t('duration') }} ({{ $t('minutes') }})</th>
                  <th>{{ $t('actions') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(slot, index) in timeSlots" :key="index">
                  <td>
                    <input type="time" class="input input-bordered input-sm w-28" v-model="slot.start_time" />
                  </td>
                  <td>
                    <input type="time" class="input input-bordered input-sm w-28" v-model="slot.end_time" />
                  </td>
                  <td>
                    <select class="select select-bordered select-sm w-40" v-model="slot.script_name">
                      <option v-for="script in availableScripts" :key="script.value" :value="script.value">
                        {{ $t(script.label) }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <input type="number" class="input input-bordered input-sm w-20" v-model.number="slot.duration_minutes"
                      min="1" max="480" />
                  </td>
                  <td>
                    <button class="btn btn-xs btn-error" @click="removeTimeSlot(index)">
                      <font-awesome-icon icon="fa fa-trash"></font-awesome-icon>
                    </button>
                  </td>
                </tr>
                <tr v-if="timeSlots.length === 0">
                  <td colspan="5" class="text-center text-base-content/50">
                    {{ $t('noTimeSlots') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Enabled Toggle -->
        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-4">
            <input type="checkbox" class="toggle toggle-primary" v-model="form.enabled" />
            <span class="label-text font-semibold">{{ $t('enableTemplate') }}</span>
          </label>
        </div>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-ghost">{{ $t('cancel') }}</button>
        </form>
        <button class="btn btn-primary" @click="save" :disabled="!isValid">
          {{ $t('save') }}
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script>
export default {
  name: 'EditScheduleTemplate',
  props: {
    groups: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isEdit: false,
      templateId: null,
      form: {
        name: '',
        description: '',
        enabled: true
      },
      selectedWeekdays: [1, 2, 3, 4, 5], // Mon-Fri by default
      selectedGroups: [],
      timeSlots: [],
      weekdayOptions: [
        { value: 1, label: 'monday' },
        { value: 2, label: 'tuesday' },
        { value: 3, label: 'wednesday' },
        { value: 4, label: 'thursday' },
        { value: 5, label: 'friday' },
        { value: 6, label: 'saturday' },
        { value: 7, label: 'sunday' }
      ],
      availableScripts: [
        { value: 'account_warmup', label: 'accountWarmup' },
        { value: 'super_marketing', label: 'superMarketing' },
        { value: 'post', label: 'post' },
        { value: 'comment_boost', label: 'commentBoost' },
        { value: 'live_boost', label: 'liveBoost' },
        { value: 'follow', label: 'follow' },
        { value: 'unFollow', label: 'unfollow' },
        { value: 'like', label: 'like' },
        { value: 'scrape', label: 'scrape' }
      ]
    }
  },
  computed: {
    isValid() {
      return this.form.name.trim() && this.selectedWeekdays.length > 0;
    }
  },
  methods: {
    show(template = null) {
      this.resetForm();
      if (template) {
        this.isEdit = true;
        this.templateId = template.id;
        this.form.name = template.name;
        this.form.description = template.description || '';
        this.form.enabled = template.enabled === 1;
        this.selectedWeekdays = template.weekdays
          ? template.weekdays.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
          : [];
        this.selectedGroups = template.group_ids
          ? template.group_ids.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
          : [];
        this.loadTimeSlots(template.id);
      }
      this.$refs.dialog.showModal();
    },
    async loadTimeSlots(templateId) {
      try {
        const res = await this.$service.get_schedule_template({ id: templateId });
        if (res.data && res.data.time_slots) {
          this.timeSlots = res.data.time_slots.map(slot => ({
            ...slot,
            end_time: slot.end_time || ''
          }));
        }
      } catch (error) {
        console.error('Failed to load time slots:', error);
      }
    },
    resetForm() {
      this.isEdit = false;
      this.templateId = null;
      this.form = {
        name: '',
        description: '',
        enabled: true
      };
      this.selectedWeekdays = [1, 2, 3, 4, 5];
      this.selectedGroups = [];
      this.timeSlots = [];
    },
    addTimeSlot() {
      this.timeSlots.push({
        start_time: '09:00',
        end_time: '',
        script_name: 'account_warmup',
        duration_minutes: 30,
        sort_order: this.timeSlots.length
      });
    },
    removeTimeSlot(index) {
      this.timeSlots.splice(index, 1);
    },
    async save() {
      if (!this.isValid) return;

      const templateData = {
        id: this.isEdit ? this.templateId : undefined,
        name: this.form.name.trim(),
        description: this.form.description.trim() || null,
        weekdays: this.selectedWeekdays.sort((a, b) => a - b).join(','),
        group_ids: this.selectedGroups.length > 0 ? this.selectedGroups.join(',') : null,
        enabled: this.form.enabled ? 1 : 0
      };

      const timeSlotsData = this.timeSlots.map((slot, index) => ({
        template_id: this.templateId || 0,
        start_time: slot.start_time,
        end_time: slot.end_time || null,
        script_name: slot.script_name,
        script_args: slot.script_args || null,
        duration_minutes: slot.duration_minutes || null,
        sort_order: index
      }));

      try {
        const payload = {
          template: templateData,
          time_slots: timeSlotsData
        };

        if (this.isEdit) {
          await this.$service.update_schedule_template(payload);
        } else {
          await this.$service.create_schedule_template(payload);
        }

        this.$refs.dialog.close();
        this.$emit('saved');
        this.$emiter('NOTIFY', {
          type: 'success',
          message: this.$t('templateSaved'),
          timeout: 2000
        });
      } catch (error) {
        console.error('Failed to save template:', error);
        this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('saveTemplateFailed'),
          timeout: 3000
        });
      }
    }
  }
}
</script>
