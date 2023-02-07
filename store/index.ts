
interface Entries {
  introduction: string,
  question: string,
  responses: string[]
}

interface State {
  choice: Entries,
  showModal: boolean
}


export const state = () => ({
  choice: {
    introduction: '',
    question: '',
    responses: []
  } as Entries,

  showModal: false as boolean
})

export const mutations = {

  SET_CHOICE(state: State, choice: Entries) {
    state.choice = choice
  },

  SET_SHOW_MODAL(state: State, isShow: boolean) {
    state.showModal = isShow
  }
}
