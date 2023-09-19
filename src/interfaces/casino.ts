export default interface Casino {
    id: number
    attributes: {
        nombre: string
        slug: string
        color: string
        descripcion: string
        logo: {
            url: string
        }
        createdAt: string
        updatedAt: string
        publishedAt: string
    }
}
