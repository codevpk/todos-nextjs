"use client"

import { useAuthContext } from './Auth'
import Loader from '@/components/ui/screen-loader'

const ScreenLoader = ({ children }) => {
    const { isAppLoading } = useAuthContext()
    return (
        <>
            {children}
            {isAppLoading && <Loader />}
        </>
    )

}

export default ScreenLoader