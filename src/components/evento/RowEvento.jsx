/* eslint-disable @next/next/no-img-element */
import { getSimpleDate, getTextColor } from '../../lib/utils'

export default function RowEvento(props) {
    var { evento, showtour } = props
    evento = evento

    let datestringfrom = getSimpleDate(evento.desde)
    let datestringto = getSimpleDate(evento.hasta)
    const backgroundColor = evento.casino.color
    const textColor = getTextColor(backgroundColor)

    let dateevento = new Date(evento.hasta)
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let opacity = dateevento < today ? '0.8' : '1'
    const now = new Date()
    const lastday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1
    ).getTime()
    const created_at = new Date(evento.createdAt).getTime()
    const isnew = created_at > lastday

    return (
        <a href={'/eventos/' + evento.slug}>
            <div
                className="flex flex-col w-full bg-base-100 base-content hover:bg-base-200 border-solid border shadow-sm"
                style={{
                    opacity: opacity,
                }}
            >
                <div className="flex flex-row w-full md:hidden justify-between p-1 text-xs bg-base-200">
                    <div>{evento.casino.nombre}</div>
                    <div>
                        {datestringfrom} - {datestringto}
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    <div className="flex items-center justify-between flex-1 cursor-pointer select-none w-full">
                        <div
                            className="hidden md:flex flex-col items-center justify-center rounded-full mx-2"
                            style={{
                                backgroundColor: backgroundColor,
                            }}
                        >
                            <img
                                src={`https://wsrv.nl/?url=${evento.casino.logo}&w=30&h=30&fit=contain&mask=circle`}
                                width={30}
                                height={30}
                                alt={'Logo ' + evento.casino.nombre}
                                className="mx-auto object-cover"
                            />
                        </div>
                        {showtour && (
                            <div className="flex flex-col items-center justify-center w-14 h-10 mr-4 p-2">
                                {evento && (
                                    <img
                                        src={`https://wsrv.nl/?url=${evento.circuito.logo}&w=30&h=30&fit=contain&mask=circle`}
                                        width={30}
                                        height={30}
                                        alt={'Icono ' + evento.nombre}
                                        className="mx-auto"
                                    />
                                )}
                            </div>
                        )}

                        <div className="pl-1 mr-2 md:mr-5 p-2 grow">
                            <div className="font-medium text-sm md:text-base">
                                {evento.nombre}
                            </div>
                        </div>
                        <div className="hidden md:block pl-1 mr-2 text-right md:text-left p-2">
                            <div className="text-xs">
                                <div className="flex justify-between text-xs md:text-base">
                                    <div className="flex content-right items-center space-x-1">
                                        <span>
                                            {datestringfrom}{' '}
                                            <span className="hidden md:inline">
                                                -
                                            </span>{' '}
                                            {datestringto}
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="hidden md:inline w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}
