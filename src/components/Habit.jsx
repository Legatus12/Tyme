import React, { useState, useRef, useEffect, useContext } from 'react'
import Select from 'react-select'
import { deleteHabitFB, handleRecurHabitDays } from "../../firebase"
import { AuthContext } from '../AuthProvider'
import { useTranslation } from 'react-i18next'
import { isSameDay } from 'date-fns'
import { MiniCalendar } from './MiniCalendar'

export const ModalHabit = ({ habit, onClose }) => {

    const user = useContext(AuthContext)

    const { t, i18n } = useTranslation()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [msgerror, setmsgerror] = useState('')
    const [selectedFrec, setSelectedFrec] = useState();
    //

    useEffect(() => {
        //console.log('open Habit')
        //console.log(habit)
        if (habit !== undefined) {
            setName(habit.name)
            setDescription(habit.description)
        }
        else {

        }
        //console.log('habit from habit => ' + habit.id)
    }, [])

    //


    const deleteHabit = () => {
        deleteHabitFB(habit.id)
        onClose()
    }

    //TODO: Implementar el proyecto OPCIONALMENTE
    const handleSubmit = (event) => {
        event.preventDefault()
        if (name !== '') {
            if (habit !== null) {

            }
            else {

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
        setSelectedFrec(Number(event.target.value));
      };

    return (
        <div className="modal">
            <div className="modal-content" ref={modalRef}>
                <form onSubmit={handleSubmit} className='justify-between'>
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

                    <div className='col-span-2 flex justify-between'>
                        <div>
                            <input
                                type="text"
                                id="description"
                                className='modal-title'
                                value={description}
                                placeholder={'Añade los motivos por los que iniciaste este hábito para motivarte!'}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div>
                                <button onClick={() => addDayOfWeekAndTyme(1)}>L</button>
                                <button onClick={() => addDayOfWeekAndTyme(2)}>M</button>
                                <button onClick={() => addDayOfWeekAndTyme(3)}>X</button>
                                <button onClick={() => addDayOfWeekAndTyme(4)}>J</button>
                                <button onClick={() => addDayOfWeekAndTyme(5)}>V</button>
                                <button onClick={() => addDayOfWeekAndTyme(6)}>S</button>
                                <button onClick={() => addDayOfWeekAndTyme(0)}>D</button>
                                <button onClick={() => addDayOfWeekAndTyme(7)}>Todos</button>
                            </div>
                        </div>
                        <MiniCalendar /** habit={habit}  */ habitId={habit.id}/>
                    </div>
                    <hr />
                    <div className='flex flex-col'>
                        <p className='modal-error'>{msgerror}</p>
                        <div className="modal-footer">
                            <button className='tyme-cancel' onClick={() => close()}>{habit != null ? t('tyme.close') : t('tyme.cancel')}</button>
                            <button className='tyme-save' type="submit">{habit != null ? t('tyme.save') : t('tyme.add')}</button>
                            <button className={`${habit != null ? 'block' : 'hidden'} tyme-delete md:w-fit`} onClick={() => deleteHabit()}>{t('tyme.delete')}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalHabit
