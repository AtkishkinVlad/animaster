addListeners();

let moveAndHideTimeout;
    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            
            anim.move(block, 2000, {x: 100, y: 20});
            moveAndHideTimeout = setTimeout(() => anim.fadeOut(block, 3000), 2000);
        });

    document.getElementById('moveAndHideReset')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            clearInterval(moveAndHideTimeout);
            anim.resetMoveAndScale(block);
            anim.resetFadeOut(block);
        });

function addListeners() {
    let ani = animaster();
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            ani.fadeIn(block, 5000);
        });
    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            ani.fadeOut(block, 5000);
        });
    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            ani.showAndHide(block, 5000);
        });
    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            let record = getRecord('move', 1000, {x: 100, y: 10}, null);
            ani.move(block, record);
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            ani.scale(block, 1000, 1.25);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            ani.moveAndHide(block, 1000, {x: 100, y: 20});
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            ani.stealBeating = true;
            ani.heartBeating(block, ani);
        });

    document.getElementById('heartBeatingStop')
        .addEventListener("click", function () {
            ani.stealBeating = false;
        })

    let moveAndHideTimeout;
    
    document.getElementById('moveAndHidePlay')
            .addEventListener('click', function () {
                const block = document.getElementById('moveAndHideBlock');
                ani.move(block, getRecord('move', 2000, {x: 100, y: 20}, null));
                moveAndHideTimeout = setTimeout(() => anim.fadeOut(block, 3000), 2000);
            });
    
    document.getElementById('moveAndHideReset')
            .addEventListener('click', function () {
                const block = document.getElementById('moveAndHideBlock');
                clearInterval(moveAndHideTimeout);
                ani.resetMoveAndScale(block);
                ani.resetFadeOut(block);
            });
}


function animaster() {
    let resetFadeIn = function(element) {
        element.style.transitionDuration = null;
        element.classList.add('hide');
        element.classList.remove('show');
    }

    let resetFadeOut = function (element) {
        element.style.transitionDuration = null;
        element.classList.remove('hide');
        element.classList.add('show');
    }

    return {
        fadeIn(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
        },

        fadeOut(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.add('hide');
            element.classList.remove('show');
        },

        scale(element, duration, ratio) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
        },

        move(element, record) {
            element.style.transitionDuration = `${record.duration}ms`;
            element.style.transform = getTransform(record.translation, null);
        },

        moveAndHide(element, duration, translation) {
            let record = getRecord('move', duration * 3 / 5, translation, null);
            this.move(element, record);
            setTimeout(this.fadeOut, duration * 3 / 5, element, duration * 2 / 5)
        },

        heartBeating(element, ani) {
            if (!ani.stealBeating) {
                return;
            }
            ani.scale(element, 450, 1.4);
            setTimeout(ani.scale, 500, element, 450, 1);
            setTimeout(ani.heartBeating, 1000, element, ani);
        },

        showAndHide(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove("show");
            element.classList.add("hide")
        },

        resetMoveAndScale(element){
            element.style.transitionDuration = null;
            element.style.transform = getTransform({x: 0, y: 0}, null);
            element.style.transform = getTransform(null, 1);
        },

        resetMoveAndScale(element){
            element.style.transitionDuration = null;
            element.style.transform = getTransform({x: 0, y: 0}, null);
            element.style.transform = getTransform(null, 1);
        },
        
        stealBeating: false,

        _steps : [],

        play(element) {
            let duration = 0;
            for (let step of this._steps) {
                setTimeout(this[step.action](step), duration);
                duration += step.duration + 50;
            }
        },

        addMove(duration, translation) {
            this._steps.push(getRecord('move', duration, translation, null));
            return this;
        }
    }
}

function getRecord(action, duration, translation, scale) {
    return {
        action,
        duration,
        translation,
        scale
    }
}

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}
