<script setup lang="ts">
const dark = useState('dark', () => false)
const product = useState('product', () => 'Glucozen')
const country = useState('country', () => 'Guatemala')
function applyTheme(value: boolean) { if (!import.meta.client) return; document.documentElement.classList.toggle('dark', value); document.body.classList.toggle('dark', value); document.documentElement.dataset.theme = value ? 'dark' : 'light'; document.documentElement.style.colorScheme = value ? 'dark' : 'light' }
function toggleTheme() { dark.value = !dark.value; applyTheme(dark.value) }
watch(dark, applyTheme, { immediate: true })
onMounted(() => applyTheme(dark.value))
</script>
<template>
  <div :class="dark ? 'dark' : ''" class="min-h-screen bg-cream text-ink dark:bg-slate-950 dark:text-slate-100">
    <header class="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div class="flex items-center justify-between gap-4 px-5 py-3 lg:px-7">
        <NuxtLink to="/" class="flex items-center gap-3"><span class="grid h-9 w-9 place-items-center rounded-xl bg-ink text-sm font-bold text-white">CL</span><span class="font-display text-lg font-bold">CopyLab <span class="text-brand">COD</span></span></NuxtLink>
        <div class="hidden items-center gap-3 md:flex"><label class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Producto<input v-model="product" :style="{ color: dark ? '#f8fafc' : '#0f172a', backgroundColor: dark ? '#1e293b' : '#ffffff' }" class="ml-2 w-32 rounded-lg border border-slate-200 px-2 py-1.5 text-sm font-medium outline-none focus:border-brand dark:border-slate-700"></label><label class="text-[10px] font-bold uppercase tracking-wider text-slate-400">País<select v-model="country" :style="{ color: dark ? '#f8fafc' : '#0f172a', backgroundColor: dark ? '#1e293b' : '#ffffff' }" class="ml-2 rounded-lg border border-slate-200 px-2 py-1.5 text-sm font-medium outline-none focus:border-brand dark:border-slate-700"><option>Guatemala</option><option>Perú</option><option>Colombia</option><option>España</option></select></label><span class="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">● Modo ABO</span></div>
        <div class="flex items-center gap-3"><nav class="app-nav hidden items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-200 lg:flex"><NuxtLink to="/admin" class="hover:text-brand">Admin</NuxtLink></nav><button type="button" class="btn-secondary !rounded-full !p-2.5" aria-label="Cambiar entre modo claro y oscuro" @click="toggleTheme">{{ dark ? '☀' : '☾' }}</button></div>
      </div>
    </header>
    <main><NuxtPage /></main>
  </div>
</template>
