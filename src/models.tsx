export interface CoinObject {
    id : string,
    name: string,
    priceUsd: number,
    rank: number,
    symbol: string
}


export interface CoinInPortfolioObject {
    amount: number,
    currentCourse: number,
    id : string,
    name: string,
    priceUsd: number
}

export interface HistoryObject {
    date: string,
    time: number,
    priceUsd: number
}

export interface PaginationObject {
    selected: number
}

export interface ModalAddCoinProps {
    isOpen: boolean,
    onClose: (isOpen: boolean, name: string, price: number, id: string) => void;
    priceForOne: number,
    nameForModal: string,
    idForModal: string
}
