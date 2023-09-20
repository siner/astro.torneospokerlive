import fetchApi from './strapi'

function mapCircuito(tour: any) {
    return {
        id: tour.id,
        nombre: tour.attributes.nombre,
        slug: tour.attributes.slug,
        logo: tour.attributes.logo.data.attributes.url,
    }
}

function mapCircuitoConEventos(tour: any) {
    return {
        id: tour.id,
        nombre: tour.attributes.nombre,
        slug: tour.attributes.slug,
        logo: tour.attributes.logo.data.attributes.url,
        eventos: tour.attributes.eventos.data.map((evento: any) => {
            return mapEvento(evento)
        }),
    }
}

function mapCasino(casino: any) {
    return {
        id: casino.id,
        nombre: casino.attributes.nombre,
        slug: casino.attributes.slug,
        color: casino.attributes.color,
        descripcion: casino.attributes.descripcion,
        logo: casino.attributes.logo.data.attributes.url,
    }
}

function mapEvento(evento: any) {
    return {
        id: evento.id,
        nombre: evento.attributes.nombre,
        slug: evento.attributes.slug,
        desde: evento.attributes.desde,
        hasta: evento.attributes.hasta,
        createdAt: evento.attributes.createdAt,
        casino: evento.attributes.casino
            ? mapCasino(evento.attributes.casino.data)
            : null,
        circuito: mapCircuito(evento.attributes.tour.data),
    }
}

function mapTorneo(torneo: any) {
    return {
        id: torneo.id,
        nombre: torneo.attributes.nombre,
        slug: torneo.attributes.slug,
        precio: torneo.attributes.precio,
        fecha: torneo.attributes.fecha,
        createdAt: torneo.attributes.createdAt,
        descripcion: torneo.attributes.descripcion,
        casino: mapCasino(torneo.attributes.casino.data),
        evento: torneo.attributes.evento.data
            ? mapEvento(torneo.attributes.evento.data)
            : null,
    }
}

export async function getCasinos(): Promise<any[]> {
    const data = await fetchApi<any>({
        endpoint: 'casinos',
        wrappedByKey: 'data',
        query: {
            'sort[0]': 'nombre:ASC',
            'pagination[page]': '1',
            'pagination[pageSize]': '1000',
            populate: 'logo',
        },
    })
    const datamapped = data.map((casino: any) => {
        return mapCasino(casino)
    })
    return datamapped
}

export async function getCasino(slug: string): Promise<any> {
    const data = await fetchApi<any>({
        endpoint: 'casinos',
        wrappedByKey: 'data',
        query: {
            'filters[slug][$eq]': slug,
            populate: 'deep',
        },
    })
    return mapCasino(data[0])
}

export async function getCircuitos(): Promise<any[]> {
    const data = await fetchApi<any>({
        endpoint: 'tours',
        wrappedByKey: 'data',
        query: {
            'sort[0]': 'nombre:ASC',
            'pagination[page]': '1',
            'pagination[pageSize]': '1000',
            populate: 'logo',
        },
    })
    const datamapped = data.map((circuito: any) => {
        return mapCircuito(circuito)
    })
    return datamapped
}

export async function getCircuito(slug: string): Promise<any> {
    const data = await fetchApi<any>({
        endpoint: 'tours',
        wrappedByKey: 'data',
        query: {
            'filters[slug][$eq]': slug,
            populate: 'deep',
        },
    })
    return mapCircuitoConEventos(data[0])
}

export async function getTorneos(): Promise<{ datamapped: any[]; meta: any }> {
    const result = await fetchApi<any>({
        endpoint: 'torneos',
        query: {
            'sort[0]': 'fecha:DESC',
            'pagination[page]': '1',
            'pagination[pageSize]': '50',
            populate: 'deep',
        },
    })

    const { data, meta } = result
    const datamapped = data.map((torneo: any) => {
        return mapTorneo(torneo)
    })
    return { datamapped, meta }
}

export async function getNextTorneos(): Promise<{
    datamapped: any[]
    meta: any
}> {
    const result = await fetchApi<any>({
        endpoint: 'torneos',
        query: {
            'sort[0]': 'fecha:ASC',
            'pagination[page]': '1',
            'pagination[pageSize]': '50',
            'filters[fecha][$gte]': new Date().toISOString().split('T')[0],
            populate: 'deep',
        },
    })

    const { data, meta } = result
    const datamapped = data.map((torneo: any) => {
        return mapTorneo(torneo)
    })
    return { datamapped, meta }
}

export async function getTodayTorneos(): Promise<{
    datamapped: any[]
    meta: any
}> {
    var today = new Date()
    today.setHours(2, 0, 0, 0)
    var tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(2, 0, 0, 0)
    const result = await fetchApi<any>({
        endpoint: 'torneos',
        query: {
            'sort[0]': 'fecha:ASC',
            'pagination[page]': '1',
            'pagination[pageSize]': '40',
            'filters[fecha][$gte]': today.toISOString().split('T')[0],
            'filters[fecha][$lte]': tomorrow.toISOString().split('T')[0],
            populate: 'deep',
        },
    })

    const { data, meta } = result
    const datamapped = data.map((torneo: any) => {
        return mapTorneo(torneo)
    })
    return { datamapped, meta }
}

export async function getTomorrowTorneos(): Promise<{
    datamapped: any[]
    meta: any
}> {
    var today = new Date()
    today.setDate(today.getDate() + 1)
    today.setHours(2, 0, 0, 0)
    var tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 2)
    tomorrow.setHours(2, 0, 0, 0)

    const result = await fetchApi<any>({
        endpoint: 'torneos',
        query: {
            'sort[0]': 'fecha:ASC',
            'pagination[page]': '1',
            'pagination[pageSize]': '40',
            'filters[$and][0][fecha][$gte]': today.toISOString().split('T')[0],
            'filters[$and][0][fecha][$lte]': tomorrow
                .toISOString()
                .split('T')[0],
            populate: 'deep',
        },
    })

    const { data, meta } = result
    const datamapped = data.map((torneo: any) => {
        return mapTorneo(torneo)
    })
    return { datamapped, meta }
}

export async function getNextTorneosByCasino(id: string): Promise<{
    datamapped: any[]
    meta: any
}> {
    const result = await fetchApi<any>({
        endpoint: 'torneos',
        query: {
            'sort[0]': 'fecha:ASC',
            'pagination[page]': '1',
            'pagination[pageSize]': '20',
            'filters[fecha][$gte]': new Date().toISOString().split('T')[0],
            'filters[casino][id][$eq]': id,
            populate: 'deep',
        },
    })

    const { data, meta } = result
    const datamapped = data.map((torneo: any) => {
        return mapTorneo(torneo)
    })
    return { datamapped, meta }
}

export async function getTorneosByEvento(id: string): Promise<{
    datamapped: any[]
    meta: any
}> {
    const result = await fetchApi<any>({
        endpoint: 'torneos',
        query: {
            'sort[0]': 'fecha:ASC',
            'pagination[page]': '1',
            'pagination[pageSize]': '200',
            'filters[evento][id][$eq]': id,
            populate: 'deep',
        },
    })

    const { data, meta } = result
    const datamapped = data.map((torneo: any) => {
        return mapTorneo(torneo)
    })
    return { datamapped, meta }
}

export async function getTorneo(slug: string): Promise<any> {
    const data = await fetchApi<any>({
        endpoint: 'torneos',
        wrappedByKey: 'data',
        query: {
            'filters[slug][$eq]': slug,
            populate: 'deep',
        },
    })
    return mapTorneo(data[0])
}

export async function getEventos(): Promise<any[]> {
    const data = await fetchApi<any>({
        endpoint: 'eventos',
        wrappedByKey: 'data',
        query: {
            'sort[0]': 'desde:DESC',
            'pagination[page]': '1',
            'pagination[pageSize]': '1000',
            'populate[casino][populate][0]': 'logo',
            'populate[tour][populate][0]': 'logo',
        },
    })
    const datamapped = data.map((evento: any) => {
        return mapEvento(evento)
    })
    return datamapped
}

export async function getEventosByCircuito(id: string): Promise<any[]> {
    const data = await fetchApi<any>({
        endpoint: 'eventos',
        wrappedByKey: 'data',
        query: {
            'sort[0]': 'desde:DESC',
            'filters[tour][id][$eq]': id,
            'populate[casino][populate][0]': 'logo',
            'populate[tour][populate][0]': 'logo',
        },
    })
    const datamapped = data.map((evento: any) => {
        return mapEvento(evento)
    })
    return datamapped
}

export async function getEvento(slug: string): Promise<any> {
    const data = await fetchApi<any>({
        endpoint: 'eventos',
        wrappedByKey: 'data',
        query: {
            'filters[slug][$eq]': slug,
            'populate[casino][populate][0]': 'logo',
            'populate[tour][populate][0]': 'logo',
            populate: 'torneos',
        },
    })
    return data[0] ? mapEvento(data[0]) : null
}

export async function getNextEventos(): Promise<any[]> {
    const data = await fetchApi<any>({
        endpoint: 'eventos',
        wrappedByKey: 'data',
        query: {
            'sort[0]': 'desde:ASC',
            'filters[desde][$gte]': new Date().toISOString().split('T')[0],
            'populate[casino][populate][0]': 'logo',
            'populate[tour][populate][0]': 'logo',
        },
    })
    const datamapped = data.map((evento: any) => {
        return mapEvento(evento)
    })
    return datamapped
}

export async function getCurrentEventos(): Promise<any[]> {
    const data = await fetchApi<any>({
        endpoint: 'eventos',
        wrappedByKey: 'data',
        query: {
            'sort[0]': 'desde:ASC',
            'filters[desde][$lte]': new Date().toISOString().split('T')[0],
            'filters[hasta][$gte]': new Date().toISOString().split('T')[0],
            'populate[casino][populate][0]': 'logo',
            'populate[tour][populate][0]': 'logo',
        },
    })
    const datamapped = data.map((evento: any) => {
        return mapEvento(evento)
    })
    return datamapped
}

export async function getPastEventos(): Promise<any[]> {
    const data = await fetchApi<any>({
        endpoint: 'eventos',
        wrappedByKey: 'data',
        query: {
            'sort[0]': 'desde:DESC',
            'pagination[page]': '1',
            'pagination[pageSize]': '50',
            'filters[hasta][$lte]': new Date().toISOString().split('T')[0],
            'populate[casino][populate][0]': 'logo',
            'populate[tour][populate][0]': 'logo',
        },
    })
    const datamapped = data.map((evento: any) => {
        return mapEvento(evento)
    })
    return datamapped
}
