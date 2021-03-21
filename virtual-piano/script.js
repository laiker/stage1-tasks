 //vars


window.onload = function() {
   

    soundNotes = {
        white : {
            D : 'c',
            F : 'd',
            G : 'e',
            H : 'f',
            J : 'g',
            K : 'a',
            L : 'b',
        },
        black : {
            R : 'c♯',
            T : 'd♯',
            empty : '',
            U : 'f♯',
            I : 'g♯',
            O : 'a♯',
        }
    };
    function getPianoHtml(keyTypes = 'notes') {
        var html = '';
        for (var keyType in soundNotes) {
            if(keyType == 'black') {
                html += '<div class="keys-sharp">';
            }
            for (var keyBoard in soundNotes[keyType]) {
    
                html += '<div class="piano-key';
                if(keyType == 'black') {
                    html += ' sharp';
                }
                if(keyTypes == 'letters' && keyBoard != 'empty') {
                    html += ' piano-key-letter';
                }
                if(keyBoard != 'empty') {
                    html += ' piano-key-remove-mouse" data-letter="' + keyBoard + '" data-note="' + soundNotes[keyType][keyBoard] + '"';
                } else {
                    html += ' piano-key-remove-mouse none"';
                }
                html += '></div>';
                
            }
            if(keyType == 'black') {
                html += '</div>';
            }
        }
    
        return html;
    }
    
    function renderPiano(keyTypes = 'notes') {
    
        pianoTypeHtml = getPianoHtml(keyTypes);
        console.log(pianoTypeHtml);
    
        document.getElementById('piano').innerHTML = pianoTypeHtml;
    }

    renderPiano();

    const buttonsTab = document.querySelectorAll(".btn-container .btn")
    for (const buttonTab of buttonsTab) {
        buttonTab.addEventListener('click', function(event) {
            document.querySelector('.btn-container .btn-active').classList.remove("btn-active");
            this.classList.add("btn-active");
            console.log(this.classList.contains("btn-letters"));
            renderPiano(this.classList.contains("btn-letters") ? 'letters' : 'notes');
        })
    }

    function delegate(el, evt, sel, handler) {
        el.addEventListener(evt, function(event) {
            var t = event.target;
            while (t && t !== this) {
                if (t.matches(sel)) {
                    handler.call(t, event);
                }
                t = t.parentNode;
            }
        });
    }

    var mouseDown = false;
    var keyDown = false;

    delegate(document, "mousedown", ".piano .piano-key", function(event) {
        mouseDown = true;
        buttonOn(event.target);
    });
    
    delegate(document, "mouseup", ".piano .piano-key", function(event) {
        mouseDown = false;
        buttonOff(event.target);
    });

    delegate(document, "mouseover", ".piano .piano-key", function(event) {
        if (mouseDown ) {
            buttonOn(event.target);
        }
    });


    delegate(document, "mouseout", ".piano .piano-key", function(event) {
        buttonOff(event.target);
    });

    document.addEventListener('keydown', function(event) {
        keyDown = true;
        
        button = document.querySelector('.piano-key[data-letter="'+event.key.toUpperCase()+'"');
        if(button != null && !button.classList.contains('piano-key-active') && !mouseDown) {
            buttonOn(button);
        }
    })

    document.addEventListener('keyup', function(event) {
        keyDown = false;
        mouseDown = false;
        button = document.querySelector('.piano-key[data-letter="'+event.key.toUpperCase()+'"');
        if(button != null) {
            console.log(button);
            buttonOff(button);
        }
    })


    document.querySelector('.fullscreen').addEventListener("click", function(e) {
        toggleFullScreen();
    }, false);

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
            document.exitFullscreen();
            }
        }
    }

    function playButton(letter) {

        fileSoundName = '';

        if (letter in soundNotes['white']) {
            fileSoundName = soundNotes['white'][letter];
        }

        if (letter in soundNotes['black']) {
            fileSoundName = soundNotes['black'][letter];
        }

        if(fileSoundName.length > 0) {
            var audio = new Audio('assets/audio/'+fileSoundName+'.mp3');
            audio.loop = false;
            audio.play();
        }
    }

    function buttonOn(button) {
        button.classList.remove('piano-key-remove-mouse');
        button.classList.add('piano-key-active');
        button.classList.add('piano-key-active-pseudo');
        letter = button.getAttribute("data-letter");
        playButton(letter);
    }
    
    function buttonOff(button) {
        button.classList.remove('piano-key-active');
        button.classList.remove('piano-key-active-pseudo');
        button.classList.add('piano-key-remove-mouse');
    }
}

