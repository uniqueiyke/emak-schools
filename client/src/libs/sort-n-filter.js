export const sortKeysMap = {
    'Reg. Number': 'reg_number',
    'Surname': 'last_name',
    'First Name': 'first_name',
    'Other Names': 'other_names',
    'Current Class': 'current_class',
    'Gender': 'gender',
}
export function descendingComparator(a, b, orderBy) {

    if (orderBy === 'Surname' || orderBy === 'First Name' || orderBy === 'Other Names') {
        if (b.name[sortKeysMap[orderBy]] < a.name[sortKeysMap[orderBy]]) {
            return -1;
        }
        if (b.name[sortKeysMap[orderBy]] > a.name[sortKeysMap[orderBy]]) {
            return 1;
        }
    } else {
        if (b[sortKeysMap[orderBy]] < a[sortKeysMap[orderBy]]) {
            return -1;
        }
        if (b[sortKeysMap[orderBy]] > a[sortKeysMap[orderBy]]) {
            return 1;
        }
    }

    return 0;
}

export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
