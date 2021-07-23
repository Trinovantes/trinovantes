import { GetterTree } from 'vuex'
import { ExampleState } from '.'

// ----------------------------------------------------------------------------
// Interfaces
// ----------------------------------------------------------------------------

export enum ExampleGetter {
    DOUBLE = 'DOUBLE',
}

// ----------------------------------------------------------------------------
// Getters
// ----------------------------------------------------------------------------

export interface ExampleGetters {
    [ExampleGetter.DOUBLE]: (state: ExampleState) => number
}

export const getters: GetterTree<ExampleState, ExampleState> & ExampleGetters = {
    [ExampleGetter.DOUBLE]: (state: ExampleState) => {
        return state.count * 2
    },
}
