function draw() {
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');
    const year = document.getElementById('year');

    const words = quote.value.split(' ');
    const circle = {
        radius: 110,
        center: {
            x: 150,
            y: 150
        }
    };

    const canvas = document.getElementById('tegel');
    let ctx = canvas.getContext('2d');
    let img = new Image();

    img.onload = () => {
        ctx.drawImage(img, 0, 0);
        ctx.textAlign = 'center';
        ctx.font = '30px Lobster';

        let start = 0;
        let next = 0;
        let y = 130;
        let line = '';

        for (let i = 0; i < words.length; ++i) {
            line = line + ' ' + words[next];
            next++;
            const text = ctx.measureText(line);
            const text_width = text.width;
            const circle_width = circle_slice(circle, y);
            if (text_width > circle_width) {
                const  s = build_line(words, start, i - start);
                ctx.fillText(s, circle.center.x,y);
                y += 30;
                start = i;
                line = '';
            }
        }
        const  s = build_line(words, start, words.length - start);
        ctx.fillText(s, circle.center.x, y);
        y += 60;

        //Draw author and name
        const text = author.value + ' ' + year.value;
        console.log(text);
        ctx.fillText(text, 150, y);
        set_download();
    };
    img.src = 'tegeltje.jpg';
}

function build_line(arr, start, length) {
    let s = '';
    for (let j = start; j < start + length; ++j) {
        s = s + ' ' + arr[j];
    }
    return s;
}

function circle_slice(circle, height) {
    const y = height - circle.radius;
    const r2 = Math.pow(circle.radius, 2);
    const y2 = Math.pow(y, 2);
    return 2 * Math.sqrt(r2 - y2);
}

function set_download() {
    const download = document.getElementById('download');
    const canvas = document.getElementById('tegel');
    const img = canvas.toDataURL("image/png");
    download.href = img;
}