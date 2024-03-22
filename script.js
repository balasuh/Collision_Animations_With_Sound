// Canvas Setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;

const explosions = [];
let canvasPosition = canvas.getBoundingClientRect(); // Useful JS method to get the position of any element
console.log(canvasPosition);

// Animations setup
class Explosion {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.5; // Division is more expensive than multiplication in JS
        this.height = this.spriteHeight * 0.5; // Division is more expensive than multiplication in JS
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = './assets/boom.png';
        this.frame = 0;
        this.timer = 0;
        this.stagger = 5
        this.rotationAngle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = './assets/sfx/boom.wav'
    }

    update() {
        if (this.frame === 0) this.sound.play();
        this.timer++;
        if (this.timer % this.stagger === 0) {
            this.frame++;
        };
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotationAngle);
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth,
            this.spriteHeight, 0 - (this.width * 0.5), 0 - (this.height * 0.5), this.width, this.height);
        ctx.restore();
    }
}

window.addEventListener('click', function (e) {
    createExplosionAnimation(e);
});

// window.addEventListener('mousemove', function (e) {
//     createExplosionAnimation(e);
// });

function createExplosionAnimation(e) {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame > 5) {
            explosions.splice(i, 1); // Delete the object after the animation has played out
            i--; // Adjust the index for the deleted object to avoid skipping
        }
    }

    requestAnimationFrame(animate);
};

animate();