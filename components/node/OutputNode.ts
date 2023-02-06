import { Node } from '@baklavajs/core'

export class OutputNode extends Node {
    public type = 'Infos'
    public name = this.type

    public constructor() {
        super()
        this.addInputInterface('Votre texte ici', 'InputOption')
    }

    public calculate() {
        this.setOptionValue('output', this.getInterface('Input').value)
        return { test: true }
    }
}
export class OutputChoiceNode extends Node {
    public type = 'choice'
    public name = this.type

    public constructor() {
        super()
        // modifié par add option qui permet de créer nos propre output contrairement a addInputInterface
        this.addInputInterface('introduction', 'InputOption')
        this.addInputInterface('question', 'InputOption')
        this.addInputInterface('reponse', 'InputOption')
    }

    public calculate() {
    }
}
