import { MutationTree } from 'vuex'
import { ExampleState } from '.'

// ----------------------------------------------------------------------------
// Interfaces
// ----------------------------------------------------------------------------

export enum ExampleMutation {
    INCREMENT = 'INCREMENT',
}

// ----------------------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------------------

export interface ExampleMutations {
    [ExampleMutation.INCREMENT]: (state: ExampleState, payload?: number) => void
}

export const mutations: MutationTree<ExampleState> & ExampleMutations = {
    [ExampleMutation.INCREMENT]: (state, payload) => {
        if (payload === undefined) {
            throw new Error('Missing Payload')
        }

        state.count += payload
    },
}
