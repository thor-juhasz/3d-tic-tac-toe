<template>
    <header class="flex flex-col md:flex-row justify-between gap-8">
        <div class="flex justify-center">
            <Logo height="100%" />
            <div class="flex flex-col text-center ml-4 my-2">
                <h3 class="text-emerald-400 m-0">"3D" Tic-Tac-Toe</h3>
                <p class="text-emerald-400 m-0">A nested game of Tic-Tac-Toe<br>written in VueJS</p>
            </div>
        </div>
        <div class="flex justify-center items-center gap-4">
            <Button class="!text-sm whitespace-nowrap" @click="showHelp()">How to play?</Button>
            <a class="text-sky-600 dark:test-sky-400 no-underline hover:underline" href="https://github.com/thor-juhasz/3d-tic-tac-toe/issues" target="_blank">Found an issue?</a>
            <a href="https://github.com/thor-juhasz/3d-tic-tac-toe" target="_blank" aria-label="GitHub repository">
                <GitHub class="transition-colors fill-slate-400 hover:fill-slate-200" />
            </a>
            <Menu as="div" class="relative ml-3">
                <MenuButton class="flex rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none dark:focus:ring-white">
                    <span class="sr-only">Theme</span>
                    <Moon v-if="themePreference === 'dark'" class="transition-colors fill-slate-400 hover:fill-slate-200" />
                    <Sun v-else-if="themePreference === 'light'" class="transition-colors fill-slate-400 hover:fill-slate-200" />
                    <Computer v-else class="transition-colors fill-slate-400 hover:fill-slate-200" />
                </MenuButton>
                <transition enter-active-class="transition ease-out duration-200"
                            enter-from-class="transform opacity-0 scale-90"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-90">
                    <MenuItems :class="[
                        'absolute right-0 z-10 mt-4 origin-top-right rounded-md bg-white dark:bg-gray-800',
                        'shadow-lg ring-1 ring-neutral-700 ring-opacity-20 dark:ring-neutral-500 focus:outline-none'
                    ]">
                        <MenuItem v-slot="{ active }" class="m-1 transition-colors fill-slate-400 hover:fill-slate-200">
                            <button class="rounded-md block px-3 py-2 text-sm text-gray-700 dark:text-gray-300"
                                    :class="[
                                        active
                                            ? 'bg-blue-300 dark:bg-gray-700' : '',
                                    ]"
                                    @click="preferLight">
                                <Sun />
                            </button>
                        </MenuItem>
                        <MenuItem v-slot="{ active }" class="m-1 transition-colors fill-slate-400 hover:fill-slate-200">
                            <button class="rounded-md block px-3 py-2 text-sm text-gray-700 dark:text-gray-300"
                                    :class="[
                                        active
                                            ? 'bg-blue-300 dark:bg-gray-700' : '',
                                    ]"
                                    @click="preferDark">
                                <Moon />
                            </button>
                        </MenuItem>
                        <MenuItem v-slot="{ active }" class="m-1 transition-colors fill-slate-400 hover:fill-slate-200">
                            <button class="rounded-md block px-3 py-2 text-sm text-gray-700 dark:text-gray-300"
                                    :class="[
                                        active ?
                                            'bg-blue-300 dark:bg-gray-700' : '',
                                    ]"
                                    @click="preferSystemSetting">
                                <Computer />
                            </button>
                        </MenuItem>
                    </MenuItems>
                </transition>
            </Menu>
        </div>
    </header>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import Button from '@/components/Button.vue'
import { computed, onBeforeMount, ref } from 'vue'
import GitHub from '@/assets/github.svg'
import Logo from '@/assets/logo2.svg'
import Moon from '@/assets/moon.svg'
import Sun from '@/assets/sun.svg'
import Computer from '@/assets/computer.svg'

const themePreference = ref<'system' | 'dark' | 'light'>('system')

const emit = defineEmits<{
    (e: 'showHelp'): void,
}>()

onBeforeMount(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || osPrefersDark.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

    if ('theme' in localStorage) {
        if (['system', 'dark', 'light'].includes(localStorage.theme)) {
            themePreference.value = localStorage.theme
        }
    }
})

const osPrefersDark = computed(() => {
    const hasThemeSet = 'theme' in localStorage

    return !hasThemeSet && window.matchMedia('(prefers-color-scheme: dark)').matches
})

function showHelp(): void {
    emit('showHelp')
}

function preferLight(): void {
    localStorage.theme = 'light'
    document.documentElement.classList.remove('dark')
    themePreference.value = 'light'
}
function preferDark(): void {
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark')
    themePreference.value = 'dark'
}

function preferSystemSetting(): void {
    localStorage.removeItem('theme')
    if (osPrefersDark.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
    themePreference.value = 'system'
}
</script>
