import {useLocation} from 'react-router-dom'
import * as qs from 'query-string' 
export function useQuery(){
    return qs.parse(useLocation().search)
}