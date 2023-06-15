

export const paginatedLoad = (start: number) => {
    const finalArray = []
    for (let index = start; index < start + 10; index++) {
        finalArray.push(index)
    }

    return {
        finalArray,
        start: start + 10
    }
}