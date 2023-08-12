
const sortByOptions = {
    'Relevance': '',
    'Download Count': 'downloads',
    'Follow Count': 'follows',
    'Recently Published': 'newest',
    'Recently Updated': 'updated'
};

const showPerPage = {
    '5':'5',
    '10':'10',
    '15':'15',
    '20':'20',
    '50':'50',
    '100':'100'
};

const searchFabric = {
    date_modified: new Date(),
    downloads: 777777,
    follows: 999999,
    client_side: 'required',
    server_side: 'unsupported',
    icon_url: '/logo.png',
    title: 'Fabric API',
    author: 'EL PEPE',
    description: 'This is a mod for that does many stuff like idk. Crap that fabric needs. idk.',
    display_categories: [
        'client',
        'utility',
        'fabric'
    ]
};

const search = [
    searchFabric,
    searchFabric,
    searchFabric,
    searchFabric,
    searchFabric,
    searchFabric
];

module.exports = { sortByOptions, showPerPage, search, searchFabric };