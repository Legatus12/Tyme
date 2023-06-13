import ThemeSwitcher from './dashboard/settings/ThemeSwitcher'
import LanguageSwitcher from './dashboard/settings/LanguageSwitcher'

const Header = () => {

    return (
        <div className='hidden md:flex justify-between items-center p-2'>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
    )
}

export default Header