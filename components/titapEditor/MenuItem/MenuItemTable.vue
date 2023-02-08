<template>
    <div class="relative">
        <transition name="fade">
            <div v-if="showTableSizeSelector" class="z-10 absolute w-44 h-48 top-8 bg-white rounded-sm shadow-lg border border-gray-300 justify-center content-center flex gap-1 flex-wrap">
                <div
                    v-for="row in maxDimensions.rows"
                    :key="row"
                    class="flex gap-1 flex-wrap">

                    <div
                        v-for="column in maxDimensions.cols"
                        :key="`${column}-${row}`"
                        :data-col="column"
                        :data-row="row"
                        :class="`w-3 h-3 tab-selector border border-gray-300 cursor-pointer hover:border-blue-600
                          ${lastHoveredSize.cols >= column && lastHoveredSize.rows >= row ? 'tab-selector-active' : ''}
                        `"
                    >
                    </div>

                </div>

                <p>{{ lastHoveredSize.cols }} x {{ lastHoveredSize.rows }}</p>
            </div>
        </transition>
        <div class="flex justify-center">
            <menu-item icon="table-2" title="Ajouter un tableau" :action="() => tableClicked()"/>
        </div>
    </div>
</template>

<script >
import Vue from 'vue'
import MenuItem from '../MenuItem.vue'

export default Vue.extend({
    components: { MenuItem },
    data() {
        return {
            showTableSizeSelector: false,
            maxDimensions: {
                rows: 10,
                cols: 10,
            },
            lastHoveredSize: {
                rows: 0,
                cols: 0,
            },
        }
    },
    mounted() {
        document.addEventListener('click', this.click)
        document.addEventListener('mouseover', this.mouseOver)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.click)
        document.removeEventListener('mouseover', this.mouseOver)
    },
    methods: {
        tableClicked() {
            this.showTableSizeSelector = !this.showTableSizeSelector
        },
        click(e) {
            // close if the target isn't the menu
            if (!this.$el.contains(e.target)) {
                this.reset()
                return
            }

            const target = e.target

            if (target.classList.contains('tab-selector')) {
                const col = parseInt(target.dataset.col, 10)
                const row = parseInt(target.dataset.row, 10)

                this.$emit('tableRequested', {
                    cols: col,
                    rows: row,
                })

                this.reset()
            }
        },
        mouseOver(e) {
            const target = e.target

            if (target.classList.contains('tab-selector')) {
                const col = parseInt(target.dataset.col, 10)
                const row = parseInt(target.dataset.row, 10)
                this.lastHoveredSize = {
                    rows: row,
                    cols: col,
                }
            }
        },
        reset() {
            this.showTableSizeSelector = false
            this.lastHoveredSize = {
                rows: 0,
                cols: 0,
            }
        },
    },
})
</script>

<style scoped lang="scss">
.tab-selector-active {
    background-color: #0070f3;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
