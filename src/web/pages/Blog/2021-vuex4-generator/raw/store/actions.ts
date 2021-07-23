import { sleep } from '@/common/utils/sleep'
import { ActionContext, ActionTree } from 'vuex'
import { ExampleState } from '.'
import { ExampleGetters } from './getters'
import { ExampleMutations, ExampleMutation } from './mutations'

// ----------------------------------------------------------------------------
// Interfaces
// ----------------------------------------------------------------------------

export enum ExampleAction {
    INIT = 'INIT',
}

// ----------------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------------

type TypedActionContext = Omit<ActionContext<ExampleState, ExampleState>, 'commit' | 'dispatch' | 'getters' | 'rootState' | 'rootGetters'> & {
    commit<K extends keyof ExampleMutations>(
        key: K,
        payload?: Parameters<ExampleMutations[K]>[1]
    ): ReturnType<ExampleMutations[K]>

    // eslint-disable-next-line no-use-before-define
    dispatch<K extends keyof ExampleActions>(
        key: K,
        // eslint-disable-next-line no-use-before-define
        payload?: Parameters<ExampleActions[K]>[1]
    // eslint-disable-next-line no-use-before-define
    ): ReturnType<ExampleActions[K]>

    getters: {
        [K in keyof ExampleGetters]: ReturnType<ExampleGetters[K]>
    }
}

export interface ExampleActions {
    [ExampleAction.INIT]: (context: TypedActionContext) => Promise<void>
}

export const actions: ActionTree<ExampleState, ExampleState> & ExampleActions = {
    [ExampleAction.INIT]: async({ commit }) => {
        await sleep(1000) // Simulate calling API
        commit(ExampleMutation.INCREMENT, 42)
    },
}
