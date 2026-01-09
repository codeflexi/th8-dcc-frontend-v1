<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { evidenceApi } from '../api';
import type { EvidenceDoc, AIFinding } from '../types';

const route = useRoute();
const docs = ref<EvidenceDoc[]>([]);
const findings = ref<AIFinding[]>([]);
const isLoading = ref(true);

const selectedDocId = ref<string>('');
const activeFindingId = ref<string | null>(null);

onMounted(async () => {
  try {
    const data = await evidenceApi.getData(route.params.caseId as string);
    docs.value = data.docs;
    findings.value = data.findings;
    if (docs.value.length > 0) selectedDocId.value = docs.value[0].id;
  } finally {
    isLoading.value = false;
  }
});

const currentFindings = computed(() => 
  findings.value.filter(f => f.docId === selectedDocId.value)
);

const getStatusColor = (status: string) => {
  switch(status) {
    case 'MATCH': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'SUSPICIOUS': return 'bg-red-100 text-red-700 border-red-200';
    case 'MISMATCH': return 'bg-amber-100 text-amber-700 border-amber-200';
    default: return 'bg-slate-100';
  }
};
</script>

<template>
  <div class="flex h-[calc(100vh-200px)] gap-6 animate-enter">
    
    <div class="w-1/3 flex flex-col gap-4">
      
      <div class="flex gap-2 p-1 bg-slate-100 rounded-lg">
        <button 
          v-for="doc in docs" :key="doc.id"
          @click="selectedDocId = doc.id"
          class="flex-1 py-2 text-xs font-bold rounded-md transition-all"
          :class="selectedDocId === doc.id ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'"
        >
          {{ doc.type }}
        </button>
      </div>

      <div class="flex-1 overflow-y-auto space-y-3 pr-2">
        <div v-if="isLoading" class="space-y-3">
           <div v-for="i in 3" :key="i" class="h-24 bg-slate-50 rounded animate-pulse"></div>
        </div>
        
        <div 
          v-for="item in currentFindings" 
          :key="item.id"
          @click="activeFindingId = item.id"
          class="p-4 border rounded-lg cursor-pointer transition-all duration-200 group relative overflow-hidden"
          :class="activeFindingId === item.id 
            ? 'bg-primary/5 border-primary shadow-sm' 
            : 'bg-white border-slate-200 hover:border-slate-300'"
        >
          <div class="absolute left-0 top-0 bottom-0 w-1" 
             :class="activeFindingId === item.id ? 'bg-primary' : 'bg-transparent'">
          </div>
          
          <div class="flex justify-between items-start mb-1">
            <span class="text-xs font-bold text-slate-500 uppercase">{{ item.label }}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded font-bold" :class="getStatusColor(item.status)">
              {{ item.status }}
            </span>
          </div>
          
          <div class="font-mono text-sm font-bold text-slate-800 mb-2 truncate">
            "{{ item.value }}"
          </div>
          
          <p class="text-xs text-slate-500 flex items-center gap-1">
            <span class="material-icons-outlined text-[14px] text-primary" v-if="item.status === 'SUSPICIOUS'">warning</span>
            {{ item.message }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex-1 bg-slate-800 rounded-xl p-8 overflow-hidden relative shadow-inner flex flex-col items-center">
      
      <div class="absolute top-4 bg-slate-700/80 backdrop-blur text-white px-4 py-1.5 rounded-full flex gap-4 text-xs font-bold shadow-lg z-20">
         <span class="flex items-center gap-1 cursor-pointer hover:text-primary"><span class="material-icons-outlined text-sm">zoom_out</span> 80%</span>
         <span class="flex items-center gap-1 cursor-pointer hover:text-primary"><span class="material-icons-outlined text-sm">zoom_in</span></span>
         <div class="w-px bg-slate-500"></div>
         <span>Page 1 / {{ docs.find(d => d.id === selectedDocId)?.pageCount || 1 }}</span>
      </div>

      <div class="bg-white w-[500px] h-[700px] shadow-2xl relative transition-transform duration-300 origin-top">
         
         <div class="p-10 space-y-6 opacity-20 pointer-events-none select-none">
            <div class="h-8 bg-slate-900 w-1/3 mb-10"></div> <div class="flex justify-between">
               <div class="space-y-2 w-1/3">
                  <div class="h-2 bg-slate-400 w-full"></div>
                  <div class="h-2 bg-slate-400 w-2/3"></div>
               </div>
               <div class="space-y-2 w-1/3 text-right">
                  <div class="h-4 bg-slate-800 w-full"></div>
                  <div class="h-2 bg-slate-400 w-full"></div>
               </div>
            </div>
            <div class="h-px bg-slate-300 my-8"></div>
            <div class="space-y-3">
               <div v-for="n in 8" :key="n" class="h-3 bg-slate-300 w-full"></div>
            </div>
         </div>

         <div 
           v-for="item in currentFindings" 
           :key="item.id"
           class="absolute border-2 transition-all duration-300 cursor-pointer group"
           :class="[
             activeFindingId === item.id 
               ? 'bg-primary/20 border-primary z-10 shadow-lg shadow-primary/20 scale-105' 
               : 'bg-yellow-200/30 border-yellow-400/50 hover:bg-yellow-200/50'
           ]"
           :style="{
             left: item.box.x + '%',
             top: item.box.y + '%',
             width: item.box.w + '%',
             height: item.box.h + '%'
           }"
           @click.stop="activeFindingId = item.id"
         >
           <div 
             v-if="activeFindingId === item.id"
             class="absolute -top-6 left-0 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap"
           >
             {{ item.label }} ({{ item.confidence }}%)
           </div>
         </div>

      </div>
    </div>

  </div>
</template>