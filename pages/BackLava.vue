<template>
  <div class="black_lava">
    <div>
      <baklava-editor style="width:90vw;height:90vh" :plugin="viewPlugin"></baklava-editor>
    </div>
    <button @click="getValue($event)">GET JSON CLICK HERE !</button>
    <ModalTemplate v-if="showModal"/>
    <p class="jsonData">{{ jsonDataTree }}</p>
  </div>
</template>

<script>
import { Editor, NodeBuilder }  from "@baklavajs/core"
import { ViewPlugin }           from "@baklavajs/plugin-renderer-vue"
import { Engine }               from "@baklavajs/plugin-engine"
import { InterfaceTypePlugin }  from "@baklavajs/plugin-interface-types"
import { OptionPlugin }         from "@baklavajs/plugin-options-vue"
import { mapState }             from "vuex"
import { OutputNode }           from '@/components/node/OutputNode.ts'
import OptionsChoice            from "~/components/options/OptionsChoice.vue"
import ModalTemplate            from "~/components/ModalTemplate.vue"

export default {
  components: { OptionsChoice, ModalTemplate },
    data: () => ({
        editor: new Editor(),
        viewPlugin: new ViewPlugin(),
        engine: new Engine(true),
        intfTypePlugin: new InterfaceTypePlugin(),
        reponseValue: ''
    }),
    computed: {
      ...mapState(['showModal', 'jsonDataTree'])
    },
    created() {
      this.editor.use(this.viewPlugin);
      this.editor.use(this.engine)
      this.editor.use(new OptionPlugin())
      this.editor.use(this.intfTypePlugin)
      this.intfTypePlugin.addType("number", "#00FF00");

      this.viewPlugin.registerOption('ChoiceNode', OptionsChoice)
    // create new node
    const ChoiceNode = new NodeBuilder("choix")
      .addOption('choiceNode', 'ChoiceNode','Question', undefined )
      .addOutputInterface('reponse')
      .build()

    this.editor.registerNodeType("OutputNode", OutputNode)
    this.editor.registerNodeType("ChoiceSelect", ChoiceNode)

    },
    methods: {
      getValue() {
        this.$store.commit('SET_JSON_DATA_TREE', this.editor.save())
      }
    }
}
</script>

<style scoped>
.black_lava {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}
button {
margin-top: 1rem;
}
.jsonData {
  max-width: 20rem;

}
</style>

<style>
body {
  margin: 0;
}
</style>
