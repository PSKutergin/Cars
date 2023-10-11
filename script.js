'use strict'

const selector = document.getElementById('cars-select');
const block = document.getElementById('block');

const renderSelector = (data, list) => {
    list.forEach(item => {
        selector.insertAdjacentHTML('beforeend',
            `
            <option value="${item}">${item}</option>
            `)
    });

    selector.addEventListener('change', (e) => {
        block.innerHTML = '';

        if (e.target.value) {
            let car = data.find(item => item.brand === e.target.value)

            block.insertAdjacentHTML('beforeend',
                `
                    <p>Тачка ${car.brand} ${car.model}</p>
                    <p>Цена: ${car.price}$</p>
                `)
        };
    })
}

const getData = (url) => {
    return fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            const cars = new Set()

            try {
                data.cars.forEach((item) => {
                    cars.add(item.brand)
                });

                renderSelector(data.cars, cars);
            } catch (error) {
                console.log(error.message);
            }

        })
        .catch(error => {
            console.log(error);
        })
};

getData('cars.json')