<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { auditApi } from '../api';
import type { AuditLog } from '../types';

const route = useRoute();
const logs = ref<AuditLog[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    isLoading.value = true;
    logs.value = await auditApi.getLogs(route.params.caseId as string);
  } finally {
    isLoading.value = false;
  }
});

const formatDate = (iso: string) => {
  return new Date(iso).toLocaleString('th-TH', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};
</script>

<template>
  <div class="max-w-3xl mx-auto">
    
    <div class="bg-slate-900 text-white rounded-xl p-6 mb-8 shadow-lg flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold flex items-center gap-2">
          <span class="material-icons-outlined text-emerald-400">verified_user</span>
          Immutable Audit Trail
        </h2>
        <p class="text-slate-400 text-xs mt-1 font-mono">
          Ledger ID: {{ route.params.caseId }}
        </p>
      </div>
      <div class="text-right">
        <div class="text-xs text-slate-400 uppercase font-bold tracking-wider">Security Level</div>
        <div class="text-emerald-400 font-bold text-sm flex items-center gap-1 justify-end">
          <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          Tamper-Proof
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="space-y-6 p-4">
      <div v-for="i in 3" :key="i" class="flex gap-4 animate-pulse">
        <div class="w-12 flex flex-col items-center">
           <div class="w-8 h-8 bg-slate-200 rounded-full"></div>
           <div class="w-0.5 h-full bg-slate-100 mt-2"></div>
        </div>
        <div class="flex-1 space-y-2">
           <div class="h-4 bg-slate-200 w-1/4 rounded"></div>
           <div class="h-20 bg-slate-100 rounded-lg"></div>
        </div>
      </div>
    </div>

    <div v-else class="relative pl-4">
      <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>

      <div 
        v-for="(log, index) in logs" 
        :key="log.id" 
        class="relative flex gap-6 mb-8 group animate-enter"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="relative z-10 shrink-0">
          <div class="w-9 h-9 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
            :class="log.actor.role === 'System' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-800 text-white'"
          >
            <span v-if="log.actor.role === 'System'" class="material-icons-outlined text-sm">smart_toy</span>
            <span v-else class="material-icons-outlined text-sm">person</span>
          </div>
        </div>

        <div class="flex-1 bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow relative">
          <div class="absolute top-4 -left-1.5 w-3 h-3 bg-white border-l border-b border-slate-200 transform rotate-45"></div>

          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-bold text-slate-800 text-sm">{{ log.action }}</h3>
              <p class="text-xs text-slate-500">by <span class="font-semibold text-slate-700">{{ log.actor.name }}</span> ({{ log.actor.role }})</p>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-mono text-slate-400 block">{{ formatDate(log.timestamp) }}</span>
            </div>
          </div>

          <p class="text-sm text-slate-600 bg-slate-50 p-3 rounded border border-slate-100 mb-3">
            {{ log.details }}
          </p>

          <div class="flex items-center gap-2 border-t border-slate-100 pt-2">
            <span class="material-icons-outlined text-[12px] text-slate-300">fingerprint</span>
            <code class="text-[10px] font-mono text-slate-400">{{ log.hash }}</code>
            <span class="ml-auto text-[10px] text-emerald-600 font-bold px-2 py-0.5 bg-emerald-50 rounded-full">
              VERIFIED
            </span>
          </div>
        </div>
      </div>
      
      <div class="relative flex gap-6">
         <div class="relative z-10 shrink-0 w-9 h-9 flex items-center justify-center">
            <div class="w-3 h-3 bg-slate-300 rounded-full"></div>
         </div>
         <div class="pt-1.5 text-xs text-slate-400 uppercase font-bold tracking-widest">Start of Record</div>
      </div>

    </div>
  </div>
</template>