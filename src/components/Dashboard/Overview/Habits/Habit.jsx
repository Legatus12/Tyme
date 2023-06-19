import React, { useState, useRef, useEffect, useContext } from 'react'
import Select from 'react-select'
import { deleteHabitFB, handleRecurHabitDays, updateHabit } from "../../../../../firebase"
import { GlobalContext } from '../../../../GlobalProvider'
import { useTranslation } from 'react-i18next'
import { isSameDay } from 'date-fns'
import { MiniCalendar } from './MiniCalendar'

export const ModalHabit = ({ habit, onClose }) => {

    const { user } = useContext(GlobalContext)

    const { t } = useTranslation()

    const [name, setName] = useState('')
    const [msgerror, setmsgerror] = useState('')
    const [selectedFrec, setSelectedFrec] = useState()
    //

    useEffect(() => {
        //console.log('open Habit')
        //console.log(habit)
        if (habit !== undefined) {
            setName(habit.name)
        }
        else {

        }
        //console.log('habit from habit => ' + habit.id)
    }, [])

    //

    const deleteHabit = () => {
        if(confirm(t('confirmDelete'))) {
            deleteHabitFB(habit.id)
            onClose()
        }
    }

    //TODO: Implementar el proyecto OPCIONALMENTE
    const handleSubmit = () => {
        if (name !== '') {
            if (habit !== null) {
                const aux = { name: name, completed: habit.completed, next: habit.next, recur: habit.recur, uid: habit.uid }
                updateHabit(habit.id, aux)
                setName('')
                onClose()
            }
        }
        else {
            setmsgerror(t('tyme.noTitle'))
        }
    }

    const modalRef = useRef(null)

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose()
        }
    }

    useEffect(() => {
        const handleMouseDown = (event) => handleClickOutside(event)
        document.addEventListener('mousedown', handleMouseDown)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [])


    const close = () => {
        onClose()
        setmsgerror('')
    }

    const addDayOfWeekAndTyme = (numDay) => {
        handleRecurHabitDays(user.uid, habit.id, numDay)
    }

    const handleSelectFrec = (event) => {
        setSelectedFrec(Number(event.target.value))
    }

    return (
        <div className="modal">
            <div className="modal-content" ref={modalRef}>
                <div className='justify-between'>
                    <div className=''>
                        <input
                            type="text"
                            id="name"
                            className='modal-title'
                            value={name}
                            placeholder={t('tyme.withoutTitle')}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <hr />

                    <div className='full col-span-2 flex flex-col md:flex-row justify-between items-center'>
                        <div className='w-full flex flex-wrap justify-center items-center gap-2 p-4'>
                            <button className='habit-day' onClick={() => addDayOfWeekAndTyme(1)}>L</button>
                            <button className='habit-day' onClick={() => addDayOfWeekAndTyme(2)}>M</button>
                            <button className='habit-day' onClick={() => addDayOfWeekAndTyme(3)}>X</button>
                            <button className='habit-day' onClick={() => addDayOfWeekAndTyme(4)}>J</button>
                            <button className='habit-day' onClick={() => addDayOfWeekAndTyme(5)}>V</button>
                            <button className='habit-day' onClick={() => addDayOfWeekAndTyme(6)}>S</button>
                            <button className='habit-day' onClick={() => addDayOfWeekAndTyme(0)}>D</button>
                            <button className='habit-all' onClick={() => addDayOfWeekAndTyme(7)}>Todos</button>
                        </div>
                        <MiniCalendar habitId={habit.id}/>
                    </div>
                    <hr />
                    <div className='flex flex-col'>
                        <p className='modal-error'>{msgerror}</p>
                        <div className="modal-footer">
                            <button className='modal-cancel' onClick={() => close()}>{habit != null ? t('tyme.close') : t('tyme.cancel')}</button>
                            <button onClick={handleSubmit} className='modal-save' type="submit">{habit != null ? t('tyme.save') : t('tyme.add')}</button>
                            <button className={`${habit != null ? 'block' : 'hidden'} modal-delete md:w-fit`} onClick={() => deleteHabit()}>{t('tyme.delete')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalHabit
