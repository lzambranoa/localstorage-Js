//Variables
const listaTweets = document.getElementById('lista-tweets');




//Event Listener

eventListeners();

function eventListeners() {
    // Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //borra tweets
    listaTweets.addEventListener('click', borrarTweet);


    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}





//Funciones

//Añadir tweet al formulario
function agregarTweet(e) {
    e.preventDefault();
    // leer el valor del TextArea
    const tweet = document.getElementById('tweet').value;
    // Crear boton eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';



    // crear elemento y añadirle contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // añade el botòn de borrar al tweet
    li.appendChild(botonBorrar);
    // añade el twwet a la lista
    listaTweets.appendChild(li);

    // añadir al local storage
    agregarTweetLocalStorage(tweet);


}
// Borrar un Tweet del formulario
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);

    }

}

// Mostrar datos del local storage en la lista
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';



        // crear elemento y añadirle contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        // añade el botòn de borrar al tweet
        li.appendChild(botonBorrar);
        // añade el twwet a la lista
        listaTweets.appendChild(li);
    })
}

function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // Añadir el nuevo tweet
    tweets.push(tweet);
    // convertir de string a arreglo
    localStorage.setItem('tweets', JSON.stringify(tweets));


}
// Comprobar que hayan elementos en  el local storage
function obtenerTweetsLocalStorage() {
    let tweets;
    //Revisamos los cvalores del local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

// Eliminar tweet del local storage

function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;

    // Elimina la x del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }

    });
    localStorage.setItem('tweets', JSON.stringify(tweets));

}