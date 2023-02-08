
interface Entries {
  introduction: string,
  question: string,
  responses: string[]
}

interface State {
  choice: Entries,
  showModal: boolean,
  jsonDataTree: string
}


export const state = () => ({
  choice: {
    introduction: '',
    question: '',
    responses: []
  } as Entries,
  jsonDataTree: '' as string,
  showModal: false as boolean
})

export const mutations = {

  SET_CHOICE(state: State, choice: Entries) {
    state.choice = choice
  },

  SET_SHOW_MODAL(state: State, isShow: boolean) {
    state.showModal = isShow
  },
  SET_JSON_DATA_TREE(state: State, tree: string) {
    state.jsonDataTree = JSON.stringify(tree)
  }
}
