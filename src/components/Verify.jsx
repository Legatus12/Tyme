import { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { GlobalContext } from '../GlobalProvider'
import { auth } from '../../fb'

const Verify = () => {

    const { user } = useContext(GlobalContext)

    const { t } = useTranslation()

    if(user && !user.emailVerified) {return (
        <div className='verify full'>
            <img src="/img/tyme.png" alt="TYME" className='w-48'/>
            <p className='verify-message'>{t('verify.message')}</p>
            <button className='verify-button' onClick={() => user.delete()}>{t('verify.cancel')}</button>
        </div>
    )} else if (user) {
        return <Navigate to="/dashboard/overview" replace />
    } else { 
        return <Navigate to="/authentication" replace /> 
    }
}

export default Verify