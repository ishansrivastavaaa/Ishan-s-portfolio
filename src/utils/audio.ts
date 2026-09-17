export class AudioEngine {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;

  public enable() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isEnabled = true;
  }

  private playTone(freq: number, type: OscillatorType, duration: number, vol: number) {
    if (!this.isEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  public bootSequence() {
    this.playTone(880, 'sine', 0.1, 0.2);
    setTimeout(() => this.playTone(1760, 'sine', 0.2, 0.2), 100);
  }

  public typeKey() {
    this.playTone(200 + Math.random() * 50, 'square', 0.05, 0.02);
  }

  public terminalToggle() {
    this.playTone(150, 'sawtooth', 0.3, 0.3);
    setTimeout(() => this.playTone(100, 'sawtooth', 0.5, 0.4), 100);
  }

  public shiftTime() {
    this.playTone(432, 'triangle', 2.0, 0.3);
  }

  public click() {
    this.playTone(1200, 'sine', 0.05, 0.1);
  }
}

export const audio = new AudioEngine();
