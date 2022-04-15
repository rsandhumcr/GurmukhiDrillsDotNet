
export class AudioService {

    private currentlyPlaying: string = '';

    playAudioUrl(url: string) {
        var audio = new Audio();
        audio.src = url;
        audio.load();
        audio.play();
    }

    playFiles(audioFile1: string, audioFile2: string) {
        if (audioFile1) {
            if (this.currentlyPlaying !== audioFile1) {
                this.currentlyPlaying = audioFile1;
                var audio = new Audio();
                audio.src = audioFile1;
                audio.load();
                audio.play();
                if (audioFile2) {
                    audio.onended = () => {
                        var audio1 = new Audio();
                        audio1.src = audioFile2;
                        audio1.load();
                        audio1.play();
                    }
                }
            }
        }        
    }
}