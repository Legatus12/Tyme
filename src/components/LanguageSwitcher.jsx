import Select from 'react-select'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

const LanguageSwitcher = () => {

    const { i18n } = useTranslation()

    const [lan, setLan] = useState(localStorage.getItem('language'))

    //

    useEffect(() => {
        i18n.changeLanguage(lan)
    }, [lan])

    const handleLanguageSwitch = lan => { 
        setLan(lan.value)
        localStorage.setItem('language', lan.value)
    }

    const options = [
        { value: 'es', label: 'Español' },
        { value: 'en', label: 'English' }
    ]

    return(
        <Select options={options}
        defaultValue={ options.find(lan => lan.value == i18n.resolvedLanguage) }
        onChange={handleLanguageSwitch}
        className="my-react-select-container w-52"
        classNamePrefix="my-react-select" />
    )

}

export default LanguageSwitcher