module.exports = () => {
    const days = []
    for (let i = 0; i < 7; i++) {
        const hours = []

        for (let j = 0; j <= 7; j++) {
            hours.push({
                time: 10 + j,
                reserved: ""
            })
        }

        days.push(hours)
    }

    return days
}