<template>
  <div>
    <div class="black_lava">
      <baklava-editor style="width:90vw;height:90vh" :plugin="viewPlugin"></baklava-editor>
    </div>
    <button @click="getValue($event)">click</button>
    <ModalTemplate v-if="showModal"/>
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
      ...mapState(['showModal'])
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
       this.editor.nodes.forEach((element) => {
        element.options.forEach((option) => console.log('option', option.value))
       });
      }
    }
}
</script>

<style scoped>
.black_lava {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

</style>

<style>
body {
  margin: 0;
}
</style>
