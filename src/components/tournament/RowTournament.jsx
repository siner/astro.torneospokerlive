/* eslint-disable @next/next/no-img-element */
import { formatDate, getTextColor } from '../../lib/utils'

export default function RowTournament(props) {
    var { torneo, casino, event } = props

    const backgroundColor = torneo.casino.color
    const textColor = getTextColor(backgroundColor)

    let datetorneo = new Date(torneo.fecha)
    if (datetorneo < new Date('2023-09-01'))
        datetorneo.setHours(datetorneo.getHours() - 2)

    let { datestring, hour } = formatDate(datetorneo)
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let opacity = datetorneo < today ? '0.6' : '1'

    const now = new Date()
    const lastday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    ).getTime()
    const created_at = new Date(torneo.createdAt).getTime()

    const isnew = created_at > lastday

    return (
        <div
            className="flex flex-col w-full bg-base-100 base-content hover:bg-base-200 border-solid border shadow-sm"
            style={{
                opacity: opacity,
            }}
        >
            <div
                className="flex flex-row w-full md:hidden justify-between px-1"
                style={{
                    backgroundColor: backgroundColor,
                    color: textColor,
                }}
            >
                {casino && (
                    <div className="text-xs md:hidden">
                        {torneo.casino.name}
                    </div>
                )}
                <div className="text-xs">
                    {datestring} - {hour}
                </div>
            </div>
            <div className="flex flex-row w-full">
                <div className="flex items-center justify-between flex-1 cursor-pointer select-none w-full">
                    {casino && (
                        <div
                            className="hidden md:flex flex-col items-center justify-center rounded-full mx-2"
                            style={{
                                backgroundColor: backgroundColor,
                            }}
                        >
                            <div
                                className="tooltip"
                                data-tip={torneo.casino.nombre}
                            >
                                <a
                                    href={'/casinos/' + torneo.casino.slug}
                                    className="relative block"
                                >
                                    <img
                                        src={`https://wsrv.nl/?url=${torneo.casino.logo}&w=30&h=30&fit=contain&mask=circle`}
                                        width={30}
                                        height={30}
                                        alt={'Logo ' + torneo.casino.nombre}
                                        className="mx-auto"
                                    />
                                </a>
                            </div>
                        </div>
                    )}

                    <div className="grow pl-1 mr-2 md:mr-5 p-2">
                        <a href={'/torneos/' + torneo.slug}>
                            <div className="flex space-x-2 items-center content-center font-medium text-sm md:text-base">
                                {event && torneo.evento && (
                                    <div
                                        className="tooltip"
                                        data-tip={torneo.evento.nombre}
                                    >
                                        <a
                                            href={
                                                '/eventos/' + torneo.evento.slug
                                            }
                                            className="relative block"
                                        >
                                            <img
                                                src={`https://wsrv.nl/?url=${torneo.evento.circuito.logo}&w=30&h=30&fit=contain&mask=circle`}
                                                width={30}
                                                height={30}
                                                alt={
                                                    'Icono ' +
                                                    torneo.evento.nombre
                                                }
                                                className="w-8 mr-2"
                                            />
                                        </a>
                                    </div>
                                )}
                                <span>{torneo.nombre}</span>
                                {isnew && (
                                    <span className="badge badge-warning warning-content ml-2">
                                        New
                                    </span>
                                )}
                            </div>
                        </a>
                    </div>

                    <div className="pl-1 mr-2 md:mr-5 text-right p-2 w-24 md:w-40">
                        <a href={'/torneos/' + torneo.slug}>
                            <div className="text-xs hidden md:block">
                                {datestring} - {hour}
                            </div>
                            <div className="text-base font-bold md:hidden">
                                {parseInt(torneo.precio) > 0 && (
                                    <span>{torneo.precio}€</span>
                                )}
                            </div>
                        </a>
                    </div>

                    <div className="pl-1 mr-2 md:mr-5 text-right p-2 hidden md:block w-24">
                        <a href={'/torneos/' + torneo.slug}>
                            <div className="text-xl font-bold">
                                {parseInt(torneo.precio) > 0 && (
                                    <span>{torneo.precio}€</span>
                                )}
                            </div>
                        </a>
                    </div>

                    <a
                        href={'/torneos/' + torneo.slug}
                        className="flex justify-end w-4 md:w-8 text-right"
                    >
                        <svg
                            className="w-5 md:w-10"
                            width="20"
                            fill="currentColor"
                            height="20"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}
