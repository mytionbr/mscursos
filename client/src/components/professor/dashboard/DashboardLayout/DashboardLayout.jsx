import React, { useState } from 'react'
import DashboardNavbar from '../DashboardNavbar'
import DashboardSidebar from '../DashboardSidebar'
import useStyles from './styles'


function DashboardLayout(props) {
    const classes = useStyles()
    const [isMobileNavOpen, setMobileNavOpen] = useState(false)
    
    return (
        <div className={classes.dashboardLayoutRoot}>

            <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
            <DashboardSidebar
                onMobileClose={()=> setMobileNavOpen(false)}
                openMobile={isMobileNavOpen}
            />
            <div className={classes.dashboardLayoutWrapper}>
                <div className={classes.dashboardLayoutContainer}>
                    <div className={classes.dashboardLayoutContent}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout