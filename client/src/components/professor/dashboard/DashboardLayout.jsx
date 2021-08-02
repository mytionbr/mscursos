import React, { useState } from 'react'
import { experimentalStyled } from '@material-ui/core'
import { Outlet } from 'react-router-dom'
import DashboardNavbar from './DashboardNavbar'

const DashboardLayoutRoot = experimentalStyled('div')(
    ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        with: '100%'
    })
)

const DashboardLayoutWrapper = experimentalStyled('div')(
    ({theme}) => ({
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 64,
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 256
        }
    })
)

const DashboardLayoutContainer = experimentalStyled('div')({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
})

const DashboardLayoutContent = experimentalStyled('div')({
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
})

function DashboardLayout() {
    const [isMobileNavOpen, setMobileNavOpen] = useState(false)
    
    return (
        <DashboardLayoutRoot>
            <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
            <DashboardSidebar
                onMobileClose={()=> setMobileNavOpen(false)}
                openMobile={isMobileNavOpen}
            />
            <DashboardLayoutWrapper>
                <DashboardLayoutContainer>
                    <DashboardLayoutContent>
                        { Outlet }
                    </DashboardLayoutContent>
                </DashboardLayoutContainer>
            </DashboardLayoutWrapper>
        </DashboardLayoutRoot>
    )
}

export default DashboardLayout
