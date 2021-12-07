function canvas(selector, options){
    const canvas = document.querySelector(selector);
    canvas.classList.add('canvas')
    canvas.setAttribute('width', `${options.width || 400}px`)
    canvas.setAttribute('height', `${options.height || 300}px`)

    let colorInput = document.getElementById("colorpicker");
    let sizeInput = document.getElementById("select");
    const context = canvas.getContext('2d');
    context.font = "20px Arial";
    const rect = canvas.getBoundingClientRect();

    let isPaint = false
    let points = []

    const addPoint = (x, y, dragging) => {
        points.push({
            x: (x - rect.left),
            y: (y - rect.top),
            dragging: dragging
        })
    }
    const redraw = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.strokeStyle = colorInput.value;
        context.lineJoin = 'round';
        context.lineWidth = sizeInput.value;
        let prevPoint = null;
        for (let point of points){
            context.beginPath();
            if (point.dragging && prevPoint){
                context.moveTo(prevPoint.x, prevPoint.y)
            } else {
                context.moveTo(point.x - 1, point.y);
            }
            context.lineTo(point.x, point.y)
            context.closePath()
            context.stroke();
            prevPoint = point;
        }
    }
    const mouseDown = event => {
        isPaint = true
        addPoint(event.pageX, event.pageY);
        redraw();
    }
    const mouseMove = event => {
        if(isPaint){
            addPoint(event.pageX, event.pageY, true);
            redraw();
        }
    }
    canvas.addEventListener('mousemove', mouseMove)
    canvas.addEventListener('mousedown', mouseDown)
    canvas.addEventListener('mouseup',() => {
        isPaint = false;
    });
    canvas.addEventListener('mouseleave',() => {
        isPaint = false;
    });


    const toolBar = document.getElementById('toolbar')
    const clearBtn = document.createElement('button')
    clearBtn.classList.add('btn')
    clearBtn.textContent = 'Clear'

    clearBtn.addEventListener('click', () => {
        context.clearRect(0,0, canvas.width, canvas.height);
        points=[0];
    })
    toolBar.insertAdjacentElement('afterbegin', clearBtn)

    const toolBar1 = document.getElementById('toolbar1')
    const downloadBtn = document.createElement('button')
    downloadBtn.classList.add('btn')
    downloadBtn.textContent = 'Download'

    downloadBtn.addEventListener('click',()=>{
        const dataUrl = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        const newTab = window.open('about:blank','image from canvas');
        newTab.document.write("<img src='" + dataUrl + "' alt='from canvas'/>");
    })
    toolBar1.insertAdjacentElement('afterbegin', downloadBtn)

    const toolBar2 = document.getElementById('toolbar2')
    const saveBtn = document.createElement('button')
    saveBtn.classList.add('btn')
    saveBtn.textContent = 'Save'

    saveBtn.addEventListener('click',()=>{
        localStorage.setItem("points", JSON.stringify(points));
    })
    toolBar2.insertAdjacentElement('afterbegin', saveBtn)

    const toolBar3 = document.getElementById('toolbar3')
    const restoreBtn = document.createElement('button')
    restoreBtn.classList.add('btn')
    restoreBtn.textContent = 'Restore'

    restoreBtn.addEventListener('click',()=>{
        points = JSON.parse(localStorage.getItem("points"));
        redraw();
    })
    toolBar3.insertAdjacentElement('afterbegin', restoreBtn)

    const toolBar4 = document.getElementById('toolbar4')
    const timeBtn = document.createElement('button')
    timeBtn.classList.add('btn')
    timeBtn.textContent = 'Time'

    timeBtn.addEventListener('click',()=>{
        time = new Date();
        context.fillText(time.getDay()+"."+time.getMonth()+" "+time.getMinutes()+":"+time.getHours(), 10,50);
    })
    toolBar4.insertAdjacentElement('afterbegin', timeBtn)

    const toolBar5 = document.getElementById('toolbar5')
    const backBtn = document.createElement('button')
    backBtn.classList.add('btn')
    backBtn.textContent = 'Costumize background'

    backBtn.addEventListener('click',()=>{
        const img = new Image;
        img.src =`https://www.fillmurray.com/200/300)`;
        img.onload = () => {
            context.drawImage(img, 0, 0);
        }
    })
    toolBar5.insertAdjacentElement('afterbegin', backBtn)
}