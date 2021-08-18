import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar'
import DashboardSidebar from '../DashboardSidebar'
import useStyles from './styles'

function DashboardLayout(props) {
    const classes = useStyles()
    const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  
    const dispatch = useDispatch()

    const handleSignout = () => {
       alert('opa')
    } 

    return (
        <div className={classes.dashboardLayoutRoot}>

            <DashboardNavbar 
                    onMobileNavOpen={() => setMobileNavOpen(true)} 
                    handleSignout={handleSignout}/>
            <DashboardSidebar
                onMobileClose={()=> setMobileNavOpen(false)}
                openMobile={isMobileNavOpen}
                handleSignout={handleSignout}
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
