import { InjectionKey } from 'vue'
import { CommitOptions, createStore, DispatchOptions, Store, useStore } from 'vuex'
import { mutations, ExampleMutations } from './mutations'
import { actions, ExampleActions } from './actions'
import { getters, ExampleGetters } from './getters'

// ----------------------------------------------------------------------------
// Store
// ----------------------------------------------------------------------------

export interface ExampleState {
    count: number
}

export function createDefaultExampleState(): ExampleState {
    const defaultState: ExampleState = {
        count: 0,
    }

    return defaultState
}

export function createExampleStore(): Store<ExampleState> {
    const store = createStore<ExampleState>({
        state: createDefaultExampleState,
        mutations,
        actions,
        getters,
    })

    return store
}

// ----------------------------------------------------------------------------
// TypeScript Helpers
// ----------------------------------------------------------------------------

type TypedStore = Omit<Store<ExampleState>, 'commit' | 'dispatch' | 'getters'> & {
    commit<K extends keyof ExampleMutations>(
        key: K,
        payload?: Parameters<ExampleMutations[K]>[1],
        options?: CommitOptions
    ): ReturnType<ExampleMutations[K]>
} & {
    dispatch<K extends keyof ExampleActions>(
        key: K,
        payload?: Parameters<ExampleActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<ExampleActions[K]>
} & {
    getters: {
        [K in keyof ExampleGetters]: ReturnType<ExampleGetters[K]>
    }
}

export const injectionKeyExample: InjectionKey<TypedStore> = Symbol('Vuex (Example) InjectionKey')

export function useExampleStore(): TypedStore {
    return useStore(injectionKeyExample)
}
