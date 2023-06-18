import { Menu, Transition } from '@headlessui/react'
import { add, addDays, eachDayOfInterval, startOfDay, isAfter, endOfMonth, endOfWeek, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday, startOfWeek, addWeeks } from 'date-fns'
import { useCallback, useEffect, useState, useContext, } from 'react'
import { handleCompletedHabitDays, getHabitById, handleNextHabitDays } from '../../../../../firebase'
import { useTranslation } from 'react-i18next'
import { GlobalContext } from '../../../../GlobalProvider'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function MiniCalendar({ selectedDay, habitId }) {

    const { user } = useContext(GlobalContext)

    const { t } = useTranslation()

    const [habit1, setHabit1] = useState({})
    const [habitDates, setHabitDates] = useState([])
    const [nextDates, setNextDates] = useState([])
    const [date, setDate] = useState(new Date())
    let today = startOfToday()
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())


    //
    const loadHabit = async () => {
        getHabitById(habitId, (res) => {
            //console.log(res.completed)
            loadSetNextDates(res.recur, res.next)
            setHabitDates(res.completed)
            setHabit1(res)
        })
    }


    useEffect(() => {
        loadHabit().catch(console.error);
    }, []);

    const loadSetNextDates = (recur, next) => {
        setNextDates([])
        const currentDate = new Date();
        let finalNextDates = [];
        if (recur.length > 0 && recur.some(r => r === 7)) {
            const dates = eachDayOfInterval({ start: new Date(), end: addDays(new Date(), 365) });
            finalNextDates = dates.map(x => format(x, 'dd-MM-yyyy'));
            console.log(finalNextDates)
        }
        else {
            finalNextDates = next;

            recur.map(n => {
                const nextDay = startOfWeek(currentDate, { weekStartsOn: n }); // El día 4 corresponde al jueves en date-fns
                console.log(nextDay)
                const dayOfWeekList = [];
                for (let i = 0; i < 52; i++) {
                    if (isAfter(startOfDay(addWeeks(nextDay, i)), startOfDay(new Date()))) {
                        const day = addWeeks(nextDay, i);
                        dayOfWeekList.push(format(day, 'dd-MM-yyyy'));
                    }
                }
                finalNextDates = finalNextDates.concat(dayOfWeekList);
            })
        }
        setNextDates(finalNextDates)
    }

    let days = eachDayOfInterval({
        start: startOfWeek(firstDayCurrentMonth),
        end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    })

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    const handleCompleted = (date) => {
        if (!isAfter(startOfDay(date), startOfDay(new Date()))) {
            handleCompletedHabitDays(user.uid, habit1.id, format(date, 'dd-MM-yyyy'))
            //console.log('handleCHeck')
        }
        else {
            handleNextHabitDays(user.uid, habit1.id, format(date, 'dd-MM-yyyy'))
            //console.log('handleNEXT')
        }
    }


    return habit1 !== null ? (
        <div className='calendar-container shrink-0 p-4'>
            <div className="calendar">
                <div className="flex items-center">
                    <h2 className="flex-auto font-semibold">
                        {t('date.month.' + firstDayCurrentMonth.getMonth())} {format(firstDayCurrentMonth, 'yyyy')}
                    </h2>
                    <button type="button" onClick={previousMonth} className="hover:bg-gray duration-200 rounded-full w-10 h-10 p-1 flex justify-center items-center">
                        <img src="/src/assets/img/left.png" alt="" />
                    </button>
                    <button onClick={nextMonth} type="button" className="hover:bg-gray duration-200 rounded-full w-10 h-10 p-1 flex justify-center items-center">
                        <img src="/src/assets/img/right.png" alt="" />
                    </button>
                </div>
                <div className="grid grid-cols-7 text-xs mt-4 leading-6 text-center text-silver">
                    <div>{t('date.d.0')}</div>
                    <div>{t('date.d.1')}</div>
                    <div>{t('date.d.2')}</div>
                    <div>{t('date.d.3')}</div>
                    <div>{t('date.d.4')}</div>
                    <div>{t('date.d.5')}</div>
                    <div>{t('date.d.6')}</div>
                </div>
                <div className="grid grid-cols-7 text-sm">
                    {days.map((day, dayIdx) => (
                        <div
                            onClick={() => setDate(day)}
                            key={day.toString()}
                            className={classNames(
                                dayIdx === 0 && colStartClasses[getDay(day)],
                                ''
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => handleCompleted(day)}
                                className={classNames(
                                    isEqual(day, selectedDay) && 'text-white',
                                    !isEqual(day, selectedDay) && isToday(day) && '',
                                    !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && '',
                                    !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'font-extralight text-lightgray',
                                    isEqual(day, selectedDay) && isToday(day) && '',
                                    isEqual(day, selectedDay) && !isToday(day) && '',
                                    !isEqual(day, selectedDay) && '',
                                    (isEqual(day, selectedDay) || isToday(day)) && 'bg-sunset hover:bg-white text-black',
                                    'mx-auto font-semibold flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray duration-200'
                                )}
                            >
                                <time dateTime={format(day, 'yyyy-MM-dd')}>
                                    {format(day, 'd')}
                                </time>
                            </button>
                            <div className="w-full h-2 flex justify-center">
                                {habitDates.some((date) =>
                                    date == format(day, 'dd-MM-yyyy')
                                ) && (
                                        <div className="w-2 h-2 rounded-full bg-sunset"></div>
                                    )}
                                {nextDates.some((date) =>
                                    date == format(day, 'dd-MM-yyyy')
                                ) && (
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null;
    /**
    else{return(
      <div>
        <Day day={selectedDay}  closeDayModal={closeDayModal} />
      </div>
    )} */
}
export default MiniCalendar

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]
