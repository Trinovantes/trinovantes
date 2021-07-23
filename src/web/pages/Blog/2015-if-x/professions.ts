export interface Profession {
    name: string
    actionVerbPresentProgressive: string
    actionVerbPastSimple: string

    product1Category: string
    product1Specifics: string
    product1SpecificsCategory: string
    product1CustomizationPresentSimple: string
    dontCareAboutSpecifics: string

    product2: [string, string]
    product2Alternative: Array<string>
    product2Category: string

    obscureTool: string
    obscureToolCategory: string
    obscureToolPurpose: string
    obscureToolOriginTimePeriod: string
    obscureToolProblems: [string, string]

    newTools: Array<string>
    coworker: string

    carType: string
    carInterior: string
}

export const professions: Array<Profession> = [
    {
        name: 'Backend Developer',
        actionVerbPresentProgressive: 'building',
        actionVerbPastSimple: 'built',

        product1Category: 'web application',
        product1Specifics: 'React',
        product1SpecificsCategory: 'frontend',
        product1CustomizationPresentSimple: 'use whatever JavaScript framework',
        dontCareAboutSpecifics: "The backend is usually separated from the frontend so I don't care what JavaScript framework is used",

        product2: ['MySQL', 'MySQL Enterprise'],
        product2Alternative: ['PostgreSQL', 'MongoDB', 'MSSQL'],
        product2Category: 'databases',

        obscureTool: 'USB 3.0',
        obscureToolCategory: 'flash drives',
        obscureToolPurpose: 'version control',
        obscureToolOriginTimePeriod: 'computers became mainstream',
        obscureToolProblems: [
            'flash drives to be inefficient because only one person can use it at a time',
            "it's harder to undo changes",
        ],

        newTools: [
            'Git',
            'SVN',
        ],
        coworker: 'designer',

        carType: 'enterprise',
        carInterior: 'java-colored',
    },
    {
        name: 'Carpenter',
        actionVerbPresentProgressive: 'building',
        actionVerbPastSimple: 'built',

        product1Category: 'house',
        product1Specifics: 'brown',
        product1SpecificsCategory: 'paint',
        product1CustomizationPresentSimple: 'build them the way',
        dontCareAboutSpecifics: "Once they're built, I don't care what color they get painted",

        product2: ['walnut', 'black walnut'],
        product2Alternative: ['pine', 'oak', 'mahogony'],
        product2Category: 'wood',

        obscureTool: 'a round rock',
        obscureToolCategory: 'rocks',
        obscureToolPurpose: 'bang nails',
        obscureToolOriginTimePeriod: 'craftsman bought a quarry',
        obscureToolProblems: [
            'I hit my fingers too much with the rock',
            'my other hand hurts because the rock is so big',
        ],

        newTools: [
            'my nailgun',
            'a hammer',
        ],
        coworker: 'architect',

        carType: 'brown',
        carInterior: 'black walnut wood',
    },
]
