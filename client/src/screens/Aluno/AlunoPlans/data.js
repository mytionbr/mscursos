import LayersIcon from '@material-ui/icons/Layers';
export const data =  [
    {
        title: 'Básico',
        icon: <LayersIcon/>,
        price: 'R$100,00',
        action: ()=> alert('eita'),
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
        title: 'Médio',
        icon: <LayersIcon/>,
        price: 'R$200,00',
        action: ()=> alert('eita'),
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
        title: 'Avançado',
        icon: <LayersIcon/>,
        price: 'R$300,00',
        action: ()=> alert('eita'),
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