<template>
  <div>
    <HeaderComponent title="BackLava lib"/>
    <div class="black_lava">
      <baklava-editor style="width:90vw;height:90vh" :plugin="viewPlugin"></baklava-editor>
    </div>
  </div>
</template>

<script>
import { Editor, NodeBuilder }  from "@baklavajs/core"
import { ViewPlugin }           from "@baklavajs/plugin-renderer-vue"
import { Engine }               from "@baklavajs/plugin-engine"
import { InterfaceTypePlugin }  from "@baklavajs/plugin-interface-types"
import { OptionPlugin }         from "@baklavajs/plugin-options-vue"
import { OutputNode, OutputChoiceNode } from '@/components/node/OutputNode.ts'
import HeaderComponent from "~/components/HeaderComponent.vue"

export default {
  components: { HeaderComponent },
    data: () => ({
        editor: new Editor(),
        viewPlugin: new ViewPlugin(),
        engine: new Engine(true),
        intfTypePlugin: new InterfaceTypePlugin()
    }),
    created() {
      this.editor.use(this.viewPlugin);
      this.editor.use(this.engine)
      this.editor.use(new OptionPlugin())
      this.editor.use(this.intfTypePlugin)
      this.intfTypePlugin.addType("number", "#00FF00");
      this.viewPlugin.enableMinimap = true;
    // create new node
    const SelectTestNode = new NodeBuilder("SelectTestNode")
      .addOption("Simple", "SelectOption", "A", undefined, { items: ["A", "B", "C"] })
      .addOption("Advanced", "SelectOption", 3, undefined, { items: [
          { text: "X", value: 1 },
          { text: "Y", value: 2 },
          { text: "Z", value: 3 },
      ] })
      .addOutputInterface("Simple")
      .addOutputInterface("Advanced")
      .onCalculate((n) => {
          n.getInterface("Simple").value = n.getOptionValue("Simple");
          n.getInterface("Advanced").value = n.getOptionValue("Advanced");
      })
      .build();

    const questionNode = new NodeBuilder("choix")
      .addInputInterface('introduction','InputOption')
      .addInputInterface('question', 'InputOption')
      .addInputInterface('reponse', 'InputOption')
      .build()
    // add node to editor
    // this.editor.registerNodeType("info", infoNode);
    this.editor.registerNodeType("question", questionNode)
    this.editor.registerNodeType("SelectTestNode", SelectTestNode)
    this.editor.registerNodeType("OutputNode", OutputNode)
    this.editor.registerNodeType("OutputChoiceNode", OutputChoiceNode)

    },
    methods: {
      getValue() {

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
