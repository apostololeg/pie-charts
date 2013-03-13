Raphael.fn.pieChart = function ( options ) {

    var paper = this,
        rad = Math.PI / 180,
        chart = this.set(),
        angle = 0,
        total = 0,
        start = 0,
        animation = {
            easing: 'backOut',
            time: 500
        },
        i = 0;

    // piece of pie
    function sector( p ) {

        var x1 = p.cx + p.radius * Math.cos(-p.startAngle * rad),
            x2 = p.cx + p.radius * Math.cos(-p.endAngle * rad),
            y1 = p.cy + p.radius * Math.sin(-p.startAngle * rad),
            y2 = p.cy + p.radius * Math.sin(-p.endAngle * rad);

        return paper
                .path([ "M", p.cx, p.cy, "L", x1, y1, "A", p.radius, p.radius, 0, +(p.endAngle - p.startAngle > 180), 0, x2, y2, "z" ])
                .attr( p.styles );
    }

    // full pie
    function process(j) {
        console.log( options.colors );
        var value = options.values[j],
            angleplus = 360 * value / total,
            popangle = angle + (angleplus / 2),
            delta = 30,
            color = options.colors[j],
            bcolor = options.colors[j],
            p = sector({
                    cx: options.cx,
                    cy: options.cy,
                    radius: options.radius,
                    startAngle: angle,
                    endAngle: angle + angleplus,
                    styles: {
                        fill: "90-" + bcolor + "-" + color,
                        stroke: 'rgba(0,0,0,.1)',
                        "stroke-width": 1
                    }
                }),
            txt = paper
                    .text(options.cx + (options.radius + delta + 55) * Math.cos(-popangle * rad), options.cy + (options.radius + delta + 25) * Math.sin(-popangle * rad), options.labels[j])
                    .attr({
                        fill: '#111',
                        stroke: "none",
                        opacity: .3,
                        "font-size": 20
                    });

        p
            .mouseover(function () {
                p.stop().animate({transform: "s1.1 1.1 " + options.cx + " " + options.cy}, animation.time, animation.easing);
                txt.stop().animate({opacity: 1}, animation.time, animation.easing);
            })
            .mouseout(function () {
                p.stop().animate({transform: ""}, animation.time, animation.easing);
                txt.stop().animate({opacity: .3}, animation.time);
            });

        angle += angleplus;
        chart.push(p);
        chart.push(txt);
        start += .1;
    };


    // строим полный пирог
    for (i = 0; i < options.values.length; i++) {
        total += options.values[i];
    }

    for (i = 0; i < options.values.length; i++) {
        process(i);
    }


    return chart;
};


// set of colors
function getHSBRange(shade) {

    var result = [],
        brightness = .4;

    for(var i = 0; i <= 10; i++) {
        result.push( Raphael.hsb(shade, 1, brightness.toFixed(2) ) );
        brightness+=.06;
    }

    return result;

}

// draw new pie
function draw(i) {

    var values = [20, 26, 5, 5, 4, 4, 3, 2, 2, 1],
        labels = ['Ruby', 'JavaScript', 'Shell', 'Python', 'PHP', 'C', 'Perl', 'C++', 'Java', 'Objective-C'],
        colors = [
            getHSBRange(.55),
            getHSBRange(.50),
            getHSBRange(.44),
            getHSBRange(.17),
            getHSBRange(.017)
        ];

    Raphael("holder", 700, 700).pieChart({
        cx: 350,
        cy: 350,
        radius: 200,
        values: values,
        labels: labels,
        colors: colors[i-1]
    });

}

function reDraw(i) {

    // clear holder
    $('#holder').html('');
    // draw new pie
    draw(i);

}


$(function () {

    // draw default pie
    draw(1)

});