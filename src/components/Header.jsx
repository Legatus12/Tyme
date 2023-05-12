import { useTranslation } from 'react-i18next'
import ThemeSwitcher from './ThemeSwitcher'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {

    const { i18n } = useTranslation()

    return (
        <div className='flex justify-between items-center p-2'>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
    )
}

export default Header