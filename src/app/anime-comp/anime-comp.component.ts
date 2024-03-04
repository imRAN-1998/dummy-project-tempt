import { AfterViewInit, Component } from '@angular/core';
// import * as anime from 'animejs';
// declare var anime : any;
import anime from 'animejs';

@Component({
  selector: 'app-anime-comp',
  standalone: true,
  imports: [],
  templateUrl: './anime-comp.component.html',
  styleUrl: './anime-comp.component.scss'
})
export class AnimeCompComponent implements AfterViewInit{
  
  constructor(){}

  ngAfterViewInit(): void {
    // console.log(anime);
    const lineDrawing = anime({
      targets: '#lineDrawing path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutBounce',
      duration: 10000,
      // delay: function(el, i) { return i * 250 },
      direction: 'forwards',
      loop: false,
      autoplay : false,
      complete : function(d){
        console.log(d.completed);
      },
      begin : (d)=>{
        setTimeout(()=>{
          console.log("completed!!");
        },5000)
      }
    });
    const playButton : HTMLElement | null = document.querySelector(".play-pause-demo .play");
    if(playButton != null){
      playButton.onclick = lineDrawing.play;
    }
    const pauseButton : HTMLElement | null = document.querySelector(".play-pause-demo .pause");
    if(pauseButton != null){
      pauseButton.onclick = ((e : any)=>{
        console.log(e);
        console.log(lineDrawing.complete);
      });
    }
// document.querySelector('.play-pause-demo .pause').onclick = animation.pause;
      // Wrap every letter in a span
  }

}
