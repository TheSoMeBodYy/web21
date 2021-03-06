function Slide(index, title, background, link ) {
    this.title = title;
    this.background = background;
    this.link = link;
    this.id = "slide-" + index;
}


Slider = {
    current: 0,
    slides: [],
    initSlider: function (slides) {
        let index = 0;
        for (let slide of slides) {
            this.slides.push(new Slide(index, slide.title, slide.background, slide.link));
            index++;
        }
        this.buildSlider();
    },

    buildSlider: function () {
        let sliderHTML = "";
        for(let slide of this.slides) {

            sliderHTML +=
                `<div id='${slide.id}' class='singleSlide'
           style='background-image:url(${slide.background});'>
           <div class='slideOverlay'>
           <h2>${slide.title}</h2>
           <a class='link' href='${slide.link}' target='_blank'>Open</a></div></div>`;
        }

        document.getElementById("slider").innerHTML = sliderHTML;
        document.getElementById("slide-" + this.current).style.left = 0;
    },

    setSlide: function (idx){
        let index = parseInt(idx.match(/\d+/));
        while(this.current!==index){
            Slider.nextSlide();
        }
    },

    prevSlide: function () {
        let next;
        next = this.current === 0 ? this.slides.length - 1 : this.current - 1;

        document.getElementById("slide-" + next).style.left = "-100%";
        document.getElementById("slide-" + this.current).style.left = 0;

        document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInLeft");
        document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutRight");

        this.current = next;
    },
    nextSlide: function () {
        let next;
        next = this.current === (this.slides.length - 1) ? 0 : this.current + 1;

        document.getElementById("slide-" + next).style.left = "100%";
        document.getElementById("slide-" + this.current).style.left = 0;

        document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInRight");
        document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutLeft");

        this.current = next;
    },

    showHide: function (element_id) {
        if (document.getElementById(element_id)) {
            let obj = document.getElementById(element_id);
            if (obj.style.display !== "block") {
                obj.style.display = "block";
            } else obj.style.display = "none";
        } else {
            alert("?????????????? ?? id: " + element_id + " ???? ????????????!");
        }
    }
};
