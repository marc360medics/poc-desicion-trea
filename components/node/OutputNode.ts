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
