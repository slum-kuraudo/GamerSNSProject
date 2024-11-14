export default async function game({params}:{ params: Promise<{slug: string}>}) {
    const slug = (await params).slug;

    return(
        <div>
            <h1>{slug}</h1>
        </div>
    )

}