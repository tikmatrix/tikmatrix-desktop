<template>
  <div class="w-full">
    <Pagination :items="templates" :searchKeys="['name', 'description']"
      :searchTermPlaceholder="$t('searchTemplatePlaceholder')" @refresh="loadTemplates" :pageSize="10">
      <template v-slot:buttons>
        <button class="btn btn-md btn-primary ml-2" @click="showEditDialog()">
          <font-awesome-icon icon="fa fa-add"></font-awesome-icon>{{ $t('addTemplate') }}
        </button>
      </template>
      <template v-slot:default="slotProps">
        <div class="overflow-x-auto">
          <table class="table table-md">
            <thead>
              <tr>
                <th>{{ $t('id') }}</th>
                <th>{{ $t('templateName') }}</th>
                <th>{{ $t('description') }}</th>
                <th>{{ $t('weekdays') }}</th>
                <th>{{ $t('targetGroups') }}</th>
                <th>{{ $t('timeSlots') }}</th>
                <th>{{ $t('status') }}</th>
                <th>{{ $t('actions') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="template in slotProps.items" :key="template.id">
                <td>{{ template.id }}</td>
                <td>
                  <span class="font-semibold">{{ template.name }}</span>
                </td>
                <td>
                  <span class="text-sm text-base-content/70">{{ template.description || '-' }}</span>
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="day in parseWeekdays(template.weekdays)" :key="day"
                      class="badge badge-sm badge-primary">
                      {{ getWeekdayName(day) }}
                    </span>
                  </div>
                </td>
                <td>
                  <span class="badge badge-ghost badge-md">
                    {{ getGroupNames(template.group_ids) }}
                  </span>
                </td>
                <td>
                  <button class="btn btn-xs btn-ghost" @click="showTimeSlots(template)">
                    <font-awesome-icon icon="fa fa-clock" class="mr-1"></font-awesome-icon>
                    {{ $t('viewSlots') }}
                  </button>
                </td>
                <td>
                  <label class="swap">
                    <input type="checkbox" :checked="template.enabled === 1" @change="toggleTemplate(template)" />
                    <div class="swap-on badge badge-success">{{ $t('enabled') }}</div>
                    <div class="swap-off badge badge-ghost">{{ $t('disabled') }}</div>
                  </label>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button class="btn btn-sm btn-info" @click="showEditDialog(template)">
                      {{ $t('edit') }}
                    </button>
                    <button class="btn btn-sm btn-error" @click="deleteTemplate(template)">
                      {{ $t('delete') }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </Pagination>

    <EditScheduleTemplate ref="editDialog" :groups="groups" @saved="loadTemplates" />
    <TimeSlotsDialog ref="timeSlotsDialog" />
  </div>
</template>

<script>
import Pagination from '../Pagination.vue';
import EditScheduleTemplate from './EditScheduleTemplate.vue';
import TimeSlotsDialog from './TimeSlotsDialog.vue';

export default {
  name: 'ManageScheduleTemplates',
  components: {
    Pagination,
    EditScheduleTemplate,
    TimeSlotsDialog
  },
  props: {
    groups: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      templates: [],
      weekdayNames: {
        1: 'monday',
        2: 'tuesday',
        3: 'wednesday',
        4: 'thursday',
        5: 'friday',
        6: 'saturday',
        7: 'sunday'
      }
    }
  },
  methods: {
    async loadTemplates() {
      try {
        const res = await this.$service.list_schedule_templates();
        this.templates = res.data || [];
      } catch (error) {
        console.error('Failed to load templates:', error);
        this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('loadTemplatesFailed'),
          timeout: 3000
        });
      }
    },
    parseWeekdays(weekdaysStr) {
      if (!weekdaysStr) return [];
      return weekdaysStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    },
    getWeekdayName(day) {
      const key = this.weekdayNames[day];
      return key ? this.$t(key) : day;
    },
    getGroupNames(groupIdsStr) {
      if (!groupIdsStr) return this.$t('allGroups');
      const ids = groupIdsStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      const names = ids.map(id => {
        const group = this.groups.find(g => g.id === id);
        return group ? group.name : `#${id}`;
      });
      return names.join(', ') || this.$t('allGroups');
    },
    showEditDialog(template = null) {
      this.$refs.editDialog.show(template);
    },
    showTimeSlots(template) {
      this.$refs.timeSlotsDialog.show(template);
    },
    async toggleTemplate(template) {
      try {
        await this.$service.toggle_schedule_template({ id: template.id });
        await this.loadTemplates();
        this.$emiter('NOTIFY', {
          type: 'success',
          message: this.$t('templateStatusUpdated'),
          timeout: 2000
        });
      } catch (error) {
        console.error('Failed to toggle template:', error);
        this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('toggleTemplateFailed'),
          timeout: 3000
        });
      }
    },
    async deleteTemplate(template) {
      const confirmed = await this.$emiter('confirm', {
        title: this.$t('deleteTemplate'),
        message: this.$t('deleteTemplateConfirm', { name: template.name })
      });
      if (!confirmed) return;

      try {
        await this.$service.delete_schedule_template({ id: template.id });
        await this.loadTemplates();
        this.$emiter('NOTIFY', {
          type: 'success',
          message: this.$t('templateDeleted'),
          timeout: 2000
        });
      } catch (error) {
        console.error('Failed to delete template:', error);
        this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('deleteTemplateFailed'),
          timeout: 3000
        });
      }
    }
  },
  async mounted() {
    await this.loadTemplates();
  }
}
</script>
