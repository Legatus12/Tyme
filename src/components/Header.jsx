import { useTranslation } from 'react-i18next'

const Header = () => {

    const { i18n } = useTranslation()

    return (
        <div className='flex flex-col items-center gap-8'>
          <img src="src/img/tyme.png" alt="TYME" className='auth-img'/>
          <div className='auth-languages'>
            <div className='flex justify-around items-center'>
              <button onClick={() => i18n.changeLanguage('en')} className={ i18n.resolvedLanguage == "en" ? 'font-black' : '' }>en</button>
              <img src="src/img/en.png" className='w-8' />
            </div>
            <span>|</span>
            <div className='flex justify-around items-center'>
              <button onClick={() => i18n.changeLanguage('es')} className={ i18n.resolvedLanguage == "es" ? 'font-black' : '' }>es</button>
              <img src="src/img/es.png" className='w-8' />
            </div>
          </div>
        </div>
    )
}

export default Header