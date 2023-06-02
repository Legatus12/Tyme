import ThemeSwitcher from './ThemeSwitcher'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {

    return (
        <div className='flex justify-between items-center p-2'>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
    )
}

export default Header