<template>
    <div class="relative">
        <transition name="fade">
            <div v-if="isTableoptionOpen" class="py-1 z-10 absolute top-0 w-10 bg-white rounded-sm shadow-lg border border-gray-300 justify-center content-center flex gap-1 flex-wrap">
                <menu-item icon="insert-column-left" title="Ajouter une colonne à gauche" :action="() => $emit('action', 'addColumnBefore')"/>
                <menu-item icon="insert-column-right" title="Ajouter une colonne à droite" :action="() => $emit('action', 'addColumnAfter')"/>
                <menu-item icon="delete-column" title="Supprimer une colonne" :action="() => $emit('action', 'deleteColumn')"/>
                <menu-item icon="insert-row-top" title="Ajouter une ligne au dessus" :action="() => $emit('action', 'addRowTop')"/>
                <menu-item icon="insert-row-bottom" title="Ajouter une ligne en dessous" :action="() => $emit('action', 'addRowBottom')"/>
                <menu-item icon="delete-row" title="Supprimer une ligne" :action="() => $emit('action', 'deleteRow')"/>
                <menu-item icon="merge-cells-horizontal" title="Merger les cellules" :action="() => $emit('action', 'mergeCells')"/>
                <menu-item icon="split-cells-horizontal" title="Spliter horizontalement" :action="() => $emit('action', 'splitCell')"/>
                <menu-item icon="delete-bin-2-line" title="Supprimer le tableau" :action="() => $emit('action', 'deleteTable')"/>
            </div>
        </transition>
        <div class="flex justify-center">
            <menu-item :icon="computedIcon" title="Option de tableaux" :action="() => icon ? openTableOption() : null"/>
        </div>
    </div>
</template>

<script >
import Vue from 'vue'
import MenuItem from '../MenuItem.vue'

export default Vue.extend({
    components: { MenuItem },
    props: {
        icon: {
            type: String,
        },
    },
    data() {
        return {
            isTableoptionOpen: false,
        }
    },
    computed: {
        computedIcon() {
            return this.icon ?? 'insert-column-right'
        },
    },
    mounted() {
        document.addEventListener('click', this.close)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.close)
    },
    methods: {
        openTableOption() {
            this.isTableoptionOpen = true
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.isTableoptionOpen = false
            }
        },
    },
})
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;

}
</style>
