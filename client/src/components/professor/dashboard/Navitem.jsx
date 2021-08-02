import React from 'react'
import { useLocation } from 'react-router-dom'

function Navitem({href, icon: Icon, title, ...rest}) {
    const location = useLocation()

    const active = href ? !!matchPath({
        path: href,
        end: false
    }, location.pathname) : false
    
    return (
        <div>
            
        </div>
    )
}

export default Navitem
