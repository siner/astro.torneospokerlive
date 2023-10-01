/* eslint-disable @next/next/no-img-element */
import { getSimpleDate } from '../../lib/utils'

export default function CardEvento(props) {
    var evento = props.evento
    let datestringfrom = getSimpleDate(evento.desde)
    let datestringto = getSimpleDate(evento.hasta)
    const bg = evento.casino.color
    const now = new Date()
    const lastday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    ).getTime()
    const created_at = new Date(evento.createdAt).getTime()
    const isnew = created_at > lastday

    return (
        <a href={'/eventos/' + evento.slug}>
            <div className="indicator w-full">
                <div className="grid card w-full bg-base-100 shadow-lg rounded-md h-80">
                    <figure
                        className="h-32 md:h-40"
                        style={{ backgroundColor: bg }}
                    >
                        <img
                            className="max-h-48 md:max-h-64 mx-auto object-cover"
                            src={`https://wsrv.nl/?url=${evento.circuito.logo}&w=300&h=150&fit=contain`}
                            alt={evento.nombre}
                        />
                    </figure>
                    <div className="card-body items-center text-center p-4 md:p-8">
                        <div className="flex justify-between mb-4 w-full">
                            <div className="flex content-center space-x-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                    />
                                </svg>
                                <span>{datestringfrom}</span>
                            </div>
                            <div className="flex content-center space-x-1">
                                <span>{datestringto}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h2 className="card-title">
                            <span className="font-bold mb-2">
                                {evento.nombre}
                            </span>
                        </h2>
                    </div>
                </div>
            </div>
        </a>
    )
}
