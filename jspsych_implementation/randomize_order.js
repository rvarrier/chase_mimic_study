function random_item(items)
{return items[Math.floor(Math.random()*items.length)];   }
console.log(random_item([5,10]))

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;}


function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

var items = range(10, 0);
console.log('Before: ' + items)
//console.log('random_item: ' + random_item(items))
console.log('After: ' + shuffle(items))

total_vids = 112; //7*2*2*2*2
//chase vids
subtleties = []
for (let i=0; i< 6; i++){

}


