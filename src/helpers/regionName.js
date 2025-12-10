function regionName(region) {

    switch (region) {
        case 'Europe':
            return 'region-europe'

        case 'Africa':
            return 'region-africa'

        case 'Americas':
            return 'region-americas'

        case 'Asia':
            return 'region-asia'

        case 'Oceania':
            return 'region-oceania'

        default:
            return 'region-default'
    }
}
export default regionName;

