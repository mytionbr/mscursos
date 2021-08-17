import LayersIcon from '@material-ui/icons/Layers';
export const data =  [
    {
        _id: 1,
        title: 'Básico',
        icon: <LayersIcon/>,
        price: '100.00',
        href: '/aluno/matriculas/compra/basico',
        advantages: [
            {
                itHas: true,
                description: 'Programação',
            },
            {
                itHas: true,
                description: 'Front-end',
            },
            {
                itHas: false,
                description: 'Ux e desing',
            },
            {
                itHas: false,
                description: 'Gestão',
            },
            {
                itHas: false,
                description: 'Linguas',
            },
            {
                itHas: false,
                description: 'Data Science',
            },
        ]
    },
    {
        _id: 2,
        title: 'Intermediário',
        icon: <LayersIcon/>,
        price: '200.00',
        href: '/aluno/matriculas/compra/intermediario',
        advantages: [
            {
                itHas: true,
                description: 'Programação',
            },
            {
                itHas: true,
                description: 'Front-end',
            },
            {
                itHas: true,
                description: 'Ux e desing',
            },
            {
                itHas: true,
                description: 'Gestão',
            },
            {
                itHas: false,
                description: 'Linguas',
            },
            {
                itHas: false,
                description: 'Data Science',
            },
        ]
    },
    {
        _id:3,
        title: 'Avançado',
        icon: <LayersIcon/>,
        price: '300.00',
        href: '/aluno/matriculas/compra/avancado',
        advantages: [
            {
                itHas: true,
                description: 'Programação',
            },
            {
                itHas: true,
                description: 'Front-end',
            },
            {
                itHas: true,
                description: 'Ux e desing',
            },
            {
                itHas: true,
                description: 'Gestão',
            },
            {
                itHas: true,
                description: 'Linguas',
            },
            {
                itHas: true,
                description: 'Data Science',
            },
        ]
    },
]