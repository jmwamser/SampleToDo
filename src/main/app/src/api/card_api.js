export function getCards() {
    return fetch('http://localhost:8081/cards')
        .then(response => {
            return response.json();
        })
}

export function createCard(card) {
    return fetch('http://localhost:8081/cards', {
        method: 'POST',
        body: JSON.stringify(card),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function updateCard(card) {
    return fetch('http://localhost:8081/cards/'+card.cid,{
        method: 'PUT',
        body: JSON.stringify(card),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}