<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="close()">
            <TransitionChild as="template"
                             enter="ease-out duration-300"
                             enter-from="opacity-0"
                             enter-to="opacity-100"
                             leave="ease-in duration-200"
                             leave-from="opacity-100"
                             leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template"
                                     enter="ease-out duration-300"
                                     enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                     enter-to="opacity-100 translate-y-0 sm:scale-100"
                                     leave="ease-in duration-200"
                                     leave-from="opacity-100 translate-y-0 sm:scale-100"
                                     leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div>
                                <div class="mt-3 text-center sm:mt-5">
                                    <DialogTitle as="h1" class="mt-2 font-semibold leading-6 text-gray-900 dark:text-slate-400">
                                        <template v-if="winner">Game winner</template>
                                        <template v-else>Game over</template>
                                    </DialogTitle>
                                    <div class="mt-8">
                                        <div class="flex justify-center">
                                            <template v-if="winner === 'X'">
                                                <XIcon class="m-2.5 w-64 h-64" />
                                            </template>
                                            <template v-else-if="winner === 'O'">
                                                <OIcon class="m-2.5 w-64 h-64" />
                                            </template>
                                            <template v-else>
                                                <h3>No one won this game</h3>
                                            </template>
                                        </div>

                                        <Fireworks v-if="winner" />
                                    </div>
                                </div>
                            </div>
                            <div class="mt-6 sm:mt-6">
                                <Button class="w-full text-sm mt-4" @click="close()">Restart game</Button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import Fireworks from '@/components/Fireworks.vue'
import OIcon from '@/components/icons/OIcon.vue'
import XIcon from '@/components/icons/XIcon.vue'
import { Player } from '@/types.ts'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

defineProps<{
    open: boolean;
    winner: Player;
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

function close(): void {
    emit('close')
}
</script>
