if (typeof document !== 'undefined') {
document.addEventListener('DOMContentLoaded', function() {

function videoResults() {

    let suggestion = document.querySelector('.search').value

    console.log(suggestion)

    fetch('/workoutData')
    .then(res => res.json())
    .then(data => {
        console.log(data)



        let vidUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDZlvnS-pg4z73z5xjhH3mm-RtxYJVuBHI&type=video&order=viewCount&order=relevance&q=${suggestion}`
            
        fetch(vidUrl)
        .then(res => res.json())
        .then(data2 => {
            console.log(data2)
            console.log(data2.items[0].id.videoId)


            const video = document.querySelector('#video')
            if(video) {
            video.src = `//www.youtube.com/embed/${data2.items[0].id.videoId}`
            }
            // document.querySelector('.video-two').src = `https://www.youtube.com/embed/${data2.items[1].id.videoId}`
            
        })
        

    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}


document.querySelector('.searchVideo').addEventListener('click', videoResults)

})
}