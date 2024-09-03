const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id')

const sliderDiv = document.querySelector('.photo-slide');  //this is the outside frame like viewfinder
const imageTrack = document.querySelector('.photos');    //this is the div where all the photos will be brought to

const dotDiv = document.querySelector('.dots');   //this is the div where all the dots will be in
let shift = 0;   //with this we will be able to shift between the photos
const viewFinderSize = -(document.querySelector('.photo-slide').clientWidth);

// fetch(`https://dummyjson.com/products/${productId}`)
fetch(`https://dummyjson.com/products/${productId}`)
    .then(res => res.json())
    .then(data => {

        /*
            this is the part where all the photos from the api will be brought to front end 
            i mean all of the and also they will be given the width and height which will be declared in css file
        */

        const images = [];

        data.images.forEach(element => {
            const imgTag = document.createElement('img');
            imgTag.src = element;
            imgTag.width = `${sliderDiv.clientWidth}`;
            imgTag.height = `${sliderDiv.clientHeight}`;

            images.push(imgTag);
            imageTrack.appendChild(imgTag);
        });

        imageTrack.style.width = `${images.length * sliderDiv.clientWidth}px`;
        imageTrack.style.height = `${sliderDiv.clientHeight}px`;


        let interval;

        /*
            from here is the part where the slide functionality comes in
            there will be automatic slides which will be in every 4 seconds
            there will be arrow which will have eventListeners to change photos from them
            and there will be a dots which helps the user to navigate
            also if the user changes the photo the timer will reset
        */
       
        startAutoSlide();

        //lets add dots first and its functions

        for(let i = 0; i < images.length; i++){
            dotDiv.innerHTML += `<span class="dot" id="dot${i}"></span>`;
        }

        let dots = document.querySelectorAll('.dot');
        for(let i = 0; i < images.length; i++){
            document.getElementById(`dot${i}`).addEventListener('click', ()=>{
                shift = -(i * sliderDiv.clientWidth);

                dots.forEach((dot, i) => dot.classList.toggle('active', i === shift/(viewFinderSize)));
                imageTrack.style.transform = `translateX(${shift}px)`;
                startAutoSlide();
            });
        }
        document.getElementById('dot0').classList.add('active');

        //we need a automatic slide function which will start as default and will added to every eventlistener



        function startAutoSlide(){
            clearInterval(interval);

            interval = setInterval(() => {
                shift -= sliderDiv.clientWidth;

                if(shift <= -(images.length * sliderDiv.clientWidth)){
                    shift = 0;
                }

                imageTrack.style.transform = `translate(${shift}px)`;
                dots.forEach((dot, i) => dot.classList.toggle('active', i === shift/(viewFinderSize)));
            }, 4000);
        }



        //now its time for arrow eventlisteners(next and previous)

        //prev button

        document.querySelector('.prev').addEventListener('click', () => {
            shift += sliderDiv.clientWidth;

            if(shift > 0){
                shift = (images.length - 1) * -(sliderDiv.clientWidth);
            }
            dots.forEach((dot, i) => dot.classList.toggle('active', i === shift/(viewFinderSize)));
            imageTrack.style.transform = `translateX(${shift}px)`;
            startAutoSlide();
        })

        //next button
        document.querySelector('.next').addEventListener('click', () => {
            shift -= sliderDiv.clientWidth;

            if(shift <= -(images.length * sliderDiv.clientWidth)){
                shift = 0;
            }
            dots.forEach((dot, i) => dot.classList.toggle('active', i === shift/(viewFinderSize)));
            imageTrack.style.transform = `translateX(${shift}px)`;
            startAutoSlide();
        })
        
        const productTitle = document.querySelector('.top-title > h1');

        productTitle.innerHTML = `${data.title}`;


    })

