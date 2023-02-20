<template>
  <div class="black_lava">
    <div class="treeEditor">
      <baklava-editor :plugin="viewPlugin"></baklava-editor>
      <div class="editorPart">
        <div class="DataTree">
          <h3>node tree que je veux</h3>
          <pre>{{ nodeTree }}</pre>
          <hr>
          <h3>node tree qu'on nous donne </h3>
          <pre>{{ jsonDataTree }}</pre>
        </div>
      </div>
    </div>
    <button @click="isShow()">template</button>
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
import ReponseComponents from "~/components/options/ReponseComponents.vue"

export default {
  components: { OptionsChoice, ModalTemplate, ReponseComponents },
    data: () => ({
        editor: new Editor(),
        viewPlugin: new ViewPlugin(),
        engine: new Engine(true),
        intfTypePlugin: new InterfaceTypePlugin(),
        reponseValue: ''
    }),
    computed: {
      ...mapState('BakLavaStore', ['showModal', 'nodeTree', 'jsonDataTree'])
    },
    created() {
      this.editor.use(this.viewPlugin)
      this.editor.use(this.engine)
      this.editor.use(new OptionPlugin())
      this.editor.use(this.intfTypePlugin)
      this.intfTypePlugin.addType("number", "#00FF00");
      this.viewPlugin.registerOption('ChoiceNode', OptionsChoice)
      this.viewPlugin.registerOption('ResponseNode', ReponseComponents)

    // create new node
    const ChoiceNode = new NodeBuilder("choix")
      .addOption('choiceNode', 'ChoiceNode','Question', undefined )
      .addOutputInterface('output')
      .addInputInterface('input')
      .build()

    const ResponseStep = new NodeBuilder("response")
      .addOption('response', 'ResponseNode','Response', undefined )
      .addInputInterface('input')
      .addOutputInterface('output')
      .build()

    this.editor.registerNodeType("OutputNode", OutputNode)
    this.editor.registerNodeType("ChoiceSelect", ChoiceNode)
    this.editor.registerNodeType("ResponseStep", ResponseStep)
    this.$nuxt.$on('setJsonTree', () => {
      this.getValue()
    })
    },
    // @TODO: tenter de recupérer la totalité des réponse qui sont connécté au parent

    methods: {
      isShow() {
        this.$store.commit('BakLavaStore/SHOW_MODAL', true)
      },
      getValue() {
        const saveEditor = this.editor.save()
        this.$store.commit('BakLavaStore/SET_JSON_DATA_TREE', saveEditor)
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
.node-editor {
  width: 90vh;
  height: 90vh;
}
.treeEditor {
  display: flex;
  justify-content: center;
  width: 100%;
}
.editorPart {
  display: flex;
  flex-direction: column;
  width: 25%;
  border: 1px solid black;
}
.introductionParams, .questionParams {
  border: 1px solid black;
  height: 50%;
  border-radius: 35px;
}
</style>

<style>
body {
  margin: 0;
}
</style>
