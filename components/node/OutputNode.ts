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
        /**
         * @params (name, component, defaultValue, addition properties)
         */
        this.addOption('Introduction', 'InputOption', 'Introduction', undefined)
        this.addOption('Question', 'InputOption', 'Question', undefined)
        this.addOption('Reponse', 'InputOption', 'Reponse', undefined)
    }

    public calculate() {
    }
}
