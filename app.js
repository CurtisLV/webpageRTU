const jokes = document.querySelector('#tbody');
const btnNewJoke = document.querySelector('#btnNewJoke');
const btnRemoveJokes = document.querySelector('#btnRemoveJokes');
var jokeCount = 1;

const addNewJoke = async () => {
    if (jokeCount === 1) {
        window.alert('Click on table rows to randomize their looks!');
    }
    if (jokeCount > 10) {
        window.alert('Atļaušu izdrukāt tikai desmit jokus!');
    } else {
        try {
            const jokeText = await getDadJoke();
            const newTr = document.createElement('tr');
            const newTh = document.createElement('th');
            newTh.setAttribute('scope', 'row');
            newTh.innerHTML = jokeCount;

            const dateTd = document.createElement('td');
            let laiks = new Date().toLocaleTimeString();
            dateTd.append(laiks);

            const jokeTd = document.createElement('td');
            jokeTd.append(jokeText);
            newTr.append(newTh, dateTd, jokeTd);

            jokes.append(newTr);
            jokeCount++;
            rowColor();
            btnRemoveJokes.addEventListener('click', deleteAll);
        } catch (e) {
            return 'No jokes available :(';
        }
    }
};

const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: 'application/json' } };
        const res = await axios.get('https://icanhazdadjoke.com/', config);
        return res.data.joke;
    } catch (e) {
        return 'No jokes available :(';
    }
};

btnNewJoke.addEventListener('click', addNewJoke);

const makeRandColor = () => {
    const g = Math.floor(Math.random() * 256);
    const r = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

function rowColor() {
    const tableRows = document.querySelectorAll('#tbody > tr');
    for (let row of tableRows) {
        row.addEventListener('click', colorize);
    }
}

function colorize() {
    this.style.backgroundColor = makeRandColor();
    this.style.color = makeRandColor();
}

function deleteAll() {
    const tableRows = document.querySelector('#tbody');
    tableRows.innerHTML = '';
    jokeCount = 1;
}
