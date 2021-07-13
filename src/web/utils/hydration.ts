export enum HydrationKey {
    Projects = '__PROJECTS__',
}

export function saveStateToDom<S>(key: string, state?: S): string {
    if (state === undefined) {
        return ''
    }

    const stateString = JSON.stringify(state)
    return `window.${key} = ${JSON.stringify(stateString)}`
}

export function loadStateFromDom<S>(key: HydrationKey): S | undefined {
    if (typeof window === 'undefined') {
        throw new Error('Trying to hydrate from outside of browser')
    }

    const state = window[key]
    if (!state) {
        return
    }

    return JSON.parse(state) as S
}
