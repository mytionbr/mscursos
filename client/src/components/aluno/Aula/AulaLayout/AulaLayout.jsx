import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { findAulasInfo } from '../../../../actions/aulaActions';
import { AULA_INFO_LIST_RESET } from '../../../../constants/aulaConstantes';
import AulaNavbar from '../AulaNavbar/AulaNavbar'
import AulaSidebar from '../AulaSidebar/AulaSidebar'
import useStyles from './styles'
function AulaLayout(props) {
    const cursoSlug = props.match.params.cursoSlug;
    const dispatch = useDispatch()

    const aulaInfoList = useSelector((state) => state.aulaInfoList);
    const { data } = aulaInfoList;

    useEffect(() => {
        if(!data || data.curso.slug !== cursoSlug){
            dispatch({type:AULA_INFO_LIST_RESET})
            dispatch(findAulasInfo(cursoSlug));
        }
    }, [dispatch, cursoSlug, data]);
    
    const classes = useStyles()
    const [isMobileNavOpen, setMobileNavOpen] = useState(false)

    return (
        <div className={classes.dashboardLayoutRoot}>
            <AulaSidebar
                onMobileNavOpen={() => setMobileNavOpen(true)}  />
            <div className={classes.dashboardLayoutWrapper}>
                <AulaNavbar 
                    onMobileNavOpen={() => setMobileNavOpen(true)} />
                <div className={classes.dashboardLayoutContainer}>
                    <div className={classes.dashboardLayoutContent}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AulaLayout
