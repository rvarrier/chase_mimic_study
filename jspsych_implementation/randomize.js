// use this function randomize when you get to that
function random_item(items)
{return items[Math.floor(Math.random()*items.length)];   }
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;}

shuffle
