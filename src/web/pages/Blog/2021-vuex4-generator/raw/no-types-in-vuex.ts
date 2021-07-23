import { createStore } from 'vuex'

interface State {
    count: number
}

const store = createStore<State>({
    state: () => {
        return { count: 0 }
    },
    mutations: {
        increment: (state, amount: number) => {
            state.count += amount
        },
    },
})

// All of these are valid Typescript
store.commit('increment', 42)
store.commit('increment', { anything: 'can be here' })
store.commit('increment')
store.commit('inc', 42)
