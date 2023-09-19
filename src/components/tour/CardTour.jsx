/* eslint-disable @next/next/no-img-element */
export default function CardTour({ tour }) {
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure className="h-32 md:h-40">
                <a href={'/circuitos/' + tour.slug}>
                    <img
                        className="max-h-48 md:max-h-64 mx-auto object-cover"
                        src={`https://wsrv.nl/?url=${tour.logo}&w=300&h=150&fit=contain`}
                        width={300}
                        height={150}
                        alt={tour.nombre}
                    />
                </a>
            </figure>
            <div className="card-body items-center justify-center text-center padding p-4 md:p-8">
                <h2 className="card-title">
                    <a href={'/circuitos/' + tour.slug} className="font-bold">
                        {tour.nombre}
                    </a>
                </h2>
            </div>
        </div>
    )
}
