//1. create array with memes to print the first buttons
//2. create a function to add the buttons of the array
//3. create a function to add the searched meme button
//4. create function to add epic memes
//5. create a function to set the attributes of the still/animated gifs
//6. create a function to localStore epic-memes/epic-gifs
//7. create a function to append buttons to memes
//---------------------------------------------------------------------------------------------------------------------------------
//1. create array with memes to print the first buttons
var memes = ['pepe', 'kermit', 'office monkey', 'white guy blinking', 'dank memes', 'deal with it', 'crying jordan', 
            'doge', 'steal yo girl', 'viral moments'];
//2. create a function to add the buttons of the array
function deployMemes() {
    for (let i = 0; i < memes.length; i++) {
        memeButton = $('<button>');
        memeButton.attr('type', 'button');
        memeButton.addClass('btn btn-success btn-shadow px-3 my-2 ml-0 text-left meme-button');
        memeButton.text(memes[i]);
        memeButton.attr('data-offset', 0);
        $('.button-wrapper').append(memeButton);
    }
}
//3. create a function to add the searched meme button
function newMemeButton() {
    event.preventDefault();
    var content = $('#text-button').val().trim();
    memeButton = $('<button>');
    memeButton.attr('type', 'button');
    memeButton.addClass('btn btn-success btn-shadow px-3 my-2 ml-0 text-left meme-button');
    memeButton.text(content);
    $('.button-wrapper').append(memeButton);
    $('#text-button').val('');
}
//4. create function to add epic memes
function epicMeme() {
    var content = $('#text-button').val().trim();
    memeButton = $('<button>');
    memeButton.attr('type', 'button');
    memeButton.addClass('btn btn-success btn-shadow px-3 my-2 ml-0 text-left meme-button');
    memeButton.text(content);
    $('#epic-memes').append(memeButton);
}
//5. create a function to set the attributes of the still/animated gifs
function memeAlive(gif, results) {
    gif.attr('src', results.images.fixed_width_still.url);
    gif.attr('data-still', results.images.fixed_width_still.url);
    gif.attr('data-animate', results.images.fixed_width.url);
    gif.attr('data-state', 'still');
    gif.addClass('gif card-img-top');
    return gif;
}
//6. create a function to localStore epic-memes/epic-gifs
function deployEpicMemeGif() {
    $('#epic-memes').append(localStorage.getItem('epicMeme'));
    $('#epic-gifs').append(localStorage.getItem('epicGif'));
}
//7. create a function to append buttons to memes
function memeAppend(card, results) {
    let title = results.title.replace('GIF', '');
    let memeTitle = $('<p class="font-weight-bold width-75">');
    let rating = results.rating.toUpperCase();
    let adoptMeme = results.images.original.url;
    let epicMemeButton = $('<button>Epic Meme Worthy</button>');
    let adoptMemeButton = $('<a>');
    memeTitle.addClass('card-title text-capitalize');
    memeTitle.text(title);
    epicMemeButton.addClass('btn btn-success btn-shadow px-3 my-2 ml-0 text-left');
    epicMemeButton.attr('id', 'epic-meme-button');
    epicMemeButton.attr('data-url', results.images.fixed_width.url);
    adoptMemeButton.text('Adopt');
    adoptMemeButton.attr('href', adoptMeme).attr('role', 'button');
    adoptMemeButton.addClass('btn btn-success btn-shadow px-3 my-2 ml-0 text-left')
    card.append(memeTitle);
    card.addClass('card-body');
    card.append('<p>Dankness: ' + rating);
    card.append(epicMemeButton);
    card.append(adoptMemeButton);
    return card;
}

$(document).ready(function() {
    deployMemes();
    deployEpicMemeGif();
    $('#search-button').on('click', function() {
        newMemeButton();
    })
    $('#epic-meme-add-button').on('click', function() {
        epicMeme();
        let memeEpic = $('#epic-memes').html()
        localStorage.setItem('epicMeme', memeEpic);
    })
    $(document).on('click', '#epic-meme-button', function() {
        let newMeme = $('<img>');
        newMeme.addClass('mb-1');
        newMeme.attr('src', $(this).attr('data-url'));
        $('#epic-gifs').append(newMeme);
        let epicGif = $('#epic-gifs');
        localStorage.setItem('epicMeme', epicGif);
    })
    $('#wack').on('click', function () {
        $('#epic-memes').empty();
        $('#epic-gifs').empty();
        localStorage.clear();
    })
    $(document).on('click', '.meme-button', function() {
        event.preventDefault();
        var search = $(this).text().toLowerCase().replace(/ /g, '+');
        var offset = $(this).attr('data-offset');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=dc6zaTOxFJmzC&limit=10&offset=' + offset;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            let results = response.data;
            for (let i = 0; i < results.length; i++) {
                let memeCard = $('<div class="card">');
                let newGif = $('<img>');
                let memeText = $('<div>');
                newGif = memeAlive(newGif, results[i]);
                memeText = memeAppend(memeText, results[i]);
                memeCard.addClass('m-1');
                memeCard.append(newGif);
                memeCard.append(memeText);
                $('.meme-wrapper').append(memeCard);
            }
        })
        var tempOffset = $(this).attr('data-offset');
        tempOffset = parseInt(tempOffset);
        tempOffset += 10;
        $(this).attr('data-offset', tempOffset);
    })
    $(document).on('click', '.gif', function () {
        var animation = $(this).attr('data-state');
        if (animation === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    })
})