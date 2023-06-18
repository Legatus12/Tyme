import Select from 'react-select'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

const ThemeSwitcher = () => {

    const { t } = useTranslation()

    const [theme, setTheme] = useState(localStorage.getItem('theme'))

    //

    useEffect(() => {
        theme == 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
    }, [theme])

    const handleThemeSwitch = () => {
        if(theme == 'dark') {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        } else {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        }
    }

    const options = [
        { value: 'light', label: t('lightMode') },
        { value: 'dark', label: t('darkMode') }
    ]

    //

    return(
        <Select options={options}
        defaultValue={ localStorage.getItem('theme') == 'light' ? options[0] : options[1] }
        onChange={handleThemeSwitch}
        className="my-react-select-container w-52"
        classNamePrefix="my-react-select" />
    )

}

export default ThemeSwitcher